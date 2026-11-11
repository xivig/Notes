# Chapter 18 — Clean Architecture, Automated Scaffolder, Capstone CMS & 12-Week Roadmap

Bring every pattern in this handbook together using layered domain boundaries, automated batch CMS scaffolding ([`laravel_artisan_setup.sh`](../../scripts/laravel_artisan_setup.sh)), the **EliteBlog Pro CMS** capstone build, and a 12-week progression plan.

---

## 1. Clean Feature Architecture & Engineering Standards

```text
app/
├── Actions/Posts/PublishPostAction.php   # Wrapped in DB::transaction()
├── Http/Controllers/Admin/PostController.php
├── Http/Requests/StorePostRequest.php
├── Http/Resources/PostResource.php
├── Models/Post.php
├── Policies/PostPolicy.php
└── Services/MediaService.php
```
- Extract focused `Action` / `Service` classes wrapped in `DB::transaction(fn () => ...)` when multi-model writes, uploads, and events combine.
- Skip abstract Repository interfaces for standard Eloquent apps — Eloquent scopes, casts, and relations already serve as a clean data boundary.
- Enforce `unique()`, `foreignId()->constrained()`, and `NOT NULL` constraints at the database level alongside `FormRequest` validation.

---

## 2. Batch CMS Scaffolding Script (`scripts/laravel_artisan_setup.sh`)

Preview or execute the bundled scaffolder from any fresh Laravel project root to generate `AdminLayout`, `HomeLayout`, `BlogLayout`, partials across 5 roles (`admin`, `user`, `tutor`, `blog`, `home`), anonymous `--view` form components (`forms.input`, `label`, `button`, etc.), and `Admin`, `Author`, `Gallery`, `Category`, `Comment`, `Post`, and `Tag` models (`-mfs`) + Admin resource controllers:

```bash
bash scripts/laravel_artisan_setup.sh --dry-run
```

---

## 3. Capstone Blueprint — EliteBlog Pro CMS

### Functional Modules & Suggested Schema
- **Auth & RBAC**: Verified users + Admin multi-guard dashboard, `roles`/`permissions`/`role_user`/`permission_role` tables, activity audit logs.
- **Editorial Workflow**: `posts`, `pages`, `categories`, `tags`, `category_post`, `post_tag`, `galleries`, `media`, `comments`, `post_revisions` (draft -> review -> scheduled -> published), `newsletter_subscribers`, `settings`.
- **SEO & API**: Canonical URLs, Open Graph metadata, queued XML sitemap (`GenerateSitemapJob`), Sanctum REST API + `PostResource` + rate limiting.

### Definition of Done
1. Server-side Policies (`Gate::authorize`) protect every mutation & private download.
2. Validated inputs (`FormRequest`), eager-loaded queries (`Model::preventLazyLoading()`), and randomized protected uploads.
3. Passing Pest Feature suite covering guest, owner, unauthorized intruder (`403`), and Sanctum API flows.
4. `APP_DEBUG=false`, tested backup/restore, CI checks green (`pint --test` & `php artisan test`), and repeatable `artisan optimize` rollout.

---

## 4. Hands-On Practice Builds & 12-Week Roadmap

| Weeks | Focus | Deliverable |
| :---: | :--- | :--- |
| **1–2** | PHP 8.3+, Container DI, Lifecycle, Routing & Controllers | Agency Landing Page (Demo 1) |
| **3–4** | Blade Components, Partials, Vite, Migrations & Faker Seeders | Paginated Database CRUD App |
| **5–6** | Eloquent Relations (`1:1`, `1:N`, `N:N`), N+1 Fix & Uploads | DevBlog Manager (Demo 2) |
| **7–8** | Policies, RBAC, Multi-Guard Auth (`web` + `admin`), Security | Guarded Task Manager & Admin Portal |
| **9–10** | Sanctum APIs, Mail, Queues (`ShouldQueue`/`defer()`), Cache | REST API + Queued Job Pipeline |
| **11–12** | Pest/PHPUnit Fakes, Nginx/cPanel Deploy, CI & Capstone | Live **EliteBlog Pro CMS** |
