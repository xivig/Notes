# 🌐 Part 6 — AJAX and Asynchronous JavaScript (Intermediate to Advanced)

A comprehensive guide to asynchronous network communication, RESTful HTTP operations, `jqXHR` Promise interoperability, error handling, global lifecycle indicators, and async/await integration using **jQuery 4.0.0**.

---

## 📑 Table of Contents
1. [Chapter 39: AJAX Fundamentals](#chapter-39-ajax-fundamentals)
2. [Chapter 40: GET and POST Requests](#chapter-40-get-and-post-requests)
3. [Chapter 41: Master $.ajax() Configuration](#chapter-41-master-ajax-configuration)
4. [Chapter 42: JSON and XML Responses](#chapter-42-json-and-xml-responses)
5. [Chapter 43: Fetching REST API Data](#chapter-43-fetching-rest-api-data)
6. [Chapter 44: Error Handling & HTTP Status Codes](#chapter-44-error-handling--http-status-codes)
7. [Chapter 45: Loading Indicators & Global AJAX Events](#chapter-45-loading-indicators--global-ajax-events)
8. [Chapter 46: Promises & Modern Async/Await](#chapter-46-promises--modern-asyncawait)
9. [Chapter 47: Deferred Objects (Legacy Compatibility)](#chapter-47-deferred-objects-legacy-compatibility)

---

## Chapter 39: AJAX Fundamentals

### 1. Objective
Understand the architecture of Asynchronous JavaScript and XML (AJAX), how background HTTP exchanges avoid full-page reloads, and modern jQuery 4.0 network foundations.

### 2. Explanation
Before AJAX, any data transfer between a web page and a server required a complete browser document refresh, resetting UI scroll position, input fields, and visual context.

**AJAX** allows web applications to:
1. Send data to a web server in the background without refreshing the page.
2. Receive data from the server (JSON, HTML, XML, text).
3. Update specific targeted sections of the DOM smoothly.

In **jQuery 4.0.0**, all AJAX utilities return a normalized `jqXHR` object (jQuery XMLHttpRequest) that fully complies with the Promise/A+ specification, supports modern Content Security Policies (CSP), and interacts seamlessly with modern ES6+ `async`/`await`.

### 3. Syntax
```javascript
// Universal AJAX Call
$.ajax({
  url: '/api/endpoint',
  method: 'GET',
  dataType: 'json'
})
.done(function(data) {
  // Successful response
})
.fail(function(jqXHR, textStatus, errorThrown) {
  // Error handling
});
```

### 4. Parameters
- `url` *(String)*: Destination URL for the request.
- `method` *(String)*: HTTP Verb (`'GET'`, `'POST'`, `'PUT'`, `'DELETE'`, `'PATCH'`). Defaults to `'GET'`.
- `dataType` *(String)*: Expected response format (`'json'`, `'xml'`, `'html'`, `'script'`, `'text'`).

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 39: AJAX Fundamentals</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <h3>Live User Profile</h3>
  <div id="profileCard" style="padding:15px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; max-width:300px;">
    Click the button to load user data.
  </div>
  <button id="btnFetchUser" style="margin-top:10px; padding:8px 16px;">Fetch User</button>

  <script>
    $('#btnFetchUser').on('click', function() {
      $('#profileCard').text('Loading data from server...');

      // Asynchronous background request
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/users/1',
        method: 'GET',
        dataType: 'json'
      })
      .done(function(user) {
        $('#profileCard').html(`
          <strong>${user.name}</strong><br>
          Email: ${user.email}<br>
          Company: ${user.company.name}
        `);
      })
      .fail(function() {
        $('#profileCard').text('Failed to load profile.');
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Fetch User" displays `"Loading data from server..."` without refreshing the page.
- Once the server responds, the card updates with the user's name, email, and company details.

### 7. Practical Use
- Single-page application transitions, background form submissions, infinite scrolling, real-time dashboards.

### 8. Common Mistakes
- **Assuming AJAX runs synchronously**: Writing code immediately after `$.ajax()` that relies on the response data will fail because the network request has not finished yet. All response processing must occur inside `.done()` or after `await`.
- **CORS Errors**: Attempting to fetch from external domains that lack Cross-Origin Resource Sharing (`Access-Control-Allow-Origin`) headers.

### 9. Best Practices
- Always specify `dataType: 'json'` explicitly when expecting JSON to avoid parsing issues.
- Always attach a `.fail()` or `.catch()` handler to gracefully inform users of network failures.

### 10. Exercises
1. Build a button that fetches and displays the current public IP address from `https://api.ipify.org?format=json`.
2. Add a retry mechanism that attempts an AJAX request up to 3 times before displaying a permanent failure message.

### 11. Interview Questions & Answers
**Q: What is `jqXHR` and how does it compare to native `XMLHttpRequest`?**  
**A:** `jqXHR` is jQuery's wrapper around the browser's native `XMLHttpRequest`. It normalizes cross-browser differences, provides standardized callback hooks (`.done()`, `.fail()`, `.always()`), and implements the Promise/A+ interface, allowing it to be used with `.then()` and native ES `await`.

### 12. Mini Project: Interactive Random Joke Generator
```html
<div style="font-family:sans-serif; max-width:350px; padding:1.5rem; border:1px solid #e2e8f0; border-radius:8px; text-align:center;">
  <p id="jokeDisplay" style="font-style:italic; min-height:50px;">Press button for a random joke.</p>
  <button id="btnNewJoke" style="padding:8px 16px; background:#4f46e5; color:#fff; border:none; border-radius:4px; cursor:pointer;">New Joke</button>
</div>

<script>
  $('#btnNewJoke').on('click', function() {
    const $btn = $(this).prop('disabled', true).text('Fetching...');
    
    $.ajax({
      url: 'https://official-joke-api.appspot.com/random_joke',
      dataType: 'json'
    })
    .done(function(joke) {
      $('#jokeDisplay').html(`<strong>${joke.setup}</strong><br><span style="color:#059669;">${joke.punchline}</span>`);
    })
    .fail(function() {
      $('#jokeDisplay').text('Error loading joke.');
    })
    .always(function() {
      $btn.prop('disabled', false).text('New Joke');
    });
  });
</script>
```

---

## Chapter 40: GET and POST Requests

### 1. Objective
Use jQuery's shorthand methods `$.get()`, `$.post()`, and `$.getJSON()` for clean, concise network requests.

### 2. Explanation
While `$.ajax()` provides full low-level configuration, jQuery offers convenient shorthand wrappers for common operations:
- `$.get(url [, data] [, success] [, dataType])`: Sends an HTTP GET request to retrieve data from a server.
- `$.post(url [, data] [, success] [, dataType])`: Sends an HTTP POST request to submit data to a server.
- `$.getJSON(url [, data] [, success])`: Equivalent to `$.get()` with `dataType: 'json'`.
- `$(selector).load(url [, data] [, complete])`: Directly fetches remote HTML and injects it into the matched element.

### 3. Syntax
```javascript
// HTTP GET shorthand
$.get('/api/users', { page: 1 }, function(response) {
  console.log(response);
});

// HTTP POST shorthand
$.post('/api/users', { name: 'Sarah', role: 'Admin' }, function(response) {
  console.log('Created ID:', response.id);
});

// JSON GET shorthand
$.getJSON('/api/config.json', function(config) {
  console.log(config.appVersion);
});
```

### 4. Parameters
- `url` *(String)*: Request destination endpoint.
- `data` *(Object | String, optional)*: Query parameters (for GET) or body payload (for POST).
- `success(data, textStatus, jqXHR)` *(Function, optional)*: Success callback.
- `dataType` *(String, optional)*: Response type (`'json'`, `'text'`, etc.).

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 40: GET and POST</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="btnGet">Load Post via $.get()</button>
  <button id="btnPost">Submit via $.post()</button>
  <div id="output" style="margin-top:15px; padding:10px; background:#f1f5f9;"></div>

  <script>
    // 1. Shorthand GET
    $('#btnGet').on('click', function() {
      $.get('https://jsonplaceholder.typicode.com/posts/1', function(data) {
        $('#output').html(`<strong>${data.title}</strong><p>${data.body}</p>`);
      }, 'json');
    });

    // 2. Shorthand POST
    $('#btnPost').on('click', function() {
      const payload = { title: 'New Article', body: 'Modern jQuery 4.0 content', userId: 1 };
      
      $.post('https://jsonplaceholder.typicode.com/posts', payload, function(createdItem) {
        $('#output').html(`<strong>Success!</strong> Server generated ID #${createdItem.id}`);
      }, 'json');
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Load Post via $.get()" loads and renders post #1.
- Clicking "Submit via $.post()" transmits the payload and renders `"Success! Server generated ID #101"`.

### 7. Practical Use
- Quick data retrieval from REST endpoints.
- Submitting feedback forms and basic CRUD operations without complex header customization.

### 8. Common Mistakes
- **Using `$.post()` when custom headers (like Authorization tokens) are required**: Shorthand `$.post()` cannot specify custom request headers. Use `$.ajax()` instead when custom headers are needed.
- **Forgetting that `$.get()` appends data to the URL**: Passing large nested objects to `$.get()` serializes them into query strings, which can exceed URL length limits.

### 9. Best Practices
- Use `$.getJSON()` when fetching JSON configurations or API resources where no custom headers are needed.
- Use full `$.ajax()` whenever you need authentication tokens, PUT/DELETE/PATCH methods, or fine-grained error interception.

### 10. Exercises
1. Build a user card list where clicking "Load More" calls `$.getJSON()` with an incremented page parameter (`?page=2`).
2. Implement a quick feedback submission box using `$.post()` that disables the submit button during transmission.

### 11. Interview Questions & Answers
**Q: When should you use `$.ajax()` instead of `$.get()` or `$.post()`?**  
**A:** Use `$.ajax()` whenever you need:
1. HTTP verbs other than GET/POST (`PUT`, `DELETE`, `PATCH`).
2. Custom request headers (e.g. `Authorization: Bearer <token>`).
3. Content-Type configuration (e.g. sending raw JSON strings with `application/json`).
4. Custom timeouts, beforeSend hooks, or granular status code handlers.

### 12. Mini Project: Quick Post Creator Widget
```html
<div style="font-family:sans-serif; max-width:350px;">
  <h4>Create New Notice</h4>
  <input type="text" id="noticeTitle" placeholder="Title..." style="width:100%; padding:6px; box-sizing:border-box; margin-bottom:6px;">
  <textarea id="noticeBody" placeholder="Notice details..." rows="3" style="width:100%; padding:6px; box-sizing:border-box;"></textarea>
  <button id="btnPublish" style="margin-top:6px; padding:6px 12px; cursor:pointer;">Publish Notice</button>
  <p id="publishStatus" style="font-size:12px; color:#16a34a;"></p>
</div>

<script>
  $('#btnPublish').on('click', function() {
    const title = $('#noticeTitle').val().trim();
    const body = $('#noticeBody').val().trim();
    if (!title || !body) return alert('Please complete all fields.');

    $.post('https://jsonplaceholder.typicode.com/posts', { title: title, body: body, userId: 1 }, function(res) {
      $('#publishStatus').text(`Notice created! (Assigned ID: ${res.id})`);
      $('#noticeTitle, #noticeBody').val('');
    }, 'json');
  });
</script>
```

---

## Chapter 41: Master $.ajax() Configuration

### 1. Objective
Configure comprehensive, production-grade `$.ajax()` settings including request headers, HTTP methods, JSON payloads, timeouts, cache control, and lifecycle hooks.

### 2. Explanation
`$.ajax()` is the foundational engine powering all network requests in jQuery. Understanding its comprehensive settings dictionary is essential for enterprise integrations:

Key configuration options:
- `url`: Target endpoint.
- `method` (or `type`): `'GET'`, `'POST'`, `'PUT'`, `'DELETE'`, `'PATCH'`.
- `data`: Query parameters or request body. For raw JSON APIs, pass `JSON.stringify(object)` with `contentType: 'application/json'`.
- `headers`: An object of custom HTTP request headers (e.g. Authorization tokens, CSRF tokens).
- `timeout`: Maximum request duration in milliseconds before triggering an error.
- `cache`: Set to `false` on GET requests to automatically append a `_=[timestamp]` query parameter to prevent browser caching.
- `beforeSend`: Hook executed before transmission (ideal for attaching spinners or checking client state).

### 3. Syntax
```javascript
$.ajax({
  url: 'https://api.example.com/v1/resource',
  method: 'POST',
  contentType: 'application/json; charset=utf-8',
  dataType: 'json',
  data: JSON.stringify({ key: 'value' }),
  headers: {
    'Authorization': 'Bearer ' + authToken,
    'X-CSRF-Token': csrfToken
  },
  timeout: 5000,
  cache: false,
  beforeSend: function(jqXHR, settings) {
    // Show spinner
  }
})
.done(function(data, textStatus, jqXHR) {})
.fail(function(jqXHR, textStatus, errorThrown) {})
.always(function() {});
```

### 4. Parameters
- `contentType` *(String)*: MIME type of data sent to the server (default: `'application/x-www-form-urlencoded; charset=UTF-8'`).
- `dataType` *(String)*: The type of data you expect back from the server.
- `timeout` *(Number)*: Milliseconds before the request times out and aborts.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 41: $.ajax Configuration</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="btnSendJSON">Send JSON Payload</button>
  <pre id="jsonResult" style="background:#0f172a; color:#38bdf8; padding:12px; margin-top:10px;"></pre>

  <script>
    $('#btnSendJSON').on('click', function() {
      const payload = {
        title: 'Modernizing Legacy jQuery',
        completed: false,
        authorId: 42
      };

      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/todos',
        method: 'POST',
        contentType: 'application/json; charset=utf-8', // Strict JSON payload
        dataType: 'json',
        data: JSON.stringify(payload),
        headers: {
          'X-Custom-Client': 'jQuery-4.0-Client'
        },
        timeout: 4000
      })
      .done(function(response, status, xhr) {
        $('#jsonResult').text(
          `Status: ${xhr.status} (${status})\n` +
          JSON.stringify(response, null, 2)
        );
      })
      .fail(function(xhr, status, error) {
        $('#jsonResult').text(`Error [${status}]: ${error}`);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
```
Status: 201 (success)
{
  "title": "Modernizing Legacy jQuery",
  "completed": false,
  "authorId": 42,
  "id": 201
}
```

### 7. Practical Use
- Connecting to modern JSON microservices requiring `application/json` Content-Type headers.
- Setting global authentication tokens and CSRF headers in server-side frameworks (Laravel, Django, Rails).

### 8. Common Mistakes
- **Sending raw JavaScript objects without `JSON.stringify()` when `contentType: 'application/json'` is set**: jQuery's default serializer will convert `{ a: 1 }` to the string `'a=1'`, causing server-side JSON parsers to throw a syntax error.
- **Forgetting `timeout`**: Without timeouts, hanging server connections can leave spinners active indefinitely on bad network connections.

### 9. Best Practices
- Always stringify request payloads when specifying `contentType: 'application/json'`.
- Use `$.ajaxSetup()` to configure common headers (e.g. CSRF tokens) once across the entire application.

### 10. Exercises
1. Configure an AJAX request that sets a 2-second timeout and gracefully displays a "Connection timed out, please retry" notification when triggered.
2. Use `$.ajaxSetup()` to automatically include an `Authorization: Bearer <mock_token>` header on all subsequent AJAX requests.

### 11. Interview Questions & Answers
**Q: What is the difference between `dataType` and `contentType` in `$.ajax()`?**  
**A:**  
- `contentType` informs the **server** about the format of the data being sent in the request body (e.g. `'application/json'`).  
- `dataType` informs **jQuery** how to interpret and parse the response received from the server (e.g. automatically parsing `'json'` into a JavaScript object).

### 12. Mini Project: REST API Resource Inspector
```html
<div style="font-family:sans-serif; max-width:400px; padding:1rem; border:1px solid #ccc; border-radius:6px;">
  <label>Endpoint URL:</label>
  <input type="text" id="apiEndpoint" value="https://jsonplaceholder.typicode.com/posts/1" style="width:100%; padding:6px; box-sizing:border-box; margin:4px 0 8px;">
  
  <label>Method:</label>
  <select id="apiMethod" style="padding:6px; margin-bottom:8px;">
    <option value="GET">GET</option>
    <option value="DELETE">DELETE</option>
  </select><br>

  <button id="btnExecuteRequest" style="padding:6px 14px;">Send Request</button>
  <div id="apiFeedback" style="margin-top:10px; font-size:12px;"></div>
</div>

<script>
  $('#btnExecuteRequest').on('click', function() {
    const url = $('#apiEndpoint').val().trim();
    const method = $('#apiMethod').val();
    $('#apiFeedback').html('<em>Sending request...</em>');

    $.ajax({
      url: url,
      method: method,
      dataType: 'json'
    })
    .done(function(data, status, xhr) {
      $('#apiFeedback').html(`
        <span style="color:green; font-weight:bold;">HTTP ${xhr.status} OK</span>
        <pre style="background:#eee; padding:8px;">${JSON.stringify(data, null, 2)}</pre>
      `);
    })
    .fail(function(xhr) {
      $('#apiFeedback').html(`<span style="color:red; font-weight:bold;">HTTP ${xhr.status} ${xhr.statusText}</span>`);
    });
  });
</script>
```

---

## Chapter 42: JSON and XML Responses

### 1. Objective
Parse, traverse, and render both modern JSON data structures and legacy XML DOM responses received from AJAX queries in jQuery 4.0.

### 2. Explanation
While modern web APIs predominantly deliver lightweight JSON, many enterprise systems, RSS feeds, SOAP services, and legacy endpoints still serve XML.

- **JSON Responses**: With `dataType: 'json'`, jQuery automatically parses the JSON text string via native `JSON.parse()` and passes the resulting JavaScript object or array directly into the `.done()` callback.
- **XML Responses**: With `dataType: 'xml'`, jQuery parses the response into an XML DOM document. You can then use **standard jQuery selectors and traversal methods** (`.find()`, `.text()`, `.attr()`) directly on the XML document just like an HTML page!

### 3. Syntax
```javascript
// Processing JSON
$.ajax({ url: '/data.json', dataType: 'json' }).done(function(data) {
  console.log(data.propertyName);
});

// Processing XML
$.ajax({ url: '/feed.xml', dataType: 'xml' }).done(function(xmlDoc) {
  $(xmlDoc).find('item').each(function() {
    const title = $(this).find('title').text();
  });
});
```

### 4. Parameters
- `dataType: 'json'`: Instructs jQuery to parse response with `JSON.parse()`.
- `dataType: 'xml'`: Instructs jQuery to parse response into an XML Document object.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 42: JSON and XML Parsing</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="btnParseXml">Parse Mock XML Feed</button>
  <ul id="feedList" style="margin-top:10px;"></ul>

  <script>
    $('#btnParseXml').on('click', function() {
      // Mock XML string representing an RSS feed
      const rawXml = `
        <rss>
          <channel>
            <item><title>jQuery 4.0 Released</title><link>https://jquery.com</link></item>
            <item><title>Modern JavaScript Standards</title><link>https://w3c.org</link></item>
          </channel>
        </rss>
      `;

      // Parse XML string into DOM
      const xmlDoc = $.parseXML(rawXml);
      const $xml = $(xmlDoc);

      $('#feedList').empty();
      $xml.find('item').each(function() {
        const title = $(this).find('title').text();
        const link = $(this).find('link').text();
        $('#feedList').append(`<li><a href="${link}" target="_blank">${title}</a></li>`);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking the button parses the XML document and renders two hyperlinked list items.

### 7. Practical Use
- Reading RSS/Atom feeds, interacting with SOAP or SVG XML services, and processing JSON microservices.

### 8. Common Mistakes
- **Using `$.parseJSON()` in jQuery 4.0**: `jQuery.parseJSON()` was officially removed in jQuery 4.0. Always use native `JSON.parse()`.
- **Invalid XML syntax throwing silent failures**: Unlike HTML, XML parsers reject unclosed tags or unescaped ampersands (`&`), throwing parsing errors.

### 9. Best Practices
- Use native `JSON.parse()` and `JSON.stringify()`.
- When dealing with XML, wrap the parsed document in `$()` to leverage jQuery's rich traversal methods (`.find()`, `.filter()`).

### 10. Exercises
1. Build an RSS reader that fetches a live XML podcast feed and displays episode titles and release dates.
2. Fetch a JSON array of 5 users, filter for those whose email ends in `.biz`, and display them in a list.

### 11. Interview Questions & Answers
**Q: How does jQuery handle XML responses compared to JSON responses?**  
**A:** For JSON responses, jQuery parses the payload into a native JavaScript object or array. For XML responses, jQuery returns an XML Document Object Model, which developers can wrap with `$(xmlDoc)` and query using standard jQuery selectors like `.find('elementName')`.

### 12. Mini Project: Interactive XML / JSON Toggle Viewer
```html
<div style="font-family:sans-serif; max-width:400px;">
  <button id="btnLoadJson">Load JSON</button>
  <button id="btnLoadXml">Load XML</button>
  <div id="dataContainer" style="margin-top:10px; padding:10px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:4px;">Ready</div>
</div>

<script>
  $('#btnLoadJson').on('click', function() {
    const jsonStr = '{"format": "JSON", "speed": "Ultra Fast", "size": "Small"}';
    const obj = JSON.parse(jsonStr);
    $('#dataContainer').html(`<strong>Format:</strong> ${obj.format}<br><strong>Speed:</strong> ${obj.speed}`);
  });

  $('#btnLoadXml').on('click', function() {
    const xmlStr = '<info><format>XML</format><speed>Standard</speed></info>';
    const $xml = $($.parseXML(xmlStr));
    const format = $xml.find('format').text();
    const speed = $xml.find('speed').text();
    $('#dataContainer').html(`<strong>Format:</strong> ${format}<br><strong>Speed:</strong> ${speed}`);
  });
</script>
```

---

## Chapter 43: Fetching REST API Data

### 1. Objective
Connect jQuery 4.0 applications to real-world RESTful APIs, manage query parameters, dynamic URL segments, and render nested collections cleanly.

### 2. Explanation
A REST (Representational State Transfer) API organizes data into resource endpoints accessible via standard HTTP methods:
- `GET /posts`: List posts.
- `GET /posts/1`: Retrieve specific post.
- `POST /posts`: Create a new post.
- `PUT /posts/1`: Replace existing post.
- `PATCH /posts/1`: Partially update existing post.
- `DELETE /posts/1`: Delete post.

When integrating REST APIs with jQuery, map UI actions to appropriate HTTP methods and dynamically generate templates to display retrieved records.

### 3. Syntax
```javascript
// Generic REST GET request with query filters
$.ajax({
  url: 'https://api.example.com/v1/products',
  method: 'GET',
  data: { category: 'electronics', limit: 10 },
  dataType: 'json'
})
.done(function(products) {
  // Render products
});
```

### 4. Parameters
- `data` *(Object)*: Automatically formatted into URL query parameters on GET requests: `?category=electronics&limit=10`.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 43: REST API Integration</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    .card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-top: 15px; }
    .card { padding: 12px; background: #fff; border: 1px solid #e2e8f0; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .card h4 { margin: 0 0 6px; font-size: 14px; text-transform: capitalize; }
  </style>
</head>
<body>
  <h3>Latest Articles</h3>
  <button id="btnLoadArticles">Load 6 Articles</button>
  <div id="articlesGrid" class="card-grid"></div>

  <script>
    $('#btnLoadArticles').on('click', function() {
      const $btn = $(this).prop('disabled', true).text('Loading...');
      
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'GET',
        data: { _limit: 6 },
        dataType: 'json'
      })
      .done(function(posts) {
        const html = posts.map(post => `
          <div class="card">
            <h4>${post.title.substring(0, 25)}...</h4>
            <p style="font-size:12px; color:#64748b;">${post.body.substring(0, 60)}...</p>
          </div>
        `).join('');

        $('#articlesGrid').html(html);
      })
      .always(function() {
        $btn.prop('disabled', false).text('Load 6 Articles');
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking "Load 6 Articles" fetches 6 posts from the REST API and renders them in a responsive CSS grid.

### 7. Practical Use
- E-commerce product catalog listings, news portals, and user administrative tables.

### 8. Common Mistakes
- **Building HTML strings inside `$.each` via repetitive `.append()` calls**: Appending to the DOM on every loop iteration triggers multiple layout repaints. Construct an array of HTML strings and call `.html()` or `.append()` once at the end.
- **Neglecting to handle empty arrays**: If the API returns `[]`, inform the user with a "No items found" state.

### 9. Best Practices
- Construct templates using Array `.map().join('')` or document fragments to minimize DOM reflows.
- Disable submit/trigger buttons while the network request is inflight to avoid duplicate calls.

### 10. Exercises
1. Add search and category filter controls that pass dynamic query parameters to a REST API.
2. Build an inline delete button on each card that sends a `DELETE` request to `/posts/:id` and removes the card from the UI on success.

### 11. Interview Questions & Answers
**Q: How can you optimize DOM rendering when inserting hundreds of items fetched from a REST API using jQuery?**  
**A:** Avoid calling `$(container).append(...)` inside a loop. Instead, generate the entire HTML markup as a single string (using `.map().join('')`) or accumulate elements in a `DocumentFragment`, and insert it into the DOM in a single operation.

### 12. Mini Project: Interactive REST User Directory
```html
<div style="font-family:sans-serif; max-width:450px;">
  <div style="display:flex; justify-content:space-between; align-items:center;">
    <h4>User Directory</h4>
    <button id="btnFetchDirectory" style="padding:6px 12px; cursor:pointer;">Refresh</button>
  </div>
  <ul id="userDirList" style="list-style:none; padding:0; margin-top:10px;"></ul>
</div>

<script>
  $('#btnFetchDirectory').on('click', function() {
    $('#userDirList').html('<li>Loading directory...</li>');

    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/users',
      data: { _limit: 4 },
      dataType: 'json'
    })
    .done(function(users) {
      const items = users.map(u => `
        <li style="padding:8px; border-bottom:1px solid #eee; display:flex; justify-content:space-between;">
          <span><strong>${u.name}</strong> (${u.username})</span>
          <a href="mailto:${u.email}" style="color:#2563eb; font-size:13px;">Email</a>
        </li>
      `).join('');
      $('#userDirList').html(items);
    });
  }).trigger('click');
</script>
```

---

## Chapter 44: Error Handling & HTTP Status Codes

### 1. Objective
Handle network errors, parse HTTP response error codes (400, 401, 403, 404, 500), and configure targeted status-code callbacks using `statusCode` in jQuery 4.0.

### 2. Explanation
Network communications are inherently unpredictable due to offline states, server crashes, expired credentials, or bad input.

Handling failures gracefully requires two approaches:
1. **The `.fail()` Promise Handler**: Catches any non-2xx status code, network drop, parse error, or timeout.
2. **The `statusCode` Configuration Map**: Allows you to specify dedicated, distinct callbacks for specific HTTP status codes (e.g., redirecting on `401 Unauthorized`, showing "Not Found" on `404`, and alerting maintenance on `503`).

### 3. Syntax
```javascript
$.ajax({
  url: '/api/resource',
  statusCode: {
    400: function(xhr) { alert('Bad Request: Verify form inputs'); },
    401: function(xhr) { window.location.href = '/login'; },
    404: function(xhr) { alert('Resource Not Found'); },
    500: function(xhr) { alert('Internal Server Error. Try again later.'); }
  }
})
.fail(function(jqXHR, textStatus, errorThrown) {
  console.error('Request failed:', textStatus, errorThrown);
});
```

### 4. Parameters
- `jqXHR.status` *(Number)*: The numeric HTTP response status code (e.g. `404`, `500`).
- `textStatus` *(String)*: Status categorization (`'timeout'`, `'error'`, `'abort'`, `'parsererror'`).
- `errorThrown` *(String)*: The textual HTTP status description (e.g. `'Not Found'`, `'Internal Server Error'`).

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 44: Error Handling</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="btnTrigger404">Trigger 404 Error</button>
  <div id="errorDisplay" style="margin-top:15px; padding:12px; display:none; border-radius:6px;"></div>

  <script>
    $('#btnTrigger404').on('click', function() {
      const $box = $('#errorDisplay').hide();

      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/non-existent-endpoint-404',
        statusCode: {
          404: function() {
            $box.css({ background: '#fef2f2', color: '#b91c1c', border: '1px solid #f87171' })
                .html('<strong>404 Error:</strong> The requested resource could not be found.')
                .slideDown(200);
          }
        }
      })
      .fail(function(xhr, status, err) {
        console.warn(`Catch-all failure hook triggered: Status=${xhr.status}, Err=${err}`);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- Clicking the button requests an invalid URL. The `statusCode: { 404: ... }` callback executes and renders a red error alert box.

### 7. Practical Use
- Automatically redirecting unauthenticated users to `/login` on `401 Unauthorized`.
- Displaying actionable validation error messages returned by backend servers on `422 Unprocessable Entity`.

### 8. Common Mistakes
- **Ignoring the `parsererror` status**: If the server returns malformed JSON, jQuery reports an error even if the HTTP status was `200 OK`. Always inspect `textStatus === 'parsererror'`.
- **Leaving users without feedback on error**: Failing silently without displaying a message leaves the user wondering if the button clicked properly.

### 9. Best Practices
- Always map `401` to an authentication refresh or login redirect.
- Use `textStatus` to distinguish between connectivity issues (`'error'`), timeouts (`'timeout'`), and JSON syntax failures (`'parsererror'`).

### 10. Exercises
1. Build an AJAX request with a deliberate 100ms timeout on a slow API endpoint and handle the `'timeout'` status gracefully.
2. Build a central AJAX error logger that intercepts all failed requests and logs them to an analytics tracker.

### 11. Interview Questions & Answers
**Q: What does a `parsererror` indicate in jQuery's `.fail()` handler?**  
**A:** A `parsererror` occurs when the HTTP request succeeds with a 2xx status code, but the response body could not be parsed into the requested `dataType` (e.g., the server returned an HTML error page or broken JSON string when `dataType: 'json'` was configured).

### 12. Mini Project: Network Resilience & Retry Handler
```html
<div style="font-family:sans-serif; max-width:350px;">
  <h4>Resilient Network Loader</h4>
  <button id="btnResilientFetch">Fetch with Auto-Retry (Max 3)</button>
  <div id="retryLog" style="margin-top:10px; font-size:13px; color:#475569;"></div>
</div>

<script>
  function fetchWithRetry(url, maxRetries, currentAttempt = 1) {
    $('#retryLog').append(`<div>Attempt #${currentAttempt} in progress...</div>`);

    $.ajax({
      url: url,
      timeout: 2000
    })
    .done(function() {
      $('#retryLog').append(`<div style="color:green;">✓ Connected successfully!</div>`);
    })
    .fail(function() {
      if (currentAttempt < maxRetries) {
        $('#retryLog').append(`<div style="color:orange;">⚠️ Failed. Retrying in 1.5s...</div>`);
        setTimeout(() => fetchWithRetry(url, maxRetries, currentAttempt + 1), 1500);
      } else {
        $('#retryLog').append(`<div style="color:red;">✕ Maximum retries exceeded. Request aborted.</div>`);
      }
    });
  }

  $('#btnResilientFetch').on('click', function() {
    $('#retryLog').empty();
    // Testing against non-existent URL to demonstrate 3 retry attempts
    fetchWithRetry('https://jsonplaceholder.typicode.com/unstable-route', 3);
  });
</script>
```

---

## Chapter 45: Loading Indicators & Global AJAX Events

### 1. Objective
Implement automated, global loading spinners and activity bars using jQuery's document-level AJAX lifecycle events (`ajaxStart`, `ajaxStop`, `ajaxError`, `ajaxComplete`).

### 2. Explanation
Manually toggling a loading spinner before and after every individual AJAX request is error-prone and leads to code duplication across large applications.

jQuery provides **Global AJAX Event Handlers** attached to `$(document)`:
- `$(document).ajaxStart()`: Fires when the **first** active AJAX request begins (when the active request count changes from 0 to 1).
- `$(document).ajaxSend()`: Fires right before *any* request is transmitted.
- `$(document).ajaxSuccess()`: Fires whenever *any* request succeeds.
- `$(document).ajaxError()`: Fires whenever *any* request encounters an error.
- `$(document).ajaxComplete()`: Fires whenever *any* request finishes (success or failure).
- `$(document).ajaxStop()`: Fires when **all** active AJAX requests have completely finished (active request count returns to 0).

### 3. Syntax
```javascript
// Global Activity Indicators
$(document).ajaxStart(function() {
  $('#globalSpinner').show();
});

$(document).ajaxStop(function() {
  $('#globalSpinner').hide();
});

// Exclude an individual request from global events
$.ajax({
  url: '/api/heartbeat',
  global: false // Will not trigger ajaxStart or ajaxStop
});
```

### 4. Parameters
- `global: false` *(Boolean, optional)*: Set inside an individual `$.ajax()` options dictionary to bypass all global handlers.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 45: Global AJAX Indicators</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
  <style>
    #globalLoader {
      display: none;
      position: fixed;
      top: 15px;
      right: 15px;
      background: #0284c7;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      font-weight: bold;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div id="globalLoader">⟳ Syncing with Server...</div>

  <button id="btnAction1">Trigger Request A</button>
  <button id="btnAction2">Trigger Request B</button>

  <script>
    // Global listener: Show loader when network activity starts
    $(document).ajaxStart(function() {
      $('#globalLoader').stop(true, true).fadeIn(200);
    });

    // Global listener: Hide loader when all network activity settles
    $(document).ajaxStop(function() {
      $('#globalLoader').stop(true, true).fadeOut(300);
    });

    $('#btnAction1').on('click', function() {
      $.get('https://jsonplaceholder.typicode.com/posts/1');
    });

    $('#btnAction2').on('click', function() {
      $.get('https://jsonplaceholder.typicode.com/users/1');
    });
  </script>
</body>
</html>
```

### 6. Output
- Triggering requests automatically causes `"⟳ Syncing with Server..."` to fade in at the top right, and smoothly fade out when all requests finish.

### 7. Practical Use
- Application-wide top progress bars (similar to GitHub or YouTube page loading bars).
- Centralized network error reporting and toast alerts.

### 8. Common Mistakes
- **Attaching global AJAX events to individual elements**: In jQuery 4.0, global AJAX events **must always be bound to `$(document)`**. Binding them to `$('#spinner')` will not fire.
- **Letting background polling trigger global spinners**: Polling requests (like checking unread message counts every 10 seconds) will repeatedly flicker the global spinner. Always add `global: false` to background poll requests.

### 9. Best Practices
- Bind all global AJAX events to `$(document)`.
- Use `global: false` on background heartbeats, metrics pings, and analytics requests.

### 10. Exercises
1. Build an animated top-border progress bar that expands across the top of the viewport during active requests and disappears on `ajaxStop`.
2. Implement a global `ajaxError` listener that displays a notification toast whenever any API call fails.

### 11. Interview Questions & Answers
**Q: What is the difference between `ajaxStart` and `ajaxSend`?**  
**A:** `ajaxStart` fires only **once** when the first request begins (transitioning from 0 to 1 active requests). `ajaxSend` fires **for every single individual request** that gets dispatched, even if 5 requests are running simultaneously.

### 12. Mini Project: Top-Bar Progress Indicator
```html
<div style="font-family:sans-serif; padding:1rem;">
  <!-- Global Top Progress Bar -->
  <div id="topProgressBar" style="position:fixed; top:0; left:0; height:3px; width:0%; background:#2563eb; transition:width 0.2s; z-index:9999;"></div>

  <h4>Test Global AJAX Progress Bar</h4>
  <button id="btnMultiReq" style="padding:8px 16px; cursor:pointer;">Fire Concurrent Requests</button>
</div>

<script>
  $(document).ajaxStart(function() {
    $('#topProgressBar').css({ width: '30%', display: 'block' });
  });

  $(document).ajaxSend(function() {
    $('#topProgressBar').css('width', '70%');
  });

  $(document).ajaxStop(function() {
    $('#topProgressBar').css('width', '100%').fadeOut(300, function() {
      $(this).css('width', '0%');
    });
  });

  $('#btnMultiReq').on('click', function() {
    $.get('https://jsonplaceholder.typicode.com/posts');
  });
</script>
```

---

## Chapter 46: Promises & Modern Async/Await

### 1. Objective
Leverage native ES6+ `async`/`await` syntax with jQuery 4.0's `jqXHR` objects, handle multiple concurrent requests using `Promise.all()`, and write modern asynchronous code.

### 2. Explanation
One of the most powerful aspects of **jQuery 4.0** is its full alignment with the Promises/A+ specification. 

Because `jqXHR` implements the standard Promise `thenable` interface:
1. You can `await` any jQuery AJAX call directly inside an `async function`.
2. You can use standard `try / catch` blocks for clean, readable error handling.
3. You can coordinate multiple requests using native `Promise.all([ $.get(...), $.get(...) ])`.

This bridges the gap between classic jQuery codebases and modern ES2024+ asynchronous JavaScript.

### 3. Syntax
```javascript
// Modern async/await with jQuery 4.0
async function loadUserData(userId) {
  try {
    const user = await $.getJSON(`https://api.example.com/users/${userId}`);
    const posts = await $.getJSON(`https://api.example.com/posts?userId=${userId}`);
    return { user, posts };
  } catch (error) {
    console.error('Async operation failed:', error);
  }
}
```

### 4. Parameters
- Standard ES6 `async / await` keywords operating on jQuery's `jqXHR` Promise object.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 46: Async / Await with jQuery 4.0</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="btnLoadDashboard">Load Dashboard</button>
  <div id="dashOutput" style="margin-top:15px; font-family:sans-serif;"></div>

  <script>
    $('#btnLoadDashboard').on('click', async function() {
      const $out = $('#dashOutput').html('<em>Loading dashboard resources concurrently...</em>');

      try {
        // Parallel execution with Promise.all
        const [user, posts] = await Promise.all([
          $.getJSON('https://jsonplaceholder.typicode.com/users/1'),
          $.getJSON('https://jsonplaceholder.typicode.com/posts?userId=1&_limit=2')
        ]);

        $out.html(`
          <h3>Welcome, ${user.name}</h3>
          <p>Recent Posts:</p>
          <ul>
            ${posts.map(p => `<li>${p.title}</li>`).join('')}
          </ul>
        `);
      } catch (err) {
        $out.html('<span style="color:red;">Failed to load dashboard data.</span>');
      }
    });
  </script>
</body>
</html>
```

### 6. Output
- Both user profile and posts are fetched simultaneously in parallel.
- The UI renders the aggregated data cleanly once both requests resolve.

### 7. Practical Use
- Aggregating multiple API endpoints into a single dashboard view.
- Writing clean, readable sequential network workflows without deeply nested callback hell.

### 8. Common Mistakes
- **Forgetting that `await` pauses execution only inside the `async` function**: Code outside the `async` function continues executing synchronously.
- **Using `$.when()` when standard `Promise.all()` is available**: While `$.when()` still works for backward compatibility, `Promise.all()` is the web standard across all modern JavaScript.

### 9. Best Practices
- Use `async/await` and `try/catch` for modern jQuery 4.0 asynchronous logic.
- Use `Promise.all()` when requests can run in parallel, avoiding unnecessary sequential waterfalls.

### 10. Exercises
1. Refactor a legacy callback-based AJAX chain into a clean `async/await` function.
2. Use `Promise.race()` with a jQuery AJAX call and a `setTimeout` promise to implement an external timeout canceler.

### 11. Interview Questions & Answers
**Q: Can you use `async/await` directly with `$.ajax()` in jQuery 4.0?**  
**A:** Yes. In jQuery 4.0, `jqXHR` implements the standard Promise/A+ interface with a conforming `.then()` method. This allows any jQuery AJAX call to be awaited directly with `await $.ajax(...)` inside an `async` function.

### 12. Mini Project: Concurrent Multi-Service Status Checker
```html
<div style="font-family:sans-serif; max-width:350px;">
  <h4>Cloud Service Health Monitor</h4>
  <button id="btnCheckHealth" style="padding:6px 12px; cursor:pointer;">Ping All Services</button>
  <ul id="healthResults" style="list-style:none; padding:0; margin-top:10px;"></ul>
</div>

<script>
  $('#btnCheckHealth').on('click', async function() {
    const $list = $('#healthResults').empty();
    
    async function checkService(name, url) {
      try {
        const start = performance.now();
        await $.ajax({ url: url, method: 'HEAD', cache: false });
        const latency = Math.round(performance.now() - start);
        return { name, ok: true, latency };
      } catch (e) {
        return { name, ok: false, latency: 0 };
      }
    }

    $list.append('<li>Pinging services...</li>');

    const results = await Promise.all([
      checkService('API Server', 'https://jsonplaceholder.typicode.com/posts/1'),
      checkService('Auth Service', 'https://jsonplaceholder.typicode.com/users/1')
    ]);

    $list.empty();
    results.forEach(res => {
      const color = res.ok ? 'green' : 'red';
      const status = res.ok ? `ONLINE (${res.latency}ms)` : 'OFFLINE';
      $list.append(`<li><strong>${res.name}:</strong> <span style="color:${color};">${status}</span></li>`);
    });
  });
</script>
```

---

## Chapter 47: Deferred Objects (Legacy Compatibility)

### 1. Objective
Understand jQuery's internal `$.Deferred()` and `$.when()` architecture, compare them with standard ES Promises, and safely modernize legacy deferred workflows in jQuery 4.0.

### 2. Explanation
Before native Promises were standardized in ECMAScript 2015 (ES6), jQuery introduced its own asynchronous abstraction in jQuery 1.5: **Deferred Objects** (`$.Deferred()`).

A Deferred object represents a unit of work that will complete in the future. It has three states:
- `pending`: Work in progress.
- `resolved`: Operation completed successfully (`deferred.resolve(val)`).
- `rejected`: Operation failed (`deferred.reject(err)`).

In **jQuery 4.0.0**, while native `Promise` is universally available, `$.Deferred()` remains fully supported for backward compatibility and internal queue synchronization. Furthermore, jQuery 4.0 Deferreds are fully compliant with Promises/A+, meaning you can seamlessly convert between jQuery Deferreds and native ES Promises.

### 3. Syntax
```javascript
// Creating a Deferred
function asyncTask() {
  const dfd = $.Deferred();

  setTimeout(function() {
    dfd.resolve('Task Completed Successfully');
  }, 1000);

  return dfd.promise(); // Expose read-only promise
}

// Consuming with done/fail or then
asyncTask().done(result => console.log(result));

// Combining multiple deferreds (legacy style)
$.when(task1(), task2()).done((res1, res2) => {});
```

### 4. Parameters
- `deferred.resolve(args)`: Moves state to resolved, triggering `.done()` callbacks.
- `deferred.reject(args)`: Moves state to rejected, triggering `.fail()` callbacks.
- `deferred.promise()`: Returns a read-only Promise wrapper preventing external code from resolving or rejecting the deferred.

### 5. Examples
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Chapter 47: Deferred Objects</title>
  <script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
</head>
<body>
  <button id="btnRunDeferred">Run Deferred Sequence</button>
  <div id="defOutput" style="margin-top:10px;"></div>

  <script>
    function simulateDelay(ms, message) {
      const dfd = $.Deferred();
      setTimeout(() => dfd.resolve(message), ms);
      return dfd.promise();
    }

    $('#btnRunDeferred').on('click', function() {
      $('#defOutput').text('Operations dispatched...');

      // Legacy $.when combining two deferred tasks
      $.when(
        simulateDelay(600, 'Step 1 Ready'),
        simulateDelay(1200, 'Step 2 Ready')
      ).done(function(msg1, msg2) {
        $('#defOutput').html(`✓ ${msg1}<br>✓ ${msg2}<br><strong>All steps complete!</strong>`);
      });
    });
  </script>
</body>
</html>
```

### 6. Output
- After 1.2 seconds, the message displays both completed steps and confirms final completion.

### 7. Practical Use
- Maintaining and refactoring large enterprise jQuery codebases originally written in jQuery 1.x–3.x.
- Coordinating custom animations with asynchronous network requests.

### 8. Common Mistakes
- **Exposing the full Deferred object instead of `.promise()`**: If you return `dfd` directly, any external caller can accidentally call `dfd.resolve()` prematurely. Always return `dfd.promise()`.
- **Using `$.Deferred()` in new greenfield code**: For new modern features, prefer native `new Promise((resolve, reject) => ...)` or `async/await`.

### 9. Best Practices
- In new projects, prefer native ES6 Promises and `Promise.all()`.
- If wrapping legacy jQuery plugins, convert Deferreds to native Promises via `Promise.resolve($.ajax(...))`.

### 10. Exercises
1. Build a custom image pre-loader that wraps image loading in a `$.Deferred()` and resolves when `img.onload` triggers.
2. Refactor a legacy `$.when().done(...)` block into modern `Promise.all().then(...)`.

### 11. Interview Questions & Answers
**Q: How does a jQuery `Deferred` differ from a native JavaScript `Promise`?**  
**A:**  
1. A native `Promise` is resolved from inside its constructor executor function (`new Promise((resolve, reject) => ...)`).  
2. A jQuery `Deferred` is an object whose resolution methods (`dfd.resolve()`, `dfd.reject()`) exist on the instance and can be invoked from outside the function.  
3. Calling `dfd.promise()` creates a restricted object that strips away the resolution methods, making it behave like a read-only native Promise.

### 12. Mini Project: Asynchronous Asset Preloader
```html
<div style="font-family:sans-serif; max-width:350px;">
  <h4>Asset Preloader</h4>
  <button id="btnPreload">Preload Assets</button>
  <div id="preloadStatus" style="margin-top:8px; font-size:13px;"></div>
</div>

<script>
  function preloadImage(url) {
    const dfd = $.Deferred();
    const img = new Image();
    img.onload = () => dfd.resolve(url);
    img.onerror = () => dfd.reject(url);
    img.src = url;
    return dfd.promise();
  }

  $('#btnPreload').on('click', function() {
    $('#preloadStatus').text('Preloading images in parallel...');

    const p1 = preloadImage('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=100');
    const p2 = preloadImage('https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=100');

    $.when(p1, p2)
      .done(function(url1, url2) {
        $('#preloadStatus').html(`✓ All assets loaded successfully!`);
      })
      .fail(function(failedUrl) {
        $('#preloadStatus').html(`<span style="color:red;">✕ Failed to load: ${failedUrl}</span>`);
      });
  });
</script>
```
