<?php

declare(strict_types=1);

/**
 * Chapter 17 Lab: PDO Prepared Statements, Allowlisted Sorting & Atomic Transactions (SQLite :memory:)
 */

final readonly class ProductRecord
{
    public function __construct(
        public int $id,
        public string $sku,
        public string $name,
        public int $priceCents,
    ) {}
}

final class ProductRepository
{
    public function __construct(private PDO $pdo) {}

    public function createSchema(): void
    {
        $this->pdo->exec(<<<SQL
            CREATE TABLE products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sku TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL,
                price_cents INTEGER NOT NULL CHECK (price_cents >= 0)
            )
        SQL);
    }

    public function insert(string $sku, string $name, int $priceCents): int
    {
        $stmt = $this->pdo->prepare(
            'INSERT INTO products (sku, name, price_cents) VALUES (:sku, :name, :price)'
        );
        $stmt->execute([
            'sku'   => $sku,
            'name'  => $name,
            'price' => $priceCents,
        ]);
        return (int) $this->pdo->lastInsertId();
    }

    /** @return list<ProductRecord> */
    public function listSorted(string $sortColumn, string $direction = 'ASC'): array
    {
        // Strict allowlist for dynamic ORDER BY identifiers (never bind identifiers directly!)
        $column = match ($sortColumn) {
            'sku'   => 'sku',
            'name'  => 'name',
            'price' => 'price_cents',
            default => 'id',
        };
        $dir = strtoupper($direction) === 'DESC' ? 'DESC' : 'ASC';

        $stmt = $this->pdo->query("SELECT id, sku, name, price_cents FROM products ORDER BY {$column} {$dir}");
        $rows = $stmt->fetchAll();

        return array_map(
            static fn (array $r): ProductRecord => new ProductRecord(
                (int) $r['id'],
                (string) $r['sku'],
                (string) $r['name'],
                (int) $r['price_cents'],
            ),
            $rows
        );
    }
}

echo "=== Chapter 17: PDO, Prepared Statements & Transactions ===" . PHP_EOL;

if (!extension_loaded('pdo_sqlite')) {
    echo "pdo_sqlite extension not loaded; skipping live SQLite execution." . PHP_EOL;
    exit(0);
}

$pdo = new PDO('sqlite::memory:', null, null, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
]);

$repo = new ProductRepository($pdo);
$repo->createSchema();

// 1. Atomic transaction commit
$pdo->beginTransaction();
try {
    $repo->insert('KB-01', 'Mechanical Keyboard', 12900);
    $repo->insert('MS-01', 'Wireless Mouse', 4900);
    $repo->insert('MN-01', '4K Display', 39900);
    $pdo->commit();
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    throw $e;
}

// 2. Transaction rollback verification on constraint violation
$pdo->beginTransaction();
try {
    $repo->insert('TMP-01', 'Temporary Item', 1000);
    $repo->insert('KB-01', 'Duplicate SKU Violation', 2000); // Triggers UNIQUE constraint error
    $pdo->commit();
} catch (PDOException $e) {
    $pdo->rollBack();
    echo "Rolled back failed transaction cleanly: " . $e->getMessage() . PHP_EOL;
}

// 3. Query sorted via allowlist
foreach ($repo->listSorted('price', 'DESC') as $product) {
    $price = number_format($product->priceCents / 100, 2);
    echo "  - [{$product->sku}] {$product->name}: \${$price}" . PHP_EOL;
}
