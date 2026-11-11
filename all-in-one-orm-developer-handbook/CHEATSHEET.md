# ORM Engineering Cheatsheet — Laravel Eloquent vs Symfony Doctrine ORM 3

Fast side-by-side reference across Active Record (Laravel 12/13), Data Mapper (Doctrine ORM 3 / Symfony 7), and raw parameterized SQL.

---

## 1. Setup, Strictness & Caching

```php
// Laravel AppServiceProvider::boot() — Catch N+1 & missing/discarded attributes locally!
Model::shouldBeStrict(! app()->isProduction());

// Doctrine ORM 3 config (Symfony): enable metadata, query & result caches in production
// composer require doctrine/orm doctrine/dbal
// php bin/console doctrine:migrations:diff
// php bin/console doctrine:migrations:migrate --dry-run
```

---

## 2. CRUD & Unit of Work Side-by-Side

| Operation | Laravel Eloquent (`ActiveRecord`) | Doctrine ORM 3 (`DataMapper`) |
| :--- | :--- | :--- |
| **Create & Insert** | `Product::create($request->validated());` | `$em->persist($product); $em->flush();` |
| **Find or Fail** | `Product::findOrFail($id)` | `$repo->find($id) ?? throw ...` |
| **Update** | `$product->update($validated);` | `$product->rename($name); $em->flush();` |
| **Assign FK w/o SELECT** | `$product->category_id = $catId;` | `$em->getReference(Category::class, $catId)` |
| **Bulk Upsert** | `Product::upsert($rows, ['sku'], ['name', 'price_cents']);` | Chunk `persist()` every 200 -> `flush()` + `clear()` |
| **Soft Delete / Trash** | `use SoftDeletes;` -> `$p->delete()`, `onlyTrashed()`, `restore()` | `gedmo` `@SoftDeleteable` SQL filter or `archivedAt` |

---

## 3. Querying, Eager Loading & Aggregations

```php
// Eager loading (prevents N+1) + column projection + relation count
$products = Product::with(['category:id,name', 'tags:id,name'])
    ->withCount('reviews')
    ->when($q, fn ($builder, $term) => $builder->whereLike('name', "%{$term}%"))
    ->latest('created_at')
    ->paginate(15);

// Doctrine DQL JOIN FETCH & DTO Projection
$dtos = $em->createQuery(
    'SELECT NEW App\Dto\SalesSummary(c.name, COUNT(p.id))
     FROM App\Entity\Category c LEFT JOIN c.products p
     GROUP BY c.id, c.name'
)->getResult();

// Doctrine safe pagination over to-many JOIN FETCH
$paginator = new \Doctrine\ORM\Tools\Pagination\Paginator($dqlQuery, fetchJoinCollection: true);
```

---

## 4. Polymorphic Associations & Strict Filtering

```php
// Eloquent Polymorphic Morph Map (AppServiceProvider::boot)
Relation::enforceMorphMap(['post' => Post::class, 'product' => Product::class]);
$table->morphs('commentable'); // Migration helper

// Multi-Tenancy Global Filter
// Eloquent: #[ScopedBy([TenantScope::class])] -> bypass via withoutGlobalScope(TenantScope::class)
// Doctrine: $em->getFilters()->enable('tenant')->setParameter('tenant_id', $id);
```

---

## 5. ACID Transactions, Locking & Retries

```php
// Eloquent transaction + automatic deadlock retry + post-commit dispatch
DB::transaction(function () use ($id): void {
    $wallet = Wallet::whereKey($id)->lockForUpdate()->firstOrFail();
    $wallet->decrement('balance_cents', 500);
    DB::afterCommit(fn () => SendReceiptJob::dispatch($wallet->id));
}, attempts: 3);

// Doctrine pessimistic write & optimistic version check
$wallet = $em->find(Wallet::class, $id, \Doctrine\DBAL\LockMode::PESSIMISTIC_WRITE);
// Or #[ORM\Version] field throws OptimisticLockException automatically on conflict!
```

---

## 6. High-Scale Pagination, Streaming & Memory Hygiene

```php
// Constant O(log N) Cursor / Keyset Pagination
$feed = Post::published()->orderByDesc('published_at')->orderByDesc('id')->cursorPaginate(25);

// Stream millions of rows without OOM
DB::disableQueryLog();
Post::where('status', 'published')->chunkById(500, fn ($rows) => /* ... */);

// Doctrine streaming + Identity Map cleanup
foreach ($em->createQuery('SELECT p FROM App\Entity\Post p')->toIterable() as $i => $post) {
    if (($i % 200) === 0) { $em->flush(); $em->clear(); }
}
```
