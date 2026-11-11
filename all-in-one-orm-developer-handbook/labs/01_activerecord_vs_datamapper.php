<?php

declare(strict_types=1);

/**
 * Lab 01 — Mini ActiveRecord (Eloquent style) vs Mini DataMapper + Identity Map (Doctrine style)
 * Run: php labs/01_activerecord_vs_datamapper.php
 */

$pdo = new PDO('sqlite::memory:', null, null, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

$pdo->exec('CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sku TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    price_cents INTEGER NOT NULL
)');

// ============================================================================
// PART A: Mini ActiveRecord (Row + Persistence live inside Model class)
// ============================================================================
abstract class ActiveRecordModel
{
    public static ?PDO $db = null;
    public ?int $id = null;

    protected static function table(): string
    {
        return strtolower((new ReflectionClass(static::class))->getShortName()) . 's';
    }
}

final class ActiveProduct extends ActiveRecordModel
{
    public function __construct(
        public string $sku,
        public string $name,
        public int $price_cents,
    ) {}

    public function save(): void
    {
        if ($this->id === null) {
            $stmt = self::$db->prepare('INSERT INTO products (sku, name, price_cents) VALUES (?, ?, ?)');
            $stmt->execute([$this->sku, $this->name, $this->price_cents]);
            $this->id = (int) self::$db->lastInsertId();
            return;
        }
        $stmt = self::$db->prepare('UPDATE products SET name = ?, price_cents = ? WHERE id = ?');
        $stmt->execute([$this->name, $this->price_cents, $this->id]);
    }

    public static function find(int $id): ?self
    {
        $stmt = self::$db->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (! $row) {
            return null;
        }
        $m = new self($row['sku'], $row['name'], (int) $row['price_cents']);
        $m->id = (int) $row['id'];
        return $m;
    }
}

ActiveRecordModel::$db = $pdo;

$ar1 = new ActiveProduct('SKU-100', 'Mechanical Keyboard', 12900);
$ar1->save();
$arA = ActiveProduct::find($ar1->id);
$arB = ActiveProduct::find($ar1->id);

// Without an Identity Map, two finds return TWO distinct PHP instances in memory:
assert($arA !== $arB, 'Naive ActiveRecord creates fresh instances per query.');
$arA->price_cents = 11900;
$arA->save();
echo "[ActiveRecord] Saved #{$ar1->id}; \$arA === \$arB? " . ($arA === $arB ? 'true' : 'false') . " (arB price in RAM: {$arB->price_cents})\n";

// ============================================================================
// PART B: Mini DataMapper + Unit of Work + Identity Map (Domain decoupled from SQL)
// ============================================================================
final class DomainProduct
{
    private ?int $id = null;

    public function __construct(
        private string $sku,
        private string $name,
        private int $priceCents,
    ) {
        if ($priceCents < 0) {
            throw new InvalidArgumentException('Price cannot be negative.');
        }
    }

    public function id(): ?int { return $this->id; }
    public function sku(): string { return $this->sku; }
    public function name(): string { return $this->name; }
    public function priceCents(): int { return $this->priceCents; }

    public function applyDiscount(int $percent): void
    {
        $this->priceCents = (int) round($this->priceCents * (100 - $percent) / 100);
    }

    /** @internal Hydrated by EntityManager only */
    public function bindDatabaseId(int $id): void { $this->id = $id; }
}

final class MiniEntityManager
{
    /** @var array<int, DomainProduct> */
    private array $identityMap = [];
    /** @var array<int, DomainProduct> */
    private array $newQueue = [];
    /** @var array<int, array{sku: string, name: string, priceCents: int}> */
    private array $originalSnapshot = [];

    public int $flushQueries = 0;

    public function __construct(private readonly PDO $pdo) {}

    public function persist(DomainProduct $entity): void
    {
        if ($entity->id() === null) {
            $this->newQueue[spl_object_id($entity)] = $entity;
        }
    }

    public function find(int $id): ?DomainProduct
    {
        if (isset($this->identityMap[$id])) {
            return $this->identityMap[$id]; // Identity Map hit: zero SQL query!
        }

        $stmt = $this->pdo->prepare('SELECT * FROM products WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (! $row) {
            return null;
        }

        $entity = new DomainProduct($row['sku'], $row['name'], (int) $row['price_cents']);
        $entity->bindDatabaseId((int) $row['id']);
        $this->identityMap[(int) $row['id']] = $entity;
        $this->originalSnapshot[(int) $row['id']] = [
            'sku' => $entity->sku(),
            'name' => $entity->name(),
            'priceCents' => $entity->priceCents(),
        ];

        return $entity;
    }

    public function flush(): void
    {
        $this->pdo->beginTransaction();
        try {
            // 1. Insert queued new entities
            foreach ($this->newQueue as $entity) {
                $stmt = $this->pdo->prepare('INSERT INTO products (sku, name, price_cents) VALUES (?, ?, ?)');
                $stmt->execute([$entity->sku(), $entity->name(), $entity->priceCents()]);
                $newId = (int) $this->pdo->lastInsertId();
                $entity->bindDatabaseId($newId);
                $this->identityMap[$newId] = $entity;
                $this->originalSnapshot[$newId] = [
                    'sku' => $entity->sku(),
                    'name' => $entity->name(),
                    'priceCents' => $entity->priceCents(),
                ];
                $this->flushQueries++;
            }
            $this->newQueue = [];

            // 2. Dirty-checking: only UPDATE entities whose snapshot changed!
            foreach ($this->identityMap as $id => $entity) {
                $orig = $this->originalSnapshot[$id];
                if ($orig['name'] !== $entity->name() || $orig['priceCents'] !== $entity->priceCents()) {
                    $stmt = $this->pdo->prepare('UPDATE products SET name = ?, price_cents = ? WHERE id = ?');
                    $stmt->execute([$entity->name(), $entity->priceCents(), $id]);
                    $this->originalSnapshot[$id]['name'] = $entity->name();
                    $this->originalSnapshot[$id]['priceCents'] = $entity->priceCents();
                    $this->flushQueries++;
                }
            }

            $this->pdo->commit();
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}

$em = new MiniEntityManager($pdo);
$dm = new DomainProduct('SKU-200', 'USB-C Dock', 8000);
$em->persist($dm);
$em->flush(); // Executes 1 batched INSERT

$dmA = $em->find($dm->id());
$dmB = $em->find($dm->id());
assert($dmA === $dmB, 'DataMapper Identity Map guarantees single object identity === per PK.');

$dmA->applyDiscount(25); // Changes price in RAM from 8000 -> 6000 without SQL yet!
$em->flush();            // Dirty-checker detects price change and issues 1 UPDATE!

assert($dmB->priceCents() === 6000, 'Identity Map reflects updated state identically across references.');
echo "[DataMapper] Identity === preserved? true | Final price after 25% discount: {$dmB->priceCents()} cents | Flush SQL writes: {$em->flushQueries}\n";
