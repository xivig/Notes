# Laravel & Modern PHP Developer Glossary

Concise definitions of core Laravel 12/13, Blade, Eloquent, Security, and PHP 8.3–8.5 engineering terms used throughout this handbook.

---

### **Artisan (`php artisan`)**
Laravel's built-in command-line interface powered by Symfony Console for code generation (`make:*`), database migrations, queue workers, route inspection (`route:list`), log streaming (`pail`), diagnostics (`about`), and REPL debugging (`tinker`).

### **Attribute (`#[...]`)**
Structured native PHP metadata (PHP 8.0+) attached to classes, properties, or methods and inspectable via Reflection. Laravel 13 uses attributes cleanly across Models (`#[Fillable]`, `#[Table]`) and Jobs (`#[Tries]`, `#[Timeout]`).

### **Backed Enum**
A PHP `enum` backed by `string` or `int` scalar values (e.g., `enum Status: string`), serialized cleanly by Eloquent `casts(): array` and matched exhaustively with `match`.

### **Blade & Blade Components (`<x-*>`)**
Laravel's compiled templating engine offering automatic XSS escaping (`{{ }}`), layouts (`<x-layouts.app>` or `@extends`), class-based components (`make:component`), anonymous Blade-only components (`--view`), inline components (`--inline`), short attributes (`:$var`), and `@aware` inheritance.

### **`bootstrap/app.php`**
The streamlined central application entry point introduced in Laravel 11+ where routing paths, custom middleware aliases (`->withMiddleware()`), and exception rendering/reporting (`->withExceptions()`) live cleanly.

### **Carbon**
Datetime library bundled with Laravel powering `$post->created_at?->diffForHumans()`, timezone conversions, and cache TTL helpers like `now()->addMinutes(10)`.

### **CSRF (Cross-Site Request Forgery)**
An attack tricking authenticated users' browsers into submitting unauthorized state-changing requests. Defended by `@csrf` tokens checked automatically on `web` routes; missing tokens return HTTP `419 Page Expired`.

### **defer()**
A Laravel helper scheduling lightweight closures to run immediately *after* the HTTP response finishes sending to the user, without needing a separate queue worker.

### **Dependency Injection (DI)**
Supplying class dependencies via constructor/method type-hints rather than instantiating them with `new` inside methods. Laravel's Service Container auto-wires constructors automatically using PHP `ReflectionClass`.

### **DTO (Data Transfer Object)**
A small immutable object (commonly `final readonly class` with promoted constructor properties in PHP 8.2+) carrying validated input cleanly between FormRequests, Controllers, and Action/Service classes.

### **Eloquent ORM & Query Builder (`DB::table`)**
Eloquent maps tables to Object-Relational Models (`$fillable`, `casts()`, relationships, query scopes), while `DB::table(...)` runs lightweight parameterized SQL queries without hydrating full models.

### **Facade**
A thin static proxy class (`Route::`, `Cache::`, `Http::`, `Storage::`) resolving an underlying Service Container object via `__callStatic`, delivering expressive static ergonomics while remaining fakeable in tests (`Http::fake()`, `Queue::fake()`).

### **Faker (`fake()`) & Model Factory**
**Model Factories** define realistic synthetic record templates via Faker (`fake()->unique()->safeEmail()`, `Sequence`, `->recycle()`) for seeders and isolated tests. Keep `fakerphp/faker` in `require-dev` only if `composer install --no-dev` runs in production.

### **FormRequest**
A dedicated request validation & authorization class (`App\Http\Requests\*`) separating HTTP validation rules (`rules()`) and permission gates (`authorize()`) from controllers so controllers receive sanitized `$request->validated()`.

### **Guard & Provider (Multi-Auth)**
In `config/auth.php`, a **Guard** defines *how* users stay authenticated (`session` vs `sanctum`), while a **Provider** defines *where* records come from (`users` -> `App\Models\User` vs `admins` -> `App\Models\Admin`). Bind `'model'` directly rather than wrapping it in `AUTH_MODEL`.

### **IDOR (Insecure Direct Object Reference)**
Vulnerability where an endpoint accepts `/posts/{id}` or `/tasks/{id}` without verifying the authenticated user owns or is authorized for that record. Defended by **Policies** + `Gate::authorize(...)`.

### **Inertia & Laravel Echo**
**Inertia** lets Laravel controllers render server-routed React/Vue SPAs with standard session auth, while **Laravel Echo** subscribes frontend clients to real-time WebSocket channels served by **Laravel Reverb**.

### **Laravel Horizon, Pulse & Telescope**
Official telemetry tools: **Horizon** monitors Redis queues/workers, **Pulse** tracks slow queries/requests in production, and **Telescope** inspects local requests, queries, emails, and exceptions during development.

### **Localization (`i18n` / `__()` / `trans_choice()`)**
Multi-language translation lookups backed by JSON/PHP files under `lang/` (`__('Welcome')`) paired with session/route locale middleware (`app()->setLocale(...)`).

### **Livewire**
Full-stack Laravel framework enabling reactive dynamic UIs (modals, live search, forms) directly in PHP + Blade components without authoring a separate JavaScript SPA.

### **Mass Assignment**
Populating multiple model attributes from an input array at once (`Post::create($data)`). Defend against injected fields (`role=admin`) by declaring `$fillable` AND passing only `$request->validated()`.

### **Middleware**
Sequential HTTP pipeline layers inspecting or transforming requests/responses around controllers (authentication, CSRF, rate limiting, CORS, admin role checks), aliased in `bootstrap/app.php`.

### **N+1 Query Problem**
Fetching $N$ parent models in 1 query and lazily querying a relation inside a loop $N$ times (`$post->author->name`). Fix with eager loading (`Post::with('author')`) and catch locally via `Model::preventLazyLoading()`.

### **Notification (`ShouldQueue`)**
Multi-channel alert class (`mail`, `database`, Slack, SMS) sent via `$user->notify(...)` and stored cleanly for unread feeds in the `notifications` table.

### **Pessimistic Locking (`lockForUpdate`) & `chunkById`**
Query primitives preventing concurrent race conditions inside `DB::transaction()` (`->lockForUpdate()`) and processing large datasets safely without memory exhaustion (`->chunkById()` / `->lazyById()`).

### **Polymorphic Relation (`morphTo` / `morphMany`)**
Eloquent association allowing a single model (`Comment`, `Media`, `Tag`) to belong to multiple parent model types (`Post`, `Gallery`, `Page`) via `*_id` and `*_type` columns.

### **Policy**
Dedicated class mapping model permissions (`view`, `create`, `update`, `delete`) to user/record checks (`PostPolicy`), enforced server-side with `Gate::authorize('update', $post)` and in Blade via `@can`.

### **RateLimiter (`RateLimiter::for()`)**
Central request throttling rules configured in `AppServiceProvider::boot()` and applied to routes via `throttle:<name>` middleware.

### **Socialite, Cashier & Scout**
Official Laravel packages for OAuth login (**Socialite**), Stripe/Paddle subscriptions (**Cashier**), and full-text driver search (**Scout**).

### **PSR-4 Autoloading**
PHP/Composer standard mapping namespace prefixes directly to folder paths (e.g., `App\Models\Post` -> `app/Models/Post.php`), eliminating manual `require` statements.

### **Sanctum**
Laravel's lightweight API authentication system issuing scoped Bearer Personal Access Tokens (`personal_access_tokens`) and cookie-based SPA auth.

### **Service Container & Service Provider**
The Service Container resolves constructor dependencies using Reflection; Service Providers (`AppServiceProvider`) bind interfaces in `register()` and bootstrap runtime rules (`Model::preventLazyLoading()`, `Blade::directive`) in `boot()`.

### **ShouldQueue**
Marker contract interface telling Laravel to dispatch a Job or Event Listener asynchronously to a queue driver (`database`, `redis`, SQS) rather than running synchronously during the request.

### **Starter Kit**
Official Laravel scaffolding installed via `laravel new` bundling login/registration, email verification, settings, Tailwind v4, and UI stacks (Livewire + Flux UI, React + shadcn/ui, Vue, or WorkOS AuthKit).

### **Vite (`@vite`)**
Modern frontend asset bundler compiling Tailwind CSS v4 and JS modules with live HMR (`npm run dev`) and hashed production bundles (`public/build/manifest.json` via `npm run build`).
