/**
 * ============================================================================
 * JavaScript Regular Expressions (RegExp) Mastery (ES6 - ES2024+)
 * ============================================================================
 * 
 * Regular expressions provide powerful text parsing, pattern matching, and
 * string manipulation. Modern ECMAScript features advanced capabilities
 * including lookbehind assertions, named capture groups, dotAll mode, and
 * the ES2024 `v` flag (unicodeSets).
 * 
 * Key Concepts Covered:
 * 1. Syntax: Literals vs. RegExp Constructor & Escaping
 * 2. Modern RegExp Flags (`g`, `i`, `m`, `s`, `u`, `y`, `d`, `v`)
 * 3. Character Classes & Unicode Property Escapes (`\p{...}`)
 * 4. Quantifiers: Greedy vs. Lazy Matching
 * 5. Lookahead & Lookbehind Assertions (`(?=...)`, `(?<=...)`, etc.)
 * 6. Named Capture Groups (`(?<name>...)`) & Backreferences
 * 7. Key Methods: `test()`, `exec()`, `matchAll()`, `replace()`
 * 8. Battle-Tested Real-World Recipes
 */

// ============================================================================
// 1. REGEXP CREATION & DYNAMIC PATTERNS
// ============================================================================

console.log('--- 1. RegExp Creation & Escaping ---');

// 1.1 Regex Literal (compiled at parse time, ideal for static patterns):
const staticRegex = /^[a-z0-9_]+$/i;

// 1.2 RegExp Constructor (compiled at runtime, ideal for dynamic variables):
const searchTerm = 'hello.world';
// Helper to escape special regex characters:
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const dynamicRegex = new RegExp(escapeRegExp(searchTerm), 'i');
console.log('Dynamic regex pattern:', dynamicRegex);
console.log('Matches "HELLO.WORLD":', dynamicRegex.test('HELLO.WORLD')); // true


// ============================================================================
// 2. MODERN REGEXP FLAGS
// ============================================================================

/**
 * Modern Flags Reference:
 * - `g` (global): Find all matches rather than stopping at the first match.
 * - `i` (ignoreCase): Case-insensitive matching.
 * - `m` (multiline): `^` and `$` match beginning and end of each line (\n).
 * - `s` (dotAll): Makes `.` match ALL characters, including newlines!
 * - `u` (unicode): Enables full UTF-16 surrogate pair and unicode property support.
 * - `y` (sticky): Matches strictly starting at `regex.lastIndex`.
 * - `d` (hasIndices - ES2022): Generates start/end index offsets for all capture groups.
 * - `v` (unicodeSets - ES2024): Advanced character class set operations (intersection/subtraction).
 */

console.log('\n--- 2. dotAll (s) & Multiline (m) Flags ---');

const multiLineText = `First Line
Second Line
Third Line`;

// Without 's' flag, dot (.) does NOT match newlines:
console.log('Without s flag (/First.*Third/):', /First.*Third/.test(multiLineText)); // false
// With 's' flag:
console.log('With s flag (/First.*Third/s):', /First.*Third/s.test(multiLineText));   // true

// Multiline (m) flag:
const startsWithSecond = /^Second/m.test(multiLineText);
console.log('Line begins with "Second" (m flag):', startsWithSecond); // true


// ============================================================================
// 3. UNICODE PROPERTY ESCAPES (\p{...})
// ============================================================================

console.log('\n--- 3. Unicode Property Escapes ---');

// Matches emojis, Greek script, or specific punctuation regardless of unicode encoding:
const emojiRegex = /\p{Extended_Pictographic}/u;
console.log('Contains emoji ("Hello 🎉"):', emojiRegex.test('Hello 🎉')); // true
console.log('Contains emoji ("Plain text"):', emojiRegex.test('Plain text')); // false

const greekRegex = /^\p{Script=Greek}+$/u;
console.log('Matches Greek script ("αβγδ"):', greekRegex.test('αβγδ')); // true


// ============================================================================
// 4. QUANTIFIERS: GREEDY VS. LAZY
// ============================================================================

console.log('\n--- 4. Greedy vs Lazy Quantifiers ---');

const htmlSnippet = '<button>Save</button><button>Cancel</button>';

// Greedy quantifier (<.*>): Matches as MUCH text as possible until the last '>'
const greedyMatch = htmlSnippet.match(/<button>.*<\/button>/);
console.log('Greedy match length:', greedyMatch?.[0].length); // Matches the whole string!

// Lazy quantifier (<.*?>): Matches as LITTLE text as possible
const lazyMatch = htmlSnippet.match(/<button>.*?<\/button>/);
console.log('Lazy match:', lazyMatch?.[0]); // '<button>Save</button>'


// ============================================================================
// 5. LOOKAHEAD & LOOKBEHIND ASSERTIONS (ZERO-WIDTH CHECKS)
// ============================================================================

console.log('\n--- 5. Lookahead & Lookbehind Assertions ---');

/**
 * Assertions test whether a pattern precedes or follows WITHOUT including it
 * in the matched result.
 * 
 * - Positive Lookahead:   `X(?=Y)`  (Match X only if immediately followed by Y)
 * - Negative Lookahead:   `X(?!Y)`  (Match X only if NOT followed by Y)
 * - Positive Lookbehind:  `(?<=Y)X` (Match X only if immediately preceded by Y)
 * - Negative Lookbehind:  `(?<!Y)X` (Match X only if NOT preceded by Y)
 */

const priceText = 'Item A: $45.00, Item B: €80.00, Item C: ¥500';

// 5.1 Positive Lookbehind: Match digits that are preceded by '$'
const dollarPrices = priceText.match(/(?<=\$)\d+(\.\d{2})?/g);
console.log('Dollar prices (lookbehind):', dollarPrices); // ['45.00']

// 5.2 Negative Lookahead: Password policy verification
// Requires: 8+ chars, at least 1 digit, at least 1 uppercase letter:
const passwordPolicy = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/;
console.log('Password "SecurePass99" valid:', passwordPolicy.test('SecurePass99')); // true
console.log('Password "weakpassword" valid:', passwordPolicy.test('weakpassword')); // false


// ============================================================================
// 6. NAMED CAPTURE GROUPS & BACKREFERENCES (ES2018)
// ============================================================================

console.log('\n--- 6. Named Capture Groups ---');

// Parse ISO 8601 Date (YYYY-MM-DD):
const datePattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const dateMatch = 'Release date: 2026-11-09'.match(datePattern);

if (dateMatch && dateMatch.groups) {
  const { year, month, day } = dateMatch.groups;
  console.log(`Parsed Date => Year: ${year}, Month: ${month}, Day: ${day}`);
}

// Named Backreferences: Match paired quotes using `\k<quote>`
const quotePattern = /(?<quote>['"])(?<content>.*?)\k<quote>/;
const quotedString = 'She said "Welcome to Xivig" with enthusiasm.';
const quoteMatch = quotedString.match(quotePattern);
console.log('Extracted quoted content:', quoteMatch?.groups?.content); // 'Welcome to Xivig'


// ============================================================================
// 7. KEY METHODS: matchAll() & REPLACE WITH FUNCTION
// ============================================================================

console.log('\n--- 7. matchAll() & Functional Replacement ---');

// 7.1 String.prototype.matchAll(): Returns an iterator of all matches with capture groups:
const logData = 'WARN: disk low; ERROR: memory limit; INFO: request ok; ERROR: timeout';
const errorRegex = /(?<level>WARN|ERROR):\s*(?<message>[^;]+)/g;

for (const match of logData.matchAll(errorRegex)) {
  console.log(`[${match.groups?.level}] -> ${match.groups?.message}`);
}

// 7.2 Functional replace():
// Convert camelCase to kebab-case:
function camelToKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
console.log('camelToKebab("backgroundColor"):', camelToKebab('backgroundColor')); // 'background-color'


// ============================================================================
// 8. BATTLE-TESTED REAL-WORLD RECIPES
// ============================================================================

console.log('\n--- 8. Real-World Recipes ---');

// Recipe 1: URL Slug Generator:
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')       // Remove all non-word chars
    .replace(/--+/g, '-')          // Replace multiple - with single -
    .replace(/^-+/, '')            // Trim - from start of text
    .replace(/-+$/, '');           // Trim - from end of text
}
console.log('Slugified:', slugify('  Modern JavaScript ES2024 & Beyond!  '));
// 'modern-javascript-es2024-beyond'

// Recipe 2: Strip HTML tags safely:
function stripHtmlTags(html) {
  return html.replace(/<[^>]*>/g, '');
}
console.log('Stripped HTML:', stripHtmlTags('<p>Hello <strong>World</strong>!</p>')); // 'Hello World!'

// Recipe 3: Standard Email Validator:
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
console.log('Email test (dev@xivig.org):', emailRegex.test('dev@xivig.org')); // true
console.log('Email test (invalid..email):', emailRegex.test('invalid..email')); // false
