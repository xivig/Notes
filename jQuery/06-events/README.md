# ⚡ Module 06: Events

Master modern event handling in **jQuery 4.0.0**: binding with `.on()`, tearing down with `.off()`, event delegation for dynamic elements, bubbling control, custom application events, and namespacing.

---

### 1. Objective
Master unified event binding and teardown using `.on()` and `.off()`, eliminate deprecated shortcuts, implement high-performance event delegation, control event propagation, and namespace event listeners.

### 2. Explanation
In **jQuery 4.0.0**, all legacy event shortcut methods (`.click()`, `.dblclick()`, `.hover()`, `.focus()`, `.blur()`, `.keydown()`, `.keyup()`, `.change()`, `.submit()`) have been **completely removed**.

The single, unified API for modern event handling is:
- **Binding**: `.on(eventTypes [, selector] [, data], handler)`
- **One-Time Binding**: `.one(eventTypes [, selector] [, data], handler)`
- **Unbinding**: `.off(eventTypes [, selector] [, handler])`

### Event Delegation:
When you attach a listener directly to an element (`$('.btn').on('click', fn)`), only elements currently present in the DOM are bound. Any button inserted later via AJAX has no listener attached.
**Event delegation** binds the listener to a **static parent ancestor** (e.g. `'#itemList'`) and specifies a child selector filter:
```javascript
$('#itemList').on('click', '.btn-delete', function(e) {
  // 'this' is the specific .btn-delete button that was clicked
});
```
This works for existing elements **and all future elements**, while consuming far less memory.

### 3. Syntax
```javascript
// Direct Binding
$(target).on('click', function(e) { ... });

// Delegated Binding
$(ancestor).on('click', childFilter, function(e) { ... });

// Namespaced Binding & Teardown
$(target).on('click.myPlugin', function(e) { ... });
$(target).off('click.myPlugin');

// Custom Event Triggering
$(document).on('user:login', function(e, user) { ... });
$(document).trigger('user:login', [{ name: 'Alice' }]);
```

### 4. Parameters
- `eventTypes` *(String)*: One or more space-separated event names (e.g. `'click'`, `'mouseenter mouseleave'`).
- `childFilter` *(String, optional)*: Descendant selector filter for event delegation.
- `handler` *(Function)*: Event callback receiving normalized `jQuery.Event` object.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 06: Modern Events</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="btnSpawn">Add Dynamic Button</button>
  <div id="buttonContainer" style="margin-top:10px;"></div>

  <script>
    $(function() {
      let counter = 0;

      // Spawn new elements dynamically
      $('#btnSpawn').on('click', function() {
        counter++;
        $('#buttonContainer').append(
          `<button class="dyn-btn" data-id="${counter}">Dynamic Button #${counter}</button> `
        );
      });

      // Delegated event listener handles all current & future buttons
      $('#buttonContainer').on('click', '.dyn-btn', function(event) {
        const id = $(this).data('id');
        alert(`Clicked dynamic button #${id}! Coordinates: (${event.pageX}, ${event.pageY})`);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Add Dynamic Button" inserts new buttons into `#buttonContainer`.
- Clicking any dynamically inserted button triggers the delegated click handler with mouse coordinates.

### 7. Practical Use
- Handling actions in data tables, infinite feeds, shopping carts, and dynamic forms.
- Reusable UI plugins that tear down only their own listeners via namespaced events (`$el.off('.myPlugin')`).

### 8. Common Mistakes
- **Using removed event shortcuts**: Calling `$('#btn').click(fn)` throws `TypeError: $(...).click is not a function` in jQuery 4.0. Always use `.on('click', fn)`.
- **Delegating directly to `$(document)` everywhere**: Delegating everything to `document` hurts performance. Bind delegated listeners to the closest static parent container.

### 9. Best Practices
- Never use removed shorthand methods.
- Always namespace global window/document event listeners: `$(window).on('resize.myFeature', fn)`.
- Use `event.preventDefault()` and `event.stopPropagation()` explicitly rather than `return false;`.

### 10. Exercises
1. Build a keyboard shortcut listener where pressing `Ctrl + Enter` (or `Cmd + Enter`) inside a `<textarea>` submits the form.
2. Bind mouseenter and mouseleave to a card in a single `.on()` call using an event mapping object: `{ mouseenter: fn1, mouseleave: fn2 }`.

### 11. Interview Questions & Answers
**Q: Why was `.click(fn)` removed in jQuery 4.0, and what are the benefits of `.on('click', fn)`?**  
**A:** `.click(fn)` and similar shortcuts were redundant wrappers around `.on()`. They increased library bundle size and obscured the crucial distinction between direct event binding and event delegation. Standardizing strictly on `.on()` provides unified parameter handling, smaller bundle size, and consistent event delegation syntax.

### 12. Mini Project: Publish-Subscribe Cart Notification System
```html
<div style="font-family:sans-serif; padding:1rem;">
  <div style="padding:10px; background:#f1f5f9; border-radius:6px; margin-bottom:10px;">
    Cart Items: <strong id="cartBadge">0</strong>
  </div>
  <button class="btn-buy" data-sku="SKU-100">Buy Product 1</button>
  <button class="btn-buy" data-sku="SKU-200">Buy Product 2</button>
</div>

<script>
  $(function() {
    let count = 0;

    // Subscriber
    $(document).on('cart:itemAdded', function(e, sku) {
      count++;
      $('#cartBadge').text(count);
      console.log('Cart updated with item:', sku);
    });

    // Publisher
    $('.btn-buy').on('click', function() {
      const sku = $(this).data('sku');
      $(document).trigger('cart:itemAdded', [sku]);
    });
  });
</script>
```
