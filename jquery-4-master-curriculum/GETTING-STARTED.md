# 🚀 Getting Started with jQuery 4.0

Welcome to **jQuery 4.0.0** — the modernized, high-performance edition of the world's most widely deployed JavaScript library. This guide gets you up and running in under 5 minutes.

---

## ⚡ 5-Minute Quickstart

The fastest way to experiment with jQuery 4.0 is via an official CDN script tag in an HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First jQuery 4.0 App</title>
  <!-- Load jQuery 4.0.0 from official CDN -->
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <h1 id="greeting">Hello, World!</h1>
  <button id="btnAction">Click Me</button>

  <script>
    // Modern Document Ready shorthand
    $(function() {
      // Modern event binding using .on() (never use deprecated .click())
      $('#btnAction').on('click', function() {
        $('#greeting')
          .text('Welcome to Modern jQuery 4.0!')
          .css({ color: '#2563eb', transition: 'color 0.3s' });
      });
    });
  </script>
</body>
</html>
```

Save this as `index.html` and double-click to open it in any modern browser!

---

## 📦 Installation Strategies

Depending on your project's architecture, choose the best installation method:

### 1. Content Delivery Network (CDN) — Recommended for Quick Scripts & SSR
Fastest setup with zero build step. Always include Subresource Integrity (SRI) for security:
```html
<script 
  src="https://code.jquery.com/jquery-4.0.0.min.js" 
  integrity="sha256-..." 
  crossorigin="anonymous">
</script>
```

### 2. Modern Package Managers (NPM / PNPM / Yarn) — Recommended for Vite / Webpack
Install directly into your application dependency graph:
```bash
npm install jquery@4.0.0
npm install --save-dev @types/jquery
```

Then import it natively as an ES Module:
```javascript
import $ from 'jquery';

$(function() {
  console.log('jQuery 4.0 initialized via ES Modules!');
});
```

### 3. The Slim Build — Recommended for Tailwind / CSS-Animation Projects
If your project handles animations via CSS transitions and networking via native `fetch()`, use the **Slim build**, which strips out legacy effects and AJAX to reduce bundle size by ~25%:
```html
<script src="https://code.jquery.com/jquery-4.0.0.slim.min.js"></script>
```

---

## 🧠 The Modern jQuery 4.0 Mindset

If you learned jQuery years ago, keep these three essential modern principles in mind:

1. **jQuery is not a framework; it is an ergonomic DOM utility**:
   You do not need jQuery for simple tasks that native JavaScript handles easily (e.g. `Array.isArray()`, `str.trim()`). Use jQuery where its chainable collections, event delegation, and cross-browser geometry calculations save dozens of lines of boilerplate.

2. **Zero Deprecated Shorthands**:
   Never write `.click(fn)`, `.hover(fn)`, `.focus(fn)`, or `$.trim()`. In jQuery 4.0, all event shortcuts have been removed in favor of standard `.on()` and `.off()`.

3. **Native Selector Routing**:
   jQuery 4.0 delegates directly to the browser's native `document.querySelectorAll()`. Prefer standard CSS selectors (`:first-child`, `:nth-child()`) over legacy pseudo-selectors (`:first`, `:even`).

---

## 🗺️ Next Steps in Your Learning Journey

- 📖 Follow the structured [Learning Roadmap](LEARNING-ROADMAP.md).
- 📑 Keep the [Developer Cheatsheet](CHEATSHEET.md) handy on your desk.
- 📚 Dive into [Module 01: Fundamentals](01-fundamentals/README.md).
- 🛠️ Explore the hands-on [Projects](projects/) directory.
