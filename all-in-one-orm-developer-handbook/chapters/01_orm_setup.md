# Chapter 1 — ORM Architectures, Impedance Mismatch & Setup

An **Object-Relational Mapper (ORM)** bridges object-oriented domain models in memory with relational tables stored on disk. Choosing between **Active Record (Laravel Eloquent)** and **Data Mapper (Symfony Doctrine ORM 3)** shapes your domain boundaries, testability, performance profile, and migration strategy for years.

---

## 1. The Object-Relational Impedance Mismatch

Relational databases think in **sets, normalized tables, foreign keys, and scalar types**, whereas OOP applications think in **object graphs, behavior, inheritance, and reference identity (`===`)**:

| Dimension | Relational Database (SQL) | OOP Domain Objects (PHP 8.3–8.5) | How ORMs Bridge It |
| :--- | :--- | :--- | :--- |
| **Identity** | Primary key value (`id = 42`) | Object instance handle (`spl_object_id`) | Identity Map (Doctrine) or PK hydration (Eloquent) |
| **Granularity** | Flat scalar columns (`amount_cents`, `currency`) | Value Objects (`Money`), Backed Enums, DTOs | `casts()` / Custom Casts (Eloquent) or `#[ORM\Embedded]` (Doctrine) |
| **Associations** | Foreign keys & junction tables | Object references (`$post->author`) & Collections | Lazy Proxies, Batched `WHERE IN (...)` or `JOIN FETCH` |
| **Inheritance** | None natively | Subclasses & Interfaces | Single Table / Class Table Inheritance (`DiscriminatorMap`) |
| **Concurrency** | Locks, MVCC snapshots & transactions | Mutable in-memory state | Transactions, `lockForUpdate()`, optimistic `version` checks |

---

## 2. Active Record vs Data Mapper Architecture

```text
ACTIVE RECORD (Laravel Eloquent, Rails ActiveRecord)
  UserController -> $product = Product::find(1);
                    $product->price = 1999;
                    $product->save();   // Model inherits SQL persistence methods directly

DATA MAPPER + UNIT OF WORK (Symfony Doctrine ORM 3, Hibernate)
  UserController -> $product = $entityManager->find(Product::class, 1);
                    $product->applyDiscount(10); // Plain PHP object (no SQL parent class!)
                    $entityManager->flush();     // UnitOfWork diffs snapshot -> wraps SQL UPDATEs in transaction
```

| Architectural Axis | Active Record (**Eloquent**) | Data Mapper (**Doctrine ORM 3**) |
| :--- | :--- | :--- |
| **Model Class Coupling** | Extends `Illuminate\Database\Eloquent\Model` | Pure POPO class (`#[ORM\Entity]`) — zero DB imports needed in methods |
| **Identity Guarantee** | Two `find(1)` calls create **two distinct PHP objects** (`$a !== $b`) | **Identity Map** returns the **exact same PHP instance** (`$a === $b`) per EM |
| **Persistence Timing** | Immediate SQL per `save()` / `delete()` | Deferred in **Unit of Work**; single transactional batch on `flush()` |
| **Rapid Prototyping / CRUD** | Unmatched speed (`Post::create($data)`) | More setup (`persist()` + `flush()` + Repository classes) |
| **Complex Domain Invariants (DDD)** | Tempts "fat God Models" and bypassed setters | Protects invariants in constructor & domain methods cleanly |

> **Try It Locally:** Run [`labs/01_activerecord_vs_datamapper.php`](../labs/01_activerecord_vs_datamapper.php) to watch ActiveRecord duplicate instances vs DataMapper Identity Map + Unit-of-Work dirty-checking execute on SQLite PDO!

---

## 3. Multi-Language ORM Ecosystem Comparison

| Concept / Feature | **Laravel Eloquent (PHP)** | **Doctrine ORM 3 (PHP)** | **SQLAlchemy 2 (Python)** | **Prisma / Drizzle (TypeScript)** |
| :--- | :--- | :--- | :--- | :--- |
| **Core Pattern** | Active Record | Data Mapper + Unit of Work | Data Mapper + `Session` | Client / Schema-first Data Access |
| **Mapping Source** | Migrations + `$fillable`/`casts()` | PHP 8 Attributes (`#[ORM\Column]`) | `Mapped[T] = mapped_column(...)` | `schema.prisma` / TS schema objects |
| **Lazy Loading Default** | Lazy (disable via `preventLazyLoading`) | Proxy-based lazy | `lazy="select"` (`selectinload` recommended) | Explicit `include` / `with` required |
| **N+1 Prevention** | `with(['author'])` (`WHERE IN`) | DQL `JOIN FETCH` or batching | `options(selectinload(...))` | `include: { author: true }` |

---

## 4. Installation, Connection Setup & Strict Safety Defaults

### Laravel 12 / 13 (Eloquent Built-In)
Configure `.env` and `config/database.php` (`sqlite`, `mysql`, `pgsql`, `sqlsrv`):
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=electro_shop
DB_USERNAME=app_user
DB_PASSWORD=secret
```
Turn on **Strict Mode** inside `AppServiceProvider::boot()` so Eloquent catches silent bugs immediately during development:
```php
use Illuminate\Database\Eloquent\Model;

public function boot(): void
{
    // Enables preventLazyLoading(), preventSilentlyDiscardingAttributes(),
    // and preventAccessingMissingAttributes() in local/testing environments:
    Model::shouldBeStrict(! app()->isProduction());
}
```

### Symfony 7.x / Standalone Doctrine ORM 3
```bash
# Inside Symfony:
composer require symfony/orm-pack symfony/maker-bundle --dev

# Or standalone Doctrine ORM 3 + DBAL 4 in any PHP 8.3+ project:
composer require doctrine/orm doctrine/dbal symfony/cache
```
`.env` connection DSN and `config/packages/doctrine.yaml`:
```env
DATABASE_URL="postgresql://app_user:secret@127.0.0.1:5432/electro_shop?serverVersion=16&charset=utf8"
```
```yaml
doctrine:
  dbal:
    url: '%env(resolve:DATABASE_URL)%'
  orm:
    enable_lazy_ghost_objects: true
    auto_mapping: true
```
*(In production, enable Doctrine's metadata, query, and result caches backed by APCu or Redis rather than parsing PHP attributes per request!)*

---

## Key Takeaways
- Eloquent optimizes **developer velocity** (Model = table gateway + row); Doctrine optimizes **domain decoupling, Identity Map consistency, and batched transactional writes**.
- Always activate `Model::shouldBeStrict(! app()->isProduction())` in Laravel to surface N+1 loops, typos in attribute names, and unfillable properties before code ever reaches production.

> **Next:** [Chapter 2 — Defining Models, Entities & Value Objects](./02_models_entities.md)
