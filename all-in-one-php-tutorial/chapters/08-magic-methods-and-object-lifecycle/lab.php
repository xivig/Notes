<?php

declare(strict_types=1);

/**
 * Chapter 08 Lab: Magic Methods, Object Lifecycle, Stringable & Deep Cloning
 */

class NonStringableBox
{
    public function __construct(public string $label) {}
}

class ResourceSession implements Stringable
{
    /** @var array<string, mixed> */
    private array $attributes = [];

    public function __construct(
        public string $sessionId,
        public NonStringableBox $box,
    ) {
        echo "  [__construct] Session {$this->sessionId} opened." . PHP_EOL;
    }

    public function __destruct()
    {
        echo "  [__destruct]  Session {$this->sessionId} closed." . PHP_EOL;
    }

    public function __toString(): string
    {
        return "Session({$this->sessionId}, box={$this->box->label})";
    }

    public function __get(string $name): mixed
    {
        return $this->attributes[$name] ?? null;
    }

    public function __set(string $name, mixed $value): void
    {
        $this->attributes[$name] = $value;
    }

    public function __isset(string $name): bool
    {
        return isset($this->attributes[$name]);
    }

    public function __call(string $name, array $arguments): string
    {
        return "__call intercepted {$name}(" . implode(', ', $arguments) . ")";
    }

    public static function __callStatic(string $name, array $arguments): string
    {
        return "__callStatic intercepted {$name}(" . implode(', ', $arguments) . ")";
    }

    public function __clone(): void
    {
        // Generate new ID and deep-clone nested mutable object
        $this->sessionId = uniqid('CLONE_', true);
        $this->box = clone $this->box;
    }
}

echo "=== Chapter 08: Magic Methods & Object Lifecycle ===" . PHP_EOL;

// 1. Attempting string conversion without __toString() throws Error in PHP 8+
$plain = new NonStringableBox('Alpha');
try {
    echo (string) $plain;
} catch (Error $e) {
    echo "Expected Error without __toString(): " . $e->getMessage() . PHP_EOL;
}

// 2. Construct, __toString / Stringable, __set / __get, __call / __callStatic
$session = new ResourceSession('SESS_001', $plain);
echo "Stringable output: {$session}" . PHP_EOL;

$session->theme = 'dark';
echo "Dynamic __get('theme'): " . ($session->theme ?? 'none') . PHP_EOL;
echo $session->dispatch('audit', 'user:42') . PHP_EOL;
echo ResourceSession::ping('healthcheck') . PHP_EOL;

// 3. Deep cloning via __clone()
$cloned = clone $session;
$cloned->box->label = 'Beta';
echo "Original box label : {$session->box->label}" . PHP_EOL;
echo "Cloned box label   : {$cloned->box->label}" . PHP_EOL;

// 4. Explicit destruction with unset()
unset($cloned, $session);
echo "End of Chapter 08 script." . PHP_EOL;
