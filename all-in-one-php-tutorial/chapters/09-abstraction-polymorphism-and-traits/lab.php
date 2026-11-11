<?php

declare(strict_types=1);

/**
 * Chapter 09 Lab: Abstract Classes, Interfaces, Polymorphism & Traits
 */

trait TimestampedLog
{
    public function log(string $message): void
    {
        echo "[LOG " . date('H:i:s') . "] {$message}" . PHP_EOL;
    }
}

interface PaymentMethod
{
    public function pay(int $amountCents): string;
}

abstract class BasePaymentGateway implements PaymentMethod
{
    use TimestampedLog;

    public function __construct(protected string $merchantId) {}

    abstract protected function providerName(): string;

    public function receiptLine(int $amountCents): string
    {
        $dollars = number_format($amountCents / 100, 2);
        return "{$this->providerName()} (merchant={$this->merchantId}) charged \${$dollars}";
    }
}

final class CardGateway extends BasePaymentGateway
{
    public function pay(int $amountCents): string
    {
        $this->log("Authorizing card payment...");
        return $this->receiptLine($amountCents);
    }

    protected function providerName(): string
    {
        return 'CreditCard';
    }
}

final class UpiGateway extends BasePaymentGateway
{
    public function pay(int $amountCents): string
    {
        $this->log("Verifying instant UPI transfer...");
        return $this->receiptLine($amountCents);
    }

    protected function providerName(): string
    {
        return 'UPI';
    }
}

function processOrderPayment(PaymentMethod $method, int $amountCents): void
{
    echo "  -> " . $method->pay($amountCents) . PHP_EOL;
}

echo "=== Chapter 09: Abstraction, Polymorphism & Traits ===" . PHP_EOL;
processOrderPayment(new CardGateway('M_101'), 4999);
processOrderPayment(new UpiGateway('M_202'), 1500);
