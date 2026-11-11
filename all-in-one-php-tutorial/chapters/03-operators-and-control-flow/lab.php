<?php

declare(strict_types=1);

/**
 * Chapter 03 Lab: Operators, Null Coalescing, Spaceship & Match Expressions
 */

echo "=== Chapter 03: Operators & Control Flow ===" . PHP_EOL;

// 1. Null coalescing (??) and null coalescing assignment (??=)
$options = ['host' => '127.0.0.1'];
$port = $options['port'] ?? 3306;
$options['charset'] ??= 'utf8mb4';

echo "Host: {$options['host']}, Port: {$port}, Charset: {$options['charset']}" . PHP_EOL;

// 2. Spaceship operator (<=>)
$scores = [85, 92, 78, 95];
usort($scores, static fn (int $a, int $b): int => $b <=> $a);
echo "Sorted descending: " . implode(', ', $scores) . PHP_EOL;

// 3. Modern match expression (PHP 8.0+)
$resolveHttpMessage = static fn (int|string $statusCode): string => match ($statusCode) {
    200, 201 => 'OK / Created',
    400      => 'Bad Request',
    404      => 'Not Found',
    500      => 'Internal Server Error',
    '200'    => 'Strict string "200" (not integer 200)',
    default  => 'Other Status',
};

echo "Code 200 (int)   : " . $resolveHttpMessage(200) . PHP_EOL;
echo "Code '200' (str) : " . $resolveHttpMessage('200') . PHP_EOL;

// 4. Exhaustiveness check throwing UnhandledMatchError
try {
    $strictOnly = match (418) {
        200 => 'OK',
        404 => 'Missing',
    };
} catch (UnhandledMatchError $e) {
    echo "Caught UnhandledMatchError: " . $e->getMessage() . PHP_EOL;
}
