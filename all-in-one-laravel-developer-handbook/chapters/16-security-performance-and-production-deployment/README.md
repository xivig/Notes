# Chapter 16 — Security, Performance, Laravel 13 AI SDK & Production Deployment

Shipping a reliable Laravel application requires locking down OWASP vulnerabilities, caching framework manifests cleanly, optimizing PHP OPcache & database indexes, and automating CI/CD rollouts.

---

## 1. Security Checklist (OWASP + Laravel Best Practices)

| Threat | Built-In Laravel Defense | Developer Responsibility |
| :--- | :--- | :--- |
| **SQL Injection** | PDO Prepared Statements across Query Builder & Eloquent | Never interpolate variables inside `DB::raw("... $input")` — always pass bound parameters `[$input]` |
| **XSS (Script Injection)** | Blade `{{ $var }}` escapes HTML entities | Avoid `{!! $raw !!}` unless scrubbed with an HTML Purifier allowlist |
| **CSRF** | `VerifyCsrfToken` (included in `web` middleware) | Include `@csrf` inside every `<form method="POST">` |
| **Mass Assignment** | `Model::$fillable` whitelist (or Laravel 13 `#[Fillable]`) | Never call `Model::create($request->all())` — use `$request->validated()` |
| **IDOR (Broken Object Auth)** | Policies & Gates | Always call `Gate::authorize('update', $model)` before mutating/viewing private rows |
| **Brute Force / Abuse** | RateLimiter (`throttle:api` / `RateLimiter::for(...)`) | Rate-limit login, OTP, and password-reset endpoints |
| **Secrets Leak** | `.env` gitignored & web root = `public/` | Set `APP_DEBUG=false` in production and NEVER expose files above `public/` |

---

## 2. Production Performance & Caching Commands

During zero-downtime deployment (Envoy, Forge, Cloud, Docker), run `php artisan optimize` — or its component commands:

```bash
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan optimize          # Caches config, routes, events, and Blade views together
```

> [!WARNING]
> **Local Development Warning:** Run `php artisan optimize:clear` locally if config/route changes ever appear ignored! Cache artifacts are strictly for staging/production builds.

### PHP & Runtime Tuning
- Enable **PHP OPcache** in production (`opcache.enable=1`, `opcache.validate_timestamps=0` for immutable Docker releases).
- Use **Redis** for sessions (`SESSION_DRIVER=redis`), cache (`CACHE_STORE=redis`), and queues (`QUEUE_CONNECTION=redis`).
- Inspect slow SQL queries with **Laravel Pulse**, **Telescope** (dev), or **Debugbar** (dev), and add database indexes (`->index()`) on filtered/foreign-key columns.
- For high-throughput workloads, deploy with **Laravel Octane** (FrankenPHP / Swoole / RoadRunner) so the framework stays booted in RAM between requests.

---

## 3. Modern Additions: Laravel 13 AI SDK & Real-Time Reverb

### Official Laravel AI SDK (Laravel 13)
Laravel 13 introduced a first-party **Laravel AI SDK** (`laravel/ai`) for building agents, structured outputs, embeddings, vector stores, and streaming chat with the same expressive DX as `Mail` or `Storage` — testable with `Agent::fake()` inside Pest/PHPUnit!

### Real-Time WebSockets with Laravel Reverb
```bash
php artisan install:broadcasting
php artisan reverb:start
```
Broadcast model updates or notifications cleanly over first-party PHP WebSockets without third-party SaaS bills.

---

## 4. CI/CD Quality Gate (`.github/workflows/ci.yml`)

Automate formatting (**Laravel Pint**), static analysis (**Larastan / PHPStan**), and **Pest/PHPUnit** on every pull request:

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
      - run: composer install --no-interaction --prefer-dist
      - run: ./vendor/bin/pint --test
      - run: php artisan test
```

---

## Key Takeaways
- Keep `APP_DEBUG=false` in production, validate inputs via FormRequests, authorize objects via Policies, and lock `public/` as your DocumentRoot.
- Run `composer install --no-dev --optimize-autoloader`, `npm run build`, `php artisan migrate --force`, and `php artisan optimize` on every release.
- Enforce automated style checks (`pint --test`) and Pest/PHPUnit suites on every commit.
