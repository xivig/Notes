# Chapter 14 — Queues, Jobs, Events, Caching, `defer()` & Scheduler

Production Laravel apps never make users wait 5 seconds on an HTTP request while sending emails, resizing images, calling AI models, or generating PDFs. Instead, offload slow work using **`defer()`**, **Queues (`ShouldQueue`)**, **Events**, **Cache**, and **Scheduled Tasks**.

---

## 1. Quick In-Request Offloading with `defer()` (Laravel 12 / 13)

Need to run lightweight work (analytics ping, audit log, webhook notification) right after the HTTP response flushes — **without** configuring a background worker yet? Use `defer()`:

```php
use function Illuminate\Support\defer;

Route::post('/orders', function (StoreOrderRequest $request) {
    $order = Order::create($request->validated());

    defer(fn () => Metrics::recordOrder($order->id));

    return to_route('orders.show', $order);
});
```

For heavy, retryable work (mail, PDF generation, third-party billing webhooks), always use **Queued Jobs** instead.

---

## 2. Background Jobs (`ShouldQueue`) & Laravel 13 Job Attributes

Generate a queued job:
```bash
php artisan make:job SendWelcomePackJob
```

```php
<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\Attributes\Tries;
use Illuminate\Queue\Attributes\Timeout;

#[Tries(3)]
#[Timeout(60)]
final class SendWelcomePackJob implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public readonly User $user, // SerializesModels stores User PK cleanly!
    ) {}

    public function handle(Mailer $mailer): void
    {
        $mailer->sendWelcome($this->user);
    }
}
```

Dispatch & run the queue worker:
```php
SendWelcomePackJob::dispatch($user);
```
```bash
php artisan queue:work --tries=3
```
*(In fresh Laravel apps, the default `QUEUE_CONNECTION=database` already works locally with zero Redis setup!)*

---

## 3. Decoupling Domains with Events & Listeners

Events keep controllers/Actions focused on one thing:

```php
// 1. Dispatch an Event after checkout:
OrderPaid::dispatch($order);

// 2. Listener automatically discovered by type-hint in app/Listeners/:
final class ProvisionLicenseListener implements ShouldQueue
{
    public function handle(OrderPaid $event): void
    {
        // Provisions license asynchronously because Listener implements ShouldQueue!
    }
}
```
Notice how adding `implements ShouldQueue` on a Listener pushes that listener onto the queue automatically without altering `OrderController`.

---

## 4. Caching (`Cache::remember`, `flexible`, & Laravel 13 `Cache::touch`)

Stop re-running expensive dashboard aggregations on every page view:

```php
use Illuminate\Support\Facades\Cache;

// Cache-Aside Pattern: compute once, store for 10 minutes
$stats = Cache::remember('dashboard.stats', now()->addMinutes(10), function () {
    return [
        'published_posts' => Post::published()->count(),
        'active_users' => User::whereNotNull('email_verified_at')->count(),
    ];
});

// Stale-While-Revalidate (Cache::flexible): serve stale data 5..10 min while refreshing after response!
$feed = Cache::flexible('blog.featured', [300, 600], fn () => Post::published()->take(5)->get());

// Laravel 13: extend TTL of a cached key (without reading/overwriting payload!)
Cache::touch('user.session.prefs.' . $user->id, now()->addHours(2));
```

Always remember to **invalidate** caches (`Cache::forget('dashboard.stats')`) inside a Model Observer or Service when underlying records change.

---

## 5. Task Scheduling (`routes/console.php`)

In Laravel 11/12/13, cron schedules live directly in `routes/console.php`:

```php
use Illuminate\Support\Facades\Schedule;

Schedule::command('model:prune')->dailyAt('02:30');
Schedule::job(new CleanupTempExportsJob())->hourly()->withoutOverlapping();
```

On your production server, register ONE cron entry:
```cron
* * * * * cd /var/www/app && php artisan schedule:run >> /dev/null 2>&1
```

---

## Key Takeaways
- Use `defer()` for tiny post-response tasks and `ShouldQueue` Jobs/Listeners for retryable, slow, or external API work.
- Pair `Cache::remember()` or `Cache::flexible()` with explicit cache invalidation on writes.
- Manage all cron jobs cleanly inside `routes/console.php` via `Schedule::`.
