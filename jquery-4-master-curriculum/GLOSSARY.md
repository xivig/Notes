# 📖 Modern jQuery 4.0 Technical Glossary

An authoritative A–Z dictionary defining foundational, advanced, and internal terms used throughout the jQuery 4.0 ecosystem.

---

### A
- **AJAX (Asynchronous JavaScript and XML)**: A collection of web technologies used to send and receive data from a server in the background without reloading the complete browser webpage.
- **Animation Queue**: An internal FIFO (First-In, First-Out) list maintained by jQuery on DOM elements to sequence animations sequentially. By default named `'fx'`.
- **Attribute vs. Property**: An HTML *attribute* is the initial string value specified in the markup tag (accessed via `.attr()`). A DOM *property* is the live, dynamic JavaScript object property on the node (accessed via `.prop()`, e.g. `checked`, `disabled`, `selectedIndex`).

### B
- **Bridge Pattern**: A plugin architecture pattern where calling a plugin with a string parameter (`$el.myWidget('open')`) locates the existing instance stored in `.data()` and calls that method, returning the method's result rather than breaking chainability.
- **Bubbling (Event Bubbling)**: The phase of the W3C DOM event lifecycle where an event triggered on a leaf element propagates upwards through its parent ancestor nodes to `document` and `window`.

### C
- **Chaining**: A design pattern where methods return the jQuery object collection (`return this`), allowing multiple operations to be linked in a single statement: `$('#card').hide().addClass('active').fadeIn();`.
- **Content Security Policy (CSP)**: An HTTP header / security standard enabling site administrators to restrict the resources (scripts, styles, images) that browsers are permitted to load and execute. jQuery 4.0 fully complies with strict CSP rules.

### D
- **Deferred Object (`$.Deferred`)**: A chainable utility object created via `$.Deferred()` that can register multiple callbacks into callback queues, invoke callback queues, and relay the success or failure state of any synchronous or asynchronous function.
- **Delegated Event**: An event listener bound to a permanent parent container that intercepts events bubbling up from present or future child elements matching a selector filter.
- **Detach (`.detach()`)**: A method that removes elements from the DOM while preserving all attached jQuery event listeners and cached `.data()`, allowing elements to be re-inserted later without losing state.

### E
- **ES Modules (ESM)**: The official ECMAScript standard module specification (`import $ from 'jquery'`). In jQuery 4.0, the core source and package distribution natively use ES Modules.
- **Event Namespacing**: Suffixing an event name with dot notation (e.g. `'click.modal'`) to allow selective unbinding (`$el.off('click.modal')`) without affecting other listeners of the same type.

### F
- **FX**: The internal animation engine and queue identifier in jQuery responsible for scheduling frame updates and interpolating CSS values.

### I
- **Implicit Iteration**: jQuery's automatic application of a method across *every* element in a wrapped collection without requiring manual loops. For instance, `$('p').addClass('lead')` adds the class to every paragraph simultaneously.

### J
- **`jqXHR` (jQuery XMLHttpRequest)**: An enhanced wrapper around the browser's native `XMLHttpRequest` returned by `$.ajax()`. It normalizes cross-browser differences and implements the Promise/A+ interface.

### L
- **Layout Thrashing (Forced Synchronous Layout)**: A performance anti-pattern where JavaScript repeatedly alternates between mutating the DOM (writing) and querying geometry (reading `.width()`, `.offset()`), forcing the browser to recalculate layouts multiple times per frame.

### N
- **`noConflict()` (`jQuery.noConflict()`)**: A method that relinquishes jQuery's control of the global `$` alias, restoring whatever variable owned `$` prior to jQuery loading. Essential in WordPress and mixed-library environments.

### P
- **Promise/A+**: An open standard for sound, interoperable JavaScript promises. In jQuery 4.0, `jqXHR` objects and Deferred promises fully adhere to Promise/A+, enabling seamless integration with native `async` / `await` and `Promise.all()`.

### S
- **Sizzle**: The standalone selector engine originally created by John Resig that powered jQuery selector queries from jQuery 1.3 through 3.x. **Officially retired in jQuery 4.0**, replaced by direct native calls to `document.querySelectorAll()`.

### T
- **Trusted Types**: A modern browser security API that prevents DOM-based Cross-Site Scripting (DOM XSS) by requiring values passed into dangerous injection sinks (like `innerHTML`) to be wrapped in verified policy objects. Supported natively in jQuery 4.0.

### U
- **Unwrapping**: Extracting raw native DOM elements from a jQuery collection using array index notation (`$el[0]`) or the `.get()` method (`$el.get(0)`).

### X
- **XSS (Cross-Site Scripting)**: A client-side code injection vulnerability where malicious JavaScript scripts are injected into trusted websites. Prevented in jQuery by using `.text()` instead of `.html()` for untrusted user inputs.
