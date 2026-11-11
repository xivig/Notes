# 🛡️ Module 14: Performance and Security

Optimize DOM operations, eliminate layout thrashing, prevent memory leaks, comply with Content Security Policy (CSP), support Trusted Types, and mitigate Cross-Site Scripting (XSS) in jQuery 4.0.

---

### 1. Objective
Build high-performance jQuery applications by preventing forced synchronous layout reflows (layout thrashing), avoid memory leaks when destroying components, and eliminate XSS vulnerabilities through safe insertion patterns and CSP Trusted Types compliance.

### 2. Explanation

#### Performance & Layout Thrashing:
Interacting with the DOM is the slowest operation in browser rendering.
- **Layout Thrashing (Forced Synchronous Layout)** happens when code interleaves DOM writes (`.css()`, `.append()`, `.addClass()`) with immediate DOM reads (`.width()`, `.offset()`, `innerHeight()`). This forces the browser to synchronously recalculate layout on every step.
- **Solution**: Always **batch reads first**, then **batch writes**. Use `DocumentFragment` to append multiple nodes in a single layout reflow.

#### Memory Management:
- Always use `$(el).remove()` or `$(el).empty()` to delete DOM elements. jQuery automatically cleans up all attached event listeners and cached data entries. Using native `innerHTML = ""` leaves orphan event listeners in memory.
- Unbind global `window` and `document` event listeners when components unmount.

#### Security & XSS Mitigation:
- **Vulnerable**: `$('#box').html(untrustedUserInput);` — allows attackers to inject malicious `<script>` or `<img onerror="...">` tags.
- **Safe**: `$('#box').text(untrustedUserInput);` — treats all characters as plain text, escaping `<` and `>` into harmless HTML entities.
- **Trusted Types in jQuery 4.0**: jQuery 4.0 integrates with the browser's `window.trustedTypes` API, ensuring that HTML strings passed to `.html()` comply with strict Content Security Policies (`require-trusted-types-for 'script'`).

### 3. Syntax
```javascript
// High-Performance Batched DOM Insertion
const fragment = document.createDocumentFragment();
items.forEach(text => {
  const li = document.createElement('li');
  li.textContent = text;
  fragment.appendChild(li);
});
$('#list')[0].appendChild(fragment); // Single browser reflow!

// Secure Text Rendering (Immune to XSS)
$('#userComment').text(rawCommentString);
```

### 4. Parameters
- `fragment`: Lightweight off-DOM document fragment.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 14: Performance & Security</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <h4>Safe vs Unsafe Rendering</h4>
  <input type="text" id="userInput" value='<img src=x onerror="alert(\"XSS Attack!\")">' style="width:360px;"><br><br>
  
  <button id="btnUnsafe">Render Unsafe (.html())</button>
  <button id="btnSafe">Render Safe (.text())</button>

  <div id="displayArea" style="margin-top:10px; padding:10px; background:#f8fafc; border:1px solid #cbd5e1;"></div>

  <script>
    $(function() {
      // VULNERABLE: Executes script
      $('#btnUnsafe').on('click', function() {
        $('#displayArea').html($('#userInput').val());
      });

      // SECURE: Escapes all markup into plaintext
      $('#btnSafe').on('click', function() {
        $('#displayArea').text($('#userInput').val());
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Render Unsafe" executes the malicious image script payload.
- Clicking "Render Safe" displays the raw string harmlessly as plaintext on screen, neutralizing the exploit.

### 7. Practical Use
- Rendering user-generated bios, comments, chat messages, search queries safely.
- Efficiently populating tables with 5,000+ records without freezing the UI thread.

### 8. Common Mistakes
- **Concatenating user input into template strings**: Writing `$('<li>' + userText + '</li>')` is vulnerable. Always create the element first and set text via `.text()`: `$('<li>').text(userText)`.
- **Clearing containers with `element.innerHTML = ""`**: Bypasses jQuery's teardown, leaking memory from orphan event listeners. Always use `$(element).empty()`.

### 9. Best Practices
- Never use `.html()` with untrusted user data. Always use `.text()`.
- Cache selector queries outside loops and high-frequency event handlers (`scroll`, `mousemove`).

### 10. Exercises
1. Profile an app using Chrome DevTools Performance panel, locate a layout thrashing event, and refactor it into batched reads and writes.
2. Build an audit function that verifies no DOM elements remain trapped in memory after tearing down a modal dialog.

### 11. Interview Questions & Answers
**Q: How does jQuery 4.0 support Content Security Policy (CSP) and Trusted Types?**  
**A:** Under strict enterprise CSP configurations (`require-trusted-types-for 'script'`), assigning raw strings to injection sinks (like `innerHTML` or `script.src`) throws a browser security violation. jQuery 4.0 natively integrates with `window.trustedTypes`, allowing developers to create and pass TrustedHTML/TrustedScript objects seamlessly through jQuery DOM manipulation and AJAX methods.

### 12. Mini Project: High-Performance List Benchmark
```html
<div style="font-family:sans-serif; max-width:400px;">
  <button id="btnBenchmark">Run 2,000 Item Batch Benchmark</button>
  <p id="benchOutput"></p>
  <ul id="benchList" style="max-height:120px; overflow-y:auto;"></ul>
</div>

<script>
  $(function() {
    $('#btnBenchmark').on('click', function() {
      $('#benchList').empty();
      const start = performance.now();
      
      const items = Array.from({ length: 2000 }, (_, i) => `Fast Record #${i + 1}`);
      const html = items.map(t => `<li>${t}</li>`).join('');
      $('#benchList').html(html);

      const elapsed = (performance.now() - start).toFixed(2);
      $('#benchOutput').text(`Rendered 2,000 elements in ${elapsed}ms (Single reflow!)`);
    });
  });
</script>
```
