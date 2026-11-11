<?php

declare(strict_types=1);

/**
 * Chapter 02 Lab: Inheritance, Late Static Binding (static::), Magic Attributes & Cloning.
 */

abstract class MiniModel
{
    protected static string $table = 'base';

    /** @var array<string, mixed> */
    protected array $attributes = [];

    /** @var array<string, bool> */
    protected array $dirty = [];

    /** @param array<string, mixed> $attributes */
    public function __construct(array $attributes = [])
    {
        $this->attributes = $attributes;
    }

    public static function tableName(): string
    {
        return static::$table;
    }

    /** @param array<string, mixed> $attributes */
    public static function create(array $attributes): static
    {
        return new static($attributes);
    }

    public function __get(string $key): mixed
    {
        return $this->attributes[$key] ?? null;
    }

    public function __set(string $key, mixed $value): void
    {
        $this->attributes[$key] = $value;
        $this->dirty[$key] = true;
    }

    public function __isset(string $key): bool
    {
        return isset($this->attributes[$key]);
    }

    public function isDirty(?string $key = null): bool
    {
        return $key === null ? $this->dirty !== [] : ($this->dirty[$key] ?? false);
    }

    public function __toString(): string
    {
        return json_encode([
            'table' => static::tableName(),
            'attributes' => $this->attributes,
        ], JSON_THROW_ON_ERROR);
    }
}

class AuthenticatableBase extends MiniModel
{
    public function canLogin(): bool
    {
        return (bool) ($this->attributes['is_active'] ?? true);
    }
}

use AuthenticatableBase as Authenticatable;

final class UserModel extends Authenticatable
{
    protected static string $table = 'users';
}

$user = UserModel::create([
    'name' => 'Linus',
    'email' => 'linus@example.com',
    'is_active' => true,
]);

echo 'Table resolved via LSB: ' . UserModel::tableName() . PHP_EOL;
echo 'Can login (inherited): ' . ($user->canLogin() ? 'yes' : 'no') . PHP_EOL;
echo 'Magic isset($user->email): ' . (isset($user->email) ? 'true' : 'false') . PHP_EOL;

$user->name = 'Linus Torvalds';
echo 'Is name dirty? ' . ($user->isDirty('name') ? 'yes' : 'no') . PHP_EOL;
echo 'Stringified model: ' . $user . PHP_EOL;

// Cloning creates an independent handle
$copy = clone $user;
$copy->name = 'Cloned User';
echo 'Original remains: ' . $user->name . ' | Copy is: ' . $copy->name . PHP_EOL;
