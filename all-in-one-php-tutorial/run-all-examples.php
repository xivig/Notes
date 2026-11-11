<?php

declare(strict_types=1);

/**
 * CLI Verification Runner for all chapter PHP labs.
 * Usage: php run-all-examples.php
 */

$root = __DIR__;
$chaptersDir = $root . DIRECTORY_SEPARATOR . 'chapters';

if (!is_dir($chaptersDir)) {
    fwrite(STDERR, "Chapters directory not found: {$chaptersDir}" . PHP_EOL);
    exit(1);
}

$files = [];
$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($chaptersDir, FilesystemIterator::SKIP_DOTS)
);

foreach ($iterator as $fileInfo) {
    /** @var SplFileInfo $fileInfo */
    if ($fileInfo->isFile() && preg_match('/^lab.*\.php$/', $fileInfo->getFilename()) === 1) {
        $files[] = $fileInfo->getPathname();
    }
}

sort($files);

$passed = 0;
$skipped = 0;
$failed = 0;

echo "Running PHP Labs (PHP " . PHP_VERSION . ")" . PHP_EOL;
echo str_repeat('=', 60) . PHP_EOL;

foreach ($files as $file) {
    $relative = str_replace($root . DIRECTORY_SEPARATOR, '', $file);
    $normalized = str_replace('\\', '/', $relative);

    // Check minimum PHP version constraints for PHP 8.4+ / 8.5+ syntax labs
    if (str_contains($normalized, 'lab-php84.php') && PHP_VERSION_ID < 80400) {
        echo "[SKIP] {$normalized} (requires PHP >= 8.4.0, current " . PHP_VERSION . ")" . PHP_EOL;
        $skipped++;
        continue;
    }

    if (str_contains($normalized, 'lab-php85.php') && PHP_VERSION_ID < 80500) {
        echo "[SKIP] {$normalized} (requires PHP >= 8.5.0, current " . PHP_VERSION . ")" . PHP_EOL;
        $skipped++;
        continue;
    }

    $lintCmd = escapeshellarg(PHP_BINARY) . ' -l ' . escapeshellarg($file) . ' 2>&1';
    exec($lintCmd, $lintOut, $lintCode);
    if ($lintCode !== 0) {
        echo "[FAIL] {$normalized} (syntax error)" . PHP_EOL;
        echo '       ' . implode(PHP_EOL . '       ', $lintOut) . PHP_EOL;
        $failed++;
        continue;
    }

    $runCmd = escapeshellarg(PHP_BINARY) . ' ' . escapeshellarg($file) . ' 2>&1';
    $runOut = [];
    exec($runCmd, $runOut, $runCode);
    if ($runCode !== 0) {
        echo "[FAIL] {$normalized} (exit code {$runCode})" . PHP_EOL;
        echo '       ' . implode(PHP_EOL . '       ', $runOut) . PHP_EOL;
        $failed++;
        continue;
    }

    echo "[PASS] {$normalized}" . PHP_EOL;
    $passed++;
}

echo str_repeat('=', 60) . PHP_EOL;
echo "Summary: {$passed} passed, {$skipped} skipped, {$failed} failed." . PHP_EOL;

exit($failed > 0 ? 1 : 0);
