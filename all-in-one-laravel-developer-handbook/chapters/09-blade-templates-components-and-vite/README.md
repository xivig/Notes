# Chapter 09 — Blade Templates, Partials, Deep-Dive Components, Directives & Vite

Complete modern UI guide uniting Blade escaping (`{{ }}`), layouts (`<x-layout>` vs `@extends`), full copy-pasteable **Responsive Admin Shell & Blog Card Grid Partials**, **Class-Based**, **Anonymous (`--view`)**, and **Inline (`--inline`)** components, **`@aware`**, **`<x-slot:header>`**, **`$attributes->class()`**, **`: $shortAttr`**, custom `Blade::directive` in `AppServiceProvider`, and Tailwind v4 + Vite.

---

## 1. XSS Escaping, Loops, Stacks & Layout Choice

| Syntax | Purpose |
| :--- | :--- |
| `{{ $post->title }}` | Automatic `htmlspecialchars` XSS escaping (**default for all user output**) |
| `{!! $trustedHtml !!}` | Unescaped output — ONLY after HTML-Purifier allowlisting |
| `@forelse ($items as $x) ... @empty ... @endforelse` | Clean empty-state iteration (always close with `@endforelse`) |
| `@csrf` / `@method('PATCH')` | CSRF token + HTML form verb spoofing |
| `@error('field')` / `@can('update', $item)` | Validation feedback & policy UI toggles |
| `@push('scripts')` / `@stack('scripts')` / `@once` | Page/component script injection without duplication |

---

## 2. Full Responsive Admin Dashboard Layout & Partials Kit

```bash
php artisan make:component AdminLayout
mv resources/views/components/admin-layout.blade.php resources/views/layouts/admin.blade.php
php artisan make:view admin.partials.head
php artisan make:view admin.partials.sidebar
php artisan make:view admin.partials.header
php artisan make:view admin.partials.footer
```

`app/View/Components/AdminLayout.php`:
```php
<?php

declare(strict_types=1);

namespace App\View\Components;

use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class AdminLayout extends Component
{
    public function __construct(public readonly string $title = 'Control Center | Admin') {}

    public function render(): View
    {
        return view('layouts.admin');
    }
}
```

`resources/views/layouts/admin.blade.php`:
```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @include('admin.partials.head')
    @stack('styles')
</head>
<body class="bg-slate-950 text-slate-100 antialiased">
<div class="admin-layout-wrapper" id="layoutWrapper">
    @include('admin.partials.sidebar')

    <div class="main-content-area">
        @include('admin.partials.header')

        <main class="scrollable-body">
            @if (session('success'))
                <x-alert type="success" :message="session('success')" />
            @endif
            @if (session('error'))
                <x-alert type="error" :message="session('error')" />
            @endif

            {{ $slot }}
        </main>

        @include('admin.partials.footer')
    </div>
</div>
@stack('scripts')
</body>
</html>
```

### Partials (`head.blade.php`, `sidebar.blade.php`, `header.blade.php`, `footer.blade.php`)
```blade
{{-- resources/views/admin/partials/head.blade.php --}}
<style>
    :root { --sidebar-width: 260px; --header-height: 64px; --surface: #111827; --border: #1f2937; }
    .admin-layout-wrapper { display: grid; grid-template-columns: var(--sidebar-width) 1fr; min-height: 100vh; transition: grid-template-columns 0.25s ease; }
    .admin-layout-wrapper.collapsed { --sidebar-width: 76px; }
    .sidebar-wrapper { background: var(--surface); border-right: 1px solid var(--border); padding: 1.25rem 0.9rem; display: flex; flex-direction: column; justify-content: space-between; }
    .main-content-area { display: flex; flex-direction: column; min-width: 0; }
    .header-wrapper { height: var(--header-height); background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; }
    .scrollable-body { flex: 1; padding: 1.75rem; }
    @media (max-width: 768px) {
        .admin-layout-wrapper { grid-template-columns: 1fr; }
        .sidebar-wrapper { position: fixed; inset: 0 auto 0 -100%; width: 250px; z-index: 50; transition: left 0.25s ease; }
        .sidebar-wrapper.mobile-active { left: 0; }
    }
</style>

{{-- resources/views/admin/partials/sidebar.blade.php --}}
<aside class="sidebar-wrapper" id="sidebar">
    <div>
        <div class="font-bold text-lg text-rose-500 mb-6 px-2">Admin Portal</div>
        <nav class="flex flex-col gap-1 text-sm">
            <a href="{{ route('admin.dashboard') }}" @class(['px-3 py-2 rounded-lg', 'bg-rose-500/15 text-white' => request()->routeIs('admin.dashboard')])>Dashboard</a>
            <a href="{{ route('posts.index') }}" @class(['px-3 py-2 rounded-lg', 'bg-rose-500/15 text-white' => request()->routeIs('posts.*')])>Posts</a>
        </nav>
    </div>
    <form action="{{ route('admin.logout') }}" method="POST">
        @csrf
        <button type="submit" class="w-full text-left px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg">
            Sign Out
        </button>
    </form>
</aside>

{{-- resources/views/admin/partials/header.blade.php --}}
<header class="header-wrapper">
    <button type="button" class="toggle-btn text-xl px-2 py-1 rounded border border-slate-700" onclick="toggleSidebar()">&#9776;</button>
    <span class="text-sm font-medium">{{ auth('admin')->user()?->name ?? 'Administrator' }}</span>
</header>

{{-- resources/views/admin/partials/footer.blade.php --}}
<footer class="border-t border-slate-800 px-6 py-4 text-xs text-slate-400 text-center">
    &copy; {{ date('Y') }} Powered by Laravel
</footer>
```

### Public Blog Grid Layout (`resources/views/layouts/blog.blade.php`)
```blade
@props(['title' => 'DevBlog'])

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
    <main class="max-w-6xl w-full mx-auto px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {{ $slot }}
    </main>
</body>
</html>
```

---

## 3. Blade Components: Class-Based, Anonymous (`--view`) & Inline (`--inline`)

| Style | Artisan Command | When to Use |
| :--- | :--- | :--- |
| **Class-Based** | `php artisan make:component Alert` | Computed helper logic, constructor dependencies, backend state |
| **Anonymous (`--view`)** | `php artisan make:component forms.input --view` | Markup-only form controls, cards, badges (`@props`, `$attributes`) |
| **Inline (`--inline`)** | `php artisan make:component AlertBox --inline` | Compact single-file PHP component returning inline markup |

### Class-Based Alert (`app/View/Components/Alert.php` + `resources/views/components/alert.blade.php`)
```php
final class Alert extends Component
{
    public function __construct(
        public readonly string $type = 'info',
        public readonly string $message = '',
    ) {}

    public function paletteClass(): string
    {
        return match ($this->type) {
            'success' => 'border-emerald-600 bg-emerald-950/60 text-emerald-200',
            'error' => 'border-rose-600 bg-rose-950/60 text-rose-200',
            default => 'border-indigo-600 bg-indigo-950/60 text-indigo-200',
        };
    }

    public function render(): View
    {
        return view('components.alert');
    }
}
```
```blade
<div {{ $attributes->merge(['class' => 'rounded-lg border px-4 py-3 mb-4 text-sm ' . $paletteClass()]) }}>
    {{ $message ?: $slot }}
</div>
```

### Anonymous Input (`resources/views/components/forms/input.blade.php`) + `@aware` & Short Syntax
```blade
@props(['name', 'label' => null, 'type' => 'text', 'value' => ''])

<div class="space-y-1">
    <label for="{{ $name }}" class="block text-sm font-medium">
        {{ $label ?? ucfirst(str_replace('_', ' ', $name)) }}
    </label>
    <input
        id="{{ $name }}"
        name="{{ $name }}"
        type="{{ $type }}"
        value="{{ old($name, $value) }}"
        {{ $attributes->class(['w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2', 'border-rose-500' => $errors->has($name)]) }}
    >
    @error($name)
        <p class="text-xs text-rose-400">{{ $message }}</p>
    @enderror
</div>
```

- **Short Attribute Syntax**: `<x-profile :$userId />` instead of `<x-profile :user-id="$userId" />`.
- **Named Slots**: `<x-slot:header><h1>Title</h1></x-slot:header>`.
- **`@aware(['density' => 'compact'])`**: Child components inherit parent props without manual prop forwarding.
- **Custom Directives in `AppServiceProvider::boot()`**:
  ```php
  Blade::directive('truncate', function (string $expression): string {
      return "<?php echo e(\\Illuminate\\Support\\Str::limit({$expression})); ?>";
  });
  ```
  Run `php artisan view:clear` after modifying directives.

---

## 4. Tailwind v4, Vite Asset Pipeline & Responsive Drawer JS

```css
/* resources/css/app.css (Tailwind v4) */
@import "tailwindcss";
```
```javascript
// resources/js/app.js
const wrapper = document.getElementById('layoutWrapper');
const sidebar = document.getElementById('sidebar');

window.toggleSidebar = () => {
    if (window.innerWidth <= 768) {
        sidebar?.classList.toggle('mobile-active');
    } else {
        wrapper?.classList.toggle('collapsed');
    }
};

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar?.classList.contains('mobile-active') && !sidebar.contains(e.target) && !e.target.closest('.toggle-btn')) {
        sidebar.classList.remove('mobile-active');
    }
});
```
Run `npm run dev` during local coding and `npm run build` ahead of production deployment (`public/build/manifest.json`).
