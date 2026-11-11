<?php

declare(strict_types=1);

/**
 * Chapter 11 Lab: Namespaces, Aliases & PSR-4 Autoloading
 */

// Prefer vendor/autoload.php when Composer has run; otherwise use a zero-dependency PSR-4 loader.
$composerAutoload = dirname(__DIR__, 2) . '/vendor/autoload.php';
if (is_file($composerAutoload)) {
    require_once $composerAutoload;
} else {
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
}

use App\Database\Connection as DBConnection;
use App\Utils\Logger;

echo "=== Chapter 11: Namespaces, PSR-4 & Composer ===" . PHP_EOL;

$logger = new Logger();
$db = new DBConnection();

echo $logger->log('PSR-4 autoloader resolved App\\Utils\\Logger.') . PHP_EOL;
echo $db->connect() . PHP_EOL;
