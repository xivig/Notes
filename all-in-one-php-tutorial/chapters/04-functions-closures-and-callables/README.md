# Chapter 04: Functions, Closures, Callables & Generators

> **Scope:** PHP 8.0–8.5 · Named Arguments, Arrow Functions, Closures, First-Class Callables (`...`), `never` Return Type, and Generators (`yield`).

---

## 1. Learning Objectives

- Declare strictly typed parameters, return types (`?T`, `void`, `never`), default values, and variadics (`...$items`).
- Use **Named Arguments** (PHP 8.0) to make boolean flags and optional configuration self-documenting.
- Distinguish **Anonymous Functions (`function () use ($x)`)** from **Arrow Functions (`fn () => ...`)**.
- Create `Closure` references cleanly using **First-Class Callable Syntax** (`strlen(...)`, `$obj->method(...)`, PHP 8.1+).
- Stream large datasets lazily with **Generators (`yield`)** in $O(1)$ memory.

---

## 2. Modern Function Signatures & Named Arguments

```php
function formatPrice(
    int $cents,
    string $currency = 'USD',
    bool $includeSymbol = true,
): string {
    $formatted = number_format($cents / 100, 2);
    return $includeSymbol ? "{$currency} {$formatted}" : $formatted;
}

// Named arguments allow skipping intermediate defaults cleanly (PHP 8.0+):
echo formatPrice(cents: 2599, includeSymbol: false);
```

### Special Return Types
- `void`: Function returns nothing (`return;` only, no value).
- `never` *(PHP 8.1+)*: Function **never returns** to caller (always throws an exception or calls `exit`). Ideal for redirect/abort helpers.

---

## 3. Closures vs. Arrow Functions vs. First-Class Callables

| Construct | Scope Binding | Syntax | Best Use Case |
|---|---|---|---|
| **Anonymous Closure** | Explicit `use ($var)` (by-value) or `use (&$var)` | `function (int $x) use ($rate): float { ... }` | Multi-line callbacks |
| **Arrow Function** | **Automatic by-value** capture of outer scope | `fn (int $x): int => $x * $factor` | Concise single-expression transforms |
| **First-Class Callable** *(PHP 8.1+)* | Directly wraps any function/method as a `Closure` | `trim(...)`, `$calc->add(...)`, `MyClass::make(...)` | Passing existing functions to `array_map` / pipelines |

> **Note:** Replacing `['Class', 'method']` or `'strlen'` string callables with `Class::method(...)` and `strlen(...)` preserves static analysis, refactoring safety, and private/protected scope support.

---

## 4. Lazy Iteration with Generators (`yield`)

Loading 1,000,000 rows into an array exhausts RAM. A generator yields one value at a time and pauses execution until the next `foreach` step:

```php
function rangeLazy(int $start, int $end): Generator
{
    for ($i = $start; $i <= $end; $i++) {
        yield $i;
    }
}
```

---

## 5. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/04-functions-closures-and-callables/lab.php
```

---

## 6. Common Mistakes & Best Practices

- **Mistake:** Expecting an arrow function `fn () => $count++` to mutate `$count` in outer scope. Arrow functions capture outer variables **by value**, never by reference.
- **Mistake:** Breaking named argument compatibility in libraries when renaming parameters. Parameter names are part of your public API in PHP 8+.
- **Best Practice:** Mark internal helper closures `static fn (...) => ...` when they don't use `$this`, avoiding unnecessary object binding overhead.

---

## 7. Exercises & Interview Q&A

1. **Exercise:** Write a generator `fibonacci(int $limit): Generator` and iterate over the first 10 values without building an array in memory.
2. **Q: How does First-Class Callable syntax (`$obj->method(...)`) improve on array callables (`[$obj, 'method']`)?**  
   **A:** `$obj->method(...)` creates a genuine `Closure` object, works cleanly for private/protected methods within class scope, and fails loudly at creation time if the method does not exist, rather than deferring errors until invocation.

---

⬅️ [Chapter 03](../03-operators-and-control-flow/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 05: Arrays & Functional Pipelines](../05-arrays-and-functional-pipelines/README.md)
