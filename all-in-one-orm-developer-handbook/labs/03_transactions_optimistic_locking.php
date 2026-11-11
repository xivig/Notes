<?php

declare(strict_types=1);

/**
 * Lab 03 — ACID Transactions, Nested Savepoints & Optimistic Locking (`version`)
 * Run: php labs/03_transactions_optimistic_locking.php
 */

$pdo = new PDO('sqlite::memory:', null, null, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

$pdo->exec('
CREATE TABLE wallets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    owner TEXT NOT NULL,
    balance_cents INTEGER NOT NULL CHECK (balance_cents >= 0),
    version INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE ledger (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wallet_id INTEGER NOT NULL,
    delta_cents INTEGER NOT NULL,
    note TEXT NOT NULL
);');

$pdo->exec("INSERT INTO wallets (owner, balance_cents, version) VALUES ('Alice', 10000, 1), ('Bob', 2500, 1);");

// ----------------------------------------------------------------------------
// 1. ATOMIC TRANSACTION ROLLBACK ON FAILURE
// ----------------------------------------------------------------------------
$pdo->beginTransaction();
try {
    $pdo->prepare('UPDATE wallets SET balance_cents = balance_cents - ? WHERE id = 1')->execute([3000]);
    $pdo->prepare("INSERT INTO ledger (wallet_id, delta_cents, note) VALUES (1, -3000, 'Transfer out')")->execute();

    // Simulate downstream failure (e.g. CHECK constraint violation or service error)
    throw new RuntimeException('Payment gateway timeout');
} catch (RuntimeException) {
    $pdo->rollBack();
}

$aliceBalance = (int) $pdo->query('SELECT balance_cents FROM wallets WHERE id = 1')->fetchColumn();
$ledgerCount = (int) $pdo->query('SELECT COUNT(*) FROM ledger')->fetchColumn();
assert($aliceBalance === 10000 && $ledgerCount === 0, 'Rollback must revert partial transfer + ledger.');
echo "[ACID Rollback] Partial update reverted cleanly: Alice = {$aliceBalance} cents, ledger rows = {$ledgerCount}\n";

// ----------------------------------------------------------------------------
// 2. NESTED SAVEPOINT (Partial rollback inside an outer transaction)
// ----------------------------------------------------------------------------
$pdo->beginTransaction();
$pdo->prepare("INSERT INTO ledger (wallet_id, delta_cents, note) VALUES (2, 500, 'Deposit ok')")->execute();
$pdo->exec('SAVEPOINT bonus_step');
try {
    $pdo->prepare("INSERT INTO ledger (wallet_id, delta_cents, note) VALUES (2, 100, 'Failing promo')")->execute();
    throw new DomainException('Promo quota exhausted');
} catch (DomainException) {
    $pdo->exec('ROLLBACK TO SAVEPOINT bonus_step');
    $pdo->exec('RELEASE SAVEPOINT bonus_step');
}
$pdo->commit();

$ledgerCountAfter = (int) $pdo->query('SELECT COUNT(*) FROM ledger')->fetchColumn();
assert($ledgerCountAfter === 1, 'Savepoint rollback preserves outer deposit while cancelling failing promo.');
echo "[Savepoint] Outer commit kept valid deposit; rolled back only failing promo step (ledger rows = {$ledgerCountAfter})\n";

// ----------------------------------------------------------------------------
// 3. OPTIMISTIC LOCKING WITH `version` COLUMN (Lost-Update Prevention)
// ----------------------------------------------------------------------------
$workerA = $pdo->query('SELECT id, balance_cents, version FROM wallets WHERE id = 1')->fetch();
$workerB = $pdo->query('SELECT id, balance_cents, version FROM wallets WHERE id = 1')->fetch();

// Worker A deducts 2000 cents using loaded version = 1 -> SUCCEEDS (updates version 1 -> 2)
$stmtA = $pdo->prepare('UPDATE wallets SET balance_cents = ?, version = version + 1 WHERE id = ? AND version = ?');
$stmtA->execute([(int) $workerA['balance_cents'] - 2000, $workerA['id'], $workerA['version']]);
assert($stmtA->rowCount() === 1, 'First writer must succeed.');

// Stale Worker B tries deducting 1500 cents with stale version = 1 -> 0 ROWS AFFECTED!
$stmtB = $pdo->prepare('UPDATE wallets SET balance_cents = ?, version = version + 1 WHERE id = ? AND version = ?');
$stmtB->execute([(int) $workerB['balance_cents'] - 1500, $workerB['id'], $workerB['version']]);
assert($stmtB->rowCount() === 0, 'Stale writer must affect 0 rows and raise OptimisticLockException!');

$finalWallet = $pdo->query('SELECT balance_cents, version FROM wallets WHERE id = 1')->fetch();
assert((int) $finalWallet['balance_cents'] === 8000 && (int) $finalWallet['version'] === 2);
echo "[Optimistic Lock] Worker A committed (v1 -> v2, balance = {$finalWallet['balance_cents']}); stale Worker B blocked safely (0 rows updated)\n";
