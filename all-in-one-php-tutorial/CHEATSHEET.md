# ⚡ Modern PHP 8.x Developer Desk Cheatsheet

> One-page everyday reference covering PHP 8.0–8.5 syntax, types, arrays, OOP, PDO, security, and CLI tools.

---

## 1. File Header & Types

```php
<?php

declare(strict_types=1); // Always place as first statement in every PHP file (omit ?> at EOF)

// Type combinators
function findUser(int|string $id): ?User {}                         // Union & Nullable (8.0)
function audit((Loggable & Identifiable)|null $item): void {}        // DNF Type (8.2)
function abort(string $reason): never { throw new RuntimeException($reason); } // Never (8.1)
```

---

## 2. PHP 8.0–8.5 Feature Quick Matrix

| Version | Key Additions | Example |
|---|---|---|
| **8.0** | Named args, Constructor Promotion, `match`, `?->`, Union types, Attributes, `str_contains`/`starts_with`/`ends_with`, `WeakMap`, JIT | `match ($x) { 1 => 'one', default => 'other' }` |
| **8.1** | Enums (pure & backed), `readonly` properties, Intersection `A&B`, First-class callables `strlen(...)`, `Fiber`, `never`, `array_is_list()` | `enum Status: string { case Open = 'open'; }` |
| **8.2** | `readonly class`, DNF types, `#[\SensitiveParameter]`, `Random\Randomizer`, trait constants | `final readonly class Money { ... }` |
| **8.3** | Typed class constants, `#[\Override]`, `json_validate()`, dynamic constant fetch `Foo::{$name}` | `public const int LIMIT = 100;` |
| **8.4** | Property Hooks (`get`/`set`), Asymmetric visibility (`public private(set)`), `new C()->m()`, `array_find`/`any`/`all`, `Dom\HTMLDocument`, `#[\Deprecated]` | `public private(set) string $slug { set => trim($value); }` |
| **8.5** | Pipe operator `|>`, `clone($obj, [...])`, `#[\NoDiscard]`, `array_first()`/`array_last()`, native `Uri` extension, `php --ini=diff` | `$s = $in \|> trim(...) \|> strtolower(...);` |

---

## 3. Control Flow & Operators

```php
$host    = $_ENV['DB_HOST'] ?? '127.0.0.1';   // Null coalescing
$opts['timeout'] ??= 30;                      // Coalescing assignment
usort($nums, static fn ($a, $b) => $a <=> $b); // Spaceship three-way sort
$city    = $user?->profile?->address?->city;  // Nullsafe chain (8.0+)
```

---

## 4. Arrays & Strings

```php
// Arrays
$merged = [...$defaults, ...$overrides];                 // String-keyed unpacking (8.1+)
$list   = array_values(array_filter($arr, $pred));       // Re-index before json_encode!
$byId   = array_column($rows, null, 'id');               // O(1) lookup map by ID
$strict = in_array($val, $allowed, true);                // ALWAYS pass strict=true

// Strings (UTF-8 safe)
$len    = mb_strlen($text, 'UTF-8');
$hasApi = str_starts_with($path, '/api/') && str_contains($path, '/v2/');
```

---

## 5. Modern OOP & Backed Enums

```php
enum OrderState: string
{
    case Pending = 'pending';
    case Paid    = 'paid';
}

final readonly class OrderDto
{
    public function __construct(
        public string $id,
        public int $amountCents,
        public OrderState $state = OrderState::Pending,
    ) {}
}
```

---

## 6. JSON, Security & PDO Essentials

```php
// JSON (throws JsonException on syntax error)
$data = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
$ok   = json_validate($raw); // PHP 8.3+

// XSS Escape (HTML body & quoted attributes)
$safe = htmlspecialchars($input, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');

// Password Hashing & Timing-Safe Token Comparison
$hash    = password_hash($plain, PASSWORD_DEFAULT);
$validPw = password_verify($plain, $hash);
$validTk = hash_equals($_SESSION['csrf'], $submittedToken);

// PDO (Prepared Statements + Exceptions + Real Prepares)
$pdo = new PDO($dsn, $user, $pass, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
]);
$stmt = $pdo->prepare('SELECT id, email FROM users WHERE id = :id');
$stmt->execute(['id' => $userId]);
```

---

## 7. Essential CLI Commands

```bash
php -v                      # Installed version & Zend extensions
php -l file.php             # Syntax lint check
php --ini                   # Active php.ini configuration paths
php --ini=diff              # PHP 8.5+: non-default INI directives
php -S 127.0.0.1:8000 -t public  # Local dev server
php run-all-examples.php    # Verify all handbook labs
```
