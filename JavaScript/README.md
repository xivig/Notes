# JavaScript Mastery & Reference Guide

A structured, code-first curriculum and reference manual covering JavaScript from core runtime semantics to modern ES2024+ asynchronous architecture.

---

## 🚀 Quick Reference
* **[Developer Cheat Sheet](DEVELOPER-CHEATSHEET.md)**: Array method decision matrix, Equality comparison matrix (`==` vs `===` vs `Object.is`), Type-checking helpers, and Top 10 Common Gotchas with fixes.

---

## 📑 Curriculum & Module Map

| # | Topic File | Core Concepts Covered |
|---|---|---|
| **01** | [`1.introduction.js`](1.introduction.js) | IIFE variants (`(function(){})()`, `+function(){}()`), Classic Module Pattern, private state. |
| **02** | [`2.intro-notes.js`](2.intro-notes.js) | Primitive types, reference types, type coercion, equality checks (`==` vs `===`). |
| **03** | [`3.variable.js`](3.variable.js) | `var` vs `let` vs `const`, Temporal Dead Zone (TDZ), block vs function scoping. |
| **04** | [`4.loop.js`](4.loop.js) | `for`, `for...in` (object keys), `for...of` (iterables), `while`, `do...while`. |
| **05** | [`5.objectCreation.js`](5.objectCreation.js) | Object literals, `Object.create()`, factory functions, constructor functions, ES6 `class`. |
| **06** | [`6.hoisting.js`](6.hoisting.js) | Variable declaration vs initialization hoisting, function declaration vs expression hoisting. |
| **07** | [`7.functions.js`](7.functions.js) | First-class functions, parameters, `arguments` object, rest parameters (`...args`), arrow functions. |
| **07a**| [`7a.scope.js`](7a.scope.js) | Global scope, function scope, lexical environment, scope chaining, variable shadowing. |
| **07b**| [`7b.closure.js`](7b.closure.js) | Closures, data privacy, memoization, state preservation across function invocations. |
| **07c**| [`7c.constructor.js`](7c.constructor.js) | `new` keyword mechanics, constructor prototype assignment, instance creation. |
| **07d**| [`7d.call-apply-bind.js`](7d.call-apply-bind.js) | Explicit `this` binding: `call()` (comma args), `apply()` (array args), `bind()` (currying/preset). |
| **07e**| [`7e.prototype.js`](7e.prototype.js) | Prototype chain (`__proto__`), `Object.getPrototypeOf()`, prototypal inheritance vs class syntax. |
| **07f**| [`7f.higher-order-function.js`](7f.higher-order-function.js)| Functions accepting or returning functions, predicate functions, functional composition. |
| **07g**| [`7g.callbacks.js`](7g.callbacks.js) | Synchronous vs asynchronous callbacks, callback hell, inversion of control. |
| **08** | [`8.array.js`](8.array.js) | Array creation, indexing, length manipulation, sparse arrays, multidimensional arrays. |
| **08a**| [`8a.array-methods.js`](8a.array-methods.js) | Complete guide: `map`, `filter`, `reduce`, `findLast`, `flat`, `flatMap`, ES2023 `toSorted`, `toReversed`, `toSpliced`, `with`, `at`, and ES2024 `Object.groupBy`. |
| **08b**| [`8b.array-object.js`](8b.array-object.js) | Array-like objects (`arguments`, `NodeList`), converting via `Array.from()` and spread `[...]`. |
| **09** | [`9.asynchronous.js`](9.asynchronous.js) | The JavaScript Event Loop, Call Stack, Web APIs, Microtask Queue vs Macrotask Queue. |
| **09a**| [`9a.setTimeout.js`](9a.setTimeout.js) | Timers, `setInterval`, `clearTimeout`, zero-delay timeouts (`setTimeout(fn, 0)`), debounce/throttle. |
| **09b**| [`9b.promise.js`](9b.promise.js) | `new Promise`, `.then()`, `.catch()`, `.finally()`, `Promise.all()`, `allSettled()`, `race()`, `async/await`. |
| **09c**| [`9c.ajax.js`](9c.ajax.js) | Modern `fetch()`, status handling (`response.ok`), JSON payloads, `AbortController`, legacy XHR. |
| **10** | [`10.modules-esm-cjs.js`](10.modules-esm-cjs.js) | ES Modules (`import`/`export`, named, default, dynamic `import()`, `import.meta`) vs CommonJS (`module.exports`, `require`), live bindings, top-level await. |
| **11** | [`11.collections-map-set.js`](11.collections-map-set.js) | Keyed Collections: `Map` vs Object, `Set` deduplication, ES2024 Set methods (`union`, `intersection`, `difference`), `WeakMap` & `WeakSet` garbage-collection safety. |
| **12** | [`12.modern-es-features.js`](12.modern-es-features.js) | Essential ES2020–ES2024 features: Optional chaining (`?.`), Nullish coalescing (`??`), Logical assignments (`??=`, `||=`, `&&=`), `structuredClone()`, BigInt, `Object.hasOwn()`, `Promise.withResolvers()`. |
| **13** | [`13.error-handling.js`](13.error-handling.js) | Defensive programming: `try/catch/finally`, custom error hierarchy extending `Error`, ES2022 Error Causes (`{ cause }`), safe result tuples `[err, data]`. |
| **14** | [`14.regex-mastery.js`](14.regex-mastery.js) | Regular Expressions: Flags (`g`, `i`, `m`, `s`, `u`, `y`, `d`, `v`), lookaheads/lookbehinds (`(?<=...)`), named groups (`(?<name>...)`), `matchAll`, input sanitization. |
| **15** | [`15.browser-storage-web-apis.js`](15.browser-storage-web-apis.js)| `localStorage`, `sessionStorage`, Cookies, IndexedDB, `URL` & `URLSearchParams`, `AbortController` cancellation, `Blob`/`File`, Web Workers. |
| **16** | [`16.jsdoc-and-typescript-types.js`](16.jsdoc-and-typescript-types.js)| Static type-checking in vanilla JS without build tools: `// @ts-check`, `@type`, `@param`, `@returns`, `@typedef`, `@template` (Generics), and `@enum`. |
| **17** | [`generator.js`](generator.js) | Iterators & Generator functions (`function*`), `yield`, `yield*`, bi-directional data flow with `next(val)`, `throw()`, state machines, async generators (`for await...of`). |
| **18** | [`object.js`](object.js) | Property descriptors, getters/setters, `Object.keys`, `values`, `entries`, `assign`, spread. |
| **19** | [`oop-javascript.js`](oop-javascript.js) | Encapsulation, inheritance, polymorphism, private class fields (`#field`), static methods. |
| **20** | [`ProtectingObjectsModification.js`](ProtectingObjectsModification.js) | `Object.preventExtensions()`, `Object.seal()`, `Object.freeze()`, deep freeze utility. |
| **21** | [`Generic-object-meyhods.md`](Generic-object-meyhods.md) | Comprehensive reference on Object static methods and utility operations. |
| **22** | [`design-pattern.js`](design-pattern.js) | Singleton, Factory, Observer/Pub-Sub, Module, and Revealing Module patterns. |

---

## Modern JavaScript Quick Tips (ES6 – ES2024+)

### 1. Optional Chaining (`?.`) & Nullish Coalescing (`??`)
```javascript
// Safely access deeply nested properties without TypeError:
const street = user?.address?.street ?? 'Default Street';

// Nullish Coalescing (??) only checks for null or undefined (preserves 0 and false):
const port = config.port ?? 3000; // If port is 0, keeps 0!
```

### 2. Modern Non-Mutating Array Methods (ES2023+)
```javascript
const original = [3, 1, 4, 1, 5];

// Safe methods that return a new array instead of mutating in place:
const sorted   = original.toSorted((a, b) => a - b); // [1, 1, 3, 4, 5]
const reversed = original.toReversed();              // [5, 1, 4, 1, 3]
const spliced  = original.toSpliced(1, 2);           // [3, 1, 5]
const replaced = original.with(0, 99);               // [99, 1, 4, 1, 5]
```

### 3. Native Deep Cloning (`structuredClone`)
```javascript
const state = { createdAt: new Date(), tags: new Set(['admin']), meta: { id: 1 } };
const cloned = structuredClone(state); // Completely independent deep copy!
```

### 4. Zero-Build Type-Safety with JSDoc (`// @ts-check`)
```javascript
// @ts-check
/**
 * @param {string} username
 * @param {number} [timeout=1000]
 * @returns {Promise<boolean>}
 */
async function authenticate(username, timeout = 1000) {
  // Instant IDE autocompletion & type checking with zero build step!
  return true;
}
```
