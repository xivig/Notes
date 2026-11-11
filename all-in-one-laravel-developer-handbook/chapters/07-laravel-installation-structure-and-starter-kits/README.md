# Chapter 07 — Laravel 12/13 Versions, Setup, Directory Layout & Starter Kits

Choose the right Laravel release, verify PHP/Composer/Node prerequisites, pick an official Starter Kit via `laravel new`, and master Laravel's streamlined HTTP request lifecycle from `public/index.php`.

---

## 1. Laravel Version Support Matrix & Prerequisites

| Release | Minimum PHP | Release Date | Security Fixes Until | Recommendation |
| :--- | :---: | :---: | :---: | :--- |
| **Laravel 13** | **PHP 8.3+** | 17 Mar 2026 | 17 Mar 2028 | **Default choice** for new apps (PHP Attributes, AI SDK, PHP 8.3–8.5) |
| **Laravel 12** | **PHP 8.2–8.5** | 24 Feb 2025 | 24 Feb 2027 | Compatibility bridge when hosting restricts PHP to 8.2; plan upgrade |

Before bootstrapping a project, verify your environment (`Laravel Herd` on Windows/macOS, `Laragon`, or `Laravel Sail` Docker):
```bash
php -v          # PHP 8.3+ recommended
composer -V     # Composer 2.x
node -v && npm -v
```

---

## 2. Creating a New App & Choosing Starter Kits

### Official Laravel Installer (Recommended)
```bash
composer global require laravel/installer
laravel new my-laravel-app
```

`laravel new` configures your stack interactively:
- **Livewire Starter Kit**: Livewire 4 + Flux UI + Volt (reactive server-rendered PHP directly in Blade).
- **React Starter Kit**: Inertia 2 + TypeScript + Tailwind CSS v4 + shadcn/ui.
- **Vue Starter Kit**: Inertia 2 + TypeScript + Tailwind CSS v4 + shadcn-vue.
- **WorkOS AuthKit (`--workos`)**: Pre-wired enterprise SSO, passkeys, and social auth.
- **Database & Tests**: SQLite (zero-config default) / MySQL / PostgreSQL + **Pest** or PHPUnit.

### Alternative Direct Composer Setup
```bash
composer create-project laravel/laravel my-laravel-app
cd my-laravel-app
npm install && npm run build
composer run dev   # Runs HTTP server, Queue worker, Pail logs & Vite concurrently
```

> [!IMPORTANT]
> Commit `composer.lock` and `package-lock.json` for deterministic deployments across dev, CI, and production — NEVER commit `.env` or `/vendor`.

---

## 3. Streamlined Laravel 11 / 12 / 13 Directory Layout & Request Lifecycle

Every request enters **`public/index.php`** (`public/` MUST be the web server DocumentRoot so `.env`, `vendor/`, and `storage/` remain unreachable over HTTP):

```text
my-laravel-app/
├── app/
│   ├── Actions/               # Single-purpose domain use cases
│   ├── Http/Controllers/      # Web & API controllers
│   ├── Models/                # Eloquent ORM models (User.php, Post.php...)
│   └── Providers/
│       └── AppServiceProvider.php
├── bootstrap/
│   ├── app.php                # Central routing, middleware aliases & exception hooks
│   └── providers.php          # Registered application service providers
├── config/                    # Framework & package config (ONLY place to call env())
├── database/
│   ├── factories/             # Model factories (Faker)
│   ├── migrations/            # Version-controlled schema files
│   ├── seeders/               # Sample & baseline seeders
│   └── database.sqlite        # Default zero-config local database
├── public/                    # Public DocumentRoot: index.php, build/, storage symlink
├── resources/                 # Uncompiled Blade views, components, layouts, CSS/JS
├── routes/                    # web.php, console.php (Artisan + Scheduler), api.php (opt-in)
├── storage/                   # Logs, file caches, sessions & private uploads
└── tests/                     # Feature & Unit tests (Pest / PHPUnit)
```

### Opt-In APIs & Real-Time WebSockets
```bash
php artisan install:api          # Installs Laravel Sanctum + routes/api.php
php artisan install:broadcasting # Installs Laravel Reverb WebSockets
php artisan storage:link         # Creates public/storage -> storage/app/public
php artisan about                # Displays active PHP, drivers, environment & cache status
php artisan tinker               # Interactive REPL booted inside the Laravel container
```
