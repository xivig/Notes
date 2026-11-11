<?php

declare(strict_types=1);

/**
 * Chapter 02 Lab: Strict Types, Equality, Constants & Debug Types
 */

const APP_NAME = 'Modern PHP Handbook';

function calculateTotalCents(int $unitCents, int $qty): int
{
    return $unitCents * $qty;
}

echo "=== Chapter 02: Types, Variables & Strict Mode ===" . PHP_EOL;
echo "App: " . APP_NAME . PHP_EOL;

$totalCents = calculateTotalCents(1999, 3);
echo "Total: $" . number_format($totalCents / 100, 2) . PHP_EOL;

// Strict type enforcement demonstration
try {
    /** @phpstan-ignore-next-line */
    calculateTotalCents('1999', 2);
} catch (TypeError $e) {
    echo "Strict Types Caught TypeError: " . $e->getMessage() . PHP_EOL;
}

// Equality comparisons in PHP 8+
$comparisons = [
    "0 == 'abc'"   => (0 == 'abc'),
    "42 == '42'"   => (42 == '42'),
    "42 === '42'"  => (42 === '42'),
    "0 === false"  => (0 === false),
];

echo PHP_EOL . "Equality Checks:" . PHP_EOL;
foreach ($comparisons as $expr => $result) {
    echo sprintf("  %-14s => %s%s", $expr, $result ? 'true' : 'false', PHP_EOL);
}

// PHP 8.0+ get_debug_type()
$samples = [42, 3.14, 'hello', true, null, [1, 2], new stdClass()];
echo PHP_EOL . "get_debug_type() Values:" . PHP_EOL;
foreach ($samples as $sample) {
    echo "  - " . get_debug_type($sample) . PHP_EOL;
}
