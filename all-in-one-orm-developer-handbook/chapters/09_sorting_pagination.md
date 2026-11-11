# Chapter 9 — Sorting, Offset Traps & High-Scale Cursor Pagination

Offset pagination (`LIMIT 20 OFFSET 200000`) feels fine during development with 50 rows, then falls off a performance cliff in production when tables pass millions of rows. Understanding **deterministic ordering** and **keyset/cursor pagination** solves both speed and skipped/duplicate rows on infinite feeds.

---

## 1. Safe Multi-Column Sorting & Deterministic Tie-Breakers

Always follow two rules on sorted queries:
1. **Strict Sort Allowlist**: NEVER pass `$request->input('sort')` raw into `orderBy()`. Map user-facing keys (`newest`, `price_asc`) through an explicit allowlist array!
2. **Unique Tie-Breaker Column**: Sorting non-unique columns (`ORDER BY created_at DESC LIMIT 15`) lets SQL return ties in nondeterministic order across pages -> always pair a unique trailing tie-breaker (`ORDER BY created_at DESC, id DESC`).

---

## 2. Offset Pagination vs Keyset (Cursor) Pagination

```sql
-- OFFSET Pagination (Page 10,000 -> Scans & discards 249,975 rows EVERY request!)
SELECT id, title, created_at FROM articles ORDER BY id DESC LIMIT 25 OFFSET 249975;

-- CURSOR / KEYSET Pagination (Constant O(log N) B-Tree seek at page 10 or 100,000!)
SELECT id, title, created_at FROM articles WHERE id < 750025 ORDER BY id DESC LIMIT 25;
```

| Feature | Offset Pagination (`paginate()`) | Cursor / Keyset (`cursorPaginate()`) |
| :--- | :--- | :--- |
| **Jump to Arbitrary Page `?page=42`** | Yes (`Next`, `Prev`, Page 1..N links) | No (Sequential Next / Prev streams only) |
| **Deep Page Performance (`page=10,000`)** | Degrades linearly ($O(\text{offset} + \text{limit})$ discarded scan) | Constant $O(\log N)$ via composite B-Tree index seek |
| **Live Feed Insert Drift** | Inserting 3 rows shifts page 2 items -> duplicate rows shown! | Immune to new inserts above the cursor |
| **Laravel Method** | `Post::paginate(15)` / `simplePaginate(15)` (omits `COUNT(*)`) | `Post::orderByDesc('created_at')->orderByDesc('id')->cursorPaginate(25)` |
| **Doctrine Method** | `new Doctrine\ORM\Tools\Pagination\Paginator($dqlQuery)` | Keyset DQL `WHERE (a.createdAt < :dt OR (a.createdAt = :dt AND a.id < :id))` |

---

## 3. Implementation Side-by-Side

### Laravel Eloquent (`simplePaginate` vs `paginate` vs `cursorPaginate`)
```php
// 1. Admin table needing page numbers + continuous serial index (`firstItem() + $loop->index`)
$posts = Post::with('author:id,name')
    ->latest('created_at')
    ->latest('id')
    ->paginate(15)
    ->withQueryString();

// 2. High-scale public API / mobile infinite scroll (zero COUNT(*) overhead!)
$feed = Post::published()
    ->orderByDesc('published_at')
    ->orderByDesc('id')
    ->cursorPaginate(25);
```
> **Blade Tip:** In numbered tables using `->paginate(15)`, keep serial numbers continuous across pages with `{{ $posts->firstItem() + $loop->index }}` rather than `{{ $loop->iteration }}`!

### Symfony Doctrine `Paginator` (Safe With To-Many `JOIN FETCH`)
When a DQL query uses `LEFT JOIN a.tags t` (`JOIN FETCH`) alongside `setMaxResults(20)`, raw SQL returns multiple rows per parent article. Doctrine's **`Paginator`** issues a dedicated distinct ID slice query first so you ALWAYS receive exact entity counts:
```php
use Doctrine\ORM\Tools\Pagination\Paginator;

$query = $entityManager->createQuery(
    'SELECT a, c FROM App\Entity\Article a LEFT JOIN a.category c ORDER BY a.createdAt DESC, a.id DESC'
)
->setFirstResult(($page - 1) * $perPage)
->setMaxResults($perPage);

$paginator = new Paginator($query, fetchJoinCollection: true);
$totalCount = count($paginator); // Total distinct entities
```

> **Try It Locally:** Run [`labs/04_cursor_vs_offset_pagination_and_hydration.php`](../labs/04_cursor_vs_offset_pagination_and_hydration.php) and observe SQLite's `EXPLAIN QUERY PLAN` (`SEARCH articles USING INTEGER PRIMARY KEY (rowid>?)`) on keyset queries!

---

## Key Takeaways
- Avoid `paginate()` (which executes an extra full `SELECT COUNT(*)`) on huge tables unless exact total page counts are mandatory — use `simplePaginate()` or `cursorPaginate()`.
- Always index your exact cursor sort columns (`CREATE INDEX idx_articles_pub_id ON articles (published_at DESC, id DESC)`).

> **Previous:** [Chapter 8 — Lifecycle Hooks](./08_lifecycle_hooks.md) · **Next:** [Chapter 10 — Hydration, Streaming Batches & Caching Optimization](./10_orm_optimization.md)
