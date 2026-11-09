# 📘 jQuery 4.0 Master Curriculum & Developer Reference

[![jQuery Version](https://img.shields.io/badge/jQuery-4.0.0-0769AD?style=flat-square&logo=jquery&logoColor=white)](https://jquery.com/)
[![Curriculum](https://img.shields.io/badge/Curriculum-9%20Parts%20%7C%2077%20Chapters-6366f1?style=flat-square)](.)
[![Spec](https://img.shields.io/badge/Standard-W3C%20%2F%20HTML5%20%2F%20ES%20Modules-success?style=flat-square)](.)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg?style=flat-square)](../LICENSE)

A modern, production-grade master curriculum and reference manual for **jQuery 4.0.0**. Synthesized from foundational engineering texts (*'Pro jQuery'* by Adam Freeman, *'jQuery in Action'* by Bear Bibeault, Yehuda Katz, and Aurelio De Rosa) and modernized for modern evergreen browsers, Content Security Policy (CSP), Trusted Types, and ES Modules.

---

## 🚀 The jQuery 4.0 Modernization Paradigm

jQuery 4.0 represents the largest architectural overhaul in the library's history. Unlike legacy tutorials based on jQuery 1.x or 2.x, this curriculum strictly adheres to **jQuery 4.0.0 standards**:

| Modernization Area | Legacy jQuery (1.x / 2.x / 3.x) | Modern jQuery 4.0.0 Architecture |
| :--- | :--- | :--- |
| **Browser Support** | Legacy IE 6–10 polyfills and hacks | Dropped IE 10 and older; targets evergreen modern browsers. |
| **Selector Engine** | Bundled internal Sizzle selector engine | Sizzle retired; directly routes selectors through native `document.querySelectorAll`. |
| **Event Binding** | Deprecated shortcuts (`.click()`, `.hover()`, `.focus()`) | Removed; unified modern event delegation via `.on()` and `.off()`. |
| **Security & CSP** | Direct HTML string injections | Native support for **Trusted Types** and strict **Content Security Policy (CSP)**. |
| **Module System** | Monolithic global UMD / CommonJS wrapper | 100% native **ES Modules (`import $ from 'jquery'`)**. |
| **Utility Methods** | Redundant helper methods (`$.trim`, `$.type`, `$.isArray`) | Removed in favor of native JavaScript (`String.trim`, `Array.isArray`, `typeof`). |
| **Array Sorting** | `jQuery.unique()` | Renamed to `jQuery.uniqueSort()` (legacy `.unique()` removed). |

---

## 📑 Pedagogical Structure (12-Section Topic Template)

Every single chapter in this curriculum follows the uniform professional teaching format:

```text
┌─────────────────────┬─────────────────────────────────────────────────────────────┐
│ Section             │ Detailed Pedagogical Content                                │
├─────────────────────┼─────────────────────────────────────────────────────────────┤
│ 1. Objective        │ Precise learning outcomes and target capabilities           │
│ 2. Explanation      │ In-depth, beginner-to-advanced architectural theory         │
│ 3. Syntax           │ Complete method signature and overload definitions          │
│ 4. Parameters       │ Exhaustive breakdown of argument types, defaults & options  │
│ 5. Examples         │ Code-first, fully functioning script examples               │
│ 6. Output           │ Expected browser rendering, console output, and DOM changes │
│ 7. Practical Use    │ Production scenarios and industry application patterns      │
│ 8. Common Mistakes  │ Frequent developer traps, bug causes, and exact solutions   │
│ 9. Best Practices   │ Performance optimizations and clean-code commandments       │
│ 10. Exercises       │ Hands-on challenges to solidify mastery                     │
│ 11. Interview Q&A   │ Senior technical interview questions with deep answers      │
│ 12. Mini Project    │ End-to-end practical feature implementation                 │
└─────────────────────┴─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Curriculum Roadmap (9 Parts & 77 Chapters)

### [PART 1 — Foundations (Beginner)](01-foundations.md)
* **[01. Introduction to jQuery](01-foundations.md#chapter-1-introduction-to-jquery)**: History, philosophy ("Write less, do more"), evolution to 4.0.
* **[02. JavaScript Prerequisites](01-foundations.md#chapter-2-javascript-prerequisites)**: Objects, functions, prototypes, scope, DOM tree mental model.
* **[03. Installing jQuery 4.0](01-foundations.md#chapter-3-installing-jquery-40)**: NPM, Yarn, script tags, ES Module imports, package setup.
* **[04. CDN vs. Local Installation](01-foundations.md#chapter-4-cdn-vs-local-installation)**: SRI integrity hashes, performance tradeoffs, offline fallbacks.
* **[05. Document Ready & Execution Flow](01-foundations.md#chapter-5-document-ready-and-execution-flow)**: `$(function() {})` vs `window.onload`, parsing sequence.
* **[06. jQuery Syntax & Objects](01-foundations.md#chapter-6-jquery-syntax-and-objects)**: The `$()` factory wrapper, internal collection array, chaining mechanics.
* **[07. JavaScript DOM vs. jQuery](01-foundations.md#chapter-7-javascript-dom-vs-jquery)**: Unwrapping nodes (`[0]`, `.get()`), bridging Vanilla JS with `$()`.

### [PART 2 — Selectors and DOM](02-selectors-and-dom.md)
* **[08. Basic Selectors](02-selectors-and-dom.md#chapter-8-basic-selectors)**: ID, Class, Element, Universal, and Multiple Selector groups.
* **[09. Attribute Selectors](02-selectors-and-dom.md#chapter-9-attribute-selectors)**: Exact (`[attr="val"]`), Prefix (`^=`), Suffix (`$=`), Substring (`*=`), Word (`~=`).
* **[10. Hierarchy Selectors](02-selectors-and-dom.md#chapter-10-hierarchy-selectors)**: Descendant (`ancestor descendant`), Child (`parent > child`), Adjacent (`prev + next`), Sibling (`prev ~ siblings`).
* **[11. Advanced Selectors & Filters](02-selectors-and-dom.md#chapter-11-advanced-selectors-and-filters)**: Positional (`:first`, `:last`, `:eq()`, `:even`, `:odd`), Content (`:has()`, `:contains()`, `:empty`), Visibility (`:visible`, `:hidden`).
* **[12. DOM Traversal](02-selectors-and-dom.md#chapter-12-dom-traversal)**: Parents (`.parent()`, `.closest()`), Children (`.find()`, `.children()`), Siblings (`.siblings()`, `.nextAll()`), Selection Stack (`.end()`, `.addBack()`).
* **[13. DOM Manipulation](02-selectors-and-dom.md#chapter-13-dom-manipulation)**: Reading & writing (`.html()`, `.text()`, `.val()`), Replacing (`.replaceWith()`), Wrapping (`.wrap()`, `.unwrap()`).
* **[14. Creating & Removing Elements](02-selectors-and-dom.md#chapter-14-creating-and-removing-elements)**: Generating nodes (`$('<div/>')`), Inserting (`.append()`, `.prepend()`, `.after()`, `.before()`), Deleting (`.empty()`, `.remove()`, `.detach()`).
* **[15. Attributes, Properties and Data](02-selectors-and-dom.md#chapter-15-attributes-properties-and-data)**: `.attr()` vs `.prop()`, Boolean attributes, HTML5 dataset storage via `.data()`.

### [PART 3 — Events](03-events.md)
* **[16. Event Fundamentals](03-events.md#chapter-16-event-fundamentals)**: Modern `.on()` and `.off()` binding, listeners, removal.
* **[17. Mouse Events](03-events.md#chapter-17-mouse-events)**: `click`, `dblclick`, `mouseenter`, `mouseleave`, `mousemove`, pointer normalization.
* **[18. Keyboard Events](03-events.md#chapter-18-keyboard-events)**: `keydown`, `keyup`, detecting keys with modern `e.key` and `e.code`.
* **[19. Form Events](03-events.md#chapter-19-form-events)**: `submit`, `change`, `input`, `focusin`, `focusout`, accessible forms.
* **[20. Event Delegation](03-events.md#chapter-20-event-delegation)**: Delegating dynamically generated DOM elements via container bubbling.
* **[21. Event Propagation](03-events.md#chapter-21-event-propagation)**: Bubbling vs Capturing, `e.stopPropagation()`, `e.preventDefault()`, `return false;`.
* **[22. Custom Events](03-events.md#chapter-22-custom-events)**: Defining application events with `.trigger('app:notify', [payload])`.
* **[23. Namespaced Events](03-events.md#chapter-23-namespaced-events)**: Modular event cleanup with namespaces (`click.userModal`).

### [PART 4 — Styling and Effects](04-styling-and-effects.md)
* **[24. CSS Manipulation](04-styling-and-effects.md#chapter-24-css-manipulation)**: Reading and writing styles with `.css()`, multi-property batching.
* **[25. Classes and Styles](04-styling-and-effects.md#chapter-25-classes-and-styles)**: `.addClass()`, `.removeClass()`, `.toggleClass()`, `.hasClass()`.
* **[26. Dimensions and Positioning](04-styling-and-effects.md#chapter-26-dimensions-and-positioning)**: Width/Height box model variants, `.offset()` vs `.position()`, `.scrollTop()`.
* **[27. Show, Hide and Toggle](04-styling-and-effects.md#chapter-27-show-hide-and-toggle)**: Display state toggling with duration and easing curves.
* **[28. Fading Effects](04-styling-and-effects.md#chapter-28-fading-effects)**: `.fadeIn()`, `.fadeOut()`, `.fadeToggle()`, `.fadeTo()`.
* **[29. Sliding Effects](04-styling-and-effects.md#chapter-29-sliding-effects)**: Accordion mechanics with `.slideDown()`, `.slideUp()`, `.slideToggle()`.
* **[30. Custom Animations](04-styling-and-effects.md#chapter-30-custom-animations)**: Animating numeric CSS properties via `.animate()`, relative units (`+=50px`).
* **[31. Animation Queues](04-styling-and-effects.md#chapter-31-animation-queues)**: The `fx` queue, preventing animation pileups with `.stop(true, true)`, `.finish()`, `.delay()`.

### [PART 5 — Forms and Validation](05-forms-and-validation.md)
* **[32. Getting and Setting Values](05-forms-and-validation.md#chapter-32-getting-and-setting-values)**: Unified `.val()` mechanics across inputs, textareas, and select elements.
* **[33. Input Handling](05-forms-and-validation.md#chapter-33-input-handling)**: Real-time search debouncing, character limits, copy-paste sanitation.
* **[34. Checkbox and Radio Handling](05-forms-and-validation.md#chapter-34-checkbox-and-radio-handling)**: Multi-check selections, "Select All" master checkboxes, checked state checking with `.prop('checked')`.
* **[35. Dropdowns](05-forms-and-validation.md#chapter-35-dropdowns)**: Single and multi-select dropdown manipulation, dynamic option population.
* **[36. Form Serialization](05-forms-and-validation.md#chapter-36-form-serialization)**: URL-encoded strings via `.serialize()`, array representations via `.serializeArray()`.
* **[37. Form Validation](05-forms-and-validation.md#chapter-37-form-validation)**: Client-side validation pipelines, regular expression matching, inline feedback.
* **[38. Dynamic Forms](05-forms-and-validation.md#chapter-38-dynamic-forms)**: Dynamically adding/removing row inputs, index re-indexing, form cloning.

### [PART 6 — AJAX and Asynchronous JavaScript](06-ajax-and-async.md)
* **[39. AJAX Fundamentals](06-ajax-and-async.md#chapter-39-ajax-fundamentals)**: Client-server HTTP request-response lifecycle without full page reloads.
* **[40. GET and POST Requests](06-ajax-and-async.md#chapter-40-get-and-post-requests)**: Shorthands: `$.get()`, `$.post()`, `$.getJSON()`, and HTML fragment `.load()`.
* **[41. $.ajax()](06-ajax-and-async.md#chapter-41-ajax)**: The core low-level engine: options, headers, HTTP methods, beforeSend, timeouts.
* **[42. JSON and XML Responses](06-ajax-and-async.md#chapter-42-json-and-xml-responses)**: Parsing responses, traversing XML payloads, JSON error trapping.
* **[43. Fetching API Data](06-ajax-and-async.md#chapter-43-fetching-api-data)**: Consuming REST endpoints, handling query parameters, rendering dynamic tables.
* **[44. Error Handling](06-ajax-and-async.md#chapter-44-error-handling)**: Status code handling (400, 401, 403, 404, 500), timeout retry architectures.
* **[45. Loading Indicators](06-ajax-and-async.md#chapter-45-loading-indicators)**: Spinners, progress bars, global hooks (`$(document).ajaxStart()`, `ajaxStop()`).
* **[46. Promises and Asynchronous Programming](06-ajax-and-async.md#chapter-46-promises-and-asynchronous-programming)**: Modern Promises integration, chaining `.then()`, `.catch()`, `async/await` with `$.ajax`.
* **[47. Deferred Objects (Legacy Compatibility)](06-ajax-and-async.md#chapter-47-deferred-objects-legacy-compatibility)**: Understanding `$.Deferred()`, `.resolve()`, `.reject()`, `.promise()`, and migrating to native Promises.

### [PART 7 — Advanced jQuery](07-advanced-jquery.md)
* **[48. jQuery Utilities](07-advanced-jquery.md#chapter-48-jquery-utilities)**: Surviving utilities in 4.0: `$.grep()`, `$.inArray()`, `$.merge()`, `$.makeArray()`.
* **[49. $.each() and $.map()](07-advanced-jquery.md#chapter-49-each-and-map)**: Iteration mechanics vs native `Array.prototype.forEach` and `map`.
* **[50. $.extend()](07-advanced-jquery.md#chapter-50-extend)**: Shallow and deep recursive object merging for plugin options.
* **[51. $.data()](07-advanced-jquery.md#chapter-51-data)**: Internal memory storage engine, preventing DOM circular reference memory leaks.
* **[52. Plugin Architecture](07-advanced-jquery.md#chapter-52-plugin-architecture)**: Extending `$.fn`, preserving method chaining (`return this;`), IIFE scoping.
* **[53. Building Custom Plugins](07-advanced-jquery.md#chapter-53-building-custom-plugins)**: Complete step-by-step authoring of a production-grade interactive tooltip plugin.
* **[54. Code Organization](07-advanced-jquery.md#chapter-54-code-organization)**: Object Literal Module pattern, modular component decoupling.
* **[55. Performance Optimization](07-advanced-jquery.md#chapter-55-performance-optimization)**: Selector caching, batch DOM insertions, minimizing reflows/repaints.
* **[56. Memory Management](07-advanced-jquery.md#chapter-56-memory-management)**: Cleaning up abandoned event listeners, clearing timers, DOM garbage collection.
* **[57. Security and XSS Prevention](07-advanced-jquery.md#chapter-57-security-and-xss-prevention)**: Preventing XSS via `.text()` vs `.html()`, Content Security Policy (CSP), Trusted Types in 4.0.
* **[58. Debugging and Testing](07-advanced-jquery.md#chapter-58-debugging-and-testing)**: Chrome DevTools debugging, unit testing jQuery plugins with Jasmine / Vitest.

### [PART 8 — Professional Development](08-professional-development.md)
* **[59. jQuery with Bootstrap 5](08-professional-development.md#chapter-59-jquery-with-bootstrap-5)**: Using jQuery alongside Bootstrap 5's native JavaScript components.
* **[60. jQuery with PHP](08-professional-development.md#chapter-60-jquery-with-php)**: Server-side rendering, AJAX communication with PHP backend endpoints.
* **[61. jQuery with Laravel](08-professional-development.md#chapter-61-jquery-with-laravel)**: CSRF tokens (`X-CSRF-TOKEN` headers), Laravel Blade forms, and Blade components.
* **[62. jQuery with WordPress](08-professional-development.md#chapter-62-jquery-with-wordpress)**: `noConflict()` wrapper in WordPress, `admin-ajax.php`, WP REST API endpoints.
* **[63. jQuery with REST APIs](08-professional-development.md#chapter-63-jquery-with-rest-apis)**: JWT bearer token authentication, CORS headers, error parsing.
* **[64. jQuery with Modern JavaScript](08-professional-development.md#chapter-64-jquery-with-modern-javascript)**: ES Modules, arrow functions, destructuring, and template literals inside jQuery.
* **[65. Maintaining Legacy Applications](08-professional-development.md#chapter-65-maintaining-legacy-applications)**: Refactoring spaghetti code, removing global pollution, incremental modernization.
* **[66. Migrating jQuery 3.x to 4.x](08-professional-development.md#chapter-66-migrating-jquery-3x-to-4x)**: Complete Migration Guide: breaking changes, removed APIs, `jquery-migrate` 4.x tooling.

### [PART 9 — Practical Projects (Hands-on)](09-practical-projects.md)
* **[67. Interactive Navigation](09-practical-projects.md#project-67-interactive-navigation)**: Accessible multi-level dropdown navbar with keyboard navigation & mobile drawer.
* **[68. Dynamic Data Table](09-practical-projects.md#project-68-dynamic-data-table)**: Multi-column alphanumeric sorting, column reordering, striped rows.
* **[69. Search and Filtering](09-practical-projects.md#project-69-search-and-filtering)**: Instant multi-criteria filter with term highlighting and debounce.
* **[70. Pagination](09-practical-projects.md#project-70-pagination)**: Client-side pagination with dynamic page size and ellipsis navigation.
* **[71. Modal System](09-practical-projects.md#project-71-modal-system)**: Production-grade modal dialog with focus trapping, ESC key listener & body lock.
* **[72. Image Gallery](09-practical-projects.md#project-72-image-gallery)**: Lightbox image preview gallery with thumbnail carousel and zoom.
* **[73. Shopping Cart](09-practical-projects.md#project-73-shopping-cart)**: Real-time cart calculations, quantity adjustment, coupon codes, and item removal.
* **[74. AJAX CRUD Application](09-practical-projects.md#project-74-ajax-crud-application)**: Create, Read, Update, Delete system talking to REST API with modal editors.
* **[75. Form Builder](09-practical-projects.md#project-75-form-builder)**: Interactive form field creator allowing users to add/reorder form inputs dynamically.
* **[76. Admin Dashboard](09-practical-projects.md#project-76-admin-dashboard)**: Dashboard with animated metric cards, interactive filter panels, and real-time activity stream.
* **[77. Complete API-Powered Application](09-practical-projects.md#project-77-complete-api-powered-application)**: Full production web app featuring user search, profile drawers, caching, and auto-retry.

---

## 🚀 Quick Reference & Companion Guides

- 📄 **[Developer Desk Cheat Sheet (CHEATSHEET.md)](CHEATSHEET.md)** — Ultra-condensed one-pager with jQuery 4.0 syntax, selector performance matrix, and Vanilla JS comparison.
- 📦 **[Companion Raw Study Notes: Core & Architecture (jQueryFirst.md)](jQueryFirst.md)** — Original deep notes from *'Pro jQuery'*.
- 🔍 **[Companion Raw Study Notes: Complete Selectors (jQuerySelector.md)](jQuerySelector.md)** — Original deep notes from *'jQuery in Action'*.
