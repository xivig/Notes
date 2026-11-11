<?php

declare(strict_types=1);

/**
 * Chapter 12 Lab: Promoted Constructors, Union/Intersection/DNF Types, Enums & Typed Constants
 */

interface Loggable
{
    public function log(string $msg): string;
}

interface Connectable
{
    public function connect(): string;
}

interface ConfigContract
{
    // PHP 8.3+ Typed Interface Constant
    public const string APP_NAME = 'Xivig PHP Platform';
}

final readonly class PromotedUser implements ConfigContract
{
    public const int MAX_SESSIONS = 5;

    public function __construct(
        public string $name,
        private int $age,
        public string $role = 'Member',
    ) {}

    public function summary(): string
    {
        return "{$this->name} (age={$this->age}, role={$this->role})";
    }
}

enum UserRole: string
{
    case Admin  = 'administrator';
    case Editor = 'content_editor';
    case Viewer = 'read_only_viewer';

    public function label(): string
    {
        return match ($this) {
            self::Admin  => 'Full administrative permissions',
            self::Editor => 'Can edit and publish content',
            self::Viewer => 'Read-only access',
        };
    }
}

final class DiagnosticService implements Loggable, Connectable
{
    public function connect(): string
    {
        return '[DB] Connected';
    }

    public function log(string $msg): string
    {
        return "[LOG] {$msg}";
    }
}

function formatIdentifier(string|int $id): string
{
    return 'ID-' . (string) $id;
}

function runOptionalCheck((Loggable & Connectable) | null $service): string
{
    if ($service === null) {
        return 'No diagnostic service supplied.';
    }
    return $service->connect() . ' | ' . $service->log('Diagnostic passed');
}

echo "=== Chapter 12: Modern PHP 8 Type System & Enums ===" . PHP_EOL;

$user = new PromotedUser('Alice', 28);
echo PromotedUser::APP_NAME . " | " . $user->summary() . " | MaxSessions=" . PromotedUser::MAX_SESSIONS . PHP_EOL;

$role = UserRole::Editor;
echo "Enum => name={$role->name}, value={$role->value}, desc={$role->label()}" . PHP_EOL;
echo "tryFrom('unknown') => " . var_export(UserRole::tryFrom('unknown'), true) . PHP_EOL;

echo formatIdentifier(1024) . ' | ' . formatIdentifier('USR_99') . PHP_EOL;
echo runOptionalCheck(null) . PHP_EOL;
echo runOptionalCheck(new DiagnosticService()) . PHP_EOL;
