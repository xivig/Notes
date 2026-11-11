/**
 * ============================================================================
 * JavaScript Collections: Map, Set, WeakMap, and WeakSet (ES6 - ES2024+)
 * ============================================================================
 * 
 * Prior to ES6, Objects were used as Maps and Arrays were used as Sets.
 * ES6 introduced dedicated collection structures optimized for key-value
 * associations, uniqueness guarantees, and garbage-collection safety.
 * 
 * Key Concepts Covered:
 * 1. Map vs. Plain Object (Key types, Performance, Iteration)
 * 2. Set (Uniqueness, Deduplication, Fast O(1) membership checks)
 * 3. Modern ES2024 Set Composition Methods (union, intersection, difference, etc.)
 * 4. WeakMap (Memory-safe DOM & private metadata storage)
 * 5. WeakSet (Object tagging and cycle detection)
 */

// ============================================================================
// 1. MAP: KEYED DATA COLLECTION
// ============================================================================

/**
 * Key Differences: Map vs. Object
 * - Keys: Object keys must be Strings or Symbols; Map keys can be ANY type (objects, functions, NaN).
 * - Key Ordering: Map iterates in exact insertion order.
 * - Size: Map has a constant-time `.size` property; Object requires `Object.keys(obj).length`.
 * - Performance: Map is optimized for frequent additions and deletions.
 */

console.log('--- 1. Map Operations ---');

const userRoles = new Map();

const adminUser = { id: 1, username: 'cyber_admin' };
const guestUser = { id: 2, username: 'anonymous_visitor' };
const systemHandler = function() {};

// Setting values with different key types:
userRoles.set(adminUser, 'SUPER_ADMIN');
userRoles.set(guestUser, 'READ_ONLY');
userRoles.set(systemHandler, 'SYSTEM_DAEMON');
userRoles.set('totalUsers', 2);

// Retrieving values:
console.log('Admin role:', userRoles.get(adminUser)); // 'SUPER_ADMIN'
console.log('Total entries (.size):', userRoles.size); // 4

// Checking key existence:
console.log('Has guestUser:', userRoles.has(guestUser)); // true

// Iterating over Map entries:
console.log('\nMap Iteration:');
for (const [key, role] of userRoles.entries()) {
  const label = typeof key === 'object' ? key.username : (typeof key === 'function' ? 'function()' : key);
  console.log(`Key: [${label}] => Role: [${role}]`);
}

// Map <-> Object Conversion:
const configObj = { apiHost: 'https://api.xivig.org', timeout: 5000, retry: true };

// Object to Map:
const configMap = new Map(Object.entries(configObj));
console.log('Object converted to Map:', configMap.get('apiHost'));

// Map to Object:
const backToObject = Object.fromEntries(configMap);
console.log('Map converted back to Object:', backToObject);


// ============================================================================
// 2. SET: UNIQUE VALUE COLLECTION
// ============================================================================

/**
 * A Set stores unique values of any type.
 * Adding an existing value is a no-op (uses SameValueZero comparison).
 */

console.log('\n--- 2. Set Operations ---');

const rawTags = ['javascript', 'web', 'node', 'javascript', 'css', 'web', 'es2024'];

// 2.1 Fast Array Deduplication:
const uniqueTags = new Set(rawTags);
console.log('Deduplicated tags Set size:', uniqueTags.size); // 5
console.log('Converted back to Array:', [...uniqueTags]);    // ['javascript', 'web', 'node', 'css', 'es2024']

// 2.2 Adding, checking, deleting:
uniqueTags.add('typescript');
console.log('Has typescript:', uniqueTags.has('typescript')); // true

uniqueTags.delete('css');
console.log('Has css after delete:', uniqueTags.has('css'));   // false


// ============================================================================
// 3. ES2024 NEW SET COMPOSITION METHODS
// ============================================================================

/**
 * ES2024 officially adds native mathematical set operations:
 * - union(other)
 * - intersection(other)
 * - difference(other)
 * - symmetricDifference(other)
 * - isSubsetOf(other)
 * - isSupersetOf(other)
 * - isDisjointFrom(other)
 */

console.log('\n--- 3. Set Operations (ES2024 Standard) ---');

const frontEndSkills = new Set(['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React']);
const backEndSkills  = new Set(['Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'JavaScript']);

// Check if modern methods are natively supported by the current Node runtime,
// otherwise provide a reference polyfill implementation:
const hasNativeSetMethods = typeof Set.prototype.union === 'function';

if (hasNativeSetMethods) {
  // 3.1 Union: All elements from both sets
  console.log('Union:', [...frontEndSkills.union(backEndSkills)]);

  // 3.2 Intersection: Elements common to both sets
  console.log('Intersection (Full-stack overlap):', [...frontEndSkills.intersection(backEndSkills)]);
  // ['JavaScript', 'TypeScript']

  // 3.3 Difference: Elements in frontEnd but not in backEnd
  console.log('Difference (FrontEnd only):', [...frontEndSkills.difference(backEndSkills)]);
  // ['HTML', 'CSS', 'React']

  // 3.4 Symmetric Difference: Elements in either set, but not both
  console.log('Symmetric Difference:', [...frontEndSkills.symmetricDifference(backEndSkills)]);

  // 3.5 Subset / Superset / Disjoint checks:
  const subSkillSet = new Set(['JavaScript', 'React']);
  console.log('subSkillSet.isSubsetOf(frontEndSkills):', subSkillSet.isSubsetOf(frontEndSkills)); // true
  console.log('frontEndSkills.isDisjointFrom(new Set(["Python"])):', frontEndSkills.isDisjointFrom(new Set(['Python']))); // true
} else {
  // Portable Polyfill implementations:
  const union = (a, b) => new Set([...a, ...b]);
  const intersection = (a, b) => new Set([...a].filter(x => b.has(x)));
  const difference = (a, b) => new Set([...a].filter(x => !b.has(x)));

  console.log('Polyfill Intersection:', [...intersection(frontEndSkills, backEndSkills)]);
  console.log('Polyfill Difference:', [...difference(frontEndSkills, backEndSkills)]);
}


// ============================================================================
// 4. WEAKMAP: GARBAGE-COLLECTION-SAFE KEY-VALUE STORE
// ============================================================================

/**
 * WeakMap Characteristics:
 * 1. Keys MUST be objects or non-registered symbols (not primitives).
 * 2. References to keys are HELD WEAKLY. If no other strong references to the
 *    key object exist, the entry is eligible for garbage collection!
 * 3. Not iterable: no `.size`, `.keys()`, or `for...of` (prevents non-deterministic GC inspection).
 * 
 * Primary Use Cases:
 * - Storing private data / state for objects or classes.
 * - Associating metadata with DOM nodes without memory leaks when DOM elements are removed.
 */

console.log('\n--- 4. WeakMap Use Case: Private Class State ---');

const privateMetadataStore = new WeakMap();

class SecureUserSession {
  constructor(userId, secretToken) {
    this.userId = userId;
    // Store secretToken in WeakMap keyed to `this` instance
    privateMetadataStore.set(this, { token: secretToken, loginTime: Date.now() });
  }

  getSecretToken() {
    const meta = privateMetadataStore.get(this);
    return meta ? meta.token : null;
  }
}

let session = new SecureUserSession('usr_4491', 'bearer_sec_99341');
console.log('Public property (userId):', session.userId);
console.log('Token from method:', session.getSecretToken());
console.log('Token not visible on object keys:', Object.keys(session)); // ['userId']

// When `session` is set to null, the entire WeakMap entry is automatically freed by GC:
session = null;


// ============================================================================
// 5. WEAKSET: GARBAGE-COLLECTION-SAFE OBJECT TRACKER
// ============================================================================

/**
 * WeakSet Characteristics:
 * 1. Stores only objects.
 * 2. Objects are held weakly.
 * 3. Ideal for membership tests (tagging objects as processed, cycle detection).
 */

console.log('\n--- 5. WeakSet Use Case: Circular Reference Detection ---');

function hasCircularReference(obj, visited = new WeakSet()) {
  if (obj === null || typeof obj !== 'object') {
    return false;
  }

  if (visited.has(obj)) {
    return true; // Cycle detected!
  }

  visited.add(obj);

  for (const key of Object.keys(obj)) {
    if (hasCircularReference(obj[key], visited)) {
      return true;
    }
  }

  return false;
}

const nodeA = { name: 'A' };
const nodeB = { name: 'B' };
nodeA.sibling = nodeB;
nodeB.sibling = nodeA; // Circular reference!

console.log('Does nodeA have circular reference:', hasCircularReference(nodeA)); // true

const cleanTree = { name: 'Root', child: { name: 'Leaf' } };
console.log('Does cleanTree have circular reference:', hasCircularReference(cleanTree)); // false
