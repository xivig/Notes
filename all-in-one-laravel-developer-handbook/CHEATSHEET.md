# Laravel Developer Cheatsheet (Laravel 12/13 & PHP 8.3–8.5)

Fast daily reference covering Artisan CLI, Modern PHP syntax, Blade components, Faker/Eloquent, Multi-Guard Auth, Composer/Vite, Caching, Testing, and Production Server Operations.

---

## 1. Project Setup, Diagnostics & Artisan Generators

```bash
# Project creation, unified dev loop & diagnostics
php -v && composer -V && node -v && npm -v
laravel new my-app                                 # Livewire / React / Vue / WorkOS
composer create-project laravel/laravel my-app     # Alternative Composer install
composer run dev                                   # HTTP + Queue + Pail Logs + Vite
php artisan install:api                            # Sanctum + routes/api.php
php artisan install:broadcasting                   # Laravel Reverb WebSockets
php artisan storage:link                           # public/storage -> storage/app/public
php artisan about                                  # PHP, drivers, debug & cache status
php artisan tinker                                 # Interactive app REPL
php artisan pail                                   # Live colorized log stream

# Code generators
php artisan make:model Post -mfsc                  # Model + Migration + Factory + Seeder + Controller
php artisan make:controller Admin/PostController --resource --model=Post
php artisan make:request StorePostRequest
php artisan make:policy PostPolicy --model=Post
php artisan make:resource PostResource
php artisan make:middleware AdminMiddleware
php artisan make:view admin.dashboard
php artisan make:component Alert                   # Class + Blade view
php artisan make:component forms.input --view      # Anonymous Blade-only component
php artisan make:component AlertBox --inline       # Inline PHP class component
php artisan make:mail WelcomeMail --markdown=mail.welcome
php artisan make:job ProcessInvoiceJob
php artisan make:test PostCrudTest
```

---

## 2. Database, Migrations, Faker & Eloquent Performance

```bash
php artisan migrate:status                         # Inspect applied vs pending batches
php artisan migrate                                # Run pending migrations
php artisan migrate --pretend                      # Preview SQL without executing
php artisan migrate:rollback                       # Roll back last migration batch
php artisan db:seed --class=AdminSeeder            # Seed baseline admin/roles safely
php artisan migrate:fresh --seed                   # DEV ONLY: drops ALL tables first!
```

```php
// Model mass assignment, Laravel 13 casts, and Faker factory helpers
protected $fillable = ['user_id', 'title', 'slug', 'status'];
protected function casts(): array {
    return ['status' => Status::class, 'published_at' => 'datetime'];
}

// Factory with Faker + deterministic Sequence + relation recycling
Post::factory()
    ->count(20)
    ->recycle($users)
    ->sequence(['is_published' => true], ['is_published' => false])
    ->create();

// Eager loading (prevents N+1) + dev guard in AppServiceProvider::boot()
$posts = Post::with(['author:id,name', 'tags:id,name'])->latest()->paginate(15);
Model::preventLazyLoading(! app()->isProduction());
```

---

## 3. Streamlined `bootstrap/app.php` Hooks (Laravel 11–13)

```php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias(['admin' => \App\Http\Middleware\AdminMiddleware::class]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(fn (DomainException $e, Request $r) =>
            $r->expectsJson() ? response()->json(['error' => $e->getMessage()], 422) : null
        );
    })
    ->create();
```

---

## 4. Modern PHP 8.3–8.5 Primitives Used in Laravel

```php
declare(strict_types=1);

$avatar = Auth::user()?->profile?->avatar ?? '/default.png';

final readonly class CreateTaskDto {
    public function __construct(public string $title, public bool $urgent = false) {}
}

enum Status: string {
    case Draft = 'draft';
    case Live = 'live';
    public function color(): string {
        return match ($this) { self::Draft => 'slate', self::Live => 'emerald' };
    }
}

$clean = Arr::only($payload, ['title', 'slug']);
$slug = Str::of($title)->trim()->slug();
```

---

## 5. Authorization, Multi-Guard Sessions & Blade Safety

```php
// Policy + validated FormRequest update
public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
{
    Gate::authorize('update', $task);
    $task->update($request->validated());
    return to_route('tasks.index')->with('success', 'Saved!');
}

// Hardened admin login / logout session hygiene
Auth::guard('admin')->attempt($credentials);
$request->session()->regenerate();
Auth::guard('admin')->logout();
$request->session()->invalidate();
$request->session()->regenerateToken();
```

```blade
<x-forms.input name="title" :$defaultTitle />
<form action="{{ route('posts.update', $post) }}" method="POST">
    @csrf
    @method('PATCH')
    <input name="title" value="{{ old('title', $post->title) }}">
    @error('title') <span>{{ $message }}</span> @enderror
</form>

@forelse ($posts as $post)
    <tr>
        <td>{{ $posts->firstItem() + $loop->index }}</td>
        <td>{{ $post->created_at?->diffForHumans() }}</td>
    </tr>
@empty
    <tr><td colspan="2">No posts yet.</td></tr>
@endforelse
{{ $posts->links() }}
```

---

## 6. Queues, Caching, `defer()` & Pest Testing

```php
defer(fn () => AuditLog::record('login'));                 // Run after HTTP response sends
SendInvoiceJob::dispatch($order);                          // Background ShouldQueue job
$stats = Cache::remember('stats', 600, fn () => ...);      // Cache-aside (10 min)
Cache::touch('key', now()->addHour());                     // Laravel 13 TTL refresh

// Pest test quick pattern
it('forbids strangers', function () {
    $this->actingAs(User::factory()->create())
        ->delete(route('tasks.destroy', Task::factory()->create()))
        ->assertForbidden();
});
```

---

## 7. Composer, Vite, Diagnostics & Production Deployment

```bash
# Local inspection & dependency hygiene
composer validate && composer audit
php artisan route:list --except-vendor
php artisan queue:failed
php artisan vendor:publish --list

# Release build, Sail, observability & cache lifecycle
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan optimize               # Caches config, routes, events & views
./vendor/bin/sail up -d            # Start Docker PHP + DB + Redis + Mailpit
# Local reset:
php artisan optimize:clear
```

---

## 8. Advanced Ecosystem Quick Reference

```php
// Polymorphic relation & streaming chunks without OOM
$table->morphs('commentable');
Post::published()->chunkById(200, fn ($posts) => /* ... */);
Wallet::whereKey($id)->lockForUpdate()->firstOrFail();

// Custom API rate limiter (AppServiceProvider::boot)
RateLimiter::for('api', fn (Request $r) => Limit::perMinute(120)->by($r->user()?->id ?: $r->ip()));

// Multi-channel Notification, i18n, Livewire & Echo
$user->notify(new PostPublishedNotification($post));
__('Welcome back, :name', ['name' => $user->name]);
```
