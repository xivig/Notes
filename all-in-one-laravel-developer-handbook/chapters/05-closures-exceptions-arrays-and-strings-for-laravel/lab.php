<?php

declare(strict_types=1);

/**
 * Chapter 05 Lab: Closures, Arrow Functions, Exceptions, Native Arr/Str Helpers & Mini Collection.
 */

final class MiniArr
{
    /**
     * Equivalent to Laravel's Arr::only() for flat associative keys.
     *
     * @param array<string, mixed> $array
     * @param list<string> $keys
     * @return array<string, mixed>
     */
    public static function only(array $array, array $keys): array
    {
        return array_intersect_key($array, array_flip($keys));
    }
}

final class MiniStr
{
    /** @param string|list<string> $needles */
    public static function contains(string $haystack, string|array $needles, bool $ignoreCase = false): bool
    {
        foreach ((array) $needles as $needle) {
            if ($needle === '') {
                continue;
            }
            $found = $ignoreCase
                ? str_contains(mb_strtolower($haystack), mb_strtolower($needle))
                : str_contains($haystack, $needle);
            if ($found) {
                return true;
            }
        }
        return false;
    }

    public static function slug(string $title): string
    {
        $ascii = strtolower(trim($title));
        $collapsed = preg_replace('/[^a-z0-9]+/', '-', $ascii) ?? '';
        return trim($collapsed, '-');
    }
}

final class InsufficientStockException extends RuntimeException {}

function reserveStock(int $available, int $requested): int
{
    if ($requested <= 0) {
        throw new InvalidArgumentException('Requested quantity must be positive.');
    }
    if ($requested > $available) {
        throw new InsufficientStockException("Only {$available} unit(s) available, asked for {$requested}.");
    }
    return $available - $requested;
}

// 1. Closures, arrow functions & array pipelines
$orders = [
    ['id' => 1, 'customer' => '  Alice ', 'total' => 120, 'paid' => true, 'secret' => 'token_x'],
    ['id' => 2, 'customer' => 'Bob', 'total' => 45, 'paid' => false, 'secret' => 'token_y'],
    ['id' => 3, 'customer' => 'Charlie', 'total' => 230, 'paid' => true, 'secret' => 'token_z'],
];

$minTotal = 100;
$highValuePaid = array_values(array_filter(
    $orders,
    static fn (array $o): bool => $o['paid'] && $o['total'] >= $minTotal
));

$sanitized = array_map(
    static fn (array $o): array => MiniArr::only(
        ['id' => $o['id'], 'customer' => trim($o['customer']), 'total' => $o['total']],
        ['id', 'customer', 'total']
    ),
    $highValuePaid
);

$revenue = array_reduce(
    $sanitized,
    static fn (int $carry, array $o): int => $carry + $o['total'],
    0
);

echo 'Sanitized paid >= $100: ' . json_encode($sanitized, JSON_THROW_ON_ERROR) . PHP_EOL;
echo 'Total revenue: ' . $revenue . PHP_EOL;

// 2. String helpers & regex hashtag extraction
$postTitle = '  Building APIs with Laravel 13 & PHP 8.5!  ';
echo 'Slug: ' . MiniStr::slug($postTitle) . PHP_EOL;
echo 'Mentions Laravel (ignoreCase)? ' . (MiniStr::contains($postTitle, ['symfony', 'laravel'], ignoreCase: true) ? 'yes' : 'no') . PHP_EOL;

preg_match_all('/#([a-zA-Z0-9_]+)/', 'Loving #Laravel13 and #PHP85 today', $found);
echo 'Extracted tags: ' . implode(', ', $found[1]) . PHP_EOL;

// 3. Exception hierarchy catch order + finally
try {
    $remaining = reserveStock(available: 3, requested: 5);
    echo 'Remaining: ' . $remaining . PHP_EOL;
} catch (InsufficientStockException $e) {
    echo 'Business error handled cleanly: ' . $e->getMessage() . PHP_EOL;
} catch (Throwable $e) {
    echo 'Unexpected error: ' . $e->getMessage() . PHP_EOL;
} finally {
    echo 'Cleanup lock released in finally block.' . PHP_EOL;
}
