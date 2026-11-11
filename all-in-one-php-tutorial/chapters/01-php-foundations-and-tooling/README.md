# Chapter 01: PHP Foundations, Zend Engine & Modern Tooling

> **Scope:** PHP 8.0–8.5 · Execution Lifecycle, Strict Mode, CLI vs PHP-FPM, `php.ini`, PER Coding Style 2.0, OPcache & Xdebug.

---

## 1. Learning Objectives

- Understand how PHP executes code through the **Zend Engine** (lexing, parsing, AST, opcodes, OPcache).
- Distinguish between **CLI**, **Built-in Dev Server (`php -S`)**, and **PHP-FPM** (Nginx / Apache) SAPIs.
- Always open pure PHP files with `<?php` (omitting closing `?>`) and enforce `declare(strict_types=1);`.
- Use essential PHP CLI diagnostics (`php -v`, `php -m`, `php -l`, `php --ini`, `php --ini=diff` in PHP 8.5+).

---

## 2. How Modern PHP Executes Code

PHP is no longer a simple template glue language. Modern PHP compiles source files into **OPcodes** cached in shared memory via **Zend OPcache** (and optionally compiled to machine code by the **JIT** engine introduced in PHP 8.0).

```text
.php source ─▶ Lexer/Parser ─▶ AST ─▶ OPcache (Opcodes) ─▶ Zend VM Execution
                                              │
                                       (Reused across requests)
```

### SAPI Environments (Server APIs)

| SAPI | Typical Host | Lifecycle Model | Use Case |
|---|---|---|---|
| `cli` | Terminal / Cron / Worker | Single execution per invocation | Scripts, queues, Composer, PHPUnit, Artisan |
| `cli-server` | `php -S 127.0.0.1:8000` | Single-threaded local dev server | Local prototyping only (never production) |
| `fpm-fcgi` | Nginx / Caddy / Apache | Managed worker pool | Production web applications & APIs |

---

## 3. Modern File Boilerplate (PER Coding Style 2.0)

Every modern PHP file follows [PER Coding Style 2.0](https://www.php-fig.org/per/coding-style/):

```php
<?php

declare(strict_types=1);

// Business logic or class declarations...
```

### Key Rules
1. **No closing `?>` tag** in pure PHP files — prevents accidental trailing whitespace from triggering `Cannot modify header information - headers already sent`.
2. **`declare(strict_types=1);`** at the top of every file — enforces exact scalar type checks at call sites instead of silent coercion.
3. **4 spaces** for indentation (never tabs), **LF** line endings, UTF-8 without BOM.

---

## 4. Essential PHP CLI Commands

```bash
# Check installed PHP version & Zend modules (OPcache, Xdebug)
php -v

# List compiled/enabled extensions
php -m

# Syntax-check (lint) a file without executing it
php -l path/to/file.php

# Inspect loaded php.ini and scanned .ini directories
php --ini

# PHP 8.5+: Show only non-default INI directives
php --ini=diff

# Launch an interactive REPL shell
php -a

# Start local development server serving ./public
php -S 127.0.0.1:8000 -t public
```

---

## 5. Legacy vs. Modern PHP

| Legacy Habit | Modern PHP 8.x Standard |
|---|---|
| Short open tags `<? ... ?>` or ASP `<%` | Always use full `<?php` tags |
| Closing `?>` at end of class/library files | Omit `?>` in pure PHP files |
| Untyped global scripts without `strict_types` | `declare(strict_types=1);` + explicit types |
| HTML `<br>` mixed into logic scripts | Separate rendering from logic; use `PHP_EOL` in CLI |
| Manual `require` chains across folders | Composer PSR-4 autoloading |

---

## 6. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/01-php-foundations-and-tooling/lab.php
```

---

## 7. Common Mistakes & Best Practices

- **Mistake:** Putting `declare(strict_types=1);` after other statements or inside a namespace block. It **must** be the first statement after `<?php`.
- **Mistake:** Leaving `display_errors = On` in production `php.ini`. Always set `display_errors = Off` and `log_errors = On` in production so stack traces and secrets never leak to HTTP responses.
- **Best Practice:** Enable **OPcache** in production (`opcache.enable=1`) and keep `opcache.validate_timestamps=0` during immutable container deployments.

---

## 8. Exercises & Interview Q&A

1. **Exercise:** Run `php --ini` and `php -m` in your terminal to inspect which extensions (`PDO`, `pdo_sqlite`, `mbstring`, `Zend OPcache`) are active.
2. **Q: Why should pure PHP files omit the closing `?>` tag?**  
   **A:** Any newline or space after `?>` is sent directly to the output buffer, which breaks HTTP header calls (`header()`, `setcookie()`, `session_start()`) and corrupts JSON/binary responses.
3. **Q: Does `declare(strict_types=1);` affect the file where a function is defined or the file where it is called?**  
   **A:** It applies **per-file to function calls made inside that file** (caller-side enforcement), plus return types returned from functions inside that file.

---

⬅️ [Handbook Index](../../README.md) · ➡️ [Chapter 02: Types, Variables & Strict Mode](../02-types-variables-and-strict-mode/README.md)
