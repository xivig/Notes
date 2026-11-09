# Document Object Model (DOM) — Modern Developer Guide

> The **Document Object Model (DOM)** is a programming interface for web documents. It represents the page as a structured hierarchical tree of objects, enabling programming languages (primarily JavaScript) to dynamically inspect, modify, create, style, and interact with document elements and content.

The DOM is standardized by the **W3C** and the **WHATWG** living standard.

---

## Table of Contents

1. [Understanding the DOM Tree](#1-understanding-the-dom-tree)
2. [Modern Element Selection](#2-modern-element-selection)
3. [DOM Traversal](#3-dom-traversal)
4. [Creating, Inserting, and Removing Elements](#4-creating-inserting-and-removing-elements)
5. [Manipulating Content, Attributes & Datasets](#5-manipulating-content-attributes--datasets)
6. [Styling, Classes & CSS Variables](#6-styling-classes--css-variables)
7. [Modern Event Handling & Delegation](#7-modern-event-handling--delegation)
8. [DOM Performance & Modern Observer APIs](#8-dom-performance--modern-observer-apis)
9. [Quick Reference Cheat Sheet](#9-quick-reference-cheat-sheet)

---

## 1. Understanding the DOM Tree

When a browser loads an HTML document, the parser translates the markup into an in-memory tree of nodes:

```text
                  Window (Global Object)
                     │
                  Document
                     │
               <html> (Document Element)
             ┌───────┴───────┐
          <head>          <body>
         ┌───┴───┐       ┌───┴───────────────────┐
      <title>  <meta>  <header>               <main>
                                             ┌───┴───┐
                                           <h1>     <p>
                                            │        │
                                         "Title"  "Text node"
```

### Node Types
* **Document Node**: The root entry point (`document`).
* **Element Node**: HTML tags (`<div>`, `<p>`, `<button>`). Node type `1`.
* **Text Node**: Text inside tags (including whitespace/newlines). Node type `3`.
* **Comment Node**: `<!-- Comments -->`. Node type `8`.

> **Key Distinction**: Properties with `Element` in their name (e.g., `children`, `firstElementChild`, `parentElement`) ignore whitespace and text nodes, traversing only HTML element tags.

---

## 2. Modern Element Selection

Always prefer standard, modern selector methods:

```javascript
// 1. Single element query (returns first match or null)
const submitBtn = document.querySelector('#submitBtn');
const activeTab = document.querySelector('.nav-tabs .nav-link.active');
const userCard  = document.querySelector('[data-user-id="42"]');

// 2. Multi-element query (returns a static NodeList)
const allButtons = document.querySelectorAll('button.btn-primary');
allButtons.forEach(btn => btn.disabled = true);

// Convert NodeList to an Array for full Array prototype access:
const buttonsArray = Array.from(allButtons);
// or with spread operator:
const buttonsList = [...allButtons];

// 3. Fast direct lookups
const mainHeader = document.getElementById('main-header'); // O(1) lookup
const formInputs = document.getElementsByTagName('input'); // Live HTMLCollection
```

### Contextual Scoped Queries
You can call `querySelector` on any DOM element, not just `document`:

```javascript
const userCard = document.querySelector('#user-card');
const userAvatar = userCard.querySelector('.avatar'); // Only searches inside #user-card
```

### Checking & Matching Elements
```javascript
const el = document.querySelector('.btn');

// Check if element matches a selector:
if (el.matches('.btn-primary:not(:disabled)')) {
  console.log('Active primary button');
}

// Find closest ancestor matching selector (self or up the tree):
const card = el.closest('.card'); // Climbs up parents until finding .card
```

---

## 3. DOM Traversal

Navigate relationships between elements safely:

```javascript
const item = document.querySelector('.active-item');

// Parent
const parent = item.parentElement; // Immediate element parent

// Siblings
const next = item.nextElementSibling;     // Next element sibling
const prev = item.previousElementSibling; // Previous element sibling

// Children
const container = document.querySelector('.container');
const count    = container.childElementCount;  // Number of element children
const first    = container.firstElementChild;  // First element child
const last     = container.lastElementChild;   // Last element child
const children = container.children;           // Live HTMLCollection of elements
```

---

## 4. Creating, Inserting, and Removing Elements

### Creating Elements
```javascript
const card = document.createElement('div');
card.className = 'card p-3 shadow-sm';
card.id = 'notification-card';
```

### Modern Insertion Methods (`append`, `prepend`, `before`, `after`)
These modern methods accept both element objects and plain text strings:

```javascript
const parent = document.querySelector('#wrapper');
const newChild = document.createElement('div');

// 1. Add as last child:
parent.append(newChild, 'Optional text appended');

// 2. Add as first child:
parent.prepend(newChild);

// 3. Add as sibling before parent:
parent.before(newChild);

// 4. Add as sibling after parent:
parent.after(newChild);

// 5. Replace an element:
oldChild.replaceWith(newChild);

// 6. Remove an element directly:
newChild.remove();
```

### Efficient HTML String Insertion (`insertAdjacentHTML`)
Avoid `innerHTML += '...'` because it forces the browser to reparse and destroy all existing child event listeners. Instead, use `insertAdjacentHTML`:

```javascript
const list = document.querySelector('#user-list');

// Positions: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
list.insertAdjacentHTML('beforeend', `
  <li class="user-item" data-id="101">
    <span class="user-name">Sarah Connor</span>
  </li>
`);
```

---

## 5. Manipulating Content, Attributes & Datasets

### Text vs HTML
```javascript
const el = document.querySelector('#banner');

// Safe plain text (automatically escapes HTML characters):
el.textContent = 'Welcome, <User>!'; // Renders literally, preventing XSS

// Visible rendered text (respects CSS visibility and styling):
console.log(el.innerText);

// Full HTML content:
el.innerHTML = '<span class="badge bg-success">Verified</span>';
```

### Attributes
```javascript
const link = document.querySelector('a#doc-link');

link.setAttribute('href', 'https://example.com/docs');
link.setAttribute('target', '_blank');
link.setAttribute('rel', 'noopener noreferrer');

console.log(link.getAttribute('href')); // 'https://example.com/docs'
console.log(link.hasAttribute('download')); // false
link.removeAttribute('target');
```

### Dataset API (`data-*` attributes)
Modern HTML5 dataset properties map automatically between kebab-case and camelCase:

```html
<!-- HTML -->
<div id="product" data-product-id="492" data-in-stock="true" data-unit-price="99.99"></div>
```
```javascript
// JavaScript
const prod = document.querySelector('#product');

console.log(prod.dataset.productId); // "492"
console.log(prod.dataset.inStock);   // "true"
console.log(prod.dataset.unitPrice); // "99.99"

// Updating data attributes dynamically:
prod.dataset.inStock = "false";
prod.dataset.discountCode = "SUMMER26"; // Creates data-discount-code="SUMMER26"
```

---

## 6. Styling, Classes & CSS Variables

### Class Manipulation with `classList`
```javascript
const box = document.querySelector('.box');

box.classList.add('active', 'elevated');
box.classList.remove('hidden');
box.classList.toggle('collapsed'); // Adds if missing, removes if present

// Conditional toggle:
const isExpanded = true;
box.classList.toggle('expanded', isExpanded); // Forces add if true, remove if false

// Check for class:
if (box.classList.contains('active')) {
  console.log('Box is active');
}
```

### Inline Styles & Computed Styles
```javascript
// Set inline styles:
box.style.backgroundColor = '#6366f1';
box.style.display = 'flex';
box.style.setProperty('--card-padding', '1.5rem'); // CSS custom property

// Read effective rendered style (including stylesheet rules):
const computed = window.getComputedStyle(box);
console.log(computed.width);           // e.g. "350px"
console.log(computed.backgroundColor); // e.g. "rgb(99, 102, 241)"
```

---

## 7. Modern Event Handling & Delegation

### Modern `addEventListener`
```javascript
const btn = document.querySelector('#saveBtn');

function handleSave(event) {
  event.preventDefault(); // Stop default form submit or link jump
  console.log('Clicked element:', event.currentTarget);
}

// Basic listener:
btn.addEventListener('click', handleSave);

// Options object: { once, passive, capture, signal }
btn.addEventListener('click', handleSave, {
  once: true,    // Auto-removes listener after firing once
  passive: true  // Informs browser it won't call preventDefault (boosts scroll performance)
});

// Remove listener (must reference the exact function reference):
btn.removeEventListener('click', handleSave);
```

### Event Cancellation via `AbortController`
Modern JavaScript supports clean event unbinding via `AbortSignal`:

```javascript
const controller = new AbortController();
const { signal } = controller;

window.addEventListener('resize', onResize, { signal });
window.addEventListener('scroll', onScroll, { signal });

// Unbind all listeners tied to this signal in one call:
controller.abort();
```

### Event Delegation Pattern
Instead of attaching separate listeners to 100 table rows or list items, attach a single listener to the parent:

```javascript
const userTable = document.querySelector('#users-table');

userTable.addEventListener('click', (event) => {
  // Check if click was on or inside a delete button:
  const deleteBtn = event.target.closest('.btn-delete');
  if (!deleteBtn) return;

  const row = deleteBtn.closest('tr');
  const userId = row.dataset.userId;

  if (confirm(`Delete user #${userId}?`)) {
    row.remove();
  }
});
```

---

## 8. DOM Performance & Modern Observer APIs

### 1. Batch Mutations with `DocumentFragment`
Appending elements in a loop causes repeated layout reflows. Use a `DocumentFragment` to batch changes into a single DOM paint:

```javascript
const list = document.querySelector('#item-list');
const fragment = document.createDocumentFragment();

for (let i = 1; i <= 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li); // Pure in-memory operation
}

list.appendChild(fragment); // Triggers exactly ONE reflow & repaint
```

### 2. Intersection Observer (Lazy Loading & Scroll Triggers)
Detect when elements enter or exit the viewport without costly scroll listeners:

```javascript
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Swap placeholder with real image
      img.classList.remove('lazy-loading');
      obs.unobserve(img); // Done observing this image
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
```

### 3. Mutation Observer (Watching DOM Changes)
Listen for modifications to child nodes or element attributes:

```javascript
const targetNode = document.querySelector('#notification-container');

const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('Nodes added or removed:', mutation.addedNodes);
    }
  }
});

observer.observe(targetNode, { childList: true, subtree: true });
```

---

## 9. Quick Reference Cheat Sheet

| Task | Modern DOM API | Avoid (Legacy) |
|---|---|---|
| **Select element** | `document.querySelector('.class')` | `document.getElementsByClassName` |
| **Check selector** | `el.matches('.active')` | Manual loop/classes |
| **Find ancestor** | `el.closest('.card')` | `el.parentNode.parentNode` |
| **Add class** | `el.classList.add('cls')` | `el.className += ' cls'` |
| **Toggle class** | `el.classList.toggle('cls', bool)` | Custom if/else logic |
| **Append elements**| `parent.append(child1, 'text')` | `parent.appendChild(child1)` |
| **Insert HTML** | `el.insertAdjacentHTML('beforeend', html)`| `el.innerHTML += html` |
| **Delete element** | `el.remove()` | `el.parentNode.removeChild(el)` |
| **Read data attribute**| `el.dataset.id` | `el.getAttribute('data-id')` |
| **Plain text** | `el.textContent = 'safe'` | `el.innerHTML = '...'` (XSS risk) |
```
