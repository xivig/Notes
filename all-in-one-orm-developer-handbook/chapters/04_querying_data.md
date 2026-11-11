# Chapter 4 — Querying Data, Scopes, DQL & Raw SQL Safety

Both ORMs wrap parameterized SQL prepared statements behind fluent builders, while also allowing escape hatches into raw SQL when analytical queries outgrow object abstractions.

---

## 1. Filtering, Null Checks & Conditional Chains (`SELECT ... WHERE`)

| Operation | Laravel Eloquent | Symfony Doctrine ORM 3 |
| :--- | :--- | :--- |
| **Find by PK / Fail 404** | `Product::findOrFail($id)` | `$repo->find($id) ?? throw $this->createNotFoundException()` |
| **Filtered Collection** | `Product::where('status', 'active')->where('price_cents', '>', 5000)->get()` | `$repo->createQueryBuilder('p')->where('p.status = :s AND p.price.amountCents > :min')->setParameters(['s' => ProductStatus::Active, 'min' => 5000])->getQuery()->getResult()` |
| **Conditional Filters** | `->when($search, fn ($q, $s) => $q->whereLike('name', "%{$s}%"))` | `if ($search !== '') { $qb->andWhere('p.name LIKE :s')->setParameter('s', "%{$search}%"); }` |
| **Existence Check** | `Product::where('sku', $sku)->exists()` (runs `SELECT EXISTS(...)`) | `$qb->select('1')->setMaxResults(1)->getQuery()->getOneOrNullResult() !== null` |
| **Single Scalar Column** | `Product::where('status', 'active')->pluck('sku', 'id')` | `$qb->select('p.id, p.sku')->getQuery()->getSingleColumnResult()` |

---

## 2. Reusable Query Scopes vs Custom Repository Methods

Keep controllers thin by pushing query predicates into **Eloquent Query Scopes** or **Doctrine EntityRepositories**:

```php
// Laravel Eloquent Scope (`app/Models/Product.php`)
public function scopePublished(Builder $query): void
{
    $query->where('status', ProductStatus::Active)
          ->whereNotNull('published_at');
}

// Or Laravel 12+ #[Scope] attribute:
#[Scope]
protected function pricedBelow(Builder $query, int $cents): void
{
    $query->where('price_cents', '<=', $cents);
}

// Usage (chainable!):
$deals = Product::published()->pricedBelow(5000)->latest('published_at')->get();
```
```php
// Symfony Doctrine Custom Repository (`src/Repository/ProductRepository.php`)
final class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    /** @return list<Product> */
    public function findPublishedDeals(int $maxCents): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.status = :status')
            ->andWhere('p.price.amountCents <= :max')
            ->setParameter('status', ProductStatus::Active)
            ->setParameter('max', $maxCents)
            ->orderBy('p.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }
}
```

---

## 3. Eloquent Global Scopes vs Doctrine SQL Filters (Multi-Tenancy)

For row-level **multi-tenancy** (`tenant_id = ?`) or soft-delete filtering, attach an automatic SQL clause across *every* query:
- **Eloquent Global Scope**: implement `Illuminate\Database\Eloquent\Scope` (`apply(Builder $b, Model $m)`), attach with `#[ScopedBy([TenantScope::class])]`, and bypass selectively with `->withoutGlobalScope(TenantScope::class)`.
- **Doctrine SQL Filter (`SQLFilter`)**: extend `Doctrine\ORM\Query\Filter\SQLFilter`, enable dynamically via `$em->getFilters()->enable('tenant')->setParameter('tenant_id', $tenantId)` — injects `AND t0.tenant_id = ?` cleanly even into DQL joins!

---

## 4. Parameterized Raw SQL & DQL Injection Pitfalls

NEVER interpolate user variables directly inside SQL/DQL strings (`WHERE name LIKE '%{$q}%'`), column names, or sort directions!

```php
// WRONG (SQL Injection / DQL Injection!):
$posts = DB::select("SELECT * FROM products WHERE category = '{$input}'");
$dql = $em->createQuery("SELECT p FROM App\Entity\Product p ORDER BY p.{$sort}");

// RIGHT (Bound parameters + Strict Column Allowlist):
$rows = DB::select('SELECT id, name FROM products WHERE category_id = ? AND status = ?', [$catId, 'active']);

$allowedColumns = ['price.amountCents' => 'p.price.amountCents', 'createdAt' => 'p.createdAt'];
$orderColumn = $allowedColumns[$requestSort] ?? 'p.createdAt';
$qb->orderBy($orderColumn, $dir === 'asc' ? 'ASC' : 'DESC');
```
*(In Doctrine DBAL 4 without Entity hydration, `$connection->executeQuery('SELECT ... WHERE id = :id', ['id' => $id])->fetchAllAssociative()` executes parameterized SQL cleanly.)*

---

## Key Takeaways
- Put reusable predicates into Eloquent Scopes (`scopePublished` / `#[Scope]`) or Doctrine Repository methods so query rules aren't duplicated across controllers.
- Prefer `exists()` over `count() > 0` when checking existence — SQL stops at the first matching index leaf.
- Never interpolate dynamic strings into raw SQL, `whereRaw()`, or `ORDER BY` — always bind parameters and allowlist dynamic sort columns.

> **Previous:** [Chapter 3 — Saving & Unit of Work](./03_saving_records.md) · **Next:** [Chapter 5 — Relations, Polymorphic Models & N+1](./05_orm_relations.md)
