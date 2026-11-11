# 🐘 Modern PHP 8.x All-in-One Developer Handbook

[![PHP](https://img.shields.io/badge/PHP-8.0%20--%208.5-777BB4?style=flat-square&logo=php&logoColor=white)](https://www.php.net/)
[![Chapters](https://img.shields.io/badge/Curriculum-18%20Chapters-6366f1?style=flat-square)](chapters/)
[![Coding Style](https://img.shields.io/badge/Style-PER%202.0%20%2F%20strict__types-10b981?style=flat-square)](https://www.php-fig.org/per/coding-style/)
[![Interactive Portal](https://img.shields.io/badge/Portal-Interactive%20Handbook-f59e0b?style=flat-square)](index.html)

A complete, chapterwise, modern **PHP 8.0–8.5 Developer Handbook & Full Tutorial**—covering everything from Zend Engine fundamentals, strict typing, arrays, and Object-Oriented Architecture to PHP 8.4 Property Hooks, PHP 8.5 Pipe Operators, Web Security, PDO Transactions, Testing, and Clean Architecture.

---

## ⚡ Quick Navigation & Companion Resources

* 🌐 **[Interactive Developer Handbook Portal (`index.html`)](index.html)** — Searchable browser UI with track filters, full chapter previews, PHP 8.0–8.5 timeline, and one-click code copying.
* ⚡ **[Everyday PHP 8.x Cheatsheet (`CHEATSHEET.md`)](CHEATSHEET.md)** — Condensed one-page desk reference for daily coding.
* 📖 **[A–Z Technical Glossary (`GLOSSARY.md`)](GLOSSARY.md)** — Authoritative definitions from Asymmetric Visibility to `WeakMap` and Zend OPcache.
* 📦 **[Composer PSR-4 Manifest (`composer.json`)](composer.json)** — Modern PSR-4 autoloading setup (`App\` namespace).
* 🧪 **[Automated Lab Verification Runner (`run-all-examples.php`)](run-all-examples.php)** — Syntax-checks (`php -l`) and runs all compatible chapter labs in one command:
  ```bash
  php run-all-examples.php
  ```

---

## 🗂️ Repository Structure

```text
all-in-one-php-tutorial/
├── README.md                              # Master handbook hub & chapterwise curriculum map
├── CHEATSHEET.md                          # One-page PHP 8.0–8.5 desk cheatsheet
├── GLOSSARY.md                            # A–Z PHP terminology & architecture reference
├── index.html                             # Interactive single-file PHP Developer Handbook portal
├── composer.json                          # PSR-4 autoloading manifest & scripts
├── run-all-examples.php                   # CLI runner executing & verifying all chapter labs
│
└── chapters/                              # 18 Progressive Chapters (Guide + Runnable PHP Lab)
    ├── 01-php-foundations-and-tooling/
    ├── 02-types-variables-and-strict-mode/
    ├── 03-operators-and-control-flow/
    ├── 04-functions-closures-and-callables/
    ├── 05-arrays-and-functional-pipelines/
    ├── 06-strings-regex-and-datetime/
    ├── 07-oop-foundations-and-inheritance/
    ├── 08-magic-methods-and-object-lifecycle/
    ├── 09-abstraction-polymorphism-and-traits/
    ├── 10-encapsulation-immutability-and-lsb/
    ├── 11-namespaces-psr4-and-composer/
    ├── 12-modern-php-8-type-system-and-enums/
    ├── 13-modern-php-8-syntax-attributes-and-hooks/
    ├── 14-error-handling-exceptions-and-fibers/
    ├── 15-files-json-http-and-cli/
    ├── 16-web-security-sessions-and-validation/
    ├── 17-databases-pdo-and-transactions/
    └── 18-testing-performance-and-architecture/
```

---

## 📚 Chapterwise Full Curriculum

### Track 1: PHP Core Foundations (Chapters 01–06)

| Ch | Chapter Guide | Runnable Lab | Core Topics Covered |
| :---: | :--- | :--- | :--- |
| **01** | [PHP Foundations & Tooling](chapters/01-php-foundations-and-tooling/README.md) | [`lab.php`](chapters/01-php-foundations-and-tooling/lab.php) | Zend Engine, OPcache, CLI vs PHP-FPM, `declare(strict_types=1)`, PER Coding Style 2.0, `php -l` / `php -S` |
| **02** | [Types, Variables & Strict Mode](chapters/02-types-variables-and-strict-mode/README.md) | [`lab.php`](chapters/02-types-variables-and-strict-mode/lab.php) | Scalar/compound types, `strict_types=1`, `==` vs `===` in PHP 8+, `const` vs `define()`, `get_debug_type()` |
| **03** | [Operators & Control Flow](chapters/03-operators-and-control-flow/README.md) | [`lab.php`](chapters/03-operators-and-control-flow/lab.php) | Spaceship (`<=>`), null coalescing (`??`, `??=`), strict `match` expressions, `switch`, `foreach` safety |
| **04** | [Functions, Closures & Callables](chapters/04-functions-closures-and-callables/README.md) | [`lab.php`](chapters/04-functions-closures-and-callables/lab.php) | Typed signatures, `never` return type, Named Arguments, Arrow functions (`fn()`), First-Class Callables (`...`), Generators (`yield`) |
| **05** | [Arrays & Functional Pipelines](chapters/05-arrays-and-functional-pipelines/README.md) | [`lab.php`](chapters/05-arrays-and-functional-pipelines/lab.php) | Lists vs associative maps, unpacking (`...`), `array_map`/`filter`/`reduce`, `array_is_list()`, `array_find()` (8.4), `array_first()` (8.5) |
| **06** | [Strings, Regex & DateTimeImmutable](chapters/06-strings-regex-and-datetime/README.md) | [`lab.php`](chapters/06-strings-regex-and-datetime/lab.php) | `str_contains`/`starts_with`/`ends_with`, `mbstring` UTF-8 safety, PCRE named groups, `DateTimeImmutable` & timezones |

---

### Track 2: Object-Oriented PHP Mastery (Chapters 07–11)

| Ch | Chapter Guide | Runnable Lab | Core Topics Covered |
| :---: | :--- | :--- | :--- |
| **07** | [OOP Foundations & Inheritance](chapters/07-oop-foundations-and-inheritance/README.md) | [`lab.php`](chapters/07-oop-foundations-and-inheritance/lab.php) | Classes, `$this`, multiple instances, object handles, `extends` single inheritance, `parent::`, method overriding |
| **08** | [Magic Methods & Object Lifecycle](chapters/08-magic-methods-and-object-lifecycle/README.md) | [`lab.php`](chapters/08-magic-methods-and-object-lifecycle/lab.php) | `__construct`, `__destruct`, `unset()`, `__toString` (`Stringable`), `__get`/`__set`, `__call`/`__callStatic`, deep `__clone` |
| **09** | [Abstraction, Polymorphism & Traits](chapters/09-abstraction-polymorphism-and-traits/README.md) | [`lab.php`](chapters/09-abstraction-polymorphism-and-traits/lab.php) | `abstract` classes vs `interface`s, polymorphic dependency injection, `trait` reuse & `insteadof`/`as` conflict resolution |
| **10** | [Encapsulation, Immutability & LSB](chapters/10-encapsulation-immutability-and-lsb/README.md) | [`lab.php`](chapters/10-encapsulation-immutability-and-lsb/lab.php) | `public`/`protected`/`private`, `final`, `readonly` properties (8.1) & classes (8.2), Late Static Binding (`self::` vs `static::`) |
| **11** | [Namespaces, PSR-4 & Composer](chapters/11-namespaces-psr4-and-composer/README.md) | [`lab.php`](chapters/11-namespaces-psr4-and-composer/lab.php) | `namespace`, `use`, `as` aliasing, global fallback, PSR-4 directory mapping (`src/`), `composer.json` & autoloaders |

---

### Track 3: Modern PHP 8.0–8.5 Architecture (Chapters 12–14)

| Ch | Chapter Guide | Runnable Lab | Core Topics Covered |
| :---: | :--- | :--- | :--- |
| **12** | [Modern PHP 8 Type System & Enums](chapters/12-modern-php-8-type-system-and-enums/README.md) | [`lab.php`](chapters/12-modern-php-8-type-system-and-enums/lab.php) | Constructor Property Promotion (8.0), Union (`A\|B`), Intersection (`A&B`), DNF (`(A&B)\|null`), Pure & Backed Enums (8.1), Typed Constants (8.3) |
| **13** | [Modern Syntax, Attributes, Hooks & Pipe](chapters/13-modern-php-8-syntax-attributes-and-hooks/README.md) | [`lab.php`](chapters/13-modern-php-8-syntax-attributes-and-hooks/lab.php) · [`8.4`](chapters/13-modern-php-8-syntax-attributes-and-hooks/lab-php84.php) · [`8.5`](chapters/13-modern-php-8-syntax-attributes-and-hooks/lab-php85.php) | Nullsafe `?->`, `#[Attribute]` + Reflection, `#[\SensitiveParameter]`, `#[\Override]`, Property Hooks & `public private(set)` (8.4), Pipe `\|>` & `clone($o, [...])` (8.5) |
| **14** | [Error Handling, Exceptions & Fibers](chapters/14-error-handling-exceptions-and-fibers/README.md) | [`lab.php`](chapters/14-error-handling-exceptions-and-fibers/lab.php) | `Throwable` hierarchy (`Error` vs `Exception`), custom domain exceptions, `$previous` chaining, `finally`, cooperative `Fiber` scheduling (8.1) |

---

### Track 4: Applied Web, Data, Security & Production Engineering (Chapters 15–18)

| Ch | Chapter Guide | Runnable Lab | Core Topics Covered |
| :---: | :--- | :--- | :--- |
| **15** | [Files, JSON, HTTP/cURL & CLI](chapters/15-files-json-http-and-cli/README.md) | [`lab.php`](chapters/15-files-json-http-and-cli/lab.php) | `SplFileObject`, `LOCK_EX`, path traversal defense, `JSON_THROW_ON_ERROR`, `json_validate()` (8.3), cURL timeouts & TLS, CLI args |
| **16** | [Web Security, Sessions & Validation](chapters/16-web-security-sessions-and-validation/README.md) | [`lab.php`](chapters/16-web-security-sessions-and-validation/lab.php) | XSS escaping (`htmlspecialchars`), `password_hash`/`password_verify`, CSRF (`random_bytes` + `hash_equals`), secure cookies, `Random\Randomizer` |
| **17** | [Databases, PDO & Transactions](chapters/17-databases-pdo-and-transactions/README.md) | [`lab.php`](chapters/17-databases-pdo-and-transactions/lab.php) | MySQL 8.4 & SQLite PDO config, `ATTR_EMULATE_PREPARES => false`, prepared statements, `ORDER BY` allowlists, atomic `commit`/`rollBack` |
| **18** | [Testing, Performance & Architecture](chapters/18-testing-performance-and-architecture/README.md) | [`lab.php`](chapters/18-testing-performance-and-architecture/lab.php) | Unit testing, PHPStan/Psalm static analysis, PSR standards, `WeakMap` caching, OPcache & JIT tuning, DI Container Capstone |

---

## 🚀 Getting Started Locally

```bash
# 1. Verify PHP CLI version (PHP 8.2+ / 8.3+ recommended; PHP 8.4/8.5 labs require those versions)
php -v

# 2. Run all compatible chapter labs & verify syntax
php run-all-examples.php

# 3. Run any individual chapter lab directly
php chapters/17-databases-pdo-and-transactions/lab.php

# 4. Launch the interactive web handbook in your browser
php -S 127.0.0.1:8080
```
