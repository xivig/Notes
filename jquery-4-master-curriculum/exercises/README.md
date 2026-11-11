# 🏋️ Modern jQuery 4.0 Practical Exercises

A curated collection of hands-on coding challenges categorized from Beginner to Advanced, designed to build muscle memory across DOM traversal, event handling, AJAX, and plugin architecture.

---

## 🟢 Beginner Exercises

### 1. The Dynamic Paragraph Highlighter
- **Problem**: Given four `<p>` elements, write a script that adds a class `.lead` to the first paragraph and toggles a yellow background on any paragraph when clicked.
- **Rules**: Use modern `.on('click', fn)` and `.first()`.
- **Solution**:
```javascript
$('p').first().addClass('lead');
$('p').on('click', function() {
  $(this).toggleClass('highlighted');
});
```

### 2. Live Character Counter
- **Problem**: Build an input field that updates a `<span>` showing remaining characters out of 100 on every keystroke.
- **Rules**: Use the `input` event and `.val().length`.
- **Solution**:
```javascript
$('#noteInput').on('input', function() {
  const remaining = 100 - $(this).val().length;
  $('#charCounter').text(remaining + ' characters left');
});
```

---

## 🟡 Intermediate Exercises

### 3. Delegated Dynamic Shopping List
- **Problem**: Build an input and "Add" button that appends items to an unordered list. Each item has a "Delete" button that removes only its own row.
- **Rules**: Use event delegation on the parent `<ul>`.
- **Solution**:
```javascript
$('#btnAdd').on('click', function() {
  const text = $('#itemText').val().trim();
  if (text) {
    $('#shoppingList').append(`<li><span>${text}</span> <button class="btn-del">✕</button></li>`);
    $('#itemText').val('').focus();
  }
});

// Single delegated listener
$('#shoppingList').on('click', '.btn-del', function() {
  $(this).closest('li').remove();
});
```

### 4. Debounced User Search
- **Problem**: Capture input from a search field and trigger an alert with the query string only after the user stops typing for 400ms.
- **Rules**: Use `clearTimeout` and `setTimeout`.
- **Solution**:
```javascript
let searchTimer = null;
$('#searchInput').on('input', function() {
  clearTimeout(searchTimer);
  const q = $(this).val().trim();
  searchTimer = setTimeout(function() {
    if (q) console.log('Searching for:', q);
  }, 400);
});
```

---

## 🔴 Advanced Exercises

### 5. Custom Tooltip Plugin with Method Chaining
- **Problem**: Write a plugin `$.fn.smartTooltip()` that displays a dark floating badge above an element on `mouseenter` and removes it on `mouseleave`.
- **Rules**: Must preserve method chaining by returning `this.each(...)`.
- **Solution**:
```javascript
(function($) {
  $.fn.smartTooltip = function(options) {
    const settings = $.extend({ text: 'Default Tooltip' }, options);

    return this.each(function() {
      const $target = $(this);
      let $tip = null;

      $target.on('mouseenter.tooltip', function() {
        const offset = $target.offset();
        $tip = $('<div class="smart-tip"></div>')
          .text(settings.text)
          .css({
            position: 'absolute',
            top: offset.top - 30,
            left: offset.left,
            background: '#1e293b',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: 12
          })
          .appendTo('body');
      }).on('mouseleave.tooltip', function() {
        if ($tip) { $tip.remove(); $tip = null; }
      });
    });
  };
})(jQuery);
```

### 6. Parallel API Aggregator with Async/Await
- **Problem**: Fetch a user profile and that user's latest 3 posts simultaneously from `jsonplaceholder.typicode.com` and render them in a card.
- **Rules**: Use `Promise.all()` and `await $.getJSON()`.
- **Solution**:
```javascript
async function loadUserData(userId) {
  try {
    const [user, posts] = await Promise.all([
      $.getJSON(`https://jsonplaceholder.typicode.com/users/${userId}`),
      $.getJSON(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=3`)
    ]);

    $('#profile').html(`
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <h4>Recent Posts:</h4>
      <ul>${posts.map(p => `<li>${p.title}</li>`).join('')}</ul>
    `);
  } catch (err) {
    $('#profile').text('Failed to load profile.');
  }
}
```
