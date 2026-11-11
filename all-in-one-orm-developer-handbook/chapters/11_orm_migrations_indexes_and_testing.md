# Chapter 11 — Schema Migrations, Indexing Strategy & ORM Testing

Your ORM is only as reliable as the underlying schema constraints, SQL indexes, and automated database test suite verifying behavior under concurrency and invalid input.

---

## 1. Schema Evolution: Migration-First vs Entity-Diff Migrations

| Aspect | Laravel Migrations (Schema Builder) | Doctrine Migrations (`doctrine:migrations:diff`) |
| :--- | :--- | :--- |
| **Workflow** | Hand-authored forward `up()` / `down()` schema classes (`php artisan make:migration`) | Reflects PHP `#[ORM\*]` Entity attributes vs live DB and generates diff SQL (`php bin/console doctrine:migrations:diff`) |
| **Execution** | `php artisan migrate` (`migrate --pretend` dry-run SQL preview) | `php bin/console doctrine:migrations:migrate` (`--dry-run` preview) |
| **Production Safety** | **NEVER run `migrate:fresh`!** Always write additive backward-compatible migrations | Review every generated diff SQL manually before merging (watch for accidental `DROP COLUMN` / data loss on renames!) |

### Zero-Downtime Expand-and-Contract Column Changes
Never rename or enforce `NOT NULL` on a hot table with zero transition step while old app code is still serving requests:
1. **Expand**: Add the nullable new column (plus composite index online/concurrently).
2. **Dual-Write & Backfill**: Deploy code reading fallback and writing both columns; run `chunkById` backfill in batches.
3. **Contract**: Enforce `NOT NULL` and drop the legacy column in a subsequent deploy.

---

## 2. Essential SQL Indexing Rules for ORMs

- **Index EVERY Foreign Key Manually If Needed**: MySQL/InnoDB auto-indexes foreign key constraints (`foreignId()->constrained()`), while **PostgreSQL and SQLite DO NOT auto-create indexes on foreign key columns** unless you add `->index()` explicitly! Missing child indexes turn eager `WHERE IN (...)` and cascade `DELETE`s into full table scans!
- **Leftmost-Prefix Composite Indexes**: Match your exact `WHERE` + `ORDER BY` clauses:
  ```php
  // Optimizes: WHERE status = 'active' ORDER BY published_at DESC, id DESC
  $table->index(['status', 'published_at', 'id'], 'idx_posts_status_pub_id');
  ```
- **Avoid Low-Selectivity Single Indexes** alone on booleans (`is_active`): combine with tenant/category/timestamp columns (`(tenant_id, is_active, created_at)`).

---

## 3. Seeding, Factories, Fixtures & Testing the Database Boundary

### Fast Factories vs Fixtures
- **Laravel Factories**: `Post::factory(40)->published()->recycle($authors)->sequence([...])->create()` reuses parent rows cleanly without spawning 40 extra users!
- **Doctrine Fixtures**: `ORMExecutor` + `AbstractFixture` classes using `addReference('cat_tech', $cat)` / `getReference(...)`.

### Testing Rules for ORM-Backed Code
1. **Never Mock Eloquent Models or Doctrine Repositories for SQL Queries!**
   Mocking `User::shouldReceive('where')` tests your mock setup, not your SQL, casts, foreign keys, triggers, or `lockForUpdate` queries. Use an actual database via `RefreshDatabase` (Laravel Pest/PHPUnit) or `zenstruck/foundry` + `DAMA\DoctrineTestBundle` (rolls back every test case inside an outer DB transaction in ~2ms!).
2. **Enforce Query Budget Assertions in CI**:
   ```php
   // Catch N+1 regressions automatically inside Pest / PHPUnit Feature tests!
   DB::flushQueryLog();
   DB::enableQueryLog();

   $this->getJson('/api/v1/posts')->assertOk();

   expect(count(DB::getQueryLog()))->toBeLessThanOrEqual(4);
   ```
3. **Engine Parity Matters**: SQLite `:memory:` runs tests fast, but **SQLite ignores MySQL/PostgreSQL-specific SQL** (strict `GROUP BY`, `FULLTEXT`, enum DDL, `FOR UPDATE NOWAIT`, JSON indexing). Run CI tests against the same PostgreSQL/MySQL engine used in production!

---

## Key Takeaways
- Index child foreign key columns explicitly when targeting PostgreSQL/SQLite, and align composite index order cleanly with `WHERE` -> `ORDER BY` clauses.
- Inspect every generated migration (`--pretend` / `--dry-run`) and test real SQL queries inside transaction-rolled-back integration tests rather than mocking ORM builders.

> **Previous:** [Chapter 10 — Hydration & Optimization](./10_orm_optimization.md) · **Next:** [Chapter 12 — Clean Architecture, CQRS Split & Decision Playbook](./12_orm_clean_architecture_and_benchmarks.md)
