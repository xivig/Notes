# 🔍 Module 03: Syntax and Selectors

Master jQuery 4.0's selector engine, understand how it routes queries directly to native `document.querySelectorAll()`, and leverage basic, attribute, hierarchy, and pseudo-selectors.

---

### 1. Objective
Understand how jQuery 4.0 queries the DOM, master basic, hierarchical, and attribute selectors, and transition from legacy Sizzle pseudo-selectors to high-speed native CSS standards.

### 2. Explanation
In legacy jQuery versions (1.x – 3.x), selector queries were parsed by an internal JavaScript engine called **Sizzle**. Sizzle provided custom extensions like `:first`, `:last`, `:eq(n)`, `:even`, and `:odd`.

**In jQuery 4.0.0, the Sizzle engine has been officially retired.**
jQuery 4.0 delegates selector queries directly to the browser's native `document.querySelectorAll()` method. This offers massive performance improvements because queries execute in compiled browser C++ rather than interpreted JavaScript.

### Selector Categories:
1. **Basic Selectors**: `#id`, `.class`, `element`, `*`, `sel1, sel2`.
2. **Hierarchy Selectors**:
   - `ancestor descendant`: Any matching descendant at any depth.
   - `parent > child`: Direct immediate children only.
   - `prev + next`: Adjacent next sibling immediately following.
   - `prev ~ siblings`: Any following sibling matching criteria.
3. **Attribute Selectors**: `[attr]`, `[attr="val"]`, `[attr^="start"]`, `[attr$="end"]`, `[attr*="sub"]`.
4. **Standard CSS Pseudo-Classes**: `:first-child`, `:last-child`, `:nth-child(even)`, `:checked`, `:disabled`.

### 3. Syntax
```javascript
// Native query selector
const $items = $('ul.menu > li.active');

// Attribute substring selector
const $links = $('a[href^="https://"]');

// Standard CSS nth-child
const $evenRows = $('table tbody tr:nth-child(even)');
```

### 4. Parameters
- `selector` *(String)*: A valid CSS selector string.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 03: Selectors</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <ul id="memberList">
    <li data-role="admin">Alice (Admin)</li>
    <li data-role="editor">Bob (Editor)</li>
    <li data-role="admin">Charlie (Admin)</li>
    <li data-role="subscriber">David (Subscriber)</li>
  </ul>
  <button id="btnHighlight">Highlight Admins</button>

  <script>
    $(function() {
      $('#btnHighlight').on('click', function() {
        // Fast native attribute query
        $('#memberList > li[data-role="admin"]').css({
          backgroundColor: '#dbeafe',
          color: '#1e40af',
          fontWeight: 'bold',
          padding: '4px 8px'
        });
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking the button selects only `Alice` and `Charlie` via direct parent-child attribute matching and highlights them blue.

### 7. Practical Use
- Querying form controls by type or state: `$('input[type="checkbox"]:checked')`.
- Selecting external links to append target attributes: `$('a[href^="http"]:not([href*="' + window.location.host + '"])').attr('target', '_blank')`.

### 8. Common Mistakes
- **Using legacy custom pseudo-selectors in query strings**: Writing `$('li:eq(2)')` or `$('tr:even')` bypasses native `querySelectorAll` and falls back to a slower compatibility layer. Instead, use standard CSS `$('tr:nth-child(even)')` or native jQuery methods `$('li').eq(2)`.
- **Forgetting quotes in complex attribute selectors**: Writing `$('input[name=user[email]]')` causes syntax parsing errors. Always quote attribute values: `$('input[name="user[email]"]')`.

### 9. Best Practices
- Prefer standard CSS selectors (`:nth-child()`, `:first-child`) for maximum performance.
- When positional indexing is needed, use methods (`.eq(index)`, `.first()`, `.last()`) instead of selector strings.

### 10. Exercises
1. Select all external links whose `href` begins with `https://` and ends with `.pdf`.
2. Select every odd table row and apply an alternating background color using `:nth-child(odd)`.

### 11. Interview Questions & Answers
**Q: Why should developers avoid `:first` and `:even` in jQuery 4.0 query strings?**  
**A:** `:first` and `:even` are non-standard proprietary pseudo-selectors originally invented by Sizzle. Because they are not valid W3C CSS selectors, passing them into `$()` prevents the browser from executing the query natively via `document.querySelectorAll()`. Using standard CSS `:first-child` or jQuery's `.first()` preserves native speed.

### 12. Mini Project: Interactive File Type Badge Appender
```html
<div style="font-family:sans-serif; max-width:350px;">
  <h4>Document Downloads</h4>
  <ul id="downloadList" style="list-style:none; padding:0;">
    <li><a href="manual.pdf">User Manual (PDF)</a></li>
    <li><a href="sheet.xlsx">Quarterly Budget (Excel)</a></li>
    <li><a href="archive.zip">Asset Package (ZIP)</a></li>
  </ul>
</div>

<script>
  $(function() {
    // Append badges based on file extension attribute matches
    $('a[href$=".pdf"]').append(' <span style="background:#fee2e2; color:#b91c1c; font-size:11px; padding:2px 4px; border-radius:3px;">PDF</span>');
    $('a[href$=".xlsx"]').append(' <span style="background:#dcfce7; color:#15803d; font-size:11px; padding:2px 4px; border-radius:3px;">XLS</span>');
    $('a[href$=".zip"]').append(' <span style="background:#fef3c7; color:#b45309; font-size:11px; padding:2px 4px; border-radius:3px;">ZIP</span>');
  });
</script>
```
