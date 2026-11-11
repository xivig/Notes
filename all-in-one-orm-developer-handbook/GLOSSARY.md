# ORM & PHP Database Architecture Glossary

Concise engineering definitions across Laravel Eloquent, Symfony Doctrine ORM 3, Relational SQL, and Concurrency Control.

---

### **ACID**
Atomicity, Consistency, Isolation, Durability — the four guarantees a relational transaction enforces (`DB::transaction`, `$em->wrapInTransaction`).

### **Active Record**
ORM pattern (Laravel **Eloquent**, Rails) where model instances extend a base database class and contain both state attributes and SQL persistence operations (`save()`, `delete()`).

### **Cursor (Keyset) Pagination**
Pagination using an indexed boundary condition (`WHERE (created_at, id) < (?, ?) LIMIT 25`) rather than `OFFSET N`, keeping deep-page lookups $O(\log N)$ and preventing duplicate-item drift on live feeds.

### **Data Mapper**
ORM pattern (Symfony **Doctrine 3**, Hibernate) that separates pure PHP domain Entities from SQL persistence logic managed externally by an `EntityManager` and `UnitOfWork`.

### **Dirty Checking**
Mechanism inside a Unit of Work comparing original hydrated field snapshots against current in-memory values so `flush()` emits SQL `UPDATE`s strictly for modified columns.

### **DQL (Doctrine Query Language)**
Object-oriented query dialect querying PHP **Entities and properties** (`SELECT p, c FROM App\Entity\Product p JOIN p.category c`) rather than raw table/column names.

### **Eager Loading (`with()` / `JOIN FETCH`)**
Loading related records upfront via batched `WHERE foreign_id IN (...)` queries (Eloquent) or SQL `JOIN FETCH` (Doctrine) to prevent N+1 loop queries.

### **Embeddable Value Object (`#[ORM\Embeddable]`)**
Immutable domain object (such as `Money` or `Address`) embedded inside an Entity whose scalar fields map cleanly onto columns of the owning table.

### **Hydration**
Converting raw database cursor arrays returned by PDO/DBAL into PHP Model/Entity instances, readonly DTOs (`SELECT NEW`), or scalar arrays (`HYDRATE_ARRAY`).

### **Identity Map**
In-memory lookup table inside Doctrine's `UnitOfWork` mapping `(EntityClass, PrimaryKey)` to one exact PHP object reference so repeated lookups within a session return the same instance (`$a === $b`).

### **Impedance Mismatch**
Structural friction between object graphs (inheritance, methods, object identity `===`) and relational tables (flat rows, foreign keys, primary keys, set algebra).

### **N+1 Query Problem**
Fetching $N$ parent records in 1 query and lazily running 1 extra `SELECT` per row inside a loop. Eliminated via `with()` / `JOIN FETCH` and enforced locally using `Model::preventLazyLoading()`.

### **Optimistic Locking (`#[ORM\Version]`)**
Concurrency guard storing an integer `version` column checked in `WHERE id = ? AND version = ?`; conflicting concurrent updates affect `0` rows and fail cleanly without holding database locks.

### **Pessimistic Locking (`lockForUpdate()`)**
Concurrency guard acquiring SQL `SELECT ... FOR UPDATE` row locks (`LockMode::PESSIMISTIC_WRITE`) inside an active transaction to serialize conflicting balance/stock updates.

### **Polymorphic Relation (`morphs` / `morphTo`)**
Association letting a single model (`Comment`, `Media`) link to multiple distinct parent model types (`Post`, `Product`) via `*_id` + `*_type` columns. Map aliases safely with `Relation::enforceMorphMap()`.

### **Proxy / Lazy Ghost Object**
Stand-in wrapper returned by `$em->getReference()` or lazy association properties that avoids querying the database unless properties other than the primary key are read.

### **Savepoint**
Named sub-transaction marker inside an outer transaction allowing nested transaction blocks to roll back partially (`ROLLBACK TO SAVEPOINT`) without aborting the outer unit.

### **Unit of Work**
Architectural component (`Doctrine\ORM\UnitOfWork`) tracking newly persisted, modified, and removed entities in memory and coordinating them into one ordered transactional commit on `flush()`.
