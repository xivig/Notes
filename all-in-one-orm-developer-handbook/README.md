# All-in-One ORM Developer Handbook (Eloquent vs Doctrine 3)

[![PHP](https://img.shields.io/badge/PHP-8.3%20%E2%80%93%208.5-777BB4?style=flat-square&logo=php&logoColor=white)](https://www.php.net/)
[![ORMs](https://img.shields.io/badge/ORM-Eloquent%2012%2F13%20%7C%20Doctrine%203-FF2D20?style=flat-square&logo=laravel&logoColor=white)](./CHEATSHEET.md)
[![Chapters](https://img.shields.io/badge/Curriculum-12%20Chapters%20(3%20Tracks)-0EA5E9?style=flat-square)](./chapters)
[![Labs](https://img.shields.io/badge/Runnable%20SQLite%20Labs-Verified-10B981?style=flat-square)](./run-all-examples.php)
[![Interactive Portal](https://img.shields.io/badge/Portal-Interactive%20Handbook-f59e0b?style=flat-square)](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/all-in-one-orm-developer-handbook/index.html)

A streamlined, zero-duplicate **ORM Engineering Handbook** comparing **Laravel Eloquent (Active Record)** and **Symfony Doctrine ORM 3 (Data Mapper + Unit of Work)** side by side — featuring **12 clean chapters**, an **Interactive Single-File Portal** (with side-by-side comparison cards, dark/light themes, `/` search, progress tracking & 12-question Mastery Quiz), and **4 verified SQLite PDO PHP labs**.

> Open the interactive handbook anytime: 🌐 **[Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/all-in-one-orm-developer-handbook/index.html)** · **[Local (`index.html`)](./index.html)**, or explore every chapter and runnable SQLite lab below.

---

## Repository Structure (`21` Files Total)

| Resource | Purpose |
| :--- | :--- |
| [`index.html`](./index.html) | Interactive single-file handbook portal (all 12 chapters, 12 Side-by-Side Eloquent/Doctrine cards, `/` search, theme toggle, lab viewers & Quiz) |
| [`CHEATSHEET.md`](./CHEATSHEET.md) | High-density reference for Eloquent, Doctrine 3, Polymorphic Morph Maps, Locks, `chunkById` / `toIterable`, and Paginators |
| [`GLOSSARY.md`](./GLOSSARY.md) | Concise A–Z glossary (ACID, Data Mapper, Dirty Checking, Identity Map, Optimistic/Pessimistic Locks, Savepoints, Unit of Work) |
| [`run-all-examples.php`](./run-all-examples.php) | Automated PHP CLI linter & runtime assertion runner verifying all 4 standalone SQLite PDO labs |
| [`chapters/`](./chapters) | 12 focused Markdown chapters across 3 progressive engineering tracks |
| [`labs/`](./labs) | 4 runnable SQLite `:memory:` PHP 8.3+ ORM benchmark & concurrency labs |

---

## Curriculum Overview (12 Chapters across 3 Tracks)

### Track 1 — Foundations, Modeling & Core CRUD
| # | Chapter | Core Topics & Patterns | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 01 | [ORM Architectures, Impedance Mismatch & Setup](./chapters/01_orm_setup.md) | Active Record vs Data Mapper, Identity Map, Multi-ORM table (Prisma/SQLAlchemy), `shouldBeStrict()`, Doctrine config | [`01_activerecord_vs_datamapper.php`](./labs/01_activerecord_vs_datamapper.php) |
| 02 | [Defining Models, Entities & Value Objects](./chapters/02_models_entities.md) | `$fillable`, `casts()`, Laravel 13 `#[Table]`/`#[Fillable]`, Doctrine `#[ORM\Entity]`, `#[ORM\Embedded]` (`Money`), UUIDv7/ULID | — |
| 03 | [Persisting, Updating, Upserts & Entity States](./chapters/03_saving_records.md) | `save()`, `create()`, `firstOrCreate`, `upsert()`, Doctrine `persist`/`flush`/`getReference`, entity states, Mass Assignment defense | — |
| 04 | [Querying Data, Scopes, DQL & Raw SQL Safety](./chapters/04_querying_data.md) | `where`/`when`, `#[Scope]`, `EntityRepository`, DQL/QueryBuilder, Global Scopes vs `SQLFilter`, parameterized SQL & sort allowlists | — |

### Track 2 — Relationships, Analytics & Data Integrity
| # | Chapter | Core Topics & Patterns | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 05 | [Associations, Polymorphic Models & N+1 Prevention](./chapters/05_orm_relations.md) | 1-1 / 1-N / M-N pivots, `morphTo` + `enforceMorphMap` vs Doctrine Inheritance, `with()` vs `JOIN FETCH`, `EXTRA_LAZY` | [`02_n_plus_one_and_eager_loading.php`](./labs/02_n_plus_one_and_eager_loading.php) |
| 06 | [Aggregations, Grouping & DTO Projections](./chapters/06_orm_aggregations.md) | `withCount`, `withSum`, subselects (`addSelect`), `GROUP BY`/`HAVING`, Doctrine `SELECT NEW` Readonly DTOs | — |
| 07 | [ACID Transactions, Savepoints & Concurrency Locks](./chapters/07_orm_transactions.md) | `DB::transaction(..., attempts: 3)`, `wrapInTransaction`, Savepoints, `afterCommit()`, `lockForUpdate` vs `#[ORM\Version]` | [`03_transactions_optimistic_locking.php`](./labs/03_transactions_optimistic_locking.php) |
| 08 | [Mutators, Accessors, Observers & Lifecycle Hooks](./chapters/08_lifecycle_hooks.md) | PHP 8 `Attribute::make`, `#[ObservedBy]`, `ShouldHandleEventsAfterCommit`, `#[AsEntityListener]`, mass-update bypass rules | — |

### Track 3 — Scale, Migrations & Clean Architecture
| # | Chapter | Core Topics & Patterns | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 09 | [Sorting, Offset Traps & High-Scale Cursor Pagination](./chapters/09_sorting_pagination.md) | Deterministic sorting tie-breakers, `paginate` vs `simplePaginate` vs `cursorPaginate`, Doctrine `Paginator` | [`04_cursor_vs_offset_pagination_and_hydration.php`](./labs/04_cursor_vs_offset_pagination_and_hydration.php) |
| 10 | [Hydration, Streaming Batches, Memory & Caching](./chapters/10_orm_optimization.md) | Heavy Entity vs DTO vs Array RAM reality, `chunkById`/`lazyById`, Doctrine `toIterable()` + `clear()`, SLC & Query Cache | [`04_cursor_vs_offset_pagination_and_hydration.php`](./labs/04_cursor_vs_offset_pagination_and_hydration.php) |
| 11 | [Schema Migrations, Indexing Strategy & ORM Testing](./chapters/11_orm_migrations_indexes_and_testing.md) | Expand-and-contract zero-downtime schema changes, FK & composite index order, Factories/Fixtures, SQL query budget tests | — |
| 12 | [Clean Architecture, CQRS Split & Decision Playbook](./chapters/12_orm_clean_architecture_and_benchmarks.md) | Repository Pattern nuance, Command vs Read DTO CQRS split, Eloquent vs Doctrine decision guide, Capstone Order/Ledger Blueprint | — |

---

## Quickstart: Run Standalone SQLite PDO Labs

Ensure PHP **8.3+** with `pdo_sqlite` is available, then run:

```bash
php run-all-examples.php
```
