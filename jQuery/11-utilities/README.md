# 🧰 Module 11: Utilities

Master jQuery's surviving core utilities in 4.0: iteration with `$.each()`, transformation with `$.map()`, deep object merging with `$.extend(true)`, memory storage with `$.data()`, and the removal matrix for deprecated helpers.

---

### 1. Objective
Understand which utilities survived in jQuery 4.0, master deep object merging via `$.extend()`, store arbitrary JavaScript objects via `$.data()`, and use native ECMAScript replacements for removed helpers.

### 2. Explanation
In early versions of jQuery, JavaScript lacked standardized cross-browser helpers. jQuery filled these gaps with utilities like `$.trim()`, `$.isArray()`, and `$.now()`.

Over the past decade, ECMAScript (ES5/ES6+) introduced standardized native alternatives. In alignment with this modernization, **jQuery 4.0.0 has permanently removed multiple deprecated utilities from its core build**.

### Modernization & Removal Matrix:
| Removed in jQuery 4.0 | Modern ECMAScript Native Replacement |
| :--- | :--- |
| `$.trim(str)` | `str.trim()` |
| `$.isArray(arr)` | `Array.isArray(arr)` |
| `$.isFunction(fn)` | `typeof fn === 'function'` |
| `$.isNumeric(val)` | `typeof val === 'number' && !isNaN(val)` |
| `$.now()` | `Date.now()` |
| `$.type(obj)` | `typeof obj` or `Object.prototype.toString.call(obj)` |
| `$.parseJSON(str)` | `JSON.parse(str)` |
| `$.unique(arr)` | Renamed to `$.uniqueSort(arr)` (DOM nodes only) |

Surviving utilities in jQuery 4.0 include:
- `$.extend([deep,] target, obj1 [, objN])`: Merges objects. With `deep: true`, recursively traverses and merges nested child objects.
- `$.each(collection, callback)`: Iterates across arrays or objects.
- `$.map(collection, callback)`: Transforms collections into a new array.
- `$.grep(array, function(item, index) [, invert])`: Filters array elements.
- `$.inArray(value, array)`: Returns element index or `-1`.
- `$.data(domNode, key, value)`: Low-level memory store that bypasses the collection wrapper.

### 3. Syntax
```javascript
// Deep Object Merge
const config = $.extend(true, {}, defaultOptions, userOptions);

// Low-Level Data Attachment
$.data(rawDomNode, 'sessionData', { token: 'xyz', expires: 3600 });
const session = $.data(rawDomNode, 'sessionData');

// Array Filtering via $.grep
const activeUsers = $.grep(users, u => u.isActive);
```

### 4. Parameters
- `deep` *(Boolean, optional)*: If `true`, `$.extend` becomes recursive.
- `target` *(Object)*: Destination object receiving merged properties.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 11: Utilities</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="btnMerge">Demonstrate Deep Extend</button>
  <pre id="jsonResult" style="background:#0f172a; color:#38bdf8; padding:12px; margin-top:10px;"></pre>

  <script>
    $(function() {
      const defaultSettings = {
        theme: 'dark',
        controls: { showArrows: true, showDots: true }
      };

      const userSettings = {
        controls: { showDots: false } // Only modify showDots
      };

      $('#btnMerge').on('click', function() {
        // Deep merge preserves showArrows while overriding showDots!
        const merged = $.extend(true, {}, defaultSettings, userSettings);
        $('#jsonResult').text(JSON.stringify(merged, null, 2));
      });
    });
  </script>
</body>
</html>
```

### 6. Output
```json
{
  "theme": "dark",
  "controls": {
    "showArrows": true,
    "showDots": false
  }
}
```
`showArrows` is preserved, proving that the nested object was recursively merged rather than overwritten.

### 7. Practical Use
- Merging user plugin options with sensible defaults.
- Attaching class instances or timers to DOM elements via `$.data()` without polluting HTML attributes.

### 8. Common Mistakes
- **Calling removed utilities in jQuery 4.0**: Calling `$.trim(str)` throws `TypeError: $.trim is not a function`. Use native `str.trim()`.
- **Mutating the original defaults object**: Calling `$.extend(defaults, options)` permanently modifies `defaults`. Always pass an empty object as target: `$.extend(true, {}, defaults, options)`.

### 9. Best Practices
- Always pass `{}` as the first target argument to prevent modifying original reference objects.
- Prefer native `Array.prototype.forEach` and `filter` for simple pure data operations.

### 10. Exercises
1. Build a helper function that deep-clones any JavaScript object using `$.extend(true, {}, source)`.
2. Attach a complex session object to a `<div>` element using `$.data()` and retrieve it in a separate click handler.

### 11. Interview Questions & Answers
**Q: How does `$.extend(true, ...)` differ from native `Object.assign(...)`?**  
**A:** `Object.assign()` only performs a shallow copy (1-level deep). If an object contains nested child objects, `Object.assign()` copies only the object references, overwriting nested objects completely. In contrast, `$.extend(true, ...)` recursively traverses nested child objects and arrays, safely merging properties at every depth.

### 12. Mini Project: In-Memory Element State Tracker
```html
<div style="font-family:sans-serif; max-width:300px;">
  <div id="trackerBox" style="padding:15px; background:#e0f2fe; border-radius:6px; text-align:center;">
    Clicks: <strong id="clickCounter">0</strong>
  </div>
  <button id="btnTrack" style="margin-top:8px; width:100%; padding:6px;">Add Click</button>
</div>

<script>
  $(function() {
    // Store state in jQuery internal memory
    $('#trackerBox').data('appState', { count: 0 });

    $('#btnTrack').on('click', function() {
      const state = $('#trackerBox').data('appState');
      state.count++;
      $('#clickCounter').text(state.count);
    });
  });
</script>
```
