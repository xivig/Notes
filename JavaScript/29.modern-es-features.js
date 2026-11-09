/**
 * ============================================================================
 * Modern JavaScript Features: The Essential ES2020 - ES2024+ Guide
 * ============================================================================
 * 
 * ECMAScript evolves with an annual release cadence. This module collects the
 * most impactful modern language features that every contemporary JavaScript
 * developer should use in production.
 * 
 * Key Concepts Covered:
 * 1. Optional Chaining (`?.`, `?.[]`, `?.()`)
 * 2. Nullish Coalescing (`??`) vs. Logical OR (`||`)
 * 3. Logical Assignment Operators (`??=`, `||=`, `&&=`)
 * 4. Native Deep Cloning via `structuredClone()`
 * 5. Numeric Separators & BigInt
 * 6. `Object.hasOwn()` vs. `hasOwnProperty`
 * 7. Modern String Utilities (`replaceAll`, `at`, `padStart`)
 * 8. `Promise.withResolvers()` (ES2024)
 * 9. `Object.groupBy()` & `Map.groupBy()` (ES2024)
 */

// ============================================================================
// 1. OPTIONAL CHAINING (`?.`) (ES2020)
// ============================================================================

console.log('--- 1. Optional Chaining ---');

const userProfile = {
  id: 42,
  personal: {
    name: 'Ada Lovelace',
    contact: {
      email: 'ada@computing.org'
      // phone is undefined
    }
  },
  preferences: {
    notifications: true
  },
  // calculateDiscount method is omitted
};

// 1.1 Property access (short-circuits to undefined if left-hand side is nullish):
const email = userProfile?.personal?.contact?.email;
const phone = userProfile?.personal?.contact?.phone;
const zipCode = userProfile?.address?.postalCode; // Does NOT throw TypeError: Cannot read property of undefined!

console.log('Email:', email);     // 'ada@computing.org'
console.log('Phone:', phone);     // undefined
console.log('Zip Code:', zipCode); // undefined

// 1.2 Bracket notation for dynamic keys or array indices:
const dynamicKey = 'notifications';
console.log('Preference:', userProfile?.preferences?.[dynamicKey]); // true

const list = null;
console.log('Array index access on null:', list?.[0]); // undefined

// 1.3 Function / Method calls:
// Calls function ONLY IF it exists and is callable; returns undefined otherwise:
const discount = userProfile.calculateDiscount?.(100);
console.log('Optional method invocation:', discount); // undefined (does not throw!)


// ============================================================================
// 2. NULLISH COALESCING (`??`) VS. LOGICAL OR (`||`) (ES2020)
// ============================================================================

console.log('\n--- 2. Nullish Coalescing (??) vs Logical OR (||) ---');

/**
 * CRITICAL DISTINCTION:
 * - Logical OR (`||`): Returns right-hand side if left is FALSY:
 *   (null, undefined, 0, false, "", NaN)
 * - Nullish Coalescing (`??`): Returns right-hand side ONLY IF left is NULLISH:
 *   (null or undefined)
 */

const serverSettings = {
  port: 0,             // 0 is valid! (e.g. system-assigned random port)
  maxRetries: 0,       // 0 retries desired
  allowGuests: false,  // false is explicitly chosen
  title: ''            // empty string is explicit
};

// The Classic Bug with ||:
console.log('port with ||:', serverSettings.port || 3000);         // 3000  (BUG! 0 was overridden!)
console.log('guests with ||:', serverSettings.allowGuests || true); // true  (BUG! false was overridden!)

// The Correct Solution with ??:
console.log('port with ??:', serverSettings.port ?? 3000);         // 0     (CORRECT! Preserves 0)
console.log('guests with ??:', serverSettings.allowGuests ?? true); // false (CORRECT! Preserves false)
console.log('title with ??:', serverSettings.title ?? 'Untitled');  // ''    (CORRECT! Preserves "")


// ============================================================================
// 3. LOGICAL ASSIGNMENT OPERATORS (ES2021)
// ============================================================================

console.log('\n--- 3. Logical Assignment Operators ---');

// 3.1 Nullish coalescing assignment (a ??= b): Assigns only if `a` is null or undefined
const appConfig = { timeout: 1000, theme: null };
appConfig.timeout ??= 5000; // Remains 1000
appConfig.theme ??= 'dark'; // Assigned 'dark'
console.log('appConfig after ??= :', appConfig); // { timeout: 1000, theme: 'dark' }

// 3.2 Logical OR assignment (a ||= b): Assigns if `a` is falsy
let userQuery = '';
userQuery ||= 'default_search_query';
console.log('userQuery after ||= :', userQuery); // 'default_search_query'

// 3.3 Logical AND assignment (a &&= b): Assigns only if `a` is truthy
let activeSession = { token: 'xyz' };
activeSession &&= { token: 'new_token', refreshed: true };
console.log('activeSession after &&= :', activeSession);


// ============================================================================
// 4. DEEP CLONING: structuredClone() (ES2022)
// ============================================================================

console.log('\n--- 4. Native Deep Cloning: structuredClone() ---');

/**
 * Historical cloning issues:
 * 1. Spread `{ ...obj }` is SHALLOW (nested references are shared).
 * 2. `JSON.parse(JSON.stringify(obj))` drops Functions, Symbols, transforms Dates to strings,
 *    and CRASHES on circular references!
 * 
 * `structuredClone()` is the modern, native, high-performance deep copy utility.
 */

const complexState = {
  createdAt: new Date('2026-11-09T00:00:00Z'),
  tags: new Set(['admin', 'active']),
  metadata: new Map([['attempts', 3]]),
  coordinates: { x: 10, y: 20 }
};

const deepClone = structuredClone(complexState);

// Verify independence:
deepClone.coordinates.x = 999;
deepClone.tags.add('mutated');

console.log('Original coordinates.x intact:', complexState.coordinates.x); // 10
console.log('Clone coordinates.x modified:', deepClone.coordinates.x);       // 999
console.log('Original Set size:', complexState.tags.size);                  // 2
console.log('Clone Date type preserved:', deepClone.createdAt instanceof Date); // true


// ============================================================================
// 5. NUMERIC SEPARATORS & BigInt (ES2020 / ES2021)
// ============================================================================

console.log('\n--- 5. Numeric Separators & BigInt ---');

// 5.1 Numeric Separators: Underscores improve visual readability of digits
const ONE_BILLION = 1_000_000_000;
const BYTES = 0b1010_0001_1000_0101;
const HEX_COLOR = 0xFF_A5_00;
console.log('One billion value:', ONE_BILLION); // 1000000000

// 5.2 BigInt: Arbitrary precision integers (suffixed with 'n' or via BigInt())
// Standard JS Numbers lose precision beyond Number.MAX_SAFE_INTEGER (2^53 - 1):
const maxSafe = Number.MAX_SAFE_INTEGER;
console.log('Max Safe Integer:', maxSafe); // 9007199254740991
console.log('Precision loss without BigInt:', maxSafe + 1 === maxSafe + 2); // true! (Bug!)

// With BigInt:
const bigNumber = 9007199254740991n;
console.log('Precision preserved with BigInt:', bigNumber + 1n === bigNumber + 2n); // false (Accurate!)


// ============================================================================
// 6. Object.hasOwn() VS. hasOwnProperty (ES2022)
// ============================================================================

console.log('\n--- 6. Object.hasOwn() ---');

/**
 * Why Object.hasOwn() replaces obj.hasOwnProperty():
 * 1. `Object.create(null)` has no prototype, so `obj.hasOwnProperty` throws TypeError.
 * 2. An object might have a custom property named `hasOwnProperty: false`.
 */

const nullProtoObj = Object.create(null);
nullProtoObj.username = 'cipher';

// Unsafe historical way:
// nullProtoObj.hasOwnProperty('username'); // Throws TypeError: nullProtoObj.hasOwnProperty is not a function!

// Safe modern way:
console.log('Object.hasOwn(nullProtoObj, "username"):', Object.hasOwn(nullProtoObj, 'username')); // true
console.log('Object.hasOwn(nullProtoObj, "password"):', Object.hasOwn(nullProtoObj, 'password')); // false


// ============================================================================
// 7. MODERN STRING METHODS
// ============================================================================

console.log('\n--- 7. String Utilities ---');

// 7.1 replaceAll(): Replaces all instances without complex regex flags
const text = 'apple banana apple orange apple';
console.log('replaceAll():', text.replaceAll('apple', 'grape'));
// 'grape banana grape orange grape'

// 7.2 String.prototype.at(): Negative index indexing
const greeting = 'Welcome!';
console.log('Last character (.at(-1)):', greeting.at(-1)); // '!'
console.log('Second-to-last (.at(-2)):', greeting.at(-2)); // 'e'

// 7.3 padStart() & padEnd():
const invoiceId = '42';
console.log('Formatted ID:', invoiceId.padStart(6, '0')); // '000042'


// ============================================================================
// 8. Promise.withResolvers() (ES2024)
// ============================================================================

console.log('\n--- 8. Promise.withResolvers() (ES2024) ---');

/**
 * Solves the awkward closure ceremony when exposing `resolve` and `reject`
 * outside the Promise constructor:
 */
if (typeof Promise.withResolvers === 'function') {
  const { promise, resolve, reject } = Promise.withResolvers();

  promise.then(val => console.log('Promise.withResolvers resolved with:', val));
  resolve('Success payload triggered externally!');
} else {
  // Polyfill reference:
  function withResolversPolyfill() {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
  const { promise, resolve } = withResolversPolyfill();
  promise.then(val => console.log('Polyfill resolved with:', val));
  resolve('Polyfill success payload');
}


// ============================================================================
// 9. Object.groupBy() & Map.groupBy() (ES2024)
// ============================================================================

console.log('\n--- 9. Object.groupBy() (ES2024) ---');

const employees = [
  { name: 'Alice', dept: 'Engineering', tenure: 5 },
  { name: 'Bob', dept: 'Marketing', tenure: 2 },
  { name: 'Charlie', dept: 'Engineering', tenure: 8 },
  { name: 'Diana', dept: 'Design', tenure: 3 }
];

if (typeof Object.groupBy === 'function') {
  const byDept = Object.groupBy(employees, emp => emp.dept);
  console.log('Engineering team:', byDept.Engineering?.map(e => e.name));
  // ['Alice', 'Charlie']
}
