# Chapter 17: Databases with PDO, Prepared Statements & Transactions

> **Scope:** PHP 8.0–8.5 · `PDO` (MySQL 8.4 & SQLite), `ATTR_EMULATE_PREPARES => false`, Prepared Statements, SQL Injection Defense, Transactions, and Repository Pattern.

---

## 1. Learning Objectives

- Configure **PDO** safely (`ERRMODE_EXCEPTION`, `FETCH_ASSOC`, `ATTR_EMULATE_PREPARES => false`, `utf8mb4`).
- Prevent SQL injection unconditionally using **prepared statements** (`:named` and `?` placeholders) plus strict allowlists for dynamic identifiers (`ORDER BY`).
- Execute atomic multi-step writes with `beginTransaction()`, `commit()`, and `rollBack()`.
- Design clean, testable Repository classes instead of sprinkling raw SQL throughout templates.

---

## 2. Production MySQL 8.4 PDO Configuration

```php
$pdo = new PDO(
    'mysql:host=127.0.0.1;port=3306;dbname=app_db;charset=utf8mb4',
    $dbUser,
    $dbPassword,
    [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]
);
```

### Why `ATTR_EMULATE_PREPARES => false` Matters
With real server-side prepares enabled:
- Parameters are transmitted separately from the SQL statement plan.
- Integer/float columns come back with native PHP types instead of stringified values where drivers support it.

---

## 3. Atomic Transactions

```php
$pdo->beginTransaction();

try {
    $debit = $pdo->prepare('UPDATE accounts SET balance_cents = balance_cents - :amt WHERE id = :id AND balance_cents >= :amt');
    $debit->execute(['amt' => 5000, 'id' => 1]);
    if ($debit->rowCount() !== 1) {
        throw new RuntimeException('Insufficient funds');
    }

    $credit = $pdo->prepare('UPDATE accounts SET balance_cents = balance_cents + :amt WHERE id = :id');
    $credit->execute(['amt' => 5000, 'id' => 2]);

    $pdo->commit();
} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    throw $e;
}
```

---

## 4. Runnable Lab (Zero-Setup SQLite In-Memory)

Run [lab.php](lab.php) — executes real DDL, inserts, prepared queries, dynamic sort allowlisting, and rollback recovery directly in memory via `pdo_sqlite`:

```bash
php chapters/17-databases-pdo-and-transactions/lab.php
```

---

## 5. Common Mistakes & Best Practices

- **Mistake:** Thinking PDO can bind **table or column names** (`ORDER BY :sort_col`)—SQL placeholders only bind **values**, never identifiers! Always validate dynamic `ORDER BY` columns against a strict server-side `match` or `in_array(..., true)` allowlist.
- **Mistake:** Putting database credentials directly in PHP files committed to Git. Load credentials from environment variables (`$_ENV` / secrets manager).
- **Best Practice:** Wrap multi-table writes in transactions, keep transactions short, and test rollback paths explicitly.

---

## 6. Exercises & Interview Q&A

1. **Exercise:** Extend `lab.php` with an `OrderRepository` method `transferStock(int $fromId, int $toId, int $qty)` that validates `$stmt->rowCount() === 1` and rolls back on failure.
2. **Q: Why can't prepared statements bind an `ORDER BY` column name?**  
   **A:** Database engines compile the SQL AST and choose indexes before binding parameter values. Identifiers like table and column names change query semantics and must be verified via an explicit allowlist in PHP before interpolation.

---

⬅️ [Chapter 16](../16-web-security-sessions-and-validation/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 18: Testing, Static Analysis, Performance & Architecture](../18-testing-performance-and-architecture/README.md)
