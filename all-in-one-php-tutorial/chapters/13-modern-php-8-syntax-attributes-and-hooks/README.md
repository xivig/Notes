# Chapter 13: Modern Syntax, Attributes, Property Hooks (8.4) & Pipe Operator (8.5)

> **Scope:** PHP 8.0–8.5 · Nullsafe Operator `?->`, Attributes & Reflection (8.0), `#[\SensitiveParameter]` (8.2), `#[\Override]` (8.3), Property Hooks & Asymmetric Visibility (8.4), and Pipe Operator `|>` & Clone With (8.5).

*(Consolidates and modernizes `modern_nullsafeOperator.php`, `modern_attributes.php`, and `modern_propertyHooks.php`, and adds PHP 8.5 features.)*

---

## 1. Learning Objectives

- Eliminate deep `if ($x !== null)` pyramids with the **Nullsafe Operator (`?->`)** (PHP 8.0+).
- Attach native structured metadata using **Attributes (`#[Attribute]`)** and inspect them via **Reflection API**.
- Harden code with `#[\SensitiveParameter]` (8.2) and `#[\Override]` (8.3).
- Master **PHP 8.4** features: **Property Hooks (`get` / `set`)**, **Asymmetric Visibility (`public private(set)`)**, `new Class()->method()` without parentheses, and `#[Deprecated]`.
- Master **PHP 8.5** features: **Pipe Operator (`|>`)**, **`clone($this, [...])`**, and **`#[NoDiscard]`**.

---

## 2. Attributes & Built-in Safety Attributes (PHP 8.0–8.3)

```php
#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
final readonly class Route
{
    public function __construct(
        public string $path,
        public string $method = 'GET',
    ) {}
}
```

### Standard Engine Attributes
- **`#[\SensitiveParameter]`** *(PHP 8.2+)*: Redacts passwords/API keys from stack traces and exception logs.
- **`#[\Override]`** *(PHP 8.3+)*: Tells PHP to fail at compile time if a method intended to override a parent/interface method has a typo or mismatched parent signature.
- **`#[\Deprecated]`** *(PHP 8.4+)*: Native deprecation attribute recognized by PHP and IDEs.
- **`#[\NoDiscard]`** *(PHP 8.5+)*: Emits a warning if the caller ignores an important return value.

---

## 3. Property Hooks & Asymmetric Visibility (PHP 8.4+)

```php
class Profile
{
    public private(set) string $slug {
        set(string $value) {
            $this->slug = strtolower(str_replace(' ', '-', trim($value)));
        }
    }

    public string $displayTitle {
        get => 'Profile: ' . ucfirst($this->slug);
    }
}
```
- `public private(set)`: Anyone can read `$profile->slug`, only `Profile` can write to it.
- Property hooks (`get` / `set`) remove boilerplate `getSlug()`/`setSlug()` accessors while keeping validation/normalization clean!
- Also in PHP 8.4+: `new Profile('Jane')->displayTitle` works directly without wrapping `new Profile(...)` in parentheses.

---

## 4. Pipe Operator `|>` & `clone()` with Overrides (PHP 8.5+)

```php
// Left-to-right data pipeline using first-class callables (PHP 8.5+)
$slug = '  Modern PHP 8.5 Handbook  '
    |> trim(...)
    |> strtolower(...)
    |> (fn (string $s): string => str_replace(' ', '-', $s));

// Update readonly properties cleanly during cloning (PHP 8.5+)
$updated = clone($user, ['role' => 'admin']);
```

---

## 5. Runnable Labs

- **PHP 8.2 / 8.3+ Core Lab**: [lab.php](lab.php)
  ```bash
  php chapters/13-modern-php-8-syntax-attributes-and-hooks/lab.php
  ```
- **PHP 8.4+ Property Hooks & Asymmetric Visibility Lab**: [lab-php84.php](lab-php84.php) *(requires PHP >= 8.4)*
- **PHP 8.5+ Pipe Operator & Clone With Lab**: [lab-php85.php](lab-php85.php) *(requires PHP >= 8.5)*

---

## 6. Common Mistakes & Best Practices

- **Mistake:** Using `?->` when you actually *need* an exception if a required object is missing—`?->` silently returns `null`, masking configuration bugs if misused.
- **Mistake:** Using PHP 8.4+ syntax (`public private(set)` or `{ get => ... }`) in packages targeting `php: ^8.2` or `^8.3`—always match your `composer.json` minimum PHP constraint!
- **Best Practice:** Mark passwords/tokens with `#[\SensitiveParameter]` and overridden methods with `#[\Override]` in all PHP 8.3+ codebases.

---

## 7. Exercises & Interview Q&A

1. **Exercise:** Add a custom `#[Authorize(role: 'admin')]` attribute to a controller method and inspect it via `ReflectionMethod::getAttributes()`.
2. **Q: How does `public private(set)` differ from `public readonly`?**  
   **A:** `readonly` only allows writing **once** during initialization, whereas `public private(set)` lets the owning class mutate the property multiple times internally while exposing it read-only to external code.

---

⬅️ [Chapter 12](../12-modern-php-8-type-system-and-enums/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 14: Error Handling, Exceptions & Fibers](../14-error-handling-exceptions-and-fibers/README.md)
