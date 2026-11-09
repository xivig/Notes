# JavaScript Mastery & Reference Guide

A structured, code-first curriculum and reference manual covering JavaScript from core runtime semantics to modern ES2024+ asynchronous architecture.

---

## Curriculum & Module Map

| # | Topic File | Core Concepts Covered |
|---|---|---|
| **01** | [`1.introduction.js`](1.introduction.js) | IIFE variants (`(function(){})()`, `+function(){}()`), Classic Module Pattern, private state. |
| **02** | [`2.intro-notes.js`](2.intro-notes.js) | Primitive types, reference types, type coercion, equality checks (`==` vs `===`). |
| **03** | [`3.variable.js`](3.variable.js) | `var` vs `let` vs `const`, Temporal Dead Zone (TDZ), block vs function scoping. |
| **04** | [`4.loop.js`](4.loop.js) | `for`, `for...in` (object keys), `for...of` (iterables), `while`, `do...while`. |
| **05** | [`5.objectCreation.js`](5.objectCreation.js) | Object literals, `Object.create()`, factory functions, constructor functions, ES6 `class`. |
| **06** | [`6.hoisting.js`](6.hoisting.js) | Variable declaration vs initialization hoisting, function declaration vs expression hoisting. |
| **07** | [`7.functions.js`](7.functions.js) | First-class functions, parameters, `arguments` object, rest parameters (`...args`), arrow functions. |
| **07a**| [`7a.scope.js`](7a.scope.js) | Global scope, function scope, lexical scope, scope chaining. |
| **07b**| [`7b.closure.js`](7b.closure.js) | Closures, data privacy, memoization, state preservation across function invocations. |
| **07c**| [`7c.constructor.js`](7c.constructor.js) | `new` keyword mechanics, constructor prototype assignment, instance creation. |
| **07d**| [`7d.call-apply-bind.js`](7d.call-apply-bind.js) | Explicit `this` binding: `call()` (comma args), `apply()` (array args), `bind()` (currying/preset). |
| **07e**| [`7e.prototype.js`](7e.prototype.js) | Prototype chain (`__proto__`), `Object.getPrototypeOf()`, prototypal inheritance vs class syntax. |
| **07f**| [`7f.higher-order-function.js`](7f.higher-order-function.js)| Functions accepting or returning functions, predicate functions, functional composition. |
| **07g**| [`7g.callbacks.js`](7g.callbacks.js) | Synchronous vs asynchronous callbacks, callback hell, inversion of control. |
| **08** | [`8.array.js`](8.array.js) | Array creation, indexing, length manipulation, sparse arrays, multidimensional arrays. |
| **08a**| [`8a.array-methods.js`](8a.array-methods.js) | `map`, `filter`, `reduce`, `find`, `some`, `every`, `flat`, `flatMap`, `toSorted`. |
| **08b**| [`8b.array-object.js`](8b.array-object.js) | Array-like objects (`arguments`, `NodeList`), converting via `Array.from()` and spread `[...]`. |
| **09** | [`9.asynchronous.js`](9.asynchronous.js) | The JavaScript Event Loop, Call Stack, Web APIs, Microtask Queue vs Macrotask Queue. |
| **09a**| [`9a.setTimeout.js`](9a.setTimeout.js) | Timers, `setInterval`, `clearTimeout`, zero-delay timeouts (`setTimeout(fn, 0)`), debounce/throttle. |
| **09b**| [`9b.promise.js`](9b.promise.js) | `new Promise`, `.then()`, `.catch()`, `.finally()`, `Promise.all()`, `allSettled()`, `race()`, `async/await`. |
| **09c**| [`9c.ajax.js`](9c.ajax.js) | Modern `fetch()`, status handling (`response.ok`), JSON payloads, `AbortController`, legacy XHR. |
| **10** | [`design-pattern.js`](design-pattern.js) | Singleton, Factory, Observer/Pub-Sub, Module, and Revealing Module patterns. |
| **11** | [`generator.js`](generator.js) | Generator functions (`function*`), `yield`, custom iterators, lazy sequence evaluation. |
| **12** | [`object.js`](object.js) | Property descriptors, getters/setters, `Object.keys`, `values`, `entries`, `assign`, spread. |
| **13** | [`oop-javascript.js`](oop-javascript.js) | Encapsulation, inheritance, polymorphism, private class fields (`#field`), static methods. |
| **14** | [`ProtectingObjectsModification.js`](ProtectingObjectsModification.js) | `Object.preventExtensions()`, `Object.seal()`, `Object.freeze()`, deep freeze utility. |
| **15** | [`Generic-object-meyhods.md`](Generic-object-meyhods.md) | Comprehensive reference on Object static methods and utility operations. |

---

## Modern JavaScript Quick Tips (ES6 – ES2024+)

### 1. Optional Chaining (`?.`) & Nullish Coalescing (`??`)
```javascript
// Safely access deeply nested properties without TypeError:
const street = user?.address?.street ?? 'Default Street';

// Nullish Coalescing (??) only checks for null or undefined (preserves 0 and false):
const port = config.port ?? 3000; // If port is 0, keeps 0!
```

### 2. Object & Array Destructuring with Defaults
```javascript
const { name, role = 'Subscriber', profile: { avatar } = {} } = userData;
const [primaryColor, secondaryColor, ...otherColors] = themePalette;
```

### 3. Modern Array Non-Mutating Methods
```javascript
const original = [3, 1, 4, 1, 5];

// ES2023+ safe methods that return a new array instead of mutating in place:
const sorted = original.toSorted((a, b) => a - b);
const reversed = original.toReversed();
const spliced = original.toSpliced(1, 2); // Removes 2 items at index 1
```
