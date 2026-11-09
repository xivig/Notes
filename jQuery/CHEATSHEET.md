# ⚡ Modern jQuery 4.0 Developer Cheatsheet

A concise, one-page desk reference for modern **jQuery 4.0.0** APIs, breaking changes, and migration patterns.

---

## 🚨 jQuery 4.0 Breaking Changes & Modern Replacements

| Legacy / Removed in 4.0 | Modern jQuery 4.0 Replacement | Notes |
| :--- | :--- | :--- |
| `$(el).click(fn)` | `$(el).on('click', fn)` | All event shorthands (`.click`, `.hover`, `.focus`, etc.) removed. |
| `$(el).off('click')` | `$(el).off('click')` | Unbinding remains standard. |
| `$.trim(str)` | `str.trim()` | Use native `String.prototype.trim()`. |
| `$.isArray(arr)` | `Array.isArray(arr)` | Use native ECMAScript. |
| `$.isFunction(fn)` | `typeof fn === 'function'` | Standard typeof check. |
| `$.isNumeric(val)` | `typeof val === 'number' && !isNaN(val)` | Or `!isNaN(parseFloat(val))`. |
| `$.now()` | `Date.now()` | Standard timestamp. |
| `$.type(obj)` | `typeof obj` or `Object.prototype.toString.call(obj)` | Native type detection. |
| `$.parseJSON(str)` | `JSON.parse(str)` | Native JSON parsing. |
| `$.unique(arr)` | `$.uniqueSort(arr)` | Renamed to clarify it sorts DOM element arrays. |
| `:first`, `:last`, `:eq(n)` | `.first()`, `.last()`, `.eq(n)` | Avoid pseudo-selectors in query strings; leverage native `querySelectorAll`. |
| Internet Explorer 10- | Dropped | Targets modern evergreen browsers. |

---

## 🎯 Selectors & DOM Traversal

```javascript
// Native query routing (fast!)
$('#id')                      // Element by ID
$('.class')                   // Elements by class
$('parent > child')           // Direct children
$('ancestor descendant')      // Descendants
$('input[type="text"]')       // Attribute selector
$('tr:nth-child(even)')       // Standard CSS pseudo-classes

// Collection Filtering & Traversal
$(el).find('.child')          // Descendant search
$(el).children()              // Direct child elements
$(el).parent()                // Immediate parent
$(el).closest('.card')        // Closest matching ancestor (upwards)
$(el).siblings()              // Sibling elements
$(el).next() / $(el).prev()   // Adjacent siblings
$(el).first() / $(el).last()  // First / last in collection
$(el).eq(index)               // Zero-based index
$(el).filter('.active')       // Reduce collection to matching elements
$(el).not('.disabled')        // Exclude elements from collection
$(el).is(':visible')          // Boolean condition test
```

---

## 🛠️ DOM Manipulation

```javascript
// Reading and Writing Content
$(el).text()                  // Get text content (safe from XSS)
$(el).text('Safe Content')    // Set text content
$(el).html()                  // Get inner HTML
$(el).html('<p>HTML</p>')     // Set inner HTML (CSP / Trusted Types compliant in 4.0)
$(el).val()                   // Get input / select / textarea value
$(el).val('New Value')        // Set input value

// Attribute & Property Handling
$(el).attr('href')            // Get HTML attribute
$(el).attr('href', '/link')   // Set HTML attribute
$(el).removeAttr('title')     // Remove HTML attribute
$(el).prop('checked')         // Get live DOM property (boolean)
$(el).prop('checked', true)   // Set live DOM property (boolean)
$(el).data('user', { id: 1 }) // In-memory data store (avoids DOM clutter)
$(el).data('user')            // Retrieve stored data

// Insertion & Removal
$(parent).append(child)       // Append inside parent at the end
$(parent).prepend(child)      // Prepend inside parent at the beginning
$(el).after(sibling)          // Insert sibling immediately after
$(el).before(sibling)         // Insert sibling immediately before
$(el).remove()                // Remove element, clean listeners & data
$(el).empty()                 // Remove all children, clean listeners & data
$(el).detach()                // Remove from DOM, RETAIN listeners & data
```

---

## 🎨 Styles & Dimensions

```javascript
// Class Management
$(el).addClass('active')
$(el).removeClass('active')
$(el).toggleClass('active')
$(el).toggleClass('active', booleanFlag)
$(el).hasClass('active')      // Returns boolean

// Inline CSS & Geometry
$(el).css('color', '#2563eb')
$(el).css({ fontSize: '16px', background: '#f8fafc' })
$(el).width() / $(el).height()          // Content only
$(el).innerWidth() / $(el).innerHeight()// Content + padding
$(el).outerWidth() / $(el).outerHeight()// Content + padding + border
$(el).outerWidth(true)                  // Content + padding + border + margin
$(el).offset()                          // { top, left } relative to document
$(el).position()                        // { top, left } relative to offsetParent
$(window).scrollTop()                   // Vertical scroll offset
```

---

## ⚡ Events Architecture

```javascript
// Standard Event Binding
$(el).on('click', function(event) { ... });

// Multiple Events in One Call
$(el).on('mouseenter mouseleave', function(event) { ... });

// Event Delegation (Works for dynamically added elements)
$('#staticParent').on('click', '.dynamicChild', function(event) {
  // 'this' refers to .dynamicChild
});

// Single-Execution Listener
$(el).one('click', function() { ... });

// Teardown with Namespaces
$(el).on('click.myFeature', fn);
$(el).off('click.myFeature');           // Unbinds only this namespace
$(window).off('.myFeature');            // Unbinds ALL events in namespace

// Custom Events & Pub/Sub
$(document).on('cart:updated', (e, count) => { ... });
$(document).trigger('cart:updated', [5]);

// Controlling Propagation
event.preventDefault();                 // Suppress browser default action
event.stopPropagation();                // Stop bubbling to ancestors
event.stopImmediatePropagation();       // Stop other listeners on same node
```

---

## 🌐 Modern AJAX & Asynchronous Patterns

```javascript
// Standard Modern $.ajax()
$.ajax({
  url: 'https://api.example.com/v1/users',
  method: 'POST',
  contentType: 'application/json; charset=utf-8',
  dataType: 'json',
  data: JSON.stringify({ name: 'Alex' }),
  headers: {
    'Authorization': 'Bearer ' + authToken
  },
  timeout: 5000
})
.done((data, status, xhr) => { console.log(data); })
.fail((xhr, status, err) => { console.error(err); });

// Modern Async / Await with jQuery 4.0
async function fetchUser(id) {
  try {
    const user = await $.getJSON(`https://api.example.com/users/${id}`);
    const orders = await $.getJSON(`https://api.example.com/orders?userId=${id}`);
    return { user, orders };
  } catch (err) {
    console.error('Network failure:', err);
  }
}

// Global Lifecycle Activity Indicators
$(document).ajaxStart(() => $('#spinner').fadeIn(150));
$(document).ajaxStop(() => $('#spinner').fadeOut(150));
```

---

## 🔌 Custom Plugin Boilerplate

```javascript
(function($) {
  'use strict';

  $.fn.myWidget = function(options) {
    const settings = $.extend({}, $.fn.myWidget.defaults, options);

    return this.each(function() {
      const $el = $(this);
      $el.on('click.myWidget', function() {
        $el.css('color', settings.highlightColor);
      });
    });
  };

  $.fn.myWidget.defaults = {
    highlightColor: '#4f46e5'
  };

})(jQuery);
```
