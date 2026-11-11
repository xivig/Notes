# Chapter 13 — REST APIs, Eloquent Resources, Sanctum & HTTP Client

In Laravel 11 / 12 / 13, API scaffolding (`routes/api.php` + Laravel Sanctum) is opt-in so web-only apps stay slim. One Artisan command installs everything needed to serve fast, strongly-typed JSON APIs.

---

## 1. Enabling `routes/api.php` & Sanctum (`install:api`)

Run:
```bash
php artisan install:api
```
This installs `laravel/sanctum`, publishes the `personal_access_tokens` migration (run `php artisan migrate`), and wires `routes/api.php` automatically under the `/api` URL prefix inside `bootstrap/app.php`.

```php
// routes/api.php
use App\Http\Controllers\Api\PostApiController;
use Illuminate\Support\Facades\Route;

Route::get('/posts', [PostApiController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/posts', [PostApiController::class, 'store']);
});
```

---

## 2. Eloquent API Resources (`JsonResource`) — Never Expose Raw Models

Returning `return Post::all();` directly leaks internal columns (`user_id`, timestamps, private flags) and couples API consumers to your DB schema. Always transform models through an **API Resource**:

```bash
php artisan make:resource PostResource
```

```php
<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            // Only serialize author when relationship was eager-loaded (prevents N+1!):
            'author' => $this->whenLoaded('author', fn () => [
                'id' => $this->author->id,
                'name' => $this->author->name,
            ]),
            'published_at' => $this->published_at?->toIso8601String(),
        ];
    }
}
```

Controller usage:
```php
public function index()
{
    $posts = Post::with('author:id,name')->published()->paginate(15);

    return PostResource::collection($posts);
}
```
`PostResource::collection($paginator)` automatically includes `data`, `links`, and `meta` pagination metadata!

---

## 3. Token Authentication with Laravel Sanctum

Add the `HasApiTokens` trait to `App\Models\User`:

```php
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
}
```

Issue a scoped Personal Access Token upon login:
```php
$token = $user->createToken('mobile-cli', abilities: ['posts:write'])->plainTextToken;

// Check token ability inside controllers/policies:
abort_unless($request->user()->tokenCan('posts:write'), 403);
```

Clients send `Authorization: Bearer <token>` plus `Accept: application/json` so validation errors return HTTP `422` JSON instead of HTML redirects.

---

## 4. Consuming External APIs with `Http` & `Http::pool()`

Laravel's `Illuminate\Support\Facades\Http` client wraps Guzzle with fluent retries, timeouts, and concurrency:

```php
use Illuminate\Support\Facades\Http;

// 1. Single resilient request with timeout + automatic retry
$profile = Http::timeout(5)
    ->retry(times: 3, sleepMilliseconds: 200)
    ->withToken(config('services.github.token'))
    ->get('https://api.github.com/users/laravel')
    ->throw()
    ->json();

// 2. Concurrent requests via Http::pool() (Laravel 13 defaults concurrency pool limit to 2; adjust as needed)
$responses = Http::pool(concurrency: 4, callback: fn ($pool) => [
    $pool->as('users')->get('https://api.example.com/users'),
    $pool->as('metrics')->get('https://api.example.com/metrics'),
]);
```

In automated tests, swap all outbound HTTP calls cleanly with `Http::fake([...])` and assert `Http::assertSent(...)`.

---

## Key Takeaways
- Install API routing & token auth via `php artisan install:api`.
- Transform Eloquent output with `JsonResource` + `$this->whenLoaded(...)` to lock your JSON contract and avoid accidental N+1 queries.
- Set explicit `timeout(...)` and `retry(...)` on external `Http::` calls, or batch them with `Http::pool()`.
