# Chapter 10: Encapsulation, `final`, `readonly` & Late Static Binding

> **Scope:** PHP 8.0–8.5 · Visibility (`public`, `protected`, `private`), `final` Classes/Methods, `readonly` Properties (8.1) & `readonly` Classes (8.2), and Late Static Binding (`self::` vs `static::`).

*(Consolidates and modernizes `oop_encapsulation.php`, `oop_finalKeyword.php`, `oop_readonly.php`, and `oop_lateStaticBinding.php`.)*

---

## 1. Learning Objectives

- Enforce encapsulation boundaries using `public`, `protected`, and `private`.
- Design safer APIs with `final` classes/methods to prevent fragile inheritance overrides.
- Build immutable Data Transfer Objects (DTOs) and Value Objects with `readonly` properties (PHP 8.1) and `readonly class` (PHP 8.2).
- Resolve runtime child classes accurately using **Late Static Binding (`static::`)** vs compile-time (`self::`).

---

## 2. Encapsulation & Immutability

| Modifier | Scope | Use Case |
|---|---|---|
| `public` | Everywhere | Explicit public API methods & immutable DTO properties |
| `protected` | Defining class + subclasses | Template hooks meant for controlled extension |
| `private` | Defining class only | Internal state & helper invariants |
| `final` | Disables inheritance / overriding | Services, Value Objects, Entities ("Composition over inheritance") |
| `readonly` *(8.1 / 8.2)* | Write-once after construction | Value objects, config, events, DTOs |

```php
final readonly class DatabaseConfig
{
    public function __construct(
        public string $host,
        public int $port,
        public string $database,
    ) {}
}
```

---

## 3. Late Static Binding (`self::` vs `static::`)

- **`self::`** binds at **compile time** to the class where the code is physically written.
- **`static::`** binds at **runtime** to the class that was actually called (crucial for active-record `Model::find()`, factory methods `static::create()`, and class constants).

---

## 4. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/10-encapsulation-immutability-and-lsb/lab.php
```

---

## 5. Common Mistakes & Best Practices

- **Mistake:** Trying to declare a `readonly` property without an explicit type (`public readonly $id;` throws a Fatal Error — `readonly` properties **must** be typed!).
- **Mistake:** Putting a mutable object inside a `readonly` property and thinking its nested state is frozen—`readonly` prevents *reassignment* of the property, not internal mutation of a mutable sub-object (use `DateTimeImmutable` or nested `readonly` classes!).
- **Best Practice:** Default to `final readonly class` for DTOs and Value Objects, and `final class` for services unless explicitly designed for inheritance.

---

## 6. Exercises & Interview Q&A

1. **Exercise:** Write a `BaseModel` with `public static function tableName(): string` returning `static::$table` and override `$table` in `UserModel`. Compare `self::$table` vs `static::$table`.
2. **Q: What is the difference between `const` and `readonly` in PHP 8.2+?**  
   **A:** Class constants are fixed at compile time and shared across all instances, whereas `readonly` properties are initialized **per object instance** (typically in `__construct()`) with runtime values and cannot be modified afterward.

---

⬅️ [Chapter 09](../09-abstraction-polymorphism-and-traits/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 11: Namespaces, PSR-4 & Composer](../11-namespaces-psr4-and-composer/README.md)
