<?php

declare(strict_types=1);

/**
 * Chapter 14 Lab: Custom Exception Hierarchy, Finally & Cooperative Fibers (PHP 8.1+)
 */

final class InsufficientFundsException extends RuntimeException
{
    public function __construct(
        public readonly int $balanceCents,
        public readonly int $requestedCents,
        ?Throwable $previous = null,
    ) {
        parent::__construct(
            "Insufficient funds: balance={$balanceCents}, requested={$requestedCents}",
            422,
            $previous
        );
    }
}

function debit(int $balanceCents, int $amountCents): int
{
    if ($amountCents <= 0) {
        throw new InvalidArgumentException('Amount must be positive.');
    }
    if ($amountCents > $balanceCents) {
        throw new InsufficientFundsException($balanceCents, $amountCents);
    }
    return $balanceCents - $amountCents;
}

echo "=== Chapter 14: Exceptions & Cooperative Fibers ===" . PHP_EOL;

// 1. Custom Exception + finally
try {
    debit(1000, 2500);
} catch (InsufficientFundsException $e) {
    echo "Caught Domain Exception: {$e->getMessage()} (code={$e->getCode()})" . PHP_EOL;
} finally {
    echo "Cleanup finally block always executes." . PHP_EOL;
}

// 2. Cooperative Fiber scheduling (PHP 8.1+)
$fiber = new Fiber(function (): string {
    echo "  [Fiber] Step 1 started..." . PHP_EOL;
    $fromMain = Fiber::suspend('yield-1');
    echo "  [Fiber] Resumed with: {$fromMain}" . PHP_EOL;
    $secondInput = Fiber::suspend('yield-2');
    echo "  [Fiber] Finalizing with: {$secondInput}" . PHP_EOL;
    return 'fiber-done';
});

$firstYield  = $fiber->start();
echo "[Main] Received: {$firstYield}" . PHP_EOL;

$secondYield = $fiber->resume('payload-A');
echo "[Main] Received: {$secondYield}" . PHP_EOL;

$fiber->resume('payload-B');
echo "[Main] Fiber terminated? " . ($fiber->isTerminated() ? 'yes' : 'no') . " | Return: " . $fiber->getReturn() . PHP_EOL;
