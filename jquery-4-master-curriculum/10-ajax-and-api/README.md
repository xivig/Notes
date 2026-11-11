# 🌐 Module 10: AJAX and API

Connect to RESTful web services using `$.ajax()`, `$.get()`, `$.post()`, handle JSON and XML responses, manage HTTP status codes, display global loading indicators, and integrate `async`/`await`.

---

### 1. Objective
Master asynchronous network communication using jQuery 4.0's `jqXHR` object, configure custom HTTP headers, handle errors with `statusCode`, and leverage native ES6+ `async`/`await`.

### 2. Explanation
**AJAX (Asynchronous JavaScript and XML)** allows pages to send and receive data in the background without a full-page reload.

In **jQuery 4.0.0**:
- All AJAX requests return a normalized `jqXHR` object.
- `jqXHR` fully complies with the **Promise/A+ specification**, meaning you can `await $.ajax(...)` directly in modern `async` functions!
- **Global Lifecycle Events** (`$(document).ajaxStart()`, `ajaxStop()`) automate loading spinners across the entire application.

### Shorthands vs Full Configuration:
- `$.get(url, data, success, dataType)`: Shorthand HTTP GET.
- `$.post(url, data, success, dataType)`: Shorthand HTTP POST.
- `$.getJSON(url, success)`: Shorthand GET expecting JSON.
- `$.ajax(options)`: Complete control over headers, HTTP verbs (`PUT`, `DELETE`, `PATCH`), timeouts, and status codes.

### 3. Syntax
```javascript
// Master $.ajax() configuration
$.ajax({
  url: 'https://api.example.com/items',
  method: 'POST',
  contentType: 'application/json; charset=utf-8',
  dataType: 'json',
  data: JSON.stringify({ name: 'New Item' }),
  headers: { 'Authorization': 'Bearer ' + token },
  timeout: 5000,
  statusCode: {
    404: () => alert('Endpoint not found'),
    500: () => alert('Server error')
  }
})
.done((data) => console.log('Saved:', data))
.fail((xhr, status, err) => console.error('Error:', err));

// Modern Async / Await with jQuery 4.0
async function loadUserData(userId) {
  const user = await $.getJSON(`https://api.example.com/users/${userId}`);
  return user;
}
```

### 4. Parameters
- `contentType` *(String)*: MIME type sent to the server (e.g. `'application/json'`).
- `dataType` *(String)*: Expected format from server (`'json'`, `'xml'`, `'html'`, `'text'`).
- `timeout` *(Number)*: Maximum wait duration before aborting (ms).

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 10: AJAX & Async</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="btnFetchUser">Fetch User (Async/Await)</button>
  <div id="userCard" style="margin-top:10px; padding:12px; background:#f8fafc; border:1px solid #cbd5e1; max-width:300px;">
    Click to load user data.
  </div>

  <script>
    $(function() {
      // Async/await consumption of jQuery 4.0 jqXHR Promise
      $('#btnFetchUser').on('click', async function() {
        const $card = $('#userCard').text('Connecting to API...');
        const $btn = $(this).prop('disabled', true);

        try {
          const user = await $.getJSON('https://jsonplaceholder.typicode.com/users/1');
          $card.html(`<strong>${user.name}</strong><br>Email: ${user.email}<br>City: ${user.address.city}`);
        } catch (err) {
          $card.html('<span style="color:red;">Failed to retrieve user data.</span>');
        } finally {
          $btn.prop('disabled', false);
        }
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking the button fetches user record #1 from the public REST API and renders name, email, and city without page refresh.

### 7. Practical Use
- Interacting with RESTful microservices, submitting checkout payloads, infinite scroll feeds, and live notifications.

### 8. Common Mistakes
- **Sending objects without `JSON.stringify()` when `contentType: 'application/json'` is set**: jQuery's default serializer converts `{ a: 1 }` to the string `'a=1'`, causing backend JSON parsers to reject the request. Always use `data: JSON.stringify(payload)`.
- **Assuming AJAX runs synchronously**: Code placed immediately after `$.ajax()` will run before the server responds. Always handle results inside `.done()` or after `await`.

### 9. Best Practices
- Use `async/await` and `try/catch` with jQuery 4.0 for readable asynchronous logic.
- Use `global: false` inside background polling requests to avoid triggering the global loading spinner.

### 10. Exercises
1. Build an AJAX request with a 2-second timeout that displays a "Request timed out, please retry" notification when exceeded.
2. Coordinate two parallel requests using native `Promise.all([ $.getJSON(...), $.getJSON(...) ])`.

### 11. Interview Questions & Answers
**Q: Can you use native `async`/`await` directly with `$.ajax()` in jQuery 4.0?**  
**A:** Yes. In jQuery 4.0, the returned `jqXHR` object implements the standard Promise/A+ interface, including a conforming `.then()` method. This allows any jQuery network request to be natively awaited (`await $.ajax(...)`) inside an `async` function.

### 12. Mini Project: Global Network Activity Progress Bar
```html
<div style="font-family:sans-serif; padding:1rem;">
  <div id="globalBar" style="position:fixed; top:0; left:0; height:3px; width:0%; background:#2563eb; transition:width 0.2s;"></div>
  <button id="btnTriggerReq">Send Request</button>
</div>

<script>
  $(function() {
    $(document).ajaxStart(function() {
      $('#globalBar').css({ width: '40%', display: 'block' });
    });
    $(document).ajaxStop(function() {
      $('#globalBar').css('width', '100%').fadeOut(250, function() {
        $(this).css('width', '0%');
      });
    });

    $('#btnTriggerReq').on('click', function() {
      $.getJSON('https://jsonplaceholder.typicode.com/posts/1');
    });
  });
</script>
```
