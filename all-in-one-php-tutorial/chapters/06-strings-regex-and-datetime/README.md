# Chapter 06: Strings, Multibyte UTF-8, PCRE Regex & DateTimeImmutable

> **Scope:** PHP 8.0–8.5 · `str_contains`/`str_starts_with`/`str_ends_with`, `mbstring`, Heredoc/Nowdoc, PCRE Regex, and `DateTimeImmutable`.

---

## 1. Learning Objectives

- Use modern PHP 8.0+ string inspection functions instead of error-prone `strpos(...) !== false`.
- Handle UTF-8 text reliably using `mb_*` functions (`mb_strlen`, `mb_substr`, `mb_strtolower`).
- Validate and transform structured strings using PCRE (`preg_match`, named capture groups, `preg_replace_callback`).
- Work safely with dates, timezones, and intervals using **`DateTimeImmutable`** (never mutating shared `DateTime` objects).

---

## 2. Modern String Operations (PHP 8.0+)

| Task | Legacy Approach (Fragile) | Modern PHP 8.0+ |
|---|---|---|
| Substring check | `strpos($s, 'foo') !== false` | `str_contains($s, 'foo')` |
| Prefix check | `substr($s, 0, 4) === 'http'` | `str_starts_with($s, 'http')` |
| Suffix check | `substr($s, -4) === '.php'` | `str_ends_with($s, '.php')` |
| UTF-8 length | `strlen('héllo')` *(returns 6 bytes!)* | `mb_strlen('héllo', 'UTF-8')` *(returns 5 chars)* |

### Heredoc vs Nowdoc (PHP 7.3+ Flexible Indentation)
- **Heredoc** (`<<<SQL ... SQL;`): Interpolates variables (`{$var}`) and escape sequences.
- **Nowdoc** (`<<<'TEXT' ... TEXT;`): Treats content literally (like single quotes)—ideal for regexes or code templates.

---

## 3. Immutable Dates & Timezones (`DateTimeImmutable`)

Always store and compute timestamps in **UTC** inside your domain and convert to user timezones only at display boundaries:

```php
$nowUtc = new DateTimeImmutable('now', new DateTimeZone('UTC'));
$expiresAt = $nowUtc->modify('+7 days'); // $nowUtc remains unchanged!
$kolkataView = $expiresAt->setTimezone(new DateTimeZone('Asia/Kolkata'));
```

---

## 4. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/06-strings-regex-and-datetime/lab.php
```

---

## 5. Common Mistakes & Best Practices

- **Mistake:** Using `strlen()` or `substr()` on user names, emails, or emoji strings—multi-byte UTF-8 characters get sliced mid-byte, producing invalid UTF-8 (``). Always use `mb_*` for human-readable text.
- **Mistake:** Using mutable `DateTime` and passing it into helper functions that call `->modify()`, silently altering the caller's original object. Always type-hint **`DateTimeImmutable`** (or `DateTimeInterface`).
- **Best Practice:** Always include the `u` (UTF-8) modifier in `preg_match` / `preg_replace` patterns dealing with Unicode input, e.g., `/^(?<user>[a-z0-9_]+)$/iu`.

---

## 6. Exercises & Interview Q&A

1. **Exercise:** Parse a semantic version tag like `v2.14.3` using `preg_match` with named capture groups `(?<major>\d+)`, `(?<minor>\d+)`, `(?<patch>\d+)`.
2. **Q: Why is `str_contains($haystack, $needle)` preferred over `strpos()`?**  
   **A:** `strpos()` returns `0` when the match is at the start of the string, which evaluates as falsy if someone accidentally writes `if (strpos($s, 'abc'))`. `str_contains()` strictly returns `bool`.

---

⬅️ [Chapter 05](../05-arrays-and-functional-pipelines/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 07: OOP Foundations & Inheritance](../07-oop-foundations-and-inheritance/README.md)
