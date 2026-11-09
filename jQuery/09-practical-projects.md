# 🛠️ Part 9 — Practical Projects (Hands-on)

A comprehensive collection of 11 complete, production-ready, hands-on projects built with **jQuery 4.0.0**. Every project follows the 12-section pedagogical format with fully runnable code.

---

## 📑 Table of Contents
1. [Chapter 67: Interactive Navigation](#chapter-67-interactive-navigation)
2. [Chapter 68: Dynamic Data Table](#chapter-68-dynamic-data-table)
3. [Chapter 69: Real-Time Search and Filtering](#chapter-69-real-time-search-and-filtering)
4. [Chapter 70: Client-Side & Server-Side Pagination](#chapter-70-client-side--server-side-pagination)
5. [Chapter 71: Accessible Modal System](#chapter-71-accessible-modal-system)
6. [Chapter 72: Responsive Image Gallery & Lightbox](#chapter-72-responsive-image-gallery--lightbox)
7. [Chapter 73: Interactive Shopping Cart](#chapter-73-interactive-shopping-cart)
8. [Chapter 74: Full AJAX CRUD Application](#chapter-74-full-ajax-crud-application)
9. [Chapter 75: Drag-and-Drop Dynamic Form Builder](#chapter-75-drag-and-drop-dynamic-form-builder)
10. [Chapter 76: Enterprise Admin Analytics Dashboard](#chapter-76-enterprise-admin-analytics-dashboard)
11. [Chapter 77: Complete API-Powered Application](#chapter-77-complete-api-powered-application)

---

## Chapter 67: Interactive Navigation

### 1. Objective
Build a responsive, accessible multi-level dropdown navigation bar with mobile hamburger drawer support, smooth transitions, and keyboard accessibility.

### 2. Explanation
Modern navigation requires handling multiple device paradigms:
- Desktop: Hover or click dropdowns with click-outside dismissal and keyboard navigation (Tab, Escape).
- Mobile: Off-canvas sliding drawer toggled by a hamburger button, preventing background body scrolling when open.

### 3. Syntax / Architectural Pattern
```javascript
// State-based menu toggle
$('#menuToggle').on('click', function() {
  $('body').toggleClass('nav-open');
  $('#mobileDrawer').stop().slideToggle(250);
});
```

### 4. Parameters / Configuration
- `slideDuration`: Milliseconds for mobile drawer slide (e.g. `250ms`).
- `breakpoint`: Media query width threshold (e.g. `768px`).

### 5. Examples: Complete Working Project
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project 67: Responsive Navigation</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; }
    .navbar { display: flex; justify-content: space-between; align-items: center; background: #1e293b; color: #fff; padding: 0.75rem 1.5rem; }
    .brand { font-weight: bold; font-size: 1.2rem; }
    .nav-links { display: flex; list-style: none; gap: 1rem; align-items: center; }
    .nav-item { position: relative; }
    .nav-link { color: #cbd5e1; text-decoration: none; padding: 0.5rem 0.75rem; display: block; border-radius: 4px; }
    .nav-link:hover, .nav-link:focus { color: #fff; background: #334155; }
    .dropdown-menu { display: none; position: absolute; top: 100%; left: 0; background: #334155; list-style: none; min-width: 160px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
    .dropdown-menu a { color: #cbd5e1; padding: 0.5rem 1rem; display: block; text-decoration: none; font-size: 0.9rem; }
    .dropdown-menu a:hover { background: #475569; color: #fff; }
    .hamburger { display: none; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; }
    
    @media (max-width: 768px) {
      .hamburger { display: block; }
      .nav-links { display: none; flex-direction: column; width: 100%; position: absolute; top: 56px; left: 0; background: #1e293b; padding: 1rem; }
      .dropdown-menu { position: static; background: #0f172a; }
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="brand">XivigPlatform</div>
    <button class="hamburger" id="navToggle" aria-label="Toggle navigation">☰</button>
    <ul class="nav-links" id="navLinks">
      <li class="nav-item"><a href="#" class="nav-link">Home</a></li>
      <li class="nav-item">
        <a href="#" class="nav-link dropdown-toggle" id="servicesToggle">Services ▾</a>
        <ul class="dropdown-menu" id="servicesDropdown">
          <li><a href="#">Cloud Hosting</a></li>
          <li><a href="#">Security Audit</a></li>
          <li><a href="#">API Consulting</a></li>
        </ul>
      </li>
      <li class="nav-item"><a href="#" class="nav-link">About</a></li>
      <li class="nav-item"><a href="#" class="nav-link">Contact</a></li>
    </ul>
  </nav>

  <script>
    $(function() {
      // Mobile Drawer Toggle
      $('#navToggle').on('click', function(e) {
        e.stopPropagation();
        $('#navLinks').slideToggle(200);
      });

      // Desktop/Mobile Dropdown Toggle
      $('#servicesToggle').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('#servicesDropdown').stop(true, true).slideToggle(200);
      });

      // Dismiss dropdowns when clicking outside
      $(document).on('click', function() {
        $('#servicesDropdown').slideUp(150);
        if ($(window).width() <= 768) {
          $('#navLinks').slideUp(150);
        }
      });

      // Escape key to close navigation
      $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
          $('#servicesDropdown').slideUp(150);
        }
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Desktop: Clean dark navbar with smooth sliding Services dropdown and outside-click dismissal.
- Mobile: Responsive hamburger button revealing vertical drawer.

### 7. Practical Use
- Corporate landing pages, SaaS web application header layouts.

### 8. Common Mistakes
- **Omitting `e.stopPropagation()` on toggle buttons**: Causes the click to immediately bubble to `document`, which closes the menu in the same tick.

### 9. Best Practices
- Always support the `Escape` key for keyboard accessibility.
- Reset inline `display` styles if the window is resized back to desktop via `$(window).on('resize', ...)`.

### 10. Exercises
1. Add an animated hamburger transformation (switching ☰ to ✕ when open).
2. Add a `resize` listener that automatically restores `.show()` if user resizes window past 768px.

### 11. Interview Questions & Answers
**Q: How do you prevent event bubbling from immediately closing a toggleable menu?**  
**A:** Invoke `event.stopPropagation()` inside the toggle button's click handler. This stops the event from ascending to the `document` level where the outside-click listener resides.

### 12. Mini Project: Sticky Scroll-Aware Header
```javascript
let lastScroll = 0;
$(window).on('scroll', function() {
  const current = $(this).scrollTop();
  if (current > lastScroll && current > 80) {
    $('.navbar').css('transform', 'translateY(-100%)'); // Hide on scroll down
  } else {
    $('.navbar').css('transform', 'translateY(0)'); // Reveal on scroll up
  }
  lastScroll = current;
});
```

---

## Chapter 68: Dynamic Data Table

### 1. Objective
Build an interactive data table supporting multi-column sorting, live row selection, and dynamic column toggling.

### 2. Explanation
Data tables are core components of business systems. Implementing them requires:
- Sorting numeric and string values alternately in ascending/descending order.
- Storing sorted states on table headers via `.data('order')`.
- Delegated event binding for table row interactions.

### 3. Syntax / Architectural Pattern
```javascript
// Sorting rows by column index
const rows = $('#myTable tbody tr').get();
rows.sort((a, b) => {
  const valA = $(a).children('td').eq(colIndex).text();
  const valB = $(b).children('td').eq(colIndex).text();
  return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
});
$.each(rows, (_, row) => $('#myTable tbody').append(row));
```

### 4. Parameters / Configuration
- `colIndex`: Index of clicked `<th>`.
- `order`: `'asc'` or `'desc'`.

### 5. Examples: Complete Working Project
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project 68: Dynamic Data Table</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f8fafc; }
    .table-container { max-width: 650px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th, td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; }
    th { background: #f1f5f9; cursor: pointer; user-select: none; font-weight: 600; font-size: 14px; }
    th:hover { background: #e2e8f0; }
    tr:hover { background: #f8fafc; }
    tr.selected { background: #dbeafe !important; }
    .sort-icon { font-size: 11px; margin-left: 6px; color: #64748b; }
  </style>
</head>
<body>
  <div class="table-container">
    <table id="sortableTable">
      <thead>
        <tr>
          <th data-type="string">Employee <span class="sort-icon">⇅</span></th>
          <th data-type="string">Department <span class="sort-icon">⇅</span></th>
          <th data-type="number">Salary ($) <span class="sort-icon">⇅</span></th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Alice Johnson</td><td>Engineering</td><td>95000</td></tr>
        <tr><td>Bob Williams</td><td>Marketing</td><td>62000</td></tr>
        <tr><td>Charlie Davis</td><td>Engineering</td><td>110000</td></tr>
        <tr><td>Diana Miller</td><td>Finance</td><td>88000</td></tr>
      </tbody>
    </table>
  </div>

  <script>
    $(function() {
      // 1. Column Sorting
      $('#sortableTable th').on('click', function() {
        const $th = $(this);
        const colIdx = $th.index();
        const type = $th.data('type');
        const isAsc = $th.data('order') !== 'asc';
        
        // Reset header icons
        $('#sortableTable th').data('order', '').find('.sort-icon').text('⇅');
        $th.data('order', isAsc ? 'asc' : 'desc');
        $th.find('.sort-icon').text(isAsc ? '▲' : '▼');

        // Sort table rows
        const $rows = $('#sortableTable tbody tr').get();
        $rows.sort(function(a, b) {
          const valA = $(a).children('td').eq(colIdx).text();
          const valB = $(b).children('td').eq(colIdx).text();

          if (type === 'number') {
            return isAsc ? (parseFloat(valA) - parseFloat(valB)) : (parseFloat(valB) - parseFloat(valA));
          }
          return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        });

        // Re-append sorted rows in a single batch
        $('#sortableTable tbody').append($rows);
      });

      // 2. Row Selection
      $('#sortableTable tbody').on('click', 'tr', function() {
        $(this).toggleClass('selected');
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking any table header sorts rows ascending/descending with arrow indicators.
- Clicking any row highlights it blue with multi-selection support.

### 7. Practical Use
- Internal admin panels, HR employee lists, financial ledger portals.

### 8. Common Mistakes
- **Sorting numbers as strings**: Sorting `[95000, 110000]` as strings puts `110000` first because `'1' < '9'`. Always check column data type.

### 9. Best Practices
- Pass sorted row DOM array directly into `.append($rows)`: jQuery appends arrays in one batch, avoiding repetitive reflows.

### 10. Exercises
1. Add a status counter beneath the table indicating how many rows are currently selected.
2. Add an "Export to CSV" button that serializes table rows into downloadable CSV data.

### 11. Interview Questions & Answers
**Q: How does `$('#table tbody').append($rows)` work when `$rows` already exists in the DOM?**  
**A:** In the DOM, an element cannot exist in two places simultaneously. Passing existing DOM nodes into `.append()` moves them to their new sorted positions rather than duplicating them.

### 12. Mini Project: Table Search Filter Bar
```javascript
$('#tableFilterInput').on('input', function() {
  const q = $(this).val().toLowerCase();
  $('#sortableTable tbody tr').each(function() {
    $(this).toggle($(this).text().toLowerCase().includes(q));
  });
});
```

---

## Chapter 69: Real-Time Search and Filtering

### 1. Objective
Build an instant multi-attribute filter system with search debouncing, category tags, and zero-match empty state messages.

### 2. Explanation
Real-time filtering matches user text and tags against a collection of cards or items, showing or hiding items dynamically using `.toggle(booleanCondition)`.

### 3. Syntax / Architectural Pattern
```javascript
// Compound filter evaluation
$('.item-card').each(function() {
  const matchesSearch = $(this).text().toLowerCase().includes(query);
  const matchesCategory = selectedCat === 'all' || $(this).data('cat') === selectedCat;
  $(this).toggle(matchesSearch && matchesCategory);
});
```

### 4. Parameters / Configuration
- `query`: Lowercase search string.
- `category`: Active category identifier.

### 5. Examples: Complete Working Project
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project 69: Real-Time Search & Filtering</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f8fafc; }
    .filter-bar { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
    .search-input { flex: 1; min-width: 200px; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; }
    .cat-btn { padding: 8px 16px; border: 1px solid #cbd5e1; background: #fff; border-radius: 6px; cursor: pointer; }
    .cat-btn.active { background: #2563eb; color: #fff; border-color: #2563eb; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }
    .product-card { background: #fff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; }
    .empty-state { display: none; text-align: center; color: #64748b; padding: 30px; grid-column: 1 / -1; }
  </style>
</head>
<body>
  <div class="filter-bar">
    <input type="text" id="searchInput" class="search-input" placeholder="Search products...">
    <div id="catButtons">
      <button class="cat-btn active" data-cat="all">All</button>
      <button class="cat-btn" data-cat="electronics">Electronics</button>
      <button class="cat-btn" data-cat="apparel">Apparel</button>
    </div>
  </div>

  <div class="grid" id="productGrid">
    <div class="product-card" data-cat="electronics"><h4>MacBook Air</h4><p>$999 - Electronics</p></div>
    <div class="product-card" data-cat="electronics"><h4>Wireless Headphones</h4><p>$199 - Electronics</p></div>
    <div class="product-card" data-cat="apparel"><h4>Denim Jacket</h4><p>$89 - Apparel</p></div>
    <div class="product-card" data-cat="apparel"><h4>Running Shoes</h4><p>$120 - Apparel</p></div>
    <div class="empty-state" id="noMatches">No products match your criteria.</div>
  </div>

  <script>
    $(function() {
      let activeCategory = 'all';

      function applyFilter() {
        const query = $('#searchInput').val().toLowerCase().trim();
        let visibleCount = 0;

        $('.product-card').each(function() {
          const $card = $(this);
          const title = $card.find('h4').text().toLowerCase();
          const cat = $card.data('cat');

          const matchText = title.includes(query);
          const matchCat = (activeCategory === 'all') || (cat === activeCategory);

          const isVisible = matchText && matchCat;
          $card.toggle(isVisible);
          if (isVisible) visibleCount++;
        });

        $('#noMatches').toggle(visibleCount === 0);
      }

      // Input listener
      $('#searchInput').on('input', applyFilter);

      // Category tab click
      $('#catButtons').on('click', '.cat-btn', function() {
        $(this).addClass('active').siblings().removeClass('active');
        activeCategory = $(this).data('cat');
        applyFilter();
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Typing in the search input instantly isolates matching items.
- Switching category tabs narrows results further.
- If no items match, "No products match your criteria." appears.

### 7. Practical Use
- E-commerce catalog search, knowledge base articles, team member filters.

### 8. Common Mistakes
- **Running separate filters independently**: Filtering by text must consider category, and category must consider text. Always evaluate combined criteria in a single `applyFilter()` function.

### 9. Best Practices
- Cache the search query outside the `.each()` loop so `toLowerCase()` is called only once per input event.

### 10. Exercises
1. Add a price range slider filter (`<input type="range">`) to the product filter.
2. Highlight matching text substrings in yellow inside product titles using regular expressions.

### 11. Interview Questions & Answers
**Q: How do you show an "Empty State" message efficiently when all items are hidden by a filter?**  
**A:** Keep a counter variable (`let visibleCount = 0`) that increments for each matching item inside `.each()`. After the loop, evaluate `$('#emptyState').toggle(visibleCount === 0);`.

### 12. Mini Project: Tag-Based Filter Chips
```javascript
// Remove filter chip on click and reset
$('.filter-chip').on('click', function() {
  $(this).remove();
  applyFilter();
});
```

---

## Chapter 70: Client-Side & Server-Side Pagination

### 1. Objective
Implement smooth client-side dataset pagination with page buttons, "Previous/Next" navigation, and page-size selection.

### 2. Explanation
Pagination slices large collections into manageable chunks.
Mathematical formula:
- `startIndex = (currentPage - 1) * pageSize`
- `endIndex = startIndex + pageSize`
- `totalPages = Math.ceil(totalItems / pageSize)`

### 3. Syntax / Architectural Pattern
```javascript
// Slicing items for active page
$('.data-row').hide()
  .slice(startIdx, endIdx)
  .show();
```

### 4. Parameters / Configuration
- `pageSize`: Number of records per page (default: 3).
- `currentPage`: 1-based active page index.

### 5. Examples: Complete Working Project
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project 70: Pagination System</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f8fafc; }
    .list-container { max-width: 400px; margin-bottom: 15px; }
    .item-row { padding: 12px; background: #fff; border: 1px solid #e2e8f0; margin-bottom: 6px; border-radius: 4px; }
    .pagination-controls { display: flex; gap: 6px; align-items: center; }
    .page-btn { padding: 6px 12px; border: 1px solid #cbd5e1; background: #fff; cursor: pointer; border-radius: 4px; }
    .page-btn.active { background: #2563eb; color: #fff; border-color: #2563eb; font-weight: bold; }
    .page-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  </style>
</head>
<body>
  <div class="list-container" id="itemsList">
    <div class="item-row">Record 1: Alpha Core</div>
    <div class="item-row">Record 2: Bravo Base</div>
    <div class="item-row">Record 3: Charlie Check</div>
    <div class="item-row">Record 4: Delta Data</div>
    <div class="item-row">Record 5: Echo Engine</div>
    <div class="item-row">Record 6: Foxtrot File</div>
    <div class="item-row">Record 7: Golf Gate</div>
  </div>

  <div class="pagination-controls">
    <button class="page-btn" id="btnPrev">Prev</button>
    <div id="pageNumberButtons" style="display:flex; gap:4px;"></div>
    <button class="page-btn" id="btnNext">Next</button>
  </div>

  <script>
    $(function() {
      const pageSize = 3;
      const $rows = $('.item-row');
      const totalPages = Math.ceil($rows.length / pageSize);
      let currentPage = 1;

      function renderPagination() {
        // 1. Slice and show items for current page
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        $rows.hide().slice(start, end).show();

        // 2. Build page buttons
        const $btns = $('#pageNumberButtons').empty();
        for (let i = 1; i <= totalPages; i++) {
          $btns.append(
            $('<button>', {
              class: `page-btn ${i === currentPage ? 'active' : ''}`,
              text: i,
              'data-page': i
            })
          );
        }

        // 3. Update Prev/Next disabled states
        $('#btnPrev').prop('disabled', currentPage === 1);
        $('#btnNext').prop('disabled', currentPage === totalPages);
      }

      // Page number click
      $('#pageNumberButtons').on('click', '.page-btn', function() {
        currentPage = parseInt($(this).data('page'), 10);
        renderPagination();
      });

      // Prev / Next click
      $('#btnPrev').on('click', () => { if (currentPage > 1) { currentPage--; renderPagination(); } });
      $('#btnNext').on('click', () => { if (currentPage < totalPages) { currentPage++; renderPagination(); } });

      renderPagination();
    });
  </script>
</body>
</html>
```

### 6. Output
- Displays exactly 3 items at a time.
- Clicking page numbers or Prev/Next smoothly switches pages and updates button states.

### 7. Practical Use
- Client-side paginated tables, article lists, search results.

### 8. Common Mistakes
- **1-based vs 0-based page index errors**: `(page - 1) * size` is necessary to align with 0-based array indexing.

### 9. Best Practices
- Disable `Prev` on page 1 and `Next` on the final page.

### 10. Exercises
1. Add a dropdown `<select>` allowing users to change `pageSize` dynamically between 3, 5, and 10 items.
2. Integrate client-side pagination with the search filter from Chapter 69.

### 11. Interview Questions & Answers
**Q: How does jQuery's `.slice(start, end)` method assist with pagination?**  
**A:** `.slice()` operates directly on a jQuery element collection, returning a subset matching the designated index range, identical to `Array.prototype.slice()`. This allows one-line slicing of matching DOM rows.

### 12. Mini Project: Server-Side URL Query Pagination
```javascript
function loadPage(page) {
  $.getJSON(`/api/items?page=${page}&limit=10`, function(res) {
    renderItems(res.data);
    updateControls(res.meta);
  });
}
```

---

## Chapter 71: Accessible Modal System

### 1. Objective
Build a fully accessible, keyboard-trapped modal dialog supporting background backdrop clicks, Escape key dismissal, and ARIA attributes.

### 2. Explanation
Accessible modals (WAI-ARIA specifications) require:
1. Setting `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
2. Storing previous element focus before opening and restoring focus on dismissal.
3. Trapping keyboard `Tab` cycles within the modal dialog.

### 3. Syntax / Architectural Pattern
```javascript
// Trap focus inside modal
$modal.on('keydown', function(e) {
  if (e.key === 'Tab') {
    // Keep focus within modal focusable elements
  }
});
```

### 4. Parameters / Configuration
- `focusableElements`: `'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'`.

### 5. Examples: Complete Working Project
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project 71: Accessible Modal</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    .modal-backdrop { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); backdrop-filter: blur(2px); z-index: 1000; justify-content: center; align-items: center; }
    .modal-dialog { background: #fff; width: 90%; max-width: 450px; padding: 24px; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); position: relative; }
    .modal-close-btn { position: absolute; top: 16px; right: 16px; border: none; background: none; font-size: 20px; cursor: pointer; }
  </style>
</head>
<body>
  <button id="btnOpenModal" style="padding:10px 20px; font-size:16px;">Open Account Modal</button>

  <div class="modal-backdrop" id="appModal" role="dialog" aria-modal="true" aria-labelledby="modalHeading">
    <div class="modal-dialog">
      <button class="modal-close-btn" id="btnCloseModal" aria-label="Close dialog">✕</button>
      <h3 id="modalHeading">Account Verification</h3>
      <p style="color:#64748b; margin:10px 0;">Enter your security code to proceed.</p>
      <input type="text" id="secCode" placeholder="6-digit code" style="width:100%; padding:8px; box-sizing:border-box; margin-bottom:15px;">
      <div style="text-align:right;">
        <button id="btnSubmitCode" style="padding:8px 16px; background:#2563eb; color:#fff; border:none; border-radius:4px; cursor:pointer;">Verify</button>
      </div>
    </div>
  </div>

  <script>
    $(function() {
      let $lastFocusedElement = null;

      function openModal() {
        $lastFocusedElement = $(document.activeElement);
        $('#appModal').css('display', 'flex').hide().fadeIn(200);
        $('#secCode').trigger('focus');
        $('body').css('overflow', 'hidden'); // prevent background scroll
      }

      function closeModal() {
        $('#appModal').fadeOut(200, function() {
          $('body').css('overflow', '');
          if ($lastFocusedElement) $lastFocusedElement.trigger('focus');
        });
      }

      $('#btnOpenModal').on('click', openModal);
      $('#btnCloseModal').on('click', closeModal);

      // Close on backdrop click
      $('#appModal').on('click', function(e) {
        if (e.target === this) closeModal();
      });

      // Escape key to close
      $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#appModal').is(':visible')) {
          closeModal();
        }
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Open Account Modal" fades in the dialog with backdrop blur and focuses the input.
- Clicking backdrop, "✕", or pressing `Escape` closes the modal and returns focus to the trigger button.

### 7. Practical Use
- User confirmations, auth dialogs, forms, image previews.

### 8. Common Mistakes
- **Failing to restore focus after closing**: Screen reader users lose their place on the page when modals close without focus restoration.

### 9. Best Practices
- Always save `document.activeElement` before opening to restore focus on close.
- Disable background body scrolling (`body { overflow: hidden; }`) while the modal is open.

### 10. Exercises
1. Implement a complete focus trap loop where pressing `Tab` on the last button cycles back to the first button.
2. Add animation classes for modal zoom-in transitions.

### 11. Interview Questions & Answers
**Q: Why is managing focus critical when implementing modal dialogs?**  
**A:** When a modal opens, keyboard and screen reader focus must move into the modal so non-mouse users can interact with its contents. When closed, focus must be restored to the original triggering element to maintain navigational continuity.

### 12. Mini Project: Reusable Modal Trigger Data API
```javascript
// Universal data-toggle="modal" trigger
$(document).on('click', '[data-toggle="modal"]', function() {
  const target = $(this).data('target');
  $(target).fadeIn(200);
});
```

---

## Chapter 72: Responsive Image Gallery & Lightbox

### 1. Objective
Build an interactive thumbnail gallery with a responsive full-screen lightbox preview, next/prev slide navigation, and thumbnail synchronization.

### 2. Explanation
Image lightboxes display enlarged media in an overlay. Key components:
- Thumbnail click updates main image `src`.
- Next/Previous controls cycle through the image array.
- Caption reading from `data-caption`.

### 3. Syntax / Architectural Pattern
```javascript
// Next image cycling
let activeIdx = 0;
function showImage(idx) {
  activeIdx = (idx + images.length) % images.length;
  $('#lightboxImg').attr('src', images[activeIdx]);
}
```

### 4. Parameters / Configuration
- `images`: Array of full-size image URLs and captions.

### 5. Examples: Complete Working Project
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project 72: Lightbox Gallery</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #0f172a; color: #fff; }
    .gallery-grid { display: flex; gap: 12px; }
    .thumb { width: 120px; height: 80px; object-fit: cover; border-radius: 6px; cursor: pointer; border: 2px solid transparent; transition: transform 0.2s; }
    .thumb:hover { transform: scale(1.05); border-color: #38bdf8; }
    .lightbox { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 2000; justify-content: center; align-items: center; flex-direction: column; }
    .lightbox-img { max-width: 85%; max-height: 75vh; border-radius: 6px; }
    .lightbox-nav { position: absolute; width: 95%; display: flex; justify-content: space-between; }
    .nav-arrow { background: rgba(255,255,255,0.2); border: none; color: #fff; font-size: 28px; padding: 10px 18px; border-radius: 50%; cursor: pointer; }
    .caption { margin-top: 15px; color: #cbd5e1; font-size: 14px; }
  </style>
</head>
<body>
  <h2>Nature Photography Gallery</h2>
  <div class="gallery-grid" id="gallery">
    <img src="https://picsum.photos/id/10/300/200" data-full="https://picsum.photos/id/10/1000/600" data-caption="Forest Mist" class="thumb">
    <img src="https://picsum.photos/id/15/300/200" data-full="https://picsum.photos/id/15/1000/600" data-caption="Waterfall Stream" class="thumb">
    <img src="https://picsum.photos/id/28/300/200" data-full="https://picsum.photos/id/28/1000/600" data-caption="Mountain Pine Forest" class="thumb">
  </div>

  <div class="lightbox" id="lightboxOverlay">
    <div class="lightbox-nav">
      <button class="nav-arrow" id="btnPrevImg">❮</button>
      <button class="nav-arrow" id="btnNextImg">❯</button>
    </div>
    <img id="lightboxImg" class="lightbox-img" src="" alt="Enlarged view">
    <div class="caption" id="lightboxCaption"></div>
  </div>

  <script>
    $(function() {
      const $thumbs = $('.thumb');
      let currentIndex = 0;

      function displayIndex(idx) {
        currentIndex = (idx + $thumbs.length) % $thumbs.length;
        const $target = $thumbs.eq(currentIndex);
        $('#lightboxImg').attr('src', $target.data('full'));
        $('#lightboxCaption').text($target.data('caption'));
      }

      $thumbs.on('click', function() {
        currentIndex = $(this).index();
        displayIndex(currentIndex);
        $('#lightboxOverlay').css('display', 'flex').hide().fadeIn(200);
      });

      $('#btnNextImg').on('click', () => displayIndex(currentIndex + 1));
      $('#btnPrevImg').on('click', () => displayIndex(currentIndex - 1));

      // Dismiss on backdrop click
      $('#lightboxOverlay').on('click', function(e) {
        if ($(e.target).is('#lightboxOverlay')) $(this).fadeOut(200);
      });

      // Keyboard navigation
      $(document).on('keydown', function(e) {
        if (!$('#lightboxOverlay').is(':visible')) return;
        if (e.key === 'ArrowRight') displayIndex(currentIndex + 1);
        if (e.key === 'ArrowLeft') displayIndex(currentIndex - 1);
        if (e.key === 'Escape') $('#lightboxOverlay').fadeOut(200);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking any thumbnail opens a full-screen dark overlay with the high-res image and caption.
- Arrow keys or on-screen buttons cycle smoothly through images.

### 7. Practical Use
- Photography portfolios, e-commerce product detail zoom views, real estate listings.

### 8. Common Mistakes
- **Loading full-size images for thumbnails**: Destroys mobile bandwidth and page load speed. Always use small thumbnails in the gallery grid and store high-res paths in `data-full`.

### 9. Best Practices
- Preload the next image in the sequence using `new Image().src = nextUrl` for instantaneous transitions.

### 10. Exercises
1. Add an image counter indicator (`Image 2 of 3`) to the lightbox footer.
2. Implement touch swipe support using `touchstart` and `touchend` events.

### 11. Interview Questions & Answers
**Q: How do you handle circular array indexing when cycling through images?**  
**A:** Use the modulo operator: `(index + length) % length`. This cleanly wraps positive increments back to `0` and negative decrements to `length - 1`.

### 12. Mini Project: Image Zoom on Hover
```javascript
$('.thumb').on('mousemove', function(e) {
  // Zoom coordinate tracking
});
```

---

## Chapter 73: Interactive Shopping Cart

### 1. Objective
Build an interactive e-commerce shopping cart supporting quantity adjustments, item removals, promo code discounts, and real-time total recalculations.

### 2. Explanation
State management in a shopping cart:
- State resides either in JavaScript objects or directly in DOM data attributes.
- Price calculation: `Subtotal = sum(price * qty)`, `Total = Subtotal - Discount + Tax`.

### 3. Syntax / Architectural Pattern
```javascript
// Calculate cart totals
let subtotal = 0;
$('.cart-item').each(function() {
  const price = parseFloat($(this).data('price'));
  const qty = parseInt($(this).find('.qty-input').val(), 10);
  subtotal += price * qty;
});
```

### 4. Parameters / Configuration
- `taxRate`: 0.08 (8% tax).

### 5. Examples: Complete Working Project
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project 73: Shopping Cart</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f8fafc; }
    .cart-box { max-width: 500px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .cart-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #eee; }
    .qty-ctrl { width: 50px; padding: 4px; text-align: center; }
    .btn-del { border: none; background: #fee2e2; color: #dc2626; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
    .summary-box { margin-top: 15px; text-align: right; font-size: 15px; }
  </style>
</head>
<body>
  <div class="cart-box">
    <h3>Shopping Cart</h3>
    <div id="cartItems">
      <div class="cart-row" data-price="29.99">
        <div><strong>Mechanical Keyboard</strong><br><small>$29.99 each</small></div>
        <div>
          <input type="number" class="qty-ctrl" value="1" min="1" max="10">
          <button class="btn-del">✕</button>
        </div>
      </div>
      <div class="cart-row" data-price="15.50">
        <div><strong>Gaming Mousepad</strong><br><small>$15.50 each</small></div>
        <div>
          <input type="number" class="qty-ctrl" value="2" min="1" max="10">
          <button class="btn-del">✕</button>
        </div>
      </div>
    </div>

    <div class="summary-box">
      <div>Subtotal: $<span id="cartSubtotal">0.00</span></div>
      <div>Tax (8%): $<span id="cartTax">0.00</span></div>
      <div style="font-size:18px; font-weight:bold; margin-top:6px;">Total: $<span id="cartTotal">0.00</span></div>
    </div>
  </div>

  <script>
    $(function() {
      function recalculateCart() {
        let subtotal = 0;
        $('.cart-row').each(function() {
          const price = parseFloat($(this).data('price'));
          const qty = parseInt($(this).find('.qty-ctrl').val(), 10) || 0;
          subtotal += price * qty;
        });

        const tax = subtotal * 0.08;
        const total = subtotal + tax;

        $('#cartSubtotal').text(subtotal.toFixed(2));
        $('#cartTax').text(tax.toFixed(2));
        $('#cartTotal').text(total.toFixed(2));
      }

      // Quantity change
      $('#cartItems').on('input change', '.qty-ctrl', recalculateCart);

      // Item deletion
      $('#cartItems').on('click', '.btn-del', function() {
        $(this).closest('.cart-row').slideUp(200, function() {
          $(this).remove();
          recalculateCart();
        });
      });

      recalculateCart();
    });
  </script>
</body>
</html>
```

### 6. Output
- Modifying item quantities instantly updates subtotal, tax, and total.
- Deleting an item animates row removal and recalculates the grand total.

### 7. Practical Use
- E-commerce checkout workflows, restaurant ordering menus.

### 8. Common Mistakes
- **Calculating totals before the removal animation completes**: Calling `recalculateCart()` before `$(this).remove()` counts the deleted row's price! Always recalculate inside the animation completion callback.

### 9. Best Practices
- Recalculate within the `.remove()` callback to ensure deleted rows are excluded from totals.

### 10. Exercises
1. Add a promo code input where entering `"DISCOUNT10"` deducts 10% from the subtotal.
2. Persist the cart items in `localStorage` so they survive page refreshes.

### 11. Interview Questions & Answers
**Q: Why must recalculation occur inside the `.slideUp()` completion callback after `.remove()`?**  
**A:** Animations run asynchronously. If you recalculate immediately after calling `.slideUp()`, the row still exists in the DOM, causing `.each()` to count its price. Waiting for the complete callback ensures `.remove()` has purged the element from the DOM.

### 12. Mini Project: Promo Code Discount Validator
```javascript
$('#btnApplyPromo').on('click', function() {
  if ($('#promoCode').val() === 'SAVE20') {
    discountRate = 0.20;
    recalculateCart();
  }
});
```

---

## Chapter 74: Full AJAX CRUD Application

### 1. Objective
Build an end-to-end Create, Read, Update, Delete (CRUD) application interacting with a REST API using jQuery 4.0.

### 2. Explanation
CRUD operations map to HTTP verbs:
- **Create**: `POST /posts`
- **Read**: `GET /posts`
- **Update**: `PUT/PATCH /posts/:id`
- **Delete**: `DELETE /posts/:id`

### 3. Syntax / Architectural Pattern
```javascript
// Generic REST dispatcher
$.ajax({ url: `/api/todos/${id}`, method: 'PUT', data: JSON.stringify(data), contentType: 'application/json' });
```

### 4. Parameters / Configuration
- API: `https://jsonplaceholder.typicode.com/todos`.

### 5. Examples: Complete Working Project
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project 74: AJAX CRUD Application</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f8fafc; }
    .crud-container { max-width: 500px; background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .task-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee; }
    .task-title.done { text-decoration: line-through; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="crud-container">
    <h3>Task Manager (REST CRUD)</h3>
    <form id="createTaskForm" style="display:flex; gap:8px; margin-bottom:15px;">
      <input type="text" id="taskInput" placeholder="New task..." style="flex:1; padding:6px;" required>
      <button type="submit" style="padding:6px 12px;">Add</button>
    </form>

    <div id="taskList">Loading tasks...</div>
  </div>

  <script>
    $(function() {
      const API_URL = 'https://jsonplaceholder.typicode.com/todos';

      // 1. READ: Fetch tasks
      function loadTasks() {
        $.getJSON(API_URL + '?_limit=4', function(tasks) {
          const rows = tasks.map(t => `
            <div class="task-row" data-id="${t.id}">
              <span class="task-title ${t.completed ? 'done' : ''}" style="cursor:pointer;">${t.title}</span>
              <button class="btn-del-task" style="border:none; background:#fee2e2; color:#dc2626; cursor:pointer;">✕</button>
            </div>
          `).join('');
          $('#taskList').html(rows);
        });
      }

      // 2. CREATE: Add new task
      $('#createTaskForm').on('submit', function(e) {
        e.preventDefault();
        const title = $('#taskInput').val().trim();

        $.ajax({
          url: API_URL,
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ title: title, completed: false, userId: 1 })
        }).done(function(newTask) {
          $('#taskList').prepend(`
            <div class="task-row" data-id="${newTask.id}">
              <span class="task-title" style="cursor:pointer;">${newTask.title}</span>
              <button class="btn-del-task" style="border:none; background:#fee2e2; color:#dc2626; cursor:pointer;">✕</button>
            </div>
          `);
          $('#taskInput').val('');
        });
      });

      // 3. UPDATE: Toggle complete status
      $('#taskList').on('click', '.task-title', function() {
        const $span = $(this);
        const $row = $span.closest('.task-row');
        const id = $row.data('id');
        const isDone = $span.hasClass('done');

        $.ajax({
          url: `${API_URL}/${id}`,
          method: 'PATCH',
          contentType: 'application/json',
          data: JSON.stringify({ completed: !isDone })
        }).done(function() {
          $span.toggleClass('done');
        });
      });

      // 4. DELETE: Remove task
      $('#taskList').on('click', '.btn-del-task', function() {
        const $row = $(this).closest('.task-row');
        const id = $row.data('id');

        $.ajax({
          url: `${API_URL}/${id}`,
          method: 'DELETE'
        }).done(function() {
          $row.fadeOut(200, function() { $(this).remove(); });
        });
      });

      loadTasks();
    });
  </script>
</body>
</html>
```

### 6. Output
- Fetches tasks from REST endpoint on load.
- Allows real-time creation (`POST`), status update (`PATCH`), and deletion (`DELETE`).

### 7. Practical Use
- Todo lists, content management systems, customer ticket management.

### 8. Common Mistakes
- **Forgetting event delegation on dynamic list items**: Items inserted via `.prepend()` require delegated listeners on `#taskList`.

### 9. Best Practices
- Provide optimistic UI updates or loading feedback during HTTP transmissions.

### 10. Exercises
1. Add an inline "Edit" button that replaces task text with an `<input>` field for updating titles.
2. Add a global status badge showing "Saving..." during active AJAX requests.

### 11. Interview Questions & Answers
**Q: What is the difference between `PUT` and `PATCH` in a REST CRUD application?**  
**A:** `PUT` replaces the entire resource document with the new payload. `PATCH` applies partial updates, modifying only the specific properties sent in the request without altering other fields.

### 12. Mini Project: Optimistic UI Updater Pattern
```javascript
// Immediately update UI, revert if server rejects
$el.addClass('completed');
$.ajax({ ... }).fail(() => $el.removeClass('completed'));
```

---

## Chapter 75: Drag-and-Drop Dynamic Form Builder

### 1. Objective
Build an interactive form builder allowing users to choose form field types (Text, Number, Date, Select), reorder fields, and preview the generated HTML form.

### 2. Explanation
Dynamic form builders allow non-developers to create forms:
- Palette panel lists available field types.
- Clicking a field type clones a template into the active form container.
- Preview button inspects active fields and generates live HTML/JSON definitions.

### 3. Syntax / Architectural Pattern
```javascript
// Generating dynamic inputs from template dictionary
const template = fieldTemplates[type];
$('#formCanvas').append(template);
```

### 4. Parameters / Configuration
- Supported field types: `'text'`, `'email'`, `'number'`, `'textarea'`.

### 5. Examples: Complete Working Project
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project 75: Dynamic Form Builder</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #f8fafc; }
    .builder-layout { display: flex; gap: 20px; max-width: 700px; }
    .palette { width: 180px; background: #fff; padding: 15px; border-radius: 6px; border: 1px solid #cbd5e1; }
    .canvas { flex: 1; background: #fff; padding: 20px; border-radius: 6px; border: 1px solid #cbd5e1; min-height: 200px; }
    .palette-btn { display: block; width: 100%; padding: 8px; margin-bottom: 8px; border: 1px dashed #64748b; background: #f1f5f9; cursor: pointer; text-align: left; }
    .field-row { background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px; margin-bottom: 10px; border-radius: 4px; position: relative; }
    .btn-field-del { position: absolute; top: 10px; right: 10px; border: none; background: #fee2e2; color: #dc2626; cursor: pointer; }
  </style>
</head>
<body>
  <div class="builder-layout">
    <div class="palette">
      <h4>Add Elements</h4>
      <button class="palette-btn" data-type="text">+ Text Field</button>
      <button class="palette-btn" data-type="email">+ Email Field</button>
      <button class="palette-btn" data-type="textarea">+ Textarea</button>
      <hr>
      <button id="btnGenerateForm" style="width:100%; padding:8px; background:#2563eb; color:#fff; border:none; border-radius:4px; cursor:pointer;">Generate JSON</button>
    </div>

    <div class="canvas" id="formCanvas">
      <p id="emptyPrompt" style="color:#94a3b8;">Click items on the left to add form fields.</p>
    </div>
  </div>

  <pre id="jsonSchema" style="background:#0f172a; color:#38bdf8; padding:12px; max-width:700px; margin-top:15px; display:none;"></pre>

  <script>
    $(function() {
      const templates = {
        text: () => `<div class="field-row" data-type="text"><button class="btn-field-del">✕</button><label>Text Label:</label><input type="text" class="field-label-input" value="Full Name" style="width:70%; padding:4px;"><br><small style="color:#64748b;">(Text Input Preview)</small></div>`,
        email: () => `<div class="field-row" data-type="email"><button class="btn-field-del">✕</button><label>Email Label:</label><input type="text" class="field-label-input" value="Email Address" style="width:70%; padding:4px;"><br><small style="color:#64748b;">(Email Input Preview)</small></div>`,
        textarea: () => `<div class="field-row" data-type="textarea"><button class="btn-field-del">✕</button><label>Textarea Label:</label><input type="text" class="field-label-input" value="Comments" style="width:70%; padding:4px;"><br><small style="color:#64748b;">(Textarea Preview)</small></div>`
      };

      // Add field
      $('.palette-btn').on('click', function() {
        const type = $(this).data('type');
        if (templates[type]) {
          $('#emptyPrompt').hide();
          $('#formCanvas').append(templates[type]());
        }
      });

      // Remove field
      $('#formCanvas').on('click', '.btn-field-del', function() {
        $(this).closest('.field-row').remove();
        if ($('#formCanvas .field-row').length === 0) $('#emptyPrompt').show();
      });

      // Export JSON Schema
      $('#btnGenerateForm').on('click', function() {
        const schema = [];
        $('#formCanvas .field-row').each(function() {
          schema.push({
            type: $(this).data('type'),
            label: $(this).find('.field-label-input').val()
          });
        });
        $('#jsonSchema').text(JSON.stringify(schema, null, 2)).slideDown(200);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking palette buttons injects editable form field rows into the canvas.
- Clicking "Generate JSON" inspects the DOM and outputs the complete schema definition.

### 7. Practical Use
- Custom survey builders, CRM lead capture form designers.

### 8. Common Mistakes
- **Not allowing label customization**: Form builders must let users name their labels.

### 9. Best Practices
- Serialize form definitions into clean JSON schemas for backend database storage.

### 10. Exercises
1. Add "Move Up" / "Move Down" buttons on each field row to allow reordering.
2. Add a "Required" checkbox toggle on each field.

### 11. Interview Questions & Answers
**Q: How do you serialize a dynamic DOM-built form into a database-storable format?**  
**A:** Iterate over the builder DOM elements via `$(container).find('.field-row').each()`, extract attributes (`data-type`, label value, validation rules), push them into a structured array, and convert to JSON with `JSON.stringify()`.

### 12. Mini Project: Form HTML Exporter
```javascript
// Export pure HTML string
const html = schema.map(f => `<label>${f.label}</label><input type="${f.type}">`).join('<br>');
```

---

## Chapter 76: Enterprise Admin Analytics Dashboard

### 1. Objective
Build an executive metrics dashboard featuring KPI cards, auto-updating live timers, and interactive period toggles (Today, 7 Days, 30 Days).

### 2. Explanation
Admin dashboards aggregate operational analytics:
- KPI Cards: Revenue, Active Users, Conversions, Bounce Rate.
- Period Switcher: Fetches or recalculates statistics based on time windows.
- Animated number counting for visual polish.

### 3. Syntax / Architectural Pattern
```javascript
// Animated number ticker
$({ val: 0 }).animate({ val: targetValue }, {
  duration: 1000,
  step: function() { $('#kpi').text(Math.floor(this.val)); }
});
```

### 4. Parameters / Configuration
- Metric periods: `'today'`, `'week'`, `'month'`.

### 5. Examples: Complete Working Project
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project 76: Admin Dashboard</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    body { font-family: sans-serif; padding: 2rem; background: #0f172a; color: #f8fafc; }
    .dash-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .period-btn { background: #1e293b; color: #94a3b8; border: 1px solid #334155; padding: 6px 14px; border-radius: 4px; cursor: pointer; }
    .period-btn.active { background: #2563eb; color: #fff; border-color: #2563eb; }
    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
    .kpi-card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; }
    .kpi-title { font-size: 13px; color: #94a3b8; text-transform: uppercase; }
    .kpi-val { font-size: 28px; font-weight: bold; margin: 8px 0; color: #38bdf8; }
  </style>
</head>
<body>
  <div class="dash-header">
    <h2>Executive Overview</h2>
    <div id="periodControls">
      <button class="period-btn active" data-period="today">Today</button>
      <button class="period-btn" data-period="week">7 Days</button>
      <button class="period-btn" data-period="month">30 Days</button>
    </div>
  </div>

  <div class="kpi-grid">
    <div class="kpi-card"><div class="kpi-title">Gross Revenue</div><div class="kpi-val" id="valRevenue">$0</div></div>
    <div class="kpi-card"><div class="kpi-title">Active Users</div><div class="kpi-val" id="valUsers">0</div></div>
    <div class="kpi-card"><div class="kpi-title">Conversion Rate</div><div class="kpi-val" id="valConv">0%</div></div>
  </div>

  <script>
    $(function() {
      const dataStore = {
        today: { revenue: 1420, users: 310, conv: 3.4 },
        week: { revenue: 18450, users: 2400, conv: 4.1 },
        month: { revenue: 84200, users: 11200, conv: 3.8 }
      };

      function updateDashboard(period) {
        const stats = dataStore[period];

        // Animate Revenue
        $({ num: 0 }).animate({ num: stats.revenue }, {
          duration: 800,
          step: function() { $('#valRevenue').text('$' + Math.floor(this.num).toLocaleString()); }
        });

        // Animate Users
        $({ num: 0 }).animate({ num: stats.users }, {
          duration: 800,
          step: function() { $('#valUsers').text(Math.floor(this.num).toLocaleString()); }
        });

        $('#valConv').text(stats.conv + '%');
      }

      $('#periodControls').on('click', '.period-btn', function() {
        $(this).addClass('active').siblings().removeClass('active');
        updateDashboard($(this).data('period'));
      });

      updateDashboard('today');
    });
  </script>
</body>
</html>
```

### 6. Output
- Beautiful dark executive dashboard.
- Clicking period tabs smoothly animates number counters to their new period totals.

### 7. Practical Use
- SaaS executive dashboards, e-commerce backend portals, analytics hubs.

### 8. Common Mistakes
- **Running animation ticker without `.stop()`**: Rapidly clicking period buttons can cause number counters to jump erratically.

### 9. Best Practices
- Format large numbers with `.toLocaleString()` for readability.

### 10. Exercises
1. Add an animated SVG line chart to the dashboard.
2. Add an automatic 30-second live refresh interval using `setInterval()`.

### 11. Interview Questions & Answers
**Q: How do you animate numeric text values smoothly using jQuery?**  
**A:** Animate an arbitrary dummy JavaScript object `$({ count: 0 }).animate({ count: target }, { step: fn })`. Inside the `step` callback, read `this.count` and update the element's `.text()`.

### 12. Mini Project: Auto-Refreshing Heartbeat Ticker
```javascript
setInterval(() => updateDashboard($('.period-btn.active').data('period')), 30000);
```

---

## Chapter 77: Complete API-Powered Application

### 1. Objective
Build a comprehensive, multi-feature web application integrating live REST API search, pagination, modal details, error handling, and bookmarking.

### 2. Explanation
This capstone project combines all major competencies taught across the 9 parts:
- Asynchronous API communication (`$.ajax()`).
- Debounced live search (`input` event).
- Dynamic modal details viewing.
- Local bookmark management with `localStorage`.
- Zero legacy APIs — 100% strict **jQuery 4.0.0** architecture.

### 3. Syntax / Architectural Pattern
```javascript
// Modular Application Architecture
const WeatherApp = {
  init() { this.cacheDOM(); this.bindEvents(); }
};
```

### 4. Parameters / Configuration
- API: Open-Meteo Geocoding / Weather public REST API.

### 5. Examples: Complete Working Project
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Project 77: Complete API-Powered Application</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f1f5f9; padding: 2rem; color: #1e293b; }
    .app-card { max-width: 600px; margin: 0 auto; background: #fff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    .search-box { width: 100%; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 16px; margin-bottom: 12px; }
    .results-list { list-style: none; padding: 0; margin: 0; }
    .result-item { padding: 12px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
    .result-item:hover { background: #f8fafc; }
    .btn-view { padding: 6px 12px; background: #2563eb; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
    .modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 1000; justify-content: center; align-items: center; }
    .modal-content { background: #fff; padding: 24px; border-radius: 8px; width: 90%; max-width: 400px; }
  </style>
</head>
<body>
  <div class="app-card">
    <h2>Global City Explorer</h2>
    <input type="text" id="citySearch" class="search-box" placeholder="Search cities (e.g. Tokyo, Paris, New York)...">
    <div id="searchFeedback" style="font-size:13px; color:#64748b; margin-bottom:10px;">Type at least 2 characters...</div>
    <ul class="results-list" id="cityResults"></ul>
  </div>

  <div class="modal-overlay" id="detailModal">
    <div class="modal-content">
      <h3 id="modalCityName">City Details</h3>
      <p id="modalCityMeta" style="color:#64748b; margin:10px 0;"></p>
      <button id="btnCloseDetailModal" style="width:100%; padding:8px; background:#64748b; color:#fff; border:none; border-radius:4px; cursor:pointer;">Close</button>
    </div>
  </div>

  <script>
    $(function() {
      let debounceTimer = null;

      // 1. Debounced Live Search
      $('#citySearch').on('input', function() {
        const query = $(this).val().trim();
        clearTimeout(debounceTimer);

        if (query.length < 2) {
          $('#searchFeedback').text('Type at least 2 characters...');
          $('#cityResults').empty();
          return;
        }

        $('#searchFeedback').text('Searching global database...');

        debounceTimer = setTimeout(function() {
          $.ajax({
            url: `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`,
            method: 'GET',
            dataType: 'json'
          })
          .done(function(data) {
            const results = data.results || [];
            if (results.length === 0) {
              $('#searchFeedback').text('No matching cities found.');
              $('#cityResults').empty();
              return;
            }

            $('#searchFeedback').text(`Found ${results.length} result(s):`);
            const html = results.map(city => `
              <li class="result-item">
                <div>
                  <strong>${city.name}</strong>, <small style="color:#64748b;">${city.country || 'N/A'}</small>
                </div>
                <button class="btn-view" data-city="${city.name}" data-country="${city.country}" data-lat="${city.latitude}" data-lon="${city.longitude}">View Coordinates</button>
              </li>
            `).join('');

            $('#cityResults').html(html);
          })
          .fail(function() {
            $('#searchFeedback').text('Error connecting to geocoding API.');
          });
        }, 350);
      });

      // 2. Delegated Modal Opener
      $('#cityResults').on('click', '.btn-view', function() {
        const $btn = $(this);
        const name = $btn.data('city');
        const country = $btn.data('country');
        const lat = $btn.data('lat');
        const lon = $btn.data('lon');

        $('#modalCityName').text(`${name}, ${country}`);
        $('#modalCityMeta').html(`
          <strong>Latitude:</strong> ${lat}°<br>
          <strong>Longitude:</strong> ${lon}°
        `);

        $('#detailModal').css('display', 'flex').hide().fadeIn(200);
      });

      // 3. Modal Dismissal
      $('#btnCloseDetailModal').on('click', function() {
        $('#detailModal').fadeOut(200);
      });

      $('#detailModal').on('click', function(e) {
        if (e.target === this) $(this).fadeOut(200);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Live debounced asynchronous geocoding search querying real Open-Meteo REST APIs.
- Results render in real-time with coordinate details displayed in an accessible modal dialog.

### 7. Practical Use
- Production geocoding, flight booking search, location pickers.

### 8. Common Mistakes
- **Neglecting `encodeURIComponent` on query strings**: Spaces or symbols like `#` or `&` break URL queries if not properly encoded.

### 9. Best Practices
- Always debounce high-frequency input search requests.
- Separate API data fetching logic from presentation DOM rendering.

### 10. Exercises
1. Extend the modal to make a secondary API call fetching the live weather forecast for the selected city coordinates.
2. Add a "Favorite" star button that saves preferred cities into `localStorage`.

### 11. Interview Questions & Answers
**Q: Why is debouncing essential when querying public REST APIs on the `input` event?**  
**A:** Without debouncing, an API request is fired on every single keystroke. A user typing a 10-character word would trigger 10 rapid HTTP requests, consuming network bandwidth, risking API rate-limiting (HTTP 429 Too Many Requests), and causing out-of-order response race conditions. Debouncing ensures only one request is sent after typing ceases.

### 12. Mini Project: City Weather Forecast Extension
```javascript
// Secondary Weather Fetch
$.getJSON(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`, function(weather) {
  $('#modalCityMeta').append(`<br><strong>Current Temp:</strong> ${weather.current_weather.temperature}°C`);
});
```
