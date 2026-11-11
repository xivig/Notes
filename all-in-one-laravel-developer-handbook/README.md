# All-in-One Laravel Developer Handbook & Tutorials

[![Laravel](https://img.shields.io/badge/Laravel-12%20%7C%2013-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com/docs)
[![PHP](https://img.shields.io/badge/PHP-8.3%20%E2%80%93%208.5-777BB4?style=flat-square&logo=php&logoColor=white)](https://www.php.net/)
[![Chapters](https://img.shields.io/badge/Chapters-18%20Chapters%20(3%20Tracks)-0EA5E9?style=flat-square)](./chapters)
[![Verified Labs](https://img.shields.io/badge/Runnable%20PHP%20Labs-Verified-10B981?style=flat-square)](./run-all-examples.php)
[![Interactive Portal](https://img.shields.io/badge/Portal-Interactive%20Handbook-f59e0b?style=flat-square)](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/all-in-one-laravel-developer-handbook/index.html)

A unified, step-by-step **Laravel 12/13 Developer Handbook** uniting **PHP 8.3–8.5 & OOP Container Internals**, **Production Blade UI, Faker, Eloquent & Multi-Guard Auth Recipes**, **Verified Standalone PHP Labs**, **Server Configs & Troubleshooting**, **Batch CMS Scaffolding**, and the **EliteBlog Pro CMS Capstone**.

> Open the interactive handbook anytime: 🌐 **[Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/all-in-one-laravel-developer-handbook/index.html)** · **[Local (`index.html`)](./index.html)** — includes Dark/Light theme, `/` live search, track filters, progress tracker (`0 / 18`), copyable snippets, runnable PHP lab drawers, and a **12-question Interactive Mastery Quiz**.

---

## Repository Map

| Resource | Purpose |
| :--- | :--- |
| [`index.html`](./index.html) | Interactive single-file handbook portal (search `/`, dark/light mode, track filters, 12-question quiz, runnable lab viewers) |
| [`CHEATSHEET.md`](./CHEATSHEET.md) | High-density daily reference for Artisan CLI, Faker, Blade, Eloquent, Composer/Vite, Multi-Auth & Deploy commands |
| [`GLOSSARY.md`](./GLOSSARY.md) | Concise A–Z engineering glossary covering Laravel 12/13, Multi-Auth Guards, IDOR, Eloquent & PHP 8.3–8.5 terms |
| [`scripts/laravel_artisan_setup.sh`](./scripts/laravel_artisan_setup.sh) | Batch CMS scaffolder (`--dry-run` supported) creating layouts, role partials, form components & 7 `-mfs` domain models |
| [`run-all-examples.php`](./run-all-examples.php) | Automated syntax & runtime verifier for all standalone PHP labs across chapters |
| [`chapters/`](./chapters) | 18 structured step-by-step chapters across 3 progressive learning tracks |

---

## Curriculum Overview (18 Chapters across 3 Tracks)

### Track 1 — PHP 8.3–8.5 & OOP Architecture for Laravel
| # | Chapter | Core Topics & Patterns | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 01 | [PHP 8 Syntax, Types & Strict Mode](./chapters/01-php-8-syntax-types-and-strict-mode/README.md) | `strict_types`, union/intersection types, `??` vs `?:`, nullsafe `?->`, named arguments, typed class constants | [`lab.php`](./chapters/01-php-8-syntax-types-and-strict-mode/lab.php) |
| 02 | [OOP, Inheritance, Magic Methods & Lifecycle](./chapters/02-oop-inheritance-magic-methods-and-lifecycle/README.md) | `use ... as Authenticatable`, multi-level inheritance, `static::` (LSB), `__get`/`__set`/`__isset`/`__callStatic`, `clone` | [`lab.php`](./chapters/02-oop-inheritance-magic-methods-and-lifecycle/lab.php) |
| 03 | [Interfaces, Traits, Visibility & Contracts](./chapters/03-interfaces-traits-visibility-and-contracts/README.md) | `SoftDeletes` & `bootTrait`, Filament `implements`, Contract+Trait pattern, Controller `ApiResponse` trait, `protected` vs `private` | [`lab.php`](./chapters/03-interfaces-traits-visibility-and-contracts/lab.php) |
| 04 | [Modern PHP 8.3–8.5: Enums, Attributes, Hooks & Pipe](./chapters/04-modern-php-83-to-85-enums-attributes-hooks-and-pipe/README.md) | Readonly DTOs, Backed Enums + `match`, Laravel 13 PHP Attributes, `#[Override]`, `json_validate`, 8.4 hooks, 8.5 pipe `\|>` | [`lab.php`](./chapters/04-modern-php-83-to-85-enums-attributes-hooks-and-pipe/lab.php) · [`8.4`](./chapters/04-modern-php-83-to-85-enums-attributes-hooks-and-pipe/lab-php84.php) · [`8.5`](./chapters/04-modern-php-83-to-85-enums-attributes-hooks-and-pipe/lab-php85.php) |
| 05 | [Closures, Exceptions, Arrays & Strings for Laravel](./chapters/05-closures-exceptions-arrays-and-strings-for-laravel/README.md) | `use ($var)`, `fn =>`, `try`/`catch`/`finally`, `bootstrap/app.php` exception hooks, `Arr::only`, `Str::slug` & regex | [`lab.php`](./chapters/05-closures-exceptions-arrays-and-strings-for-laravel/lab.php) |
| 06 | [Composer PSR-4, Container Auto-Wiring & Facades](./chapters/06-composer-psr4-container-autowiring-and-facades/README.md) | PSR-4 namespace loading, `extra.laravel` auto-discovery, Reflection auto-wiring DI, Facade `__callStatic` proxies | [`lab.php`](./chapters/06-composer-psr4-container-autowiring-and-facades/lab.php) |

### Track 2 — Laravel 12/13 Core Foundations, UI Kits & Multi-Auth
| # | Chapter | Core Topics & Demo Projects | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 07 | [Laravel Installation, Structure & Starter Kits](./chapters/07-laravel-installation-structure-and-starter-kits/README.md) | Version support matrix, `laravel new`, React/Vue/Livewire/WorkOS starter kits, `bootstrap/app.php` request lifecycle, `composer run dev` | — |
| 08 | [Routing, Controllers, Middleware & Responses](./chapters/08-routing-controllers-middleware-and-responses/README.md) | **Demo Project 1 (Agency Site)**, `Route::controller`, `Route::resource`, verb map & spoofing, middleware aliases, JSON responses | — |
| 09 | [Blade Templates, Components & Vite](./chapters/09-blade-templates-components-and-vite/README.md) | XSS escaping, full Admin/Blog Blade Layouts & Partials kit, responsive sidebar JS drawer, `@aware`/`--view`/`--inline`/`Blade::directive`, Vite | — |
| 10 | [SQL, Migrations, Faker, Seeders & Eloquent CRUD](./chapters/10-migrations-eloquent-models-and-relationships/README.md) | **Demo Project 2 (DevBlog)**, SQL roadmap, schemas, `casts()`, `#[Fillable]`, **Faker** (`fake()` providers, `Sequence`, `->recycle()`, `--no-dev`), `firstItem()+$loop->index`, N+1 SQLite lab | [`lab.php`](./chapters/10-migrations-eloquent-models-and-relationships/lab.php) |
| 11 | [Validation, Uploads, Policies, RBAC & Multi-Auth](./chapters/11-forms-validation-policies-and-auth-crud/README.md) | **Demo Project 3 (Task Manager)**, FormRequests, randomized media uploads, `TaskPolicy`, RBAC pivot schema, **Hardened `web` + `admin` Multi-Guard Auth** | — |
| 12 | [Overriding Packages, Service Providers & Config](./chapters/12-overriding-packages-service-providers-and-configuration/README.md) | `register()` vs `boot()`, `bind`/`singleton`/`scoped`, `vendor:publish`, extending bound implementations, `.env` vs `config()` caching safety | [`lab.php`](./chapters/12-overriding-packages-service-providers-and-configuration/lab.php) |

### Track 3 — Production Laravel Engineering & Capstone
| # | Chapter | Core Topics & Patterns | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 13 | [REST APIs, Resources, Sanctum & HTTP Client](./chapters/13-rest-apis-resources-sanctum-and-http-client/README.md) | `install:api`, `AuthTokenController` (token issue/revoke), `JsonResource` + `whenLoaded()`, `Http::retry()` & `Http::pool()` | — |
| 14 | [Mail, Queues, Jobs, Events, Caching & `defer()`](./chapters/14-queues-jobs-events-caching-and-defer/README.md) | `defer()` post-response tasks, Markdown `WelcomeMail`, `ShouldQueue` + `#[Tries]`, `Cache::remember`/`flexible`/`touch`, `Schedule::` | — |
| 15 | [Automated Testing with Pest & PHPUnit](./chapters/15-testing-with-pest-and-phpunit/README.md) | `RefreshDatabase` + SQLite `:memory:`, `actingAs()`, Policy HTTP tests, `Queue::fake()` / `Mail::fake()` / `Storage::fake()`, Pest-style runner lab | [`lab.php`](./chapters/15-testing-with-pest-and-phpunit/lab.php) |
| 16 | [Security, Nginx/cPanel, CI/CD, Reverb & AI SDK](./chapters/16-security-performance-and-production-deployment/README.md) | OWASP checklist, production **Nginx** & **cPanel** (`public_html`) server configs, `optimize`, GitHub Actions CI, Octane, Reverb & L13 AI SDK | — |
| 17 | [Troubleshooting Playbook & CLI Diagnostics](./chapters/17-troubleshooting-and-diagnostics/README.md) | Systematic debugging flow (`artisan about`, `route:list`, `pail`, `queue:failed`), 11 root-cause fixes (`419`, `500`, `2002`, `env()`, `manifest.json`) | — |
| 18 | [Clean Architecture, Scaffolder, Capstone CMS & Roadmap](./chapters/18-clean-architecture-cms-capstone-and-roadmap/README.md) | Feature Action/Service layers, `scripts/laravel_artisan_setup.sh`, **EliteBlog Pro CMS** architecture & 12-week roadmap | — |

---

## Quickstart: Verify Standalone PHP Labs & Scaffolder

Ensure PHP **8.3+** is available, then run:

```bash
php run-all-examples.php
```

Every chapter lab runs cleanly with zero Composer dependencies (`lab-php84.php` and `lab-php85.php` run automatically on PHP 8.4/8.5 and skip cleanly on PHP 8.3).

To preview the CMS scaffolder against any target directory without writing files:

```bash
bash scripts/laravel_artisan_setup.sh --dry-run
```
