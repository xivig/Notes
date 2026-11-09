# ⚡ JavaScript Mastery Curriculum & Reference Manual

A comprehensive, code-first curriculum covering JavaScript from engine fundamentals and lexical scope to modern ES2024+ asynchronous architecture, design patterns, and zero-build static type checking.

---

## 🚀 Quick Navigation & Resources

* 📘 **[Comprehensive JavaScript Tutorial](TUTORIAL.md)**: An all-in-one, deep-dive guide synthesizing all 34 modules with architecture diagrams, code walkthroughs, and modern best practices.
* ⚡ **[Developer Cheat Sheet](DEVELOPER-CHEATSHEET.md)**: Fast lookups for Array Methods (mutating vs non-mutating), Equality Matrices (`==` vs `===` vs `Object.is`), Type-Checking Recipes, and the Top 10 JavaScript Pitfalls.
* 🗂️ **Curriculum Structure**: 34 sequentially numbered modules across 6 pedagogical phases. Every file is standalone, fully annotated, and runnable with Node.js or in modern browser consoles.

---

## 📑 Complete Curriculum Syllabus

```
Phase 1: Language Foundations & Lexical Mechanics   (Modules 01 - 05)
Phase 2: Functions, Scopes, Closures & Execution    (Modules 06 - 11)
Phase 3: Objects, Prototypes & Class OOP            (Modules 12 - 18)
Phase 4: Arrays & Modern Keyed Collections          (Modules 19 - 22)
Phase 5: Asynchronous Architecture & Iterators      (Modules 23 - 27)
Phase 6: Modern ES2024+, Web APIs & Architecture    (Modules 28 - 34)
```

---

### Phase 1: Language Foundations & Lexical Mechanics

| Module | File Link | Focus & Core Concepts |
|---|---|---|
| **01** | [`01.introduction.js`](01.introduction.js) | **IIFE Variants & Encapsulation**: Classic Immediately Invoked Function Expressions (`(function(){})()`, `+function(){}()`), the Classic Module Pattern, private variable state, and global namespace pollution prevention. |
| **02** | [`02.data-types-and-coercion.js`](02.data-types-and-coercion.js) | **Data Types & Type Coercion**: Primitive types (string, number, boolean, null, undefined, symbol, bigint) vs Reference types, implicit coercion rules, truthy vs falsy values, and strict vs abstract equality. |
| **03** | [`03.variables-and-tdz.js`](03.variables-and-tdz.js) | **Variables & Temporal Dead Zone**: `var` (function-scoped, hoisted to undefined) vs `let` & `const` (block-scoped, Temporal Dead Zone), immutability of `const` bindings vs object mutations. |
| **04** | [`04.loops-and-iteration.js`](04.loops-and-iteration.js) | **Loops & Iteration Controls**: `for`, `while`, `do...while`, `for...in` (enumerable object property keys), and `for...of` (iterable values), loop labeling, `break`, and `continue`. |
| **05** | [`05.hoisting.js`](05.hoisting.js) | **Hoisting Mechanics**: Variable declaration hoisting vs value initialization, function declarations (hoisted entirely with body) vs function expressions (`let fn = function()` - stays uninitialized in TDZ). |

---

### Phase 2: Functions, Scopes, Closures & Execution

| Module | File Link | Focus & Core Concepts |
|---|---|---|
| **06** | [`06.functions-and-parameters.js`](06.functions-and-parameters.js) | **Functions & Parameters**: First-class citizen functions, default parameters, the legacy `arguments` object, modern rest parameters (`...args`), arrow functions, and lexical `this`. |
| **07** | [`07.scope-and-scope-chain.js`](07.scope-and-scope-chain.js) | **Scopes & The Scope Chain**: Global scope, module scope, function scope, block scope, Lexical Scoping (static resolution), Environment Records, Variable Shadowing, and outer scope lookups. |
| **08** | [`08.closures.js`](08.closures.js) | **Closures & Data Privacy**: Retaining outer lexical environment references across call stack lifecycles, private counter patterns, memoization caches, and function factories. |
| **09** | [`09.callbacks.js`](09.callbacks.js) | **Callbacks & Inversion of Control**: Synchronous callbacks (sorting, mapping) vs asynchronous callbacks (events, timers), Callback Hell ("Pyramid of Doom"), and inversion of control pitfalls. |
| **10** | [`10.higher-order-functions.js`](10.higher-order-functions.js) | **Higher-Order Functions**: Functions that accept functions as arguments or return functions, predicate functions, currying, partial application, and declarative pipeline composition. |
| **11** | [`11.call-apply-bind.js`](11.call-apply-bind.js) | **Explicit `this` Binding**: Dynamic context manipulation using `.call(thisArg, ...args)` (comma-delimited), `.apply(thisArg, [args])` (array-passed), and `.bind(thisArg, ...preset)` (preset currying). |

---

### Phase 3: Objects, Prototypes & Class OOP

| Module | File Link | Focus & Core Concepts |
|---|---|---|
| **12** | [`12.object-creation.js`](12.object-creation.js) | **Object Creation Patterns**: Object literal syntax, Factory Functions, `Object.create(proto)` for explicit prototype linkage, and prototypal delegation. |
| **13** | [`13.object-methods-and-descriptors.js`](13.object-methods-and-descriptors.js) | **Property Descriptors & Object Static APIs**: `Object.defineProperty()`, property flags (`writable`, `enumerable`, `configurable`), getters/setters, `Object.keys()`, `values()`, `entries()`, and `assign()`. |
| **14** | [`14.constructor-functions.js`](14.constructor-functions.js) | **Constructor Functions**: The `new` operator 4-step execution algorithm, constructor prototype assignment (`Constructor.prototype`), instance identity (`instanceof`), and `.constructor`. |
| **15** | [`15.prototypes-and-prototype-chain.js`](15.prototypes-and-prototype-chain.js)| **Prototypes & Prototypal Inheritance**: Prototype chain lookup (`__proto__`), `Object.getPrototypeOf()`, method sharing, prototype pollution security hazards, and prototypal sub-classing. |
| **16** | [`16.oop-and-classes.js`](16.oop-and-classes.js) | **ES6 Classes & Modern OOP**: Class declarations, constructor, `super` keyword, method inheritance, private class fields & methods (`#privateField`), static properties, getters, and setters. |
| **17** | [`17.object-protection-freeze-seal.js`](17.object-protection-freeze-seal.js)| **Object Immutability Controls**: `Object.preventExtensions()` (no new properties), `Object.seal()` (no adding/deleting, properties remain writable), `Object.freeze()` (shallow immutability), and a recursive Deep Freeze utility. |
| **18** | [`18.generic-object-methods.md`](18.generic-object-methods.md) | **Object Reference Manual**: Comprehensive catalog of standard `Object.*` static methods with examples, edge cases, and performance considerations. |

---

### Phase 4: Arrays & Modern Keyed Collections

| Module | File Link | Focus & Core Concepts |
|---|---|---|
| **19** | [`19.arrays-fundamentals.js`](19.arrays-fundamentals.js) | **Array Fundamentals**: Array literals, `new Array()`, indexing, length manipulation, sparse arrays, multidimensional arrays, and basic iteration. |
| **20** | [`20.array-methods-modern.js`](20.array-methods-modern.js) | **Modern Array Methods (ES5 - ES2024)**: Non-mutating methods (`map`, `flatMap`, `filter`, `reduce`, `findLast`, `includes`), **ES2023 Non-mutating methods** (`toSorted`, `toReversed`, `toSpliced`, `with`, `at`), and **ES2024** `Object.groupBy()`. |
| **21** | [`21.array-like-objects.js`](21.array-like-objects.js) | **Array-Like Objects & Iterables**: Handling indexed structures with lengths (`arguments`, `NodeList`, `HTMLCollection`), converting via `Array.from()` and the spread operator (`[...]`). |
| **22** | [`22.collections-map-set.js`](22.collections-map-set.js) | **Keyed Collections (`Map`, `Set`, `WeakMap`, `WeakSet`)**: Map vs Object (any key type, size property), Set deduplication, **ES2024 Native Set Methods** (`union`, `intersection`, `difference`, `symmetricDifference`), and memory-safe `WeakMap`/`WeakSet`. |

---

### Phase 5: Asynchronous Architecture & Iterators

| Module | File Link | Focus & Core Concepts |
|---|---|---|
| **23** | [`23.event-loop-and-asynchronous.js`](23.event-loop-and-asynchronous.js) | **The JavaScript Event Loop**: Single-threaded concurrency, Call Stack, Web APIs / C++ thread pool, Microtask Queue (`Promise`, `queueMicrotask`) vs Macrotask Queue (`setTimeout`, I/O, UI render). |
| **24** | [`24.timers-settimeout-setinterval.js`](24.timers-settimeout-setinterval.js)| **Timers & Rate-Limiting**: `setTimeout`, `setInterval`, zero-delay timeouts (`setTimeout(fn, 0)`), timer drift, Debounce implementation, and Throttle implementation. |
| **25** | [`25.promises-and-async-await.js`](25.promises-and-async-await.js) | **Promises & Async/Await**: States (pending, fulfilled, rejected), `.then()`, `.catch()`, `.finally()`, combinatorial methods (`Promise.all()`, `Promise.allSettled()`, `Promise.race()`, `Promise.any()`), and async/await syntax. |
| **26** | [`26.fetch-api-and-networking.js`](26.fetch-api-and-networking.js) | **Modern Fetch & Networking**: `fetch()` API, response validation (`response.ok`), JSON parsing, headers, request cancellation with `AbortController`, and legacy XMLHttpRequest comparison. |
| **27** | [`27.generators-and-iterators.js`](27.generators-and-iterators.js) | **Generators & Iteration Protocols**: `[Symbol.iterator]`, generator functions (`function*`), `yield`, delegation with `yield*`, bi-directional data passing (`next(val)`), `throw()`, infinite streams, state machines, and **Async Generators (`for await...of`)**. |

---

### Phase 6: Modern JavaScript, Web APIs & Architecture

| Module | File Link | Focus & Core Concepts |
|---|---|---|
| **28** | [`28.modules-esm-and-cjs.js`](28.modules-esm-and-cjs.js) | **Modules: ESM vs. CommonJS**: ES Modules (`export`, `import`, named, default, aliases, re-exports) vs CommonJS (`module.exports`, `require`), live bindings vs value copies, dynamic `import()`, `import.meta.url`, top-level await, and dual-package interop. |
| **29** | [`29.modern-es-features.js`](29.modern-es-features.js) | **Modern ES2020 - ES2024 Features**: Optional chaining (`?.`), nullish coalescing (`??`), logical assignments (`??=`, `\|\|=`, `&&=`), `structuredClone()` deep copying, Numeric Separators (`1_000_000`), `BigInt`, `Object.hasOwn()`, and `Promise.withResolvers()`. |
| **30** | [`30.error-handling-and-causes.js`](30.error-handling-and-causes.js) | **Defensive Error Handling**: `try/catch/finally`, optional catch binding, standard Error types, custom error class hierarchies (`ValidationError`, `NotFoundError`), **ES2022 Error Causes (`{ cause }`)**, and safe Go-style result tuples `const [err, data] = await to(promise)`. |
| **31** | [`31.regular-expressions-mastery.js`](31.regular-expressions-mastery.js)| **Regular Expressions Mastery**: Flags (`g`, `i`, `m`, `s`, `u`, `y`, `d`, `v`), character classes, quantifiers, lookahead (`(?=...)`, `(?!...)`), lookbehind (`(?<=...)`, `(?<!...)`), named groups (`(?<name>...)`), `matchAll()`, and production validation recipes. |
| **32** | [`32.browser-storage-and-web-apis.js`](32.browser-storage-and-web-apis.js)| **Storage & Web APIs**: `localStorage` vs `sessionStorage` vs Cookies vs `IndexedDB`, typed storage wrapper with TTL expiration, `URL` & `URLSearchParams`, `AbortController` cancellation, `Blob`/`File` lifecycle, and Web Workers multi-threading. |
| **33** | [`33.jsdoc-and-type-checking.js`](33.jsdoc-and-type-checking.js) | **Zero-Build Type-Checking with JSDoc**: Enabling `// @ts-check` in plain JavaScript, `@type`, `@param`, `@returns`, `@typedef`, `@property`, Generics with `@template`, `@callback`, `@enum`, and `@deprecated`. |
| **34** | [`34.design-patterns.js`](34.design-patterns.js) | **Architectural Design Patterns**: Practical implementations of Singleton, Factory, Observer / Pub-Sub, Module Pattern, and Revealing Module Pattern. |

---

## 🛠️ How to Execute & Verify the Modules

Every JavaScript file in this curriculum is runnable with Node.js:

```bash
# Run any individual module:
node JavaScript/20.array-methods-modern.js
node JavaScript/27.generators-and-iterators.js
node JavaScript/29.modern-es-features.js

# Compile-check all 34 modules simultaneously:
node -c JavaScript/*.js
```
