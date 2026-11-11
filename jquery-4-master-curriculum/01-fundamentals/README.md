# 📘 Module 01: Fundamentals

Master the core philosophy of jQuery 4.0 ("Write less, do more"), the execution lifecycle, the `$()` wrapper object, DOM unwrapping, and the essential differences between native JavaScript and jQuery.

---

### 1. Objective
Understand the design philosophy of jQuery 4.0, the `$()` factory wrapper, unwrapping native DOM elements, and the modern document ready execution flow.

### 2. Explanation
Created by John Resig in 2006, jQuery revolutionized client-side web development. Prior to jQuery, developers wrote separate JavaScript branches for Internet Explorer, Firefox, and Opera to perform simple tasks like adding an event listener or sending an AJAX request. 

In the **jQuery 4.0.0 era**, browser fragmentation is largely solved by evergreen browsers. jQuery 4.0 has evolved into a concise, ergonomic developer productivity library:
- Eliminates verbose `document.querySelectorAll()` loops with automatic batch operations (Implicit Iteration).
- Provides a clean, chainable API for DOM manipulation, traversal, animations, and AJAX.
- Fully modernized for native ES Modules, strict Content Security Policies (CSP), and Trusted Types.

The core of jQuery is the `$()` wrapper function. When you query elements with `$('.item')`, jQuery does not return raw DOM nodes; it returns an array-like **jQuery collection wrapper object** endowed with hundreds of helper methods. To access the underlying DOM node, you unwrap it via index `[0]` or `.get(0)`.

### 3. Syntax
```javascript
// Document Ready Execution Flow (Modern Shorthand)
$(function() {
  // DOM is parsed and ready for querying
});

// Wrapping DOM elements
const $collection = $(selectorOrElement);

// Unwrapping native DOM elements
const rawDomNode = $collection[0];
const rawDomNodeAlt = $collection.get(0);
```

### 4. Parameters
- `selectorOrElement` *(String | Element | Function)*: CSS query string, raw DOM node, or document ready callback function.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 01: Fundamentals</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <div id="statusBox" class="box">System Initializing</div>
  <button id="btnTransform">Modernize</button>

  <script>
    // Modern Document Ready Shorthand
    $(function() {
      $('#btnTransform').on('click', function() {
        // Chained jQuery wrapper methods
        $('#statusBox')
          .text('jQuery 4.0: Modern & High-Performance!')
          .css({ color: '#2563eb', fontWeight: 'bold' });

        // Unwrapping native DOM element
        const rawElement = $('#statusBox')[0];
        console.log('Unwrapped Tag Name:', rawElement.tagName);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Modernize" updates `#statusBox` text, applies blue color and bold font.
- Console prints: `Unwrapped Tag Name: DIV`.

### 7. Practical Use
- Rapidly prototyping interactive components on server-rendered architectures (Blade, Django, Rails, WordPress).
- Bridging third-party libraries (e.g. Chart.js, Bootstrap) that require native DOM element parameters with jQuery selections.

### 8. Common Mistakes
- **Writing `$(document).ready(fn)`**: While supported, `$(function() { ... })` is the modern standard.
- **Calling native DOM methods on jQuery objects**: Writing `$('#box').addEventListener(...)` throws `TypeError: $(...).addEventListener is not a function`. You must either use jQuery's `.on()` or unwrap the element: `$('#box')[0].addEventListener(...)`.

### 9. Best Practices
- Prefix jQuery wrapper variables with `$` (e.g. `const $header = $('#header');`) to clearly distinguish them from raw DOM nodes.
- Cache repetitive queries rather than querying the DOM repeatedly.

### 10. Exercises
1. Query three paragraphs and update their text content to display their 1-based index using `.text(function(i, val) { ... })`.
2. Select an element using `$()`, unwrap it, and use native `element.getBoundingClientRect()` to measure its position.

### 11. Interview Questions & Answers
**Q: What is the difference between `$(document).ready()` and `window.onload`?**  
**A:** `$(document).ready()` (shorthand: `$(function() {})`) fires as soon as the DOM tree has been fully parsed and constructed by the browser, allowing scripts to safely query and modify elements before external assets (large images, videos, frames) have finished downloading. `window.onload` waits for the complete page, including all stylesheets, images, and subframes, to finish downloading.

### 12. Mini Project: Interactive Announcement Banner with Close Toggle
```html
<div id="promoBanner" style="background:#fef3c7; border:1px solid #f59e0b; padding:10px; display:flex; justify-content:space-between; font-family:sans-serif;">
  <span>⚠️ Notice: Scheduled maintenance tonight at 02:00 UTC.</span>
  <button id="btnCloseBanner" style="border:none; background:none; cursor:pointer; font-weight:bold;">✕</button>
</div>

<script>
  $(function() {
    $('#btnCloseBanner').on('click', function() {
      $('#promoBanner').fadeOut(200);
    });
  });
</script>
```
