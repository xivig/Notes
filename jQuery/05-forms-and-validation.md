# 📝 Part 5 — Forms and Validation (Intermediate)

A comprehensive guide to capturing user input, managing form controls, serialization, client-side validation rules, and dynamic form builders using **jQuery 4.0.0**.

---

## 📑 Table of Contents
1. [Chapter 32: Getting and Setting Values](#chapter-32-getting-and-setting-values)
2. [Chapter 33: Input Handling](#chapter-33-input-handling)
3. [Chapter 34: Checkbox and Radio Handling](#chapter-34-checkbox-and-radio-handling)
4. [Chapter 35: Dropdowns (Select Elements)](#chapter-35-dropdowns-select-elements)
5. [Chapter 36: Form Serialization](#chapter-36-form-serialization)
6. [Chapter 37: Form Validation](#chapter-37-form-validation)
7. [Chapter 38: Dynamic Forms](#chapter-38-dynamic-forms)

---

## Chapter 32: Getting and Setting Values

### 1. Objective
Extract and update values across form inputs, textareas, selects, and hidden fields using `.val()`.

### 2. Explanation
The `.val()` method in jQuery is the standard accessor for form element data:
- **As a Getter**: When called with no arguments (`$(selector).val()`), it returns the value of the **first** element in the collection. For multi-select elements, it returns an array of selected values.
- **As a Setter**: When called with a string, number, or array (`$(selector).val(newValue)`), it sets the value for **every** matched element in the collection.

Unlike `.text()` or `.html()`, which operate on child DOM text nodes, `.val()` operates on the live `value` property of form input elements.

### 3. Syntax
```javascript
// Getter: Read value of first matched element
const currentVal = $(inputSelector).val();

// Setter: Assign value across all matched elements
$(inputSelector).val('New Value');

// Setter: Function-based value computation
$(inputSelector).val(function(index, currentValue) {
  return currentValue.trim().toUpperCase();
});
```

### 4. Parameters
- `value` *(String | Number | Array)*: The value to set on the control. Passing an array selects matching options in `<select multiple>` or matching radio/checkbox groups.
- `function(index, currentVal)` *(Function)*: Dynamic callback returning the string to set.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 32: Form Values</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <input type="text" id="username" value="john_doe" style="padding:6px;">
  <button id="btnRead">Read</button>
  <button id="btnCapitalize">Capitalize</button>
  <button id="btnClear">Clear</button>

  <script>
    $('#btnRead').on('click', function() {
      alert('Current value: ' + $('#username').val());
    });

    $('#btnCapitalize').on('click', function() {
      $('#username').val(function(i, val) {
        return val.toUpperCase();
      });
    });

    $('#btnClear').on('click', function() {
      $('#username').val('').focus();
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Read" displays an alert with `"Current value: john_doe"`.
- Clicking "Capitalize" transforms the input text to `"JOHN_DOE"`.
- Clicking "Clear" empties the field and restores focus.

### 7. Practical Use
- Pre-filling form fields from API responses or local storage.
- Sanitizing user input (e.g. trimming whitespace, stripping non-digit characters from phone numbers).

### 8. Common Mistakes
- **Using `.text()` or `.html()` on `<input>` or `<textarea>`**: Calling `$('#myInput').text('foo')` does not set the input value. Always use `.val()`.
- **Assuming `.val()` returns numbers for numeric inputs**: Even on `<input type="number">`, `.val()` returns a **String** (e.g. `'42'`). Always use `parseFloat()` or `parseInt()` when performing arithmetic calculations.

### 9. Best Practices
- Always cast numeric input values explicitly: `const qty = parseInt($('#qty').val(), 10) || 0;`.
- Use `.val().trim()` when reading text input to prevent whitespace-only submissions.

### 10. Exercises
1. Build a currency input that automatically prefixes user input with `$` whenever the field loses focus (`blur`).
2. Build an input field that automatically sanitizes phone numbers by stripping all non-digit characters on `input`.

### 11. Interview Questions & Answers
**Q: Why does `$('#mySelect').val()` return an array for multi-select dropdowns but a string for standard dropdowns?**  
**A:** In a single-select `<select>`, only one option can be chosen, so `.val()` returns the selected string value. In a `<select multiple>`, users can select multiple options; jQuery automatically collects and returns all chosen option values in a JavaScript array.

### 12. Mini Project: Real-Time Currency Converter
```html
<div style="font-family:sans-serif; max-width:300px; padding:1rem; border:1px solid #ccc; border-radius:6px;">
  <label>USD Amount ($):</label>
  <input type="number" id="usdInput" value="100" style="width:100%; padding:6px; box-sizing:border-box; margin:6px 0 12px;">
  
  <label>Target Currency:</label>
  <select id="currSelect" style="width:100%; padding:6px; margin:6px 0 12px;">
    <option value="0.92">EUR (€) - 0.92</option>
    <option value="0.78">GBP (£) - 0.78</option>
    <option value="155.40">JPY (¥) - 155.40</option>
  </select>

  <div style="font-weight:bold; font-size:18px;">Converted: <span id="convertedOutput">€92.00</span></div>
</div>

<script>
  function recalculate() {
    const usd = parseFloat($('#usdInput').val()) || 0;
    const rate = parseFloat($('#currSelect').val());
    const symbol = $('#currSelect option:selected').text().split(' ')[1];
    const total = (usd * rate).toFixed(2);
    $('#convertedOutput').text(`${symbol}${total}`);
  }

  $('#usdInput, #currSelect').on('input change', recalculate);
</script>
```

---

## Chapter 33: Input Handling

### 1. Objective
Handle real-time user keystrokes, paste actions, debounced searching, and input formatting across text-based form controls in jQuery 4.0.

### 2. Explanation
Capturing user input correctly requires distinguishing between event types:
- `input`: Fires immediately and synchronously on **any** modification (typing, backspacing, cutting, pasting, voice dictation). This is the gold standard for real-time validation and search.
- `change`: Fires only after the input loses focus (`blur`) and its value has changed.
- `keydown` / `keyup`: Fires on keyboard presses, but misses mouse-based copy/paste or drag-and-drop text inputs.

For live search and API-driven auto-complete, high-frequency typing can bombard servers with hundreds of requests per minute. Implementing a **debounce** pattern ensures that the search callback only fires after the user pauses typing for a designated period (e.g. 300ms).

### 3. Syntax
```javascript
// Immediate input detection
$(inputSelector).on('input', function() {
  const query = $(this).val();
});

// Debounced input pattern
let debounceTimer;
$(inputSelector).on('input', function() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    // Execute expensive search or network request
  }, 300);
});
```

### 4. Parameters
- `input` event object: Contains standard event metadata.
- `clearTimeout(timerId)`: Halts pending debounced executions if a new keystroke occurs before the timer elapses.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 33: Input Handling & Debounce</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <label>Search Products (Debounced 350ms):</label><br>
  <input type="text" id="liveSearch" placeholder="Type query..." style="padding:8px; width:280px; margin-top:6px;">
  <p id="searchStatus" style="color:#64748b;">Waiting for input...</p>

  <script>
    let searchTimeout = null;

    $('#liveSearch').on('input', function() {
      const query = $(this).val().trim();
      $('#searchStatus').text('Typing detected...');

      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(function() {
        if (query.length > 0) {
          $('#searchStatus').html(`API Search executed for: <strong>"${query}"</strong>`);
        } else {
          $('#searchStatus').text('Input cleared.');
        }
      }, 350);
    });
  </script>
</body>
</html>
```

### 6. Output
- As the user types rapidly, the status shows "Typing detected..." without making requests.
- Once the user stops typing for 350ms, the API query runs and updates the status.

### 7. Practical Use
- Instant filter inputs, auto-saving draft forms, credit card number formatters, and username availability checkers.

### 8. Common Mistakes
- **Using `keyup` instead of `input`**: `keyup` misses text pasted via right-click or drag-and-drop, and triggers redundantly on modifier keys like `Shift` or `Ctrl`.
- **Neglecting to clear timeouts in debouncing**: If you forget `clearTimeout()`, every single keystroke eventually fires its own search callback.

### 9. Best Practices
- Always use the `input` event for real-time text input tracking.
- Apply debouncing (300ms–400ms) to any input handler that triggers network requests or heavy DOM manipulation.

### 10. Exercises
1. Build an input field that automatically formats credit card numbers with spaces every 4 digits (`xxxx xxxx xxxx xxxx`) on the fly.
2. Implement an auto-expanding `<textarea>` that grows taller as the user types multiple lines of text.

### 11. Interview Questions & Answers
**Q: Why is the `input` event preferred over `keyup` for modern form input handling?**  
**A:** `keyup` only fires on physical keyboard release; it misses text pasted with a mouse, text inserted via speech-to-text, autocomplete fills, or drag-and-drop operations. In contrast, the `input` event reliably fires whenever the value changes regardless of the input method.

### 12. Mini Project: Real-Time Character and Word Counter
```html
<div style="font-family:sans-serif; max-width:350px;">
  <label>Essay Draft (Max 200 chars):</label>
  <textarea id="essayBox" maxlength="200" rows="4" style="width:100%; padding:8px; box-sizing:border-box; margin-top:6px;"></textarea>
  <div style="display:flex; justify-content:space-between; font-size:12px; color:#475569; margin-top:4px;">
    <span>Words: <strong id="wordCount">0</strong></span>
    <span>Chars: <strong id="charCount">0</strong> / 200</span>
  </div>
</div>

<script>
  $('#essayBox').on('input', function() {
    const text = $(this).val().trim();
    const chars = $(this).val().length;
    const words = text === '' ? 0 : text.split(/\s+/).length;

    $('#charCount').text(chars);
    $('#wordCount').text(words);
  });
</script>
```

---

## Chapter 34: Checkbox and Radio Handling

### 1. Objective
Inspect, toggle, and synchronize checkbox and radio button states using `.prop('checked')` and manage bulk selection patterns in jQuery 4.0.

### 2. Explanation
Checkboxes and radio buttons represent boolean or mutually exclusive states.

In jQuery:
- **Always use `.prop('checked')`** to read or modify the live dynamic state.
- **Never use `.attr('checked')`**: `.attr()` accesses the initial HTML attribute defined in markup; it does not accurately reflect dynamic user changes in modern browsers.

Key operations:
- Check if active: `$(el).is(':checked')` or `$(el).prop('checked')`.
- Turn on: `$(el).prop('checked', true)`.
- Turn off: `$(el).prop('checked', false)`.
- Selected radio value: `$('input[name="group"]:checked').val()`.

### 3. Syntax
```javascript
// Check boolean state
const isChecked = $(checkboxSelector).prop('checked');
const isCheckedShorthand = $(checkboxSelector).is(':checked');

// Set boolean state
$(checkboxSelector).prop('checked', true);

// Get selected radio value
const selectedVal = $('input[name="gender"]:checked').val();
```

### 4. Parameters
- `'checked'` *(String)*: The DOM boolean property name.
- `booleanState` *(Boolean)*: `true` to check, `false` to uncheck.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 34: Checkboxes & Radios</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <h3>Subscription Plans (Radio)</h3>
  <label><input type="radio" name="plan" value="free" checked> Free ($0)</label><br>
  <label><input type="radio" name="plan" value="pro"> Pro ($15/mo)</label><br>
  <label><input type="radio" name="plan" value="enterprise"> Enterprise ($99/mo)</label>
  <p id="planFeedback">Selected: free</p>

  <script>
    $('input[name="plan"]').on('change', function() {
      const selected = $('input[name="plan"]:checked').val();
      $('#planFeedback').text('Selected: ' + selected);
    });
  </script>
</body>
</html>
```

### 6. Output
- Changing radio selections instantly updates `#planFeedback` with the chosen plan value.

### 7. Practical Use
- "Select All / Deselect All" batch actions in inbox tables and administrative dashboards.
- Revealing conditional form sections (e.g., showing a shipping address form only when "Ship to different address" is checked).

### 8. Common Mistakes
- **Using `.attr('checked', 'checked')`**: This only alters the HTML attribute, failing to update the DOM property if the user has already interacted with the checkbox. Always use `.prop('checked', true)`.
- **Querying radio values without `:checked`**: Writing `$('input[name="plan"]').val()` always returns the value of the *first* radio button in the DOM, not the one currently chosen. Always use `$('input[name="plan"]:checked').val()`.

### 9. Best Practices
- Use `.prop('checked', bool)` for state mutations.
- Use `$('input[name="..."]:checked').val()` to retrieve selected radio choices safely.

### 10. Exercises
1. Build a "Select All" master checkbox that checks and unchecks five child checkboxes, and automatically unchecks itself if any child is manually unchecked.
2. Build a radio-button group that conditionally reveals different payment method forms (Credit Card vs. PayPal).

### 11. Interview Questions & Answers
**Q: Why does `.attr('checked')` produce bugs when used to toggle checkboxes?**  
**A:** `.attr('checked')` maps to the HTML attribute present in the markup string (representing the *default* state on page load). `.prop('checked')` maps directly to the live JavaScript DOM property on the HTMLInputElement object. Once a user clicks a checkbox, the property diverges from the attribute.

### 12. Mini Project: Master "Select All" Email Inbox Table
```html
<div style="font-family:sans-serif; max-width:400px;">
  <div style="padding:8px; background:#f1f5f9; border-bottom:1px solid #cbd5e1;">
    <label><input type="checkbox" id="masterSelect"> <strong>Select All Messages</strong></label>
  </div>
  <ul id="emailList" style="list-style:none; padding:0; margin:0;">
    <li style="padding:8px; border-bottom:1px solid #eee;"><label><input type="checkbox" class="msg-check"> Welcome to our service</label></li>
    <li style="padding:8px; border-bottom:1px solid #eee;"><label><input type="checkbox" class="msg-check"> Your invoice #1042</label></li>
    <li style="padding:8px; border-bottom:1px solid #eee;"><label><input type="checkbox" class="msg-check"> Security notice</label></li>
  </ul>
  <p id="selectionSummary" style="font-size:13px; color:#64748b; margin-top:8px;">0 selected</p>
</div>

<script>
  // Master toggles all children
  $('#masterSelect').on('change', function() {
    const isChecked = $(this).prop('checked');
    $('.msg-check').prop('checked', isChecked);
    updateSummary();
  });

  // Individual changes update master and summary
  $('#emailList').on('change', '.msg-check', function() {
    const allChecked = $('.msg-check').length === $('.msg-check:checked').length;
    $('#masterSelect').prop('checked', allChecked);
    updateSummary();
  });

  function updateSummary() {
    const count = $('.msg-check:checked').length;
    $('#selectionSummary').text(`${count} message(s) selected`);
  }
</script>
```

---

## Chapter 35: Dropdowns (Select Elements)

### 1. Objective
Read, set, populate, disable, and manipulate standard and multi-select `<select>` dropdown elements in jQuery 4.0.

### 2. Explanation
HTML `<select>` elements provide single or multiple choice selections:
- To get selected value: `$(select).val()`.
- To get selected text label: `$(select).find('option:selected').text()`.
- To set selected value: `$(select).val('targetValue')`.
- For multi-select: `.val(['val1', 'val2'])` accepts an array of values.
- Dynamic options: Can be emptied using `.empty()` and repopulated using `.append()`.

### 3. Syntax
```javascript
// Reading value and display text
const val = $('select#country').val();
const text = $('select#country option:selected').text();

// Setting selected option by value
$('select#country').val('CA');

// Dynamic population
$('select#city').empty().append(
  $('<option>', { value: 'nyc', text: 'New York City' })
);
```

### 4. Parameters
- `value` *(String | Array)*: The option `value` to select.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 35: Dropdowns</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <label>Choose a Framework:</label>
  <select id="frameworkSelect" style="padding:6px;">
    <option value="">-- Please Select --</option>
    <option value="react">React 19</option>
    <option value="vue">Vue 3</option>
    <option value="angular">Angular 18</option>
  </select>

  <p id="selectionResult"></p>

  <script>
    $('#frameworkSelect').on('change', function() {
      const val = $(this).val();
      const text = $(this).find('option:selected').text();
      
      if (val) {
        $('#selectionResult').text(`You selected: ${text} (value: ${val})`);
      } else {
        $('#selectionResult').text('');
      }
    });
  </script>
</body>
</html>
```

### 6. Output
- Selecting "React 19" outputs: `"You selected: React 19 (value: react)"`.

### 7. Practical Use
- Cascading dropdowns (e.g. Country -> State/Province -> City).
- Filtering data tables by category.

### 8. Common Mistakes
- **Trying to read selected text using `.val()`**: `.val()` returns the `value` attribute of the option, not its human-visible inner text. To get visible text, use `$(select).find('option:selected').text()`.
- **Failing to clear previous options when repopulating**: Omitting `.empty()` appends new options to the end of stale options.

### 9. Best Practices
- Always provide a disabled default prompt option (`<option value="" disabled selected>Select...</option>`).
- Construct and append option collections using an array or document fragment to minimize layout reflows when populating large lists.

### 10. Exercises
1. Build a cascading dropdown where choosing a country loads the corresponding cities into a second dropdown.
2. Build a multi-select list that displays a comma-separated list of selected choices below it.

### 11. Interview Questions & Answers
**Q: How do you get both the value and the visible text of a selected `<select>` option?**  
**A:** Use `.val()` on the `<select>` element to get the value, and `$(select).find('option:selected').text()` to get the visible text string.

### 12. Mini Project: Cascading Country-to-State Selector
```html
<div style="font-family:sans-serif; max-width:320px;">
  <label>Country:</label>
  <select id="selCountry" style="width:100%; padding:6px; margin:4px 0 12px;">
    <option value="">Select Country</option>
    <option value="US">United States</option>
    <option value="CA">Canada</option>
  </select>

  <label>State / Province:</label>
  <select id="selRegion" style="width:100%; padding:6px; margin-top:4px;" disabled>
    <option value="">Select Country First</option>
  </select>
</div>

<script>
  const regionData = {
    US: ['California', 'New York', 'Texas', 'Washington'],
    CA: ['Alberta', 'British Columbia', 'Ontario', 'Quebec']
  };

  $('#selCountry').on('change', function() {
    const country = $(this).val();
    const $region = $('#selRegion');

    if (!country) {
      $region.empty().append('<option value="">Select Country First</option>').prop('disabled', true);
      return;
    }

    $region.empty().append('<option value="">Choose State/Province</option>');
    $.each(regionData[country], function(i, state) {
      $region.append($('<option>', { value: state.toLowerCase(), text: state }));
    });
    $region.prop('disabled', false);
  });
</script>
```

---

## Chapter 36: Form Serialization

### 1. Objective
Extract, serialize, and transform complete HTML form states into URL-encoded strings, structured object arrays, or modern JSON payloads using `.serialize()`, `.serializeArray()`, and `FormData`.

### 2. Explanation
Submitting forms asynchronously via AJAX requires converting all successful form controls into a transferable format:
- `.serialize()`: Serializes form inputs into a URL-encoded query string format (`'name=John&email=john%40example.com'`).
- `.serializeArray()`: Returns an array of name-value objects (`[{ name: 'email', value: '...' }]`).
- Modern JavaScript + jQuery: Forms can be converted directly into clean JSON objects via `Object.fromEntries(new FormData(formElement))`.

Rules for successful serialization:
1. Inputs **must have a `name` attribute**; elements without a `name` are ignored.
2. Disabled elements (`disabled`) are excluded.
3. Unchecked checkboxes and radios are excluded.

### 3. Syntax
```javascript
// URL-encoded string
const queryString = $('form').serialize();

// Array of name/value pairs
const arrayData = $('form').serializeArray();

// Converting serializeArray to a clean JS Object
const formObj = {};
$.each(arrayData, function(_, field) {
  formObj[field.name] = field.value;
});
```

### 4. Parameters
- No parameters required. Must be called on a `<form>` element or a collection of form controls.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 36: Serialization</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <form id="orderForm">
    <input type="text" name="customer" value="Alice Smith"><br>
    <input type="email" name="email" value="alice@example.com"><br>
    <select name="tier">
      <option value="standard" selected>Standard</option>
      <option value="premium">Premium</option>
    </select><br>
    <label><input type="checkbox" name="newsletter" value="yes" checked> Subscribe</label><br><br>
    <button type="submit">Serialize Data</button>
  </form>

  <pre id="outputJSON" style="background:#f1f5f9; padding:12px; margin-top:10px;"></pre>

  <script>
    $('#orderForm').on('submit', function(e) {
      e.preventDefault();
      
      // 1. URL encoded string
      const str = $(this).serialize();
      
      // 2. Structured JSON Object
      const formData = {};
      $.each($(this).serializeArray(), function(_, item) {
        formData[item.name] = item.value;
      });

      $('#outputJSON').text(
        `URL Encoded:\n${str}\n\nJSON Object:\n${JSON.stringify(formData, null, 2)}`
      );
    });
  </script>
</body>
</html>
```

### 6. Output
```
URL Encoded:
customer=Alice+Smith&email=alice%40example.com&tier=standard&newsletter=yes

JSON Object:
{
  "customer": "Alice Smith",
  "email": "alice@example.com",
  "tier": "standard",
  "newsletter": "yes"
}
```

### 7. Practical Use
- Packaging user form inputs for AJAX POST requests to RESTful API endpoints.
- Generating URL search parameters for filter and bookmarkable query states.

### 8. Common Mistakes
- **Missing `name` attribute on inputs**: Elements with only `id="email"` and no `name="email"` will be silently omitted by `.serialize()`.
- **Expecting unchecked checkboxes to serialize as `"false"`**: HTML standard omits unchecked checkboxes entirely from serialization.

### 9. Best Practices
- Ensure every submit-worthy input has a valid `name` attribute.
- For modern JSON APIs, convert `serializeArray()` to an object or use `Object.fromEntries(new FormData(this))`.

### 10. Exercises
1. Build a helper function `formToJson($form)` that accurately converts any form into a JSON string, converting multiple inputs with identical names into arrays.
2. Build a search filter form that updates the browser URL query string with `.serialize()` on submit without refreshing the page.

### 11. Interview Questions & Answers
**Q: Why are some form elements ignored by `.serialize()`?**  
**A:** `.serialize()` follows the W3C specification for "successful controls". Elements are omitted if they:
1. Do not possess a `name` attribute.
2. Are marked with `disabled`.
3. Are checkboxes or radio buttons that are not `:checked`.
4. Are buttons (`<button>`, `<input type="submit">`).
5. Are file upload inputs (`<input type="file">`, which require `FormData`).

### 12. Mini Project: Interactive REST Payload Inspector
```html
<div style="font-family:sans-serif; max-width:400px; padding:1rem; border:1px solid #ccc; border-radius:6px;">
  <h3>User Registration</h3>
  <form id="regForm">
    <input type="text" name="fullName" placeholder="Full Name" style="width:100%; padding:6px; margin-bottom:8px;" required>
    <input type="email" name="userEmail" placeholder="Email Address" style="width:100%; padding:6px; margin-bottom:8px;" required>
    <label><input type="checkbox" name="terms" value="accepted"> I accept the terms</label><br><br>
    <button type="submit" style="padding:8px 16px;">Generate Payload</button>
  </form>
  <pre id="payloadPreview" style="background:#0f172a; color:#38bdf8; padding:10px; border-radius:4px; font-size:12px; margin-top:12px; display:none;"></pre>
</div>

<script>
  $('#regForm').on('submit', function(e) {
    e.preventDefault();
    const payload = {};
    $.each($(this).serializeArray(), function(_, item) {
      payload[item.name] = item.value;
    });

    $('#payloadPreview')
      .text(JSON.stringify(payload, null, 2))
      .slideDown(200);
  });
</script>
```

---

## Chapter 37: Form Validation

### 1. Objective
Build robust, accessible client-side form validation combining HTML5 validation APIs with jQuery 4.0 event listeners and custom visual feedback.

### 2. Explanation
Client-side validation provides immediate user feedback before network submission. In modern web standards and jQuery 4.0:
- Use the HTML5 Constraint Validation API (`input.checkValidity()`, `input.validity`) combined with jQuery's DOM traversal to toggle error classes.
- Prevent native browser validation popups by setting the `novalidate` attribute on the `<form>`, replacing them with customized, accessible error messages.
- Validate on `blur` (after initial interaction) or `input` (after first error) to prevent frustrating users before they finish typing.

### 3. Syntax
```javascript
// Validate individual input using native HTML5 API
const isValid = inputElement.checkValidity();

// Access specific validity flags
const isTooShort = inputElement.validity.tooShort;
const isEmailMismatch = inputElement.validity.typeMismatch;
const isMissing = inputElement.validity.valueMissing;
```

### 4. Parameters
- `checkValidity()` *(Boolean)*: Returns `true` if input satisfies all constraints (`required`, `minlength`, `type`, `pattern`).

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 37: Modern Validation</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    .form-group { margin-bottom: 12px; }
    .input-field { width: 100%; padding: 8px; box-sizing: border-box; border: 1px solid #94a3b8; border-radius: 4px; }
    .input-field.error { border-color: #ef4444; background: #fef2f2; }
    .error-text { color: #ef4444; font-size: 12px; display: none; margin-top: 4px; }
  </style>
</head>
<body>
  <form id="signupForm" novalidate style="max-width:320px;">
    <div class="form-group">
      <label>Email Address:</label>
      <input type="email" id="email" class="input-field" required>
      <div class="error-text">Please provide a valid email address.</div>
    </div>

    <div class="form-group">
      <label>Password (Min 8 chars):</label>
      <input type="password" id="password" class="input-field" required minlength="8">
      <div class="error-text">Password must be at least 8 characters.</div>
    </div>

    <button type="submit" style="padding:8px 16px;">Sign Up</button>
  </form>

  <script>
    function validateField($field) {
      const el = $field[0];
      const valid = el.checkValidity();
      $field.toggleClass('error', !valid);
      $field.siblings('.error-text').toggle(!valid);
      return valid;
    }

    // Validate on blur
    $('.input-field').on('blur', function() {
      validateField($(this));
    });

    // Clear error on correction
    $('.input-field').on('input', function() {
      if ($(this).hasClass('error')) {
        validateField($(this));
      }
    });

    // Validate all on submit
    $('#signupForm').on('submit', function(e) {
      e.preventDefault();
      let formIsValid = true;
      $('.input-field').each(function() {
        if (!validateField($(this))) formIsValid = false;
      });

      if (formIsValid) {
        alert('Form is valid! Ready for submission.');
      }
    });
  </script>
</body>
</html>
```

### 6. Output
- Leaving fields empty or entering an invalid email triggers customized red borders and error messages.
- Once corrected, errors disappear immediately on keystroke.

### 7. Practical Use
- Registration workflows, checkout payment forms, and dynamic data entry portals.

### 8. Common Mistakes
- **Validating solely on the client**: Client-side validation is purely for user experience; attackers can bypass it with `curl` or browser DevTools. **Always validate data on the backend server as well.**
- **Aggressive instant validation**: Displaying errors before the user has even finished typing their first character frustrates users. Always wait until `blur` or first submit attempt.

### 9. Best Practices
- Add `novalidate` to `<form>` when using custom error UI.
- Use `aria-invalid="true"` and `aria-describedby` attributes for assistive technology screen reader accessibility.

### 10. Exercises
1. Add a "Confirm Password" field to the example that ensures both password inputs match identically.
2. Build a regex validator for postal/ZIP codes with a custom error message.

### 11. Interview Questions & Answers
**Q: Why should client-side form validation use `novalidate` on the `<form>` tag when building custom validation UI?**  
**A:** Browsers natively attempt to display their own localized tooltip bubbles when constraint validation fails. These native bubbles cannot be styled consistently across browsers and clash with custom design systems. Adding `novalidate` suppresses native bubbles while keeping the JavaScript `checkValidity()` API fully active.

### 12. Mini Project: Interactive Multi-Criteria Form Validator
```html
<form id="contactForm" novalidate style="max-width:320px; font-family:sans-serif;">
  <div style="margin-bottom:10px;">
    <label>Full Name:</label>
    <input type="text" name="name" required minlength="3" style="width:100%; padding:6px; box-sizing:border-box;">
    <small class="err" style="color:#dc2626; display:none;">Name must have at least 3 characters.</small>
  </div>
  <div style="margin-bottom:10px;">
    <label>Age (18 - 99):</label>
    <input type="number" name="age" required min="18" max="99" style="width:100%; padding:6px; box-sizing:border-box;">
    <small class="err" style="color:#dc2626; display:none;">Must be between 18 and 99.</small>
  </div>
  <button type="submit" style="padding:8px 16px;">Submit Application</button>
</form>

<script>
  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    let valid = true;
    $(this).find('input').each(function() {
      const ok = this.checkValidity();
      $(this).next('.err').toggle(!ok);
      if (!ok) valid = false;
    });
    if (valid) alert('Application successfully submitted!');
  });
</script>
```

---

## Chapter 38: Dynamic Forms

### 1. Objective
Add, remove, clone, and manage dynamic form inputs, repeatable rows, and nested fieldsets using HTML templates and delegated event handling.

### 2. Explanation
Many enterprise workflows require users to submit variable lists of items (e.g. invoice line items, work experience history, multiple phone numbers).

Building dynamic forms requires three key patterns:
1. **HTML `<template>` elements**: Store inert HTML blueprint structures that are cloned via jQuery without polluting the live DOM.
2. **Event Delegation**: Handling actions (such as "Remove Row" or "Recalculate") on dynamically inserted elements via a static parent container.
3. **Index Normalization**: Re-indexing input names (e.g. `items[0].qty`, `items[1].qty`) before submission to ensure backend frameworks parse nested arrays properly.

### 3. Syntax
```javascript
// Cloning a template
const $newRow = $($('#rowTemplate').html());

// Appending into container
$('#tableBody').append($newRow);

// Delegated removal
$('#tableBody').on('click', '.btn-remove', function() {
  $(this).closest('tr').remove();
});
```

### 4. Parameters
- `templateSelector` *(String)*: ID of the `<template>` or `<script type="text/template">` element containing row HTML.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 38: Dynamic Form Rows</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <h3>Invoice Line Items</h3>
  <table id="invoiceTable" border="1" cellpadding="6" style="border-collapse:collapse; width:100%; max-width:500px;">
    <thead>
      <tr>
        <th>Description</th>
        <th>Price ($)</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody id="lineItemsContainer">
      <tr>
        <td><input type="text" name="desc[]" value="Web Design" style="width:90%;"></td>
        <td><input type="number" name="price[]" class="price-input" value="1200" style="width:80px;"></td>
        <td><button type="button" class="btn-del-row">✕</button></td>
      </tr>
    </tbody>
  </table>
  <br>
  <button type="button" id="btnAddRow">+ Add Line Item</button>
  <p><strong>Grand Total: $<span id="grandTotal">1200</span></strong></p>

  <!-- Reusable inert template -->
  <template id="rowTemplate">
    <tr>
      <td><input type="text" name="desc[]" placeholder="Item description" style="width:90%;"></td>
      <td><input type="number" name="price[]" class="price-input" value="0" style="width:80px;"></td>
      <td><button type="button" class="btn-del-row">✕</button></td>
    </tr>
  </template>

  <script>
    function updateGrandTotal() {
      let total = 0;
      $('.price-input').each(function() {
        total += parseFloat($(this).val()) || 0;
      });
      $('#grandTotal').text(total.toFixed(2));
    }

    // Add new row from template
    $('#btnAddRow').on('click', function() {
      const templateHtml = $('#rowTemplate').html();
      $('#lineItemsContainer').append(templateHtml);
      updateGrandTotal();
    });

    // Delegated row removal
    $('#lineItemsContainer').on('click', '.btn-del-row', function() {
      if ($('#lineItemsContainer tr').length > 1) {
        $(this).closest('tr').remove();
        updateGrandTotal();
      } else {
        alert('Invoice must have at least one line item.');
      }
    });

    // Delegated price input change
    $('#lineItemsContainer').on('input', '.price-input', updateGrandTotal);
  </script>
</body>
</html>
```

### 6. Output
- Clicking "+ Add Line Item" inserts a fresh line item row.
- Adjusting any price immediately updates the Grand Total live.
- Clicking "✕" removes that row and recalculates totals, preserving at least one row.

### 7. Practical Use
- Invoice creators, multi-attendee event ticket registrations, questionnaire builders, recipe ingredient lists.

### 8. Common Mistakes
- **Hardcoding event handlers when inserting new rows**: Attaching `.click(fn)` inside the "Add Row" button creates duplicate listeners or fails on new items. Always use delegated listeners on the static container (`#lineItemsContainer`).
- **Duplicate ID attributes**: Cloning HTML snippets containing `id="foo"` creates duplicate IDs on the page, violating HTML standards. Use class names for dynamic repeating rows.

### 9. Best Practices
- Use `<template>` tags rather than hiding a dummy HTML row with CSS `display: none`.
- Never put static `id` attributes inside dynamic rows; use classes instead.

### 10. Exercises
1. Modify the line item builder to include a "Quantity" column, calculating `lineTotal = price * quantity` for each row.
2. Build an "Add Phone Number" feature that allows users to add up to 3 numbers with labels ("Mobile", "Work", "Home") and prevents adding more than 3.

### 11. Interview Questions & Answers
**Q: Why are HTML5 `<template>` tags preferred over cloning hidden DOM elements for dynamic form rows?**  
**A:** Content inside an HTML5 `<template>` tag is parsed by the browser but **not rendered**, does not trigger image or resource downloads, does not execute embedded scripts, and is completely inert until cloned. Hidden DOM elements (`display: none`) still consume layout resources and trigger image pre-fetching.

### 12. Mini Project: Dynamic Survey Question Builder
```html
<div style="font-family:sans-serif; max-width:450px;">
  <h3>Survey Questions</h3>
  <div id="questionsList"></div>
  <button id="btnAddQuestion" style="margin-top:10px; padding:6px 12px; cursor:pointer;">+ Add Question</button>
</div>

<template id="questionTemplate">
  <div class="q-card" style="background:#f8fafc; border:1px solid #cbd5e1; padding:12px; margin-top:8px; border-radius:6px; position:relative;">
    <button class="btn-remove-q" style="position:absolute; top:8px; right:8px; border:none; background:#fee2e2; color:#dc2626; cursor:pointer;">✕</button>
    <label style="font-weight:bold;">Question <span class="q-number"></span>:</label>
    <input type="text" class="q-title" placeholder="Enter question prompt..." style="width:100%; padding:6px; box-sizing:border-box; margin:6px 0;">
  </div>
</template>

<script>
  function renumberQuestions() {
    $('#questionsList .q-card').each(function(index) {
      $(this).find('.q-number').text(index + 1);
    });
  }

  $('#btnAddQuestion').on('click', function() {
    const html = $('#questionTemplate').html();
    $('#questionsList').append(html);
    renumberQuestions();
  });

  $('#questionsList').on('click', '.btn-remove-q', function() {
    $(this).closest('.q-card').remove();
    renumberQuestions();
  });

  // Initialize with one question
  $('#btnAddQuestion').trigger('click');
</script>
```
