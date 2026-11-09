# 📘 Part 1 — Foundations (Beginner)

A comprehensive guide to modern **jQuery 4.0.0** foundations, execution lifecycle, syntax, installation pipelines, and the core differences between native JavaScript DOM and the jQuery object wrapper.

---

## 📑 Table of Contents
1. [Chapter 1: Introduction to jQuery](#chapter-1-introduction-to-jquery)
2. [Chapter 2: JavaScript Prerequisites](#chapter-2-javascript-prerequisites)
3. [Chapter 3: Installing jQuery 4.0](#chapter-3-installing-jquery-40)
4. [Chapter 4: CDN vs. Local Installation](#chapter-4-cdn-vs-local-installation)
5. [Chapter 5: Document Ready & Execution Flow](#chapter-5-document-ready-and-execution-flow)
6. [Chapter 6: jQuery Syntax & Objects](#chapter-6-jquery-syntax-and-objects)
7. [Chapter 7: JavaScript DOM vs. jQuery](#chapter-7-javascript-dom-vs-jquery)

---

## Chapter 1: Introduction to jQuery

### 1. Objective
Understand the design philosophy of jQuery ("Write less, do more"), its historical impact on the web platform, and its modernized role in the **jQuery 4.0 era**.

### 2. Explanation
Created by John Resig in 2006, jQuery revolutionized client-side web development. Prior to jQuery, developers wrote separate JavaScript branches for Internet Explorer, Firefox, and Opera to perform simple tasks like adding an event listener or sending an AJAX request. 

In the **jQuery 4.0.0 era**, browser fragmentation is largely solved by W3C/WHATWG evergreen browsers. jQuery 4.0 has evolved from an essential cross-browser compatibility shim into a **concise, ergonomic developer productivity library**:
- Eliminates verbose `document.querySelectorAll()` loops with automatic batch operations.
- Provides a clean, chainable API for DOM manipulation, traversal, animations, and AJAX.
- Fully modernized for native ES Modules, strict Content Security Policies (CSP), and Trusted Types.

### 3. Syntax
```javascript
// Universal jQuery Invocation Pattern
jQuery(selectorContext).actionMethod(parameters);

// Shorthand using the '$' global alias
$(selectorContext).actionMethod(parameters);
```

### 4. Parameters
- `selectorContext` *(String | Element | Function | Object)*: The target query string (e.g. `'#header'`, `'.nav-item'`), a native DOM node, a document ready callback, or an object to wrap.
- `actionMethod` *(Function)*: The jQuery method to execute on the wrapped collection (e.g. `.hide()`, `.css()`, `.on()`).

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 1: Hello jQuery 4.0</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <h1 id="headline">Legacy Web Development Was Painful</h1>
  <button id="btnTransform">Transform Headline</button>

  <script>
    $('#btnTransform').on('click', function() {
      $('#headline')
        .text('jQuery 4.0: Modern, Fast & Ergonomic!')
        .css({ color: '#0ea5e9', fontSize: '28px' });
    });
  </script>
</body>
</html>
```

### 6. Output
- Initial load: Displays *"Legacy Web Development Was Painful"* with a button.
- On button click: The headline text instantaneously changes to *"jQuery 4.0: Modern, Fast & Ergonomic!"* and turns blue (`#0ea5e9`) with size `28px`.

### 7. Practical Use
- Rapid feature prototyping and MVP development without heavy build frameworks.
- Adding interactive widgets, modals, and AJAX data fetching into server-rendered architectures (Laravel Blade, WordPress, Django, ASP.NET, Ruby on Rails).

### 8. Common Mistakes
- **Assuming jQuery replaces JavaScript**: jQuery *is* JavaScript; understanding core JavaScript fundamentals is essential.
- **Loading multiple versions**: Including two different jQuery script tags causes global variable collisions and breaks plugins.

### 9. Best Practices
- Cache repetitive queries into variables prefixed with `$` (e.g. `const $headline = $('#headline');`).
- Always use the modern `.on()` syntax instead of deprecated shortcut methods like `.click()`.

### 10. Exercises
1. Create an HTML file containing three paragraphs. Using a single jQuery line, turn all paragraph text bold and change their color to dark green.
2. Add a button that toggles the visibility of the three paragraphs.

### 11. Interview Questions & Answers
**Q: What major legacy baggage was eliminated in jQuery 4.0?**  
**A:** jQuery 4.0 officially dropped support for Internet Explorer 10 and older. It retired the internal Sizzle engine in favor of native `querySelectorAll`, eliminated deprecated APIs (like `jQuery.trim`, `jQuery.now`, `jQuery.isArray`), and introduced native ES module distribution.

### 12. Mini Project: Interactive Announcement Banner
```html
<div id="banner" style="background:#fef3c7; padding:12px; border-bottom:1px solid #f59e0b; display:flex; justify-content:space-between;">
  <span>⚠️ System Maintenance scheduled for tonight at 02:00 UTC.</span>
  <button id="closeBanner" style="border:none; background:none; cursor:pointer; font-weight:bold;">✕</button>
</div>

<script>
  $('#closeBanner').on('click', function() {
    $('#banner').slideUp(250);
  });
</script>
```

---

## Chapter 2: JavaScript Prerequisites

### 1. Objective
Master the foundational JavaScript concepts required for jQuery mastery: Objects, First-Class Functions, Closures, Array methods, and the Document Object Model (DOM) tree.

### 2. Explanation
To write professional jQuery, a developer must understand how JavaScript executes:
1. **First-Class Functions**: Functions can be passed as arguments (callbacks) and returned from other functions.
2. **Object Literals & Reference Types**: jQuery methods frequently accept configuration objects (e.g. `{ duration: 400, complete: fn }`).
3. **The `this` Keyword**: In jQuery event handlers and iteration loops, `this` refers to the current native DOM element being processed.
4. **Scope & Closures**: Functions retain access to their outer lexical environment even after the outer function finishes execution.

### 3. Syntax
```javascript
// Callback Pattern
function performAction(callback) {
  callback();
}

// Object Configuration Pattern
const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};

// Contextual 'this' in jQuery
$('button').on('click', function(event) {
  // 'this' is the native HTMLButtonElement that was clicked!
  console.log(this.id);
});
```

### 4. Parameters
- `event` *(Event)*: The synthetic event object passed automatically to event callbacks.
- `this`: Refers to the native HTML element triggering the event or currently visited in iteration.

### 5. Examples
```javascript
// Understanding Callback and 'this' mechanics
const userManager = {
  appName: 'AdminPortal',
  init: function() {
    // Arrow function preserves lexical 'this'
    $('.btn-action').on('click', (e) => {
      console.log('App context:', this.appName);
      // Native element is accessible via e.currentTarget
      console.log('Clicked element id:', e.currentTarget.id);
    });
  }
};
```

### 6. Output
```text
App context: AdminPortal
Clicked element id: btnSave
```

### 7. Practical Use
- Building decoupled interactive UI modules where event handlers interact cleanly with application state.
- Avoiding scope leakage and preventing unwanted global variable mutations.

### 8. Common Mistakes
- **Using Arrow Functions when you need jQuery's `this` wrapper**:
  ```javascript
  // ❌ WRONG: Arrow function rebinds 'this' to the outer window/module!
  $('button').on('click', () => {
    $(this).addClass('active'); // 'this' is undefined or window!
  });

  // ✅ CORRECT: Use traditional function or event.currentTarget
  $('button').on('click', function() {
    $(this).addClass('active');
  });
  ```

### 9. Best Practices
- Use `function()` when you want `this` to point to the clicked DOM element.
- Use arrow functions `() => {}` when you want `this` to point to your enclosing JavaScript class or controller.

### 10. Exercises
1. Write a function that takes a CSS selector and a background color string, and applies that color to all matching elements using jQuery.
2. Explain the difference between `function() { console.log(this); }` and `() => { console.log(this); }` inside a jQuery `.each()` iteration loop.

### 11. Interview Questions & Answers
**Q: How does jQuery utilize JavaScript closures?**  
**A:** jQuery wraps its entire source code in an Immediately Invoked Function Expression (IIFE) closure to protect global namespace pollution. Furthermore, methods like `$(document).ready(function() { ... })` create closures that keep internal variables and callbacks isolated from external interference.

### 12. Mini Project: State-Driven Action Logger
```html
<ul id="logList"></ul>
<button class="log-trigger" data-action="Created User">Create</button>
<button class="log-trigger" data-action="Updated Settings">Update</button>

<script>
  (function() {
    const logger = {
      count: 0,
      log: function(action) {
        this.count++;
        $('#logList').append(`<li>[#${this.count}] ${action} at ${new Date().toLocaleTimeString()}</li>`);
      }
    };

    $('.log-trigger').on('click', function() {
      const actionName = $(this).data('action');
      logger.log(actionName);
    });
  })();
</script>
```

---

## Chapter 3: Installing jQuery 4.0

### 1. Objective
Install and integrate **jQuery 4.0.0** across various project architectures: NPM/Yarn module setups, modern Vite/Webpack pipelines, and direct HTML script tags.

### 2. Explanation
In jQuery 4.0, the package distribution has been redesigned:
1. **ES Module First**: The core library is authored and exported natively using ES module syntax (`import $ from 'jquery'`).
2. **Slim Build Option**: Excludes AJAX, Effects (`.animate()`, `.slideDown()`), and deprecated modules for projects requiring an ultra-lightweight DOM manipulation tool.
3. **Full Build Option**: Contains the complete API surface including AJAX, animations, and deferred pipelines.

### 3. Syntax
```bash
# Terminal Installation via NPM
npm install jquery@4.0.0

# Terminal Installation via Yarn
yarn add jquery@4.0.0

# Terminal Installation via PNPM
pnpm add jquery@4.0.0
```

```javascript
// Modern ES Module Import in Vite / Webpack / Browser
import $ from 'jquery';

// Or import Slim Build
import $ from 'jquery/slim';
```

### 4. Parameters
- `jquery`: Full production package including AJAX and FX.
- `jquery/slim`: Minimal package excluding AJAX, effects, and animation queues.

### 5. Examples
```html
<!-- Direct HTML5 Installation via Script Tag -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 3: jQuery 4.0 Installation</title>
</head>
<body>
  <h1>jQuery 4.0 Loaded Successfully</h1>
  <p id="versionInfo"></p>

  <script src="./node_modules/jquery/dist/jquery.min.js"></script>
  <script>
    $('#versionInfo').text(`Installed Version: ${$.fn.jquery}`);
  </script>
</body>
</html>
```

### 6. Output
```text
jQuery 4.0 Loaded Successfully
Installed Version: 4.0.0
```

### 7. Practical Use
- Enterprise frontends utilizing Vite or modern bundling pipelines with TypeScript and React/Vue/Blade templates.
- Standalone HTML dashboards and administration templates.

### 8. Common Mistakes
- Importing `jquery/slim` and subsequently attempting to call `$.ajax()` or `.fadeIn()` (which are intentionally omitted from the slim build, resulting in `TypeError: $.ajax is not a function`).

### 9. Best Practices
- If your application only needs DOM queries and events and uses `fetch()` for networking, choose `jquery/slim` to reduce production bundle size by over 40%.
- In package builds, verify that only a single version of jQuery is bundled in your bundle analysis report.

### 10. Exercises
1. Initialize a new NPM project and install `jquery@4.0.0`.
2. Inspect `node_modules/jquery/dist/` and list the difference in file sizes between `jquery.min.js` and `jquery.slim.min.js`.

### 11. Interview Questions & Answers
**Q: How do you verify which version of jQuery is actively running in the browser?**  
**A:** Inspect the `jQuery.fn.jquery` property (or `$.fn.jquery`). It returns a version string such as `"4.0.0"`.

### 12. Mini Project: Environment Version Auditor
```html
<div id="envAuditor" style="font-family:monospace; padding:16px; background:#1e293b; color:#38bdf8; border-radius:8px;">
  <h3>Environment Diagnostics</h3>
  <div id="diagResults">Checking...</div>
</div>

<script>
  $(function() {
    const diagnostics = [
      `jQuery Version: ${$.fn.jquery}`,
      `AJAX Capability: ${typeof $.ajax === 'function' ? 'Available' : 'Omitted (Slim Build)'}`,
      `Effects Engine: ${typeof $.fn.animate === 'function' ? 'Available' : 'Omitted (Slim Build)'}`,
      `User Agent: ${navigator.userAgent}`
    ];
    $('#diagResults').html(diagnostics.map(item => `<div>✔ ${item}</div>`).join(''));
  });
</script>
```

---

## Chapter 4: CDN vs. Local Installation

### 1. Objective
Evaluate the architectural tradeoffs between Content Delivery Networks (CDNs) and self-hosted local installations, implement Subresource Integrity (SRI) hashing, and construct automatic offline fallback scripts.

### 2. Explanation
- **CDN (Content Delivery Network)**: Delivers files from geographically distributed edge servers (e.g., Google, Cloudflare, jQuery Official CDN). Reduces latency and offloads server bandwidth.
- **Local Self-Hosting**: Essential for offline development, intranets, secure air-gapped environments, and strictly audited enterprise compliance.
- **Subresource Integrity (SRI)**: A security standard that enables browsers to verify that resources fetched from third-party CDNs have not been maliciously tampered with.

### 3. Syntax
```html
<!-- CDN with Subresource Integrity (SRI) & CORS -->
<script 
  src="https://code.jquery.com/jquery-4.0.0.min.js" 
  integrity="sha256-..." 
  crossorigin="anonymous">
</script>

<!-- Automatic Local Fallback Pattern -->
<script>
  window.jQuery || document.write('<script src="/assets/js/jquery-4.0.0.min.js"><\/script>');
</script>
```

### 4. Parameters
- `integrity`: Base64-encoded cryptographic hash of the expected file content (SHA-256, SHA-384, or SHA-512).
- `crossorigin="anonymous"`: Instructs the browser to fetch the script without sending user credentials (cookies, HTTP basic auth).

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Production Script Loading Architecture</title>
  
  <!-- 1. Primary CDN Source with SRI -->
  <script 
    src="https://code.jquery.com/jquery-4.0.0.min.js" 
    crossorigin="anonymous">
  </script>
  
  <!-- 2. Bulletproof Local Fallback -->
  <script>
    if (typeof window.jQuery === 'undefined') {
      document.write('<script src="./vendor/jquery/jquery-4.0.0.min.js"><\/script>');
    }
  </script>
</head>
<body>
  <div id="status">Loading...</div>

  <script>
    $(function() {
      $('#status').text('jQuery is operational via primary or fallback source.');
    });
  </script>
</body>
</html>
```

### 6. Output
- Browser renders: `"jQuery is operational via primary or fallback source."` even if the CDN connection fails or the user is working offline.

### 7. Practical Use
- Enterprise web applications with 99.999% uptime requirements where third-party CDN outages cannot be allowed to break application functionality.

### 8. Common Mistakes
- **Omitting the backslash before `<\/script>` in fallback `document.write`**: Browsers parse the closing `</script>` tag prematurely and break the HTML parser.
- **Mismatched SRI hashes**: If a CDN updates its script file or minification slightly and the hash doesn't match, modern browsers block execution completely with a security error.

### 9. Best Practices
- Always enforce `crossorigin="anonymous"` whenever specifying an `integrity` attribute.
- In modern bundler workflows (Vite, Webpack), prefer bundling locally or using an import map over raw unhedged CDN tags.

### 10. Exercises
1. Generate an SRI SHA-256 hash for a local file using the OpenSSL CLI.
2. Simulate a CDN network outage in Chrome DevTools by blocking `code.jquery.com` and verify that your local fallback loads seamlessly.

### 11. Interview Questions & Answers
**Q: Why is browser cache sharing across different websites via public CDNs no longer a major performance benefit?**  
**A:** Modern browsers (Chrome, Safari, Firefox) have implemented **partitioned caching (double-keyed cache)** for privacy reasons. A resource cached from `code.jquery.com` on Site A cannot be read or reused by Site B, eliminating the historical shared-cache speed advantage.

### 12. Mini Project: Resilient Asset Loader Indicator
```html
<div id="cdnIndicator" style="padding:10px; border-radius:6px; font-weight:bold;">Detecting asset source...</div>

<script>
  $(function() {
    const isLocal = !$('script[src*="code.jquery.com"]').length;
    $('#cdnIndicator')
      .css('background', isLocal ? '#fed7aa' : '#bbf7d0')
      .text(isLocal ? 'Running on Local Fallback Asset' : 'Connected via Fast Edge CDN');
  });
</script>
```

---

## Chapter 5: Document Ready and Execution Flow

### 1. Objective
Master browser rendering phases, parse sequences, the crucial differences between `$(document).ready()` and `window.onload`, and the modern jQuery 4.0 execution syntax.

### 2. Explanation
When a web browser loads an HTML document, it follows a strict sequence:
1. **HTML Parsing**: Constructs the Document Object Model (DOM) tree.
2. **DOMContentLoaded Event**: Fires as soon as the DOM tree is fully constructed, even if external images, stylesheets, and fonts are still loading over the network.
3. **Window Load Event**: Fires only after the DOM and **all** external resources (images, iframes, stylesheets) have finished loading.

jQuery's Document Ready executes immediately at the `DOMContentLoaded` phase. Waiting for `window.onload` delays interactivity unnecessarily.

### 3. Syntax
```javascript
// ✅ Modern Recommended jQuery 4.0 Syntax (Clean & Concise)
$(function() {
  // DOM is fully accessible here!
});

// ℹ️ Legacy Syntax (Still valid, but verbose)
$(document).ready(function() {
  // DOM is fully accessible here
});

// ❌ Deprecated / Removed Syntax (Do NOT use in 4.0)
$().ready(function() {});
$(document).on('ready', function() {}); // REMOVED in 4.0
```

### 4. Parameters
- `handler` *(Function)*: A function to execute after the DOM hierarchy is constructed.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Execution Flow Comparison</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <ul id="timeline"></ul>

  <!-- Large Image that takes time to download -->
  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600" width="200" height="150" alt="Space">

  <script>
    // 1. Immediate Script Execution
    $('#timeline').append('<li>1. Inline Script Executed (Immediate)</li>');

    // 2. jQuery Document Ready (DOMContentLoaded)
    $(function() {
      $('#timeline').append('<li>2. $(function() {}) Fired (DOM Ready - Fast!)</li>');
    });

    // 3. Window Load (After heavy image finishes)
    $(window).on('load', function() {
      $('#timeline').append('<li>3. window.onload Fired (All assets loaded)</li>');
    });
  </script>
</body>
</html>
```

### 6. Output
```text
1. Inline Script Executed (Immediate)
2. $(function() {}) Fired (DOM Ready - Fast!)
3. window.onload Fired (All assets loaded)
```

### 7. Practical Use
- Initializing interactive event handlers, rendering dynamic widgets, setting up navigation drawers, and triggering AJAX calls before heavy images finish downloading.

### 8. Common Mistakes
- Trying to calculate image dimensions inside `$(function() {})`: If the image file has not loaded its header metadata yet, `.width()` and `.height()` may return `0`. Use `$(window).on('load', ...)` when calculating physical dimensions of unconstrained images.
- Nesting `$(function() { $(function() { ... }) })` redundantly.

### 9. Best Practices
- Keep document ready callbacks focused: initialize event listeners and state controllers, delegating heavy computation to background tasks or microtasks.
- Always use the streamlined `$(function() { ... })` syntax.

### 10. Exercises
1. Write a script that places a "Loading content..." notice on the page, and removes it as soon as `$(function() {})` executes.
2. Demonstrate how putting a script tag in `<head>` without `$(function() {})` causes an element lookup to return `null`.

### 11. Interview Questions & Answers
**Q: What happens if you register a `$(function() {})` callback AFTER the DOM has already loaded?**  
**A:** jQuery checks `document.readyState`. If the document has already passed the interactive or complete stage, jQuery fires your callback asynchronously on the next event loop tick (via `setTimeout` / microtask) rather than dropping it.

### 12. Mini Project: Page Load Speed Metric Badge
```html
<div id="speedBadge" style="position:fixed; bottom:16px; right:16px; background:#0f172a; color:#38bdf8; padding:8px 14px; border-radius:20px; font-size:12px; font-family:sans-serif;">
  Measuring DOM latency...
</div>

<script>
  const scriptStartTime = performance.now();

  $(function() {
    const domReadyTime = Math.round(performance.now() - scriptStartTime);
    $('#speedBadge').text(`⚡ DOM Ready in ${domReadyTime}ms`);
  });
</script>
```

---

## Chapter 6: jQuery Syntax & Objects

### 1. Objective
Understand the anatomy of the jQuery object (`$`), method chaining architecture, array-like collection mechanics, and the `noConflict()` namespace isolation mechanism.

### 2. Explanation
When you execute `$('selector')`, jQuery does **not** return a native DOM element. Instead, it returns a **jQuery collection object**:
- An array-like wrapper (`[element1, element2, ...]`) containing zero, one, or more matching DOM nodes.
- Equipped with the entire prototype API defined on `jQuery.fn`.
- Implements the **Fluent Interface (Method Chaining)** pattern: most methods return `this` (the collection itself), allowing sequential method calls.

### 3. Syntax
```javascript
// Method Chaining Pattern
$('#card')
  .addClass('highlight')
  .css('border-color', '#3b82f6')
  .fadeIn(200);

// Resolving Global Name Collisions with noConflict()
const jq = jQuery.noConflict();
jq('#card').show();
```

### 4. Parameters
- `jQuery.noConflict(removeAll)` *(Boolean, optional)*: If `true`, surrenders both `$` and the global `jQuery` variable back to their previous owners.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Anatomy of the jQuery Object</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <div class="box">Box 1</div>
  <div class="box">Box 2</div>
  <div class="box">Box 3</div>

  <script>
    const $boxes = $('.box');

    console.log('Is Array?', Array.isArray($boxes)); // false
    console.log('Total Matched Elements (.length):', $boxes.length); // 3
    console.log('First Native DOM Node:', $boxes[0]); // <div class="box">

    // Method Chaining Demonstration
    $boxes
      .css('padding', '10px')
      .css('margin', '6px')
      .addClass('styled-box');
  </script>
</body>
</html>
```

### 6. Output
```text
Is Array? false
Total Matched Elements (.length): 3
First Native DOM Node: <div class="box">Box 1</div>
```
In the browser DOM: All 3 boxes receive `padding: 10px`, `margin: 6px`, and class `styled-box`.

### 7. Practical Use
- Eliminating verbose loops: applying transformations to 50 elements in a single expression.
- Safe integration with other libraries that claim the global `$` variable (e.g. Prototype.js, Mootools, Cash).

### 8. Common Mistakes
- **Assuming an empty selection throws an error**: In Vanilla JS, `document.querySelector('#nonExistent').classList.add('foo')` throws `TypeError: Cannot read properties of null`. In jQuery, `$('#nonExistent').addClass('foo')` fails **silently** and safely without crashing the script! Always check `$collection.length > 0` if you need to verify existence.

### 9. Best Practices
- Chain related operations together to write expressive, compact code.
- Break long chains onto separate lines indented by two spaces for readability.

### 10. Exercises
1. Select all list items in an unordered list, and using a single chain: add a class, set custom padding, and hide them.
2. Write a function that uses `jQuery.noConflict()` and runs inside an IIFE that retains `$` locally.

### 11. Interview Questions & Answers
**Q: How does jQuery enable method chaining?**  
**A:** Internally, any jQuery method that does not return an explicit scalar value (such as `.width()` or `.text()` as a getter) returns `return this;`, which passes the active jQuery wrapper collection to the next chained operation.

### 12. Mini Project: Safe Multi-Library Sandbox
```html
<div id="sandboxTarget">Waiting for isolated execution...</div>

<script>
  // Assume another script owns '$'
  window.$ = 'ExternalLibraryObject';

  // Safely execute jQuery within an isolated closure
  (function($) {
    // Inside here, '$' is guaranteed to be jQuery 4.0!
    $('#sandboxTarget')
      .text(`Protected Execution! Active jQuery: ${$.fn.jquery}`)
      .css({ background: '#e0f2fe', color: '#0369a1', padding: '12px' });
  })(jQuery);

  console.log('Global $ remains untouched:', window.$);
</script>
```

---

## Chapter 7: JavaScript DOM vs. jQuery

### 1. Objective
Compare native Document Object Model APIs with jQuery methods, learn how to freely unwrap and convert between native DOM nodes and jQuery collections, and master modern conversion patterns.

### 2. Explanation
| Feature | Native JavaScript (ES2024+) | jQuery 4.0 |
| :--- | :--- | :--- |
| **Element Selection** | `document.querySelectorAll('.btn')` (returns static NodeList) | `$('.btn')` (returns chainable jQuery object) |
| **Event Binding** | `el.addEventListener('click', fn)` (requires manual iteration) | `$('.btn').on('click', fn)` (auto-iterates all) |
| **Adding a Class** | `el.classList.add('active')` | `$('.btn').addClass('active')` |
| **Setting Inner HTML**| `el.innerHTML = '<span>Hi</span>'` | `$('.btn').html('<span>Hi</span>')` |
| **Setting Text** | `el.textContent = 'Hi'` | `$('.btn').text('Hi')` |
| **Null Safety** | Throws error if element is null | Fails silently and safely |

### 3. Syntax
```javascript
// 1. Converting Native DOM Element -> jQuery Object
const nativeElement = document.getElementById('myElement');
const $jqueryElement = $(nativeElement);

// 2. Unwrapping jQuery Object -> Native DOM Element
const native1 = $('#myElement')[0];       // Array indexer (fastest)
const native2 = $('#myElement').get(0);    // .get(index) method
const allNatives = $('#myElement').get(); // Array of all matching native elements
```

### 4. Parameters
- `index` *(Number)*: Zero-based position of the native element within the matched set. Negative numbers count backwards from the end (e.g. `.get(-1)`).

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DOM vs jQuery Conversion</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <input type="text" id="username" value="AlexDev">

  <script>
    // Accessing Native Methods not present in jQuery
    const $input = $('#username');

    // Unwrapping to use native HTMLInputElement method
    const nativeInput = $input[0];
    nativeInput.setSelectionRange(0, 4); // Native text selection API

    // Converting native back to jQuery
    const rewrapped = $(nativeInput);
    rewrapped.css('border', '2px solid #22c55e');
  </script>
</body>
</html>
```

### 6. Output
- Input field contains `"AlexDev"` with characters `"Alex"` highlighted/selected, and its border is styled in bright green (`#22c55e`).

### 7. Practical Use
- Integrating jQuery plugins with modern native browser APIs (`IntersectionObserver`, `CanvasRenderingContext2D`, `ResizeObserver`, `Web Animations API`).

### 8. Common Mistakes
- **Double Wrapping**: Wrapping an object that is already a jQuery collection:
  ```javascript
  const $btn = $('#submit');
  const $redundant = $($btn); // Unnecessary overhead!
  ```
- **Calling jQuery methods on native elements**:
  ```javascript
  const el = document.getElementById('box');
  el.hide(); // ❌ TypeError: el.hide is not a function!
  $(el).hide(); // ✅ Correct
  ```

### 9. Best Practices
- Adopt a consistent naming convention: prefix variables holding jQuery objects with `$` (e.g., `$header`, `$userList`), and leave native variables un-prefixed (e.g., `headerEl`, `userListEl`).

### 10. Exercises
1. Select a canvas element using `$('#myCanvas')`, unwrap it, and retrieve its native 2D drawing context (`.getContext('2d')`).
2. Write a loop using Vanilla JS `querySelectorAll` that adds an event listener, then rewrite the equivalent functionality in a single line of jQuery.

### 11. Interview Questions & Answers
**Q: What is the performance difference between `$el[0]` and `$el.get(0)`?**  
**A:** `$el[0]` directly accesses the internal indexed property of the object with zero function call overhead. `$el.get(0)` invokes a method that supports negative indexing (`.get(-1)`) and returns a shallow array copy if called without arguments. Direct array index access (`$el[0]`) is measurably faster in high-throughput loops.

### 12. Mini Project: Native Canvas Visualizer
```html
<canvas id="statCanvas" width="300" height="100" style="border:1px solid #cbd5e1; border-radius:6px;"></canvas>
<br>
<button id="drawBars" style="margin-top:8px; padding:6px 12px;">Draw Statistics</button>

<script>
  $('#drawBars').on('click', function() {
    // Unwrap native HTMLCanvasElement
    const canvas = $('#statCanvas')[0];
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const data = [30, 75, 45, 90, 60];

    data.forEach((val, i) => {
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(i * 60 + 15, canvas.height - val, 35, val);
    });

    // Re-wrap to apply jQuery effect
    $('#statCanvas').fadeOut(100).fadeIn(200);
  });
</script>
```
