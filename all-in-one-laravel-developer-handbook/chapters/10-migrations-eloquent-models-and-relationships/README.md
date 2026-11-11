# Chapter 10 — Migrations, Eloquent ORM, Relationships & Demo Project 2 (DevBlog)

Eloquent is Laravel's Active Record ORM. Instead of writing repetitive SQL joins and manual array hydration, you define versioned **Migrations**, strongly-typed **Models**, **Relationships** (`hasMany`, `belongsTo`, `belongsToMany`), and **Factories/Seeders** for repeatable development and tests.

---

## 1. Zero-Config Database Setup (SQLite Default)

Fresh Laravel 12/13 apps default to **SQLite** in `.env`, stored at `database/database.sqlite`:

```dotenv
DB_CONNECTION=sqlite
```

Switching later to PostgreSQL or MySQL only requires updating `.env` (`DB_CONNECTION=pgsql`, `DB_HOST`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) — your Migrations and Eloquent queries stay portable!

---

## 2. Demo Project 2 — DevBlog Platform (Posts, Authors & Tags)

### Step 1: Generate Model, Migration, Factory, Seeder & Controller Together
```bash
php artisan make:model Post -mfsc
# -m = Migration, -f = Factory, -s = Seeder, -c = Controller
```

### Step 2: Author Foreign Key & Blog Schema Migration
Inside `database/migrations/*_create_posts_table.php`:

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('body');
            $table->boolean('is_published')->default(false)->index();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
```

Run it with `php artisan migrate`.

---

## 3. Eloquent Model: `$fillable`, `casts(): array`, Scopes & Laravel 13 Attributes

In `app/Models/Post.php`:

```php
<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Post extends Model
{
    use HasFactory;

    // Protect against Mass Assignment (remember Chapter 03: keep protected!)
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'body',
        'is_published',
        'published_at',
    ];

    // Modern method-based casts (supports Enums, Carbon datetimes, booleans)
    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }

    // Reusable query scope: Post::published()->latest()->paginate(10)
    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true);
    }
}
```

> [!TIP]
> **Laravel 13 Alternative (PHP Attributes on Models)**
> In Laravel 13, you can also declare model metadata using attributes right above the class:
> `#[Table('posts')]`, `#[Fillable(['title', 'slug', 'body'])]`, `#[Hidden(['secret_token'])]`.

---

## 4. Database Seeders & Factories (`database/seeders/DatabaseSeeder.php`)

```php
// database/factories/PostFactory.php -> definition()
return [
    'user_id' => User::factory(),
    'title' => $title = fake()->sentence(6),
    'slug' => str($title)->slug() . '-' . fake()->unique()->numberBetween(100, 999),
    'body' => fake()->paragraphs(4, asText: true),
    'is_published' => true,
    'published_at' => now()->subDays(rand(0, 30)),
];
```

Seed 10 posts across 2 authors in `DatabaseSeeder.php`:
```php
User::factory(2)
    ->has(Post::factory()->count(5), 'posts')
    ->create();
```
Run: `php artisan migrate:fresh --seed`.

---

## 5. Eager Loading (`with()`) vs the N+1 Query Trap

Never access `$post->author->name` inside a `@foreach` loop without eager loading!

```php
// BAD (N+1 queries: 1 query for 20 posts + 20 extra SELECT queries for authors!):
$posts = Post::published()->latest()->get();

// GOOD (Exactly 2 queries total using WHERE id IN (...)):
$posts = Post::with(['author:id,name', 'tags:id,name'])
    ->published()
    ->latest('published_at')
    ->paginate(10);
```

Enable strict N+1 prevention during local development inside `AppServiceProvider::boot()`:
```php
Model::preventLazyLoading(! app()->isProduction());
```

### Controller & Routes (`PostController.php`)
```php
public function index(): View
{
    $posts = Post::with('author')
        ->published()
        ->latest('published_at')
        ->paginate(10);

    return view('blog.index', compact('posts'));
}

public function show(Post $post): View // Route model binding via {post:slug}
{
    abort_unless($post->is_published, 404);
    $post->load('author', 'tags');

    return view('blog.show', compact('post'));
}
```

---

## Key Takeaways
- Always define `$fillable` (never accept unvalidated `$request->all()` directly into `create()`).
- Prefer `protected function casts(): array` for booleans, datetimes, JSON, and Backed Enums.
- Pair `Model::preventLazyLoading(! app()->isProduction())` with `.with([...])` to eliminate N+1 bugs permanently.

## Try It Locally
Run our SQLite in-memory lab simulating Eloquent's **N+1 vs Eager Loading (`IN (...)` batch query)** and hydration:
```bash
php chapters/10-migrations-eloquent-models-and-relationships/lab.php
```
