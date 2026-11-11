# Chapter 06 — Composer PSR-4, Service Container Auto-Wiring & Facades

Understanding **how Laravel wires classes together automatically** removes almost all framework "magic." Every route controller constructor injection, Service Provider binding, and `Route::get(...)` / `Cache::remember(...)` Facade call is powered by three plain-PHP pillars: **PSR-4 autoloading**, **Reflection-based Dependency Injection**, and **`__callStatic` Facade proxies**.

---

## 1. Composer PSR-4 Autoloading & Auto-Discovery

Open `composer.json` in any Laravel application:

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "app/",
            "Database\\Factories\\": "database/factories/",
            "Database\\Seeders\\": "database/seeders/"
        }
    }
}
```

### How Class Paths Resolve Automatically
Because `"App\\"` maps directly to `app/`, PHP's Composer autoloader maps namespace segments 1-to-1 with folders and `.php` filenames:
- `App\Models\Post` -> `app/Models/Post.php`
- `App\Http\Requests\StoreTaskRequest` -> `app/Http/Requests/StoreTaskRequest.php`

### Package Auto-Discovery (`extra.laravel`)
When you run `composer require spatie/laravel-permission`, Laravel reads the package's `composer.json` during `composer dump-autoload` (via `php artisan package:discover`):

```json
"extra": {
    "laravel": {
        "providers": [
            "Spatie\\Permission\\PermissionServiceProvider"
        ]
    }
}
```
Laravel registers those providers automatically — zero manual editing in config files needed.

---

## 2. Static Methods vs Service Container Auto-Wiring

Many beginners confuse `Route::get(...)` with plain static utility methods. Here is the key architectural distinction:

### Static Utilities vs Dependency Injection (DI)
- **Stateless Utility**: `TaxCalculator::rate()` — takes inputs, returns value, holds no dependencies. Hard-calling static methods from inside services makes swapping implementations during tests hard.
- **Container Auto-Wiring (DI)**: When you type-hint a dependency in a controller constructor or route method:

```php
final class CheckoutController extends Controller
{
    public function __construct(
        private readonly PaymentGatewayInterface $gateway,
    ) {}
}
```

Laravel does NOT literally run `new CheckoutController()`. Instead, its **Service Container** uses PHP's `ReflectionClass`:
1. Inspects `__construct(...)` parameters.
2. Sees `PaymentGatewayInterface` -> looks up any bound concrete class (e.g., `StripeGateway`), or recursively instantiates concrete classes like `OrderMailer`.
3. Checks `StripeGateway`'s own constructor, resolves *its* dependencies (zero-config **auto-wiring**), and passes the graph into `new CheckoutController($gateway)`.

---

## 3. How Laravel Facades Work (`__callStatic` + Container)

Look inside `Illuminate\Support\Facades\Cache` or `Route`: they do NOT contain static business logic! Every Facade is a thin static proxy implementing `getFacadeAccessor()`:

```php
// Conceptual flow when you call Cache::get('home_stats'):
// 1. __callStatic('get', ['home_stats']) runs on Facade base class.
// 2. Resolves container instance: app()->make(static::getFacadeAccessor()) -> CacheManager
// 3. Invokes $instance->get('home_stats').
// 4. Bonus: In tests, Cache::shouldReceive('get') swaps the container instance cleanly!
```

That is why Facades give you **clean syntax** (`Mail::to(...)`, `Queue::fake()`) **without sacrificing testability**.

---

## Key Takeaways
- Match namespaces and directory paths strictly under `app/` so Composer's PSR-4 autoloader never misses a class.
- Prefer constructor Dependency Injection (`__construct(private readonly Service $svc)`) for application services so classes remain decoupled and easy to mock or swap.
- Remember that Laravel Facades are **Container-backed `__callStatic` proxies**, which is why `Queue::fake()`, `Http::fake()`, and `Mail::fake()` work seamlessly in tests.

## Try It Locally
Run our working **mini Laravel Service Container (Reflection Auto-Wiring) + Facade Proxy** in pure PHP:
```bash
php chapters/06-composer-psr4-container-autowiring-and-facades/lab.php
```
