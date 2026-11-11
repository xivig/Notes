# 📦 Module 02: Installation

Master all installation pathways for **jQuery 4.0.0**: official CDNs with Subresource Integrity (SRI), local hosting, npm/pnpm package managers, ES Modules, and the optimized Slim build.

---

### 1. Objective
Understand how to install and import jQuery 4.0 across different project setups (zero-build static sites, modern bundlers like Vite/Webpack, and lightweight Slim configurations).

### 2. Explanation
Installing jQuery 4.0 depends on your application's architecture:
1. **CDN Delivery**: Fastest for static or server-rendered sites. Always include Subresource Integrity (SRI) hashes to prevent compromised CDN assets from executing malicious code.
2. **Local Hosting**: Self-hosting jQuery on your own web server guarantees availability in offline, intranet, or air-gapped enterprise environments.
3. **NPM / Bundlers**: Modern front-end development bundles jQuery via npm/pnpm. In jQuery 4.0, the package includes native ES Module exports (`"type": "module"`), enabling clean `import $ from 'jquery'`.
4. **Slim Build**: Excludes AJAX (`$.ajax`, `$.get`) and Effects (`.animate()`, `.fadeIn()`) modules, shaving ~25% off the bundle size when projects use native `fetch()` and CSS3 transitions.

### 3. Syntax
```html
<!-- CDN with Subresource Integrity -->
<script src="https://code.jquery.com/jquery-4.0.0.min.js" integrity="sha256-..." crossorigin="anonymous"></script>

<!-- Slim Build -->
<script src="https://code.jquery.com/jquery-4.0.0.slim.min.js"></script>
```

```javascript
// Modern ES Module import
import $ from 'jquery';
```

### 4. Parameters
- `integrity`: Base64-encoded cryptographic hash verifying file authenticity.
- `crossorigin="anonymous"`: Required when performing CORS SRI validation.

### 5. Examples
**ES Module Setup with Vite / Modern Build Tools:**
```javascript
// main.js
import $ from 'jquery';

$(function() {
  $('body').append('<h1>Loaded via ES Modules!</h1>');
});
```

**Local Fallback Pattern:**
```html
<!-- Attempt CDN first, fallback to local file if CDN is blocked -->
<script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
<script>
  window.jQuery || document.write('<script src="/assets/js/jquery-4.0.0.min.js"><\/script>');
</script>
```

### 6. Output
- Loads jQuery reliably. If the CDN fails (e.g. adblocker, network outage), the fallback script seamlessly injects the local copy, ensuring zero downtime.

### 7. Practical Use
- Corporate firewalls blocking public CDNs.
- High-availability production applications requiring fallback guarantees.

### 8. Common Mistakes
- **Omitting `crossorigin="anonymous"` when using `integrity`**: Causes the browser to block script execution due to CORS preflight checks.
- **Accidentally using the Slim build when calling `$.ajax()`**: The Slim build throws `TypeError: $.ajax is not a function`. If your app uses jQuery AJAX, you must use the standard build.

### 9. Best Practices
- Always use the minified build (`.min.js`) in production.
- Use the Slim build if you rely entirely on native `fetch()` and CSS animations.

### 10. Exercises
1. Set up a local HTML page that tests the CDN fallback mechanism by providing an intentionally broken CDN URL.
2. Verify that `typeof $.ajax === 'undefined'` when loading the jQuery 4.0 Slim build.

### 11. Interview Questions & Answers
**Q: What features are removed in the jQuery 4.0 Slim build, and why would you use it?**  
**A:** The Slim build excludes the **AJAX** and **Effects** (animation) modules. It is ideal for modern web applications that handle asynchronous network requests via the native `fetch()` API and visual animations via CSS transitions/keyframes, reducing the JavaScript bundle size.

### 12. Mini Project: Environment Capability Detector
```html
<div style="font-family:sans-serif; padding:1rem; border:1px solid #ccc; max-width:350px;">
  <h4>jQuery Runtime Diagnostics</h4>
  <p id="envDiag">Checking capabilities...</p>
</div>

<script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
<script>
  $(function() {
    const hasAjax = typeof $.ajax === 'function';
    const hasFx = typeof $.fn.animate === 'function';
    const buildType = (hasAjax && hasFx) ? 'Full Standard Build' : 'Slim Build';

    $('#envDiag').html(`
      <strong>Version:</strong> ${$.fn.jquery}<br>
      <strong>Build:</strong> ${buildType}<br>
      <strong>AJAX Capable:</strong> ${hasAjax ? 'Yes' : 'No'}<br>
      <strong>Animation Capable:</strong> ${hasFx ? 'Yes' : 'No'}
    `);
  });
</script>
```
