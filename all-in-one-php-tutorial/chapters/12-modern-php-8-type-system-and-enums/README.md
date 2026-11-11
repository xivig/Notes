# Chapter 12: Modern PHP 8 Type System, Promoted Constructors & Enums

> **Scope:** PHP 8.0–8.5 · Constructor Property Promotion (8.0), Union (8.0), Intersection (8.1), DNF Types (8.2), Pure & Backed Enums (8.1), and Typed Class Constants (8.3).

*(Consolidates and modernizes `modern_constructorPromotion.php`, `modern_advancedTypes.php`, `modern_enums.php`, and `modern_typedConstants.php`.)*

---

## 1. Learning Objectives

- Eliminate boilerplate property assignments with **Constructor Property Promotion** (PHP 8.0+).
- Model complex constraints accurately with **Union (`A|B`)**, **Intersection (`A&B`)**, and **DNF (`(A&B)|null`)** types.
- Replace magic strings and integer constants with type-safe **Enums** (pure and backed, with methods and interface implementations).
- Enforce class and interface constant types using **Typed Class Constants** (PHP 8.3+).

---

## 2. Constructor Property Promotion (PHP 8.0+)

```php
final readonly class UserDto
{
    public function __construct(
        public int $id,
        public string $name,
        private string $role = 'member',
    ) {}
}
```
Notice how clean that is when combined with `readonly class` (8.2+): zero duplicate property lines, zero `$this->x = $x;` boilerplate, and complete immutability!

---

## 3. Advanced Type Combinators (PHP 8.0–8.2)

| Combinator | PHP Version | Meaning | Example |
|---|---|---|---|
| **Union** | 8.0+ | Accepts any listed type | `int\|string\|null` |
| **Intersection** | 8.1+ | Must satisfy **all** listed interfaces/classes | `LoggerInterface & Cacheable` |
| **DNF (Disjunctive Normal Form)** | 8.2+ | Union of intersections & standalone types | `(LoggerInterface & Flushable) \| null` |

---

## 4. Native Enums (PHP 8.1+)

- **Pure Enum:** `enum OrderState { case Draft; case Paid; }` — represents finite states without scalar backing values.
- **Backed Enum:** `enum Role: string { case Admin = 'admin'; }` — stores scalar `string` or `int` values, exposes `->value`, `::from()`, `::tryFrom()`, and `::cases()`, and can declare methods and implement interfaces!

---

## 5. Typed Class Constants (PHP 8.3+)

```php
interface HttpDefaults
{
    public const int TIMEOUT_SECONDS = 15;
    public const string USER_AGENT = 'XivigClient/2.0';
}
```
Child classes overriding a typed constant cannot widen its type to an incompatible type.

---

## 6. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/12-modern-php-8-type-system-and-enums/lab.php
```

---

## 7. Common Mistakes & Best Practices

- **Mistake:** Calling `Role::from($input)` on untrusted user input without handling `ValueError`. Use `Role::tryFrom($input)` when invalid strings should return `null` instead of throwing.
- **Mistake:** Combining `readonly` with untyped promoted properties (`public readonly $id`) — always specify an explicit type.
- **Best Practice:** Use backed Enums (`Status: string`) for API payloads, database columns, and state machines instead of `const STATUS_ACTIVE = 'active'`.

---

## 8. Exercises & Interview Q&A

1. **Exercise:** Create a backed enum `HttpStatus: int` (`Ok = 200`, `NotFound = 404`, `ServerError = 500`) with a `isSuccess(): bool` method and resolve `HttpStatus::tryFrom(404)`.
2. **Q: What is the difference between `Enum::from()` and `Enum::tryFrom()`?**  
   **A:** `from()` throws a `ValueError` if no matching case exists; `tryFrom()` returns `null` safely.

---

⬅️ [Chapter 11](../11-namespaces-psr4-and-composer/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 13: Modern Syntax, Attributes, Property Hooks & Pipe Operator](../13-modern-php-8-syntax-attributes-and-hooks/README.md)
