# 🎨 Module 07: CSS and Styling

Manipulate CSS styles, manage class states, perform dimensional box-model calculations, and compute document offsets using `.css()`, `.addClass()`, `.removeClass()`, `.toggleClass()`, `.width()`, `.outerWidth()`, and `.offset()`.

---

### 1. Objective
Efficiently read and write inline CSS declarations, manage dynamic class states, accurately measure box-model geometry, and calculate document-relative coordinate offsets.

### 2. Explanation
Controlling appearance in jQuery follows two distinct strategies:
1. **Class Management (Recommended)**: Keeps presentation in CSS stylesheets and toggles state classes (`.is-active`, `.has-error`, `.dark-theme`) via `.addClass()`, `.removeClass()`, `.toggleClass()`, and `.hasClass()`.
2. **Direct Inline Styling (`.css()`)**: Used for dynamic or calculated values (e.g. z-index layers, drag-and-drop coordinates, CSS custom properties).

### Box Model Dimensions Matrix:
| Method | Content Width | Padding | Border | Margin |
| :--- | :---: | :---: | :---: | :---: |
| `.width()` | ✅ | ❌ | ❌ | ❌ |
| `.innerWidth()` | ✅ | ✅ | ❌ | ❌ |
| `.outerWidth()` | ✅ | ✅ | ✅ | ❌ |
| `.outerWidth(true)` | ✅ | ✅ | ✅ | ✅ |

### Positioning:
- `.offset()`: Returns `{ top, left }` coordinates relative to the **document** (page root).
- `.position()`: Returns `{ top, left }` coordinates relative to the **closest offset parent** (`position: relative / absolute`).
- `.scrollTop()`: Gets or sets the vertical scroll position of an element or `window`.

### 3. Syntax
```javascript
// Class manipulation
$(el).addClass('active');
$(el).toggleClass('hidden', shouldHideBoolean);

// Dynamic inline styles
$(el).css({
  backgroundColor: '#2563eb',
  borderRadius: 8 // auto converted to '8px'
});

// Dimensions & Offsets
const outerW = $(el).outerWidth(true); // includes margin
const docOffset = $(el).offset(); // { top: ..., left: ... }
```

### 4. Parameters
- `styles` *(Object | String)*: CSS property name or key-value object literal.
- `includeMargin` *(Boolean, optional)*: For `.outerWidth()` and `.outerHeight()`. When `true`, margins are included.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 07: CSS & Styling</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    .card { width: 180px; padding: 15px; border: 2px solid #cbd5e1; border-radius: 6px; margin: 10px; transition: all 0.3s; }
    .card.active { border-color: #2563eb; background: #eff6ff; }
  </style>
</head>
<body>
  <div class="card" id="demoCard">Selectable Card</div>
  <button id="btnToggle">Toggle Active State</button>
  <button id="btnMeasure">Measure Geometry</button>
  <pre id="metricsLog" style="background:#f1f5f9; padding:10px; margin-top:10px;"></pre>

  <script>
    $(function() {
      $('#btnToggle').on('click', function() {
        $('#demoCard').toggleClass('active');
      });

      $('#btnMeasure').on('click', function() {
        const $c = $('#demoCard');
        const info = [
          `width(): ${$c.width()}px`,
          `innerWidth(): ${$c.innerWidth()}px`,
          `outerWidth(): ${$c.outerWidth()}px`,
          `outerWidth(true): ${$c.outerWidth(true)}px`,
          `offset().top: ${$c.offset().top}px`
        ].join('\n');

        $('#metricsLog').text(info);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Toggle Active State" smoothly toggles the blue `.active` class.
- Clicking "Measure Geometry" outputs exact pixel values across the CSS box model.

### 7. Practical Use
- Positioning floating tooltips or dropdown popovers directly above triggering buttons using `.offset()`.
- Building sticky navigation headers that dock when `$(window).scrollTop() > headerOffset.top`.

### 8. Common Mistakes
- **Putting dots in class names**: Writing `$(el).addClass('.active')` adds `<div class=".active">` instead of `<div class="active">`. Always omit the leading dot.
- **Using `.position()` for document-wide calculations**: `.position()` ignores scrolling and measures relative to the immediate offset parent. Use `.offset()` for document-wide placement.

### 9. Best Practices
- Prefer CSS classes over inline `.css()` for visual styling.
- Use `.outerWidth()` or `.outerWidth(true)` when calculating layout bounds to prevent clipping.

### 10. Exercises
1. Build a "Scroll to Top" button that only fades in when `$(window).scrollTop() > 300` and scrolls to top on click.
2. Build an accessible dark-mode toggle that adds `.dark-theme` to `<body>` and stores the state in `localStorage`.

### 11. Interview Questions & Answers
**Q: What is the difference between `.offset()` and `.position()`?**  
**A:** `.offset()` returns coordinates relative to the top-left corner of the HTML document (page root). `.position()` returns coordinates relative to the element's closest positioned ancestor (an offset parent with `position: relative`, `absolute`, or `fixed`).

### 12. Mini Project: Dynamic Floating Tooltip Positioning Engine
```html
<div style="padding:80px 40px; font-family:sans-serif;">
  <button id="btnHoverMe" style="padding:8px 16px;">Hover for Tooltip</button>
  <div id="floatingTip" style="display:none; position:absolute; background:#0f172a; color:#fff; padding:6px 12px; border-radius:4px; font-size:12px; pointer-events:none;">
    Tooltip text
  </div>
</div>

<script>
  $(function() {
    $('#btnHoverMe').on('mouseenter', function() {
      const $btn = $(this);
      const $tip = $('#floatingTip');
      const offset = $btn.offset();

      // Position centered horizontally above button
      const top = offset.top - $tip.outerHeight() - 6;
      const left = offset.left + ($btn.outerWidth() / 2) - ($tip.outerWidth() / 2);

      $tip.css({ top: top, left: left }).stop(true, true).fadeIn(150);
    }).on('mouseleave', function() {
      $('#floatingTip').stop(true, true).fadeOut(150);
    });
  });
</script>
```
