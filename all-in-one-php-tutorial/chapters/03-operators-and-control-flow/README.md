# Chapter 03: Operators & Modern Control Flow

> **Scope:** PHP 8.0–8.5 · Spaceship (`<=>`), Null Coalescing (`??`, `??=`), `match` Expressions, Short-Circuiting, and Loops.

---

## 1. Learning Objectives

- Use modern operators cleanly: null coalescing (`??`), null coalescing assignment (`??=`), and spaceship three-way comparison (`<=>`).
- Replace verbose `switch` blocks with strict, exhaustive `match` expressions (PHP 8.0+).
- Iterate safely with `foreach`, `for`, `while`, `do...while`, and avoid reference-leak bugs after `foreach (&$val)`.

---

## 2. Modern Operators Reference

| Operator | Name | Example | Result / Purpose |
|---|---|---|---|
| `??` | Null Coalescing | `$name = $_GET['name'] ?? 'Guest';` | Returns left operand if set & non-null, else right |
| `??=` | Null Coalescing Assignment | `$config['timeout'] ??= 30;` | Assigns right value only if key/var is null or unset |
| `<=>` | Spaceship (Combined Comparison) | `$a <=> $b` | Returns `-1`, `0`, or `1` (ideal for `usort`) |
| `?:` | Elvis Operator | `$title ?: 'Untitled'` | Returns left if truthy, else right (warning on unset vars!) |
| `**` | Exponentiation | `2 ** 10` | `1024` |

---

## 3. `match` Expression vs `switch` (PHP 8.0+)

| Feature | `switch` | `match` |
|---|---|---|
| Comparison | Loose (`==`) | **Strict (`===`)** |
| Fall-through | Implicit unless `break;` | **Never falls through** |
| Return Value | Statement (must assign manually) | **Expression (returns value directly)** |
| Unhandled Value | Silently skipped | **Throws `UnhandledMatchError`** unless `default` is present |

```php
$statusLabel = match ($httpCode) {
    200, 201 => 'Success',
    400, 422 => 'Client Error',
    404      => 'Not Found',
    default  => 'Unexpected Status',
};
```

---

## 4. Loops & `foreach` Safety

- Use `foreach ($items as $key => $value)` for arrays and any `Traversable`/`iterable`.
- If you ever iterate by reference `foreach ($items as &$item)`, **always call `unset($item);` immediately after the loop**! Otherwise `$item` remains bound to the last element and later assignments silently corrupt the array.
- Prefer `array_map` / `array_filter` / returning a new array over mutating via `&$item`.

---

## 5. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/03-operators-and-control-flow/lab.php
```

---

## 6. Common Mistakes & Best Practices

- **Mistake:** Putting `switch ($code)` with string `'0'` matching `case 0:` in PHP 7, or forgetting `break;` inside `switch`. Use `match` whenever mapping inputs to values.
- **Mistake:** Checking `isset($arr['key']) ? $arr['key'] : 'default'` instead of `$arr['key'] ?? 'default'`.
- **Best Practice:** Use early returns (`if (!$isValid) { return; }`) to flatten nested `if/else` trees.

---

## 7. Exercises & Interview Q&A

1. **Exercise:** Rewrite a 4-branch `switch` statement mapping HTTP status codes into a `match` expression and catch `UnhandledMatchError` for an unknown code.
2. **Q: What happens if a `match` expression has no `default` arm and no arm matches?**  
   **A:** PHP throws an `\UnhandledMatchError` (a subclass of `\Error`), making exhaustive handling safer than `switch`.

---

⬅️ [Chapter 02](../02-types-variables-and-strict-mode/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 04: Functions, Closures & Callables](../04-functions-closures-and-callables/README.md)
