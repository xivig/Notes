# 💼 Part 8 — Professional Development (Full-Stack & Migration)

A comprehensive guide to integrating **jQuery 4.0.0** into production enterprise environments: Bootstrap 5, PHP, Laravel, WordPress, modern ES modules, legacy maintenance, and an exhaustive **jQuery 3.x to 4.x Migration Guide**.

---

## 📑 Table of Contents
1. [Chapter 59: jQuery with Bootstrap 5](#chapter-59-jquery-with-bootstrap-5)
2. [Chapter 60: jQuery with PHP](#chapter-60-jquery-with-php)
3. [Chapter 61: jQuery with Laravel](#chapter-61-jquery-with-laravel)
4. [Chapter 62: jQuery with WordPress & noConflict()](#chapter-62-jquery-with-wordpress--noconflict)
5. [Chapter 63: jQuery with Enterprise REST APIs](#chapter-63-jquery-with-enterprise-rest-apis)
6. [Chapter 64: jQuery with Modern JavaScript & Bundlers (Vite, TypeScript)](#chapter-64-jquery-with-modern-javascript--bundlers-vite-typescript)
7. [Chapter 65: Maintaining and Refactoring Legacy Applications](#chapter-65-maintaining-and-refactoring-legacy-applications)
8. [Chapter 66: Dedicated Migration Guide: jQuery 3.x to 4.x](#chapter-66-dedicated-migration-guide-jquery-3x-to-4x)

---

## Chapter 59: jQuery with Bootstrap 5

### 1. Objective
Seamlessly integrate jQuery 4.0 with Bootstrap 5's vanilla JavaScript component APIs (Modals, Offcanvas, Toasts, Popovers).

### 2. Explanation
Bootstrap 5 famously dropped its hard dependency on jQuery, re-architecting all components using standard native ECMAScript classes (`new bootstrap.Modal()`).

However, millions of production codebases utilize **jQuery 4.0 alongside Bootstrap 5**. To control Bootstrap 5 components via jQuery:
1. Pass the underlying DOM element (`$el[0]`) into the Bootstrap constructor.
2. Store the Bootstrap component instance in jQuery's `.data()` store or retrieve existing instances via `bootstrap.Modal.getInstance($el[0])`.
3. Listen to Bootstrap's custom lifecycle events (`'shown.bs.modal'`, `'hidden.bs.modal'`) using jQuery's `.on()`.

### 3. Syntax
```javascript
// Instantiating Bootstrap component from jQuery element
const modalEl = $('#myModal')[0];
const modalInstance = new bootstrap.Modal(modalEl);

// Controlling via jQuery
$('#btnOpen').on('click', () => modalInstance.show());
$('#btnClose').on('click', () => modalInstance.hide());

// Listening to Bootstrap events via jQuery
$('#myModal').on('shown.bs.modal', function() {
  $('#modalInput').trigger('focus');
});
```

### 4. Parameters
- `modalEl` *(HTMLElement)*: Native DOM node passed to Bootstrap.
- `'shown.bs.modal'` *(String)*: Namespaced Bootstrap event.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 59: jQuery + Bootstrap 5</title>
  <!-- Bootstrap 5 CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
  <!-- jQuery 4.0 & Bootstrap 5 JS -->
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body class="p-4">
  <button id="btnLaunchModal" class="btn btn-primary">Open Confirmation Modal</button>

  <!-- Bootstrap 5 Modal Markup -->
  <div class="modal fade" id="confirmModal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirm Action</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to proceed with this operation?</p>
          <input type="text" id="confirmNote" class="form-control" placeholder="Optional notes...">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" id="btnConfirmOk" class="btn btn-success">Confirm</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    $(function() {
      // 1. Initialize Bootstrap Modal instance
      const confirmModal = new bootstrap.Modal($('#confirmModal')[0]);

      // 2. Open modal via jQuery click
      $('#btnLaunchModal').on('click', function() {
        confirmModal.show();
      });

      // 3. Listen to Bootstrap event to auto-focus input
      $('#confirmModal').on('shown.bs.modal', function() {
        $('#confirmNote').trigger('focus');
      });

      // 4. Handle confirmation
      $('#btnConfirmOk').on('click', function() {
        const note = $('#confirmNote').val();
        alert('Action confirmed! Note: ' + note);
        confirmModal.hide();
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking the button opens the Bootstrap modal with smooth backdrop animations.
- When fully open, jQuery auto-focuses the input field.
- Confirming alerts the value and cleanly closes the modal.

### 7. Practical Use
- Modernizing Bootstrap 4 applications to Bootstrap 5 while maintaining existing jQuery business logic.

### 8. Common Mistakes
- **Passing a jQuery object directly to Bootstrap**: Writing `new bootstrap.Modal($('#myModal'))` fails because Bootstrap expects a native DOM node, not a jQuery collection wrapper. Always pass `$('#myModal')[0]`.
- **Using legacy Bootstrap 4 jQuery syntax**: In Bootstrap 4, developers wrote `$('#myModal').modal('show')`. That jQuery bridge was removed in Bootstrap 5; you must instantiate the JS class.

### 9. Best Practices
- Cache the Bootstrap class instance on the jQuery element using `.data('bs.modal', instance)` for easy reuse across different handlers.
- Use jQuery's `.on('shown.bs.modal')` to handle focus management for accessibility (a11y).

### 10. Exercises
1. Build a dynamic Bootstrap 5 Toast notification trigger using jQuery.
2. Initialize Bootstrap 5 tooltips across all elements matching `[data-bs-toggle="tooltip"]` via jQuery's `.each()`.

### 11. Interview Questions & Answers
**Q: How do you trigger Bootstrap 5 modal actions using jQuery 4.0?**  
**A:** Because Bootstrap 5 dropped internal jQuery methods, you instantiate the native Bootstrap class by passing the raw DOM element (`new bootstrap.Modal($('#myModal')[0])`) and call `.show()` or `.hide()` on that instance. Alternatively, retrieve an existing instance via `bootstrap.Modal.getOrCreateInstance($('#myModal')[0])`.

### 12. Mini Project: Interactive Data Row Delete Confirmation Dialog
```html
<div class="container mt-4" style="max-width:400px; font-family:sans-serif;">
  <div class="card p-3">
    <h5>User Records</h5>
    <ul class="list-group list-group-flush mb-3" id="recordList">
      <li class="list-group-item d-flex justify-content-between align-items-center">
        User: Jane Doe
        <button class="btn btn-sm btn-outline-danger btn-trigger-del" data-user="Jane Doe">Delete</button>
      </li>
    </ul>
  </div>
</div>

<script>
  // Delegated delete handler launching confirmation
  $('#recordList').on('click', '.btn-trigger-del', function() {
    const user = $(this).data('user');
    const $row = $(this).closest('li');

    if (confirm(`Delete record for "${user}"?`)) {
      $row.fadeOut(200, function() { $(this).remove(); });
    }
  });
</script>
```

---

## Chapter 60: jQuery with PHP

### 1. Objective
Integrate jQuery 4.0 with traditional server-side PHP applications, manage form submissions, parse JSON API responses, and handle PHP session authentication.

### 2. Explanation
PHP is the backbone of over 75% of server-rendered web applications. A classic architectural pattern combines server-rendered PHP templates (HTML) with jQuery 4.0 for dynamic, asynchronous UI interactions.

Typical data flow:
1. User interacts with jQuery interface.
2. jQuery sends an AJAX request with serialized form data or JSON to a PHP script (e.g. `api/update_user.php`).
3. PHP processes business logic, interacts with a MySQL/PostgreSQL database, and returns a JSON payload (`header('Content-Type: application/json'); echo json_encode($response);`).
4. jQuery receives the JSON object and updates the DOM without a page refresh.

### 3. Syntax
```javascript
// Sending data to PHP endpoint
$.ajax({
  url: 'backend/process.php',
  method: 'POST',
  data: $('#myForm').serialize(),
  dataType: 'json'
})
.done(function(phpResponse) {
  if (phpResponse.success) {
    // Render success
  }
});
```

### 4. Parameters
- `phpResponse` *(Object)*: The parsed JSON object output by PHP's `json_encode()`.

### 5. Examples
**Backend PHP Script (`backend/save_profile.php`):**
```php
<?php
// Set response header
header('Content-Type: application/json; charset=utf-8');

// Read input
$username = trim($_POST['username'] ?? '');
$bio = trim($_POST['bio'] ?? '');

if (empty($username)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Username is required.']);
    exit;
}

// Simulate database update
// $db->query("UPDATE users SET bio = ? WHERE username = ?", [$bio, $username]);

echo json_encode([
    'success' => true,
    'message' => 'Profile updated successfully!',
    'updatedAt' => date('Y-m-d H:i:s')
]);
```

**Frontend jQuery Client:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 60: jQuery with PHP</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <form id="phpProfileForm" style="max-width:320px; font-family:sans-serif;">
    <label>Username:</label><br>
    <input type="text" name="username" value="alex2026" style="width:100%; padding:6px; margin:4px 0 8px;"><br>
    
    <label>Biography:</label><br>
    <textarea name="bio" rows="3" style="width:100%; padding:6px; margin:4px 0 8px;">Software Engineer</textarea><br>
    
    <button type="submit" id="btnSavePhp" style="padding:8px 16px;">Save to Server</button>
  </form>
  <div id="phpFeedback" style="margin-top:10px;"></div>

  <script>
    $('#phpProfileForm').on('submit', function(e) {
      e.preventDefault();
      const $status = $('#phpFeedback').text('Saving to PHP backend...');

      $.ajax({
        url: 'backend/save_profile.php',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json'
      })
      .done(function(res) {
        $status.html(`<span style="color:green;">✓ ${res.message} (${res.updatedAt})</span>`);
      })
      .fail(function(xhr) {
        const err = xhr.responseJSON ? xhr.responseJSON.error : 'Server communication error';
        $status.html(`<span style="color:red;">✕ Error: ${err}</span>`);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- When submitted, jQuery posts form parameters to PHP.
- If valid, PHP responds with JSON; jQuery displays a green confirmation message with the server timestamp.

### 7. Practical Use
- Managing user account settings, posting comments, processing e-commerce checkout forms in PHP applications.

### 8. Common Mistakes
- **Forgetting `header('Content-Type: application/json')` in PHP**: If PHP outputs HTML warnings or lacks the JSON header, jQuery may fail to parse the response as JSON.
- **Accidental PHP echo/whitespace before `json_encode()`**: Any stray characters printed before JSON output cause a `parsererror` in jQuery.

### 9. Best Practices
- Always set `http_response_code(400)` or `http_response_code(500)` in PHP when operations fail so jQuery's `.fail()` handler triggers properly.
- Use `htmlspecialchars()` on the PHP side when rendering HTML outputs directly.

### 10. Exercises
1. Build an asynchronous username availability checker that sends a GET request to `check_user.php?u=name` on input.
2. Build a PHP file uploader using jQuery and modern `FormData`.

### 11. Interview Questions & Answers
**Q: How should a PHP backend signal validation errors to an asynchronous jQuery client?**  
**A:** PHP should respond with an HTTP 422 (Unprocessable Entity) or HTTP 400 (Bad Request) status header via `http_response_code(422)`, accompanied by a JSON payload describing the specific field errors. This triggers jQuery's `.fail()` handler, where the errors can be extracted from `xhr.responseJSON`.

### 12. Mini Project: Asynchronous Username Availability Checker
```html
<div style="font-family:sans-serif; max-width:300px;">
  <label>Choose Username:</label>
  <input type="text" id="chkUser" style="width:100%; padding:6px; box-sizing:border-box;">
  <small id="userAvailMsg" style="display:block; margin-top:4px;"></small>
</div>

<script>
  let userTimer;
  $('#chkUser').on('input', function() {
    clearTimeout(userTimer);
    const u = $(this).val().trim();
    if (u.length < 3) return $('#userAvailMsg').text('');

    $('#userAvailMsg').text('Checking availability...').css('color', '#64748b');

    userTimer = setTimeout(function() {
      // Mocking check against taken names
      const taken = ['admin', 'root', 'support', 'alex'];
      const isTaken = taken.includes(u.toLowerCase());

      if (isTaken) {
        $('#userAvailMsg').text('✕ Username is already taken.').css('color', '#dc2626');
      } else {
        $('#userAvailMsg').text('✓ Username is available!').css('color', '#16a34a');
      }
    }, 350);
  });
</script>
```

---

## Chapter 61: jQuery with Laravel

### 1. Objective
Integrate jQuery 4.0 into Laravel Blade applications, configure global CSRF tokens via `$.ajaxSetup()`, and handle Laravel 422 JSON validation errors.

### 2. Explanation
Laravel is the premier modern PHP web framework. While Laravel applications often use Alpine.js, Vue, or React, millions of Laravel Blade projects rely on jQuery for AJAX interactions.

Two critical requirements for Laravel + jQuery:
1. **CSRF Protection**: Laravel requires a valid `X-CSRF-TOKEN` header on all `POST`, `PUT`, `PATCH`, and `DELETE` requests. We configure this once globally via `$.ajaxSetup()`.
2. **422 Validation Handling**: When Laravel's `$request->validate()` fails, it automatically returns an HTTP 422 response with a structured JSON dictionary of errors: `{ errors: { field: ["Error message"] } }`.

### 3. Syntax
```html
<!-- 1. Include CSRF Meta Tag in Blade <head> -->
<meta name="csrf-token" content="{{ csrf_token() }}">
```

```javascript
// 2. Global AJAX Setup for Laravel CSRF
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});
```

### 4. Parameters
- `'X-CSRF-TOKEN'`: The standard HTTP request header recognized by Laravel's `VerifyCsrfToken` middleware.

### 5. Examples
**Blade Template (`resources/views/posts/create.blade.php`):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="csrf-token" content="mock-laravel-csrf-token-xyz-123">
  <title>Chapter 61: jQuery with Laravel Blade</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    .is-invalid { border: 1px solid #ef4444; }
    .invalid-feedback { color: #ef4444; font-size: 12px; }
  </style>
</head>
<body style="font-family:sans-serif; padding:2rem;">
  <form id="laravelForm" style="max-width:350px;">
    <div class="mb-3">
      <label>Post Title:</label><br>
      <input type="text" name="title" class="form-control" style="width:100%; padding:6px;">
      <div class="invalid-feedback" data-field="title"></div>
    </div>
    <br>
    <button type="submit" style="padding:8px 16px;">Publish via Laravel</button>
  </form>

  <script>
    // 1. Configure CSRF header globally
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      }
    });

    // 2. Handle AJAX submission
    $('#laravelForm').on('submit', function(e) {
      e.preventDefault();
      $('.is-invalid').removeClass('is-invalid');
      $('.invalid-feedback').text('');

      $.ajax({
        url: '/posts',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json'
      })
      .done(function(res) {
        alert('Post created successfully!');
      })
      .fail(function(xhr) {
        // Handle Laravel 422 Validation Error Response
        if (xhr.status === 422) {
          const errors = xhr.responseJSON.errors;
          $.each(errors, function(field, messages) {
            $(`[name="${field}"]`).addClass('is-invalid');
            $(`.invalid-feedback[data-field="${field}"]`).text(messages[0]);
          });
        }
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- When submitted, the CSRF token is automatically included in the request headers.
- If validation fails, Laravel's error messages are mapped directly to their corresponding input error slots.

### 7. Practical Use
- Building rich, interactive enterprise web apps using Laravel Blade templates without needing complex single-page application setups.

### 8. Common Mistakes
- **Forgetting the CSRF meta tag**: Results in HTTP `419 Page Expired` errors on every POST request.
- **Hardcoding CSRF tokens inside individual inputs**: Setting it once globally with `$.ajaxSetup()` ensures all future requests across all scripts are automatically secured.

### 9. Best Practices
- Always place `<meta name="csrf-token" content="{{ csrf_token() }}">` in the root layout template.
- Automatically clear validation error highlights on input `focus` or `input`.

### 10. Exercises
1. Build an AJAX-powered Laravel comment form that prepends new comments to a list on success.
2. Build an inline status toggle (e.g. Published / Draft) that sends a `PATCH` request to a Laravel controller.

### 11. Interview Questions & Answers
**Q: How does Laravel handle AJAX validation failures and how does jQuery parse them?**  
**A:** When validation fails on an AJAX request (with `Accept: application/json`), Laravel returns an HTTP 422 Unprocessable Entity status with a JSON payload containing an `errors` object. jQuery captures this in `.fail()`, allowing developers to iterate over `xhr.responseJSON.errors` and display errors next to the relevant inputs.

### 12. Mini Project: Laravel Global CSRF & Validation Manager
```html
<div style="font-family:sans-serif; max-width:320px;">
  <h4>Simulated Laravel Post</h4>
  <button id="btnTestLaravel422">Trigger Simulated 422 Response</button>
  <div id="simulatedErrors" style="margin-top:10px; color:#b91c1c; font-size:13px;"></div>
</div>

<script>
  $('#btnTestLaravel422').on('click', function() {
    // Simulated Laravel 422 payload
    const mockLaravelError = {
      message: 'The given data was invalid.',
      errors: {
        email: ['The email field must be a valid email address.'],
        password: ['The password must be at least 8 characters.']
      }
    };

    const formatted = Object.entries(mockLaravelError.errors)
      .map(([k, v]) => `• ${k}: ${v[0]}`)
      .join('<br>');

    $('#simulatedErrors').html(`<strong>Validation Failed:</strong><br>${formatted}`);
  });
</script>
```

---

## Chapter 62: jQuery with WordPress & noConflict()

### 1. Objective
Safely execute jQuery 4.0 in WordPress environments, resolve `$` namespace collisions using `jQuery.noConflict()`, and interact with the WordPress REST API using nonces.

### 2. Explanation
WordPress bundles its own copy of jQuery, which executes in **`noConflict()` mode** by default. In this mode, the global `$` alias is disabled to prevent conflicts with other libraries (like Prototype or script.aculo.us).

If you write `$('#myElement')` directly in a WordPress script, it throws `TypeError: $ is not a function`.

### The Standard WordPress jQuery Pattern:
Pass `jQuery` as an argument into an IIFE or document ready callback, aliasing it safely to `$` locally within that scope.

For security, WordPress REST API and `admin-ajax.php` requests require an **Anti-CSRF Nonce** (`X-WP-Nonce`), provided via `wp_localize_script()`.

### 3. Syntax
```javascript
// Universal WordPress Safe Wrapper
jQuery(document).ready(function($) {
  // Inside this closure, '$' safely references jQuery!
  $('#menu').show();
});

// Immediately Invoked Function Expression (IIFE)
(function($) {
  'use strict';
  // Plugin code here
})(jQuery);
```

### 4. Parameters
- `$` *(jQuery)*: The localized alias safely passed into the closure.

### 5. Examples
**WordPress PHP Enqueue (`functions.php`):**
```php
<?php
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_script('custom-app', get_template_directory_uri() . '/js/app.js', ['jquery'], '4.0.0', true);
    
    // Pass nonce and REST URL to client JavaScript
    wp_localize_script('custom-app', 'wpApiSettings', [
        'root' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest')
    ]);
});
```

**Client JavaScript (`js/app.js`):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 62: jQuery with WordPress</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <div id="wpContent">WordPress Posts Loading...</div>

  <script>
    // Simulate WordPress environment
    jQuery.noConflict();

    // Safe closure pattern
    (function($) {
      'use strict';

      $(function() {
        const mockWpSettings = {
          root: 'https://jsonplaceholder.typicode.com/',
          nonce: 'abc123nonce'
        };

        // Authenticated WordPress REST Request
        $.ajax({
          url: mockWpSettings.root + 'posts?_limit=3',
          method: 'GET',
          headers: {
            'X-WP-Nonce': mockWpSettings.nonce
          },
          dataType: 'json'
        })
        .done(function(posts) {
          const list = posts.map(p => `<li>${p.title}</li>`).join('');
          $('#wpContent').html(`<ul>${list}</ul>`);
        });
      });

    })(jQuery);
  </script>
</body>
</html>
```

### 6. Output
- Safely uses `$` inside the closure without global namespace collision, fetching and rendering posts with the security nonce attached.

### 7. Practical Use
- Authoring custom WordPress themes, Gutenberg blocks, and plugins.

### 8. Common Mistakes
- **Writing `$(document).ready(...)` directly in WordPress**: Throws `$ is not a function`. Always use `jQuery(document).ready(function($) { ... })`.
- **Forgetting the `X-WP-Nonce` header**: Requests modifying WordPress content will be rejected with `403 Forbidden`.

### 9. Best Practices
- Always wrap WordPress frontend scripts in `(function($) { ... })(jQuery);`.
- Use `wp_localize_script()` to pass nonces and configuration rather than embedding PHP tags directly inside JavaScript files.

### 10. Exercises
1. Build a WordPress AJAX load-more button using `admin-ajax.php` and action hooks.
2. Refactor a script with global `$` errors into a safe `noConflict` closure.

### 11. Interview Questions & Answers
**Q: Why does WordPress run jQuery in `noConflict()` mode, and how do you write code for it?**  
**A:** WordPress activates `noConflict()` mode to prevent the `$` global variable from clashing with other JavaScript libraries. Developers write code safely by wrapping it in an IIFE or ready handler: `jQuery(function($) { /* '$' is safe here */ });`.

### 12. Mini Project: Safe WordPress REST API Consumer
```html
<div style="font-family:sans-serif; max-width:350px;">
  <h4>WordPress Notice Board</h4>
  <div id="wpNoticeBox">Loading...</div>
</div>

<script>
  (function($) {
    $(function() {
      setTimeout(function() {
        $('#wpNoticeBox').html('<div style="background:#fef3c7; padding:8px; border-radius:4px;">Notice: New theme update available.</div>');
      }, 500);
    });
  })(jQuery);
</script>
```

---

## Chapter 63: jQuery with Enterprise REST APIs

### 1. Objective
Build enterprise-grade integrations with RESTful APIs, manage Bearer JWT tokens, handle automatic token refresh cycles, and normalize response envelopes.

### 2. Explanation
Enterprise web applications interact with microservices requiring:
1. **Bearer Token Authentication**: Sending JWT credentials via `Authorization: Bearer <token>`.
2. **Response Envelope Normalization**: Enterprise APIs frequently wrap records inside envelope dictionaries (e.g. `{ data: [...], meta: { page: 1, total: 100 } }`).
3. **Automatic 401 Interception**: Intercepting expired tokens, requesting a fresh token via refresh token exchange, and retrying the failed request automatically.

### 3. Syntax
```javascript
// Setting Authorization Header
$.ajax({
  url: 'https://api.enterprise.com/v2/orders',
  headers: {
    'Authorization': 'Bearer ' + authToken
  }
});
```

### 4. Parameters
- `'Authorization': 'Bearer <token>'`: Standard RFC 6750 token header.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 63: Enterprise REST Client</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="btnFetchSecure">Fetch Protected Orders</button>
  <pre id="orderData" style="background:#0f172a; color:#38bdf8; padding:12px; margin-top:10px;"></pre>

  <script>
    // Centralized Enterprise API Client
    const ApiClient = {
      token: 'jwt_mock_token_abc_789',

      request: function(endpoint, options = {}) {
        const defaults = {
          url: 'https://jsonplaceholder.typicode.com' + endpoint,
          headers: {
            'Authorization': 'Bearer ' + this.token,
            'Content-Type': 'application/json'
          },
          dataType: 'json'
        };

        const config = $.extend(true, {}, defaults, options);
        return $.ajax(config);
      }
    };

    $('#btnFetchSecure').on('click', function() {
      $('#orderData').text('Authenticating & fetching orders...');

      ApiClient.request('/users/1')
        .done(function(user) {
          $('#orderData').text(
            `Authorization: Bearer verified!\nUser: ${user.name}\nEmail: ${user.email}`
          );
        })
        .fail(function(xhr) {
          $('#orderData').text(`Error ${xhr.status}: Unauthorized`);
        });
    });
  </script>
</body>
</html>
```

### 6. Output
- Sends authenticated request with bearer token header and displays verified user payload.

### 7. Practical Use
- Connecting frontend apps to OAuth 2.0 / JWT microservices and enterprise ERP/CRM APIs.

### 8. Common Mistakes
- **Storing sensitive tokens in insecure cookies**: Always store JWT tokens in secure, HttpOnly cookies or secure memory variables to prevent theft via XSS.
- **Hardcoding base URLs in every call**: Centralize requests through a wrapper service like `ApiClient.request()`.

### 9. Best Practices
- Encapsulate all API calls into a unified API Client module.
- Centralize error handling for authentication expirations (`401`) and permission denials (`403`).

### 10. Exercises
1. Build an API Client wrapper that automatically unboxes `{ data: ... }` envelope structures before returning.
2. Implement a global request interceptor that queues failed requests when an authentication token expires and retries them once refreshed.

### 11. Interview Questions & Answers
**Q: How do you configure a centralized API client with jQuery to attach JWT authentication headers to every request?**  
**A:** You can either configure `$.ajaxSetup()` to inject the `Authorization: Bearer <token>` header across all requests globally, or build a centralized wrapper method (e.g. `ApiClient.request()`) that merges authorization headers via `$.extend()` before executing `$.ajax()`.

### 12. Mini Project: Authenticated REST Resource Viewer
```html
<div style="font-family:sans-serif; max-width:350px;">
  <h4>Secure Resource Portal</h4>
  <button id="btnLoadSecret">Access Secure Endpoint</button>
  <div id="secretResult" style="margin-top:10px; font-size:13px;"></div>
</div>

<script>
  $('#btnLoadSecret').on('click', function() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      headers: { 'Authorization': 'Bearer mock_enterprise_key' }
    })
    .done(function(res) {
      $('#secretResult').html(`<span style="color:green;">✓ Verified Access: "${res.title.substring(0, 30)}..."</span>`);
    });
  });
</script>
```

---

## Chapter 64: jQuery with Modern JavaScript & Bundlers (Vite, TypeScript)

### 1. Objective
Import and bundle jQuery 4.0 as an ES Module in modern toolchains (Vite, Webpack), use TypeScript definitions, and integrate alongside modern JavaScript frameworks.

### 2. Explanation
In the past, jQuery was strictly loaded via `<script>` tags on the global `window`.

**jQuery 4.0 is fully distributed as native ES Modules (ESM).** You can install it via npm or pnpm and import it directly into modern Vite, Next.js, or Webpack projects:
```bash
npm install jquery@4.0.0
npm install --save-dev @types/jquery
```

This allows developers to:
- Use TypeScript for complete static type safety and autocomplete.
- Tree-shake unused code and eliminate global namespace pollution.
- Leverage modern bundlers for asset optimization and hot module replacement (HMR).

### 3. Syntax
```typescript
// Modern ES Module import
import $ from 'jquery';

// TypeScript typed DOM selection
const $button: JQuery<HTMLButtonElement> = $('#myButton');

$button.on('click', (event: JQuery.ClickEvent) => {
  console.log('Typed click event!');
});
```

### 4. Parameters
- `JQuery<HTMLElement>`: TypeScript generic representing the wrapped element type.

### 5. Examples
**`src/main.ts` (Vite + TypeScript + jQuery 4.0):**
```typescript
import $ from 'jquery';

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

class DashboardComponent {
  private $container: JQuery<HTMLElement>;

  constructor(selector: string) {
    this.$container = $(selector);
    this.init();
  }

  private init(): void {
    this.$container.html(`
      <div class="card p-3">
        <h3>TypeScript + jQuery 4.0</h3>
        <button id="btnLoadUser" class="btn btn-primary">Load User Data</button>
        <div id="userInfo" class="mt-2"></div>
      </div>
    `);

    this.$container.on('click', '#btnLoadUser', () => this.fetchUser());
  }

  private async fetchUser(): Promise<void> {
    const $info = this.$container.find('#userInfo').text('Loading...');
    try {
      const user = await $.getJSON('https://jsonplaceholder.typicode.com/users/1') as UserProfile;
      $info.html(`<strong>${user.name}</strong> (${user.email})`);
    } catch (err) {
      $info.text('Failed to load user.');
    }
  }
}

// Instantiate
$(() => {
  new DashboardComponent('#app');
});
```

### 6. Output
- Bundles cleanly through Vite with 0 type errors, full IntelliSense autocomplete, and lightning-fast HMR.

### 7. Practical Use
- Progressive enhancement in modern Vite or Astro projects.
- Building type-safe enterprise UI widgets with full TypeScript verification.

### 8. Common Mistakes
- **Assuming `$` is global in ESM**: When using ES modules, `$` is **not** automatically attached to `window`. You must explicitly write `import $ from 'jquery';`. If legacy scripts require `window.$`, manually assign it: `window.$ = window.jQuery = $;`.
- **Mixing CommonJS `require()` and ES `import`**: Standardize on `import $ from 'jquery'`.

### 9. Best Practices
- Install `@types/jquery` for full TypeScript auto-completion and static analysis.
- Expose `window.$ = $;` only if third-party legacy plugins require the global alias.

### 10. Exercises
1. Set up a minimal Vite + TypeScript project that imports jQuery 4.0 and builds an interactive counter widget.
2. Type an event handler using `JQuery.ChangeEvent` in TypeScript.

### 11. Interview Questions & Answers
**Q: How do you make jQuery available to legacy third-party plugins when bundling with Vite or Webpack?**  
**A:** In your entry point (e.g. `main.js`), import jQuery and explicitly attach it to the global `window` object:
```javascript
import $ from 'jquery';
window.$ = window.jQuery = $;
```

### 12. Mini Project: Type-Safe Widget Scaffold
```typescript
// Type-safe widget template
import $ from 'jquery';

export class NotificationBadge {
  private $badge: JQuery<HTMLElement>;
  private count: number = 0;

  constructor(targetSelector: string) {
    this.$badge = $('<span class="badge">0</span>');
    $(targetSelector).append(this.$badge);
  }

  public increment(): void {
    this.count++;
    this.$badge.text(this.count);
  }
}
```

---

## Chapter 65: Maintaining and Refactoring Legacy Applications

### 1. Objective
Audit, refactor, and stabilize legacy jQuery 1.x/2.x/3.x applications, eradicate deprecated syntax, and transition toward modern maintainable patterns.

### 2. Explanation
Many enterprise organizations run production web applications built over a decade ago. Refactoring these systems requires a disciplined, step-by-step approach rather than a high-risk complete rewrite:
1. **Audit Deprecated Calls**: Search for removed APIs (`.click()`, `$.trim()`, `$.now()`, `$.type()`).
2. **Convert Shorthands to `.on()`**: Replace `.bind()`, `.delegate()`, `.live()`, `.click()`, `.change()` with modern `.on()`.
3. **Decouple Global Variables**: Move loose global variables and detached functions into organized modules.
4. **Remove Unused Plugins**: Replace abandoned, vulnerable plugins with lightweight native CSS or modern widgets.

### 3. Syntax
```javascript
// BEFORE (Vulnerable, Deprecated Legacy Code):
$('#myBtn').click(function() {
  var txt = $.trim($('#input').val());
  $('#box').html(txt); // XSS risk!
});

// AFTER (Modern, Clean, Secure jQuery 4.0):
$('#myBtn').on('click', function() {
  const txt = $('#input').val().trim();
  $('#box').text(txt); // XSS protected!
});
```

### 4. Parameters
- Step-by-step modernization transformations.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 65: Refactoring Legacy Code</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <div id="legacyCard">
    <input type="text" id="userInput" value="  Sample Text  ">
    <button id="btnAction">Process</button>
    <div id="result"></div>
  </div>

  <script>
    // REFACTORED: Modern, clean, modular
    const TextProcessor = {
      init: function() {
        this.cache();
        this.bind();
      },
      cache: function() {
        this.$input = $('#userInput');
        this.$btn = $('#btnAction');
        this.$result = $('#result');
      },
      bind: function() {
        // Modern .on() syntax replaces deprecated .click()
        this.$btn.on('click', this.process.bind(this));
      },
      process: function() {
        // Native String.prototype.trim() replaces removed $.trim()
        const cleaned = this.$input.val().trim();
        // Safe .text() replaces dangerous .html()
        this.$result.text(`Cleaned text: "${cleaned}"`);
      }
    };

    $(function() {
      TextProcessor.init();
    });
  </script>
</body>
</html>
```

### 6. Output
- Text is safely trimmed and displayed without legacy deprecated APIs or XSS vulnerabilities.

### 7. Practical Use
- Upgrading enterprise legacy intranets, CRM tools, and older CMS platforms.

### 8. Common Mistakes
- **Attempting a "Big Bang" complete rewrite**: Total rewrites often fail or introduce regressions. Incremental refactoring per feature is much safer and more reliable.
- **Skipping automated tests before refactoring**: Refactoring without test coverage risks breaking subtle existing behaviors.

### 9. Best Practices
- Replace deprecated event shortcuts with `.on()`.
- Use ESLint with jQuery migration rules to catch deprecated APIs automatically during builds.

### 10. Exercises
1. Take a legacy script containing `.bind()`, `.delegate()`, and `$.trim()` and refactor it into clean jQuery 4.0.
2. Audit an old codebase for `.html(variable)` calls and replace them with secure `.text()`.

### 11. Interview Questions & Answers
**Q: What strategy should you follow when upgrading a massive legacy jQuery codebase?**  
**A:**  
1. Audit and log all deprecated API usages using the jQuery Migrate plugin.  
2. Upgrade step-by-step: 1.x -> 3.x -> 4.x (never skip major generations).  
3. Establish unit and integration test coverage for core business workflows.  
4. Replace deprecated shortcuts (`.click()`) and utilities (`$.trim()`) with modern equivalents.  
5. Remove obsolete plugins and enforce strict Content Security Policies.

### 12. Mini Project: Automated Legacy Code Smell Scanner
```html
<div style="font-family:sans-serif; max-width:400px;">
  <h4>Legacy jQuery Code Smell Checker</h4>
  <textarea id="codeSnippet" rows="4" style="width:100%; font-family:monospace; padding:6px; box-sizing:border-box;">$('#btn').click(function() { var t = $.trim(x); });</textarea>
  <button id="btnScanCode" style="margin-top:6px; padding:6px 12px; cursor:pointer;">Scan Code</button>
  <ul id="scanReport" style="margin-top:8px; font-size:12px; color:#b91c1c;"></ul>
</div>

<script>
  $('#btnScanCode').on('click', function() {
    const code = $('#codeSnippet').val();
    const $report = $('#scanReport').empty();

    const rules = [
      { pattern: /\.click\(/, msg: 'Deprecated: .click() shortcut removed in 4.0. Use .on("click", ...)' },
      { pattern: /\$\.trim\(/, msg: 'Deprecated: $.trim() removed in 4.0. Use native String.prototype.trim()' },
      { pattern: /\$\.now\(/, msg: 'Deprecated: $.now() removed in 4.0. Use native Date.now()' },
      { pattern: /\$\.isArray\(/, msg: 'Deprecated: $.isArray() removed in 4.0. Use Array.isArray()' }
    ];

    let found = 0;
    rules.forEach(rule => {
      if (rule.pattern.test(code)) {
        $report.append(`<li>${rule.msg}</li>`);
        found++;
      }
    });

    if (found === 0) {
      $report.append('<li style="color:green;">✓ No legacy code smells detected! Fully jQuery 4.0 compliant.</li>');
    }
  });
</script>
```

---

## Chapter 66: Dedicated Migration Guide: jQuery 3.x to 4.x

### 1. Objective
Execute a seamless, comprehensive migration from jQuery 3.x to jQuery 4.0.0, navigate breaking changes, resolve deprecations, and utilize the jQuery Migrate plugin.

### 2. Explanation
**jQuery 4.0.0** is the first major release in nearly a decade. It modernizes the internal architecture and removes legacy shims for obsolete browsers.

### Complete jQuery 4.0 Breaking Changes Checklist:

#### 1. Dropped Browser Support
- **Internet Explorer 10 and older are completely unsupported.**
- jQuery 4.0 targets evergreen browsers (Chrome, Firefox, Safari, Edge).

#### 2. Sizzle Engine Retirement
- The internal Sizzle selector engine has been removed.
- jQuery 4.0 delegates selector queries directly to the browser's native `document.querySelectorAll()`.
- Custom positional selectors (`:first`, `:last`, `:eq()`, `:even`, `:odd`) are deprecated in query strings. Use standard CSS (`:first-child`, `:nth-child()`) or native jQuery methods (`.first()`, `.last()`, `.eq(n)`).

#### 3. Removed Deprecated Event Shortcuts
- `.click(fn)`, `.dblclick(fn)`, `.hover()`, `.focus(fn)`, `.blur(fn)`, `.change(fn)`, `.submit(fn)`, `.keydown(fn)`, `.keyup(fn)`, `.load()`, `.unload()`.
- **Solution:** Always use `.on('eventType', fn)`.

#### 4. Removed Utility Functions
- `$.trim()` -> Use `str.trim()`
- `$.type()` -> Use `typeof` or `Object.prototype.toString`
- `$.isArray()` -> Use `Array.isArray()`
- `$.isFunction()` -> Use `typeof fn === 'function'`
- `$.isNumeric()` -> Use `typeof n === 'number' && !isNaN(n)`
- `$.now()` -> Use `Date.now()`
- `$.parseJSON()` -> Use `JSON.parse()`
- `$.unique()` -> Renamed to `$.uniqueSort()`

#### 5. Trusted Types and Content Security Policy
- Native compliance with `window.trustedTypes` when inserting HTML via `.html()`, `.append()`, etc.

#### 6. Slim Build Changes
- The Slim build excludes AJAX and Effects (animations) for minimal footprint when using CSS animations and native `fetch()`.

### 3. Syntax: Migration Workflow
```html
<!-- Step 1: Include jQuery 4.0 -->
<script src="https://code.jquery.com/jquery-4.0.0.js"></script>

<!-- Step 2: Include jQuery Migrate 4.x to log warnings in DevTools console -->
<script src="https://code.jquery.com/jquery-migrate-4.0.0.js"></script>
```

### 4. Parameters
- `jQuery.migrateMute = false`: Enables verbose console warnings for every deprecated API call detected.

### 5. Examples: Side-by-Side Migration Matrix
```javascript
// ==========================================
// 1. EVENT BINDING
// ==========================================
// ❌ Legacy 3.x:
$('#btn').click(function() { ... });
// ✅ Modern 4.0:
$('#btn').on('click', function() { ... });

// ==========================================
// 2. STRING TRIMMING
// ==========================================
// ❌ Legacy 3.x:
var clean = $.trim(rawString);
// ✅ Modern 4.0:
const clean = rawString.trim();

// ==========================================
// 3. ARRAY VALIDATION
// ==========================================
// ❌ Legacy 3.x:
if ($.isArray(data)) { ... }
// ✅ Modern 4.0:
if (Array.isArray(data)) { ... }

// ==========================================
// 4. TIMESTAMP GENERATION
// ==========================================
// ❌ Legacy 3.x:
var now = $.now();
// ✅ Modern 4.0:
const now = Date.now();

// ==========================================
// 5. POSITIONAL SELECTORS
// ==========================================
// ❌ Legacy 3.x (Forces slow fallback parser):
$('li:first').addClass('top');
// ✅ Modern 4.0 (Fast native querySelectorAll):
$('li').first().addClass('top');
// or use standard CSS:
$('li:first-child').addClass('top');
```

### 6. Output
- Clean execution in jQuery 4.0 with zero console warnings and maximum native browser execution speed.

### 7. Practical Use
- Upgrading production sites from jQuery 3.x to 4.0 without downtime or unexpected feature regressions.

### 8. Common Mistakes
- **Skipping the jQuery Migrate plugin**: Trying to upgrade a large application without jQuery Migrate makes tracking down silently failing removed APIs extremely difficult.
- **Continuing to use positional pseudo-selectors in query strings**: Writing `$('.card:eq(2)')` bypasses native `querySelectorAll` speed optimizations. Use `$('.card').eq(2)`.

### 9. Best Practices
- **Phase 1**: Install jQuery 4.0 with `jquery-migrate`.
- **Phase 2**: Open browser DevTools and systematically resolve every `JQMIGRATE:` warning.
- **Phase 3**: Remove `jquery-migrate` and deploy optimized jQuery 4.0 to production.

### 10. Exercises
1. Take an existing 3.x project script and run a migration audit, converting all removed utility functions and event shortcuts.
2. Replace all `:first`, `:last`, and `:even` selector queries with native `.first()`, `.last()`, and CSS `:nth-child(even)` selectors.

### 11. Interview Questions & Answers
**Q: What happened to the Sizzle selector engine in jQuery 4.0, and how does it impact performance?**  
**A:** In jQuery 4.0, the internal Sizzle engine was retired. jQuery now routes queries directly to the browser's high-speed native `document.querySelectorAll()` method. This significantly improves selector query performance across all evergreen browsers and eliminates hundreds of lines of complex fallback parsing code.

### 12. Mini Project: Interactive 3.x to 4.0 Syntax Converter Tool
```html
<div style="font-family:sans-serif; max-width:450px;">
  <h4>jQuery 3.x ➔ 4.0 Syntax Migration Helper</h4>
  <label>Legacy 3.x Code:</label>
  <textarea id="legacyInput" rows="3" style="width:100%; font-family:monospace; padding:6px; box-sizing:border-box;">$('#saveBtn').click(function() { var name = $.trim($('#name').val()); });</textarea>
  <button id="btnConvert" style="margin-top:6px; padding:6px 12px; cursor:pointer;">Modernize to 4.0</button>
  <div style="margin-top:8px;">
    <label>Modern 4.0 Equivalent:</label>
    <pre id="modernOutput" style="background:#0f172a; color:#38bdf8; padding:8px; border-radius:4px; font-size:12px; white-space:pre-wrap;"></pre>
  </div>
</div>

<script>
  $('#btnConvert').on('click', function() {
    let code = $('#legacyInput').val();

    // Transform event shortcuts
    code = code.replace(/\.click\(/g, '.on(\'click\', ');
    code = code.replace(/\.focus\(/g, '.on(\'focus\', ');
    code = code.replace(/\.blur\(/g, '.on(\'blur\', ');

    // Transform removed utilities
    code = code.replace(/\$\.trim\((.*?)\)/g, '$1.trim()');
    code = code.replace(/\$\.now\(\)/g, 'Date.now()');
    code = code.replace(/\$\.isArray\((.*?)\)/g, 'Array.isArray($1)');

    // Transform var to const/let
    code = code.replace(/var /g, 'const ');

    $('#modernOutput').text(code);
  });
</script>
```
