<?php

declare(strict_types=1);

/**
 * Chapter 01 Lab: PHP Runtime Diagnostics & Environment Inspection
 */

echo "=== Chapter 01: PHP Foundations & Tooling ===" . PHP_EOL;
echo "PHP Version : " . PHP_VERSION . PHP_EOL;
echo "PHP SAPI    : " . PHP_SAPI . PHP_EOL;
echo "OS Family   : " . PHP_OS_FAMILY . PHP_EOL;
echo "Strict Mode : Enabled via declare(strict_types=1)" . PHP_EOL;

$requiredExtensions = ['json', 'mbstring', 'PDO', 'openssl', 'SPL'];
echo PHP_EOL . "Core Extensions Check:" . PHP_EOL;

foreach ($requiredExtensions as $ext) {
    $status = extension_loaded($ext) ? 'LOADED' : 'MISSING';
    echo sprintf("  - %-10s : %s%s", $ext, $status, PHP_EOL);
}

echo PHP_EOL . "OPcache Status: " . (function_exists('opcache_get_status') ? 'Extension available' : 'Not loaded') . PHP_EOL;
