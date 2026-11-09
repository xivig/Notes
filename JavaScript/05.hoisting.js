//1. Function declaration
function calculateAge(birthYear) {
    console.log(2020 - birthYear);
}
//2. Invoking or calling function
calculateAge(1995); // 25
/* The above code snippet is how you would expect to write the code for it to work. Now, let's see what happens when we call the function before we write it: */

//3. Function Hoisting:
// Hoisting only works for function declaration
doubledNumber(100); // 200

function doubledNumber(number) {
    console.log(number * 2);
}

/* Even though we call the function in our code first, before the function is written, the code still works. This is because of how context execution works in JavaScript.

Hoisting works well with other data types and variables. The variables can be initialized and used before they are declared. */

// 4.Only declarations are hoisted:
/* 
JavaScript only hoists declarations, not initializations. If a variable is declared and initialized after using it, the value will be undefined. As for example: */

console.log(num); // Returns undefined, as only declaration was hoisted, no initialization has happened at this stage
var num; // declaration
num = 6; // initialization

// Example below only has initialization.No hoisting happens so trying to read the variable results in ReferenceError exception.

console.log(num1); // throws ReferenceError exception
num1 = 16; // initialization

//5. More Examples 1
// Only y is hoisted

x = 1; // Initialize x, and if not already declared, declare it - but no hoisting as there is no var in the statement.
console.log(x + " " + y); // '1 undefined'
//This prints value of y as undefined as JavaScript only hoists declarations
var y = 2; // Declare and Initialize y

//6. More Examples 2
// No hoisting, but since initialization also causes declaration (if not already declared), variables are available.

a = "Cran"; //Initialize a
b = "berry"; //Initialize b
console.log(a + "" + b); // 'Cranberry'

//7. Strict Mode

/* Thanks to a utility of the es5 version of JavaScript known as strict-mode. By enabling strict mode, we opt into a restricted variant of JavaScript that will not tolerate the usage of variables before they are declared. */

/* Running our code in strict mode:

    - Eliminates some silent JavaScript errors by changing them to explicit throw errors which will be spit out by the interpreter.
    - Fixes mistakes that make it difficult for JavaScript engines to perform optimisations.
    - Prohibits some syntax likely to be defined in future versions of JavaScript.
    - We enable strict mode by prefacing our file or function with:
    ("use strict");
 */