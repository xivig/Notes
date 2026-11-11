# Chapter 13 — REST APIs, Sanctum Token Lifecycle, Resources & HTTP Client

In Laravel 11 / 12 / 13, API scaffolding (`routes/api.php` + Laravel Sanctum) is opt-in via one command. Build versioned JSON endpoints with scoped token issue/revocation, Eloquent API Resources (`whenLoaded()`), allowlisted sort filters, and resilient outbound `Http` calls.

---

## 1. Enabling `routes/api.php` & Sanctum (`install:api`)

```bash
php artisan install:api
php artisan migrate
php artisan make:controller Api/V1/AuthTokenController
php artisan make:controller Api/V1/PostApiController
php artisan make:resource PostResource
```
Ensure `App\Models\User` uses `Laravel\Sanctum\HasApiTokens`.

### Full Sanctum Token Issue & Revoke Controller (`AuthTokenController.php`)
```php
<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class AuthTokenController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
            'device_name' => ['required', 'string', 'max:100'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken($data['device_name'], abilities: ['posts:read', 'posts:write']);

        return response()->json([
            'token' => $token->plainTextToken,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function destroy(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Token revoked.']);
    }
}
```

---

## 2. Eloquent API Resources (`PostResource`) & Safe Filtering (`PostApiController`)

```php
final class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'author' => $this->whenLoaded('author', fn () => [
                'id' => $this->author->id,
                'name' => $this->author->name,
            ]),
            'published_at' => $this->published_at?->toIso8601String(),
        ];
    }
}

final class PostApiController extends Controller
{
    public function index(Request $request)
    {
        $allowedSorts = ['published_at', 'title', 'created_at'];
        $sortBy = in_array($request->query('sort'), $allowedSorts, true) ? $request->query('sort') : 'published_at';

        $posts = Post::with('author:id,name')->published()->orderByDesc($sortBy)->paginate(20);
        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request): JsonResponse
    {
        abort_unless($request->user()->tokenCan('posts:write'), 403);
        $post = $request->user()->posts()->create($request->validated());

        return (new PostResource($post->load('author:id,name')))->response()->setStatusCode(201);
    }
}
```

```php
// routes/api.php
Route::prefix('v1')->group(function () {
    Route::post('/tokens', [AuthTokenController::class, 'store'])->middleware('throttle:10,1');
    Route::get('/posts', [PostApiController::class, 'index']);

    Route::middleware(['auth:sanctum', 'throttle:api'])->group(function () {
        Route::delete('/tokens/current', [AuthTokenController::class, 'destroy']);
        Route::get('/me', fn (Request $r) => $r->user());
        Route::post('/posts', [PostApiController::class, 'store']);
    });
});
```

---

## 3. Consuming External APIs (`Http::retry` & `Http::pool`)

```php
use Illuminate\Support\Facades\Http;

$profile = Http::timeout(5)
    ->retry(times: 3, sleepMilliseconds: 200)
    ->withToken(config('services.github.token'))
    ->get('https://api.github.com/users/laravel')
    ->throw()
    ->json();

// Concurrent requests (Laravel 13 defaults pool concurrency limit to 2; adjust cleanly)
$responses = Http::pool(concurrency: 4, callback: fn ($pool) => [
    $pool->as('users')->get('https://api.example.com/users'),
    $pool->as('metrics')->get('https://api.example.com/metrics'),
]);
```

---

## 4. Named Rate Limiters (`RateLimiter::for()`) & Webhook Signature Guard

Configure named limiters referenced by `throttle:api` inside `AppServiceProvider::boot()`:
```php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

RateLimiter::for('api', function (Request $request) {
    return $request->user()
        ? Limit::perMinute(120)->by((string) $request->user()->id)
        : Limit::perMinute(30)->by((string) $request->ip());
});
```

Verify incoming third-party webhooks (Stripe/GitHub) in constant time with `hash_equals`:
```php
$expected = hash_hmac('sha256', $request->getContent(), config('services.webhook.secret'));
$signature = (string) $request->header('X-Webhook-Signature', '');
abort_unless(hash_equals($expected, $signature), 401, 'Invalid webhook signature.');
```
