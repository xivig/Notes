<?php

declare(strict_types=1);

/**
 * Chapter 18 Capstone Lab: Dependency Injection, WeakMap Caching, Mini Container & Self-Test Suite
 */

enum InvoiceStatus: string
{
    case Draft = 'draft';
    case Paid  = 'paid';
}

interface DiscountPolicy
{
    public function apply(int $amountCents): int;
}

final readonly class PercentageDiscount implements DiscountPolicy
{
    public function __construct(private int $percent)
    {
        if ($percent < 0 || $percent > 100) {
            throw new InvalidArgumentException('Discount percent must be 0..100.');
        }
    }

    public function apply(int $amountCents): int
    {
        return (int) round($amountCents * (100 - $this->percent) / 100);
    }
}

final class Invoice
{
    public function __construct(
        public readonly string $id,
        public readonly int $subtotalCents,
        public InvoiceStatus $status = InvoiceStatus::Draft,
    ) {}
}

final class PricingService
{
    /** @var WeakMap<Invoice, int> */
    private WeakMap $totalCache;

    public function __construct(private DiscountPolicy $discountPolicy)
    {
        $this->totalCache = new WeakMap();
    }

    public function calculateTotalCents(Invoice $invoice): int
    {
        // WeakMap memoizes per Invoice instance without preventing garbage collection
        return $this->totalCache[$invoice] ??= $this->discountPolicy->apply($invoice->subtotalCents);
    }
}

final class SimpleContainer
{
    /** @var array<string, callable(self): object> */
    private array $bindings = [];

    /** @param callable(self): object $factory */
    public function set(string $id, callable $factory): void
    {
        $this->bindings[$id] = $factory;
    }

    public function get(string $id): object
    {
        if (!isset($this->bindings[$id])) {
            throw new RuntimeException("Service not registered: {$id}");
        }
        return ($this->bindings[$id])($this);
    }
}

function assertSameValue(mixed $expected, mixed $actual, string $label): void
{
    if ($expected !== $actual) {
        throw new AssertionError("FAIL [{$label}]: expected " . var_export($expected, true) . ", got " . var_export($actual, true));
    }
    echo "  [TEST PASS] {$label}" . PHP_EOL;
}

echo "=== Chapter 18 Capstone: Architecture, WeakMap & Unit Verification ===" . PHP_EOL;

$container = new SimpleContainer();
$container->set(DiscountPolicy::class, static fn (): DiscountPolicy => new PercentageDiscount(20));
$container->set(
    PricingService::class,
    static fn (SimpleContainer $c): PricingService => new PricingService($c->get(DiscountPolicy::class))
);

/** @var PricingService $pricing */
$pricing = $container->get(PricingService::class);
$invoice = new Invoice('INV-2026-01', 10000);

assertSameValue(8000, $pricing->calculateTotalCents($invoice), '20% discount on 10000 cents');
assertSameValue(8000, $pricing->calculateTotalCents($invoice), 'WeakMap cache hit returns 8000');
assertSameValue(InvoiceStatus::Draft, $invoice->status, 'Default InvoiceStatus is Draft');

echo "All capstone assertions verified." . PHP_EOL;
