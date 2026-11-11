<?php

declare(strict_types=1);

/**
 * Verification runner for all standalone PHP labs in
 * All-in-One Laravel Developer Handbook.
 */

$root = __DIR__;
$chaptersDir = $root . DIRECTORY_SEPARATOR . 'chapters';

if (!is_dir($chaptersDir)) {
    fwrite(STDERR, "Chapters directory not found: {$chaptersDir}" . PHP_EOL);
    exit(1);
}

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($chaptersDir, FilesystemIterator::SKIP_DOTS)
);

$files = [];
foreach ($iterator as $fileInfo) {
    /** @var SplFileInfo $fileInfo */
    if ($fileInfo->isFile() && $fileInfo->getExtension() === 'php') {
        $files[] = $fileInfo->getPathname();
    }
}
sort($files);

$passed = 0;
$skipped = 0;
$failed = 0;
$phpBinary = PHP_BINARY;

foreach ($files as $file) {
    $relative = str_replace($root . DIRECTORY_SEPARATOR, '', $file);
    $basename = basename($file);

    $requiredVersion = null;
    if (str_contains($basename, 'php84')) {
        $requiredVersion = 80400;
    } elseif (str_contains($basename, 'php85')) {
        $requiredVersion = 80500;
    }

    if ($requiredVersion !== null && PHP_VERSION_ID < $requiredVersion) {
        $human = intdiv($requiredVersion, 10000) . '.' . intdiv($requiredVersion % 10000, 100);
        echo "[SKIP] {$relative} (requires PHP >= {$human}, running " . PHP_VERSION . ")" . PHP_EOL;
        $skipped++;
        continue;
    }

    $lintCmd = escapeshellarg($phpBinary) . ' -l ' . escapeshellarg($file) . ' 2>&1';
    exec($lintCmd, $lintOut, $lintCode);
    if ($lintCode !== 0) {
        echo "[FAIL][LINT] {$relative}" . PHP_EOL;
        echo implode(PHP_EOL, $lintOut) . PHP_EOL;
        $failed++;
        continue;
    }

    $runCmd = escapeshellarg($phpBinary) . ' ' . escapeshellarg($file) . ' 2>&1';
    $runOut = [];
    exec($runCmd, $runOut, $runCode);
    if ($runCode !== 0) {
        echo "[FAIL][RUN] {$relative} (exit {$runCode})" . PHP_EOL;
        echo implode(PHP_EOL, $runOut) . PHP_EOL;
        $failed++;
        continue;
    }

    echo "[PASS] {$relative}" . PHP_EOL;
    $passed++;
}

echo PHP_EOL . "Summary: {$passed} passed, {$skipped} skipped, {$failed} failed (PHP " . PHP_VERSION . ")" . PHP_EOL;
exit($failed > 0 ? 1 : 0);
