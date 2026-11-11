<?php

declare(strict_types=1);

/**
 * Chapter 05 Lab: Arrays, Unpacking, Destructuring & Functional Pipelines
 */

echo "=== Chapter 05: Arrays & Functional Pipelines ===" . PHP_EOL;

$products = [
    ['id' => 1, 'name' => 'Mechanical Keyboard', 'price' => 120, 'active' => true],
    ['id' => 2, 'name' => 'Legacy Mouse',        'price' => 25,  'active' => false],
    ['id' => 3, 'name' => '4K Monitor',          'price' => 380, 'active' => true],
    ['id' => 4, 'name' => 'USB-C Hub',           'price' => 45,  'active' => true],
];

// 1. Filter -> Re-index -> Sort -> Map pipeline
$activeProducts = array_values(array_filter(
    $products,
    static fn (array $item): bool => $item['active']
));

usort($activeProducts, static fn (array $a, array $b): int => $a['price'] <=> $b['price']);

$labels = array_map(
    static fn (array $item): string => "{$item['name']} (\${$item['price']})",
    $activeProducts
);

echo "Active sorted products: " . implode(' | ', $labels) . PHP_EOL;

// 2. Total value using array_reduce
$totalActiveValue = array_reduce(
    $activeProducts,
    static fn (int $carry, array $item): int => $carry + $item['price'],
    0
);
echo "Total active catalog price: \${$totalActiveValue}" . PHP_EOL;

// 3. array_is_list() & JSON safety (PHP 8.1+)
$sparse = [0 => 'a', 2 => 'c'];
$dense  = array_values($sparse);
echo "Sparse is list? " . (array_is_list($sparse) ? 'yes' : 'no') . " -> " . json_encode($sparse) . PHP_EOL;
echo "Dense is list?  " . (array_is_list($dense) ? 'yes' : 'no') . " -> " . json_encode($dense) . PHP_EOL;

// 4. Associative array unpacking (PHP 8.1+) & indexing with array_column
$defaults = ['perPage' => 20, 'sort' => 'asc'];
$overrides = ['perPage' => 50];
$queryConfig = [...$defaults, ...$overrides];
echo "Query config: " . json_encode($queryConfig) . PHP_EOL;

$byId = array_column($products, 'name', 'id');
echo "Lookup ID 3: " . ($byId[3] ?? 'Unknown') . PHP_EOL;
