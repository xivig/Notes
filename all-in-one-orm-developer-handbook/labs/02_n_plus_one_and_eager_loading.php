<?php

declare(strict_types=1);

/**
 * Lab 02 — Measuring & Eliminating the N+1 Query Problem in SQLite PDO
 * Run: php labs/02_n_plus_one_and_eager_loading.php
 */

final class InstrumentedPdo
{
    public int $queryCount = 0;
    /** @var list<string> */
    public array $log = [];

    public function __construct(private readonly PDO $pdo) {}

    public function exec(string $sql): int|false
    {
        return $this->pdo->exec($sql);
    }

    public function queryAll(string $sql, array $params = []): array
    {
        $this->queryCount++;
        $this->log[] = $sql;
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function resetMetrics(): void
    {
        $this->queryCount = 0;
        $this->log = [];
    }
}

$raw = new PDO('sqlite::memory:', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
$db = new InstrumentedPdo($raw);

$db->exec('PRAGMA foreign_keys = ON;
CREATE TABLE categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    title TEXT NOT NULL
);');

// Seed 5 categories & 25 posts
$insCat = $raw->prepare('INSERT INTO categories (name) VALUES (?)');
foreach (['Architecture', 'Eloquent', 'Doctrine', 'Indexing', 'Transactions'] as $cat) {
    $insCat->execute([$cat]);
}
$insPost = $raw->prepare('INSERT INTO posts (category_id, title) VALUES (?, ?)');
for ($i = 1; $i <= 25; $i++) {
    $insPost->execute([($i % 5) + 1, "ORM Guide Article #{$i}"]);
}

// ----------------------------------------------------------------------------
// 1. NAIVE LAZY LOADING (N + 1 QUERIES!)
// ----------------------------------------------------------------------------
$db->resetMetrics();
$posts = $db->queryAll('SELECT id, category_id, title FROM posts ORDER BY id');
$lazyRendered = [];
foreach ($posts as $p) {
    // Fires 1 extra SELECT inside EVERY loop iteration -> 1 + 25 = 26 queries!
    $cat = $db->queryAll('SELECT name FROM categories WHERE id = ?', [$p['category_id']])[0];
    $lazyRendered[] = "{$p['title']} [{$cat['name']}]";
}
$lazyCount = $db->queryCount;
assert($lazyCount === 26, "Expected 26 queries for N+1 loop, got {$lazyCount}");

// ----------------------------------------------------------------------------
// 2. EAGER LOADING VIA BATCHED `IN (...)` (Eloquent ->with('category')) -> 2 QUERIES!
// ----------------------------------------------------------------------------
$db->resetMetrics();
$posts = $db->queryAll('SELECT id, category_id, title FROM posts ORDER BY id');
$catIds = array_values(array_unique(array_column($posts, 'category_id')));
$placeholders = implode(',', array_fill(0, count($catIds), '?'));
$catsById = [];
foreach ($db->queryAll("SELECT id, name FROM categories WHERE id IN ({$placeholders})", $catIds) as $c) {
    $catsById[(int) $c['id']] = $c['name'];
}
$eagerRendered = array_map(
    static fn (array $p): string => "{$p['title']} [" . $catsById[(int) $p['category_id']] . "]",
    $posts
);
$eagerCount = $db->queryCount;
assert($eagerCount === 2, "Expected 2 queries for batched eager loading, got {$eagerCount}");
assert($eagerRendered === $lazyRendered, 'Eager-loaded output must match lazy output identically.');

// ----------------------------------------------------------------------------
// 3. SINGLE FETCH JOIN (Doctrine DQL JOIN FETCH / SQL JOIN) -> 1 QUERY!
// ----------------------------------------------------------------------------
$db->resetMetrics();
$joined = $db->queryAll(
    'SELECT p.id, p.title, c.name AS category_name
     FROM posts p
     INNER JOIN categories c ON c.id = p.category_id
     ORDER BY p.id'
);
$joinRendered = array_map(
    static fn (array $r): string => "{$r['title']} [{$r['category_name']}]",
    $joined
);
$joinCount = $db->queryCount;
assert($joinCount === 1, "Expected 1 query for FETCH JOIN, got {$joinCount}");
assert($joinRendered === $lazyRendered, 'JOIN FETCH output must match lazy output identically.');

echo "[N+1 Benchmark (25 rows)] Lazy Loop: {$lazyCount} queries | Eager IN(): {$eagerCount} queries | Fetch Join: {$joinCount} query\n";
