// ==============================================================================
// JavaScript Scope, Lexical Environment & Scope Chain
// ==============================================================================

// ------------------------------------------------------------------------------
// 1. Types of Scope in JavaScript
// ------------------------------------------------------------------------------
// Scope defines the accessibility (visibility) of variables and functions.
// Modern JavaScript has 4 primary levels of scope:
//   a) Global Scope
//   b) Module Scope (in ES Modules)
//   c) Function (Local) Scope
//   d) Block Scope (introduced in ES6 with let and const)

// ------------------------------------------------------------------------------
// 2. Global Scope vs Block Scope (var vs let/const)
// ------------------------------------------------------------------------------
var globalVar = 'I am accessible everywhere in this script';
let globalLet = 'I am also globally scoped';

{
    // Inside a block { ... }
    var leakedVar = 'var ignores block boundaries!';
    let blockScopedLet = 'let is confined strictly to this block';
    const blockScopedConst = 'const is also block-scoped';
}

console.log(leakedVar); // 'var ignores block boundaries!'
try {
    console.log(blockScopedLet); // ReferenceError: blockScopedLet is not defined
} catch (e) {
    console.log('[Block Scope Enforced]:', e.message);
}

// ------------------------------------------------------------------------------
// 3. Function (Local) Scope
// ------------------------------------------------------------------------------
function processPayment(amount) {
    var fee = 2.50; // Function-scoped
    let status = 'pending'; // Function-scoped

    function calculateTotal() {
        // Nested function has access to outer function's scope (Lexical Scope)
        return amount + fee;
    }

    return calculateTotal();
}

console.log('Payment Total:', processPayment(100)); // 102.5
try {
    console.log(fee); // ReferenceError: fee is not defined
} catch (e) {
    console.log('[Function Scope Enforced]:', e.message);
}

// ------------------------------------------------------------------------------
// 4. Lexical Scope (Static Scoping)
// ------------------------------------------------------------------------------
// Lexical scope means that function scope is determined at AUTHOR TIME (where the
// function is physically written in code), NOT at runtime (where it is invoked).

const domain = 'engineering';

function outer() {
    const domain = 'architecture';

    function inner() {
        // Looks up 'domain' in outer's lexical environment first:
        console.log('[Lexical Scope]:', domain); // 'architecture'
    }

    return inner;
}

const runInner = outer();
runInner(); // Outputs 'architecture' even though executed in global context!

// Contrast with Dynamic Scope (which JS does NOT use):
const category = 'global-cat';

function printCategory() {
    console.log('[Lexical Lookup]:', category);
}

function callerFunction() {
    const category = 'caller-cat';
    // Even though invoked here, printCategory was defined where category = 'global-cat'
    printCategory(); // Logs 'global-cat', NOT 'caller-cat'!
}

callerFunction();

// ------------------------------------------------------------------------------
// 5. The Scope Chain
// ------------------------------------------------------------------------------
// When a variable is accessed, the JavaScript engine performs an identifier lookup:
// Current Local Scope -> Outer Lexical Environment -> ... -> Global Scope -> null
// If not found in Global Scope, throws ReferenceError.

const level0 = 'Global Environment';

function levelOne() {
    const level1 = 'Level 1 Environment';

    function levelTwo() {
        const level2 = 'Level 2 Environment';

        function levelThree() {
            const level3 = 'Level 3 Environment';

            // Identifier resolution traverses up the scope chain:
            console.log(level3); // Found in Local Scope
            console.log(level2); // Found in Level 2 Lexical Scope
            console.log(level1); // Found in Level 1 Lexical Scope
            console.log(level0); // Found in Global Scope
        }

        levelThree();
    }

    levelTwo();
}

levelOne();

// ------------------------------------------------------------------------------
// 6. Variable Shadowing
// ------------------------------------------------------------------------------
// When an inner scope declares a variable with the same identifier as an outer scope,
// the inner variable "shadows" (masks) the outer one within that scope.

const username = 'Alice_Global';

function renderProfile() {
    const username = 'Alice_Local'; // Shadows global username
    console.log('Inside renderProfile():', username); // 'Alice_Local'

    if (true) {
        const username = 'Alice_Block'; // Shadows outer function username
        console.log('Inside block:', username); // 'Alice_Block'
    }

    console.log('Back in function:', username); // 'Alice_Local'
}

renderProfile();
console.log('In Global Scope:', username); // 'Alice_Global'

// ------------------------------------------------------------------------------
// 7. Temporal Dead Zone (TDZ)
// ------------------------------------------------------------------------------
// Variables declared with let and const are hoisted to the top of their block,
// but NOT initialized. The period between entering the block and the declaration
// execution is called the Temporal Dead Zone (TDZ).

{
    // TDZ for myConst starts here
    // console.log(myConst); // ReferenceError: Cannot access 'myConst' before initialization
    const myConst = 'TDZ ends here!';
    console.log(myConst); // Accessible safely
}
