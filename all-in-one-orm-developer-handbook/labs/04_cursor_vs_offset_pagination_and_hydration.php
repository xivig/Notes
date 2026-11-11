<?php

declare(strict_types=1);

/**
 * Lab 04 — Offset vs Cursor (Keyset) Pagination + Array vs Object Hydration Memory Benchmark
 * Run: php labs/04_cursor_vs_offset_pagination_and_hydration.php
 */

$pdo = new PDO('sqlite::memory:', null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
$pdo->exec('CREATE TABLE articles (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, score INTEGER NOT NULL);');

// Seed 5,000 rows in one wrapped transaction (~10ms)
$pdo->beginTransaction();
$ins = $pdo->prepare('INSERT INTO articles (title, score) VALUES (?, ?)');
for ($i = 1; $i <= 5000; $i++) {
    $ins->execute(["ORM Performance Entry #{$i}", $i % 100]);
}
$pdo->commit();

// ----------------------------------------------------------------------------
// 1. OFFSET VS KEYSET CURSOR PAGINATION EQUIVALENCE (Page after ID 4,900)
// ----------------------------------------------------------------------------
$offsetStmt = $pdo->prepare('SELECT id, title FROM articles ORDER BY id ASC LIMIT 5 OFFSET 4900');
$offsetStmt->execute();
$offsetRows = $offsetStmt->fetchAll(PDO::FETCH_ASSOC);

// Keyset cursor seeks directly on PRIMARY KEY B-Tree index without scanning 4,900 discarded rows:
$cursorStmt = $pdo->prepare('SELECT id, title FROM articles WHERE id > ? ORDER BY id ASC LIMIT 5');
$cursorStmt->execute([4900]);
$cursorRows = $cursorStmt->fetchAll(PDO::FETCH_ASSOC);

assert($offsetRows === $cursorRows, 'Cursor page must return identical slice starting at 4901..4905');
assert((int) $cursorRows[0]['id'] === 4901 && (int) $cursorRows[4]['id'] === 4905);

// Show SQLite query plan for cursor query: uses SEARCH PRIMARY KEY!
$plan = $pdo->query('EXPLAIN QUERY PLAN SELECT id, title FROM articles WHERE id > 4900 ORDER BY id ASC LIMIT 5')
    ->fetchAll(PDO::FETCH_ASSOC);
echo "[Pagination] Cursor query plan detail: " . ($plan[0]['detail'] ?? 'index') . " (rows 4901..4905 verified)\n";

// ----------------------------------------------------------------------------
// 2. BATCHED CHUNK STREAMING BY ID (`chunkById`) — NO IN-MEMORY ACCUMULATION
// ----------------------------------------------------------------------------
$processed = 0;
$lastId = 0;
$chunkSize = 1000;
$batches = 0;
$chunkStmt = $pdo->prepare('SELECT id, score FROM articles WHERE id > ? ORDER BY id ASC LIMIT ?');

while (true) {
    $chunkStmt->bindValue(1, $lastId, PDO::PARAM_INT);
    $chunkStmt->bindValue(2, $chunkSize, PDO::PARAM_INT);
    $chunkStmt->execute();
    $rows = $chunkStmt->fetchAll(PDO::FETCH_ASSOC);
    if ($rows === []) {
        break;
    }
    $batches++;
    $processed += count($rows);
    $lastId = (int) $rows[array_key_last($rows)]['id'];
}
assert($processed === 5000 && $batches === 5);

// ----------------------------------------------------------------------------
// 3. ARRAY HYDRATION VS OBJECT HYDRATION PEAK RAM COMPARISON
// ----------------------------------------------------------------------------
final class ArticleEntity
{
    public function __construct(public int $id, public string $title, public int $score) {}
}

$memBeforeArr = memory_get_usage();
$asArrays = $pdo->query('SELECT id, title, score FROM articles')->fetchAll(PDO::FETCH_ASSOC);
$arrDelta = memory_get_usage() - $memBeforeArr;
unset($asArrays);

$memBeforeObj = memory_get_usage();
$asObjects = array_map(
    static fn (array $r): ArticleEntity => new ArticleEntity((int) $r['id'], $r['title'], (int) $r['score']),
    $pdo->query('SELECT id, title, score FROM articles')->fetchAll(PDO::FETCH_ASSOC)
);
$objDelta = memory_get_usage() - $memBeforeObj;

assert(count($asObjects) === 5000);
echo "[Chunking & Hydration] Streamed {$processed} rows in {$batches} chunks | 5k Array delta: "
    . number_format($arrDelta) . " B vs Entity delta: " . number_format($objDelta) . " B\n";
