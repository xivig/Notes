# Sizzle Selector Engine & Modern Native DOM Selectors

> **Sizzle** was a pure-JavaScript CSS selector engine developed by John Resig and the jQuery team. It powered jQuery's element selection (`$('selector')`) from jQuery 1.3 through jQuery 3.x.

---

## 1. Historical Background: Why Sizzle Was Created

In the early era of web development (Internet Explorer 6–8), browsers lacked unified element selection APIs:
* Only rudimentary methods existed: `document.getElementById()`, `document.getElementsByTagName()`, and (later) `document.getElementsByClassName()`.
* Complex CSS queries like `div.alert > p:first-child` or `input[type="checkbox"]:checked` were impossible without writing custom DOM recursion loops.
* John Resig authored **Sizzle** as a standalone, cross-browser CSS selector engine that could parse and execute arbitrary CSS selectors across any browser.

---

## 2. Transition to Modern Web Standards

Sizzle's widespread adoption heavily influenced the W3C and browser vendors, leading directly to the standardization of native selector APIs:

1. **`document.querySelector()`**: Returns the first matching Element.
2. **`document.querySelectorAll()`**: Returns a static `NodeList` of all matching Elements.

Because native C++ browser implementations operate up to **10–50x faster** than JavaScript-based selector parsing, the need for Sizzle gradually diminished as legacy browsers (IE6–11) were retired.

---

## 3. jQuery 4.0: The Removal of Sizzle

In **jQuery 4.0**, the jQuery Core team officially **removed Sizzle completely**. 

### Why Sizzle was removed:
* Modern browsers natively support CSS Selectors Level 3 & Level 4.
* Removing Sizzle reduced jQuery's library weight by ~18 KB and substantially boosted query performance.
* Replaced Sizzle with a lean wrapper around the native `document.querySelectorAll()` API.

### Deprecated Positional Pseudo-Selectors:
Non-standard jQuery-specific selectors that could not be parsed by native `querySelectorAll` were deprecated or removed:
* `:first` &rarr; Use `.first()` or native `:first-child`
* `:last` &rarr; Use `.last()` or native `:last-child`
* `:eq(n)` &rarr; Use `.eq(n)` or native `:nth-child(n+1)`
* `:even` / `:odd` &rarr; Use `.even()` / `.odd()` or native `:nth-child(even)` / `:nth-child(odd)`

---

## 4. Modern CSS Selectors in Native JavaScript

Today, modern browsers natively support advanced pseudo-classes without any external library:

```javascript
// 1. Parent/Ancestor selector (:has)
// Find every card that contains an image with class .hero
const cards = document.querySelectorAll('.card:has(img.hero)');

// 2. Multi-selector groupings (:is and :where)
// Match headers across multiple containers without specificity inflation
const headings = document.querySelectorAll(':is(header, main, footer) :is(h1, h2, h3)');

// 3. Negation selector (:not)
// Find all inputs that are NOT disabled
const activeInputs = document.querySelectorAll('input:not([disabled])');

// 4. Form pseudo-classes
const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
```
