<?php

declare(strict_types=1);

/**
 * Chapter 12 Lab: Service Provider Rebinding (bind vs singleton) & Config Cache Simulation.
 */

final class ConfigRepository
{
    /** @param array<string, mixed> $items */
    public function __construct(private array $items) {}

    public function get(string $dotKey, mixed $default = null): mixed
    {
        $segments = explode('.', $dotKey);
        $cursor = $this->items;
        foreach ($segments as $segment) {
            if (!is_array($cursor) || !array_key_exists($segment, $cursor)) {
                return $default;
            }
            $cursor = $cursor[$segment];
        }
        return $cursor;
    }
}

final class ProviderContainer
{
    /** @var array<string, callable> */
    private array $bindings = [];
    /** @var array<string, object> */
    private array $singletons = [];

    public function bind(string $abstract, callable $factory): void
    {
        unset($this->singletons[$abstract]);
        $this->bindings[$abstract] = static fn (self $c): object => $factory($c);
    }

    public function singleton(string $abstract, callable $factory): void
    {
        $this->bindings[$abstract] = function (self $c) use ($abstract, $factory): object {
            return $this->singletons[$abstract] ??= $factory($c);
        };
    }

    public function make(string $abstract): object
    {
        return ($this->bindings[$abstract])($this);
    }
}

// Simulated Vendor Package Class (NEVER edit vendor/)
class VendorReceiptFormatter
{
    public function __construct(protected string $currency) {}

    public function format(int $cents): string
    {
        return number_format($cents / 100, 2) . ' ' . $this->currency;
    }
}

// Our App Override Class (in app/Services/)
final class CustomVatReceiptFormatter extends VendorReceiptFormatter
{
    #[\Override]
    public function format(int $cents): string
    {
        return parent::format($cents) . ' (incl. VAT)';
    }
}

$app = new ProviderContainer();
$config = new ConfigRepository([
    'billing' => ['currency' => 'EUR'],
]);

// 1. Vendor Service Provider registers default formatter
$app->singleton(
    VendorReceiptFormatter::class,
    static fn (): object => new VendorReceiptFormatter((string) $config->get('billing.currency', 'USD'))
);

/** @var VendorReceiptFormatter $default */
$default = $app->make(VendorReceiptFormatter::class);
echo 'Vendor default: ' . $default->format(4999) . PHP_EOL;

// 2. AppServiceProvider::register() overrides binding cleanly without modifying vendor/
$app->singleton(
    VendorReceiptFormatter::class,
    static fn (): object => new CustomVatReceiptFormatter((string) $config->get('billing.currency', 'USD'))
);

/** @var VendorReceiptFormatter $overriddenA */
$overriddenA = $app->make(VendorReceiptFormatter::class);
/** @var VendorReceiptFormatter $overriddenB */
$overriddenB = $app->make(VendorReceiptFormatter::class);

echo 'Overridden via AppServiceProvider: ' . $overriddenA->format(4999) . PHP_EOL;
echo 'Singleton identity preserved? ' . ($overriddenA === $overriddenB ? 'yes' : 'no') . PHP_EOL;
