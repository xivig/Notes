# Chapter 3 — Creating, Updating, Batch Upserts & Entity States

Persisting data looks simple (`$model->save()` vs `$em->flush()`), yet subtle differences between **immediate Active Record queries** and **Doctrine Unit of Work change-tracking** catch developers off guard.

---

## 1. Create, Update & Delete Side-by-Side

### Laravel Eloquent (Immediate SQL Execution)
```php
// 1. Instance + save() (useful when setting computed fields explicitly)
$product = new Product();
$product->sku = 'KB-900';
$product->name = 'Keychron K2';
$product->price_cents = 9900;
$product->save(); // Fires INSERT immediately

// 2. Mass-assignment via validated FormRequest data ONLY
$product = Product::create($request->validated());

// 3. Atomic find-or-create / upsert helpers
$tag = Tag::firstOrCreate(
    ['slug' => 'mechanical-keyboards'],   // Lookup WHERE criteria
    ['name' => 'Mechanical Keyboards'],   // Additional INSERT columns if missing
);

Product::updateOrCreate(
    ['sku' => 'KB-900'],
    ['price_cents' => 8900],
);

// 4. Delete (soft delete if SoftDeletes trait is active; otherwise DELETE)
$product->delete();
$product->forceDelete(); // Permanent SQL DELETE
```

### Symfony Doctrine ORM 3 (Deferred Unit of Work)
```php
// 1. Creating a new Entity: New -> Managed -> INSERT on flush()
$product = new Product('KB-900', 'Keychron K2', new Money(9900));
$em->persist($product); // No SQL ran yet! UnitOfWork only tracks $product in memory
$em->flush();           // Opens DB transaction -> executes batched INSERTs -> commits!

// 2. Updating a Managed Entity: dirty-checking is AUTOMATIC (no persist() needed!)
$managed = $em->find(Product::class, $id);
$managed->rename('Keychron K2 Pro');
$em->flush(); // UnitOfWork diffs original snapshot vs current property -> fires UPDATE only if changed

// 3. Assigning a Foreign Key WITHOUT an extra SELECT (`getReference` Proxy!)
$categoryRef = $em->getReference(Category::class, $categoryId); // Zero DB query!
$product->assignCategory($categoryRef);
$em->flush();

// 4. Removing
$em->remove($managed);
$em->flush();
```

---

## 2. Doctrine Entity Lifecycle States

```text
   new Product(...)
          │
          ▼
    [ NEW / TRANSIENT ] ─── persist() ──▶ [ MANAGED ] ◀── find() / DQL SELECT
                                            │   ▲
                                   detach() │   │ refresh() / DB reload
                                   clear()  ▼   │
                                        [ DETACHED ]
                                            │
                                   remove() ▼
                                        [ REMOVED ] ── flush() ──▶ SQL DELETE
```
- **Never call `$em->persist($existingEntity)` needlessly on managed entities** — UnitOfWork already tracks changes on every entity fetched from a repository.
- **Mass batch pitfall**: calling `flush()` inside a 10,000-row loop kills performance. Batch `persist()` every `200` items, then call `$em->flush(); $em->clear();` to purge the Identity Map safely!

---

## 3. High-Speed Bulk `upsert()` & Chunked Inserts

When importing thousands of catalog SKUs, one `INSERT`/`UPDATE` per loop takes seconds; single-query bulk upserts take milliseconds:

```php
// Laravel Eloquent native multi-row SQL UPSERT (`INSERT ... ON DUPLICATE KEY UPDATE` / `ON CONFLICT`)
Product::upsert(
    values: [
        ['sku' => 'SKU-01', 'name' => 'Mouse', 'price_cents' => 2500],
        ['sku' => 'SKU-02', 'name' => 'Mat', 'price_cents' => 1500],
    ],
    uniqueBy: ['sku'],          // Requires UNIQUE index on MySQL/PostgreSQL/SQLite!
    update: ['name', 'price_cents'],
);
```
> **Note:** `Product::upsert()` and `Product::where(...)->update([...])` run directly at SQL level — **skipping Eloquent/Doctrine model lifecycle events, timestamps casts checks, and observers**. Reserve them for bulk syncs/ETL and re-touch `updated_at` manually when needed.

---

## 4. Defending Mass Assignment (`$fillable` vs DTO Hydration)

| ORM | Vulnerability Vector | Mandatory Defense |
| :--- | :--- | :--- |
| **Eloquent** | Passing `$request->all()` into `User::create()` lets attackers inject `is_admin=1` or `role=admin` | Declare explicit `$fillable` allowlist **AND** pass ONLY `$request->validated()` |
| **Doctrine** | Auto-mapping raw JSON payloads via blind setters (`setIsAdmin`) | Hydrate validated Form/Serializer DTOs into explicit domain constructors/methods (`changeEmail(...)`) |

---

## Key Takeaways
- Eloquent fires SQL immediately on `save()`; Doctrine accumulates changes in memory until a single transactional `$em->flush()`.
- Use `$em->getReference(Category::class, $id)` in Doctrine when attaching known foreign keys to skip redundant `SELECT` roundtrips.
- Never pass unvalidated `$request->all()` into `create()` or `update()` — strictly combine `$fillable` + `$request->validated()`.

> **Previous:** [Chapter 2 — Models & Entities](./02_models_entities.md) · **Next:** [Chapter 4 — Querying Data, Scopes & DQL](./04_querying_data.md)
