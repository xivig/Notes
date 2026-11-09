# 📝 Module 09: Forms and Validation

Capture user input, handle real-time keystroke debouncing, manage checkboxes and dropdowns, serialize form payloads, and implement robust client-side validation.

---

### 1. Objective
Extract and update form values using `.val()`, handle real-time input debouncing, manage checkboxes with `.prop('checked')`, serialize form inputs via `.serialize()`, and build accessible validation feedback.

### 2. Explanation
Working with HTML forms in jQuery involves five core capabilities:
1. **Value Access**: `.val()` gets or sets values on `<input>`, `<textarea>`, and `<select>` elements.
2. **Real-Time Input & Debouncing**: The `input` event fires on every keystroke, cut, or paste. Debouncing pauses expensive operations (like search queries) until the user stops typing for a designated delay (e.g. 300ms).
3. **Boolean Properties**: Always use `.prop('checked', bool)` and `.prop('disabled', bool)`. Never use `.attr('checked')`.
4. **Serialization**: `.serialize()` formats form inputs into URL-encoded strings (`'name=John&email=...'`). `.serializeArray()` outputs an array of objects.
5. **Validation**: Use HTML5 constraint validation (`input.checkValidity()`) with jQuery DOM updates to display accessible error states. Add `novalidate` to the `<form>` to suppress browser tooltips.

### 3. Syntax
```javascript
// Reading & setting values
const email = $('#email').val().trim();
$('#email').val('user@example.com');

// Checking boolean state
const isAgreed = $('#terms').prop('checked');
$('#terms').prop('checked', true);

// Form serialization
const queryStr = $('form').serialize();
const arrayData = $('form').serializeArray();
```

### 4. Parameters
- `value` *(String | Number | Array)*: For `.val()`. Passing an array selects matching values in multi-select dropdowns or checkbox groups.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 09: Forms & Validation</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    .is-invalid { border: 1px solid #ef4444; background: #fef2f2; }
    .err-msg { color: #ef4444; font-size: 12px; display: none; margin-top: 2px; }
  </style>
</head>
<body>
  <form id="signupForm" novalidate style="max-width:320px; font-family:sans-serif;">
    <div style="margin-bottom:10px;">
      <label>Email:</label><br>
      <input type="email" name="email" id="userEmail" required style="width:100%; padding:6px; box-sizing:border-box;">
      <div class="err-msg" id="emailErr">Valid email is required.</div>
    </div>
    
    <label><input type="checkbox" name="terms" id="chkTerms" required> I agree to terms</label><br><br>
    
    <button type="submit" style="padding:8px 16px;">Register</button>
  </form>

  <script>
    $(function() {
      // Validate single field
      function validateField($input, $err) {
        const isValid = $input[0].checkValidity();
        $input.toggleClass('is-invalid', !isValid);
        $err.toggle(!isValid);
        return isValid;
      }

      $('#userEmail').on('blur input', function() {
        validateField($(this), $('#emailErr'));
      });

      $('#signupForm').on('submit', function(e) {
        e.preventDefault();
        const validEmail = validateField($('#userEmail'), $('#emailErr'));
        const validTerms = $('#chkTerms').prop('checked');

        if (!validTerms) alert('You must accept the terms.');

        if (validEmail && validTerms) {
          alert('Form valid! Serialized:\n' + $(this).serialize());
        }
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Leaving the email invalid highlights the field in red with an error message on blur or submit.
- When valid, submitting alerts the serialized URL string: `email=user%40example.com&terms=on`.

### 7. Practical Use
- User authentication forms, e-commerce checkout address forms, search filter bars.

### 8. Common Mistakes
- **Using `.attr('checked')` to toggle checkboxes**: `.attr()` reads the initial HTML attribute string and fails to reflect user interactions. Always use `.prop('checked', bool)`.
- **Missing `name` attribute on inputs**: Elements lacking a `name` attribute are completely ignored by `.serialize()`.

### 9. Best Practices
- Add `novalidate` to `<form>` when building custom JavaScript validation UI.
- Use the `input` event (rather than `keyup`) for real-time validation and character counters.

### 10. Exercises
1. Build a "Select All" master checkbox that synchronizes with 4 child checkboxes using `.prop('checked')`.
2. Convert a serialized form array (`$('form').serializeArray()`) into a clean JavaScript JSON object using `$.each()`.

### 11. Interview Questions & Answers
**Q: Why does `.attr('checked')` produce bugs when used to toggle checkboxes?**  
**A:** `.attr('checked')` accesses the static HTML attribute defined in markup. `.prop('checked')` maps directly to the live JavaScript DOM property on the `HTMLInputElement` object. Once a user clicks a checkbox, the property changes while the markup attribute remains unchanged.

### 12. Mini Project: Debounced Real-Time Search Filter
```html
<div style="font-family:sans-serif; max-width:300px;">
  <input type="text" id="filterInput" placeholder="Live filter..." style="width:100%; padding:6px; box-sizing:border-box;">
  <p id="searchFeedback" style="font-size:12px; color:#64748b;">Ready</p>
</div>

<script>
  $(function() {
    let timer = null;
    $('#filterInput').on('input', function() {
      const q = $(this).val().trim();
      $('#searchFeedback').text('Typing detected...');
      
      clearTimeout(timer);
      timer = setTimeout(function() {
        $('#searchFeedback').text(q ? `API Query: "${q}"` : 'Input cleared.');
      }, 350);
    });
  });
</script>
```
