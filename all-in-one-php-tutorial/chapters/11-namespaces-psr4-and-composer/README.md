# Chapter 11: Namespaces, PSR-4 Autoloading & Composer

> **Scope:** PHP 8.0–8.5 · `namespace`, `use` Imports & `as` Aliases, Global Namespace Fallback, PSR-4 Directory Mapping, and `composer.json`.

*(Consolidates and modernizes `oop_namespaces.php`, `namespaces/Logger.php`, and `namespaces/Database.php`.)*

---

## 1. Learning Objectives

- Organize classes, interfaces, enums, and functions cleanly without global name collisions using `namespace`.
- Import and alias classes cleanly with `use ...;` and `use ... as ...;`.
- Configure **PSR-4 Autoloading** in `composer.json` so PHP loads classes automatically without manual `require_once` trees.
- Use Composer workflows (`composer install`, `composer require`, `composer dump-autoload -o`).

---

## 2. Namespaces & PSR-4 Directory Convention

**PSR-4** maps a namespace prefix directly to a filesystem directory:

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "chapters/11-namespaces-psr4-and-composer/src/"
    }
  }
}
```

With that mapping:
- `App\Utils\Logger` resolves to `src/Utils/Logger.php`
- `App\Database\Connection` resolves to `src/Database/Connection.php`

### Minimal Standalone PSR-4 Autoloader (Zero Dependencies)
When `vendor/autoload.php` isn't generated yet, a 10-line `spl_autoload_register()` function resolves `App\` namespaces identically:

```php
spl_autoload_register(static function (string $class): void {
    $prefix = 'App\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }
    $relative = substr($class, strlen($prefix));
    $file = __DIR__ . '/src/' . str_replace('\\', '/', $relative) . '.php';
    if (is_file($file)) {
        require_once $file;
    }
});
```

---

## 3. Essential Composer Commands

```bash
# Install dependencies from composer.lock (recommended for CI & deployment)
composer install --no-dev --optimize-autoloader

# Add a runtime package or dev tool
composer require monolog/monolog
composer require --dev phpunit/phpunit phpstan/phpstan

# Regenerate autoloader map after adding namespaces
composer dump-autoload -o
```

---

## 4. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/11-namespaces-psr4-and-composer/lab.php
```

---

## 5. Common Mistakes & Best Practices

- **Mistake:** Referencing built-in global classes inside a namespaced file without leading backslash or import (e.g., writing `new DateTimeImmutable()` inside `namespace App\Utils;` looks for `App\Utils\DateTimeImmutable` unless you write `use DateTimeImmutable;` or `\DateTimeImmutable`).
- **Mistake:** Mismatching filename casing (`logger.php` instead of `Logger.php`) — works on case-insensitive Windows/macOS, crashes on production Linux servers! Always match class & file casing strictly.
- **Best Practice:** Commit `composer.json` and `composer.lock` for applications, and **never commit `vendor/`** (ignore it in `.gitignore`).

---

## 6. Exercises & Interview Q&A

1. **Exercise:** Add a `App\Services\Mailer` class under `src/Services/Mailer.php` and instantiate it in `lab.php` via the PSR-4 autoloader without a manual `require`.
2. **Q: What is the difference between `composer install` and `composer update`?**  
   **A:** `composer install` reads `composer.lock` (if present) and installs exact verified dependency versions; `composer update` resolves newer versions allowed by `composer.json` and rewrites `composer.lock`.

---

⬅️ [Chapter 10](../10-encapsulation-immutability-and-lsb/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 12: Modern PHP 8 Type System & Enums](../12-modern-php-8-type-system-and-enums/README.md)
