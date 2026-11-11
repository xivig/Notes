# Chapter 18: Testing, Static Analysis, Performance & Clean Architecture

> **Scope:** PHP 8.0–8.5 · Unit Testing (PHPUnit / Pest), Static Analysis (PHPStan / Psalm), Dependency Injection & PSR Standards, `WeakMap` / SPL, OPcache / JIT, and Capstone Lab.

---

## 1. Learning Objectives

- Write isolated, deterministic unit tests using Dependency Injection and interface mocks/fakes (PHPUnit / Pest mindset).
- Enforce zero-bug invariants early using strict typing plus static analysis (**PHPStan** level 8–9 / **Psalm**).
- Understand key **PHP-FIG PSR Standards** (`PSR-4` autoloading, `PSR-7` HTTP messages, `PSR-11` DI container, `PSR-12` / `PER` coding style, `PSR-3` Logger).
- Use **`WeakMap`** (PHP 8.0+) for object-keyed caches without memory leaks, and tune **OPcache + JIT** for production workloads.

---

## 2. Production PHP Quality Toolchain

| Tool / Standard | Purpose | Command / Example |
|---|---|---|
| **PHPUnit / Pest** | Automated unit & integration tests | `vendor/bin/phpunit` or `vendor/bin/pest` |
| **PHPStan / Psalm** | Static type checking without running code | `vendor/bin/phpstan analyse src --level=8` |
| **PHP CS Fixer / Pint** | Automated PER Coding Style 2.0 formatting | `vendor/bin/pint` |
| **PSR-3 / PSR-11 / PSR-7** | Interoperable Logger, Container & HTTP contracts | Framework-agnostic decoupled components |
| **OPcache + JIT** | Shared-memory opcode caching & CPU-bound JIT | `opcache.enable=1`, `opcache.jit=tracing` |

---

## 3. Memory-Safe Caching with `WeakMap` (PHP 8.0+)

Unlike `SplObjectStorage`, a **`WeakMap`** holds weak references to object keys—when the object goes out of scope (`unset($obj)`), its cached entry is **automatically garbage-collected**, preventing memory leaks in long-running workers (RoadRunner, FrankenPHP, Swoole, queue daemons).

---

## 4. Capstone Architecture Lab

Run [lab.php](lab.php) — brings together strict types, readonly DTOs, backed enums, interfaces, dependency injection, `WeakMap` memoization, a minimal PSR-11-style service container, and a self-verifying unit test suite:

```bash
php chapters/18-testing-performance-and-architecture/lab.php
```

---

## 5. Common Mistakes & Best Practices

- **Mistake:** Instantiating `new PDO(...)` or `new CurlClient()` directly inside domain services (`tight coupling`), making unit tests slow and fragile. Inject interfaces via `__construct()`.
- **Mistake:** Enabling OPcache JIT (`opcache.jit_buffer_size=64M`) hoping it will speed up slow SQL queries—JIT optimizes **CPU-bound computation**, while 90% of web latency comes from DB queries, N+1 loops, and network I/O! Profile first with Xdebug/Blackfire/XHProf.
- **Best Practice:** Run `php -l`, static analysis (`phpstan`), and unit tests on every pull request in CI.

---

## 6. Exercises & Interview Q&A

1. **Exercise:** Add a `FakeClock` implementing `ClockInterface` (PSR-20 style) to `lab.php` and write a deterministic assertion checking expiration timestamps.
2. **Q: How does `WeakMap` prevent memory leaks in long-running PHP processes?**  
   **A:** A `WeakMap` does not increment the reference count of its key objects, so once all external references to an object are dropped, PHP's garbage collector reclaims both the object and its `WeakMap` entry automatically.

---

⬅️ [Chapter 17](../17-databases-pdo-and-transactions/README.md) · [Handbook Index](../../README.md)
