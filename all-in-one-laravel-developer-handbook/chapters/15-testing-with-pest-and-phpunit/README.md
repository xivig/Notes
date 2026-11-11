# Chapter 15 — Automated Testing with Pest & PHPUnit

Modern Laravel treats tests as first-class engineering infrastructure. By default, `phpunit.xml` runs tests against an isolated in-memory **SQLite (`:memory:`)** database with the **`RefreshDatabase`** trait so tests execute in milliseconds with zero risk to development data.

---

## 1. Feature Tests vs Unit Tests

| Type | Directory | Boots Laravel? | Best Used For |
| :--- | :--- | :--- | :--- |
| **Feature Test** | `tests/Feature/` | Yes (`$this->get()`, DB, Auth) | Testing HTTP routes, Policies, Validation, Jobs, API JSON (~80% of tests) |
| **Unit Test** | `tests/Unit/` | Minimal / Pure PHP | Pure math helpers, Value Objects, DTOs, string/currency formatters |

Run the entire suite anytime:
```bash
php artisan test
# Or run filtered tests with parallel workers:
php artisan test --filter=TaskPolicyTest --parallel
```

---

## 2. Expressive Feature Tests in Pest (Laravel 12 / 13 Default)

```php
<?php

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('allows an authenticated user to create a task', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('tasks.store'), [
        'title' => 'Ship Laravel 13 Handbook',
    ]);

    $response->assertRedirect(route('tasks.index'));

    $this->assertDatabaseHas('tasks', [
        'user_id' => $user->id,
        'title' => 'Ship Laravel 13 Handbook',
    ]);
});

it('forbids deleting another user’s task via TaskPolicy', function () {
    $owner = User::factory()->create();
    $stranger = User::factory()->create();
    $task = Task::factory()->for($owner)->create();

    $this->actingAs($stranger)
        ->delete(route('tasks.destroy', $task))
        ->assertForbidden();

    $this->assertModelExists($task);
});
```

---

## 3. Faking Queues, Mail, Events & Outbound HTTP

Never send real emails or real Stripe API charges from tests! Because Laravel's Facades are Container-backed proxies (see **Chapter 06**), you can swap them cleanly in one line:

```php
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Queue;

it('queues a welcome job and calls webhook cleanly', function () {
    Queue::fake();
    Http::fake([
        'api.example.com/*' => Http::response(['ok' => true], 200),
    ]);

    // Act: trigger controller or service...
    SendWelcomePackJob::dispatch($user);

    // Assert:
    Queue::assertPushed(SendWelcomePackJob::class);
});
```

---

## 4. Essential Laravel Test Assertions Cheat Sheet

| Assertion | Checks |
| :--- | :--- |
| `$response->assertOk()` / `assertCreated()` / `assertForbidden()` | HTTP status codes `200`, `201`, `403` |
| `$response->assertRedirect(route('...'))` | Post-redirect-get flow |
| `$response->assertSessionHasErrors(['title'])` | Validation error triggered for field |
| `$response->assertJsonPath('data.slug', 'my-post')` | Nested JSON API payload assertion |
| `$this->assertDatabaseHas('posts', [...])` | SQL row exists after persistence |
| `Http::assertSentCount(1)` | Exact outbound API call count |

---

## Key Takeaways
- Write **Feature tests** for every route, Policy authorization rule (`assertForbidden()`), and validation rule (`assertSessionHasErrors()`).
- Always isolate database tests with `RefreshDatabase` and external side effects with `Queue::fake()`, `Mail::fake()`, `Notification::fake()`, and `Http::fake()`.

## Try It Locally
Run our standalone PHP Arrange-Act-Assert micro test suite (`lab.php`):
```bash
php chapters/15-testing-with-pest-and-phpunit/lab.php
```
