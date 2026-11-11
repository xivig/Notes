# Laravel Developer Cheatsheet (Laravel 12/13 & PHP 8.3–8.5)

Fast daily reference covering Artisan CLI, Modern PHP syntax, Routing, Eloquent, Validation, Policies, Caching, Testing, and Deployment.

---

## 1. Artisan CLI & Scaffolding

```bash
# Project creation & dev loop
laravel new my-app                   # Interactive installer (Livewire / React / Vue / WorkOS)
composer run dev                     # Start HTTP server + Queue + Pail logs + Vite together
php artisan install:api              # Install Sanctum & routes/api.php
php artisan install:broadcasting     # Install Laravel Reverb WebSockets

# Generators
php artisan make:model Post -mfsc    # Model + Migration + Factory + Seeder + Controller
php artisan make:request StorePostRequest
php artisan make:policy PostPolicy --model=Post
php artisan make:resource PostResource
php artisan make:job ProcessInvoiceJob
php artisan make:test PostCrudTest   # Pest/PHPUnit feature test

# Database & Inspection
php artisan migrate                  # Run pending migrations
php artisan migrate:fresh --seed     # Drop all tables, re-migrate & seed
php artisan route:list --except-vendor
php artisan tinker                   # Interactive app REPL
php artisan vendor:publish --list    # List publishable package assets/configs
```

---

## 2. Streamlined `bootstrap/app.php` Hooks (Laravel 11–13)

```php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias(['team' => \App\Http\Middleware\EnsureTeam::class]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(fn (DomainException $e, Request $r) =>
            $r->expectsJson() ? response()->json(['error' => $e->getMessage()], 422) : null
        );
    })
    ->create();
```

---

## 3. Modern PHP Primitives Used in Laravel

```php
declare(strict_types=1);

// Nullsafe + null coalescing
$avatar = Auth::user()?->profile?->avatar ?? '/default.png';

// Readonly DTO + constructor promotion
final readonly class CreateTaskDto {
    public function __construct(public string $title, public bool $urgent = false) {}
}

// Backed Enum + strict match
enum Status: string {
    case Draft = 'draft';
    case Live = 'live';
    public function color(): string {
        return match ($this) { self::Draft => 'slate', self::Live => 'emerald' };
    }
}

// Array & String helpers
$clean = Arr::only($payload, ['title', 'slug']);
$slug = Str::of($title)->trim()->slug();
```

---

## 4. Eloquent ORM & Performance Must-Knows

```php
// Model definition
protected $fillable = ['user_id', 'title', 'slug', 'status'];
protected function casts(): array {
    return ['status' => Status::class, 'published_at' => 'datetime'];
}

// Eager loading (prevents N+1)
$posts = Post::with(['author:id,name', 'tags:id,name'])->latest()->paginate(15);

// Prevent accidental lazy loading outside production (in AppServiceProvider::boot)
Model::preventLazyLoading(! app()->isProduction());
```

---

## 5. Authorization, Validation & Blade Safety

```php
// Controller
public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
{
    Gate::authorize('update', $task);
    $task->update($request->validated());
    return to_route('tasks.index')->with('success', 'Saved!');
}
```

```blade
<form action="{{ route('tasks.update', $task) }}" method="POST">
    @csrf
    @method('PATCH')
    <input name="title" value="{{ old('title', $task->title) }}">
    @error('title') <span>{{ $message }}</span> @enderror
</form>
```

---

## 6. Queues, Caching, `defer()` & Testing

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

## 7. Production Deployment Commands

```bash
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan optimize          # Caches config, routes, events & views
# Local reset:
php artisan optimize:clear
```
