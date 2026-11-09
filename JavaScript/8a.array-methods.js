/**
 * ============================================================================
 * JavaScript Array Methods: The Complete Modern Reference (ES6 - ES2024+)
 * ============================================================================
 * 
 * Arrays in JavaScript provide a comprehensive suite of methods for iteration,
 * transformation, filtering, searching, aggregation, and mutation.
 * 
 * Modern JavaScript (ES2023+) strongly emphasizes IMMUTABILITY: returning new
 * arrays rather than mutating the original array in place.
 */

// ============================================================================
// 1. ARRAY CREATION & UTILITY CONSTRUCTORS
// ============================================================================

// 1.1 Array.from(): Create arrays from array-like or iterable objects
// Signature: Array.from(iterableOrArrayLike, mapFn?, thisArg?)

// Convert a Set or Map to an Array:
const uniqueNumbers = new Set([1, 2, 3, 2, 1]);
const fromSet = Array.from(uniqueNumbers);
console.log('Array.from(Set):', fromSet); // [1, 2, 3]

// Generate an arithmetic sequence/range [1..10]:
const range = Array.from({ length: 10 }, (_, index) => index + 1);
console.log('Range 1 to 10:', range); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Convert string to character array (handles UTF-16 surrogate pairs / emojis correctly):
const characters = Array.from('Hello 🚀');
console.log('Array.from(String):', characters); // ['H', 'e', 'l', 'l', 'o', ' ', '🚀']

// 1.2 Array.of(): Creates an array with variable number of arguments
// Unlike Array(7) which creates a sparse array of length 7, Array.of(7) creates [7]
console.log('Array.of(7):', Array.of(7));       // [7]
console.log('new Array(7):', new Array(7));     // [ <7 empty items> ]

// 1.3 Array.isArray(): Robust array type verification
console.log('Array.isArray([]):', Array.isArray([]));              // true
console.log('Array.isArray({}):', Array.isArray({}));              // false
console.log('Array.isArray(arguments):', Array.isArray((function(){ return arguments; })())); // false


// ============================================================================
// 2. TRANSFORMATION METHODS (NON-MUTATING)
// ============================================================================

const products = [
  { id: 101, name: 'Mechanical Keyboard', price: 120, category: 'Hardware', inStock: true, tags: ['pc', 'typing'] },
  { id: 102, name: 'Wireless Mouse', price: 60, category: 'Hardware', inStock: true, tags: ['pc', 'ergonomic'] },
  { id: 103, name: '4K Monitor', price: 450, category: 'Displays', inStock: false, tags: ['pc', 'screen'] },
  { id: 104, name: 'USB-C Cable', price: 15, category: 'Accessories', inStock: true, tags: ['cable', 'charging'] },
  { id: 105, name: 'Noise-Cancelling Headphones', price: 250, category: 'Audio', inStock: true, tags: ['sound', 'bluetooth'] }
];

// 2.1 Array.prototype.map(): Transforms each element into a new value
// Signature: array.map((element, index, array) => transformedValue)
const productLabels = products.map((item, index) => `${index + 1}. ${item.name} ($${item.price})`);
console.log('\n--- map() ---');
console.log(productLabels);

// 2.2 Array.prototype.flatMap(): Maps each element and flattens the result by 1 level
// Ideal for extracting nested lists without calling .map().flat()
const allTags = products.flatMap(p => p.tags);
console.log('\n--- flatMap() ---');
console.log('All unique tags:', [...new Set(allTags)]); // ['pc', 'typing', 'ergonomic', 'screen', 'cable', 'charging', 'sound', 'bluetooth']

// 2.3 Array.prototype.flat(): Flattens nested arrays up to specified depth (default 1)
const nestedMatrix = [1, [2, 3], [[4, 5], [6, [7, 8]]]];
console.log('\n--- flat() ---');
console.log('flat(1):', nestedMatrix.flat(1));           // [1, 2, 3, [4, 5], [6, [7, 8]]]
console.log('flat(Infinity):', nestedMatrix.flat(Infinity)); // [1, 2, 3, 4, 5, 6, 7, 8]


// ============================================================================
// 3. FILTERING & SEARCHING METHODS (NON-MUTATING)
// ============================================================================

console.log('\n--- Filtering & Searching ---');

// 3.1 Array.prototype.filter(): Returns elements that satisfy a predicate test
const inStockHardware = products.filter(p => p.inStock && p.category === 'Hardware');
console.log('In-stock Hardware count:', inStockHardware.length); // 2

// 3.2 Array.prototype.find(): Returns the FIRST matching element (or undefined)
const expensiveItem = products.find(p => p.price > 200);
console.log('First expensive item:', expensiveItem?.name); // '4K Monitor'

// 3.3 Array.prototype.findIndex(): Returns the index of the first match (or -1)
const monitorIndex = products.findIndex(p => p.name.includes('Monitor'));
console.log('Index of Monitor:', monitorIndex); // 2

// 3.4 Array.prototype.findLast() & findLastIndex() (ES2023+): Searches from right to left
const numbers = [5, 12, 50, 130, 44, 25];
const lastAboveForty = numbers.findLast(n => n > 40);
const lastAboveFortyIdx = numbers.findLastIndex(n => n > 40);
console.log('findLast (>40):', lastAboveForty);       // 44
console.log('findLastIndex (>40):', lastAboveFortyIdx); // 4

// 3.5 Array.prototype.includes(): Checks if an element exists by value (uses SameValueZero, handles NaN correctly!)
const supportedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', NaN];
console.log('Includes EUR:', supportedCurrencies.includes('EUR')); // true
console.log('Includes CAD:', supportedCurrencies.includes('CAD')); // false
console.log('Includes NaN:', supportedCurrencies.includes(NaN));   // true (indexOf(NaN) returns -1!)

// 3.6 Array.prototype.indexOf() and lastIndexOf():
const alphabet = ['a', 'b', 'c', 'b', 'a'];
console.log('indexOf("b"):', alphabet.indexOf('b'));         // 1
console.log('lastIndexOf("b"):', alphabet.lastIndexOf('b')); // 3


// ============================================================================
// 4. AGGREGATION & REDUCTION METHODS (NON-MUTATING)
// ============================================================================

console.log('\n--- reduce() & Aggregations ---');

// 4.1 Array.prototype.reduce(): Accumulates values across elements
// Signature: array.reduce((accumulator, currentValue, index, array) => newAccumulator, initialValue)

// Example 1: Summing numerical values
const totalCartValue = products
  .filter(p => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);
console.log('Total in-stock cart value:', `$${totalCartValue}`); // $445

// Example 2: Grouping items by category (classic reduce pattern)
const groupedByCategory = products.reduce((acc, p) => {
  const cat = p.category;
  if (!acc[cat]) acc[cat] = [];
  acc[cat].push(p.name);
  return acc;
}, /** @type {Record<string, string[]>} */ ({}));
console.log('Grouped by category (reduce):', groupedByCategory);

// Example 3: Frequency counter
const votes = ['React', 'Vue', 'React', 'Svelte', 'React', 'Vue', 'Angular'];
const voteCount = votes.reduce((counts, framework) => {
  counts[framework] = (counts[framework] || 0) + 1;
  return counts;
}, /** @type {Record<string, number>} */ ({}));
console.log('Vote counts:', voteCount);

// 4.2 Array.prototype.reduceRight(): Reduces from right-to-left
const words = ['World', 'Beautiful', 'Hello'];
const sentence = words.reduceRight((acc, w) => `${acc} ${w}`);
console.log('reduceRight sentence:', sentence); // 'Hello Beautiful World'


// ============================================================================
// 5. VALIDATION METHODS (NON-MUTATING)
// ============================================================================

console.log('\n--- some() & every() ---');

// 5.1 Array.prototype.some(): True if AT LEAST ONE element matches the condition
const hasAffordableOption = products.some(p => p.price < 20);
console.log('Has item under $20:', hasAffordableOption); // true

// 5.2 Array.prototype.every(): True ONLY IF ALL elements match the condition
const areAllInStock = products.every(p => p.inStock);
console.log('Are all items in stock:', areAllInStock); // false


// ============================================================================
// 6. MODERN NON-MUTATING METHODS (ES2023+)
// ============================================================================
// Historical sorting, reversing, and splicing mutated the array in place,
// leading to state management bugs in React/Vue/Redux. ES2023 introduced
// safe, non-mutating counterparts:

console.log('\n--- ES2023 Non-Mutating Methods ---');

const originalScores = [34, 12, 89, 55, 23];

// 6.1 Array.prototype.toSorted(): Returns a new sorted array
const sortedScores = originalScores.toSorted((a, b) => a - b);
console.log('Original intact:', originalScores); // [34, 12, 89, 55, 23]
console.log('toSorted():', sortedScores);        // [12, 23, 34, 55, 89]

// 6.2 Array.prototype.toReversed(): Returns a new reversed array
const reversedScores = originalScores.toReversed();
console.log('toReversed():', reversedScores);    // [23, 55, 89, 12, 34]

// 6.3 Array.prototype.toSpliced(): Returns a new spliced array (start, deleteCount, ...items)
// Replaces item at index 1 with 99 without touching originalScores:
const splicedScores = originalScores.toSpliced(1, 1, 99);
console.log('toSpliced():', splicedScores);      // [34, 99, 89, 55, 23]

// 6.4 Array.prototype.with(): Returns a new array with single index replaced
// Replaces index 0 with 100:
const updatedScores = originalScores.with(0, 100);
console.log('with(0, 100):', updatedScores);    // [100, 12, 89, 55, 23]

// 6.5 Array.prototype.at(): Access element by positive or negative index
console.log('at(0) (First):', originalScores.at(0));    // 34
console.log('at(-1) (Last):', originalScores.at(-1));   // 23
console.log('at(-2) (Penult):', originalScores.at(-2)); // 55


// ============================================================================
// 7. CLASSIC MUTATING METHODS (MODIFY ORIGINAL ARRAY)
// ============================================================================

console.log('\n--- Mutating Methods (In-Place) ---');

const stack = [1, 2, 3];

// 7.1 push() & pop(): LIFO Stack operations
stack.push(4, 5);      // Adds to end, returns new length
const popped = stack.pop(); // Removes and returns last element (5)
console.log('After push & pop:', stack, 'popped:', popped); // [1, 2, 3, 4], popped: 5

// 7.2 unshift() & shift(): FIFO Queue operations
stack.unshift(0);      // Adds to start, returns new length
const shifted = stack.shift(); // Removes and returns first element (0)
console.log('After unshift & shift:', stack, 'shifted:', shifted); // [1, 2, 3, 4], shifted: 0

// 7.3 splice(): In-place add/remove/replace
// Signature: array.splice(start, deleteCount, ...itemsToInsert)
const fruits = ['Apple', 'Banana', 'Cherry', 'Date'];
const removed = fruits.splice(1, 2, 'Blueberry', 'Cantaloupe');
console.log('Fruits after splice:', fruits);    // ['Apple', 'Blueberry', 'Cantaloupe', 'Date']
console.log('Removed by splice:', removed);      // ['Banana', 'Cherry']

// 7.4 sort(): Sorts IN PLACE.
// GOTCHA WARNING: Default sort converts elements to strings!
// [10, 2, 5].sort() yields [10, 2, 5] because '10' < '2' in UTF-16!
const rawNumbers = [10, 2, 5, 1, 25];
rawNumbers.sort((a, b) => a - b); // ALWAYS supply a numerical compare function!
console.log('Correctly sorted numbers:', rawNumbers); // [1, 2, 5, 10, 25]

// 7.5 reverse(): Reverses IN PLACE
const order = ['First', 'Second', 'Third'];
order.reverse();
console.log('Reversed order:', order); // ['Third', 'Second', 'First']

// 7.6 fill(): Fills slice of array with static value
const filledArray = new Array(5).fill(0);
console.log('Filled zeros:', filledArray); // [0, 0, 0, 0, 0]


// ============================================================================
// 8. ES2024 MODERN GROUPING: Object.groupBy() & Map.groupBy()
// ============================================================================

console.log('\n--- ES2024 Grouping ---');

// Object.groupBy() groups an iterable into an object with null-prototype:
if (typeof Object.groupBy === 'function') {
  const inventoryByStatus = Object.groupBy(products, p => p.inStock ? 'available' : 'outOfStock');
  console.log('Object.groupBy available items:', inventoryByStatus.available?.map(p => p.name));
} else {
  console.log('Object.groupBy supported natively in Node.js 21+ / modern browsers');
}


// ============================================================================
// 9. METHOD CHAINING PIPELINE PATTERN
// ============================================================================

console.log('\n--- Method Chaining Pipeline ---');

// High-level declarative pipeline:
// Find total discounted revenue of in-stock hardware items over $50 with 10% tax
const finalRevenue = products
  .filter(p => p.inStock && p.category === 'Hardware') // 1. Filter
  .map(p => p.price * 1.10)                            // 2. Add 10% tax
  .reduce((total, price) => total + price, 0);         // 3. Accumulate sum

console.log('Total revenue pipeline result: $' + finalRevenue.toFixed(2));
