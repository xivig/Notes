# ⚡ Module 15: Modern JavaScript Integration

Integrate jQuery 4.0 into modern JavaScript architectures: ES Modules, TypeScript static typing, Vite and Webpack bundlers, Bootstrap 5, Laravel Blade with CSRF protection, and WordPress `noConflict()`.

---

### 1. Objective
Successfully import and bundle jQuery 4.0 in modern front-end build pipelines (Vite, TypeScript), integrate with Bootstrap 5 component classes, configure Laravel CSRF tokens, and resolve WordPress `noConflict()` collisions.

### 2. Explanation

#### 1. ES Modules & TypeScript:
jQuery 4.0 natively supports ES Module exports. In TypeScript projects:
```bash
npm install jquery@4.0.0
npm install --save-dev @types/jquery
```
Import directly: `import $ from 'jquery';`.

#### 2. Bootstrap 5 Integration:
Bootstrap 5 dropped internal jQuery methods, re-architecting its widgets as native JavaScript classes (`new bootstrap.Modal()`). To control Bootstrap 5 via jQuery:
- Pass the raw DOM node: `const modal = new bootstrap.Modal($('#myModal')[0]);`.
- Listen to Bootstrap events via jQuery: `$('#myModal').on('shown.bs.modal', fn);`.

#### 3. Laravel Blade & CSRF:
Laravel requires an `X-CSRF-TOKEN` HTTP header on all state-altering requests (`POST`, `PUT`, `DELETE`). Configure this once globally:
```javascript
$.ajaxSetup({
  headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
});
```

#### 4. WordPress `noConflict()` Mode:
WordPress runs jQuery in `noConflict()` mode by default, disabling the global `$` alias to prevent conflicts. Wrap scripts safely:
```javascript
jQuery(document).ready(function($) {
  // '$' is safe to use here!
});
```

### 3. Syntax
```typescript
// TypeScript ES Module Import
import $ from 'jquery';

const $btn: JQuery<HTMLButtonElement> = $('#myBtn');
$btn.on('click', (e: JQuery.ClickEvent) => {
  console.log('Typed click event!');
});
```

### 4. Parameters
- `JQuery<HTMLElement>`: Generic representing the wrapped element type in TypeScript.

### 5. Examples
**Complete Laravel Blade + CSRF Integration:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="mock-laravel-csrf-token-12345">
  <title>Module 15: Modern Integration</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <form id="contactForm" style="max-width:320px; font-family:sans-serif;">
    <input type="text" name="name" value="Alice" style="width:100%; padding:6px; margin-bottom:8px;">
    <button type="submit" style="padding:8px 16px;">Submit to Laravel</button>
  </form>
  <p id="laravelStatus"></p>

  <script>
    $(function() {
      // 1. Configure global CSRF header
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

      // 2. Submit via AJAX
      $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        $('#laravelStatus').text('Submitting with verified CSRF token...');

        // Simulated POST to Laravel Controller
        setTimeout(function() {
          $('#laravelStatus').html('<span style="color:green;">✓ CSRF Verified. Saved successfully!</span>');
        }, 400);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Automatically extracts the CSRF token from the `<meta>` tag and attaches it to request headers, passing Laravel's `VerifyCsrfToken` middleware check.

### 7. Practical Use
- Progressive enhancement in Laravel Blade, Ruby on Rails, Django, and WordPress themes.
- Building type-safe enterprise UI components with TypeScript and Vite.

### 8. Common Mistakes
- **Assuming `$` is global in ES Modules**: When using Vite or ES modules, `$` is **not** on `window`. You must explicitly `import $ from 'jquery';`. If legacy scripts need `window.$`, manually assign it: `window.$ = window.jQuery = $;`.
- **Passing a jQuery wrapper directly to Bootstrap 5**: Writing `new bootstrap.Modal($('#myModal'))` fails because Bootstrap expects a raw DOM node. Always pass `$('#myModal')[0]`.

### 9. Best Practices
- Always place `<meta name="csrf-token" content="{{ csrf_token() }}">` in your root HTML layout when working with Laravel.
- Install `@types/jquery` for static typing and IntelliSense autocomplete in VS Code / Antigravity.

### 10. Exercises
1. Build a Bootstrap 5 Toast notification trigger controlled via jQuery.
2. Refactor a script with global `$` collisions in WordPress into a safe `jQuery(function($) { ... })` closure.

### 11. Interview Questions & Answers
**Q: How do you make jQuery available to legacy third-party plugins when bundling with Vite or Webpack?**  
**A:** In your bundler entry point (e.g. `main.js`), import jQuery and explicitly attach it to the global `window` object:
```javascript
import $ from 'jquery';
window.$ = window.jQuery = $;
```

### 12. Mini Project: Type-Safe Notification Badge Scaffold
```typescript
import $ from 'jquery';

export class NotificationBadge {
  private $badge: JQuery<HTMLElement>;
  private count: number = 0;

  constructor(targetSelector: string) {
    this.$badge = $('<span class="badge" style="background:#ef4444; color:#fff; padding:2px 6px; border-radius:10px; font-size:11px;">0</span>');
    $(targetSelector).append(this.$badge);
  }

  public increment(): void {
    this.count++;
    this.$badge.text(this.count);
  }
}
```
