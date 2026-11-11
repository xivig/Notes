# ⚡ JavaScript Modern Developer Cheat Sheet (ES6 – ES2024+)

An ultra-dense, everyday reference manual for professional JavaScript engineers.

---

## 📑 Quick Navigation
1. [Array Methods Decision Matrix](#1-array-methods-decision-matrix)
2. [Equality & Comparison Matrix](#2-equality--comparison-matrix)
3. [Accurate Type Checking Reference](#3-accurate-type-checking-reference)
4. [Modern ES6–ES2024+ Syntax Quick Card](#4-modern-es6es2024-syntax-quick-card)
5. [Top 10 JavaScript Gotchas & Pitfalls](#5-top-10-javascript-gotchas--pitfalls)

---

## 1. Array Methods Decision Matrix

| What do you want to do? | Use Method | Return Value | Mutates Original? | ES Version |
| :--- | :--- | :--- | :---: | :---: |
| Transform every element | `.map(fn)` | New Array | ❌ No | ES5 |
| Filter elements by condition | `.filter(fn)` | New Array | ❌ No | ES5 |
| Accumulate to single value / group | `.reduce(fn, init)` | Any | ❌ No | ES5 |
| Find first matching element | `.find(fn)` | Element or `undefined` | ❌ No | ES6 |
| Find last matching element | `.findLast(fn)` | Element or `undefined` | ❌ No | ES2023 |
| Find index of first match | `.findIndex(fn)` | `number` (or `-1`) | ❌ No | ES6 |
| Find index of last match | `.findLastIndex(fn)` | `number` (or `-1`) | ❌ No | ES2023 |
| Check if at least ONE matches | `.some(fn)` | `boolean` | ❌ No | ES5 |
| Check if ALL elements match | `.every(fn)` | `boolean` | ❌ No | ES5 |
| Check if element exists by value | `.includes(val)` | `boolean` | ❌ No | ES7 |
| Flatten nested arrays | `.flat(depth)` | New Array | ❌ No | ES2019 |
| Map and flatten by 1 level | `.flatMap(fn)` | New Array | ❌ No | ES2019 |
| **Sort without mutating** | `.toSorted(fn)` | New Array | ❌ **No** | **ES2023** |
| **Reverse without mutating** | `.toReversed()` | New Array | ❌ **No** | **ES2023** |
| **Splice without mutating** | `.toSpliced(start, count, ...items)` | New Array | ❌ **No** | **ES2023** |
| **Replace single index without mutating** | `.with(index, value)` | New Array | ❌ **No** | **ES2023** |
| Access element with negative index | `.at(-1)` | Element or `undefined` | ❌ No | ES2022 |
| Group elements by key (ES2024) | `Object.groupBy(arr, fn)` | Object | ❌ No | **ES2024** |
| Sort in-place | `.sort(fn)` | Same Array | ⚠️ **Yes** | ES1 |
| Reverse in-place | `.reverse()` | Same Array | ⚠️ **Yes** | ES1 |
| Add/remove in-place | `.splice(start, count, ...items)` | Removed items | ⚠️ **Yes** | ES3 |
| Add to end | `.push(...items)` | New length | ⚠️ **Yes** | ES3 |
| Remove from end | `.pop()` | Removed item | ⚠️ **Yes** | ES3 |
| Add to beginning | `.unshift(...items)` | New length | ⚠️ **Yes** | ES3 |
| Remove from beginning | `.shift()` | Removed item | ⚠️ **Yes** | ES3 |

---

## 2. Equality & Comparison Matrix

| Comparison | Abstract (`==`) | Strict (`===`) | SameValue (`Object.is`) | Explanation |
| :--- | :---: | :---: | :---: | :--- |
| `'5' vs 5` | ✅ `true` | ❌ `false` | ❌ `false` | `==` coerces string to number |
| `null vs undefined` | ✅ `true` | ❌ `false` | ❌ `false` | Loosely equal in JS specification |
| `0 vs false` | ✅ `true` | ❌ `false` | ❌ `false` | `false` coerces to `0` |
| `'' vs false` | ✅ `true` | ❌ `false` | ❌ `false` | `''` coerces to `0` |
| `NaN vs NaN` | ❌ `false` | ❌ `false` | ✅ **`true`** | `NaN` is not strictly equal to itself; `Object.is` handles it! |
| `+0 vs -0` | ✅ `true` | ✅ `true` | ❌ **`false`** | `Object.is` distinguishes positive and negative zero |
| `{} vs {}` | ❌ `false` | ❌ `false` | ❌ `false` | Distinct memory references |

> **Best Practice Rule**: Always use `===` by default. Use `Object.is()` when checking for `NaN` or `-0`. Use `== null` ONLY as a shorthand to check for both `null` and `undefined`.

---

## 3. Accurate Type Checking Reference

```javascript
// 1. Primitive vs Object Verification
typeof "hello"           // "string"
typeof 42                // "number"
typeof 10n               // "bigint"
typeof true              // "boolean"
typeof Symbol("id")      // "symbol"
typeof undefined         // "undefined"
typeof function() {}     // "function"

// THE HISTORICAL BUG:
typeof null              // "object" ⚠️ (Historical C-language pointer tag bug)
typeof []                // "object"
typeof new Date()        // "object"

// 2. Reliable Type Checking Helpers:
const isArray  = (v) => Array.isArray(v);
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isNumber = (v) => typeof v === 'number' && !Number.isNaN(v);
const isDate   = (v) => v instanceof Date && !Number.isNaN(v.getTime());

// 3. The Gold Standard (Exact internal [[Class]] tag):
const toType = (v) => Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
toType([])               // "array"
toType(null)             // "null"
toType(/regex/)          // "regexp"
toType(new Map())        // "map"
toType(new Set())        // "set"
toType(new Error())      // "error"
```

---

## 4. Modern ES6–ES2024+ Syntax Quick Card

### 4.1 Optional Chaining (`?.`) & Nullish Coalescing (`??`)
```javascript
// Safe deeply nested access & default fallback:
const street = user?.address?.street ?? 'Default Street';

// Function call if exists:
callback?.(payload);

// Bracket access:
const value = cache?.[dynamicKey];
```

### 4.2 Logical Assignment Operators (`??=`, `||=`, `&&=`)
```javascript
config.timeout ??= 5000; // Assigns 5000 ONLY IF timeout is null or undefined
query ||= 'default';     // Assigns 'default' if query is falsy ('', 0, null)
activeSession &&= refresh(activeSession); // Runs refresh only if activeSession is truthy
```

### 4.3 Native Deep Cloning with `structuredClone()`
```javascript
const original = { date: new Date(), map: new Map([['a', 1]]), nested: { count: 5 } };
const clone = structuredClone(original); // Native deep copy! Preserves Dates, Maps, Sets!
```

### 4.4 ES2024 Set Operations
```javascript
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

setA.union(setB);               // Set(5) { 1, 2, 3, 4, 5 }
setA.intersection(setB);        // Set(1) { 3 }
setA.difference(setB);          // Set(2) { 1, 2 }
setA.symmetricDifference(setB); // Set(4) { 1, 2, 4, 5 }
```

### 4.5 Promise.withResolvers() (ES2024)
```javascript
const { promise, resolve, reject } = Promise.withResolvers();
// Exposes resolve/reject cleanly without wrapping in new Promise((res, rej) => ...)
```

---

## 5. Top 10 JavaScript Gotchas & Pitfalls

### 1. `[10, 2, 5].sort()` evaluates to `[10, 2, 5]`
* **Why**: Array `.sort()` converts numbers to strings by default and compares UTF-16 code units (`'10' < '2'`).
* **Fix**: Always pass a numerical comparator: `arr.sort((a, b) => a - b)`.

### 2. `0.1 + 0.2 !== 0.3` (Floating-Point Precision)
* **Why**: IEEE 754 binary floating-point representation cannot represent fractions like `1/10` and `2/10` with exact precision (`0.30000000000000004`).
* **Fix**: Compare using `Number.EPSILON`:
  ```javascript
  const isEqual = (a, b) => Math.abs(a - b) < Number.EPSILON;
  isEqual(0.1 + 0.2, 0.3); // true
  ```
  Or store financial currencies in cents (integers): `$10.50` -> `1050`.

### 3. `typeof null === 'object'`
* **Why**: An original design defect in JavaScript where values stored type tags in the lower bits of their 32-bit words (`000` meant object, and `null` was represented as NULL pointer `0x00`).
* **Fix**: Check `val === null` directly.

### 4. Object keys are always converted to strings
* **Why**: Plain object keys must be Strings or Symbols. Passing an object converts it to `"[object Object]"`.
  ```javascript
  const a = {}, b = { key: 'b' }, c = { key: 'c' };
  a[b] = 123; // a['[object Object]'] = 123
  a[c] = 456; // a['[object Object]'] = 456 (overwrites!)
  ```
* **Fix**: Use `new Map()` when keys are objects or non-strings.

### 5. `this` binding lost when passing object methods as callbacks
* **Why**: Functions in JavaScript have dynamic `this` based on how they are called, not where they are defined.
  ```javascript
  const btn = { label: 'Click', click() { console.log(this.label); } };
  setTimeout(btn.click, 100); // Logs undefined!
  ```
* **Fix**: Use arrow functions `() => btn.click()` or `.bind(btn)`.

### 6. Modifying an array while iterating over it
* **Why**: Index counters shift during in-place `splice()`, causing elements to be skipped.
* **Fix**: Use `.filter()` to create a new array, or iterate backwards:
  ```javascript
  for (let i = arr.length - 1; i >= 0; i--) { ... }
  ```

### 7. `for...in` traverses prototype properties
* **Why**: `for...in` loops over all enumerable properties, including inherited properties on the prototype chain.
* **Fix**: Use `for (const key of Object.keys(obj))` or `for (const [key, value] of Object.entries(obj))`.

### 8. `parseInt()` without explicit radix
* **Why**: Older engines treated leading zeros (`parseInt('08')`) as octal numbers.
* **Fix**: Always specify base 10: `parseInt(str, 10)`. Or use `Number(str)` for strict parsing.

### 9. Swallowing async errors without await / catch
* **Why**: Unhandled Promise rejections terminate the process in Node.js and trigger silent failures in browsers.
* **Fix**: Always chain `.catch()` or wrap inside `try { await ... } catch (err) { ... }`.

### 10. `JSON.stringify()` drops `undefined`, `Function`, and `Symbol`
* **Why**: JSON specification only supports primitives, arrays, and string-keyed objects.
* **Fix**: Use `structuredClone()` for native in-memory cloning, or provide a custom replacer function.
