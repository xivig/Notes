# Chapter 09 — Blade Templates, Reusable Components & Vite

Blade is Laravel's compiled PHP templating engine. It compiles views down to cached vanilla PHP with zero runtime overhead, enforces **automatic XSS escaping**, and offers both **Layout Inheritance (`@extends`)** and modern **Tag-Based Components (`<x-layout>`)**.

---

## 1. XSS Escaping: `{{ }}` vs `{!! !!}`

| Syntax | Behavior | Use Case |
| :--- | :--- | :--- |
| `{{ $user->bio }}` | Runs `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')` | **Default for ALL user input!** Prevents `<script>` injection |
| `{!! $trustedHtml !!}` | Outputs raw unescaped HTML | ONLY after strict HTML sanitization (never raw user input!) |
| `@{{ variable }}` | Tells Blade to ignore braces | Passing mustache braces cleanly to Vue / Alpine.js |

---

## 2. Modern Component Layouts (`<x-layouts.app>`) vs `@extends`

Modern Laravel starter kits favor **Blade Components** (`resources/views/components/layouts/app.blade.php`) because props, attributes (`$attributes->merge([...])`), and slots are explicit and composable:

### Component Layout (`resources/views/components/layouts/app.blade.php`)
```blade
@props(['title' => 'Apex Studio'])

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title }} — Creative Agency</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen bg-slate-950 text-slate-100 antialiased flex flex-col">
    <header class="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <a href="{{ route('home') }}" class="font-bold text-indigo-400">Apex Studio</a>
        <nav class="flex gap-6 text-sm">
            <a href="{{ route('home') }}" class="{{ request()->routeIs('home') ? 'text-white font-semibold' : 'text-slate-400' }}">Home</a>
            <a href="{{ route('services') }}" class="{{ request()->routeIs('services') ? 'text-white font-semibold' : 'text-slate-400' }}">Services</a>
            <a href="{{ route('contact') }}" class="{{ request()->routeIs('contact') ? 'text-white font-semibold' : 'text-slate-400' }}">Contact</a>
        </nav>
    </header>

    <main class="flex-1 max-w-5xl w-full mx-auto px-6 py-10">
        {{ $slot }}
    </main>

    <footer class="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        &copy; {{ date('Y') }} Apex Studio
    </footer>
</body>
</html>
```

### Consuming the Layout Component (`resources/views/pages/services.blade.php`)
```blade
<x-layouts.app title="Our Services">
    <h1 class="text-3xl font-bold mb-6">Engineering Services</h1>

    <div class="grid md:grid-cols-3 gap-6">
        @forelse($services as $service)
            <article class="rounded-xl border border-slate-800 bg-slate-900 p-6">
                <h2 class="text-lg font-semibold text-indigo-300">{{ $service['title'] }}</h2>
                <p class="mt-2 text-sm text-slate-400">{{ $service['desc'] }}</p>
            </article>
        @empty
            <p class="text-slate-400">No services listed yet.</p>
        @endforelse
    </div>
</x-layouts.app>
```

> [!NOTE]
> Notice `@forelse ... @empty ... @endforelse`! Always close with `@endforelse` (never a duplicate `@forelse`), otherwise Blade throws a syntax error when compiling the view.

### Classic `@extends` / `@section` Inheritance
You will also frequently encounter traditional layout inheritance in existing projects:
```blade
{{-- resources/views/layouts/master.blade.php --}}
<main>@yield('content')</main>

{{-- resources/views/child.blade.php --}}
@extends('layouts.master')
@section('content')
    <h1>Hello!</h1>
@endsection
```

---

## 3. Essential Blade Directives Cheat Table

| Directive | Purpose |
| :--- | :--- |
| `@csrf` | Injects hidden CSRF token field inside every `<form method="POST">` |
| `@method('PATCH')` / `@method('DELETE')` | Spoofs HTTP verbs for HTML forms (which natively only support GET/POST) |
| `@error('title') ... @enderror` | Renders validation error message for field `'title'` |
| `@class(['p-4', 'bg-emerald-50' => $isPaid])` | Conditional CSS classes cleanly |
| `@auth` / `@guest` | Toggle UI based on authenticated session |
| `@can('update', $task)` | Check Policy permission before showing Edit/Delete buttons |

---

## 4. Asset Bundling with Vite (`vite.config.js`)

Laravel ships with Vite + Tailwind CSS out of the box. Inside `resources/css/app.css` (Tailwind v4 syntax in Laravel 12/13):

```css
@import "tailwindcss";
```

In development run `npm run dev` (instant Hot Module Replacement). Before deploying to production, run `npm run build` to compile fingerprinted CSS/JS bundles into `public/build/manifest.json` — `@vite([...])` automatically switches between the dev server and production manifest!

---

## Key Takeaways
- Always render untrusted strings with `{{ ... }}`, reserving `{!! ... !!}` solely for sanitized HTML.
- Use `<x-component>` anonymous Blade components (`resources/views/components/`) for buttons, alerts, cards, and layouts.
- Never forget `@csrf` and `@method('PUT'|'DELETE')` in Blade mutation forms.
