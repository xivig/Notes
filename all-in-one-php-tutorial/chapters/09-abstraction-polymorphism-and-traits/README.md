# Chapter 09: Abstraction, Interfaces, Polymorphism & Traits

> **Scope:** PHP 8.0–8.5 · `abstract` Classes, `interface` Contracts, Polymorphic Dependency Injection, and Horizontal Code Reuse with `trait`s.

*(Consolidates and modernizes `oop_abstractAndInterface.php`, `oop_polymorphism.php`, and `oop_traits.php`.)*

---

## 1. Learning Objectives

- Choose accurately between **Interfaces** (behavioral contracts) and **Abstract Classes** (shared base state + template methods).
- Write decoupled, extensible code through **Polymorphism** (coding to an interface rather than a concrete class).
- Reuse methods horizontally across unrelated classes using **Traits**, and resolve trait collisions with `insteadof` and `as`.

---

## 2. Abstract Classes vs. Interfaces vs. Traits

| Construct | Can Be Instantiated? | Supports Properties? | Multiple per Class? | Purpose |
|---|---|---|---|---|
| **Interface** | No | Constants only (typed in 8.3+) | **Yes** (`implements A, B`) | Defines *what* a class can do (contract) |
| **Abstract Class** | No | Yes (state + constants) | **No** (single `extends`) | Shared base implementation + partial abstraction |
| **Trait** | No | Yes (+ constants in PHP 8.2+) | **Yes** (`use T1, T2;`) | Horizontal code reuse ("copy-paste at compile time") |

```php
interface PaymentGateway
{
    public function charge(int $amountCents): string;
}

final class StripeGateway implements PaymentGateway { ... }
final class PayPalGateway implements PaymentGateway { ... }

function checkout(PaymentGateway $gateway, int $cents): void
{
    echo $gateway->charge($cents) . PHP_EOL;
}
```

---

## 3. Trait Conflict Resolution

When two traits declare a method with the same name, resolve collisions explicitly:

```php
class ReportService
{
    use FileLogger, AuditLogger {
        AuditLogger::log insteadof FileLogger;
        FileLogger::log as logToFile;
    }
}
```

---

## 4. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/09-abstraction-polymorphism-and-traits/lab.php
```

---

## 5. Common Mistakes & Best Practices

- **Mistake:** Using Traits as a dumping ground for stateful dependencies (making classes hard to test). Prefer injecting service objects via constructor! Use Traits only for small, cohesive utilities or shared boilerplate.
- **Mistake:** Type-hinting concrete classes (`StripeGateway $gateway`) in controllers/services instead of interfaces (`PaymentGateway $gateway`).
- **Best Practice:** Keep interfaces small and cohesive (**Interface Segregation Principle**), such as `Readable` and `Writable` rather than one bloated `StorageInterface`.

---

## 6. Exercises & Interview Q&A

1. **Exercise:** Add a `CryptoGateway` implementing `PaymentGateway` and pass it into `processCheckout()` without modifying `processCheckout()`.
2. **Q: When should you choose an Interface over an Abstract Class?**  
   **A:** Choose an **Interface** when unrelated classes share a capability (`JsonSerializable`, `PaymentGateway`, `CacheInterface`) or when consumers only need a behavioral contract for mocking/swapping implementations. Choose an **Abstract Class** when tightly related subclasses share common state and template logic.

---

⬅️ [Chapter 08](../08-magic-methods-and-object-lifecycle/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 10: Encapsulation, Immutability & Late Static Binding](../10-encapsulation-immutability-and-lsb/README.md)
