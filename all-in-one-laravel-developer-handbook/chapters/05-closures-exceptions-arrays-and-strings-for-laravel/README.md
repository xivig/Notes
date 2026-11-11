# Chapter 05 — Closures, Exceptions, Arrays & Strings for Laravel

Day-to-day Laravel development spends far more time transforming Collections, extracting request keys, formatting slugs, capturing closures in routes/transactions, and handling exceptions than writing raw SQL. This chapter connects native PHP functions directly to Laravel's `Arr`, `Str`, `Collection`, and exception pipeline.

---

## 1. Closures, `use (...)` & Arrow Functions (`fn =>`)

In Laravel, routes, query constraints, Collections, and database transactions all accept anonymous functions:

```php
// 1. Closure capturing an outer variable by value (`use ($minAge)`)
$adults = $users->filter(function ($user) use ($minAge) {
    return $user->age >= $minAge;
});

// 2. Arrow function (`fn`): auto-captures outer variables by value, single expression
$names = $users
    ->filter(fn ($user) => $user->age >= $minAge)
    ->map(fn ($user) => strtoupper($user->name));

// 3. First-class callable syntax (PHP 8.1+): pass method or function reference cleanly
$trimmed = array_map(trim(...), $rawInputs);
```

### Inside Laravel Transactions & Routes
```php
Route::get('/health', fn () => ['status' => 'ok']);

DB::transaction(function () use ($order, $payment) {
    $order->markAsPaid();
    $payment->record();
});
```

---

## 2. Exception Handling (`try` / `catch` / `finally`) & `bootstrap/app.php`

PHP 8+ separates runtime errors (`Error`, e.g., `DivisionByZeroError`, `TypeError`) from application exceptions (`Exception`), unified under the common `Throwable` interface.

```php
try {
    $response = $gateway->charge($order);
} catch (PaymentDeclinedException $e) {
    // Handle expected business error first (specific before general!)
    return back()->withErrors(['payment' => $e->getMessage()]);
} catch (Throwable $e) {
    report($e); // Log to Sentry / storage/logs/laravel.log
    return response()->json(['message' => 'Unexpected payment failure'], 500);
} finally {
    // Always executes (e.g., release a file lock or temp resource)
}
```

### Centralized Exception Handling in Modern Laravel (11 / 12 / 13)
Modern Laravel configures custom exception reporting and JSON rendering inside `bootstrap/app.php` rather than `app/Exceptions/Handler.php`:

```php
->withExceptions(function (Exceptions $exceptions) {
    $exceptions->render(function (DomainException $e, Request $request) {
        if ($request->expectsJson()) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    });
})
```

---

## 3. Native Array Power + Laravel `Arr` & `Collection`

Understanding native PHP array callbacks explains how Laravel's `Collection` pipeline works under the hood:

| Native PHP Function | Laravel Equivalent | Purpose |
| :--- | :--- | :--- |
| `array_map($fn, $arr)` | `collect($arr)->map($fn)` | Transform every element |
| `array_filter($arr, $fn)` | `collect($arr)->filter($fn)` | Keep elements matching predicate |
| `array_reduce($arr, $fn, $init)` | `collect($arr)->reduce($fn, $init)` | Fold items into single value (totals, summaries) |
| `array_intersect_key($arr, array_flip($keys))` | `Arr::only($arr, $keys)` | Whitelist specific payload keys safely |
| `array_column($rows, 'email', 'id')` | `collect($rows)->pluck('email', 'id')` | Extract keyed lookup map |

> [!TIP]
> Watch out: native `array_map(fn, $arr)` puts the **callback first**, whereas `array_filter($arr, fn)` puts the **array first**! Using `collect($arr)->filter(...)->map(...)->values()` eliminates parameter-order inconsistencies and re-indexes filtered keys cleanly.

---

## 4. Native String Functions (`PHP 8+`) & Laravel `Str`

Modern PHP includes `str_contains()`, `str_starts_with()`, and `str_ends_with()`, which Laravel's `Str` and fluent `Stringable` (`Str::of(...)`) build upon:

```php
$slug = Str::of('  Laravel 13 Developer Guide!  ')
    ->trim()
    ->lower()
    ->slug(); // "laravel-13-developer-guide"
```

Common string utilities in PHP 8.3+:
- `trim($str)` / `ltrim` / `rtrim`: Sanitize form input before storage.
- `str_contains($haystack, $needle)`: Case-sensitive substring check (`Str::contains($str, ['a', 'b'])` adds multi-needle & case-insensitivity options).
- `substr($str, 0, 100)`: Byte-based slice — use `mb_substr()` or `Str::limit($text, 100)` for UTF-8 text (emojis, non-ASCII scripts) so characters are never cut mid-codepoint!
- `preg_match($pattern, $subject, $matches)`: Extract hashtags, mentions, or semantic versions with regex.

---

## Key Takeaways
- Use `fn ($x) => ...` for concise one-line transforms and `function () use ($var)` for multi-statement callbacks like `DB::transaction()`.
- Catch specific exceptions before `Throwable`, and register global API error mappings inside `bootstrap/app.php` `->withExceptions()`.
- Prefer `mb_substr()` / `Str::limit()` over `substr()` when truncating user-submitted UTF-8 content.

## Try It Locally
```bash
php chapters/05-closures-exceptions-arrays-and-strings-for-laravel/lab.php
```
