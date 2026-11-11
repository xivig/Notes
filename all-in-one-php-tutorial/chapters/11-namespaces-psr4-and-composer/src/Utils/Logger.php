<?php

declare(strict_types=1);

namespace App\Utils;

final class Logger
{
    public function log(string $message): string
    {
        return '[' . self::class . '] ' . $message;
    }
}
