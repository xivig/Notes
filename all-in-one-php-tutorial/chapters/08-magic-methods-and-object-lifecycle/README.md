# Chapter 08: Magic Methods & Object Lifecycle

> **Scope:** PHP 8.0–8.5 · `__construct`, `__destruct`, `__toString` (`Stringable`), `__get`/`__set`/`__isset`/`__unset`, `__call`/`__callStatic`, `__clone`, `__serialize`/`__unserialize`, and `__debugInfo`.

*(Consolidates and modernizes all 9 legacy `oop_magicMethod*.php` tutorials.)*

---

## 1. Learning Objectives

- Control object initialization and deterministic cleanup with `__construct()` and `__destruct()` (plus `unset()`).
- Implement `Stringable` cleanly via `__toString(): string` and understand the PHP 8+ `\Error` thrown when casting non-stringable objects.
- Understand dynamic overloading (`__get`, `__set`, `__isset`, `__unset`, `__call`, `__callStatic`)—when frameworks use them and why explicit typed properties are usually preferred.
- Customize shallow vs. deep copies with `__clone()`, and control serialization with `__serialize()` / `__unserialize()`.

---

## 2. Core Magic Methods Reference

| Magic Method | Triggered When | Modern PHP 8.x Rule / Note |
|---|---|---|
| `__construct(...)` | `new ClassName(...)` | Supports Constructor Property Promotion (Ch. 12) |
| `__destruct()` | Last reference dropped or `unset($obj)` | Runs deterministically at scope exit / script end |
| `__toString(): string` | `(string) $obj` or `echo $obj` | Automatically implements `\Stringable` interface (PHP 8.0+) |
| `__get(string $name): mixed` | Reading inaccessible/missing property | Pair with `__isset()` so `isset()` / `??` work |
| `__set(string $name, mixed $val): void` | Writing inaccessible/missing property | Avoid in DTOs; dynamic properties are deprecated since PHP 8.2 unless `#[\AllowDynamicProperties]` or `__set()` is defined |
| `__call(string $name, array $args): mixed` | Calling inaccessible/missing instance method | Often used in fluent builders/proxies |
| `__callStatic(string $name, array $args): mixed` | Calling inaccessible/missing static method | Used in facade patterns |
| `__clone(): void` | `clone $obj` (runs on the **new** clone) | Deep-clone nested mutable objects or reset IDs |
| `__serialize(): array` / `__unserialize(array $data): void` | `serialize($obj)` / `unserialize($str)` | Replaces deprecated `Serializable` interface |

> **Important PHP 8.2+ Note:** Creating arbitrary undeclared properties on an object (e.g., `$obj->foo = 1;` without declaring `$foo` or defining `__set()`) triggers a deprecation warning in PHP 8.2+ and will become an `Error` in PHP 9.0.

---

## 3. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/08-magic-methods-and-object-lifecycle/lab.php
```

---

## 4. Common Mistakes & Best Practices

- **Mistake:** Echoing an object that doesn't define `__toString()`—in PHP 8+, this throws an `\Error` (`Object of class ... could not be converted to string`). Implement `Stringable` (`__toString(): string`) or call explicit formatter methods.
- **Mistake:** Shallow cloning (`$copy = clone $order`) when `$order` holds a nested mutable object (`$this->shippingAddress`). Without cloning `$this->shippingAddress = clone $this->shippingAddress;` inside `__clone()`, both orders share the same address object!
- **Best Practice:** Document dynamic magic methods/properties using PHPDoc `@method` / `@property` or avoid magic overloading in business domains in favor of explicit typed classes.

---

## 5. Exercises & Interview Q&A

1. **Exercise:** Implement `__clone()` on an `Invoice` class that contains a `DateTimeImmutable $createdAt` and a mutable `Metadata` object so cloning regenerates `$id` and deep-clones `$metadata`.
2. **Q: Does implementing `__toString(): string` automatically satisfy `Stringable` type hints in PHP 8+?**  
   **A:** Yes! Any class defining `__toString(): string` implicitly implements the `Stringable` interface in PHP 8.0+, so functions accepting `string|Stringable` accept that object.

---

⬅️ [Chapter 07](../07-oop-foundations-and-inheritance/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 09: Abstraction, Polymorphism & Traits](../09-abstraction-polymorphism-and-traits/README.md)
