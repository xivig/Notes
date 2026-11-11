# 🔄 Module 16: jQuery 4.0 Migration Guide

Execute a comprehensive migration from jQuery 1.x / 2.x / 3.x to **jQuery 4.0.0**, audit breaking changes, remove deprecated APIs, retire Sizzle pseudo-selectors, and use the jQuery Migrate plugin.

---

### 1. Objective
Understand every breaking change in jQuery 4.0.0, eliminate removed methods and event shortcuts, replace retired Sizzle queries with native CSS, and run migration audits with `jquery-migrate`.

---

### 2. Explanation
**jQuery 4.0.0** is the first major generation update in nearly a decade. It modernizes the internal codebase and eliminates obsolete browser polyfills.

### Complete jQuery 4.0 Breaking Changes Checklist:

#### 1. Browser Support Dropped
- **Internet Explorer 10 and older are completely unsupported.**
- Targets modern evergreen browsers (Chrome, Firefox, Safari, Edge).

#### 2. Sizzle Engine Retired
- Selector queries now route directly to native `document.querySelectorAll()`.
- Legacy custom positional selectors (`:first`, `:last`, `:eq(n)`, `:even`, `:odd`) are removed from query strings. Use standard CSS (`:first-child`, `:nth-child()`) or native jQuery methods (`.first()`, `.last()`, `.eq(n)`).

#### 3. Removed Deprecated Event Shortcuts
- `.click(fn)`, `.dblclick(fn)`, `.hover()`, `.focus(fn)`, `.blur(fn)`, `.change(fn)`, `.submit(fn)`, `.keydown(fn)`, `.keyup(fn)`.
- **Solution:** Always use `.on('eventType', fn)` and `.off('eventType')`.

#### 4. Removed Utility Functions
- `$.trim()` ➔ Use native `str.trim()`
- `$.isArray()` ➔ Use native `Array.isArray()`
- `$.isFunction()` ➔ Use `typeof fn === 'function'`
- `$.isNumeric()` ➔ Use `typeof val === 'number' && !isNaN(val)`
- `$.now()` ➔ Use native `Date.now()`
- `$.type()` ➔ Use `typeof` or `Object.prototype.toString`
- `$.parseJSON()` ➔ Use native `JSON.parse()`
- `$.unique()` ➔ Renamed to `$.uniqueSort()` (legacy `.unique()` removed)

#### 5. Trusted Types & CSP Compliance
- Full integration with `window.trustedTypes` for safe DOM injection under strict Content Security Policies.

---

### 3. Syntax: Migration Tooling Workflow
```html
<!-- Step 1: Include jQuery 4.0 -->
<script src="https://code.jquery.com/jquery-4.0.0.js"></script>

<!-- Step 2: Include jQuery Migrate 4.x to log warnings in DevTools console -->
<script src="https://code.jquery.com/jquery-migrate-4.0.0.js"></script>
```

```javascript
// Enable verbose migration warnings in console
jQuery.migrateMute = false;
```

---

### 4. Parameters
- `jQuery.migrateMute`: Set to `false` to log every detected deprecated method call to the browser console.

---

### 5. Examples: Side-by-Side Modernization Matrix

```javascript
// ==========================================
// 1. EVENT BINDING
// ==========================================
// ❌ Legacy 3.x (Throws TypeError in 4.0):
$('#submitBtn').click(function() { ... });
// ✅ Modern 4.0:
$('#submitBtn').on('click', function() { ... });

// ==========================================
// 2. STRING TRIMMING
// ==========================================
// ❌ Legacy 3.x:
const clean = $.trim(userInput);
// ✅ Modern 4.0:
const clean = userInput.trim();

// ==========================================
// 3. ARRAY DETECTION
// ==========================================
// ❌ Legacy 3.x:
if ($.isArray(data)) { ... }
// ✅ Modern 4.0:
if (Array.isArray(data)) { ... }

// ==========================================
// 4. TIMESTAMPS
// ==========================================
// ❌ Legacy 3.x:
const time = $.now();
// ✅ Modern 4.0:
const time = Date.now();

// ==========================================
// 5. POSITIONAL SELECTORS
// ==========================================
// ❌ Legacy 3.x (Slow compatibility fallback):
$('ul.nav li:first').addClass('active');
// ✅ Modern 4.0 (Fast native querySelectorAll):
$('ul.nav li').first().addClass('active');
// or use standard CSS:
$('ul.nav li:first-child').addClass('active');
```

---

### 6. Output
- Clean execution in jQuery 4.0 with zero console warnings and maximum native browser speed.

---

### 7. Practical Use
- Upgrading enterprise legacy intranets, CRM portals, and e-commerce frontends from jQuery 1.x/2.x/3.x to 4.0.

---

### 8. Common Mistakes
- **Skipping `jquery-migrate`**: Attempting to upgrade a large application without jQuery Migrate makes finding removed APIs tedious. Always use Migrate during the testing phase.
- **Skipping major generations**: Do not jump directly from jQuery 1.12 to 4.0. Migrate 1.x ➔ 3.x first, resolve warnings, then migrate 3.x ➔ 4.x.

---

### 9. Best Practices
- **Phase 1**: Add `jquery-migrate-4.0.0.js` to your staging environment.
- **Phase 2**: Open browser DevTools and systematically resolve every `JQMIGRATE:` warning.
- **Phase 3**: Remove `jquery-migrate` and deploy production jQuery 4.0.

---

### 10. Exercises
1. Take a legacy script containing `.click()`, `$.trim()`, and `$.now()`, and refactor it into clean jQuery 4.0.
2. Replace all `:first` and `:even` selector queries in an HTML table script with native `.first()` and CSS `:nth-child(even)` selectors.

---

### 11. Interview Questions & Answers
**Q: What happened to the Sizzle selector engine in jQuery 4.0, and how does it impact performance?**  
**A:** In jQuery 4.0, Sizzle was retired. jQuery now routes queries directly to the browser's native `document.querySelectorAll()` method. This significantly improves query performance across all evergreen browsers and eliminates hundreds of lines of legacy fallback code.

---

### 12. Mini Project: Interactive Legacy Code Smell Scanner
```html
<div style="font-family:sans-serif; max-width:450px;">
  <h4>jQuery 4.0 Deprecation Scanner</h4>
  <textarea id="codeToScan" rows="4" style="width:100%; font-family:monospace; padding:6px; box-sizing:border-box;">$('#btn').click(function() { var text = $.trim($('#input').val()); });</textarea>
  <button id="btnScan" style="margin-top:6px; padding:6px 12px; cursor:pointer;">Scan Code</button>
  <ul id="scanResults" style="margin-top:8px; font-size:12px; color:#b91c1c;"></ul>
</div>

<script>
  $(function() {
    $('#btnScan').on('click', function() {
      const code = $('#codeToScan').val();
      const $res = $('#scanResults').empty();

      const checks = [
        { test: /\.click\(/, msg: 'Deprecated: .click() removed in 4.0. Use .on("click", ...)' },
        { test: /\$\.trim\(/, msg: 'Deprecated: $.trim() removed in 4.0. Use native String.prototype.trim()' },
        { test: /\$\.now\(\)/, msg: 'Deprecated: $.now() removed in 4.0. Use native Date.now()' },
        { test: /\$\.isArray\(/, msg: 'Deprecated: $.isArray() removed in 4.0. Use Array.isArray()' }
      ];

      let detected = 0;
      checks.forEach(c => {
        if (c.test.test(code)) {
          $res.append(`<li>${c.msg}</li>`);
          detected++;
        }
      });

      if (detected === 0) {
        $res.append('<li style="color:green;">✓ Code is 100% jQuery 4.0 compliant!</li>');
      }
    });
  });
</script>
```
