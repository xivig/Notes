# Laravel & Modern PHP Developer Glossary

Concise definitions of core Laravel 12/13 and PHP 8.3–8.5 engineering terms used throughout this handbook.

---

### **Artisan**
Laravel's built-in command-line interface (`php artisan ...`) powered by Symfony Console for code generation, migrations, queue workers, route inspection, caching, and REPL debugging (`tinker`).

### **Attribute (`#[...]`)**
Structured native PHP metadata (PHP 8.0+) attached to classes, properties, or methods and inspectable via Reflection. Laravel 13 embraces attributes across Models (`#[Fillable]`, `#[Table]`) and Jobs (`#[Tries]`, `#[Timeout]`).

### **Backed Enum**
A PHP `enum` backed by `string` or `int` scalar values (e.g., `enum Status: string`), serialized cleanly by Eloquent `casts(): array` and matched exhaustively with `match`.

### **Blade**
Laravel's compiled PHP templating engine supporting automatic XSS HTML escaping (`{{ }}`), layouts (`@extends`), tag-based UI components (`<x-card>`), and control directives (`@forelse`...`@endforelse`, `@can`, `@csrf`).

### **CSRF (Cross-Site Request Forgery)**
An attack tricking authenticated users' browsers into submitting unauthorized state-changing requests. Defended by `@csrf` tokens checked automatically on `web` routes.

### **defer()**
A Laravel helper scheduling lightweight closures to execute immediately *after* the HTTP response finishes sending to the user, without needing a separate queue worker.

### **Dependency Injection (DI)**
Supplying class dependencies via constructor/method type-hints rather than instantiating them with `new` inside methods. Laravel's Service Container auto-wires constructors automatically using PHP `ReflectionClass`.

### **DTO (Data Transfer Object)**
A small immutable object (commonly `final readonly class` with promoted constructor properties in PHP 8.2+) carrying structured validated input cleanly between FormRequests, Controllers, and Action/Service classes.

### **Eloquent ORM**
Laravel's Active Record ORM mapping tables to `Model` classes with schema-free query scopes, relationship helpers (`hasMany`, `belongsTo`, `belongsToMany`), mass-assignment protection (`$fillable`), and type casting (`casts(): array`).

### **Facade**
A thin static proxy class (`Route::`, `Cache::`, `Http::`) resolving an underlying Service Container object via `__callStatic`, delivering expressive static ergonomics while remaining swappable/fakeable in tests (`Http::fake()`, `Queue::fake()`).

### **FormRequest**
A dedicated request validation & authorization class (`App\Http\Requests\*`) separating HTTP validation rules (`rules()`) and initial permission gates (`authorize()`) from controllers.

### **Inertia**
A glue library letting Laravel controllers return server-routed React, Vue, or Svelte components cleanly with session auth and zero separate REST/GraphQL client state duplication.

### **Livewire**
A full-stack framework for Laravel letting developers build reactive dynamic UIs (modals, live search, forms) directly in PHP + Blade components without writing a separate JS SPA.

### **Mass Assignment**
Populating multiple model attributes from an input array at once (`Post::create($data)`). Protect against malicious extra keys (`role=admin`) by declaring `$fillable` AND passing only `$request->validated()`.

### **Middleware**
Sequential HTTP pipeline layers inspecting or transforming requests/responses around your controller (authentication, CSRF, rate limiting, CORS, role checks), registered in `bootstrap/app.php`.

### **N+1 Query Problem**
Fetching $N$ parent models in 1 query and lazily querying a relation inside a loop $N$ times (`$post->author->name`). Fix with eager loading (`Post::with('author')`) and enforce locally using `Model::preventLazyLoading()`.

### **Policy**
A class dedicated to authorizing user actions on a specific Model (`view`, `update`, `delete`), invoked via `Gate::authorize('update', $task)` or Blade `@can`.

### **PSR-4 Autoloading**
The PHP/Composer standard mapping namespace prefixes directly to folder paths (e.g., `App\Models\Task` -> `app/Models/Task.php`), eliminating manual `require` statements.

### **Sanctum**
Laravel's lightweight API authentication system issuing scoped Bearer Personal Access Tokens (`personal_access_tokens`) and SPA session cookie auth.

### **Service Container**
Laravel's IoC dependency resolution engine managing object creation, interface-to-concrete bindings (`bind`, `singleton`, `scoped`), and automatic constructor dependency injection.

### **Service Provider**
Bootstrapping class (`AppServiceProvider`) with `register()` (container bindings) and `boot()` (runtime setup like `Model::shouldBeStrict()`, Gates, View rules).

### **ShouldQueue**
Marker contract interface telling Laravel to dispatch a Job or Event Listener asynchronously to a queue driver (`database`, `redis`, SQS) rather than running synchronously during the web request.

### **Starter Kit**
Official Laravel scaffolding installed via `laravel new` bundling login/registration, verification, settings, Tailwind v4, and UI stacks (Livewire + Flux UI, React + shadcn/ui, Vue, or WorkOS AuthKit).

### **Vite**
Fast frontend build tool bundled with Laravel compiling Tailwind CSS and JS modules with live HMR (`npm run dev`) and hashed production bundles (`npm run build`).
