// @ts-check
/**
 * ============================================================================
 * JSDoc & TypeScript Type-Checking in Vanilla JavaScript
 * ============================================================================
 * 
 * TypeScript provides static type-safety, but setting up build tools (tsc,
 * tsconfig, bundling, source maps) introduces overhead.
 * 
 * With `// @ts-check` and standard JSDoc comments, you can get 100% of TypeScript's
 * static type-checking, autocompletion, refactoring safety, and inline documentation
 * directly in native vanilla JavaScript files with ZERO build step!
 * 
 * Key Concepts Covered:
 * 1. Enabling `// @ts-check` for Native Type Verification
 * 2. Basic Type Annotations (`@type`, `@param`, `@returns`)
 * 3. Defining Complex Objects via `@typedef` and `@property`
 * 4. Generic Functions with `@template`
 * 5. Typed Callbacks (`@callback`)
 * 6. Enums (`@enum`) & Deprecations (`@deprecated`)
 * 7. Importing External Types (`import('package').Type`)
 */

console.log('--- JSDoc & TypeScript Type Checking in Vanilla JS ---');

// ============================================================================
// 1. BASIC TYPE ANNOTATIONS (@type, @param, @returns)
// ============================================================================

/**
 * @type {string | number}
 */
let userIdentifier = 'usr_9981';
userIdentifier = 42; // Valid (matches union)
// userIdentifier = true; // Error if @ts-check is active: Type 'boolean' is not assignable to type 'string | number'.

/**
 * Calculates total invoice sum with tax and optional discount.
 * 
 * @param {number} subtotal - The base price before tax.
 * @param {number} taxRate - Tax rate represented as decimal (e.g., 0.08 for 8%).
 * @param {number} [discount=0] - Optional discount amount subtracted from subtotal.
 * @returns {number} The calculated final total price.
 * @throws {TypeError} Thrown if subtotal or taxRate are negative.
 */
function calculateInvoiceTotal(subtotal, taxRate, discount = 0) {
  if (subtotal < 0 || taxRate < 0) {
    throw new TypeError('Subtotal and tax rate must be non-negative numbers.');
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  return taxableAmount * (1 + taxRate);
}

const total = calculateInvoiceTotal(100, 0.10, 10);
console.log('Invoice total calculated:', `$${total.toFixed(2)}`); // $99.00


// ============================================================================
// 2. MODELING COMPLEX DOMAIN OBJECTS (@typedef & @property)
// ============================================================================

/**
 * @typedef {'admin' | 'editor' | 'viewer'} UserRole
 */

/**
 * Represents an authenticated user in the platform.
 * 
 * @typedef {Object} UserAccount
 * @property {number} id - Unique primary key
 * @property {string} username - User login handle
 * @property {string} email - Verified electronic mail address
 * @property {UserRole} role - Platform authorization privilege
 * @property {boolean} isActive - Account activation status
 * @property {string[]} [permissions] - Optional array of granular permission strings
 * @property {Date} createdAt - Timestamp when record was created
 */

/**
 * Creates and normalizes a UserAccount instance.
 * 
 * @param {string} username
 * @param {string} email
 * @param {UserRole} [role='viewer']
 * @returns {UserAccount}
 */
function createUser(username, email, role = 'viewer') {
  return {
    id: Math.floor(Math.random() * 10000),
    username,
    email,
    role,
    isActive: true,
    permissions: role === 'admin' ? ['manage_users', 'publish_all'] : ['read_only'],
    createdAt: new Date()
  };
}

const newUser = createUser('ada_lovelace', 'ada@engine.org', 'admin');
console.log('Created User Account:', newUser.username, 'Role:', newUser.role);


// ============================================================================
// 3. GENERICS IN VANILLA JS (@template)
// ============================================================================

/**
 * Generic utility function that returns the first element of any typed array.
 * Notice the use of `@template T` to declare the generic parameter.
 * 
 * @template T
 * @param {T[]} array - An array of elements of type T.
 * @returns {T | undefined} The first element, or undefined if empty.
 */
function getFirstElement(array) {
  return array[0];
}

// In modern IDEs (VS Code), hovering over `firstNum` displays `number | undefined`:
const firstNum = getFirstElement([10, 20, 30]);

// Hovering over `firstStr` displays `string | undefined`:
const firstStr = getFirstElement(['alpha', 'beta', 'gamma']);

console.log('First number:', firstNum);
console.log('First string:', firstStr);


// ============================================================================
// 4. TYPED CALLBACKS (@callback)
// ============================================================================

/**
 * Callback predicate used for validating items.
 * 
 * @callback ItemValidator
 * @param {UserAccount} user - The user account under inspection.
 * @param {number} index - Index in collection.
 * @returns {boolean} True if the user passes validation.
 */

/**
 * Filters users using a typed predicate callback.
 * 
 * @param {UserAccount[]} users
 * @param {ItemValidator} predicate
 * @returns {UserAccount[]}
 */
function filterUsers(users, predicate) {
  return users.filter(predicate);
}

const activeAdmins = filterUsers([newUser], (u) => u.isActive && u.role === 'admin');
console.log('Active admins count:', activeAdmins.length);


// ============================================================================
// 5. ENUMS & DEPRECATION (@enum, @deprecated)
// ============================================================================

/**
 * HTTP Status Codes Enum
 * @enum {number}
 */
const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
};

/**
 * Legacy authentication endpoint.
 * 
 * @deprecated Use `loginWithOAuth2()` instead. Will be removed in version 3.0.
 * @param {string} username
 * @param {string} password
 * @returns {boolean}
 */
function legacyLogin(username, password) {
  console.warn('Warning: legacyLogin is deprecated.');
  return Boolean(username && password);
}

console.log('HTTP OK status code:', HttpStatus.OK);
legacyLogin('admin', '1234');


// ============================================================================
// 6. EXTERNAL TYPE IMPORTS
// ============================================================================

/**
 * You can even import types from Node.js standard modules or third-party packages:
 * 
 * @type {import('node:fs').Stats | null}
 */
let fileStats = null;
console.log('JSDoc external type import configured (Stats):', fileStats);

console.log('\n✓ JSDoc enables enterprise-grade type safety with zero compilation!');
