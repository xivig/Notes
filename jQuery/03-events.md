# ⚡ Part 3 — Events (Beginner to Intermediate)

A comprehensive guide to handling user interaction, event bubbling, delegation, custom triggers, and event lifecycle management using **jQuery 4.0.0**.

---

## 📑 Table of Contents
1. [Chapter 16: Event Fundamentals](#chapter-16-event-fundamentals)
2. [Chapter 17: Mouse Events](#chapter-17-mouse-events)
3. [Chapter 18: Keyboard Events](#chapter-18-keyboard-events)
4. [Chapter 19: Form Events](#chapter-19-form-events)
5. [Chapter 20: Event Delegation](#chapter-20-event-delegation)
6. [Chapter 21: Event Propagation & Bubbling](#chapter-21-event-propagation--bubbling)
7. [Chapter 22: Custom Events](#chapter-22-custom-events)
8. [Chapter 23: Namespaced Events](#chapter-23-namespaced-events)

---

## Chapter 16: Event Fundamentals

### 1. Objective
Master jQuery 4.0's event binding architecture using `.on()` and teardown using `.off()`, understand the `jQuery.Event` wrapper object, and avoid removed legacy shortcut methods.

### 2. Explanation
Events represent occurrences in the browser window or document (mouse clicks, keyboard strokes, window resizing, asynchronous network status changes). In legacy jQuery (1.x - 3.x), developers frequently relied on convenience shortcuts such as `.click(handler)`, `.focus(handler)`, and `.bind(type, handler)`.

**In jQuery 4.0.0, all legacy event shortcuts (`.click()`, `.dblclick()`, `.focus()`, `.blur()`, `.hover()`, etc.) have been completely removed from the core API.**

The single, unified, performant method for event attachment in jQuery 4.0 is `.on()`, and its teardown counterpart is `.off()`. When an event fires, jQuery invokes the callback with a normalized `jQuery.Event` object that guarantees cross-browser uniformity across mouse coordinates (`pageX`, `pageY`), target elements (`target`, `currentTarget`), and event prevention methods.

### 3. Syntax
```javascript
// Binding an event
$(selector).on(eventTypes [, selectorFilter] [, data] , handlerFunction);

// Unbinding an event
$(selector).off([eventTypes] [, selectorFilter] [, handlerFunction]);

// One-time event execution
$(selector).one(eventTypes [, selectorFilter] [, data] , handlerFunction);
```

### 4. Parameters
- `eventTypes` *(String)*: One or more space-separated event names (e.g. `'click'`, `'mouseenter focus'`).
- `selectorFilter` *(String, optional)*: A child selector string used for event delegation.
- `data` *(Any, optional)*: Data passed into `event.data` accessible inside the handler.
- `handlerFunction` *(Function)*: The callback executed when the event triggers: `function(event, ...args)`.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 16: Modern Event Attachment</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    .card { padding: 1rem; border: 1px solid #cbd5e1; border-radius: 6px; margin-bottom: 1rem; }
    .active { background-color: #f0fdf4; border-color: #22c55e; }
  </style>
</head>
<body>
  <div class="card" id="demoCard">
    <h3>Interactive Card</h3>
    <p>Click anywhere inside this card.</p>
  </div>
  <button id="btnDisable">Disable Card Events</button>

  <script>
    // Modern jQuery 4.0 event binding with event data
    $('#demoCard').on('click', { maxClicks: 5 }, function(event) {
      $(this).toggleClass('active');
      console.log('Event Type:', event.type);
      console.log('Coordinates:', event.pageX, event.pageY);
      console.log('Attached Data:', event.data.maxClicks);
    });

    // Detach listener cleanly
    $('#btnDisable').on('click', function() {
      $('#demoCard').off('click');
      alert('Card events detached.');
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking the card toggles its green `.active` style and prints mouse coordinates to the console.
- Clicking the "Disable Card Events" button invokes `.off('click')`. Subsequent clicks on the card trigger no action.

### 7. Practical Use
- Binding and unbinding user interactions based on application state (e.g., enabling submit listeners only when valid form criteria are met).
- Implementing reusable UI widgets that clean up event listeners when unmounted or destroyed.

### 8. Common Mistakes
- **Using removed shortcuts**: Writing `$('#btn').click(fn)` throws `TypeError: $(...).click is not a function` in jQuery 4.0. Always use `$('#btn').on('click', fn)`.
- **Accidental multiple attachments**: Calling `.on()` inside repeated function calls without unbinding creates duplicate listeners that execute multiple times per click.

### 9. Best Practices
- Never use removed shorthand methods (`.click()`, `.hover()`).
- Always use `.one()` for self-destructing listeners (such as single-use confirmation prompts or lazy-loaded assets).
- Use named function references when planning to unbind specific handlers via `.off()`.

### 10. Exercises
1. Create a button that can only be clicked exactly three times. After the 3rd click, disable the button and unbind its click event.
2. Bind multiple event types (`mouseenter` and `mouseleave`) in a single `.on()` call using an object mapping `{ mouseenter: fn1, mouseleave: fn2 }`.

### 11. Interview Questions & Answers
**Q: Why were event shortcuts like `.click()` and `.bind()` removed in jQuery 4.0?**  
**A:** Redundant shortcuts bloated the library footprint, caused naming collisions with native DOM methods, and obscured modern event delegation patterns. Standardizing on `.on()` and `.off()` provides a smaller bundle, clearer intent, and unified parameter handling.

### 12. Mini Project: Click Counter & Speed Tester
```html
<div style="font-family:sans-serif; text-align:center; padding:2rem;">
  <h2>10-Second Click Speed Test</h2>
  <div id="cpsTimer" style="font-size:24px; font-weight:bold; color:#dc2626;">Time: 10s</div>
  <button id="cpsTarget" style="padding:20px 40px; font-size:20px; margin:20px; cursor:pointer;">START CLICKING!</button>
  <div id="cpsScore" style="font-size:18px;">Score: 0 clicks</div>
</div>

<script>
  let score = 0;
  let timeLeft = 10;
  let timerId = null;

  // Single trigger to start timer on first click
  $('#cpsTarget').one('click', function() {
    timerId = setInterval(function() {
      timeLeft--;
      $('#cpsTimer').text('Time: ' + timeLeft + 's');
      if (timeLeft <= 0) {
        clearInterval(timerId);
        $('#cpsTarget').off('click').prop('disabled', true).text('TEST COMPLETED');
        const cps = (score / 10).toFixed(2);
        $('#cpsScore').html('<strong>Final Score:</strong> ' + score + ' clicks (' + cps + ' CPS)');
      }
    }, 1000);
  });

  // Count clicks
  $('#cpsTarget').on('click', function() {
    if (timeLeft > 0) {
      score++;
      $('#cpsScore').text('Score: ' + score + ' clicks');
    }
  });
</script>
```

---

## Chapter 17: Mouse Events

### 1. Objective
Handle mouse pointer interactions including click, double click, mousedown, mouseup, mousemove, mouseenter, mouseleave, contextmenu, and wheel events in jQuery 4.0.

### 2. Explanation
Mouse events represent user actions via pointing devices. In jQuery, `mouseenter` and `mouseleave` provide a critical advantage over standard browser `mouseover` and `mouseout`: they **do not bubble** through nested children, eliminating unwanted trigger storms when hovering over nested DOM hierarchies.

jQuery 4.0 normalizes mouse button detection via `event.which` (1 = left click, 2 = middle wheel click, 3 = right click) and standardizes coordinate metrics (`event.clientX`, `event.clientY`, `event.pageX`, `event.pageY`).

### 3. Syntax
```javascript
// Generic mouse event binding
$(selector).on('click dblclick mousedown mouseup mouseenter mouseleave mousemove contextmenu', handler);

// Inspecting mouse coordinates and button in handler
$(selector).on('mousedown', function(event) {
  const button = event.which; // 1: left, 2: middle, 3: right
  const x = event.pageX;      // relative to entire document
  const y = event.pageY;
});
```

### 4. Parameters
- `event.which` *(Number)*: Indicates which mouse button was pressed (1: Left, 2: Middle, 3: Right).
- `event.pageX / event.pageY` *(Number)*: Horizontal and vertical coordinates relative to the full document edge (including scroll offsets).
- `event.clientX / event.clientY` *(Number)*: Horizontal and vertical coordinates relative to the browser viewport.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 17: Mouse Tracking</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    #canvasArea { width: 350px; height: 180px; background: #e2e8f0; border: 2px dashed #64748b; position: relative; }
    .badge { position: absolute; background: #2563eb; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
  </style>
</head>
<body>
  <div id="canvasArea">
    <p style="padding:10px; margin:0;">Move cursor or right-click inside box</p>
  </div>
  <p id="mouseCoords">X: 0, Y: 0</p>

  <script>
    const $canvas = $('#canvasArea');

    // Continuous mouse movement tracking
    $canvas.on('mousemove', function(event) {
      const offset = $(this).offset();
      const relativeX = Math.round(event.pageX - offset.left);
      const relativeY = Math.round(event.pageY - offset.top);
      $('#mouseCoords').text(`Box Relative -> X: ${relativeX}, Y: ${relativeY}`);
    });

    // Custom Context Menu (Right-Click) Interception
    $canvas.on('contextmenu', function(event) {
      event.preventDefault(); // suppress native OS menu
      alert(`Custom context menu triggered at (${event.pageX}, ${event.pageY})`);
    });

    // Clean hover state without child bubbling
    $canvas.on('mouseenter', function() {
      $(this).css('background', '#fef08a');
    }).on('mouseleave', function() {
      $(this).css('background', '#e2e8f0');
    });
  </script>
</body>
</html>
```

### 6. Output
- Hovering over `#canvasArea` turns the background yellow without flickering when moving over the inner `<p>`.
- The coordinates label updates live as the pointer traverses the box.
- Right-clicking triggers an alert box instead of the default browser context menu.

### 7. Practical Use
- Custom context menus and tooltip systems that position themselves based on cursor coordinates.
- Drag-and-drop file upload regions, interactive canvas drawing, and interactive image zooms.

### 8. Common Mistakes
- **Using `mouseover`/`mouseout` instead of `mouseenter`/`mouseleave`**: `mouseover` fires continuously whenever the cursor crosses into child elements, causing performance issues and flickering.
- **Forgetting `event.preventDefault()` on `contextmenu`**: The native context menu will pop up on top of any custom menu UI.

### 9. Best Practices
- Debounce or throttle high-frequency events like `mousemove` when performing costly layout calculations.
- Always use `event.pageX` and `event.pageY` when positioning fixed elements relative to the document.

### 10. Exercises
1. Build an interactive drawing canvas where holding down the left mouse button (`mousedown`) and moving (`mousemove`) leaves trail dots on the screen until `mouseup`.
2. Disable the right-click context menu on all images on a webpage and display a temporary "Image copyright protected" tooltip.

### 11. Interview Questions & Answers
**Q: What is the fundamental difference between `mouseover` / `mouseout` and `mouseenter` / `mouseleave`?**  
**A:** `mouseenter` and `mouseleave` do not bubble up the DOM tree and do not trigger when transitioning between an element and its descendants. `mouseover` and `mouseout` bubble, causing repetitive triggers whenever the mouse moves over children inside the container.

### 12. Mini Project: Interactive Image Loupe / Magnifier
```html
<div id="zoomContainer" style="position:relative; width:300px; height:200px; overflow:hidden; border:2px solid #334155;">
  <img id="zoomTarget" src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300" style="width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.1s ease-out;">
</div>

<script>
  $('#zoomContainer').on('mousemove', function(e) {
    const offset = $(this).offset();
    const x = ((e.pageX - offset.left) / $(this).width()) * 100;
    const y = ((e.pageY - offset.top) / $(this).height()) * 100;
    $('#zoomTarget').css({
      'transform-origin': `${x}% ${y}%`,
      'transform': 'scale(2.2)'
    });
  }).on('mouseleave', function() {
    $('#zoomTarget').css('transform', 'scale(1)');
  });
</script>
```

---

## Chapter 18: Keyboard Events

### 1. Objective
Capture user keyboard input, inspect key codes and key identifiers, implement keyboard shortcuts, and prevent unwanted keystrokes in jQuery 4.0.

### 2. Explanation
Keyboard events fire when a user interacts with physical or virtual keyboard keys:
- `keydown`: Fires immediately when a key is pressed down (repeats if held down).
- `keyup`: Fires when the key is released.
- `keypress`: **Deprecated across modern web standards and jQuery 4.0.** Always use `keydown` or `keyup` with `event.key` or `event.code`.

Modern jQuery 4.0 standardizes modern W3C keyboard properties:
- `event.key`: The actual character value generated (e.g. `'Enter'`, `'a'`, `'Escape'`, `'ArrowDown'`).
- `event.code`: The physical physical key position on the keyboard (e.g. `'KeyA'`, `'Digit1'`, `'Space'`).
- `event.ctrlKey`, `event.shiftKey`, `event.altKey`, `event.metaKey`: Boolean flags for modifier keys.

### 3. Syntax
```javascript
$(target).on('keydown', function(event) {
  if (event.key === 'Escape') {
    // Handle Escape
  }
  if (event.ctrlKey && event.key === 's') {
    event.preventDefault(); // prevent native save dialog
    // Handle custom save
  }
});
```

### 4. Parameters
- `event.key` *(String)*: Printable representation of the key (`'a'`, `'Backspace'`, `'Enter'`).
- `event.code` *(String)*: Physical physical key location (`'KeyS'`, `'Enter'`, `'ShiftLeft'`).
- `event.repeat` *(Boolean)*: True if the key is held down and auto-repeating.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 18: Keyboard Shortcuts</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <input type="text" id="tagInput" placeholder="Type tags and press Enter..." style="padding:8px; width:300px;">
  <div id="tagContainer" style="margin-top:10px;"></div>

  <script>
    $('#tagInput').on('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault(); // Stop form submission
        const val = $(this).val().trim();
        if (val !== '') {
          $('#tagContainer').append(
            `<span style="background:#e0f2fe; color:#0369a1; padding:4px 8px; border-radius:4px; margin-right:6px; display:inline-block;">
              #${val}
             </span>`
          );
          $(this).val('');
        }
      }
    });

    // Global shortcut: Press ESC to clear tags
    $(document).on('keydown', function(event) {
      if (event.key === 'Escape') {
        $('#tagContainer').empty();
      }
    });
  </script>
</body>
</html>
```

### 6. Output
- Typing in the input and pressing `Enter` creates a pill badge tag below and clears the input.
- Pressing `Escape` anywhere on the page removes all tags.

### 7. Practical Use
- Tag input fields, rich-text markdown editors, modal dismissals via `Escape`, accessible keyboard navigation for dropdowns.

### 8. Common Mistakes
- **Relying on deprecated `event.keyCode` or `event.which`**: Numerical key codes vary across international keyboard layouts. Use modern `event.key` and `event.code`.
- **Using removed `keypress`**: Modern browsers and mobile keyboards trigger `keydown`/`keyup` instead of `keypress`.

### 9. Best Practices
- Always check `event.key` rather than numeric keycodes.
- Prevent default behavior (`event.preventDefault()`) when capturing functional keys like `Tab` or `Enter` inside form controls.

### 10. Exercises
1. Build a character counter for a `<textarea>` that updates on every `keyup` and turns red when exceeding 140 characters.
2. Implement a global `Ctrl + K` (or `Cmd + K`) shortcut to focus a search bar.

### 11. Interview Questions & Answers
**Q: Why should developers prefer `event.key` over `event.keyCode` in jQuery 4.0?**  
**A:** `event.keyCode` is deprecated by W3C and returns non-standard integers that differ across platforms, operating systems, and keyboard layouts. `event.key` returns normalized, descriptive strings (`'Enter'`, `'ArrowUp'`, `'Escape'`).

### 12. Mini Project: Interactive Typeahead Search Filter
```html
<div style="max-width:320px; font-family:sans-serif;">
  <input type="text" id="userSearch" placeholder="Search team members..." style="width:100%; padding:8px; box-sizing:border-box;">
  <ul id="userList" style="list-style:none; padding:0; margin:8px 0; border:1px solid #ccc; border-radius:4px;">
    <li style="padding:8px; border-bottom:1px solid #eee;">Alexander Graham</li>
    <li style="padding:8px; border-bottom:1px solid #eee;">Beatrix Potter</li>
    <li style="padding:8px; border-bottom:1px solid #eee;">Charles Darwin</li>
    <li style="padding:8px; border-bottom:1px solid #eee;">Dorothy Hodgkin</li>
    <li style="padding:8px;">Elena Ferrante</li>
  </ul>
</div>

<script>
  $('#userSearch').on('keyup', function() {
    const query = $(this).val().toLowerCase().trim();
    $('#userList li').each(function() {
      const match = $(this).text().toLowerCase().includes(query);
      $(this).toggle(match);
    });
  });
</script>
```

---

## Chapter 19: Form Events

### 1. Objective
Handle form submissions, focus and blur transitions, value changes, input events, and form reset hooks in jQuery 4.0.

### 2. Explanation
Form events allow developers to intercept user data entry, validate inputs before network transmission, and provide real-time UI feedback.
Key form events:
- `submit`: Fires on `<form>` submission (via button click or Enter key).
- `focus` & `blur`: Fires when an input gains or loses focus. These events do **not** bubble.
- `focusin` & `focusout`: The bubbling equivalents of `focus` and `blur`.
- `change`: Fires when an input loses focus after its value has been modified (or immediately on checkboxes/select elements).
- `input`: Fires synchronously on every keystroke, cut, paste, or programmatic input change.

### 3. Syntax
```javascript
// Intercepting form submission
$('form').on('submit', function(event) {
  event.preventDefault(); // Halt native HTTP POST/GET navigation
  // Perform validation or AJAX submit
});

// Real-time input monitoring
$('input').on('input', function() {
  const currentVal = $(this).val();
});
```

### 4. Parameters
- `event.preventDefault()` *(Function)*: Prevents the browser from reloading the page or navigating to the form's `action` URL.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 19: Form Event Handling</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    .is-invalid { border: 2px solid #ef4444; background: #fef2f2; }
    .error-msg { color: #ef4444; font-size: 12px; display: none; }
  </style>
</head>
<body>
  <form id="loginForm" novalidate>
    <div>
      <label>Email:</label><br>
      <input type="email" id="userEmail" required style="padding:6px; width:250px;">
      <span class="error-msg" id="emailErr">Valid email is required.</span>
    </div>
    <br>
    <button type="submit" style="padding:8px 16px;">Sign In</button>
  </form>

  <script>
    // Live validation on blur
    $('#userEmail').on('blur', function() {
      const email = $(this).val().trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      $(this).toggleClass('is-invalid', !isValid);
      $('#emailErr').toggle(!isValid);
    });

    // Form submission interception
    $('#loginForm').on('submit', function(event) {
      event.preventDefault();
      $('#userEmail').trigger('blur');
      if (!$('.is-invalid').length) {
        alert('Form successfully submitted via AJAX!');
      }
    });
  </script>
</body>
</html>
```

### 6. Output
- Tab out or click outside an invalid email field: input turns red and the error message displays.
- Submitting an invalid form halts standard page reloading and highlights errors.

### 7. Practical Use
- Client-side pre-validation to reduce unnecessary server load.
- Real-time password strength indicators and instant formatters (e.g. credit card mask formatting).

### 8. Common Mistakes
- **Binding submit to the button instead of the form**: Binding `click` on `<button type="submit">` misses submissions triggered by pressing Enter inside inputs. Always bind `submit` to the `<form>`.
- **Forgetting `event.preventDefault()`**: The page reloads instantly, wiping out console logs and user input.

### 9. Best Practices
- Always add `novalidate` to `<form>` tags when handling validation entirely through JavaScript to prevent conflicting native browser tooltip popups.
- Use `input` instead of `change` when you need immediate feedback as the user types.

### 10. Exercises
1. Build an input field that dynamically shows the remaining characters allowed out of 50 using the `input` event.
2. Bind `focusin` and `focusout` to a parent container to highlight a whole fieldset whenever any inner child input is focused.

### 11. Interview Questions & Answers
**Q: What is the difference between `focus`/`blur` and `focusin`/`focusout`?**  
**A:** `focus` and `blur` do not bubble up the DOM tree, meaning they cannot be captured on ancestor elements via delegation. In contrast, `focusin` and `focusout` bubble, allowing developers to detect focus changes across multiple child elements from a single parent wrapper.

### 12. Mini Project: Interactive Live Password Strength Meter
```html
<div style="max-width:320px; font-family:sans-serif;">
  <label>Password:</label><br>
  <input type="password" id="pwdInput" style="width:100%; padding:8px; box-sizing:border-box;">
  <div style="height:6px; width:100%; background:#e2e8f0; margin-top:8px; border-radius:3px; overflow:hidden;">
    <div id="pwdBar" style="height:100%; width:0%; transition:all 0.3s;"></div>
  </div>
  <small id="pwdFeedback" style="font-size:12px; color:#64748b;"></small>
</div>

<script>
  $('#pwdInput').on('input', function() {
    const val = $(this).val();
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const config = [
      { w: '0%', bg: '#e2e8f0', text: '' },
      { w: '25%', bg: '#ef4444', text: 'Weak' },
      { w: '50%', bg: '#f97316', text: 'Fair' },
      { w: '75%', bg: '#eab308', text: 'Good' },
      { w: '100%', bg: '#22c55e', text: 'Strong' }
    ][score];

    $('#pwdBar').css({ width: config.w, backgroundColor: config.bg });
    $('#pwdFeedback').text(config.text);
  });
</script>
```

---

## Chapter 20: Event Delegation

### 1. Objective
Master event delegation in jQuery 4.0 to bind events to dynamic elements that do not yet exist in the DOM, reduce memory footprint, and optimize large-scale lists.

### 2. Explanation
Direct event binding attaches an event listener to every matching element present in the DOM at execution time:
```javascript
// Direct Binding: Only works for elements currently rendered
$('.todo-item').on('click', fn);
```
If an item is added asynchronously via AJAX or DOM creation, the newly created item has no listener attached.

**Event Delegation** solves this problem by binding the listener to a **permanent parent or ancestor element**, taking advantage of event bubbling. When an event occurs on any descendant, it bubbles up to the parent. jQuery inspects the event's origin; if it matches the selector filter, jQuery executes the callback with `this` bound to the matched child element.

### 3. Syntax
```javascript
// Delegated Event Pattern
$(ancestorSelector).on(eventType, childSelectorFilter, handlerFunction);
```

### 4. Parameters
- `ancestorSelector` *(String | Element)*: An element that already exists in the DOM and will not be destroyed (e.g. `'#todoList'`, `'table'`, `document`).
- `childSelectorFilter` *(String)*: The selector that specifies which descendants trigger the event (e.g. `'.btn-delete'`).
- `handlerFunction` *(Function)*: The callback. Inside the handler, `this` refers to the specific child element that matched the filter.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 20: Event Delegation</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="btnAddItem">Add New Item</button>
  <ul id="itemList" style="margin-top:1rem;">
    <li>Item 1 <button class="btn-remove">✕</button></li>
    <li>Item 2 <button class="btn-remove">✕</button></li>
  </ul>

  <script>
    let itemCount = 2;

    // Dynamically insert new elements
    $('#btnAddItem').on('click', function() {
      itemCount++;
      $('#itemList').append(`<li>Item ${itemCount} <button class="btn-remove">✕</button></li>`);
    });

    // Delegated listener: Works for both existing and future buttons!
    $('#itemList').on('click', '.btn-remove', function() {
      // 'this' is the specific .btn-remove button that was clicked
      $(this).closest('li').remove();
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Add New Item" injects new `<li>` elements.
- Clicking "✕" on **any** item (including newly added ones) instantly removes that item from the DOM without needing to attach new listeners.

### 7. Practical Use
- Infinite scrolling feeds, dynamic tables, shopping carts, task lists, and components populated via AJAX.
- Rendering high-volume data tables (e.g., 5,000 rows) with a single listener on `<tbody>` instead of 5,000 separate listeners.

### 8. Common Mistakes
- **Delegating directly to `$(document)` for everything**: While convenient, delegating everything to `document` hurts performance because every single event on the entire page must be evaluated against the selector. Choose the closest static container.
- **Using a dynamic element as the ancestor**: If the ancestor element itself gets replaced or deleted, all delegated events inside it are lost.

### 9. Best Practices
- Bind delegated listeners to the closest static parent container rather than `document.body`.
- Use `.closest()` inside delegated handlers to safely traverse up to the relevant row or card container.

### 10. Exercises
1. Build a dynamic table where clicking a "Delete Row" button removes the row, and clicking any cell allows the user to edit its text inline.
2. Compare memory consumption: write a script that binds 1,000 buttons directly vs. 1 delegated listener on their parent container.

### 11. Interview Questions & Answers
**Q: How does event delegation work under the hood in jQuery?**  
**A:** Event delegation relies on standard DOM event bubbling. A single listener is attached to an ancestor. When an event occurs on a descendant, it bubbles up to that ancestor. jQuery intercepts the event at the ancestor level, tests if `event.target` or any of its ancestors match the selector filter, and if so, invokes the handler with `this` set to the matching element.

### 12. Mini Project: Interactive Task Checklist Manager
```html
<div style="max-width:350px; font-family:sans-serif;">
  <h3>Delegated Task List</h3>
  <div style="display:flex; gap:8px;">
    <input type="text" id="newTaskInput" placeholder="New task..." style="flex:1; padding:6px;">
    <button id="btnCreateTask">Add</button>
  </div>
  <ul id="taskContainer" style="list-style:none; padding:0; margin-top:12px;"></ul>
</div>

<script>
  $('#btnCreateTask').on('click', function() {
    const text = $('#newTaskInput').val().trim();
    if (!text) return;
    $('#taskContainer').append(`
      <li style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid #ddd;">
        <span class="task-text" style="cursor:pointer;">${text}</span>
        <button class="task-del" style="background:#fee2e2; border:none; cursor:pointer;">Del</button>
      </li>
    `);
    $('#newTaskInput').val('').focus();
  });

  // Single delegated listener for completion toggle
  $('#taskContainer').on('click', '.task-text', function() {
    $(this).toggleClass('completed').css('text-decoration', function(_, val) {
      return val === 'line-through' ? 'none' : 'line-through';
    });
  });

  // Single delegated listener for deletion
  $('#taskContainer').on('click', '.task-del', function() {
    $(this).closest('li').fadeOut(200, function() { $(this).remove(); });
  });
</script>
```

---

## Chapter 21: Event Propagation & Bubbling

### 1. Objective
Understand the DOM event lifecycle (Capturing vs. Bubbling), control event propagation using `stopPropagation()`, `stopImmediatePropagation()`, and `preventDefault()`, and avoid conflicting handlers.

### 2. Explanation
When an event occurs in the DOM, it travels through three distinct phases:
1. **Capturing Phase**: Descends from the `window` down to the target element.
2. **Target Phase**: Executes on the exact element that triggered the event.
3. **Bubbling Phase**: Ascends back up from the target element through all its parent ancestors up to `window`.

jQuery binds listeners to the **Bubbling Phase** by default. Without intervention, an event triggered on a button inside a card will bubble up and trigger click handlers on the card, the section, and the document.

Three crucial methods control propagation:
- `event.preventDefault()`: Prevents the browser's default action (e.g. following a link, submitting a form) without stopping bubbling.
- `event.stopPropagation()`: Stops the event from bubbling up to parent ancestors. Other handlers attached to the *same* element still execute.
- `event.stopImmediatePropagation()`: Stops bubbling **and** prevents any remaining sibling handlers attached to the *same* element from running.
- `return false`: In jQuery event handlers, returning `false` is equivalent to calling **both** `event.preventDefault()` and `event.stopPropagation()`.

### 3. Syntax
```javascript
$(selector).on('click', function(event) {
  event.preventDefault();             // Stop default browser behavior
  event.stopPropagation();            // Stop bubbling up to parent nodes
  event.stopImmediatePropagation();   // Stop other listeners on this same node
});
```

### 4. Parameters
- `event.isDefaultPrevented()` *(Function)*: Returns `true` if `preventDefault()` was called.
- `event.isPropagationStopped()` *(Function)*: Returns `true` if `stopPropagation()` was called.
- `event.isImmediatePropagationStopped()` *(Function)*: Returns `true` if `stopImmediatePropagation()` was called.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 21: Event Propagation</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    .outer-box { padding: 30px; background: #e0f2fe; }
    .inner-box { padding: 20px; background: #bae6fd; }
    .btn-action { padding: 10px 15px; background: #0284c7; color: white; border: none; cursor: pointer; }
  </style>
</head>
<body>
  <div class="outer-box" id="outer">
    Outer Box
    <div class="inner-box" id="inner">
      Inner Box
      <button class="btn-action" id="btnChild">Click Me</button>
    </div>
  </div>

  <script>
    $('#outer').on('click', function() {
      alert('Outer Box clicked!');
    });

    $('#inner').on('click', function() {
      alert('Inner Box clicked!');
    });

    $('#btnChild').on('click', function(event) {
      alert('Button clicked! Stopping propagation.');
      event.stopPropagation(); // Prevents inner and outer boxes from firing
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking the button alerts `"Button clicked! Stopping propagation."`. Because `event.stopPropagation()` was invoked, neither the Inner Box nor Outer Box alert triggers.
- Clicking the Inner Box alerts `"Inner Box clicked!"` followed by `"Outer Box clicked!"` due to natural bubbling.

### 7. Practical Use
- Dropdown menus and modals: Clicking inside the dropdown panel must not bubble up to the document click listener that closes the dropdown.
- Nested actionable widgets (e.g., a "Delete" button inside an entire clickable table row).

### 8. Common Mistakes
- **Overusing `return false`**: Returning `false` prevents both default action and bubbling. Often, developers only intended `event.preventDefault()` (e.g., on a link `#`), accidentally breaking parent delegation.
- **Forgetting that `stopPropagation()` breaks delegation**: If you call `stopPropagation()` on a child, parent containers listening via delegated selectors will never receive the event.

### 9. Best Practices
- Be explicit: use `event.preventDefault()` and `event.stopPropagation()` individually rather than `return false`.
- Do not stop propagation unless strictly required, as it disrupts analytics trackers and delegated parent listeners.

### 10. Exercises
1. Create a modal popup. Clicking the backdrop closes the modal, but clicking inside the modal content box does not close it.
2. Attach two click listeners to the same button. Use `stopImmediatePropagation()` in the first listener to block the second from firing.

### 11. Interview Questions & Answers
**Q: What is the exact difference between `stopPropagation()` and `stopImmediatePropagation()`?**  
**A:** `stopPropagation()` prevents the event from traveling further up or down the DOM hierarchy to parent/ancestor elements. `stopImmediatePropagation()` does that **and** halts the execution of any other event handlers attached to the exact same element for that event type.

### 12. Mini Project: Click-Outside-to-Dismiss Dropdown Menu
```html
<div style="padding:2rem; font-family:sans-serif;">
  <div style="position:relative; display:inline-block;">
    <button id="dropdownToggle" style="padding:8px 16px; cursor:pointer;">Options ▼</button>
    <div id="dropdownMenu" style="display:none; position:absolute; top:100%; left:0; width:160px; background:#fff; border:1px solid #ccc; box-shadow:0 4px 6px rgba(0,0,0,0.1); border-radius:4px; z-index:100;">
      <a href="#" style="display:block; padding:8px 12px; text-decoration:none; color:#333;">Profile</a>
      <a href="#" style="display:block; padding:8px 12px; text-decoration:none; color:#333;">Settings</a>
      <a href="#" style="display:block; padding:8px 12px; text-decoration:none; color:#dc2626;">Log Out</a>
    </div>
  </div>
</div>

<script>
  // Toggle dropdown and isolate its click from document
  $('#dropdownToggle').on('click', function(e) {
    e.stopPropagation();
    $('#dropdownMenu').toggle();
  });

  // Prevent clicks inside the dropdown menu from closing it
  $('#dropdownMenu').on('click', function(e) {
    e.stopPropagation();
  });

  // Global dismiss when clicking outside
  $(document).on('click', function() {
    $('#dropdownMenu').hide();
  });
</script>
```

---

## Chapter 22: Custom Events

### 1. Objective
Design, trigger, and listen to custom application events using `.trigger()` and `.triggerHandler()` to build decoupled, modular architectures in jQuery 4.0.

### 2. Explanation
Custom events allow components to communicate without tightly coupling their codebases. Instead of component A directly calling methods on component B, component A emits a custom event (e.g. `'cart:updated'`), and any interested components independently listen for and react to that event.

jQuery provides two triggering mechanisms:
1. `.trigger(eventType [, extraParameters])`: Executes all attached handlers **and** bubbles the event up the DOM tree. If triggered on native events (like `submit`), it executes the browser's default behavior.
2. `.triggerHandler(eventType [, extraParameters])`: Executes attached handlers on the **first matched element only**, **does not bubble**, does not trigger browser default behavior, and returns the value returned by the last handler.

### 3. Syntax
```javascript
// Listening to a custom event
$(target).on('custom:eventName', function(event, param1, param2) {
  // Handle event
});

// Triggering with bubbling
$(target).trigger('custom:eventName', [arg1, arg2]);

// Triggering without bubbling or default action
$(target).triggerHandler('custom:eventName', [arg1, arg2]);
```

### 4. Parameters
- `eventType` *(String)*: The custom event name (conventionally formatted as `noun:action`, e.g. `'user:logout'`).
- `extraParameters` *(Array | Object)*: Data passed to the event handler function after the `event` object.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 22: Custom Events</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <div id="cartSummary">Total Items: <span id="cartCount">0</span> | Total Price: $<span id="cartTotal">0.00</span></div>
  <hr>
  <div class="product" data-price="29.99">
    <span>Wireless Headphones - $29.99</span>
    <button class="btn-buy">Add to Cart</button>
  </div>

  <script>
    let totalItems = 0;
    let totalPrice = 0.0;

    // Decoupled Cart listener
    $(document).on('cart:itemAdded', function(event, itemData) {
      totalItems += itemData.quantity;
      totalPrice += itemData.price * itemData.quantity;
      $('#cartCount').text(totalItems);
      $('#cartTotal').text(totalPrice.toFixed(2));
    });

    // Product purchase logic emits custom event
    $('.btn-buy').on('click', function() {
      const price = parseFloat($(this).closest('.product').data('price'));
      // Emit custom event with payload
      $(document).trigger('cart:itemAdded', [{ price: price, quantity: 1 }]);
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Add to Cart" triggers `'cart:itemAdded'`.
- The cart summary independently receives the event payload and updates the item counter and formatted price.

### 7. Practical Use
- Mediating state across detached UI widgets (e.g., updating a header notification counter when an inbox message is read).
- Building plugin systems where third-party scripts can hook into lifecycle events (`'plugin:initialized'`, `'slider:slideChanged'`).

### 8. Common Mistakes
- **Passing extra parameters as non-array**: When passing multiple parameters, wrap them in an array: `$(el).trigger('event', [arg1, arg2])`. Passing an array of one object `[{ a: 1 }]` preserves the object as a single parameter.
- **Accidental bubbling with `.trigger()`**: Triggering events on deeply nested elements bubbles up to `document`. Use `.triggerHandler()` if you want isolated execution.

### 9. Best Practices
- Namespace custom events with colons (e.g. `'auth:login'`, `'modal:opened'`) to avoid conflicts with present or future standard HTML events.
- Prefer `.triggerHandler()` for element-specific logic where bubbling is unnecessary.

### 10. Exercises
1. Create a custom event `'theme:changed'` that accepts `'dark'` or `'light'` as an argument and updates background and font colors.
2. Build two unrelated buttons that trigger a custom event on `document` to increment and decrement a shared counter.

### 11. Interview Questions & Answers
**Q: What are the key differences between `.trigger()` and `.triggerHandler()`?**  
**A:**  
1. `.trigger()` affects all elements in the jQuery collection; `.triggerHandler()` operates only on the first element.  
2. `.trigger()` bubbles up the DOM hierarchy; `.triggerHandler()` does not bubble.  
3. `.trigger()` executes native browser default actions; `.triggerHandler()` never triggers default behavior.  
4. `.triggerHandler()` returns the value returned by the handler instead of the jQuery collection.

### 12. Mini Project: Publish-Subscribe Notification System
```html
<div style="font-family:sans-serif; padding:1rem;">
  <div id="toastContainer" style="position:fixed; top:20px; right:20px; z-index:9999;"></div>
  
  <button id="btnSuccess">Trigger Success Toast</button>
  <button id="btnError">Trigger Error Toast</button>
</div>

<script>
  // Central Toast Subscriber
  $(document).on('app:notify', function(event, notification) {
    const bg = notification.type === 'success' ? '#22c55e' : '#ef4444';
    const $toast = $(`
      <div style="background:${bg}; color:#fff; padding:12px 20px; border-radius:6px; margin-bottom:10px; box-shadow:0 2px 5px rgba(0,0,0,0.2); display:none;">
        ${notification.message}
      </div>
    `);
    $('#toastContainer').append($toast);
    $toast.fadeIn(200).delay(2500).fadeOut(300, function() { $(this).remove(); });
  });

  // Decoupled Publishers
  $('#btnSuccess').on('click', function() {
    $(document).trigger('app:notify', [{ type: 'success', message: 'Item saved successfully!' }]);
  });

  $('#btnError').on('click', function() {
    $(document).trigger('app:notify', [{ type: 'error', message: 'Failed to connect to database.' }]);
  });
</script>
```

---

## Chapter 23: Namespaced Events

### 1. Objective
Organize and scope event handlers using namespaces in jQuery 4.0, allowing selective unbinding and targeted event triggering without collateral side effects.

### 2. Explanation
In large applications or plugin-heavy architectures, multiple scripts frequently bind listeners of the same type (e.g. `'click'`, `'resize'`, `'scroll'`) to the same DOM element or `window`. 

If a developer calls `$(window).off('resize')`, **every single resize listener on the page is removed**, including those attached by UI libraries, layout engines, and third-party widgets.

**Event Namespacing** allows you to attach an identifier suffix to an event name using dot notation: `'click.myPlugin'`. This enables you to:
- Selectively remove your specific handlers without affecting other handlers: `$(el).off('click.myPlugin')`.
- Selectively remove *all* events under a namespace across any event type: `$(el).off('.myPlugin')`.
- Target-trigger only handlers within that namespace: `$(el).trigger('click.myPlugin')`.

### 3. Syntax
```javascript
// Attaching namespaced events
$(selector).on('click.pluginNamespace', handler1);
$(selector).on('keydown.pluginNamespace', handler2);

// Removing ONLY the namespaced click
$(selector).off('click.pluginNamespace');

// Removing ALL events under the namespace regardless of event type
$(selector).off('.pluginNamespace');

// Triggering ONLY handlers within that namespace
$(selector).trigger('click.pluginNamespace');
```

### 4. Parameters
- `'eventType.namespace'`: The base event followed by a period and the custom namespace string. Multiple namespaces can be chained (e.g. `'click.modal.auth'`).

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 23: Namespaced Events</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="multiBtn">Click Me</button>
  <hr>
  <button id="btnUnbindAnalytics">Unbind Analytics Handler</button>
  <button id="btnUnbindAll">Unbind All Core Handlers</button>

  <script>
    const $btn = $('#multiBtn');

    // Core application click handler
    $btn.on('click.coreApp', function() {
      console.log('[Core] Business transaction executed.');
    });

    // Analytics click handler on the same button
    $btn.on('click.analyticsTracker', function() {
      console.log('[Analytics] User click event dispatched to tracker.');
    });

    // Remove only analytics without disrupting core logic
    $('#btnUnbindAnalytics').on('click', function() {
      $btn.off('click.analyticsTracker');
      alert('Analytics handler detached. Core handler remains active!');
    });

    // Remove only core app logic
    $('#btnUnbindAll').on('click', function() {
      $btn.off('.coreApp');
      alert('Core handlers detached.');
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking `#multiBtn` outputs both `[Core]` and `[Analytics]` messages to the console.
- Clicking "Unbind Analytics Handler" detaches `.analyticsTracker`. Future clicks on `#multiBtn` still execute `[Core]`.

### 7. Practical Use
- Developing reusable jQuery plugins: Cleanly tears down only the plugin's events when destroying a widget without breaking parent page logic.
- Page transition routers (e.g. SPAs, Turbo, Pjax) that clean up page-specific window resize/scroll listeners on navigation.

### 8. Common Mistakes
- **Using `.off('click')` instead of `.off('click.myNamespace')`**: This strips away other developers' handlers and breaks external plugins.
- **Forgetting sub-namespaces**: Writing `click.a.b` attaches an event with two namespaces (`a` and `b`). Calling `.off('.a')` or `.off('.b')` will remove it.

### 9. Best Practices
- Always namespace window-level events (`$(window).on('resize.myFeature', ...)`).
- Package all handlers inside a dedicated teardown method in your plugins: `destroy: function() { this.$el.off('.myPlugin'); }`.

### 10. Exercises
1. Bind a `'scroll'` event to `$(window)` namespaced with `.stickyHeader`. Write a button handler that removes only that scroll listener.
2. Bind a click event with two namespaces: `'click.auth.modal'`. Verify that `.off('.auth')` successfully removes it.

### 11. Interview Questions & Answers
**Q: Why is namespacing critical when binding events to global objects like `window` or `document`?**  
**A:** `window` and `document` are singletons shared across the entire application and all third-party libraries. If you call `$(window).off('resize')`, you destroy all resize listeners on the page. Using `$(window).off('resize.myModule')` ensures you only clean up your own module's event footprint.

### 12. Mini Project: Collapsible Accordion Plugin with Clean Teardown
```html
<div id="accordionWrapper" style="max-width:350px; font-family:sans-serif;">
  <div class="acc-group">
    <div class="acc-header" style="background:#e2e8f0; padding:10px; cursor:pointer; font-weight:bold;">Section 1</div>
    <div class="acc-body" style="padding:10px; display:none; background:#f8fafc;">Content for section 1.</div>
  </div>
  <div class="acc-group" style="margin-top:4px;">
    <div class="acc-header" style="background:#e2e8f0; padding:10px; cursor:pointer; font-weight:bold;">Section 2</div>
    <div class="acc-body" style="padding:10px; display:none; background:#f8fafc;">Content for section 2.</div>
  </div>
  <button id="btnDestroyAcc" style="margin-top:10px;">Destroy Accordion Events</button>
</div>

<script>
  // Initialize accordion with namespaced events
  function initAccordion($container) {
    $container.on('click.accordionWidget', '.acc-header', function() {
      const $body = $(this).next('.acc-body');
      $container.find('.acc-body').not($body).slideUp(200);
      $body.slideToggle(200);
    });
  }

  // Teardown accordion
  function destroyAccordion($container) {
    $container.off('.accordionWidget');
    $container.find('.acc-body').show(); // restore default display
  }

  initAccordion($('#accordionWrapper'));

  $('#btnDestroyAcc').on('click', function() {
    destroyAccordion($('#accordionWrapper'));
    alert('Accordion namespaced events destroyed!');
  });
</script>
```
