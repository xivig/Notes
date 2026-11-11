# HTML5 Forms, Input Types & Client-Side Validation

A comprehensive guide to constructing accessible, secure web forms, leveraging modern mobile-optimized input types, grouping inputs, and implementing native HTML5 validation.

---

## 1. Anatomy of an Accessible Form

A web form collects user input and transmits it to a server for processing.

```html
<form action="/api/v1/register" method="POST" enctype="application/x-www-form-urlencoded">
  <div class="form-group">
    <label for="user-name">Full Name (required)</label>
    <input type="text" id="user-name" name="fullName" required autocomplete="name">
  </div>

  <div class="form-group">
    <label for="user-email">Email Address (required)</label>
    <input type="email" id="user-email" name="email" required autocomplete="email">
  </div>

  <button type="submit">Create Account</button>
</form>
```

### Form Attributes:
* **`action`:** The endpoint URL where form data is submitted.
* **`method`:**
  * `POST`: For creating/updating data, submitting credentials, or sensitive operations (data sent in request body).
  * `GET`: For search queries and filters (data appended to URL query string, e.g. `?q=searchterm`). Never use GET for passwords or sensitive data!
* **`enctype`:**
  * `application/x-www-form-urlencoded`: Standard default for text fields.
  * `multipart/form-data`: **Mandatory** whenever your form uploads files (`<input type="file">`).

---

## 2. Accessible Labeling Best Practices

Every form input **must** have an associated `<label>`:

### Method A: Explicit Association via `for` and `id` (Recommended)
```html
<label for="user-phone">Phone Number</label>
<input type="tel" id="user-phone" name="phone">
```
* Clicking the label automatically shifts focus to the input.
* Screen readers announce the label text when the input is focused.

### Method B: Implicit Wrapping
```html
<label>
  <input type="checkbox" name="terms" required>
  I agree to the Terms of Service
</label>
```

> [!WARNING]
> **The Placeholder Antipattern:**
> Never use `placeholder="..."` as a replacement for `<label>`. Placeholders vanish once typing starts, causing users to lose track of what information was requested, and have poor visual contrast that fails WCAG requirements.

---

## 3. Specialized Input Types & Mobile Keyboards

HTML5 introduces semantic input types that automatically trigger specialized virtual keyboards on mobile devices (iOS and Android):

```html
<!-- Triggers standard alphanumeric keyboard -->
<input type="text" name="username">

<!-- Triggers email keyboard with '@' and '.com' shortcuts -->
<input type="email" name="email">

<!-- Masks characters for security -->
<input type="password" name="password" autocomplete="current-password">

<!-- Triggers numeric telephone dialpad -->
<input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">

<!-- Numeric input with stepper arrows (disallows non-digits) -->
<input type="number" name="quantity" min="1" max="100" step="1">

<!-- Triggers URL keyboard with '/' and '.com' -->
<input type="url" name="website" placeholder="https://example.com">

<!-- Native operating system date picker -->
<input type="date" name="birthdate">

<!-- Native time picker -->
<input type="time" name="meetingTime">

<!-- Native RGB/HEX color picker widget -->
<input type="color" name="themeColor" value="#7890ff">

<!-- Slider range control -->
<input type="range" name="volume" min="0" max="100" value="75">

<!-- File picker with MIME type restrictions -->
<input type="file" name="avatar" accept="image/png, image/jpeg" multiple>

<!-- Search input with native clear button -->
<input type="search" name="q">

<!-- Hidden input for CSRF tokens or internal state -->
<input type="hidden" name="_csrf" value="d41d8cd98f00b204e9800998ecf8427e">
```

---

## 4. Advanced Form Controls

### 4.1 Grouping Related Fields: `<fieldset>` & `<legend>`
Group logical sections (such as Shipping vs. Billing addresses or sets of radio options):

```html
<fieldset>
  <legend>Shipping Preference</legend>
  
  <label>
    <input type="radio" name="shipping" value="standard" checked>
    Standard (3-5 business days)
  </label>

  <label>
    <input type="radio" name="shipping" value="express">
    Express (1-2 business days)
  </label>
</fieldset>
```

### 4.2 Multi-line Text: `<textarea>`
```html
<label for="feedback">Your Feedback:</label>
<textarea id="feedback" 
          name="userFeedback" 
          rows="5" 
          cols="40" 
          maxlength="500" 
          placeholder="Write your comments here..."></textarea>
```

### 4.3 Dropdown Selects with Groups: `<select>` & `<optgroup>`
```html
<label for="country">Select Server Region:</label>
<select id="country" name="region">
  <optgroup label="North America">
    <option value="us-east">US East (N. Virginia)</option>
    <option value="us-west">US West (Oregon)</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="eu-central">Europe Central (Frankfurt)</option>
    <option value="eu-west">Europe West (London)</option>
  </optgroup>
</select>
```

### 4.4 Autocomplete Suggestions: `<datalist>`
Provides a list of predefined suggestions while still allowing users to enter custom text:

```html
<label for="browser-choice">Preferred Browser:</label>
<input list="browsers" id="browser-choice" name="browser">

<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
  <option value="Brave">
</datalist>
```

### 4.5 Dynamic Calculations: `<output>`
Displays the live result of a script or mathematical calculation:

```html
<form oninput="total.value = parseInt(price.value) * parseInt(quantity.value)">
  <input type="number" id="price" value="25">
  x
  <input type="number" id="quantity" value="3">
  =
  <output name="total" for="price quantity">75</output>
</form>
```

---

## 5. Native HTML5 Client-Side Validation

HTML5 validates user input natively before submission, eliminating boilerplate JavaScript for standard constraints.

### 5.1 Validation Attributes
| Attribute | Meaning | Supported Elements |
|---|---|---|
| `required` | Field cannot be submitted empty | `text`, `email`, `select`, `checkbox`, etc. |
| `minlength` / `maxlength` | Minimum and maximum character length | `text`, `password`, `textarea`, `search` |
| `min` / `max` | Minimum and maximum numerical or date values | `number`, `range`, `date`, `time` |
| `step` | Incremental value granularity | `number`, `range`, `time` |
| `pattern` | Regular expression the value must match | `text`, `tel`, `url`, `email` |

### Example with Regex Validation:
```html
<!-- Validates standard 16-digit credit card number format -->
<label for="card">Card Number (16 digits)</label>
<input type="text" 
       id="card" 
       name="cardNumber" 
       required 
       pattern="[0-9]{16}" 
       title="Please enter exactly 16 digits without spaces or dashes."
       autocomplete="cc-number">
```

### 5.2 CSS Styling with `:valid` and `:invalid`
Browsers automatically apply pseudo-classes based on validation state:

```css
/* Style valid input */
input:valid {
  border-color: #8ce0bd;
}

/* Style invalid input once focused */
input:invalid:focus {
  border-color: #ff7878;
  outline: 2px solid #ff787844;
}
```

---

## 6. Autofill & Security: `autocomplete` Tokens

Modern browsers use the `autocomplete` attribute to automatically fill saved credentials and contact information accurately:

```html
<!-- Username / Identity -->
<input type="text" name="name" autocomplete="name">
<input type="email" name="email" autocomplete="email">

<!-- Password Security -->
<input type="password" name="oldPass" autocomplete="current-password">
<input type="password" name="newPass" autocomplete="new-password">

<!-- SMS Two-Factor Authentication (auto-fills SMS OTP codes!) -->
<input type="text" name="otp" autocomplete="one-time-code" inputmode="numeric">

<!-- Address and Credit Card -->
<input type="text" name="address" autocomplete="street-address">
<input type="text" name="zip" autocomplete="postal-code">
<input type="text" name="ccNumber" autocomplete="cc-number">
```
