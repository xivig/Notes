# 🌲 Module 04: DOM Traversal

Navigate the DOM tree upwards, downwards, and sideways using `.parent()`, `.closest()`, `.find()`, `.children()`, `.siblings()`, and manage traversal stacks via `.end()` and `.addBack()`.

---

### 1. Objective
Master traversing the DOM tree hierarchy in any direction from an initial reference point without resorting to rigid, fragile query selectors.

### 2. Explanation
DOM traversal navigates relational links between elements in the document tree. Rather than performing a global search for an element by ID or class, traversal begins from a known context (such as a clicked button) and moves relative to that element:

- **Upwards (Ancestors)**:
  - `.parent()`: Direct immediate parent.
  - `.parents(filter)`: All ancestors up to `<html>`.
  - `.closest(filter)`: Traverses upwards until it finds the **first single ancestor** matching the filter (indispensable for event delegation).
- **Downwards (Descendants)**:
  - `.children(filter)`: Direct immediate children only.
  - `.find(filter)`: All descendants at any depth matching the filter.
- **Sideways (Siblings)**:
  - `.siblings(filter)`: All sibling elements.
  - `.next()` / `.prev()`: Immediately adjacent following/preceding sibling.
  - `.nextAll()` / `.prevAll()`: All following/preceding siblings.
- **Stack Management**:
  - `.end()`: Pops the latest traversal method from the internal stack, reverting to the previous collection state.
  - `.addBack()`: Combines the current collection with the previous collection.

### 3. Syntax
```javascript
// Navigate to closest card container
const $card = $(this).closest('.card');

// Find all buttons inside that card
const $cardButtons = $card.find('button');

// Stack management with .end()
$('#menu')
  .find('.active')
    .addClass('highlight')
  .end() // reverts selection back to #menu!
  .addClass('menu-initialized');
```

### 4. Parameters
- `filter` *(String, optional)*: A CSS selector used to filter traversed elements.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 04: DOM Traversal</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    .card { padding: 15px; border: 1px solid #ccc; margin-bottom: 10px; border-radius: 6px; }
    .highlighted-card { border-color: #2563eb; background: #eff6ff; }
  </style>
</head>
<body>
  <div class="card" id="card1">
    <h3>Article One</h3>
    <button class="btn-select">Select Article</button>
  </div>
  <div class="card" id="card2">
    <h3>Article Two</h3>
    <button class="btn-select">Select Article</button>
  </div>

  <script>
    $(function() {
      // Traverse from clicked button to closest card ancestor
      $('.btn-select').on('click', function() {
        const $btn = $(this);
        
        // 1. Move up to closest card
        const $card = $btn.closest('.card');

        // 2. Highlight this card and de-highlight siblings
        $card
          .addClass('highlighted-card')
          .siblings('.card')
            .removeClass('highlighted-card');
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Select Article" locates the specific card containing the button, applies `.highlighted-card`, and removes the class from all sibling cards.

### 7. Practical Use
- Table row action buttons (Delete, Edit, View) that locate the enclosing `<tr>` via `$(this).closest('tr')`.
- Accordion dropdown panels that toggle the adjacent body via `$(this).next('.accordion-body')`.

### 8. Common Mistakes
- **Confusing `.children()` with `.find()`**: `.children()` only inspects immediate children (1 level deep). If you are looking for deeply nested buttons, `.children('button')` will fail. Use `.find('button')`.
- **Using `.parent()` when `.closest()` is appropriate**: If markup structure changes (e.g. wrapping a button in a `<span>`), hardcoded `.parent().parent()` chains break immediately. `.closest('.card')` remains stable regardless of intermediate markup.

### 9. Best Practices
- Always prefer `.closest(selector)` over chained `.parent().parent()`.
- Use `.find()` when searching downwards within a cached component container.

### 10. Exercises
1. Given a nested navigation list, write a script that adds a class to all ancestor `<ul>` elements of an active link using `.parents('ul')`.
2. Build a tab bar where clicking a tab button de-activates all sibling buttons and activates the clicked one in a single chained statement.

### 11. Interview Questions & Answers
**Q: How do `.closest()` and `.parents()` differ when traversing ancestor elements?**  
**A:**  
1. `.closest()` starts matching from the current element itself; `.parents()` begins with the immediate parent.  
2. `.closest()` traverses upwards and stops at the **very first single element** matching the selector, returning a collection of 0 or 1 elements.  
3. `.parents()` traverses all the way up to `<html>` and returns **all matching ancestors** in the document hierarchy.

### 12. Mini Project: Interactive Table Row Pinning System
```html
<table border="1" cellpadding="8" style="border-collapse:collapse; width:300px; font-family:sans-serif;">
  <tr><td>Task A</td><td><button class="pin-btn">Pin</button></td></tr>
  <tr><td>Task B</td><td><button class="pin-btn">Pin</button></td></tr>
  <tr><td>Task C</td><td><button class="pin-btn">Pin</button></td></tr>
</table>

<script>
  $(function() {
    $('.pin-btn').on('click', function() {
      const $row = $(this).closest('tr');
      // Prepend to top of table body
      $row.prependTo($row.parent());
      $row.css('background', '#fef3c7');
    });
  });
</script>
```
