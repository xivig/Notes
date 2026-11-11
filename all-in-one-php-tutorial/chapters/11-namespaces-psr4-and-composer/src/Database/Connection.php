<?php

declare(strict_types=1);

namespace App\Database;

final class Connection
{
    public function connect(): string
    {
        return '[' . self::class . '] Connected successfully.';
    }
}
