/**
 * ============================================================================
 * JavaScript Modules: ES Modules (ESM) vs. CommonJS (CJS)
 * ============================================================================
 * 
 * Modular JavaScript enables code separation, encapsulation, and dependency
 * management. Historically, the JavaScript ecosystem relied on AMD, UMD, and
 * CommonJS (Node.js). With ES6 (ES2015), ECMAScript introduced the official
 * standardized module system: ES Modules (ESM).
 * 
 * Key Concepts Covered:
 * 1. ES Module Syntax (Named, Default, Re-exports, Namespace)
 * 2. CommonJS Syntax (module.exports, exports, require)
 * 3. Dynamic Imports (`import()`) & Code Splitting
 * 4. `import.meta` & Top-Level Await
 * 5. Architectural Comparison: Live Bindings vs. Value Copies
 * 6. Dual-Module Interoperability Patterns
 */

// ============================================================================
// 1. ES MODULE (ESM) SYNTAX SPECIFICATION
// ============================================================================

/*
--- NAMED EXPORTS & IMPORTS ---
// file: mathUtils.js
export const PI = 3.14159265359;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// Renaming on export:
const internalMultiplier = 1.5;
export { internalMultiplier as multiplier };

// file: app.js
import { PI, add, multiplier as mult } from './mathUtils.js';
console.log(add(10, PI));

--- DEFAULT EXPORTS ---
// Each module can have at most ONE default export:
// file: Logger.js
export default class Logger {
  log(msg) { console.log(`[LOG]: ${msg}`); }
}

// Importing a default export (no curly braces required, naming is flexible):
import CustomLogger from './Logger.js';

--- MIXED EXPORTS ---
// file: userManager.js
export const USER_ROLES = ['admin', 'editor', 'viewer'];
export default function getUser(id) { return { id, role: 'admin' }; }

// Importing mixed exports:
import getUser, { USER_ROLES } from './userManager.js';

--- NAMESPACE IMPORT (IMPORT ALL) ---
import * as MathService from './mathUtils.js';
MathService.add(5, 10);

--- RE-EXPORTING / AGGREGATION (INDEX PATTERN) ---
// file: components/index.js
export { default as Button } from './Button.js';
export { default as Modal } from './Modal.js';
export * from './constants.js'; // Re-exports all named exports
*/


// ============================================================================
// 2. COMMONJS (CJS) SYNTAX (NODE.JS TRADITIONAL)
// ============================================================================

/*
--- EXPORTING IN COMMONJS ---
// file: cjsMath.js
const multiply = (x, y) => x * y;
const divide = (x, y) => {
  if (y === 0) throw new Error('Division by zero');
  return x / y;
};

// Method A: Assigning to module.exports object:
module.exports = {
  multiply,
  divide,
  AUTHOR: 'Xivig'
};

// Method B: Mutating exports shorthand:
// exports.multiply = multiply;
// exports.divide = divide;
// WARNING: Reassigning `exports = ...` breaks the reference to `module.exports`!

--- IMPORTING IN COMMONJS ---
// file: server.js
const { multiply, divide } = require('./cjsMath.js');
console.log(multiply(4, 5));
*/


// ============================================================================
// 3. ARCHITECTURAL COMPARISON: ESM VS. COMMONJS
// ============================================================================

/**
 * +--------------------+----------------------------+---------------------------+
 * | FEATURE            | ES MODULES (ESM)           | COMMONJS (CJS)            |
 * +--------------------+----------------------------+---------------------------+
 * | Loading Mechanism  | Asynchronous / Multi-phase | Synchronous / Single-pass |
 * | Parsing Phase      | Static (Analysed at build) | Dynamic (Evaluated at run)|
 * | Tree-Shaking       | Fully Supported            | Difficult / Limited       |
 * | Variable Bindings  | LIVE BINDINGS (Reflective) | VALUE COPIES (Snapshot)   |
 * | Strict Mode        | Implicitly Enforced        | Opt-in ('use strict')     |
 * | 'this' at Top Level| undefined                  | exports / module.exports  |
 * | __dirname / __file | import.meta.url            | Native Global Variables   |
 * | Top-Level Await    | Native support             | Disallowed (wrap in IIFE) |
 * +--------------------+----------------------------+---------------------------+
 */


// ============================================================================
// 4. THE LIVE BINDING DIFFERENCE (CODE DEMONSTRATION)
// ============================================================================

console.log('--- ESM Live Bindings vs. CommonJS Copies ---');

/**
 * In CommonJS, `require()` returns a shallow copy of values at the moment of export.
 * In ESM, imports are READ-ONLY LIVE REFERENCES to the exporter's internal variables.
 */

// Simulated ESM Live Binding Concept:
const moduleScope = (() => {
  let counter = 0;
  function increment() { counter++; }
  return {
    get counter() { return counter; }, // Live reference accessor
    increment
  };
})();

console.log('Initial counter:', moduleScope.counter); // 0
moduleScope.increment();
console.log('Counter after increment() reflects in consumer:', moduleScope.counter); // 1


// ============================================================================
// 5. DYNAMIC IMPORTS (`import()`) & CONDITIONAL LOADING
// ============================================================================

/**
 * Dynamic `import(specifier)` returns a Promise that resolves to the module namespace.
 * Use cases:
 * - Lazy-loading heavy libraries on user interaction
 * - Conditional feature flags
 * - Internationalization locale packs
 */
async function loadAnalyticsService(userConsented) {
  if (!userConsented) {
    console.log('User declined telemetry. Skipping analytics module load.');
    return;
  }

  try {
    // Dynamic import simulation (in real Node.js/Browser: await import('./analytics.js'))
    console.log('Dynamically importing analytics module...');
    const simulatedModule = await Promise.resolve({
      trackEvent: (name) => console.log(`[Event Tracked]: ${name}`)
    });

    simulatedModule.trackEvent('page_view');
  } catch (err) {
    console.error('Failed to dynamically load module:', err);
  }
}

loadAnalyticsService(true);


// ============================================================================
// 6. `import.meta` & ENVIRONMENT CONTEXT
// ============================================================================

/*
// In an ESM file, `import.meta` provides contextual metadata:
console.log(import.meta.url); 
// Output: 'file:///path/to/project/src/app.js'

// Modern Node.js (v20.11+) equivalents for __dirname and __filename in ESM:
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Directory name in ESM:', __dirname);
*/


// ============================================================================
// 7. DUAL-PACKAGE HAZARD & INTEROPERABILITY RECIPE
// ============================================================================

/**
 * When writing modern Node.js applications that need to consume CommonJS packages
 * from an ES Module context, use `createRequire`:
 */

/*
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// Synchronously load legacy CJS packages:
const legacyPkg = require('some-legacy-commonjs-package');
*/

console.log('\n--- Module Architecture Summary ---');
console.log('✓ Always prefer ES Modules (`import`/`export`) for modern greenfield projects.');
console.log('✓ Use `.mjs` or `"type": "module"` in package.json to activate ESM in Node.js.');
console.log('✓ Use dynamic `import()` for bundle splitting and deferred loading.');
