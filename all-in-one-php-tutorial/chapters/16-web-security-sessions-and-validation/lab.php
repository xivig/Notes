<?php

declare(strict_types=1);

/**
 * Chapter 16 Lab: XSS Escaping, Password Hashing, CSRF Tokens, Input Validation & Randomizer
 */

use Random\Randomizer;

function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

echo "=== Chapter 16: Web Security & Input Validation ===" . PHP_EOL;

// 1. XSS escaping
$untrustedInput = '<script>alert("xss")</script> & "quoted"';
echo "Escaped HTML: " . escapeHtml($untrustedInput) . PHP_EOL;

// 2. Password hashing & verification
$algo = defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_DEFAULT;
$hash = password_hash('Correct-Horse-Battery-Staple!', $algo);
echo "Password verified (good): " . (password_verify('Correct-Horse-Battery-Staple!', $hash) ? 'true' : 'false') . PHP_EOL;
echo "Password verified (bad) : " . (password_verify('wrong-pass', $hash) ? 'true' : 'false') . PHP_EOL;

// 3. CSPRNG CSRF token & timing-safe comparison
$csrfToken = bin2hex(random_bytes(16));
echo "CSRF token sample (32 hex chars): {$csrfToken}" . PHP_EOL;
echo "hash_equals match: " . (hash_equals($csrfToken, $csrfToken) ? 'true' : 'false') . PHP_EOL;

// 4. Strict email validation & URL scheme allowlist
$email = filter_var('developer@example.com', FILTER_VALIDATE_EMAIL);
echo "Validated email: " . ($email !== false ? $email : 'invalid') . PHP_EOL;

// 5. PHP 8.2+ Random\Randomizer
if (class_exists(Randomizer::class)) {
    $randomizer = new Randomizer();
    $otp = $randomizer->getInt(100000, 999999);
    echo "CSPRNG 6-digit OTP via Randomizer: {$otp}" . PHP_EOL;
}
