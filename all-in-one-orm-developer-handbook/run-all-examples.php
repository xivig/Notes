<?php

declare(strict_types=1);

/**
 * Automated verifier for all standalone SQLite PDO ORM labs.
 * Usage: php run-all-examples.php
 */

$root = __DIR__;
$labsDir = $root . DIRECTORY_SEPARATOR . 'labs';

if (! is_dir($labsDir)) {
    fwrite(STDERR, "Labs directory not found: {$labsDir}" . PHP_EOL);
    exit(1);
}

$files = glob($labsDir . DIRECTORY_SEPARATOR . '*.php') ?: [];
sort($files);

$passed = 0;
$failed = 0;

foreach ($files as $file) {
    $rel = str_replace($root . DIRECTORY_SEPARATOR, '', $file);

    $lintOut = [];
    exec(escapeshellarg(PHP_BINARY) . ' -l ' . escapeshellarg($file) . ' 2>&1', $lintOut, $lintCode);
    if ($lintCode !== 0) {
        echo "[FAIL][LINT] {$rel}" . PHP_EOL . implode(PHP_EOL, $lintOut) . PHP_EOL;
        $failed++;
        continue;
    }

    $runOut = [];
    exec(escapeshellarg(PHP_BINARY) . ' -d zend.assertions=1 -d assert.exception=1 ' . escapeshellarg($file) . ' 2>&1', $runOut, $runCode);
    if ($runCode !== 0) {
        echo "[FAIL][RUN] {$rel} (exit {$runCode})" . PHP_EOL . implode(PHP_EOL, $runOut) . PHP_EOL;
        $failed++;
        continue;
    }

    echo "[PASS] {$rel}" . PHP_EOL;
    foreach ($runOut as $line) {
        echo "       {$line}" . PHP_EOL;
    }
    $passed++;
}

echo PHP_EOL . "Summary: {$passed} passed, {$failed} failed (PHP " . PHP_VERSION . ")" . PHP_EOL;
exit($failed > 0 ? 1 : 0);
