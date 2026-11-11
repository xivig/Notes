<?php

declare(strict_types=1);

/**
 * Chapter 06 Lab: Modern String Helpers, Multibyte UTF-8, PCRE Regex & DateTimeImmutable
 */

echo "=== Chapter 06: Strings, Regex & DateTimeImmutable ===" . PHP_EOL;

// 1. PHP 8.0+ string helpers
$path = '/api/v2/users/profile.json';
echo "Is API route? " . (str_starts_with($path, '/api/') ? 'yes' : 'no') . PHP_EOL;
echo "Contains v2?  " . (str_contains($path, '/v2/') ? 'yes' : 'no') . PHP_EOL;
echo "Is JSON?      " . (str_ends_with($path, '.json') ? 'yes' : 'no') . PHP_EOL;

// 2. Multibyte UTF-8 safety
$greeting = 'Café 🚀';
echo "Byte length (strlen)   : " . strlen($greeting) . PHP_EOL;
echo "Char length (mb_strlen): " . mb_strlen($greeting, 'UTF-8') . PHP_EOL;

// 3. Regex with named capture groups
$versionTag = 'v8.4.1';
if (preg_match('/^v(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/', $versionTag, $matches) === 1) {
    echo "Parsed SemVer => major={$matches['major']}, minor={$matches['minor']}, patch={$matches['patch']}" . PHP_EOL;
}

// 4. DateTimeImmutable + Timezones
$utcCreated = new DateTimeImmutable('2026-11-11 06:00:00', new DateTimeZone('UTC'));
$utcRenewal = $utcCreated->add(new DateInterval('P30D'));
$istRenewal = $utcRenewal->setTimezone(new DateTimeZone('Asia/Kolkata'));

echo "Created (UTC) : " . $utcCreated->format(DateTimeInterface::ATOM) . PHP_EOL;
echo "Renewal (UTC) : " . $utcRenewal->format(DateTimeInterface::ATOM) . PHP_EOL;
echo "Renewal (IST) : " . $istRenewal->format(DateTimeInterface::ATOM) . PHP_EOL;
