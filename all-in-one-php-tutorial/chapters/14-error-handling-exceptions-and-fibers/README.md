# Chapter 14: Error Handling, Custom Exceptions & Fibers

> **Scope:** PHP 8.0–8.5 · `Throwable` Hierarchy (`Error` vs `Exception`), Custom Domain Exceptions, `try/catch/finally`, and Cooperative Concurrency with `Fiber` (8.1).

*(Consolidates and modernizes `modern_fibers.php` and adds comprehensive PHP 8 exception architecture.)*

---

## 1. Learning Objectives

- Distinguish between `\Error` (internal/type/parse errors) and `\Exception` (recoverable domain & runtime failures) under `\Throwable`.
- Design expressive custom exception hierarchies and chain root causes using `$previous`.
- Guarantee cleanup using `finally`.
- Implement full-stack cooperative concurrency using **`Fiber`** (`start()`, `Fiber::suspend()`, `resume()`, `throw()`).

---

## 2. The `Throwable` Hierarchy

```text
Throwable (interface)
├── Error
│   ├── TypeError
│   ├── ValueError          (PHP 8.0+)
│   ├── UnhandledMatchError (PHP 8.0+)
│   └── ArithmeticError / DivisionByZeroError
└── Exception
    ├── LogicException      (InvalidArgumentException, DomainException, OutOfBoundsException)
    └── RuntimeException    (PDOException, JsonException, UnexpectedValueException)
```

### Exception Best Practices
- Catch **specific exception classes** (`PDOException`, `JsonException`), not blanket `catch (Throwable $e)` everywhere (except at the top-level HTTP/CLI boundary handler!).
- Preserve context with `$previous`:
  ```php
  throw new PaymentGatewayException('Charge failed', 502, $previousException);
  ```

---

## 3. Cooperative Concurrency with `Fiber` (PHP 8.1+)

A `Fiber` is a lightweight execution stack that can pause mid-function (`Fiber::suspend($value)`) and yield control back to a scheduler, then resume seamlessly with `$fiber->resume($input)`.

- Powers modern async PHP runtimes like **RevoltPHP**, **AMPHP**, and **ReactPHP**.
- Fibers are **cooperative** (not multi-threaded OS threads)—control switches only at explicit `Fiber::suspend()` points.

---

## 4. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/14-error-handling-exceptions-and-fibers/lab.php
```

---

## 5. Common Mistakes & Best Practices

- **Mistake:** Swallowing exceptions silently (`catch (Exception $e) {}`). Either recover meaningfully, wrap & rethrow, or log with full context.
- **Mistake:** Suppressing errors with `@` (`@file_get_contents(...)`). Notice in PHP 8+, `@` **no longer silences fatal errors**, and silent suppression hides real production bugs.
- **Best Practice:** Register `set_exception_handler()` at your entrypoint to render sanitized error responses while writing structured JSON logs internally.

---

## 6. Exercises & Interview Q&A

1. **Exercise:** Create a `DomainException` subclass `InsufficientFundsException` carrying `$balanceCents` and `$requestedCents`, throw it on an overdraft, and catch it cleanly.
2. **Q: Why shouldn't libraries catch `Throwable` indiscriminately?**  
   **A:** Catching `Throwable` catches `\TypeError`, `\ParseError`, and `\AssertionError`, hiding programmer bugs instead of letting tests/monitoring surface them immediately.

---

⬅️ [Chapter 13](../13-modern-php-8-syntax-attributes-and-hooks/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 15: Files, JSON, HTTP/cURL & CLI Tools](../15-files-json-http-and-cli/README.md)
