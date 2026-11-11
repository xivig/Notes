# Chapter 6 — Aggregations, Grouping & Lightweight DTO Projections

Never load thousands of ORM models into PHP RAM just to count rows or sum totals (`$orders->sum('total')` hydrates every object first!). Push math, grouping, subqueries, and reporting projections directly to the database engine.

---

## 1. Scalar Aggregations (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`)

| Metric | Laravel Eloquent | Symfony Doctrine ORM 3 |
| :--- | :--- | :--- |
| **Count Matching Rows** | `Product::where('status', 'active')->count()` | `(int) $qb->select('COUNT(p.id)')->andWhere(...)->getQuery()->getSingleScalarResult()` |
| **Total Revenue** | `Order::where('paid', true)->sum('total_cents')` | `(int) $qb->select('COALESCE(SUM(o.totalCents), 0)')->getQuery()->getSingleScalarResult()` |
| **Relation Count Per Parent** | `Category::withCount('products')->get()` (`$cat->products_count`) | `SELECT c, COUNT(p.id) AS productsCount FROM Category c LEFT JOIN c.products p GROUP BY c.id` |
| **Filtered Relation Sum** | `Order::withSum(['items' => fn ($q) => $q->where('refunded', false)], 'cents')` | Subquery / conditional `SUM(CASE WHEN ... ELSE 0 END)` in DQL |

---

## 2. Grouping, `HAVING` & Correlated Subselects

### Laravel Eloquent (`DB::table` Reporting + `addSelect` Subqueries)
```php
// Flat grouped analytics per category (no heavy Model hydration!)
$stats = DB::table('products')
    ->join('categories', 'categories.id', '=', 'products.category_id')
    ->select('categories.id', 'categories.name')
    ->selectRaw('COUNT(products.id) AS total_items, COALESCE(AVG(products.price_cents), 0) AS avg_cents')
    ->groupBy('categories.id', 'categories.name')
    ->havingRaw('COUNT(products.id) >= ?', [5])
    ->orderByDesc('total_items')
    ->get();

// Attach last login timestamp cleanly via single SQL subquery (no N+1!)
$users = User::query()
    ->addSelect([
        'last_order_at' => Order::select('created_at')
            ->whereColumn('user_id', 'users.id')
            ->latest('created_at')
            ->limit(1),
    ])
    ->withCasts(['last_order_at' => 'datetime'])
    ->get();
```

---

## 3. Returning Readonly DTOs Directly From DQL (`SELECT NEW`)

Doctrine has a superpower for read-heavy dashboards — hydrating rows **straight into immutable PHP DTOs** (`NEW` operator) with zero entity overhead or Identity Map pollution:

```php
final readonly class CategorySalesDto
{
    public function __construct(
        public string $categoryName,
        public int $productCount,
        public float $avgPriceDollars,
    ) {}
}
```
```php
/** @var list<CategorySalesDto> $report */
$report = $entityManager->createQuery(
    'SELECT NEW App\Dto\CategorySalesDto(
        c.name,
        COUNT(p.id),
        COALESCE(AVG(p.price.amountCents) / 100.0, 0)
     )
     FROM App\Entity\Category c
     LEFT JOIN c.products p
     GROUP BY c.id, c.name
     HAVING COUNT(p.id) > :minItems
     ORDER BY c.name ASC'
)
->setParameter('minItems', 2)
->getResult();
```

---

## 4. Reporting Anti-Patterns to Avoid

| Anti-Pattern | Why It Breaks Under Scale | Correct Fix |
| :--- | :--- | :--- |
| `count($category->products)` | Loads ALL product rows into PHP RAM first just to measure length | `Category::withCount('products')` or Doctrine `EXTRA_LAZY` `$collection->count()` |
| `$orders->where('paid', true)->sum('cents')` | Pulls unpaid rows over the network, hydrates objects, filters in PHP | Filter & `SUM` inside SQL (`Order::where('paid', true)->sum('cents')`) |
| `COUNT(*)` returning `'0'` string or `null` on empty sums | PHP `null + 10` or strict types error | Wrap nullable SQL sums in `COALESCE(SUM(...), 0)` + explicit `(int)` cast |

---

## Key Takeaways
- Keep aggregations (`COUNT`, `SUM`, `AVG`, `GROUP BY`, `HAVING`) inside SQL — never load full Model collections just to compute statistics in PHP.
- Use `withCount()` / subqueries (`addSelect()`) in Eloquent and `SELECT NEW App\Dto\...` in Doctrine for fast, type-safe reporting endpoints.

> **Previous:** [Chapter 5 — Relations & N+1](./05_orm_relations.md) · **Next:** [Chapter 7 — ACID Transactions, Savepoints & Concurrency Locks](./07_orm_transactions.md)
