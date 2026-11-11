# Tables, Modals, Disclosures & Templates in HTML5

Mastering semantic tabular data structures, native accessible `<dialog>` modals, zero-JavaScript `<details>` accordions, and client-side `<template>` elements.

---

## 1. Semantic Tables for Tabular Data

Tables should **only** be used to present two-dimensional tabular data (e.g., pricing sheets, schedules, financial balances). Never use tables to lay out web page components.

### 1.1 Complete Accessible Table Architecture
```html
<div class="table-responsive">
  <table>
    <caption>Quarterly Cloud Infrastructure Expenditure (USD)</caption>
    <thead>
      <tr>
        <th scope="col">Service</th>
        <th scope="col">Region</th>
        <th scope="col">Instances</th>
        <th scope="col">Monthly Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Database Cluster</th>
        <td>us-east-1</td>
        <td>3 Nodes</td>
        <td>$450.00</td>
      </tr>
      <tr>
        <th scope="row">Compute Auto-Scale</th>
        <td>eu-central-1</td>
        <td>12 Nodes</td>
        <td>$1,280.00</td>
      </tr>
      <tr>
        <th scope="row">Object Storage (S3)</th>
        <td>Global</td>
        <td>45 TB</td>
        <td>$920.00</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th scope="row" colspan="3">Total Monthly Expenditure</th>
        <td>$2,650.00</td>
      </tr>
    </tfoot>
  </table>
</div>
```

### 1.2 Key Semantic Attributes
* **`<caption>`:** The descriptive title of the table, announced first by screen readers.
* **`<thead>`, `<tbody>`, `<tfoot>`:** Logical grouping elements. Browsers repeat `<thead>` and `<tfoot>` across printed pages.
* **`scope="col"` & `scope="row"`:** Explicitly links header cells to the columns or rows they describe, critical for screen reader users navigating row-by-row.
* **`colspan`:** Expands a cell horizontally across multiple columns.
* **`rowspan`:** Expands a cell vertically across multiple rows.

---

## 2. Modern Native Modals: The `<dialog>` Element

Historically, modals required hundreds of lines of complex JavaScript for focus-trapping, backdrop creation, and `Esc` key handling. Modern HTML5 includes the native `<dialog>` element.

### 2.1 Complete Modal Implementation
```html
<!-- Trigger Button -->
<button type="button" id="open-modal-btn">Open Account Settings</button>

<!-- Native Dialog Modal -->
<dialog id="settings-dialog" aria-labelledby="dialog-title">
  <div class="dialog-content">
    <h2 id="dialog-title">Account Settings</h2>
    <p>Manage your notification and profile settings below.</p>

    <!-- Method="dialog" automatically closes the dialog on submit! -->
    <form method="dialog">
      <div class="form-group">
        <label for="display-name">Display Name:</label>
        <input type="text" id="display-name" value="Developer Alex">
      </div>

      <div class="dialog-actions">
        <button type="submit" value="cancel">Cancel</button>
        <button type="submit" value="save" class="btn-primary">Save Changes</button>
      </div>
    </form>
  </div>
</dialog>
```

### 2.2 JavaScript Control
```javascript
const dialog = document.querySelector('#settings-dialog');
const openBtn = document.querySelector('#open-modal-btn');

// Open as a true modal (blocks page interaction, traps focus, shows backdrop)
openBtn.addEventListener('click', () => {
  dialog.showModal();
});

// Detect which button closed the dialog
dialog.addEventListener('close', () => {
  console.log(`Dialog closed with return value: ${dialog.returnValue}`);
});
```

### 2.3 Styling the Native Backdrop with CSS
```css
/* Style the modal backdrop */
dialog::backdrop {
  background: rgba(9, 13, 24, 0.75);
  backdrop-filter: blur(6px);
}

/* Style the dialog box */
dialog {
  border: 1px solid #2b3a5c;
  background: #101a2d;
  color: #e8edf7;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
}
```

### Built-in Native Superpowers of `<dialog>`:
1. **Focus Trapping:** Pressing `Tab` cycles focus strictly inside the dialog; users cannot accidentally focus background elements.
2. **Native Esc Key:** Pressing `Esc` closes the modal automatically.
3. **Accessibility:** Automatically sets `aria-modal="true"` and assigns correct modal roles to assistive technology.

---

## 3. Interactive Accordions: `<details>` & `<summary>`

Create collapsible FAQ accordions, tooltips, and disclosure widgets **without writing a single line of JavaScript**:

```html
<details>
  <summary>How do I reset my Git commit history?</summary>
  <p>You can use <code>git reset --soft HEAD~1</code> to undo the most recent commit while preserving all your modified files in the staging area.</p>
</details>

<details open>
  <summary>What operating systems are supported?</summary>
  <p>Our scripts and tutorials support macOS (Darwin / Zsh), Linux (Debian, Ubuntu, RHEL, Arch), and Windows via Git Bash or WSL.</p>
</details>
```

### Features:
* **`<summary>`:** The visible clickable label (the browser renders a native disclosure triangle).
* **`open` attribute:** Boolean attribute. If present, the accordion is expanded on initial page load.
* **Accessible by Default:** Supports keyboard toggling via `Enter` or `Space`, and screen readers announce expanded/collapsed state dynamically.

---

## 4. Inert Markup Templates: `<template>`

The `<template>` tag holds client-side content that is **not rendered** when the page loads, but can be instantiated and inserted into the document dynamically at runtime via JavaScript.

```html
<!-- Table body target container -->
<tbody id="user-rows"></tbody>

<!-- Reusable row template (invisible until cloned) -->
<template id="user-row-template">
  <tr>
    <td class="user-id"></td>
    <td class="user-name"></td>
    <td class="user-role"></td>
    <td><button class="delete-btn">Delete</button></td>
  </tr>
</template>
```

### JavaScript Instantiation:
```javascript
const template = document.querySelector('#user-row-template');
const tbody = document.querySelector('#user-rows');

function addUserRow(id, name, role) {
  // Deep clone the template contents
  const clone = template.content.cloneNode(true);

  clone.querySelector('.user-id').textContent = id;
  clone.querySelector('.user-name').textContent = name;
  clone.querySelector('.user-role').textContent = role;

  tbody.appendChild(clone);
}

addUserRow(1, "Alice Walker", "Administrator");
addUserRow(2, "Bob Vance", "Editor");
```
* The contents of `<template>` do not run scripts, load images, or apply styles until appended to the active DOM.
