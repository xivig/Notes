# 📘 Part 2 — Selectors and DOM

An exhaustive guide to modern **jQuery 4.0.0** selectors, native query routing, attribute filtering, hierarchical navigation, traversal stack mechanics, DOM manipulation, element lifecycles, and data attributes.

---

## 📑 Table of Contents
1. [Chapter 8: Basic Selectors](#chapter-8-basic-selectors)
2. [Chapter 9: Attribute Selectors](#chapter-9-attribute-selectors)
3. [Chapter 10: Hierarchy Selectors](#chapter-10-hierarchy-selectors)
4. [Chapter 11: Advanced Selectors & Filters](#chapter-11-advanced-selectors-and-filters)
5. [Chapter 12: DOM Traversal](#chapter-12-dom-traversal)
6. [Chapter 13: DOM Manipulation](#chapter-13-dom-manipulation)
7. [Chapter 14: Creating and Removing Elements](#chapter-14-creating-and-removing-elements)
8. [Chapter 15: Attributes, Properties and Data](#chapter-15-attributes-properties-and-data)

---

## Chapter 8: Basic Selectors

### 1. Objective
Master basic CSS selectors in jQuery 4.0 (ID, Class, Element, Universal, and Multiple Selector groups) and understand how jQuery 4.0 directly routes them through native `document.getElementById` and `document.querySelectorAll`.

### 2. Explanation
In jQuery 4.0, the legacy Sizzle selector engine has been retired. Standard CSS selectors are passed directly to the browser's native C++ query engine (`document.querySelectorAll`), delivering near-native performance.
- **ID Selector (`#id`)**: Fastest selector; delegates internally to `document.getElementById()`.
- **Class Selector (`.class`)**: Delegates to `document.getElementsByClassName()` or `querySelectorAll()`.
- **Element Selector (`tag`)**: Matches all elements of a specified tag name.
- **Universal Selector (`*`)**: Matches all elements in the DOM context.
- **Multiple Selector (`sel1, sel2, sel3`)**: Selects the combined union of several selectors.

### 3. Syntax
```javascript
$('#header');              // ID selector
$('.menu-item');           // Class selector
$('p');                    // Element selector
$('*');                    // Universal selector
$('h1, h2, .subheading');  // Multiple group selector
```

### 4. Parameters
- `selector` *(String)*: A valid CSS selector string.
- `context` *(Element | jQuery, optional)*: A DOM element or jQuery collection to restrict the search scope.

### 5. Examples
```html
<div id="app">
  <h1 class="title">Dashboard</h1>
  <p class="summary">System healthy</p>
  <button id="btnRefresh" class="btn btn-primary">Refresh</button>
  <button class="btn btn-secondary">Settings</button>
</div>

<script>
  // 1. Target by unique ID
  $('#btnRefresh').on('click', function() {
    // 2. Target by class name
    $('.summary').text('Refreshing telemetry...');

    // 3. Target multiple elements simultaneously
    $('h1, .btn').css('letter-spacing', '1px');
  });
</script>
```

### 6. Output
- Clicking `#btnRefresh` updates `.summary` to `"Refreshing telemetry..."` and simultaneously applies `letter-spacing: 1px` to both the `<h1>` and all `.btn` elements.

### 7. Practical Use
- Querying form controls, navigation bars, and buttons for event attachment and style synchronization.

### 8. Common Mistakes
- **Prefixing IDs with periods or classes with hashes** (e.g. `$('.myId')` instead of `$('#myId')`).
- **Expecting multiple elements from an ID**: HTML IDs must be unique per page. `$('#duplicate')` returns only the first matched node.

### 9. Best Practices
- Prefer ID selectors (`#id`) for single unique widgets—they are evaluated directly via native `getElementById`.
- Scope queries to a parent container whenever searching large DOM trees (`$('.item', '#container')`).

### 10. Exercises
1. Write a selector that matches all `<h1>`, `<h2>`, and `<h3>` tags inside an element with ID `contentArea`.
2. Given a list of items with class `.todo-item`, select only those items and turn their text color gray.

### 11. Interview Questions & Answers
**Q: Why are basic selectors significantly faster in jQuery 4.0 than in jQuery 1.x?**  
**A:** jQuery 1.x and 2.x routed all complex selectors through its bundled Sizzle JavaScript parser. In jQuery 4.0, Sizzle was removed; the engine delegates directly to the browser's native `document.querySelectorAll()`, eliminating JavaScript tokenization overhead.

### 12. Mini Project: Group Styler Widget
```html
<div id="stylerPanel">
  <input type="text" placeholder="Name">
  <textarea placeholder="Bio"></textarea>
  <button id="applyFocusStyle">Highlight Inputs</button>
</div>

<script>
  $('#applyFocusStyle').on('click', function() {
    $('input, textarea', '#stylerPanel')
      .css({ border: '2px solid #6366f1', background: '#eef2ff' });
  });
</script>
```

---

## Chapter 9: Attribute Selectors

### 1. Objective
Target DOM elements based on the presence, absence, exact value, or partial value of HTML attributes.

### 2. Explanation
Attribute selectors provide surgical precision when IDs and class names are insufficient. They match based on HTML attributes such as `href`, `data-*`, `type`, `name`, `disabled`, and `target`.

| Selector | Meaning | Example |
| :--- | :--- | :--- |
| `[attr]` | Has attribute | `$('input[required]')` |
| `[attr="val"]` | Exactly equals `val` | `$('input[type="checkbox"]')` |
| `[attr!="val"]`| Does NOT equal `val` | `$('a[target!="_blank"]')` |
| `[attr^="val"]`| Starts with `val` | `$('a[href^="https://"]')` |
| `[attr$="val"]`| Ends with `val` | `$('a[href$=".pdf"]')` |
| `[attr*="val"]`| Contains substring `val` | `$('img[src*="avatar"]')` |
| `[attr~="val"]`| Contains space-delimited word | `$('div[data-roles~="admin"]')` |

### 3. Syntax
```javascript
$('element[attribute operator "value"]');
```

### 4. Parameters
- `operator`: The matching operator (`=`, `!=`, `^=`, `$=`, `*=`, `~=`).
- `"value"`: The target string value (surrounded in quotes).

### 5. Examples
```html
<div id="linkDirectory">
  <a href="https://google.com">Google (Secure)</a>
  <a href="http://insecure.org">Insecure Link</a>
  <a href="/downloads/annual-report.pdf">Annual Report (PDF)</a>
  <a href="/downloads/archive.zip">Archive (ZIP)</a>
</div>

<script>
  // 1. Highlight all secure external HTTPS links
  $('a[href^="https://"]').css('color', '#16a34a');

  // 2. Add an icon indicator to all PDF downloads
  $('a[href$=".pdf"]').append(' 📄');

  // 3. Target insecure links
  $('a[href^="http://"]').css({ color: '#dc2626', textDecoration: 'line-through' });
</script>
```

### 6. Output
- Google link turns green.
- Insecure link turns red and struck through.
- Annual Report link gains a `" 📄"` document icon suffix.

### 7. Practical Use
- Form automation: selecting input fields by `name` attribute (`$('input[name="email"]')`).
- Automatically opening external links in new tabs: `$('a[href^="http"]').attr('target', '_blank');`.

### 8. Common Mistakes
- **Forgetting quotes around attribute values**: While unquoted alphanumeric values sometimes work, values containing punctuation, spaces, or slashes (e.g. `[href="https://..."]`) throw syntax errors without quotes.

### 9. Best Practices
- Qualify attribute selectors with a tag name (e.g. `$('input[name="user"]')` instead of `$('[name="user"]')`) to allow native query engines to filter by tag first.

### 10. Exercises
1. Write a selector to find all image elements whose `src` attribute ends with `.png`.
2. Write a selector targeting all disabled buttons: `button[disabled]`.

### 11. Interview Questions & Answers
**Q: How does `[data-role*="admin"]` differ from `[data-role~="admin"]`?**  
**A:** `*=` matches `"admin"` anywhere as a substring (e.g., matching `"superadministrator"`). `~=` matches `"admin"` as a distinct space-separated word (e.g., matching `"user admin manager"`, but not `"superadministrator"`).

### 12. Mini Project: Dynamic File Type Icon Decorator
```html
<ul id="fileList">
  <li><a href="contract.docx">Contract</a></li>
  <li><a href="presentation.pptx">Slides</a></li>
  <li><a href="sheet.xlsx">Financials</a></li>
</ul>

<script>
  $('a[href$=".docx"]').prepend('📝 ');
  $('a[href$=".pptx"]').prepend('📊 ');
  $('a[href$=".xlsx"]').prepend('📈 ');
</script>
```

---

## Chapter 10: Hierarchy Selectors

### 1. Objective
Navigate and match elements based on their ancestor, parent, child, and sibling relationships in the DOM tree.

### 2. Explanation
HTML is a tree structure. Hierarchy selectors express positional relationships between nodes:
1. **Descendant Selector (`ancestor descendant`)**: Matches all descendants at any nesting depth.
2. **Child Selector (`parent > child`)**: Matches immediate direct children only.
3. **Adjacent Sibling (`prev + next`)**: Matches the very next sibling immediately following `prev`.
4. **General Sibling (`prev ~ siblings`)**: Matches all subsequent siblings following `prev`.

### 3. Syntax
```javascript
$('div p');          // Descendant: all <p> anywhere inside <div>
$('ul > li');        // Direct child: only <li> directly under <ul>
$('label + input');  // Adjacent: <input> immediately after <label>
$('h2 ~ p');         // General siblings: all <p> following <h2>
```

### 4. Parameters
- Combinator tokens: `" "` (space for descendant), `>` (direct child), `+` (adjacent sibling), `~` (subsequent siblings).

### 5. Examples
```html
<div class="card">
  <div class="card-body">
    <p class="intro">Card introduction.</p>
    <div>
      <p class="nested">Deeply nested paragraph.</p>
    </div>
  </div>
</div>

<script>
  // 1. Descendant selector matches BOTH paragraphs
  console.log($('.card p').length); // 2

  // 2. Child selector matches only the direct child of .card-body
  console.log($('.card-body > p').length); // 1 (only .intro)
</script>
```

### 6. Output
```text
2
1
```

### 7. Practical Use
- Constructing accessible form layouts: targeting the input immediately following a required label (`label.required + input`).
- Breadcrumbs and multi-level navigational dropdown menus.

### 8. Common Mistakes
- Confusing descendant (`ancestor descendant`) with child (`parent > child`). In deeply nested lists (`<ul><li><ul><li>...</li></ul></li></ul>`), `$('ul li')` matches nested inner items unintentionally.

### 9. Best Practices
- Use child selectors (`>`) whenever selecting immediate items in tables (`table > tbody > tr`) or navigation bars to prevent unintended modifications to nested submenus.

### 10. Exercises
1. Given an `<h2>`, write a selector that highlights only the first paragraph that comes immediately after it.
2. Given a nested navigation menu, select only the top-level list items.

### 11. Interview Questions & Answers
**Q: How does `prev + next` differ from `prev ~ siblings`?**  
**A:** `prev + next` matches only the single element immediately adjacent to `prev`. `prev ~ siblings` matches all sibling elements that appear after `prev` sharing the same parent, regardless of distance.

### 12. Mini Project: Form Field Active Sibling Indicator
```html
<div class="field-row">
  <label for="uEmail">Email Address</label>
  <input type="email" id="uEmail">
  <span class="hint">We will never share your email.</span>
</div>

<script>
  // Target hint sibling when input receives focus
  $('input').on('focusin', function() {
    $(this).next('.hint').css({ color: '#4f46e5', fontWeight: 'bold' });
  }).on('focusout', function() {
    $(this).next('.hint').css({ color: '#64748b', fontWeight: 'normal' });
  });
</script>
```

---

## Chapter 11: Advanced Selectors and Filters

### 1. Objective
Master positional filters (`:first`, `:last`, `:eq()`, `:even`, `:odd`), content filters (`:has()`, `:contains()`, `:empty`), visibility filters (`:visible`, `:hidden`), and understand their execution in jQuery 4.0.

### 2. Explanation
jQuery introduced custom pseudo-selectors (filters) that extended standard CSS:
- **Positional**: `:first`, `:last`, `:eq(n)`, `:gt(n)`, `:lt(n)`, `:even`, `:odd`.
- **Content**: `:contains("text")`, `:empty`, `:has(selector)`, `:parent`.
- **Visibility**: `:visible` (elements taking up layout space in the document), `:hidden` (elements with `display: none`, `visibility: hidden`, or zero height/width).

> [!NOTE]
> In jQuery 4.0, while custom pseudo-selectors are still supported for backwards compatibility, using native CSS equivalents (like `:first-child`, `:nth-child()`, `:has()`) or dedicated traversal methods (`.eq()`, `.filter()`) allows jQuery to bypass custom JavaScript filtering and execute at maximum speed.

### 3. Syntax
```javascript
$('tr:even');                // Alternate row striping
$('li:eq(2)');               // 3rd item (zero-indexed)
$('div:has(p.active)');      // Divs containing an active paragraph
$('p:contains("Confidential")'); // Paragraphs containing specific text
$('input:visible');          // Visible inputs
```

### 4. Parameters
- `n` *(Number)*: Zero-based integer index for `:eq(n)`.
- `text` *(String)*: Case-sensitive substring for `:contains("text")`.

### 5. Examples
```html
<table id="dataTable" border="1" width="100%">
  <tr><th>Name</th><th>Role</th></tr>
  <tr><td>Alice</td><td>Developer</td></tr>
  <tr><td>Bob</td><td>Designer</td></tr>
  <tr><td>Charlie</td><td>Manager</td></tr>
  <tr><td>David</td><td>Auditor</td></tr>
</table>

<div class="panel" style="display:none;">Secret Panel 1</div>
<div class="panel">Public Panel 2</div>

<script>
  // 1. Alternate table row striping
  $('#dataTable tr:even').css('background', '#f8fafc');
  $('#dataTable tr:odd').css('background', '#ffffff');

  // 2. Select specific row by index
  $('#dataTable tr:eq(2)').css('font-weight', 'bold');

  // 3. Count hidden vs visible panels
  console.log('Hidden panels:', $('.panel:hidden').length);   // 1
  console.log('Visible panels:', $('.panel:visible').length); // 1
</script>
```

### 6. Output
- Table rows alternate cleanly between light gray and white.
- Bob's row (index 2) is rendered in bold text.
- Console logs count 1 hidden panel and 1 visible panel.

### 7. Practical Use
- Table zebra-striping.
- Interactive accordions that search for elements containing specific search query terms.

### 8. Common Mistakes
- **Case Sensitivity in `:contains()`**: `:contains("Error")` will NOT match `"error"`.
- **Overlooking `:eq(n)` vs `:nth-child(n)`**: `:eq()` is **0-indexed** and refers to the matched set position. `:nth-child()` is **1-indexed** and refers to DOM sibling position.

### 9. Best Practices
- Prefer method counterparts (`$('li').eq(2)` instead of `$('li:eq(2)')`) because the query string can be parsed directly by native `querySelectorAll` before `.eq()` filters in memory.

### 10. Exercises
1. Write a jQuery statement that finds all empty `<p>` elements on the page and removes them.
2. Select all `<div>` elements that contain an image (`img`) tag.

### 11. Interview Questions & Answers
**Q: How does jQuery determine if an element matches `:visible`?**  
**A:** An element is considered `:visible` if it consumes physical space in the document (meaning its `offsetWidth > 0` and `offsetHeight > 0`, or its `getClientRects().length > 0`). Elements with `display: none` or whose ancestors have `display: none` are considered `:hidden`.

### 12. Mini Project: Instant Table Text Filter
```html
<input type="search" id="rowSearch" placeholder="Type to filter table...">
<table id="employeeTable">
  <tr><td>Engineering - John Doe</td></tr>
  <tr><td>Marketing - Jane Smith</td></tr>
  <tr><td>Engineering - Bob Taylor</td></tr>
</table>

<script>
  $('#rowSearch').on('input', function() {
    const query = $(this).val();
    if (!query) {
      $('#employeeTable tr').show();
    } else {
      $('#employeeTable tr').hide();
      $(`#employeeTable tr:contains("${query}")`).show();
    }
  });
</script>
```

---

## Chapter 12: DOM Traversal

### 1. Objective
Navigate up, down, and across the DOM tree using `.parent()`, `.closest()`, `.find()`, `.children()`, `.siblings()`, and manage the internal jQuery selection stack using `.end()` and `.addBack()`.

### 2. Explanation
DOM traversal navigates from an existing jQuery collection to related nodes without writing new global selectors:
- **Upward (Ancestors)**: `.parent()` (immediate parent), `.parents()` (all ancestors), `.closest(selector)` (ascends through ancestors until a match is found).
- **Downward (Descendants)**: `.children()` (direct children), `.find(selector)` (all descendants).
- **Sideways (Siblings)**: `.siblings()`, `.next()`, `.prev()`, `.nextAll()`, `.prevAll()`.
- **Stack Management**: Each traversal operation pushes a new set of elements onto an internal stack. Calling `.end()` pops the stack, reverting to the previous selection!

### 3. Syntax
```javascript
$element.parent();                 // Immediate parent
$element.closest('.modal');        // Nearest ancestor matching .modal
$element.find('.btn-save');        // Descendants matching .btn-save
$element.siblings();               // All sibling elements
$element.find('p').css(...).end(); // Pops stack back to $element!
```

### 4. Parameters
- `selector` *(String, optional)*: Filter expression to restrict traversal results.

### 5. Examples
```html
<div class="user-card" id="user42">
  <div class="user-header">
    <h3>Sarah Connor</h3>
  </div>
  <div class="user-actions">
    <button class="btn-delete">Delete</button>
  </div>
</div>

<script>
  // Ascending with .closest() to find parent card from button click
  $('.btn-delete').on('click', function() {
    const $card = $(this).closest('.user-card');
    console.log('Target card to delete:', $card.attr('id')); // user42
    $card.fadeOut(200);
  });
</script>
```

### 6. Output
- Clicking Delete correctly identifies `"user42"` by traversing upward, fading out the entire card widget.

### 7. Practical Use
- Reusable UI component events: buttons inside cards, table row action buttons, and modal dialog dismissal.

### 8. Common Mistakes
- Using `.parent()` when you should use `.closest()`: If the DOM structure adds an extra wrapper `<div>`, `.parent().parent()` breaks fragile layouts, whereas `.closest('.target')` remains resilient.

### 9. Best Practices
- Always prefer `.closest('.container')` in delegated event handlers to locate enclosing components.
- Use `.find()` instead of re-running global queries like `$('#container .child')`.

### 10. Exercises
1. Given a button, find all its sibling elements and disable them.
2. Demonstrate how `.find('li').addClass('item').end().addClass('list')` modifies both child items and parent list.

### 11. Interview Questions & Answers
**Q: What is the architectural purpose of `.end()` in jQuery?**  
**A:** jQuery maintains an internal stack of previous selections (`prevObject`). When you call a destructive traversal method like `.find()` or `.filter()`, the new matched set is pushed onto the stack. Calling `.end()` pops the active set off the stack and returns the previous collection, allowing uninterrupted chaining.

### 12. Mini Project: Interactive Nested Folder Tree
```html
<ul class="tree">
  <li class="folder">📁 Documents
    <ul class="sub">
      <li>Resume.pdf</li>
      <li>Invoice.docx</li>
    </ul>
  </li>
  <li class="folder">📁 Images
    <ul class="sub">
      <li>Photo.jpg</li>
    </ul>
  </li>
</ul>

<script>
  $('.tree .folder').on('click', function(e) {
    if (e.target !== this) return; // Ignore child clicks
    $(this).children('.sub').slideToggle(200);
  });
</script>
```

---

## Chapter 13: DOM Manipulation

### 1. Objective
Read and modify element contents, replace nodes, wrap elements, and safely handle HTML string injections in accordance with jQuery 4.0 Content Security Policies.

### 2. Explanation
DOM manipulation alters the content, structure, or markup of elements:
- `.html()`: Gets or sets the HTML markup inside matching elements (similar to `innerHTML`).
- `.text()`: Gets or sets the combined text contents, automatically escaping HTML entities (similar to `textContent`).
- `.val()`: Gets or sets the value of form elements.
- `.wrap()` / `.unwrap()`: Encloses or removes wrapping parent elements.
- `.replaceWith()`: Replaces elements completely with new content.

### 3. Syntax
```javascript
$('#elem').html('<strong>Bold</strong>');  // Set HTML
$('#elem').text('Safe Plain Text');         // Set Text (escapes HTML)
$('#elem').wrap('<div class="wrapper"/>');  // Wrap
$('#elem').replaceWith('<span/>');         // Replace
```

### 4. Parameters
- `content` *(String | Element | jQuery | Function)*: Markup, text, or DOM nodes to write.

### 5. Examples
```html
<div id="displayArea">Initial Content</div>
<div id="escapeDemo"></div>

<script>
  // 1. Setting HTML content
  $('#displayArea').html('<span style="color:#0ea5e9;">Updated Markup</span>');

  // 2. Safe Text Injection (XSS Prevention)
  const untrustedInput = '<script>alert("hack")<\/script>Hello Safe User';
  $('#escapeDemo').text(untrustedInput);
</script>
```

### 6. Output
- `#displayArea` displays colored text: `"Updated Markup"`.
- `#escapeDemo` displays the literal text string without executing any script tags: `"<script>alert("hack")</script>Hello Safe User"`.

### 7. Practical Use
- Updating dashboard stats, rendering formatted data, and wrapping cards in responsive grids.

### 8. Common Mistakes
- **Using `.html()` with user input**: Setting `.html(userSuppliedString)` is the #1 cause of Cross-Site Scripting (XSS) vulnerabilities in web applications. Always use `.text()` for untrusted input.

### 9. Best Practices
- In jQuery 4.0, configure Trusted Types policies if your application enforces strict Content Security Policies.
- Use callback functions with `.html((index, currentHtml) => ...)` when computing updates based on existing content.

### 10. Exercises
1. Wrap all `<p>` tags on a page inside a `<div class="card"></div>`.
2. Replace all `<h3>` elements with `<h4>` elements while preserving their text content.

### 11. Interview Questions & Answers
**Q: How do `.empty()`, `.remove()`, and `.detach()` differ when manipulating DOM elements?**  
**A:** `.empty()` deletes all child nodes and text inside an element, keeping the element itself. `.remove()` deletes the element and permanently purges all bound event handlers and internal jQuery data. `.detach()` removes the element from the DOM tree but preserves all bound event listeners and data, allowing it to be cleanly reinserted later.

### 12. Mini Project: Live Markdown Previewer
```html
<textarea id="rawInput" style="width:100%; height:80px;" placeholder="Type text here..."></textarea>
<div id="renderedPreview" style="padding:12px; border:1px solid #cbd5e1; margin-top:8px;"></div>

<script>
  $('#rawInput').on('input', function() {
    const text = $(this).val();
    // Safely insert text and format line breaks
    $('#renderedPreview').text(text).html(function(_, currentText) {
      return currentText.replace(/\n/g, '<br>');
    });
  });
</script>
```

---

## Chapter 14: Creating and Removing Elements

### 1. Objective
Generate new DOM nodes from strings or objects, insert them inside, outside, or adjacent to targets, and cleanly manage element removal without memory leaks.

### 2. Explanation
jQuery provides versatile mechanisms for DOM generation and placement:
- **Creation**: `$('<tag/>', { attributes })` instantiates a detached in-memory DOM element.
- **Inside Insertion**:
  - `.append()`: Inserts content at the end of the target's children.
  - `.prepend()`: Inserts content at the beginning of the target's children.
- **Outside Insertion**:
  - `.after()`: Inserts content immediately after the target.
  - `.before()`: Inserts content immediately before the target.
- **Inverted Syntax**: `.appendTo()`, `.prependTo()`, `.insertAfter()`, `.insertBefore()`.
- **Cloning**: `.clone(withDataAndEvents)` creates deep copies of nodes.

### 3. Syntax
```javascript
// Dynamic Node Creation with Properties Object
const $newDiv = $('<div>', {
  id: 'alertBox',
  class: 'alert alert-info',
  text: 'Action completed successfully!'
});

// Insertion Operations
$('#container').append($newDiv);      // Append inside
$newDiv.appendTo('#container');       // Inverted append
$('#target').after('<hr/>');          // Insert sibling after
```

### 4. Parameters
- `withDataAndEvents` *(Boolean, optional, default: false)*: When calling `.clone(true)`, copies all attached event listeners and jQuery data to the cloned element.

### 5. Examples
```html
<ul id="taskList">
  <li>Initial Task</li>
</ul>
<button id="addTask">Add Task</button>

<script>
  let taskCounter = 1;

  $('#addTask').on('click', function() {
    taskCounter++;
    // Create new element with built-in event handler
    $('<li>', {
      class: 'task-item',
      text: `Task #${taskCounter} `
    })
    .append($('<button>', {
      text: '✕',
      class: 'btn-remove',
      click: function() { $(this).parent().remove(); }
    }))
    .appendTo('#taskList');
  });
</script>
```

### 6. Output
- Clicking "Add Task" appends a new `<li>` with a remove button. Clicking `✕` smoothly removes that specific task row.

### 7. Practical Use
- Building dynamic shopping carts, todo lists, comment sections, and notification toasts.

### 8. Common Mistakes
- **Appending inside a loop**:
  ```javascript
  // ❌ BAD: Causes 100 separate browser reflows and repaints!
  for (let i = 0; i < 100; i++) {
    $('#list').append(`<li>Item ${i}</li>`);
  }

  // ✅ GOOD: Build array in memory and append in a single batch!
  const items = [];
  for (let i = 0; i < 100; i++) {
    items.push(`<li>Item ${i}</li>`);
  }
  $('#list').append(items.join(''));
  ```

### 9. Best Practices
- Always batch DOM insertions: minimize DOM access by assembling markup into DocumentFragments or single concatenated strings before inserting.

### 10. Exercises
1. Create a notification function `showToast(message)` that generates a toast popup, appends it to body, and removes it after 3 seconds.
2. Clone an existing table row including its event handlers and insert it at the bottom of the table.

### 11. Interview Questions & Answers
**Q: Why should you use `.detach()` instead of `.remove()` when reordering list items?**  
**A:** `.remove()` unbinds all attached event listeners and deletes data stored via `$.data()`. If you reinsert the element later, its click handlers will no longer function. `.detach()` preserves all event listeners and data in memory, making it ideal for temporary DOM detachment during sorts or layout transitions.

### 12. Mini Project: Dynamic To-Do List with In-Memory Cloning
```html
<div id="todoApp" style="max-width:350px;">
  <input type="text" id="newTodoText" placeholder="What needs to be done?">
  <button id="addTodoBtn">Add</button>
  <ul id="todos" style="list-style:none; padding:0; margin-top:10px;"></ul>
</div>

<script>
  $('#addTodoBtn').on('click', function() {
    const text = $('#newTodoText').val().trim();
    if (!text) return;

    $('<li>', { style: 'padding:6px 0; border-bottom:1px solid #e2e8f0; display:flex; justify-content:space-between;' })
      .append($('<span>', { text: text }))
      .append($('<button>', {
        text: 'Delete',
        style: 'color:#ef4444; border:none; background:none; cursor:pointer;',
        click: function() { $(this).closest('li').remove(); }
      }))
      .appendTo('#todos');

    $('#newTodoText').val('').focus();
  });
</script>
```

---

## Chapter 15: Attributes, Properties and Data

### 1. Objective
Demystify the critical architectural distinction between HTML Attributes (`.attr()`) and DOM Properties (`.prop()`), and master the jQuery Data API (`.data()`) for in-memory object binding.

### 2. Explanation
- **Attributes (`.attr()`)**: Reflect the literal values written into the HTML source markup. Useful for `href`, `src`, `title`, `alt`, and `id`.
- **Properties (`.prop()`)**: Reflect the real-time, live state of DOM element nodes in JavaScript memory. Essential for boolean states: `checked`, `disabled`, `selected`, `readOnly`.
- **Data API (`.data()`)**: Reads `data-*` attributes on initial load and stores subsequent updates in a private internal JavaScript cache object, avoiding browser memory leaks associated with DOM circular references.

| Target | Preferred Method | Rationale |
| :--- | :--- | :--- |
| `input.checked` | `.prop('checked')` | Returns a clean boolean (`true`/`false`). |
| `button.disabled`| `.prop('disabled')` | Returns a clean boolean (`true`/`false`). |
| `a.href` | `.attr('href')` | Returns the raw relative or absolute string from HTML. |
| Custom Objects | `.data('user', { id: 1 })` | Can store full objects, arrays, and functions in memory. |

### 3. Syntax
```javascript
// Reading and Writing Attributes
$el.attr('title', 'Hover tooltip');
const title = $el.attr('title');

// Reading and Writing Boolean Properties
$checkbox.prop('checked', true);
const isChecked = $checkbox.prop('checked'); // true or false

// In-Memory Data Storage
$userRow.data('metadata', { userId: 42, role: 'Admin' });
const meta = $userRow.data('metadata');
```

### 4. Parameters
- `key` *(String)*: Name of the attribute, property, or data key.
- `value` *(Any)*: Value to set. If omitted, the method acts as a getter.

### 5. Examples
```html
<input type="checkbox" id="termsCheck" checked="checked" data-version="1.0">
<button id="btnState">Audit State</button>

<script>
  $('#btnState').on('click', function() {
    console.log('Attribute checked:', $('#termsCheck').attr('checked')); // "checked"
    console.log('Property checked:', $('#termsCheck').prop('checked'));   // true (or false if un-clicked!)
    console.log('Data version:', $('#termsCheck').data('version'));        // 1.0 (auto typecast to number!)

    // Toggle disabled state cleanly with prop
    $('#termsCheck').prop('disabled', function(i, current) {
      return !current;
    });
  });
</script>
```

### 6. Output
```text
Attribute checked: checked
Property checked: true
Data version: 1
```

### 7. Practical Use
- "Select All" table checkboxes.
- Storing complex JSON records (e.g. user objects) directly on table row elements.

### 8. Common Mistakes
- **Using `.attr('checked', false)`**: Removing an attribute does not reliably update the live DOM state in all browsers. Always use `.prop('checked', false)` for boolean inputs.
- **Expecting `.data('key', value)` to update the HTML markup**: `.data()` stores values in jQuery's internal memory cache. It does NOT mutate the physical DOM `data-key` attribute in the HTML inspector.

### 9. Best Practices
- Never use `.attr()` for form control states (`checked`, `disabled`, `selected`). Always use `.prop()`.
- Use `.removeData()` to free memory when destroying long-lived dynamic data representations.

### 10. Exercises
1. Write a script that checks whether an input is disabled; if it is, enable it and change its background color to white.
2. Store an array of tags `['tech', 'web', 'jquery']` on a `<div>` using `.data()`, then retrieve and log the second tag.

### 11. Interview Questions & Answers
**Q: Why does jQuery use an internal memory cache for `.data()` instead of directly storing properties on DOM elements?**  
**A:** In older browsers (and when holding cross-references), assigning JavaScript objects directly to native DOM elements created circular memory references between the JavaScript engine and the browser DOM engine, leading to severe memory leaks. jQuery's `.data()` associates elements with a numeric GUID pointing to an internal central storage dictionary, preventing memory retention cycles.

### 12. Mini Project: Master Checkbox Multi-Selector
```html
<div id="checkManager">
  <label><input type="checkbox" id="selectAll"> <strong>Select All Items</strong></label>
  <hr>
  <label><input type="checkbox" class="item-check"> Item Alpha</label><br>
  <label><input type="checkbox" class="item-check"> Item Beta</label><br>
  <label><input type="checkbox" class="item-check"> Item Gamma</label>
</div>

<script>
  // Master checkbox controls all child checkboxes
  $('#selectAll').on('change', function() {
    const isMasterChecked = $(this).prop('checked');
    $('.item-check').prop('checked', isMasterChecked);
  });

  // If any child is unchecked, uncheck master checkbox
  $('.item-check').on('change', function() {
    const totalItems = $('.item-check').length;
    const totalChecked = $('.item-check:checked').length;
    $('#selectAll').prop('checked', totalItems === totalChecked);
  });
</script>
```
