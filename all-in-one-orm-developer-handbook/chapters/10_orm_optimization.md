# Chapter 10 — Hydration, Memory Streaming, Caching & Query Tuning

The fastest SQL query still bottlenecks if PHP runs out of RAM hydrating **50,000 full ORM Entities + Identity Map snapshots** or misses query/result caches. Master **projection**, **chunked streaming**, and **caching layers**.

---

## 1. The Truth About Object Hydration vs Array vs DTO Hydration

Many teams reach for plain associative arrays believing they're universally tiny — let's measure accurately on modern PHP 8.3+:
- **Full Heavy ORM Hydration**: populates `Model`/`Entity` attributes, `$original` dirty-check snapshots, Doctrine `UnitOfWork` Identity Map arrays, bidirectional `Collection` lazy proxies, and JSON/date cast objects. Costly in CPU and RAM at high row counts!
- **Lightweight Readonly PHP 8.3 DTOs**: declared typed properties (`final readonly class RowDto { public int $id; ... }`) sit in compact fixed property slots and actually consume **less RAM per row than PHP associative arrays** (`HashTable` buckets)!
- **Doctrine Scalar / Array Hydration**: skips proxy wrapping and Identity Map registration completely (`Query::HYDRATE_ARRAY`, `Query::HYDRATE_SCALAR`, `Query::HYDRATE_SCALAR_COLUMN`) or leaves objects unmanaged (`$query->setHint(Query::HINT_READ_ONLY, true)`).

| Optimization Technique | Laravel Eloquent | Symfony Doctrine ORM 3 |
| :--- | :--- | :--- |
| **Select Only Needed Columns** | `Post::select(['id', 'title', 'author_id'])->with('author:id,name')->get()` | `SELECT PARTIAL p.{id, title}, c.{id, name} ...` or `SELECT NEW App\Dto\PostRowDto(...)` |
| **Skip Model Hydration** | `DB::table('posts')->select('id', 'title')->get()` or `->toBase()` | `$query->getArrayResult()` / `$query->getScalarResult()` |
| **Bypass Identity Map Snapshots** | *(No Identity Map)* | `$query->setHint(Query::HINT_READ_ONLY, true)` |

---

## 2. Streaming Millions of Rows Without Out-of-Memory (`OOM`)

NEVER call `Model::all()` or `$repo->findAll()` inside cron exports, sitemap generators, or batch migrators! Also disable query logging inside long CLI jobs (`DB::disableQueryLog()` — Laravel keeps SQL query history arrays in RAM if query logging is enabled in debug mode!).

### Eloquent Batch Streaming (`chunkById` & `lazyById`)
```php
DB::disableQueryLog();

// Keyset-based chunks (`WHERE id > last_id LIMIT 500`) — immune to offset drift!
Post::where('status', 'published')->chunkById(500, function ($posts): void {
    foreach ($posts as $post) {
        // Process 500 rows at a time; memory stays flat!
    }
});

// LazyCollection: iterates 1 model at a time cleanly while fetching 500-row pages internally:
foreach (Post::published()->lazyById(500) as $post) {
    // Low constant RAM footprint
}
```
> **Pitfall:** NEVER use offset-based `chunk(500)` when **mutating the filter column inside the loop** (e.g., setting `status = 'processed'` while querying `where('status', 'pending')`) — shifted offsets skip every alternate batch! Always use `chunkById()`!

### Doctrine Streaming (`toIterable()` + Periodic `$em->clear()`)
```php
$batchSize = 200;
$count = 0;

$iterable = $entityManager->createQuery('SELECT p FROM App\Entity\Post p')
    ->toIterable(); // Streams database cursor rather than loading all rows!

foreach ($iterable as $post) {
    $post->recalculateScore();

    if ((++$count % $batchSize) === 0) {
        $entityManager->flush();
        $entityManager->clear(); // CRITICAL: releases all managed entities from Identity Map RAM!
    }
}
$entityManager->flush();
$entityManager->clear();
```

---

## 3. Caching Tiers (Metadata, Query Plans, Result Sets & SLC)

1. **Doctrine Cache Triad (`metadata_cache`, `query_cache`, `result_cache`)**:
   - **Metadata Cache**: parses `#[ORM\Entity]` attributes ONCE (`APCu` / `Redis`) instead of running PHP Reflection per request.
   - **Query Cache**: caches parsed DQL -> SQL compilation trees.
   - **Result Cache**: `$query->enableResultCache(lifetime: 600, resultCacheId: 'catalog_top_10')` for slow read queries (remember explicit invalidation on writes!).
   - **Second-Level Cache (SLC)**: caches immutable/read-mostly Entities (`Regions`: `READ_ONLY` / `NONSTRICT_READ_WRITE`) directly in Redis/APCu across HTTP requests!
2. **Laravel Application & Cache-Aside (`remember` / `flexible`)**:
   - Pair `Cache::flexible('catalog.featured', [300, 600], fn () => ...)` with `PostObserver` invalidation (`ShouldHandleEventsAfterCommit`).

> **Try It Locally:** Run [`labs/04_cursor_vs_offset_pagination_and_hydration.php`](../labs/04_cursor_vs_offset_pagination_and_hydration.php) to benchmark `chunkById` batching and measure real PHP 8.3 memory deltas (`Array` vs typed PHP objects)!

---

## Key Takeaways
- Always stream large jobs using `chunkById()` / `lazyById()` (Eloquent) or `$query->toIterable()` + periodic `$em->clear()` (Doctrine), with `DB::disableQueryLog()`.
- Trim `SELECT` columns (`select(['id', ...])`) and hydrate lightweight typed DTOs or scalar arrays on read-heavy endpoints.

> **Previous:** [Chapter 9 — Pagination](./09_sorting_pagination.md) · **Next:** [Chapter 11 — Schema Migrations, Indexes & ORM Testing](./11_orm_migrations_indexes_and_testing.md)
