# Chapter 02: Types, Variables, Constants & Strict Mode

> **Scope:** PHP 8.0–8.5 · Scalar/Compound Types, Strict Types vs Type Juggling, `==` vs `===`, Constants, and Superglobals.

---

## 1. Learning Objectives

- Master PHP's **10 core types** (4 scalar, 4 compound, 2 special) plus pseudo-types (`mixed`, `void`, `never`, `iterable`).
- Prevent subtle bugs caused by PHP's loose equality (`==`) and implicit coercion.
- Understand `strict_types=1` rules (including the single `int` → `float` widening exception).
- Choose properly between `const` (compile-time) and `define()` (runtime).

---

## 2. The PHP Type System

| Category | Types | Example |
|---|---|---|
| **Scalar** | `int`, `float`, `string`, `bool` | `42`, `3.14`, `'PHP'`, `true` |
| **Compound** | `array`, `object`, `callable`, `iterable` | `[1, 2]`, `new stdClass()`, `strlen(...)` |
| **Special** | `null`, `resource` | `null`, `fopen(...)` stream |
| **Modern Type Combinators** | Union (`int\|string`), Nullable (`?string`), Intersection (`A&B`), DNF (`(A&B)\|null`) | `public int\|float $amount` |

### Strict Types (`declare(strict_types=1);`)
- With `strict_types=0` (default), passing `'42'` to `function add(int $a)` silently coerces `'42'` to `42`.
- With `strict_types=1`, passing `'42'` throws a `TypeError` immediately!
- **Only exception:** an `int` can still be passed to a `float` parameter (widening conversion).

---

## 3. Loose (`==`) vs. Strict (`===`) Equality

Even after PHP 8.0 fixed `0 == 'foobar'` (now `false` in PHP 8+, previously `true` in PHP 7!), **always default to `===` and `!==`**.

| Expression | PHP 7.4 (`==`) | PHP 8.x (`==`) | PHP 8.x (`===`) |
|---|---|---|---|
| `0 == 'foobar'` | `true` (bug trap!) | `false` | `false` |
| `0 == ''` | `true` | `false` | `false` |
| `42 == '42'` | `true` | `true` | `false` |
| `42 == '42abc'` | `true` | `false` | `false` |
| `null == false` | `true` | `true` | `false` |

---

## 4. Variables, References & Constants

- Variables start with `$` and follow `camelCase` by convention in modern PHP.
- **Constants**:
  - `const APP_ENV = 'production';` — resolved at compile time, works in classes/interfaces/namespaces.
  - `define('RUNTIME_FLAG', getenv('FLAG') ?: 'off');` — evaluated at runtime, global scope only.
- **Magic Constants**: `__FILE__`, `__DIR__`, `__LINE__`, `__CLASS__`, `__METHOD__`, `__FUNCTION__`, `__NAMESPACE__`.
- **Superglobals** (always treat as untrusted external input!): `$_GET`, `$_POST`, `$_SERVER`, `$_COOKIE`, `$_FILES`, `$_SESSION`, `$_ENV`.

---

## 5. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/02-types-variables-and-strict-mode/lab.php
```

---

## 6. Common Mistakes & Best Practices

- **Mistake:** Using `empty($val)` carelessly when `'0'` or `0` is a valid input! `empty('0')` and `empty(0)` both return `true`. Prefer explicit checks like `$val === null || $val === ''`.
- **Mistake:** Using `float` for currency calculations (`0.1 + 0.2 !== 0.3`). Store money in **integer minor units (cents/paise)** or use **`bcmath`** (`bcadd`, `bcmul`).
- **Best Practice:** Use `get_debug_type($var)` (PHP 8.0+) instead of `gettype($var)` — it returns actual class names and `int`/`float`/`bool` instead of legacy `"integer"`/`"double"`/`"boolean"`.

---

## 7. Exercises & Interview Q&A

1. **Exercise:** Test `0 == 'hello'` and `42 == '42'` vs `===` in PHP 8.x and observe `get_debug_type()` outputs.
2. **Q: What changed with non-strict string-to-number comparisons in PHP 8.0?**  
   **A:** Non-numeric strings compared against numbers no longer coerce to `0` (`0 == 'abc'` is now `false` instead of `true`). Trailing non-numeric characters (`42 == '42abc'`) also return `false`.

---

⬅️ [Chapter 01](../01-php-foundations-and-tooling/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 03: Operators & Control Flow](../03-operators-and-control-flow/README.md)
