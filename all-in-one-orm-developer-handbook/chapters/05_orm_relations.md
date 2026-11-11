# Chapter 5 — Relational Associations, Polymorphic Models & N+1 Elimination

Modeling object graphs cleanly — and fetching them without executing dozens of accidental loop queries — is the single biggest separator between beginner and senior ORM engineering.

---

## 1. Core Association Mapping (`1-1`, `1-N`, `M-N`)

### One-to-Many (`Category` <-> `Product`)
```php
// Laravel Eloquent
final class Category extends Model {
    public function products(): HasMany { return $this->hasMany(Product::class); }
}
final class Product extends Model {
    public function category(): BelongsTo { return $this->belongsTo(Category::class); }
}
```
```php
// Symfony Doctrine ORM 3
#[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'category')]
private Collection $products; // Initialized to new ArrayCollection() in __construct!

#[ORM\ManyToOne(inversedBy: 'products')]
#[ORM\JoinColumn(nullable: false, onDelete: 'RESTRICT')]
private Category $category; // The OWNING side holds the foreign key column!
```
> **Doctrine Owning vs Inverse Side Rule:** Doctrine ONLY reads changes made on the **owning side** (`#[ManyToOne]` or the side with `inversedBy`)! Always synchronize both sides inside domain helper methods (`$product->assignCategory($cat)` updating `$cat->addProduct($this)`).

### Many-to-Many With Extra Pivot Columns (`Order` <-> `Product` Quantity & Price Snapshot)
- **Eloquent**: declare pivot columns via `->withPivot(['qty', 'unit_price_cents'])->withTimestamps()`, or define a custom `Pivot` subclass (`OrderLine extends Pivot`).
- **Doctrine**: the moment a junction table stores extra attributes (`qty`, `unitPriceCents`), DO NOT use `#[ORM\ManyToMany]` — create a first-class **`OrderLine` Join Entity** with two `#[ORM\ManyToOne]` links (`Order` and `Product`)!

---

## 2. Polymorphic Relations vs Doctrine Inheritance Mapping

| Use Case: Shared `Comment` on `Post`, `Product`, and `Video` | Laravel Eloquent (**Polymorphic**) | Symfony Doctrine (**Inheritance Mapping**) |
| :--- | :--- | :--- |
| **Schema Strategy** | `$table->morphs('commentable')` creates `commentable_id` + `commentable_type` | `#[ORM\InheritanceType('SINGLE_TABLE')]` or `'JOINED'` with `#[ORM\DiscriminatorMap]` |
| **Code Pattern** | `Comment::morphTo()` + `Product::morphMany(Comment::class, 'commentable')` | Abstract `Comment` entity subclassed by `ProductComment`, `PostComment` (real SQL foreign keys preserved!) |
| **Data Integrity Note** | Avoid hard class-name strings in `*_type`: map short aliases via `Relation::enforceMorphMap([...])` | Enforces genuine DB `FOREIGN KEY` integrity constraints at SQL level |

```php
// Laravel Eloquent: Enforce safe short morph aliases in AppServiceProvider::boot()
Relation::enforceMorphMap([
    'post' => Post::class,
    'product' => Product::class,
]);
```

---

## 3. The N+1 Query Problem & How Both ORMs Eliminate It

Suppose a page displays 25 products and accesses `$product->category->name` inside a loop:
- **Naive Lazy Loop**: `1` query for `25` products + `25` separate `SELECT * FROM categories WHERE id = ?` queries = **`26` queries**.
- **Eloquent Batched Eager Loading (`with`)**: executes `SELECT * FROM products` + `SELECT id, name FROM categories WHERE id IN (1,2,3,4,5)` = **`2` queries total**!
  ```php
  // Specify column projections (`:id,name`) — `id` is REQUIRED for Eloquent to match keys!
  $products = Product::with(['category:id,name', 'tags:id,name'])->latest()->get();
  // Later on already-loaded models:
  $products->loadMissing('supplier:id,company_name');
  ```
- **Doctrine `JOIN FETCH` (DQL Single-Query Hydration)**:
  ```php
  $products = $entityManager->createQuery(
      'SELECT p, c FROM App\Entity\Product p INNER JOIN p.category c'
  )->getResult(); // 1 SQL query total!
  ```
- **Cartesian Product & Pagination Trap in Doctrine**: NEVER combine `->setMaxResults(20)` with a to-many `JOIN FETCH` (`Order JOIN FETCH OrderLines`) directly! SQL `LIMIT 20` cuts across joined lines instead of orders — wrap it with Doctrine's **`Paginator`** (`new Paginator($query)`) or use two-step eager fetching (`batch`/`IN`).
- **Extra-Lazy Collections in Doctrine**: set `fetch: 'EXTRA_LAZY'` on large collections (`$post->getComments()->count()` or `->slice(0, 10)`) so SQL runs `SELECT COUNT(*)` or `LIMIT 10` instead of loading 50,000 objects into RAM!

> **Try It Locally:** Run [`labs/02_n_plus_one_and_eager_loading.php`](../labs/02_n_plus_one_and_eager_loading.php) to compare real query counts across Lazy Loop (`26`), Eager `IN (...)` (`2`), and `JOIN FETCH` (`1`).

---

## Key Takeaways
- Turn on `Model::preventLazyLoading(! app()->isProduction())` in Laravel to catch N+1 bugs immediately.
- In Doctrine, modify the **owning side** (`ManyToOne`), use `JOIN FETCH` for to-one relations, and wrap paginated to-many `JOIN FETCH` queries in `Doctrine\ORM\Tools\Pagination\Paginator`.
- Always define `Relation::enforceMorphMap()` in Laravel so database `*_type` strings don't couple directly to PHP FQCN refactors.

> **Previous:** [Chapter 4 — Querying Data](./04_querying_data.md) · **Next:** [Chapter 6 — Aggregations & DTO Projections](./06_orm_aggregations.md)
