<?php

declare(strict_types=1);

/**
 * Chapter 04 Lab: Named Arguments, Closures, First-Class Callables & Generators
 */

class Calculator
{
    public function add(int $a, int $b): int
    {
        return $a + $b;
    }
}

function createOrderSummary(
    string $customer,
    float $subtotal,
    float $taxRate = 0.10,
    string $currency = 'USD',
): string {
    $total = $subtotal * (1 + $taxRate);
    return sprintf('%s: %s %.2f', $customer, $currency, $total);
}

function generateFibonacci(int $count): Generator
{
    $a = 0;
    $b = 1;
    for ($i = 0; $i < $count; $i++) {
        yield $a;
        [$a, $b] = [$b, $a + $b];
    }
}

echo "=== Chapter 04: Functions, Closures & Callables ===" . PHP_EOL;

// 1. Named arguments skipping default $taxRate
echo createOrderSummary(customer: 'Alice', subtotal: 100.0, currency: 'EUR') . PHP_EOL;

// 2. First-class callables (PHP 8.1+)
$lengthFn = strlen(...);
echo "Length of 'Modern PHP': " . $lengthFn('Modern PHP') . PHP_EOL;

$calc = new Calculator();
$adder = $calc->add(...);
echo "Calculator::add(15, 25) = " . $adder(15, 25) . PHP_EOL;

// Clean pipeline with first-class callable + arrow function
$rawNames = ['  alice ', ' BOB', 'charlie  '];
$cleaned = array_map(trim(...), $rawNames);
$upper = array_map(strtoupper(...), $cleaned);
echo "Normalized names: " . implode(', ', $upper) . PHP_EOL;

// 3. Generator lazy sequence
$fibs = iterator_to_array(generateFibonacci(8));
echo "First 8 Fibonacci numbers: " . implode(', ', $fibs) . PHP_EOL;
