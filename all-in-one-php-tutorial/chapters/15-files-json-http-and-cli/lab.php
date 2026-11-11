<?php

declare(strict_types=1);

/**
 * Chapter 15 Lab: Safe Temp File I/O, JSON_THROW_ON_ERROR, json_validate() & Stream Handling
 */

echo "=== Chapter 15: Files, JSON, HTTP Config & CLI ===" . PHP_EOL;

// 1. Safe JSON encoding/decoding + PHP 8.3 json_validate()
$record = [
    'service' => 'php-handbook',
    'version' => PHP_VERSION,
    'tags'    => ['php8', 'strict', 'modern'],
];

$json = json_encode($record, JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);
echo "Encoded JSON: {$json}" . PHP_EOL;

if (function_exists('json_validate')) {
    echo "json_validate(valid)  : " . (json_validate($json) ? 'true' : 'false') . PHP_EOL;
    echo "json_validate(broken) : " . (json_validate('{"broken":}') ? 'true' : 'false') . PHP_EOL;
}

try {
    json_decode('{"broken":}', true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    echo "Caught JsonException  : " . $e->getMessage() . PHP_EOL;
}

// 2. Safe file write & SplFileObject read using system temp directory
$tmpFile = tempnam(sys_get_temp_dir(), 'php_lab_');
if ($tmpFile === false) {
    throw new RuntimeException('Unable to allocate temporary file.');
}

try {
    file_put_contents($tmpFile, "line1:alpha\nline2:beta\n", LOCK_EX);

    $file = new SplFileObject($tmpFile, 'r');
    $file->setFlags(SplFileObject::DROP_NEW_LINE | SplFileObject::SKIP_EMPTY);

    $lines = [];
    foreach ($file as $line) {
        if (is_string($line) && $line !== '') {
            $lines[] = $line;
        }
    }
    echo "Read lines via SplFileObject: " . implode(' | ', $lines) . PHP_EOL;
} finally {
    // Close SplFileObject handle before unlinking on Windows
    unset($file);
    @unlink($tmpFile);
}
