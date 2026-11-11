# Chapter 08 — Routing, Controllers, Middleware & Demo Project 1

Routing maps incoming HTTP verbs and URIs (`GET /services`, `POST /tasks`) to closures or controller methods, passing them cleanly through HTTP middleware defined in `bootstrap/app.php`.

---

## 1. Essential Route Definitions (`routes/web.php`)

```php
<?php

declare(strict_types=1);

use App\Http\Controllers\PageController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

// Single-method controller actions
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');

// Route Model Binding: Laravel automatically fetches the Post matching {post:slug} or throws 404
Route::get('/blog/{post:slug}', [PostController::class, 'show'])->name('blog.show');

// Group routes sharing middleware or URL prefixes
Route::middleware('auth')->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', fn () => view('dashboard'))->name('index');
});
```

### Route Caching Rule in Production
Avoid putting complex logic inside route closures if you run `php artisan route:cache`: Laravel serializes route tables for blazing speed, and **controller routes (`[Controller::class, 'method']`) serialize cleanly**, whereas unserializable dependencies fail.

---

## 2. Resource Controllers & Clean Method Visibility

A **Resource Controller** wires all 7 standard CRUD endpoints in one line:

```bash
php artisan make:controller TaskController --resource
```

```php
Route::resource('tasks', TaskController::class);
```

| HTTP Method | URI | Action | Route Name |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | `index` | `tasks.index` |
| `GET` | `/tasks/create` | `create` | `tasks.create` |
| `POST` | `/tasks` | `store` | `tasks.store` |
| `GET` | `/tasks/{task}` | `show` | `tasks.show` |
| `GET` | `/tasks/{task}/edit` | `edit` | `tasks.edit` |
| `PUT/PATCH` | `/tasks/{task}` | `update` | `tasks.update` |
| `DELETE` | `/tasks/{task}` | `destroy` | `tasks.destroy` |

Remember from **Chapter 03**: route action methods (`index`, `store`, `destroy`) MUST remain `public`, while internal formatting helpers inside the controller should stay `protected` or `private` (or move into a Trait / Action class).

---

## 3. Registering Middleware in `bootstrap/app.php`

Instead of editing legacy `Kernel.php`, configure aliases and global/group middleware inside `bootstrap/app.php`:

```php
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up', // Built-in health endpoint since Laravel 11+
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'verified.team' => \App\Http\Middleware\EnsureTeamVerified::class,
        ]);
    })
    ->create();
```

---

## 4. Demo Project 1 — Creative Agency Multi-Page Site

Let's build a clean **Agency Landing & Portfolio Application** using MVC separation without database boilerplate yet.

### Step 1: Controller (`app/Http/Controllers/PageController.php`)
Run: `php artisan make:controller PageController`

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
            ['title' => 'Laravel SaaS Engineering', 'desc' => 'Multi-tenant backends with billing, queues, and APIs.'],
            ['title' => 'Livewire & Inertia UI', 'desc' => 'Reactive interfaces powered by Tailwind CSS and Vite.'],
            ['title' => 'Performance & Audits', 'desc' => 'N+1 elimination, caching strategies, and zero-downtime CI/CD.'],
        ];

        return view('pages.services', compact('services'));
    }

    public function contact(): View
    {
        return view('pages.contact', ['email' => 'hello@apexstudio.example']);
    }
}
```

### Step 2: Routes (`routes/web.php`)
> Note: Always verify the facade import path is `Illuminate\Support\Facades\Route`.

```php
<?php

declare(strict_types=1);

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::controller(PageController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/services', 'services')->name('services');
    Route::get('/contact', 'contact')->name('contact');
});
```

---

## 5. Returning Consistent JSON & Download Responses

Besides `view(...)` and `redirect()->route(...)`, controllers frequently return JSON or file downloads:

```php
return response()->json(['status' => 'ok', 'created_at' => now()], 201);
return response()->download(storage_path('app/invoices/inv-01.pdf'));
return redirect()->route('services')->with('status', 'Inquiry sent!');
```

---

## Key Takeaways
- Use **named routes** (`->name('services')`) and `route('services')` in Blade/redirects so URL refactors never break templates.
- Group shared controller routes with `Route::controller(PageController::class)` and model CRUD with `Route::resource(...)`.
- Register custom middleware aliases inside `bootstrap/app.php`'s `->withMiddleware()` callback.
