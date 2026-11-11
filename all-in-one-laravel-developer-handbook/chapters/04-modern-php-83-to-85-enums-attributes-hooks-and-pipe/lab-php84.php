<?php

declare(strict_types=1);

/**
 * Chapter 04 Lab (PHP >= 8.4): Property Hooks, Asymmetric Visibility, array_find(), and new-without-parens.
 */

if (PHP_VERSION_ID < 80400) {
    fwrite(STDERR, 'Requires PHP 8.4+ (running ' . PHP_VERSION . ')' . PHP_EOL);
    exit(0);
}

final class Subscriber
{
    public private(set) string $slug;

    public string $email {
        set => strtolower(trim($value));
    }

    public function __construct(string $name, string $email)
    {
        $this->slug = strtolower(str_replace(' ', '-', trim($name)));
        $this->email = $email;
    }

    public function summary(): string
    {
        return "{$this->slug} <{$this->email}>";
    }
}

echo new Subscriber('  Ada Lovelace ', ' ADA@EXAMPLE.COM  ')->summary() . PHP_EOL;

$nums = [12, 45, 78, 91];
$firstOverFifty = array_find($nums, static fn (int $n): bool => $n > 50);
echo 'First > 50 via array_find(): ' . (string) $firstOverFifty . PHP_EOL;
