# Chapter 15 — Automated Testing with Pest, PHPUnit & Fakes

Test HTTP routes, FormRequests, Policies, uploads, Sanctum APIs, and queued jobs against an isolated **in-memory SQLite (`:memory:`)** database using `RefreshDatabase` and built-in Facade fakes.

---

## 1. Complete Pest Feature Test Suite (`tests/Feature/PostManagementTest.php`)

```bash
php artisan make:test PostManagementTest
php artisan test --parallel
```

```php
<?php

use App\Jobs\GenerateSitemapJob;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

it('stores a post with uploaded cover image and prevents unauthorized edits', function () {
    Storage::fake('public');
    $author = User::factory()->create();
    $intruder = User::factory()->create();

    $this->actingAs($author)->post(route('posts.store'), [
        'title' => 'Tested Laravel Guide',
        'slug' => 'tested-laravel-guide',
        'body' => 'Full end-to-end feature test coverage.',
        'status' => 'published',
        'cover' => UploadedFile::fake()->image('cover.jpg', 800, 600),
    ])->assertRedirect(route('posts.index'));

    $post = Post::firstOrFail();
    Storage::disk('public')->assertExists($post->cover_path);
    $this->assertDatabaseHas('posts', ['slug' => 'tested-laravel-guide', 'user_id' => $author->id]);

    $this->actingAs($intruder)
        ->patch(route('posts.update', $post), ['title' => 'Tampered'])
        ->assertForbidden();
});

it('creates posts via Sanctum API and fakes outbound queues/http/mail cleanly', function () {
    Queue::fake();
    Mail::fake();
    Http::fake(['api.example.com/*' => Http::response(['ok' => true], 200)]);

    $user = User::factory()->create();
    Sanctum::actingAs($user, ['posts:write']);

    $this->postJson('/api/v1/posts', [
        'title' => 'API Created Post',
        'slug' => 'api-created-post',
        'body' => 'Delivered via Sanctum Bearer token.',
        'status' => 'published',
    ])->assertCreated()->assertJsonPath('data.slug', 'api-created-post');

    GenerateSitemapJob::dispatch();
    Queue::assertPushed(GenerateSitemapJob::class);
});
```

---

## 2. Essential Assertions & Code Style Gates

| Assertion | Verifies |
| :--- | :--- |
| `$response->assertOk()` / `assertCreated()` / `assertForbidden()` | HTTP status codes `200`, `201`, `403` |
| `$response->assertRedirect(route('...'))` | Post-Redirect-Get flow |
| `$response->assertSessionHasErrors(['title'])` | Validation error key returned cleanly |
| `$response->assertJsonPath('data.slug', 'my-post')` | Nested JSON API payload structure |
| `$this->assertDatabaseHas('posts', [...])` | Persisted database row |

Run automated formatting & static checks alongside tests:
```bash
./vendor/bin/pint --test
php artisan test
```

## Try It Locally
Run our standalone PHP Arrange-Act-Assert micro test runner (`lab.php`):
```bash
php chapters/15-testing-with-pest-and-phpunit/lab.php
```
