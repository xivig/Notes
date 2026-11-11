<?php

declare(strict_types=1);

/**
 * Chapter 10 Lab: SQLite Schema Migration, Query Counting, N+1 vs Eager Loading (with()).
 */

$pdo = new PDO('sqlite::memory:');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

// 1. Simulate Migration up()
$pdo->exec('PRAGMA foreign_keys = ON;');
$pdo->exec('
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    );
    CREATE TABLE posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        is_published INTEGER NOT NULL DEFAULT 0
    );
');

// 2. Simulate DatabaseSeeder
$pdo->exec("INSERT INTO users (name) VALUES ('Ada Lovelace'), ('Taylor Otwell');");
$insertPost = $pdo->prepare('INSERT INTO posts (user_id, title, slug, is_published) VALUES (?, ?, ?, ?)');
for ($i = 1; $i <= 6; $i++) {
    $userId = ($i % 2 === 0) ? 2 : 1;
    $insertPost->execute([$userId, "Laravel Post #{$i}", "laravel-post-{$i}", 1]);
}

// 3. Measure Lazy Loading (N+1) vs Eager Loading (with('author'))
$lazyQueries = 0;
$posts = $pdo->query('SELECT * FROM posts WHERE is_published = 1')->fetchAll();
$lazyQueries++;

$stmtAuthor = $pdo->prepare('SELECT id, name FROM users WHERE id = ?');
foreach ($posts as &$post) {
    $stmtAuthor->execute([$post['user_id']]);
    $post['author'] = $stmtAuthor->fetch();
    $lazyQueries++;
}
unset($post);

echo "Lazy loading (N+1) ran {$lazyQueries} SQL queries for " . count($posts) . ' posts.' . PHP_EOL;

// Eager loading: 1 query for posts + 1 batched IN(...) query for unique user_ids!
$eagerQueries = 0;
$eagerPosts = $pdo->query('SELECT * FROM posts WHERE is_published = 1')->fetchAll();
$eagerQueries++;

$userIds = array_values(array_unique(array_column($eagerPosts, 'user_id')));
$placeholders = implode(',', array_fill(0, count($userIds), '?'));
$batchStmt = $pdo->prepare("SELECT id, name FROM users WHERE id IN ({$placeholders})");
$batchStmt->execute($userIds);
$eagerQueries++;

$authorsById = [];
foreach ($batchStmt->fetchAll() as $author) {
    $authorsById[(int) $author['id']] = $author;
}

foreach ($eagerPosts as &$ep) {
    $ep['is_published'] = (bool) $ep['is_published']; // Mimic casts(): ['is_published' => 'boolean']
    $ep['author'] = $authorsById[(int) $ep['user_id']] ?? null;
}
unset($ep);

echo "Eager loading (with('author')) ran ONLY {$eagerQueries} SQL queries!" . PHP_EOL;
echo 'Sample hydrated row: ' . json_encode($eagerPosts[0], JSON_THROW_ON_ERROR) . PHP_EOL;
