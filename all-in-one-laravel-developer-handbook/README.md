# All-in-One Laravel Developer Handbook & Tutorials

[![Laravel](https://img.shields.io/badge/Laravel-12%20%7C%2013-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com/docs)
[![PHP](https://img.shields.io/badge/PHP-8.3%20%E2%80%93%208.5-777BB4?style=flat-square&logo=php&logoColor=white)](https://www.php.net/)
[![Chapters](https://img.shields.io/badge/Chapters-16%20Chapters%20(3%20Tracks)-0EA5E9?style=flat-square)](./chapters)
[![Verified Labs](https://img.shields.io/badge/Runnable%20PHP%20Labs-Verified-10B981?style=flat-square)](./run-all-examples.php)
[![Interactive Portal](https://img.shields.io/badge/Portal-Interactive%20Handbook-f59e0b?style=flat-square)](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/all-in-one-laravel-developer-handbook/index.html)

A modern, unified, chapterwise **Laravel Developer Handbook** uniting **PHP 8.3–8.5 fundamentals**, **Laravel OOP & Service Container architecture**, **hands-on Laravel 12/13 Demo Projects**, and **Production Engineering**.

> Open the interactive handbook anytime: 🌐 **[Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/all-in-one-laravel-developer-handbook/index.html)** · **[Local (`index.html`)](./index.html)**, or browse every Markdown chapter and runnable PHP lab directly below.

---

## Repository Map

| Resource | Purpose |
| :--- | :--- |
| [`index.html`](./index.html) | Interactive single-file handbook portal (search `/`, dark/light mode, track filters, copyable code) |
| [`CHEATSHEET.md`](./CHEATSHEET.md) | High-density reference for Artisan CLI, Routing, Eloquent, Blade, PHP 8.3–8.5, and Deploy commands |
| [`GLOSSARY.md`](./GLOSSARY.md) | Concise A–Z engineering glossary of Laravel & PHP architecture terms |
| [`run-all-examples.php`](./run-all-examples.php) | Automated syntax & runtime verifier for all standalone PHP labs |
| [`chapters/`](./chapters) | 16 structured chapters across 3 progressive learning tracks |

---

## Curriculum Overview (16 Chapters across 3 Tracks)

### Track 1 — PHP 8.3–8.5 & OOP Architecture for Laravel
| # | Chapter | Core Topics & Patterns | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 01 | [PHP 8 Syntax, Types & Strict Mode](./chapters/01-php-8-syntax-types-and-strict-mode/README.md) | `strict_types`, union/intersection types, `??` vs `?:`, nullsafe `?->`, named arguments, typed class constants | [`lab.php`](./chapters/01-php-8-syntax-types-and-strict-mode/lab.php) |
| 02 | [OOP, Inheritance, Magic Methods & Lifecycle](./chapters/02-oop-inheritance-magic-methods-and-lifecycle/README.md) | `use ... as Authenticatable`, multi-level inheritance, `static::` (LSB), `__get`/`__set`/`__isset`/`__callStatic`, `clone` | [`lab.php`](./chapters/02-oop-inheritance-magic-methods-and-lifecycle/lab.php) |
| 03 | [Interfaces, Traits, Visibility & Contracts](./chapters/03-interfaces-traits-visibility-and-contracts/README.md) | `SoftDeletes` & `bootTrait`, Filament `implements`, Contract+Trait pattern, Controller `ApiResponse` trait, `protected` vs `private` | [`lab.php`](./chapters/03-interfaces-traits-visibility-and-contracts/lab.php) |
| 04 | [Modern PHP 8.3–8.5: Enums, Attributes, Hooks & Pipe](./chapters/04-modern-php-83-to-85-enums-attributes-hooks-and-pipe/README.md) | Readonly DTOs, Backed Enums + `match`, Laravel 13 PHP Attributes, `#[Override]`, `json_validate`, 8.4 hooks, 8.5 pipe `|>` | [`lab.php`](./chapters/04-modern-php-83-to-85-enums-attributes-hooks-and-pipe/lab.php) · [`8.4`](./chapters/04-modern-php-83-to-85-enums-attributes-hooks-and-pipe/lab-php84.php) · [`8.5`](./chapters/04-modern-php-83-to-85-enums-attributes-hooks-and-pipe/lab-php85.php) |
| 05 | [Closures, Exceptions, Arrays & Strings for Laravel](./chapters/05-closures-exceptions-arrays-and-strings-for-laravel/README.md) | `use ($var)`, `fn =>`, `try`/`catch`/`finally`, `bootstrap/app.php` exception hooks, `Arr::only`, `Str::slug` & regex | [`lab.php`](./chapters/05-closures-exceptions-arrays-and-strings-for-laravel/lab.php) |
| 06 | [Composer PSR-4, Container Auto-Wiring & Facades](./chapters/06-composer-psr4-container-autowiring-and-facades/README.md) | PSR-4 namespace loading, `extra.laravel` auto-discovery, Reflection auto-wiring DI, Facade `__callStatic` proxies | [`lab.php`](./chapters/06-composer-psr4-container-autowiring-and-facades/lab.php) |

### Track 2 — Laravel 12/13 Core Foundations & Demo Projects
| # | Chapter | Core Topics & Demo Projects | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 07 | [Laravel Installation, Structure & Starter Kits](./chapters/07-laravel-installation-structure-and-starter-kits/README.md) | `laravel new`, React/Vue/Livewire/WorkOS starter kits, streamlined Laravel layout (`bootstrap/app.php`), SQLite & `composer run dev` | — |
| 08 | [Routing, Controllers, Middleware & Responses](./chapters/08-routing-controllers-middleware-and-responses/README.md) | **Demo Project 1 (Agency Site)**, `Route::controller`, `Route::resource`, middleware aliases in `bootstrap/app.php`, JSON responses | — |
| 09 | [Blade Templates, Components & Vite](./chapters/09-blade-templates-components-and-vite/README.md) | XSS escaping `{{ }}`, `<x-layouts.app>` vs `@extends`, `@csrf`, `@method`, `@forelse`/`@endforelse`, Tailwind v4 + `@vite` | — |
| 10 | [Migrations, Eloquent ORM & Relationships](./chapters/10-migrations-eloquent-models-and-relationships/README.md) | **Demo Project 2 (DevBlog)**, schema migrations, `casts(): array`, Laravel 13 `#[Fillable]`, `belongsTo`/`belongsToMany`, Factories, `with()` N+1 fix | [`lab.php`](./chapters/10-migrations-eloquent-models-and-relationships/lab.php) |
| 11 | [Forms, Validation, Policies & Auth CRUD](./chapters/11-forms-validation-policies-and-auth-crud/README.md) | **Demo Project 3 (Auth Task Manager)**, `FormRequest`, `TaskPolicy` + `Gate::authorize()`, `@can`, flash status & pagination | — |
| 12 | [Overriding Packages, Service Providers & Config](./chapters/12-overriding-packages-service-providers-and-configuration/README.md) | `register()` vs `boot()`, `bind`/`singleton`/`scoped`, `vendor:publish`, `.env` vs `config()` caching safety | [`lab.php`](./chapters/12-overriding-packages-service-providers-and-configuration/lab.php) |

### Track 3 — Production Laravel Engineering
| # | Chapter | Core Topics & Patterns | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 13 | [REST APIs, Resources, Sanctum & HTTP Client](./chapters/13-rest-apis-resources-sanctum-and-http-client/README.md) | `install:api`, `JsonResource` + `whenLoaded()`, Sanctum token abilities, `Http::retry()` & `Http::pool()` | — |
| 14 | [Queues, Jobs, Events, Caching & `defer()`](./chapters/14-queues-jobs-events-caching-and-defer/README.md) | `defer()` post-response tasks, `ShouldQueue` + `#[Tries]`, async Listeners, `Cache::remember`/`flexible`/`touch`, `Schedule::` | — |
| 15 | [Automated Testing with Pest & PHPUnit](./chapters/15-testing-with-pest-and-phpunit/README.md) | `RefreshDatabase` + SQLite `:memory:`, `actingAs()`, Policy HTTP tests, `Queue::fake()` / `Http::fake()` | [`lab.php`](./chapters/15-testing-with-pest-and-phpunit/lab.php) |
| 16 | [Security, Performance & Production Deployment](./chapters/16-security-performance-and-production-deployment/README.md) | OWASP checklist, `php artisan optimize`, OPcache, Redis, Laravel Octane, Reverb, Laravel 13 AI SDK, GitHub Actions CI | — |

---

## Quickstart: Verify All Standalone PHP Labs

Ensure PHP **8.3+** is available, then run:

```bash
php run-all-examples.php
```

Every chapter lab runs cleanly with zero Composer dependencies (`lab-php84.php` and `lab-php85.php` automatically run on PHP 8.4/8.5 and skip cleanly on PHP 8.3).
