# Chapter 14 — Mail, Queues, Events, Caching, `defer()` & Scheduler

Offload slow work asynchronously using **`defer()`**, **Markdown Mail (`Mailable`)**, **Queued Jobs (`ShouldQueue` + Laravel 13 PHP Attributes)**, **Events/Listeners**, **Cache (`remember`, `flexible`, `touch`)**, and **`routes/console.php` Scheduling**.

---

## 1. Quick In-Request Offloading with `defer()` (Laravel 12 / 13)

```php
use function Illuminate\Support\defer;

Route::post('/orders', function (StoreOrderRequest $request) {
    $order = Order::create($request->validated());

    // Runs immediately after the HTTP response flushes — zero separate worker required
    defer(fn () => AuditLog::recordOrder($order->id));

    return to_route('orders.show', $order);
});
```

---

## 2. Markdown Mail (`WelcomeMail.php` + Template)

```bash
php artisan make:mail WelcomeMail --markdown=mail.welcome
```

```php
final class WelcomeMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public readonly User $user) {}

    public function envelope(): Envelope
    {
        return new Envelope(subject: 'Welcome to ' . config('app.name'));
    }

    public function content(): Content
    {
        return new Content(markdown: 'mail.welcome');
    }
}
```
```blade
{{-- resources/views/mail/welcome.blade.php --}}
<x-mail::message>
# Hello {{ $user->name }}

Your account is ready to publish articles.

<x-mail::button :url="route('home')">
Open Dashboard
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
```

---

## 3. Background Jobs (`ShouldQueue`) & Events/Listeners

```php
// app/Jobs/GenerateSitemapJob.php
#[Tries(3)]
#[Timeout(120)]
#[Connection('database')]
final class GenerateSitemapJob implements ShouldQueue
{
    use Queueable;

    public function handle(): void
    {
        $slugs = Post::published()->pluck('slug');
        $xml = view('seo.sitemap', compact('slugs'))->render();
        Storage::disk('public')->put('sitemap.xml', $xml);
    }
}

// Dispatch onto queue:
GenerateSitemapJob::dispatch();
```
- **VPS / Container worker**: `php artisan queue:work --tries=3 --timeout=120` under Supervisor or Docker.
- **cPanel / Shared hosting cron worker**: `php artisan queue:work --stop-when-empty` invoked via cron.
- **Inspect failed jobs**: `php artisan queue:failed` and retry with `php artisan queue:retry all`.

---

## 4. Caching (`remember`, `flexible`, `touch`) & Scheduler (`routes/console.php`)

```php
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schedule;

// Cache-aside (10 minutes)
$stats = Cache::remember('homepage.stats', now()->addMinutes(10), fn () => [
    'published_posts' => Post::published()->count(),
]);

// Stale-while-revalidate (fresh 5 min, background refresh 5..10 min)
$feed = Cache::flexible('posts.feed', [300, 600], fn () => Post::published()->take(10)->get());

// Laravel 13: extend TTL without loading payload
Cache::touch('user.prefs.' . $user->id, now()->addHours(2));

// Invalidate stale keys cleanly inside Model Observer / Action:
Cache::forget('homepage.stats');

// Cron schedules inside routes/console.php
Schedule::command('reports:daily')->dailyAt('02:00')->withoutOverlapping();
Schedule::job(new GenerateSitemapJob())->hourly()->withoutOverlapping();
```
Server cron entry:
```cron
* * * * * cd /path/to/laravel-app && php artisan schedule:run >> /dev/null 2>&1
```

---

## 5. Multi-Channel Notifications & Custom Artisan Commands

### A. Multi-Channel Notification (`php artisan make:notification PostPublishedNotification`)
Send email + in-app `notifications` table alerts cleanly in one class (run `php artisan make:notifications-table && php artisan migrate` for DB storage):
```php
final class PostPublishedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public readonly Post $post) {}

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Published: ' . $this->post->title)
            ->action('Read Post', route('posts.show', $this->post));
    }

    public function toArray(object $notifiable): array
    {
        return ['post_id' => $this->post->id, 'title' => $this->post->title];
    }
}

// Dispatch & read unread feed:
$user->notify(new PostPublishedNotification($post));
$unread = $user->unreadNotifications;
```

### B. Custom Artisan Console Command (`php artisan make:command PruneDraftsCommand`)
```php
final class PruneDraftsCommand extends Command
{
    protected $signature = 'posts:prune {--days=30 : Delete drafts older than N days} {--dry-run}';
    protected $description = 'Prune stale unpublished drafts';

    public function handle(): int
    {
        $cutoff = now()->subDays((int) $this->option('days'));
        $query = Post::where('status', 'draft')->where('updated_at', '<', $cutoff);

        if ($this->option('dry-run')) {
            $this->info('Would prune: ' . $query->count() . ' drafts.');
            return self::SUCCESS;
        }

        $deleted = $query->delete();
        $this->info("Pruned {$deleted} stale drafts.");
        return self::SUCCESS;
    }
}
```
