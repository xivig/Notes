# Chapter 12 — Overriding Packages, Service Providers & Configuration

**Golden Rule of Laravel:** NEVER edit files inside `vendor/` directly — `composer update` will immediately wipe out your changes! Instead, Laravel offers three clean extension seams: **Container Rebinding (`AppServiceProvider`)**, **Configuration & View Publishing (`vendor:publish`)**, and **Inheritance Overrides**.

---

## 1. Service Providers: `register()` vs `boot()`

Open `app/Providers/AppServiceProvider.php`:

```php
final class AppServiceProvider extends ServiceProvider
{
    // Phase 1: ONLY bind interfaces/services into the Service Container.
    // Do NOT resolve other services, routes, or DB models here!
    public function register(): void
    {
        $this->app->bind(
            \VendorPackage\Contracts\InvoiceFormatter::class,
            \App\Services\CustomInvoiceFormatter::class
        );
    }

    // Phase 2: All providers are registered; safe to configure Eloquent, Gates, Macros, Views.
    public function boot(): void
    {
        Model::shouldBeStrict(! app()->isProduction());
    }
}
```

### Container Binding Lifecycles
| Method | Behavior | Typical Use Case |
| :--- | :--- | :--- |
| `$this->app->bind(A::class, B::class)` | Creates a **fresh instance** every time `A` is resolved | Stateful per-operation helpers, Actions |
| `$this->app->singleton(A::class, B::class)` | Creates **one shared instance** per request lifecycle | API SDK clients, payment gateways, registries |
| `$this->app->scoped(A::class, B::class)` | Shared during one HTTP request/Octane tick, then flushed | Request-tenant context (safe for **Laravel Octane**!) |

---

## 2. Overriding Third-Party Behavior Cleanly

Suppose a package binds `VendorPackage\ReceiptGenerator` as a concrete class or contract, and you want custom tax logic without touching `vendor/`:

### Approach A: Extend & Rebind in `AppServiceProvider::register()`
```php
// app/Services/CustomReceiptGenerator.php
final class CustomReceiptGenerator extends \VendorPackage\ReceiptGenerator
{
    #[\Override]
    public function formatTotal(int $cents): string
    {
        return 'Total (incl. VAT): ' . parent::formatTotal($cents);
    }
}

// In AppServiceProvider::register():
$this->app->bind(
    \VendorPackage\ReceiptGenerator::class,
    \App\Services\CustomReceiptGenerator::class
);
```
Because the package resolves `ReceiptGenerator` through Laravel's Service Container (`app(ReceiptGenerator::class)` or constructor DI), your subclass runs everywhere automatically!

### Approach B: Publish Package Views, Configs & Migrations
Want to redesign an authentication email or pagination view shipped by a package?

```bash
# Inspect all publishable tags registered by installed packages:
php artisan vendor:publish --list

# Copy package config or Blade views safely into config/ or resources/views/vendor/:
php artisan vendor:publish --tag=laravel-mail
```
Laravel always checks `resources/views/vendor/{package}/...` **before** falling back to `vendor/{package}/resources/views/...`.

---

## 3. `.env` vs `config()` & the Production `env()` Rule

> [!CAUTION]
> **NEVER call `env('MY_KEY')` outside files inside `config/*.php`!**
> Once you run `php artisan config:cache` in production, Laravel merges all config files into one cached PHP array and **stops reading `.env` files** — so any `env()` call inside a controller or service returns `null`!

Always map environment variables cleanly inside `config/services.php` (or a custom `config/billing.php`) and read them via `config()`:

```php
// config/billing.php
return [
    'stripe_key' => env('STRIPE_KEY'),
    'currency' => env('BILLING_CURRENCY', 'USD'),
];

// Anywhere in controllers, services, or Blade:
$currency = config('billing.currency');
```

---

## Key Takeaways
- Put Container bindings in `register()` and runtime framework hooks (`Model::shouldBeStrict()`, Gates, View composers) in `boot()`.
- Prefer `scoped()` over `singleton()` for request-specific state if you ever deploy with **Laravel Octane**.
- Always read config values through `config('file.key')`, never direct `env()` calls inside application code.

## Try It Locally
Run our Container Rebinding & Config Override lab:
```bash
php chapters/12-overriding-packages-service-providers-and-configuration/lab.php
```
