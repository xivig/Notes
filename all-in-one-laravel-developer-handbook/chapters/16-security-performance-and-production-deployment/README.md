# Chapter 16 — Security, Nginx / cPanel Server Configs, CI/CD, Reverb & Laravel 13 AI SDK

Hardened production security checklist alongside copy-pasteable **Nginx virtual host block**, **shared hosting / cPanel `public_html` setup**, **GitHub Actions CI `.yml`**, **OPcache & `artisan optimize`**, **Laravel Reverb WebSockets**, and **Laravel 13 AI SDK**.

---

## 1. Layered Security Engineering Checklist

| Threat / Layer | Mandatory Safeguard | Verification |
| :--- | :--- | :--- |
| **Web Root & Secrets** | Point DocumentRoot strictly to **`public/`**; set `APP_DEBUG=false`, `APP_ENV=production` | Request `https://yourdomain/.env` -> must return `404` |
| **SQL & XSS** | Bind `?` parameters on raw SQL; use Blade `{{ $var }}` (never unescaped `{!! !!}`) | Audit `DB::raw`, `whereRaw`, `{!!` |
| **CSRF & Sessions** | Keep `VerifyCsrfToken` enabled (`@csrf` + `POST` logouts); `SESSION_SECURE_COOKIE=true`, `httpOnly` | Confirm no GET logout routes exist |
| **IDOR & Mass Assignment** | Call `Gate::authorize(...)` on every private read/edit/delete; keep `$fillable` + `$request->validated()` | Feature tests assert `403` for non-owners |
| **Uploads & Packages** | Validate MIME/size, use generated filenames, store private files on `local` disk | Run `composer audit` & `npm audit` cleanly |

---

## 2. Production Nginx Site Configuration (`/etc/nginx/sites-available/laravel.conf`)

```nginx
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/laravel_app/public;
    index index.php;

    charset utf-8;
    client_max_body_size 10M;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

---

## 3. Shared Hosting / cPanel Layout (`public_html`)

1. Confirm cPanel PHP Selector >= `8.3` (`Laravel 13`) + extensions (`pdo_mysql`, `mbstring`, `openssl`, `ctype`, `xml`, `fileinfo`, `bcmath`, `curl`).
2. Keep app source **above `public_html/`** at `/home/cpaneluser/laravel_app/`.
3. Point domain DocumentRoot to `/home/cpaneluser/laravel_app/public` when supported — OR place `public/*` inside `public_html/` and update `/home/cpaneluser/public_html/index.php`:
   ```php
   require __DIR__.'/../laravel_app/vendor/autoload.php';
   $app = require_once __DIR__.'/../laravel_app/bootstrap/app.php';
   ```
4. Never set `chmod 777`! Use `755` directories / `644` files (`storage` and `bootstrap/cache` writable by PHP runtime user).

---

## 4. Zero-Downtime Release Commands & GitHub Actions CI

```bash
php artisan down --retry=60
git pull --ff-only origin main
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan storage:link
php artisan optimize          # Caches config, routes, events & Blade views together
php artisan about
php artisan up
```
> Run `php artisan optimize:clear` locally if changes appear cached. **Never** run `migrate:fresh` in production!

### CI Pipeline (`.github/workflows/ci.yml`)
```yaml
name: Laravel CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: shivammathur/setup-php@v2
        with:
          php-version: '8.4'
          extensions: pdo_sqlite, mbstring, openssl, xml, curl
      - run: composer install --no-interaction --prefer-dist
      - run: cp .env.example .env && php artisan key:generate
      - run: ./vendor/bin/pint --test
      - run: composer audit
      - run: php artisan test
```

---

## 5. Laravel 13 AI SDK, Reverb WebSockets & Octane
- **Laravel AI SDK (Laravel 13)**: First-party `laravel/ai` package supporting structured outputs, embeddings, vector stores, and `Agent::fake()` in automated tests.
- **Laravel Reverb**: `php artisan install:broadcasting && php artisan reverb:start` for real-time WebSockets without external SaaS fees.
- **Laravel Octane**: Keeps the framework booted in RAM across FrankenPHP/Swoole workers (use container `scoped()` bindings cleanly).

---

## 6. Docker / Laravel Sail & Observability (`Horizon`, `Pulse`, `Telescope`)

### A. Local Containers with Laravel Sail (`compose.yaml`)
```bash
# Install Sail inside an existing project (PHP + MySQL/PostgreSQL + Redis + Mailpit)
composer require laravel/sail --dev
php artisan sail:install --with=pgsql,redis,mailpit
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate --seed
./vendor/bin/sail test
```

### B. Monitoring & Debugging Packages
| Package | Environment | Role | Install & Protect |
| :--- | :--- | :--- | :--- |
| **Laravel Horizon** | Production (Redis queues) | Queue throughput, retry UI, worker balancing | `composer require laravel/horizon && php artisan horizon:install`; gate with `Horizon::auth()` |
| **Laravel Pulse** | Production | Slow queries, slow requests, cache hits, server CPU/RAM | `composer require laravel/pulse && php artisan pulse:install`; gate dashboard with `Gate::define('viewPulse', ...)` |
| **Laravel Telescope** | Local / Dev only | Deep inspection of every SQL query, request, mail, exception | `composer require laravel/telescope --dev && php artisan telescope:install` (never expose publicly in production) |
