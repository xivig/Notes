<?php

declare(strict_types=1);

/**
 * Chapter 04 Lab (PHP >= 8.5): Pipe Operator (|>), clone($obj, [...]), array_first().
 */

if (PHP_VERSION_ID < 80500) {
    fwrite(STDERR, 'Requires PHP 8.5+ (running ' . PHP_VERSION . ')' . PHP_EOL);
    exit(0);
}

final readonly class ReleaseNote
{
    public function __construct(
        public string $title,
        public string $status = 'draft',
    ) {}
}

$slug = '  Laravel 13 AI SDK  '
    |> trim(...)
    |> strtolower(...)
    |> (static fn (string $s): string => str_replace(' ', '-', $s));

$draft = new ReleaseNote(title: $slug);
$published = clone($draft, ['status' => 'published']);

echo "Draft: {$draft->title} ({$draft->status})" . PHP_EOL;
echo "Published: {$published->title} ({$published->status})" . PHP_EOL;
echo 'First item: ' . (string) array_first(['laravel', 'php', 'vite']) . PHP_EOL;
