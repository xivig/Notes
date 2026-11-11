# Chapter 12 — Clean Architecture, Repository Pattern, CQRS Split & Decision Playbook

Knowing *how* Eloquent and Doctrine work is half the skill — knowing **when NOT to wrap Eloquent in a heavy Repository layer**, **when to bypass ORMs via CQRS Read DTOs**, and **which ORM fits your project** separates maintainable production systems from over-engineered ones.

---

## 1. Do You Need the Repository Pattern?

| Architecture / ORM | Should You Write Custom Repository Classes? | Cleanest Boundary Pattern |
| :--- | :--- | :--- |
| **Doctrine ORM 3 (Data Mapper)** | **YES — built in!** (`ServiceEntityRepository`) | Keeps DQL/Criteria lookups cleanly separated from POPO Domain Entities and `EntityManager` flush orchestration |
| **Laravel Eloquent (Active Record)** | **Usually NO!** Wrapping `EloquentUserRepository` around `Model` adds boilerplate while breaking Eloquent scopes, relations, and `with()` | Put writes in focused **Action** classes (`PublishOrderAction` wrapped in `DB::transaction`), reusable queries in **Model Scopes**, and complex queries in **Query Objects** |

---

## 2. CQRS Read / Write Split in Production Apps

Every large ORM system eventually separates **Command (Write)** paths from **Query (Read)** paths cleanly inside one database (no microservice needed!):

```text
WRITE / COMMAND SIDE (Strict Domain Safety):
  CheckoutAction -> Eloquent Model + lockForUpdate() / Doctrine Entity + UnitOfWork + Version Lock
                    (Enforces invariants, FK integrity, tax calculations, audit ledger)

READ / REPORTING SIDE (Raw Speed & Zero Overhead):
  SalesDashboardQuery -> Parameterized DB::table()->join() / DBAL QueryBuilder -> Immutable SummaryDto
                         (Skips Model/Entity instantiation, dirty snapshots & proxy lazy wrappers)
```

---

## 3. Framework Selection Playbook (Eloquent vs Doctrine)

Choose **Laravel Eloquent (Active Record)** when:
- Building SaaS products, CMS platforms, REST APIs, CRUD admin portals, or teams shipping fast with Migrations + Factories + Queues.
- Domain models map closely 1-to-1 with normalized database tables and business rules live cleanly in Action classes + FormRequests + Policies.

Choose **Symfony Doctrine ORM 3 (Data Mapper)** when:
- Building strict Domain-Driven Design (DDD) cores where Domain Entities must remain framework-agnostic POPOs with Value Objects (`#[ORM\Embedded]`), Inheritance (`SINGLE_TABLE`/`JOINED`), and constructor invariants.
- Managing complex multi-entity object graphs needing an Identity Map (`$a === $b`), deferred batched `flush()` commits, or second-level entity caching.

Choose **Bypassing the ORM (Raw DBAL / `DB::table` / CTEs)** when:
- Running BI analytics (`WITH RECURSIVE` CTEs, window functions `ROW_NUMBER() OVER (...)`, pivot tables).
- Importing or archiving hundreds of thousands of rows (`upsert()`, `INSERT INTO ... SELECT ...`).

---

## 4. Production ORM Readiness Checklist & Capstone Blueprint

Build the **Multi-Vendor Order & Ledger Engine** using every discipline across Chapters 1–12:
1. `Model::shouldBeStrict(! app()->isProduction())` (or Doctrine metadata/query/result APCu/Redis cache in prod).
2. `Money` immutable Value Object backed by integer `*_cents` columns (never `FLOAT`).
3. Polymorphic `comments`/`media` with `Relation::enforceMorphMap()` (Eloquent) or Doctrine table inheritance.
4. `DB::transaction(..., attempts: 3)` with `lockForUpdate()` on wallet/inventory stock + `version` optimistic locks on admin edits + `DB::afterCommit()` before dispatching notifications.
5. `chunkById(500)` / `toIterable()` + `$em->clear()` for batch jobs, `cursorPaginate(25)` on infinite feeds, and automated SQL query-count tests (`<= 4` queries) in CI!

> **Previous:** [Chapter 11 — Migrations, Indexes & Testing](./11_orm_migrations_indexes_and_testing.md) · **Dashboard:** [Side-by-Side Comparison Portal](../index.html#compare-section) · **Hub:** [Home](../README.md)
