<?php

declare(strict_types=1);

/**
 * Chapter 13 Lab (PHP 8.4+ Only): Property Hooks, Asymmetric Visibility,
 * Parenthesis-free Instantiation & New Array Find Helpers.
 */

class ArticleProfile
{
    // Asymmetric visibility (readable publicly, writable privately) + set hook
    public private(set) string $slug {
        set(string $value) {
            $this->slug = strtolower(str_replace(' ', '-', trim($value)));
        }
    }

    // Virtual computed property hook (no backing store)
    public string $displayTitle {
        get => 'Profile: ' . ucfirst($this->slug);
    }

    public function __construct(string $name)
    {
        $this->slug = $name;
    }

    public function rename(string $newName): void
    {
        $this->slug = $newName;
    }

    #[\Deprecated('Use rename() instead', since: '2.0')]
    public function setNameLegacy(string $name): void
    {
        $this->rename($name);
    }
}

echo "=== Chapter 13 (PHP 8.4+): Property Hooks & New Array Helpers ===" . PHP_EOL;

// Direct method chaining on `new` without outer parentheses (PHP 8.4+)
echo new ArticleProfile(' John Doe ')->displayTitle . PHP_EOL;

$profile = new ArticleProfile(' Jane Smith ');
echo "Initial slug : {$profile->slug}" . PHP_EOL;
$profile->rename('Asha Sen');
echo "Renamed slug : {$profile->slug}" . PHP_EOL;

// PHP 8.4 array_find, array_any, array_all
$ports = [80, 443, 8080, 3306];
$highPort = array_find($ports, static fn (int $p): bool => $p > 1000);
$hasTls   = array_any($ports, static fn (int $p): bool => $p === 443);
$allPos   = array_all($ports, static fn (int $p): bool => $p > 0);

echo "First high port: {$highPort}, hasTls=" . ($hasTls ? 'true' : 'false') . ", allPositive=" . ($allPos ? 'true' : 'false') . PHP_EOL;
