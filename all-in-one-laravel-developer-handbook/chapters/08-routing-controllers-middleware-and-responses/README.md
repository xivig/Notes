# Chapter 08 — Routing, Controllers, Middleware & Demo Project 1 (Agency Site)

Routing maps HTTP verbs and URIs cleanly to controller actions via named routes, Route Model Binding, and central middleware configuration in `bootstrap/app.php`.

---

## 1. Web Routing, Named URLs & Route Model Binding (`routes/web.php`)

```php
<?php

declare(strict_types=1);

use App\Http\Controllers\PageController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// View shortcut for static pages
Route::view('/welcome-info', 'welcome')->name('welcome.info');

// Group routes sharing a controller
Route::controller(PageController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/services', 'services')->name('services');
    Route::get('/contact', 'contact')->name('contact');
});

// Route Model Binding (automatically throws 404 when slug doesn't exist)
Route::get('/posts/{post:slug}', [PostController::class, 'show'])->name('posts.show');

// Full 7-method Resource Controller CRUD mapping
Route::resource('posts', PostController::class);
```

### URL Generation Helpers in Blade
| Helper | Example | When to Use |
| :--- | :--- | :--- |
| `url('/about')` | `<a href="{{ url('/about') }}">` | Only for fixed un-named URLs |
| `URL::to('/about')` | `<a href="{{ URL::to('/about') }}">` | Verbose facade equivalent |
| `route('posts.show', $post)` | `<a href="{{ route('posts.show', $post) }}">` | **Recommended default** — survives URI refactors safely |

---

## 2. Resource Controller Verb Map & Method Spoofing

| HTTP Method | URI | Action | Route Name | HTML Form Spoofing |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/posts` | `index` | `posts.index` | Native `GET` |
| `GET` | `/posts/create` | `create` | `posts.create` | Native `GET` |
| `POST` | `/posts` | `store` | `posts.store` | `<form method="POST">@csrf` |
| `GET` | `/posts/{post}` | `show` | `posts.show` | Native `GET` |
| `GET` | `/posts/{post}/edit` | `edit` | `posts.edit` | Native `GET` |
| `PUT/PATCH` | `/posts/{post}` | `update` | `posts.update` | `@csrf @method('PATCH')` |
| `DELETE` | `/posts/{post}` | `destroy` | `posts.destroy` | `@csrf @method('DELETE')` |

Inspect all registered routes anytime via:
```bash
php artisan route:list --except-vendor
```

*(Production caching rule: keep controller actions mapped as `[Controller::class, 'method']` rather than complex closures so `php artisan route:cache` serializes cleanly!)*

---

## 3. Custom Middleware, Sessions, CSRF & CORS (`bootstrap/app.php`)

```bash
php artisan make:middleware EnsureAccountActive
```

```php
public function handle(Request $request, Closure $next): Response
{
    if ($request->user() && ! $request->user()->is_active) {
        abort(403, 'Account disabled.');
    }

    return $next($request);
}
```

Register middleware aliases inside `bootstrap/app.php`:
```php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'active' => \App\Http\Middleware\EnsureAccountActive::class,
            'admin' => \App\Http\Middleware\AdminMiddleware::class,
        ]);
    })
    ->create();
```

### Session, CSRF & CORS Rules
- Keep `VerifyCsrfToken` active on `web` routes; send `@csrf` in forms and `X-CSRF-TOKEN` header on same-origin JS `fetch()` requests.
- Set `SESSION_SECURE_COOKIE=true`, `httpOnly=true`, `same_site=lax` in HTTPS production.
- Configure explicit frontend origins in `config/cors.php` instead of `*` when sending cookies/credentials across domains — and remember CORS is **not** authentication.

---

## 4. Demo Project 1 — Creative Agency Controller (`PageController.php`)

```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;

final class PageController extends Controller
{
    public function home(): View
    {
        return view('pages.home', [
            'tagline' => 'Crafting High-Speed Laravel Applications',
            'metrics' => [
                ['label' => 'Uptime', 'value' => '99.98%'],
                ['label' => 'Shipped Apps', 'value' => '45+'],
                ['label' => 'Median Latency', 'value' => '18ms'],
            ],
        ]);
    }

    public function services(): View
    {
        $services = [
            ['title' => 'Laravel SaaS Engineering', 'desc' => 'Multi-tenant backends with billing, queues & APIs.'],
            ['title' => 'Livewire & Inertia UI', 'desc' => 'Reactive interfaces powered by Tailwind CSS and Vite.'],
            ['title' => 'Performance Audits', 'desc' => 'N+1 elimination, caching strategies & zero-downtime deploys.'],
        ];

        return view('pages.services', compact('services'));
    }

    public function contact(): View
    {
        return view('pages.contact', ['email' => 'hello@apexstudio.example']);
    }
}
```
