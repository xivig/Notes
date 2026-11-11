# Chapter 17 — Troubleshooting Playbook & CLI Diagnostics

Diagnose Laravel development, multi-guard auth, Vite, SQL, and production deployment errors systematically instead of guessing or clearing caches blindly.

---

## 1. Essential Diagnostic Commands First

```bash
php artisan about                              # Active PHP version, drivers, caches & APP_DEBUG mode
php artisan route:list --except-vendor         # Exact URIs, HTTP verbs, route names & middleware
php artisan migrate:status                     # Pending vs applied schema migration batches
php artisan queue:failed                       # Failed background jobs + full exception traces
php artisan pail                               # Real-time colorized application logs (Laravel 11+)
php artisan optimize:clear                     # Clears config, route, view & event caches locally
```

**Debugging Rule:** Capture the exact HTTP method/URL/payload, read `storage/logs/laravel.log`, change ONE variable at a time, and add a regression Feature test before closing the fix. Never apply `chmod 777` or run `migrate:fresh` on real data.

---

## 2. Root-Cause Troubleshooting Reference Table

| Symptom | Most Likely Root Cause | Exact Fix |
| :--- | :--- | :--- |
| **HTTP 500 Internal Server Error** | Runtime PHP exception, missing `APP_KEY`, missing extension, unwritable `storage/` | Inspect `storage/logs/laravel.log` & PHP logs; run `php artisan about`; keep `APP_DEBUG=false` in production |
| **HTTP 419 Page Expired** | Missing `@csrf` token, wrong `SESSION_DOMAIN`, HTTPS proxy mismatch, unwritable sessions | Add `@csrf` in mutation & logout forms; verify `.env` `APP_URL`, `SESSION_SECURE_COOKIE`, and writable `storage/framework/sessions` |
| **HTTP 404 / Route Not Defined** | Stale route cache, verb mismatch (`GET` vs `POST`), missing Nginx `try_files` rewrite | Run `php artisan route:list --except-vendor`; confirm `try_files $uri $uri/ /index.php?$query_string;`; clear routes locally |
| **`SQLSTATE[HY000] [2002]`** | DB stopped, wrong `DB_HOST` (`127.0.0.1` vs `localhost` socket vs Docker service), missing PDO driver | Confirm DB service running, verify `.env` `DB_*` credentials, verify `pdo_mysql`/`pdo_sqlite` in `php -m` |
| **Target Class Does Not Exist** | Namespace/folder mismatch, Linux case-sensitivity mismatch, stale Composer classmap | Match PSR-4 path (`App\Http\Middleware\AdminMiddleware` -> `app/Http/Middleware/AdminMiddleware.php`) & run `composer dump-autoload` |
| **`Vite manifest not found`** | Assets not compiled (`public/build/manifest.json` missing) while `npm run dev` is off | Run `npm install && npm run dev` locally or build & deploy `public/build/` via `npm run build` |
| **Uploaded Images Return 404** | Missing `public/storage` symlink or saving to private `local` disk instead of `public` | Run `php artisan storage:link`; verify uploads call `->store('folder', 'public')` & URLs use `Storage::url($path)` |
| **Admin Guard Loads `User` Model** | Wrapping `admins` provider in `env('AUTH_MODEL', ...)` inside `config/auth.php` | Hardcode `'model' => App\Models\Admin::class`, regenerate session on login, invalidate on logout |
| **`env()` Returns `null` in Production** | Calling `env()` outside `config/*.php` after running `php artisan config:cache` | Move every `env()` read into `config/*.php` and read via `config('file.key')` everywhere |
| **Queued Jobs Stay Pending** | Jobs queued (`QUEUE_CONNECTION=database`) without running worker or scheduler cron | Run `php artisan queue:work --tries=3`, check `queue:failed`, or schedule `--stop-when-empty` cron on cPanel |
| **Permission Denied (`storage/`, `bootstrap/cache/`)** | Web server process user lacks write ownership | Assign runtime owner (`chown -R www-data:www-data storage bootstrap/cache`) & `775` dirs — never `777` |
