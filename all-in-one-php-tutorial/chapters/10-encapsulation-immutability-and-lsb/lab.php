<?php

declare(strict_types=1);

/**
 * Chapter 10 Lab: Encapsulation, Final, Readonly Classes & Late Static Binding
 */

// 1. Immutable Value Object using final readonly class (PHP 8.2+)
final readonly class AppConfig
{
    public function __construct(
        public string $env,
        public string $dbHost,
        public int $dbPort = 3306,
    ) {}
}

// 2. Encapsulation & final method
class Account
{
    private int $balanceCents = 0;

    public function __construct(
        public readonly string $accountId,
        protected string $ownerName,
    ) {}

    final public function deposit(int $cents): void
    {
        if ($cents <= 0) {
            throw new InvalidArgumentException('Deposit must be positive.');
        }
        $this->balanceCents += $cents;
    }

    public function getBalanceCents(): int
    {
        return $this->balanceCents;
    }
}

// 3. Late Static Binding: self:: vs static::
class BaseModel
{
    protected static string $table = 'base_records';

    public static function getSelfTable(): string
    {
        return self::$table; // Bound to BaseModel at compile time
    }

    public static function getStaticTable(): string
    {
        return static::$table; // Bound to runtime caller class
    }
}

final class OrderModel extends BaseModel
{
    protected static string $table = 'orders';
}

echo "=== Chapter 10: Encapsulation, Immutability & LSB ===" . PHP_EOL;

$config = new AppConfig('production', '127.0.0.1');
echo "Config: env={$config->env}, db={$config->dbHost}:{$config->dbPort}" . PHP_EOL;

$account = new Account('ACC-100', 'Asha');
$account->deposit(2500);
echo "Account {$account->accountId} balance: " . $account->getBalanceCents() . " cents" . PHP_EOL;

echo "BaseModel::getSelfTable()   : " . BaseModel::getSelfTable() . PHP_EOL;
echo "OrderModel::getSelfTable()  : " . OrderModel::getSelfTable() . PHP_EOL;
echo "OrderModel::getStaticTable(): " . OrderModel::getStaticTable() . PHP_EOL;
