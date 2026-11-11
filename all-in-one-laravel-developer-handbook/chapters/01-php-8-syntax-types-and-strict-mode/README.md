# Chapter 01 — PHP 8.3–8.5 Syntax, Strict Types & Null Safety for Laravel

Modern Laravel (Laravel 12 & 13) requires **PHP 8.2/8.3+** and embraces strict typing, scalar/union/intersection types, nullsafe operators, and concise control flow. Mastering these core syntax primitives prevents subtle type coercion bugs across models, requests, and services.

---

## 1. Strict Types & Scalar Type Declarations

Without `declare(strict_types=1);`, PHP silently coerces `"42"` into `42` when passed to an `int` parameter, or `1` into `true`. Enable strict typing at the top of custom service classes, Actions, DTOs, and helpers:

```php
<?php

declare(strict_types=1);

namespace App\Services;

final class DiscountCalculator
{
    public function applyPercentage(int $cents, float $rate): int
    {
        return (int) round($cents * (1 - $rate));
    }
}
```

### Type System Essentials Used Daily in Laravel
- **Scalar & Compound**: `int`, `float`, `string`, `bool`, `array`, `callable`, `iterable`, `object`
- **Union Types (`|`)**: `int|string|null $id` (very common for Eloquent IDs vs UUIDs)
- **Intersection Types (`&`)**: `Countable&IteratorAggregate`
- **Return Types**: `void`, `never` (functions that always throw or `abort()`), `self`, `static` (fluent builders like Eloquent scopes), `mixed`
- **Standalone `true` / `false` / `null` (PHP 8.2+)**: `function fails(): bool` vs returning `false` explicitly on failure paths

---

## 2. Ternary `?:`, Elvis `?:`, Null Coalescing `??` & Nullsafe `?->`

In Blade templates, requests, and user profiles, nullable chains happen constantly. Know the exact difference between each operator:

| Operator | Checks | Example | Behavior if left is `""` or `0` |
| :--- | :--- | :--- | :--- |
| `$a ? $b : $c` | Truthiness (`(bool) $a`) | `$active ? 'Yes' : 'No'` | Uses `$c` |
| `$a ?: $b` | Truthiness shorthand (Elvis) | `$title ?: 'Untitled'` | Uses `'Untitled'` |
| `$a ?? $b` | `isset()` (`!= null` and defined) | `$perPage ?? 15` | Keeps `""` or `0`! |
| `$a ??= $b` | Null coalescing assignment | `$options['timeout'] ??= 30;` | Keeps `0` or `false` |
| `$obj?->prop` | Short-circuits if `$obj === null` | `$user?->profile?->avatar` | Evaluates to `null` instead of throwing Error |

### Laravel Blade & Auth Example

```php
// Safe navigation even when Auth::user() is null or has no profile row
$avatarUrl = Auth::user()?->profile?->avatar_url ?? '/images/default-avatar.png';

// Elvis operator when empty strings should also fall back:
$displayName = trim((string) $request->input('nickname')) ?: 'Anonymous Author';
```

> [!WARNING]
> Do not chain `$a?->b = 'x'` on write assignments — PHP forbids the nullsafe operator on the left side of an assignment (`=`).

---

## 3. Constants, Read-Only Data & Named Arguments

Laravel 12/13 heavily uses named arguments for readable configuration (`Route::resource(...)->only([...])`, factory states, `Http::retry(times: 3, sleepMilliseconds: 200)`):

```php
function paginateQuery(int $page = 1, int $perPage = 15, string $sort = 'desc'): array
{
    return compact('page', 'perPage', 'sort');
}

// Skip optional defaults cleanly by name:
$params = paginateQuery(perPage: 25, sort: 'asc');
```

PHP 8.3 also introduced **typed class constants**, which catch mismatched overrides in subclasses:

```php
abstract class ApiResponder
{
    public const string VERSION = 'v2';
}
```

---

## Key Takeaways
- Put `declare(strict_types=1);` in custom classes, DTOs, Actions, and Value Objects.
- Use `??` when preserving `0`, `""`, or `false` matters; use `?:` when empty strings or zeroes should fall back.
- Combine `?->` with `??` for clean, crash-free property traversal in controllers and Blade templates.

## Try It Locally
Run the companion script for this chapter:
```bash
php chapters/01-php-8-syntax-types-and-strict-mode/lab.php
```
