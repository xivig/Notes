# 🛠️ Module 05: DOM Manipulation

Create, read, update, clone, replace, wrap, and delete DOM elements using `.html()`, `.text()`, `.val()`, `.append()`, `.prepend()`, `.after()`, `.before()`, `.remove()`, `.empty()`, and `.detach()`.

---

### 1. Objective
Master all core DOM manipulation operations in jQuery 4.0, understand the critical difference between `.remove()` and `.detach()`, and enforce Content Security Policy (CSP) safe text insertion.

### 2. Explanation
DOM manipulation alters the document tree structure and content dynamically:

1. **Content Accessors**:
   - `.text()`: Reads or writes plain text (automatically escapes HTML characters, preventing XSS).
   - `.html()`: Reads or writes inner HTML markup (in jQuery 4.0, respects Trusted Types).
   - `.val()`: Reads or writes values of form controls.
2. **Node Creation**:
   - Passing an HTML string into `$()` creates new disconnected DOM elements: `$('<div class="alert">Hello</div>')`.
3. **Node Insertion**:
   - Inside Parent: `.append()` (at the end), `.prepend()` (at the beginning).
   - Outside as Sibling: `.after()` (immediately following), `.before()` (immediately preceding).
4. **Node Removal**:
   - `.empty()`: Removes all child elements and clears child data/events.
   - `.remove()`: Removes target elements permanently from DOM and cleans all data/events.
   - `.detach()`: Removes target elements from DOM but **preserves all event handlers and cached data** for future re-insertion.

### 3. Syntax
```javascript
// Safe text writing
$('#title').text('User Input Safe From XSS');

// Element insertion
$('#container').append('<p>Appended child</p>');

// Element detachment
const $savedWidget = $('#widget').detach();
// Later re-attach without losing listeners
$('#newSection').append($savedWidget);
```

### 4. Parameters
- `content` *(String | Element | jQuery | Function)*: DOM elements, HTML markup strings, or callback functions returning content.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 05: DOM Manipulation</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    .item { padding: 6px 12px; margin: 4px 0; background: #f1f5f9; border-radius: 4px; display: flex; justify-content: space-between; }
    .btn-del { border: none; background: #fee2e2; color: #dc2626; cursor: pointer; border-radius: 3px; }
  </style>
</head>
<body>
  <div style="max-width:300px; font-family:sans-serif;">
    <input type="text" id="itemInput" placeholder="New item...">
    <button id="btnAdd">Add Item</button>
    <div id="itemList" style="margin-top:10px;"></div>
  </div>

  <script>
    $(function() {
      $('#btnAdd').on('click', function() {
        const text = $('#itemInput').val().trim();
        if (!text) return;

        // Secure element construction using .text()
        const $newItem = $('<div class="item"></div>');
        const $label = $('<span></span>').text(text);
        const $delBtn = $('<button class="btn-del">✕</button>');

        $newItem.append($label, $delBtn);
        $('#itemList').append($newItem);
        $('#itemInput').val('').focus();
      });

      // Delegated removal
      $('#itemList').on('click', '.btn-del', function() {
        $(this).closest('.item').remove();
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Typing an item and clicking "Add Item" creates a new item row safely via DOM manipulation.
- Clicking "✕" calls `.remove()` on the closest `.item`, deleting it cleanly from memory and DOM.

### 7. Practical Use
- Dynamically building lists, todo items, modal dialogs, and asynchronous search results.

### 8. Common Mistakes
- **Using `.html(userInput)` with untrusted data**: Injects unsanitized script tags leading to XSS vulnerabilities. Always use `.text(userInput)`.
- **Calling `.remove()` when an element is meant to be temporarily hidden**: If you intend to re-attach the element later, `.remove()` destroys its attached event listeners. Use `.detach()` instead.

### 9. Best Practices
- Always use `.text()` for user-generated strings.
- Batch multiple node insertions into an array or document fragment before calling `.append()` to minimize browser reflow cycles.

### 10. Exercises
1. Build an element wrapper function that wraps all `<p>` tags with a `<div class="content-block">` using `.wrap()`.
2. Demonstrate the difference between `.remove()` and `.detach()` by attaching a click listener to a button, removing/detaching it, re-inserting it, and testing if the click listener still fires.

### 11. Interview Questions & Answers
**Q: What is the fundamental difference between `.remove()`, `.empty()`, and `.detach()`?**  
**A:**  
- `.empty()` deletes all **child nodes** inside the target element, cleaning their events and data.  
- `.remove()` deletes the **target elements** themselves, permanently unbinding all attached event listeners and wiping internal data.  
- `.detach()` removes the **target elements** from the DOM but **preserves all event handlers and internal data**, allowing them to be re-inserted later with full interactivity intact.

### 12. Mini Project: Interactive Notification Toast Stack
```html
<div style="font-family:sans-serif; padding:1rem;">
  <button id="btnToast">Spawn Toast</button>
  <div id="toastBox" style="position:fixed; top:20px; right:20px; z-index:999;"></div>
</div>

<script>
  $(function() {
    let toastCount = 0;
    $('#btnToast').on('click', function() {
      toastCount++;
      const $toast = $('<div style="background:#1e293b; color:#fff; padding:10px 16px; border-radius:6px; margin-bottom:8px; display:none;"></div>')
        .text(`Toast notification #${toastCount}`);

      $('#toastBox').prepend($toast);
      $toast.fadeIn(200).delay(2500).fadeOut(300, function() {
        $(this).remove();
      });
    });
  });
</script>
```
