<?php

declare(strict_types=1);

/**
 * Chapter 13 Lab (PHP 8.5+ Only): Pipe Operator (|>), Clone With, #[NoDiscard], array_first/last
 */

final readonly class Book
{
    public function __construct(
        public string $title,
        public int $edition = 1,
    ) {}

    #[\NoDiscard('Returns a new immutable Book instance')]
    public function withEdition(int $edition): self
    {
        return clone($this, ['edition' => $edition]);
    }
}

echo "=== Chapter 13 (PHP 8.5+): Pipe Operator & Clone With ===" . PHP_EOL;

$slug = '  Modern PHP 8.5 Handbook  '
    |> trim(...)
    |> strtolower(...)
    |> (static fn (string $s): string => str_replace(' ', '-', $s));

echo "Piped slug: {$slug}" . PHP_EOL;

$v1 = new Book('PHP Developer Handbook');
$v2 = $v1->withEdition(2);
echo "V1 edition={$v1->edition}, V2 edition={$v2->edition}" . PHP_EOL;

$items = ['first', 'middle', 'last'];
echo "array_first=" . (array_first($items) ?? 'null') . ", array_last=" . (array_last($items) ?? 'null') . PHP_EOL;
