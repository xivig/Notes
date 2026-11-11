# Chapter 07 — Laravel 12/13 Installation, Directory Structure & Starter Kits

Modern Laravel streamlines bootstrapping so you can go from zero to a live database-backed application (complete with authentication, Vite asset bundling, and testing) in minutes.

---

## 1. Prerequisites & Tooling (Laravel 12 / 13)

Before creating a project, verify your environment meets modern requirements:
- **PHP**: `8.3+` required for Laravel 13 (`8.2+` for Laravel 12; both support PHP 8.3–8.5). Essential extensions enabled (`pdo_sqlite`, `mbstring`, `openssl`, `curl`, `xml`, `zip`, `ctype`, `fileinfo`).
- **Composer 2.x**: Dependency manager (`composer --version`).
- **Node.js & NPM**: Frontend asset bundling via Vite (`node -v && npm -v`).
- **Local Stack Options**: **Laravel Herd** (macOS/Windows one-click PHP/Nginx/SQLite), **Laragon** (Windows), or **Laravel Sail** (Docker).

```bash
php -v
composer -V
node -v
```

---

## 2. Creating a New Application

### Option A: Official Laravel Installer (Recommended)
Install the global Laravel installer once via Composer:

```bash
composer global require laravel/installer
laravel new my-laravel-app
```

During `laravel new`, the interactive CLI asks you to choose:
1. **Starter Kit**: None, **React** (Inertia 2 + TypeScript + Tailwind + shadcn/ui), **Vue** (Inertia 2 + Tailwind + shadcn-vue), or **Livewire** (Livewire 4 + Flux UI + Volt), with optional **Laravel WorkOS AuthKit** (SSO/Passkeys).
2. **Testing Framework**: **Pest** (expressive, default in modern starter kits) or **PHPUnit**.
3. **Database Engine**: **SQLite** (zero-config default!), PostgreSQL, MySQL, or MariaDB.

### Option B: Via Composer Directly
```bash
composer create-project laravel/laravel my-laravel-app
cd my-laravel-app
```

---

## 3. Streamlined Laravel 11 / 12 / 13 Project Layout

Starting in Laravel 11 and continuing through Laravel 12 & 13, redundant boilerplate folders (`app/Console/Kernel.php`, `app/Http/Middleware/*`, `app/Exceptions/Handler.php`, extra config stubs) were removed cleanly:

```text
my-laravel-app/
├── app/
│   ├── Http/
│   │   └── Controllers/       # Web & API controllers
│   ├── Models/                # Eloquent ORM models (User.php, Post.php...)
│   └── Providers/
│       └── AppServiceProvider.php
├── bootstrap/
│   └── app.php                # Central routing, middleware, and exception hooks
├── config/                    # Minimal configuration (customize via config:publish)
├── database/
│   ├── factories/             # Model factories for seeders & tests
│   ├── migrations/            # Version-controlled schema files
│   ├── seeders/               # Sample & reference data seeders
│   └── database.sqlite        # Default zero-config local database
├── public/
│   └── index.php              # Web server DocumentRoot (NEVER expose project root!)
├── resources/
│   ├── css/app.css            # Tailwind v4 / CSS entry
│   ├── js/app.js              # Vite JS entry
│   └── views/                 # Blade templates & components
├── routes/
│   ├── web.php                # Session + CSRF web routes
│   └── console.php            # Artisan closure commands & Task Scheduler
├── tests/                     # Feature & Unit tests (Pest / PHPUnit)
├── .env                       # Local secrets & environment variables (gitignored)
└── artisan                    # CLI runner
```

> [!IMPORTANT]
> **API & Real-Time Scaffolding Are Opt-In**
> Need REST API routes or WebSockets? Run:
> ```bash
> php artisan install:api          # Adds routes/api.php & Laravel Sanctum
> php artisan install:broadcasting # Adds Laravel Reverb WebSocket server
> ```

---

## 4. First Boot & Development Commands

Modern Laravel includes a unified `composer run dev` script (in starter kits / fresh installs) that launches the PHP server, queue worker, log tail (`Pail`), and Vite dev server concurrently:

```bash
# 1. Unified dev command (HTTP + Queue + Logs + Vite)
composer run dev

# OR launch processes manually in separate terminals:
php artisan serve     # http://127.0.0.1:8000
npm run dev           # Hot-reloading Vite asset server
php artisan queue:work
```

### Everyday Artisan Setup Commands
```bash
php artisan migrate           # Run database migrations
php artisan migrate:fresh --seed  # Wipe DB, re-run migrations + DatabaseSeeder
php artisan route:list        # Inspect all registered URLs, methods & middleware
php artisan tinker            # Interactive PHP REPL booted inside your Laravel app
php artisan config:publish    # Publish default config files if you need to edit them
```

---

## Key Takeaways
- Prefer `laravel new` with SQLite + Pest for instant zero-config local setup.
- All middleware, exception rules, and route paths live centrally in `bootstrap/app.php`.
- Always point Nginx/Apache/Herd at `public/` so `.env` and `vendor/` remain unreachable over HTTP.
