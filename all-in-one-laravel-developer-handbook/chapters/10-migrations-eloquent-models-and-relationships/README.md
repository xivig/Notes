# Chapter 10 — SQL, Migrations, Faker, Seeders, Eloquent CRUD & DevBlog Project

Master relational SQL subdivisions, zero-config SQLite & `.env` DB setup, schema blueprints, modern **Faker (`fake()`)**, States, `Sequence`, & `->recycle()`, idempotent Seeders, full 7-action **`PostController` CRUD**, continuous pagination (`$posts->firstItem() + $loop->index`), Carbon `diffForHumans()`, relationships (`hasOne`, `hasMany`/`belongsTo`, `belongsToMany` pivots), and **N+1 prevention** (`with()` + `Model::preventLazyLoading()`).

---

## 1. SQL Foundations Quick Map & Database Configuration

```text
SQL
├── DDL (Definition)   ── CREATE, ALTER, DROP, Indexes, Foreign Keys, UNIQUE
├── DML (Manipulation) ── INSERT, UPDATE, DELETE
├── DQL (Queries)      ── SELECT, FROM (INNER/LEFT/RIGHT/CROSS JOIN), WHERE, GROUP BY, HAVING, ORDER BY, LIMIT
├── DCL (Security)     ── GRANT, REVOKE (least-privilege application DB user)
├── TCL (Transactions) ── START TRANSACTION, COMMIT, ROLLBACK
└── Core Types         ── BIGINT/INT, VARCHAR/TEXT, TIMESTAMP, BOOLEAN, JSON, DECIMAL(p,s)
```

Local development defaults cleanly to SQLite (`DB_CONNECTION=sqlite`); configure MySQL/PostgreSQL in `.env`:
```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_cms
DB_USERNAME=app_user
DB_PASSWORD=strong-secret
APP_FAKER_LOCALE=en_US
```

---

## 2. Demo Project 2 — DevBlog Schemas (`Category`, `Tag`, `Post`, `post_tag`)

```bash
php artisan make:model Category -mfs
php artisan make:model Tag -mfs
php artisan make:model Post -mfsc --resource
php artisan make:migration create_post_tag_table
```

```php
// create_categories_table
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name', 100);
    $table->string('slug')->unique();
    $table->timestamps();
});

// create_posts_table
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
    $table->string('title', 180);
    $table->string('slug')->unique();
    $table->longText('body');
    $table->string('cover_path')->nullable();
    $table->string('status', 20)->default('draft')->index();
    $table->timestamp('published_at')->nullable()->index();
    $table->timestamps();
    $table->softDeletes();
});

// create_post_tag_table (Many-to-Many Pivot Junction Table)
Schema::create('post_tag', function (Blueprint $table) {
    $table->foreignId('post_id')->constrained()->cascadeOnDelete();
    $table->foreignId('tag_id')->constrained()->cascadeOnDelete();
    $table->primary(['post_id', 'tag_id']);
    $table->timestamps();
});
```

---

## 3. Eloquent Model, Relationships, Scopes & Laravel 13 Attributes

```php
<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'category_id',
        'title',
        'slug',
        'body',
        'cover_path',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
        ];
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }

    public function scopePublished(Builder $query): void
    {
        $query->where('status', 'published')->whereNotNull('published_at');
    }
}
```

> [!TIP]
> **Laravel 13 Alternative (PHP Attributes on Models)**
> Declare `#[Table(name: 'posts')]`, `#[Fillable(['user_id', 'title', 'slug', 'body'])]`, and `#[Hidden(['secret_notes'])]` right above the class!

---

## 4. Faker, Factories (`fake()`, States, `Sequence`, `->recycle()`) & Seeders

Laravel ships **`fakerphp/faker`** out of the box (in `composer.json` `require-dev`) together with the global **`fake()`** helper. Control locale via `.env` `APP_FAKER_LOCALE=en_US` or pass a locale directly: `fake('fr_FR')->name()`.

### Essential Faker Providers & Modifiers Reference
| Category | Faker Call | Notes |
| :--- | :--- | :--- |
| **Identity & Email** | `fake()->name()`, `fake()->unique()->safeEmail()` | Unique valid `@example.*` test addresses |
| **Locations** | `fake()->address()`, `fake()->city()`, `fake()->country()` | Locale-aware via `APP_FAKER_LOCALE` |
| **Text & Paragraphs** | `fake()->sentence(5)`, `fake()->paragraphs(4, asText: true)` | Set `asText: true` to return a single newline string |
| **Numbers & Booleans** | `fake()->numberBetween(100, 999)`, `fake()->boolean(75)` | `boolean(75)` yields `true` ~75% of calls |
| **Dates & Placeholders** | `fake()->dateTimeBetween('-60 days', 'now')`, `fake()->imageUrl(640, 480)` | Deterministic historical date windows |
| **Choices & Nullables** | `fake()->randomElement(['draft', 'published'])`, `fake()->optional(0.75)->dateTime()` | Cleanly generates null ~25% of the time |

> [!WARNING]
> **Production `--no-dev` Faker Gotcha**
> Since `fakerphp/faker` resides under `require-dev`, running seeders calling `fake()` or factories after `composer install --no-dev` throws `Class "Faker\Factory" not found`. Reserve Faker for dev/staging/tests; use deterministic `firstOrCreate()` seeders in production!

### Factory (`database/factories/PostFactory.php`) & Custom Seeders
```php
public function definition(): array
{
    $title = fake()->unique()->sentence(5);

    return [
        'user_id' => User::factory(),
        'category_id' => Category::factory(),
        'title' => $title,
        'slug' => str($title)->slug() . '-' . fake()->numberBetween(100, 999),
        'body' => fake()->paragraphs(4, asText: true),
        'status' => 'draft',
        'published_at' => null,
    ];
}

public function published(): static
{
    return $this->state(fn () => [
        'status' => 'published',
        'published_at' => fake()->dateTimeBetween('-60 days', 'now'),
    ]);
}
```

`database/seeders/DatabaseSeeder.php`:
```php
public function run(): void
{
    $this->call([AdminSeeder::class]);

    $authors = User::factory(5)->create();
    $categories = Category::factory(4)->create();
    $tags = Tag::factory(8)->create();

    Post::factory(40)
        ->published()
        ->recycle($authors)      // Reuses the 5 authors cleanly without spawning 40 extra users!
        ->recycle($categories)
        ->create()
        ->each(fn (Post $post) => $post->tags()->attach($tags->random(rand(1, 3))));
}
```
Execute with:
```bash
php artisan migrate:status
php artisan migrate --pretend      # Dry-run SQL inspection
php artisan migrate
php artisan db:seed
php artisan migrate:fresh --seed   # DEV ONLY! Drops EVERY table — never run on production!
```

---

## 5. Complete Resource Controller, Continuous Pagination & N+1 Fix

```php
// app/Http/Controllers/PostController.php
final class PostController extends Controller
{
    public function index(): View
    {
        // Eager loading runs 2-3 IN(...) queries total regardless of page size!
        $posts = Post::with(['author:id,name', 'category:id,name', 'tags:id,name'])
            ->latest('created_at')
            ->paginate(15);

        return view('posts.index', compact('posts'));
    }

    public function show(Post $post): View
    {
        $post->load(['author:id,name', 'category:id,name', 'tags:id,name']);
        return view('posts.show', compact('post'));
    }
}
```

Paginated Blade table preserving continuous item indices (`$posts->firstItem() + $loop->index`) and human-readable Carbon timestamps:
```blade
@forelse ($posts as $post)
    <tr>
        <td>{{ $posts->firstItem() + $loop->index }}</td>
        <td><a href="{{ route('posts.show', $post) }}">{{ $post->title }}</a></td>
        <td>{{ $post->author?->name ?? 'Unknown' }}</td>
        <td>{{ $post->created_at?->diffForHumans() ?? 'Not recorded' }}</td>
    </tr>
@empty
    <tr><td colspan="4">No posts found.</td></tr>
@endforelse
{{ $posts->links() }}
```

Enable local lazy-load guard in `AppServiceProvider::boot()` and prefer flat `DB::table()->join()` queries only for heavy un-hydrated analytics tables:
```php
Model::preventLazyLoading(! app()->isProduction());
```

## Try It Locally
Run our SQLite in-memory lab verifying lazy N+1 query counts vs batched eager loading (`IN (...)`):
```bash
php chapters/10-migrations-eloquent-models-and-relationships/lab.php
```
