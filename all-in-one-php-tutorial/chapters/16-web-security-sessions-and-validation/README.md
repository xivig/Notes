# Chapter 16: Web Security, Password Hashing, CSRF & Input Validation

> **Scope:** PHP 8.0–8.5 · XSS Output Escaping, CSRF (`random_bytes` + `hash_equals`), `password_hash`/`password_verify`, Secure Sessions, `filter_var`, and `Random\Randomizer` (8.2).

---

## 1. Learning Objectives

- Escape untrusted output reliably for HTML contexts using `htmlspecialchars()`.
- Protect forms against CSRF using cryptographically random tokens and timing-safe comparisons (`hash_equals()`).
- Hash and verify user passwords safely using `password_hash()` (Argon2id / bcrypt) and `password_verify()`.
- Harden PHP session cookies (`HttpOnly`, `Secure`, `SameSite=Lax`, `session_regenerate_id(true)`).
- Validate inputs strictly with `filter_var()` and generate secure random numbers via `Random\Randomizer` (PHP 8.2+).

---

## 2. Essential Security Controls Checklist

### 1. Output Escaping (XSS Prevention)
```php
function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}
```
> Note: `htmlspecialchars()` protects HTML text and quoted attributes. Never interpolate untrusted strings inside `<script>` tags or `href="javascript:..."` URLs—validate URL schemes explicitly (`http`/`https` only)!

### 2. Password Hashing (Never MD5 / SHA1 / SHA256!)
```php
$hash = password_hash($plainPassword, PASSWORD_DEFAULT);

if (password_verify($submittedPassword, $hash)) {
    if (password_needs_rehash($hash, PASSWORD_DEFAULT)) {
        $newHash = password_hash($submittedPassword, PASSWORD_DEFAULT);
        // Save $newHash to database
    }
}
```

### 3. CSRF Tokens (Timing-Safe Verification)
```php
$token = bin2hex(random_bytes(32)); // Store in $_SESSION['csrf_token']
$isValid = hash_equals($_SESSION['csrf_token'], $submittedToken);
```

### 4. Hardened Session Configuration
```php
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'secure'   => true,   // HTTPS only
    'httponly' => true,   // Block document.cookie access
    'samesite' => 'Lax',
]);
session_start();
// Always call after login privilege elevation:
session_regenerate_id(true);
```

---

## 3. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/16-web-security-sessions-and-validation/lab.php
```

---

## 4. Common Mistakes & Best Practices

- **Mistake:** Using `===` to compare CSRF or webhook HMAC tokens—string `===` stops at the first mismatch byte, leaking timing side-channels. Always use `hash_equals($expected, $actual)`.
- **Mistake:** Using `rand()` or `mt_rand()` for security tokens or OTP codes. Always use `random_bytes()`, `random_int()`, or `Random\Randomizer` (PHP 8.2+).
- **Best Practice:** Combine input validation (`filter_var`, allowlists, length limits) with contextual output escaping (`htmlspecialchars` for HTML, PDO prepared parameters for SQL).

---

## 5. Exercises & Interview Q&A

1. **Exercise:** Implement a `CsrfGuard` class with `generateToken(): string` and `verify(string $expected, string $provided): bool` using `random_bytes(32)` and `hash_equals()`.
2. **Q: Why does `password_verify()` not require storing the salt in a separate column?**  
   **A:** `password_hash()` embeds the algorithm identifier, cost/memory parameters, random salt, and digest inside a single modular PHC string (e.g. `$2y$10$...` or `$argon2id$...`), which `password_verify()` parses automatically.

---

⬅️ [Chapter 15](../15-files-json-http-and-cli/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 17: Databases, PDO & Transactions](../17-databases-pdo-and-transactions/README.md)
