# Chapter 05: Arrays & Functional Data Pipelines

> **Scope:** PHP 8.0–8.5 · Lists vs Associative Maps, Unpacking, Functional Transforms, `array_is_list()`, `array_find()` (8.4), and `array_first()` (8.5).

---

## 1. Learning Objectives

- Understand PHP's unified `array` data structure (ordered hash map used as both lists and dictionaries).
- Destructure and unpack arrays (`[$a, $b]`, `[...$a, ...$b]`, string-key unpacking since PHP 8.1).
- Transform collections cleanly with `array_map`, `array_filter`, `array_reduce`, `array_column`, and `usort`.
- Know modern PHP 8.1–8.5 additions: `array_is_list()`, `array_key_first()`, `array_find()` / `array_any()` / `array_all()` (8.4), and `array_first()` / `array_last()` (8.5).

---

## 2. Lists vs. Associative Arrays & Unpacking

```php
// 1. List (0-indexed sequential keys: array_is_list($tags) === true)
$tags = ['php', 'laravel', 'mysql'];

// 2. Associative array (map)
$user = ['id' => 101, 'name' => 'Asha', 'role' => 'admin'];

// 3. String-keyed unpacking (PHP 8.1+)
$defaults = ['timeout' => 30, 'retries' => 3];
$custom   = ['timeout' => 60];
$merged   = [...$defaults, ...$custom]; // ['timeout' => 60, 'retries' => 3]

// 4. Symmetric array destructuring
['name' => $userName, 'role' => $userRole] = $user;
```

---

## 3. Essential Array Transformation Matrix

| Task | Function / Pattern | Notes |
|---|---|---|
| Transform every item | `array_map($fn, $arr)` | Preserves keys when passing 1 array |
| Keep matching items | `array_filter($arr, $fn)` | Re-index keys with `array_values()` if needed |
| Reduce to single value | `array_reduce($arr, $fn, $init)` | Sum, group, or index collections |
| Extract column / re-index | `array_column($rows, 'name', 'id')` | Extremely fast index lookup builder |
| Check list integrity *(8.1+)* | `array_is_list($arr)` | Verifies keys `0..n-1` (critical before `json_encode`) |
| Find first match *(8.4+)* | `array_find($arr, $fn)` | Short-circuits; returns `null` if missing |
| Any / All predicates *(8.4+)* | `array_any($arr, $fn)` / `array_all($arr, $fn)` | Short-circuits without scanning full array |
| First / Last value *(8.5+)* | `array_first($arr)` / `array_last($arr)` | Returns `null` on empty array without mutating pointer |

---

## 4. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/05-arrays-and-functional-pipelines/lab.php
```

---

## 5. Common Mistakes & Best Practices

- **Mistake:** Calling `array_filter()` on a list and encoding straight to JSON without `array_values()`. Leaving a gap in numeric keys (`[0 => 'a', 2 => 'c']`) forces `json_encode()` to emit a JSON object `{"0":"a","2":"c"}` instead of a JSON array `["a","c"]`!
- **Mistake:** Using `in_array($needle, $haystack)` without the 3rd strict argument `true` (`in_array('0', [0, 1])` is `true` without strict mode!). Always pass `true`: `in_array($needle, $haystack, true)`.
- **Best Practice:** Build an associative lookup map (`array_column($users, null, 'id')`) instead of nesting `foreach` loops ($O(N)$ vs $O(N^2)$).

---

## 6. Exercises & Interview Q&A

1. **Exercise:** Given an array of product records (`id`, `name`, `price`, `inStock`), filter only in-stock products, sort by `price` ascending with `<=>`, and extract names.
2. **Q: Why does `json_encode()` sometimes turn a PHP array into `{}` instead of `[]`?**  
   **A:** Whenever keys are not consecutive integers starting at `0` (`!array_is_list($arr)`), e.g., after `unset($arr[1])` or `array_filter()`, PHP serializes it as a JSON object to preserve keys.

---

⬅️ [Chapter 04](../04-functions-closures-and-callables/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 06: Strings, Regex & DateTimeImmutable](../06-strings-regex-and-datetime/README.md)
