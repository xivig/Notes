# Chapter 7 — ACID Transactions, Savepoints, Concurrency Locks & Deadlock Retries

Real-world inventory deductions, financial transfers, and multi-table state changes fail corruptively under concurrent requests unless guarded by **ACID transactions**, **post-commit side-effect deferrals**, and **optimistic or pessimistic row locks**.

---

## 1. Wrapping Atomic Multi-Step Writes (`ACID`)

### Laravel Eloquent (`DB::transaction` + Automatic Deadlock Retries)
```php
use Illuminate\Support\Facades\DB;

DB::transaction(function () use ($buyerId, $sku, $amountCents): void {
    $wallet = Wallet::where('user_id', $buyerId)->lockForUpdate()->firstOrFail();

    if ($wallet->balance_cents < $amountCents) {
        throw new DomainException('Insufficient funds.');
    }

    $wallet->decrement('balance_cents', $amountCents);
    Order::create(['user_id' => $buyerId, 'sku' => $sku, 'total_cents' => $amountCents]);

    // Fires ONLY AFTER the outer DB transaction commits successfully!
    DB::afterCommit(fn () => DispatchOrderEmailJob::dispatch($buyerId, $sku));
}, attempts: 3); // Retries automatically on MySQL/Postgres deadlock!
```

### Symfony Doctrine ORM 3 (`$em->wrapInTransaction`)
```php
$entityManager->wrapInTransaction(function (EntityManagerInterface $em) use ($buyerId, $amountCents): void {
    // Acquire pessimistic row lock via LockMode!
    $wallet = $em->find(Wallet::class, $buyerId, \Doctrine\DBAL\LockMode::PESSIMISTIC_WRITE);
    $wallet->debit($amountCents);
    $em->persist(new LedgerEntry($wallet, -$amountCents));
    // wrapInTransaction automatically flushes & commits, or rolls back on exception!
});
```

> [!WARNING]
> **Critical Doctrine Exception & Worker Pitfall**
> If a `DBALException` or uncaught exception happens during `$em->flush()` and rolls back manually in older `beginTransaction()` blocks, Doctrine **closes the `EntityManager`** (`!$em->isOpen()`). Never swallow the error and continue using that `EntityManager` inside long-running queue workers (`Messenger` / `Horizon`) — reset it via `ManagerRegistry::resetManager()`.

---

## 2. Savepoints (Partial Rollbacks Inside Transactions) & Side-Effect Timing

- When `DB::transaction(...)` is nested inside an active outer transaction in Laravel (or via `SAVEPOINT` in SQL/DBAL), throwing inside the inner block rolls back **only to that savepoint**, leaving the outer valid statements intact if caught cleanly!
- **Never dispatch emails, webhooks, or queue jobs inside an uncommitted transaction without `DB::afterCommit()` (or Messenger's `dispatch_after_current_bus` / transactional outbox)**: a queue worker can start *before* the DB transaction commits (seeing missing rows) or execute even if the transaction later rolls back!

---

## 3. Pessimistic Locking vs Optimistic Locking

| Strategy | How It Works | Best Fit | Tradeoff |
| :--- | :--- | :--- | :--- |
| **Pessimistic Write Lock** | `SELECT ... FOR UPDATE` (`->lockForUpdate()` / `LockMode::PESSIMISTIC_WRITE`) | High-contention bank balances, flash-sale stock decrement inside short TXs | Holds DB row locks — keep transaction short & lock tables in deterministic PK order to avoid deadlocks |
| **Shared Read Lock** | `SELECT ... FOR SHARE` (`->sharedLock()` / `LockMode::PESSIMISTIC_READ`) | Ensuring referenced rows aren't modified until TX finishes | Blocks writers while allowing other readers |
| **Optimistic Locking** | Integer `version` column checked in `WHERE id = ? AND version = ?` | Low-contention forms, CMS edits, API `ETag` concurrency (`If-Match`) | Zero DB lock waiting; conflicting stale updates fail fast cleanly so callers can reload & retry |

```php
// Doctrine native Optimistic Locking attribute (`#[ORM\Version]`)
#[ORM\Entity]
final class InventoryItem
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\Version, ORM\Column(type: 'integer')]
    private int $version = 1; // Checked automatically on flush(); throws OptimisticLockException!
}

// Laravel Optimistic Lock equivalent (`where` version + increment):
$updated = InventoryItem::where('id', $id)
    ->where('version', $loadedVersion)
    ->update([
        'stock' => DB::raw('stock - 1'),
        'version' => DB::raw('version + 1'),
    ]);
if ($updated === 0) {
    throw new StaleObjectException('Record changed concurrently; reload and retry.');
}
```

> **Try It Locally:** Run [`labs/03_transactions_optimistic_locking.php`](../labs/03_transactions_optimistic_locking.php) to see full ACID rollback, nested savepoints, and stale-version write detection live on SQLite PDO!

---

## Key Takeaways
- Always pass `attempts: 3` (or idempotent retry handlers) and keep transaction blocks free of external HTTP calls (`Http::get`, Stripe API calls inside `DB::transaction()` hold DB locks while waiting on remote networks!).
- Defer emails and async jobs cleanly with `DB::afterCommit()`.
- Pick **Pessimistic `lockForUpdate`** for millisecond financial/stock updates and **Optimistic `version` locking** for long-lived multi-user form edits.

> **Previous:** [Chapter 6 — Aggregations & DTOs](./06_orm_aggregations.md) · **Next:** [Chapter 8 — Mutators, Casts, Observers & Lifecycle Hooks](./08_lifecycle_hooks.md)
