// 1. JavaScript comments
(function() {
    /* It is a multi 
    line comment 
    */
    // It is a single line comment

    // Varibale Declaration
    var firstName = "Robert";
    var age = 28;
    console.log("My First name is " + firstName + " and I am " + age);
})();

//2. Type Checking
(function() {
    console.log(typeof 10) //number

    console.log(typeof "Cool") // string

    console.log(typeof true) // boolean

    console.log(typeof Array) // function

    console.log(typeof undefined) // undefined

    console.log(typeof null) // object

    console.log(typeof this) // object

    console.log(typeof {}) // object

    console.log(typeof Object) // function

    /* When you run typeof null, the result is 'object'.
    But why an object when the type is null?

    This has been acknowledged as an error by TC-39(Technical Committee).
    This is the committee that designs and maintains JavaScript.

    The best way to determine if a value is null is to compare it against null directly. e.g.,

    console.log(value === null) // true or false

    Note: Here triple equals operator(===) is used instead of the double equals operator for comparing without type coercion.
    The reason is that triple equals does the comparison without coercing the variable to another type. e.g.,
    */


    console.log("5" == 5) // true
    console.log("5" === 5) // false
    console.log(undefined == null) // true
    console.log(undefined === null) // false
        /* 
        Here JavaScript use type coercion.
        Type coercion is the process of converting value from one type to another.
        !=  => It performs type coercion
        !== => It doesn't perform any type coercion
        === => It is called equality operator.It doesn't perform any type coercion.
        */

    /* When you use the double equals, the string "5" and the number 5 are considered equal because the double equals convert the string into a number before it makes the comparison.

    The triple equals operator doesn't consider these values equal because they are  two different types.
    */
})();

//3. Assign a value to variables
(function() {
    var object = null; //null
    var flag = undefined; // undefined
    var reference; // It will automatically set to undefined
    console.log(object) // null
    console.log(flag) //  undefined
    console.log(reference) //  undefined

    // You can define multiple variable in one line as:

    var name, job, isMarried;
    // Assign a value to variables
    job = "Developer";
    name = "Suzy";
    isMarried = false;
    console.log(name + " is " + age + " year old and is a " + job);
    //Suzy is 28 year old  and is a Developer

    // The above code can be written by using template literal and will get the same output as:
    console.log(`${name} is ${age} year old and is a ${job}`);
    /* Where ` ` is called backtick and is specially used for template literal.
    Here ${} is used to access properties and methods
    */

})();

//2. Variable mutation:
(function() {
    age = "Twenty eight";
    alert(`${name} is ${age}`); // Here both variables are of type string so the result is as usual:Suzy is twenty eight
    age = 28;
    console.log(`${name} is ${age}`); // Here One variable is string type and other is number, so here number is automatically changed to string before giving the output.This is called variable mutation.
    //Output: Suzy is 28
})();

//5. JavaScript Prompt
(function() {
    // Asking for a question
    var lastName = prompt('What is your name?');
    console.log(firstName + ' ' + lastName + ' is my full Name');

})();

//6. Multiple assignments
(function() {
    var x, y;
    x = y = (3 + 5) * 4 - 5;
    console.log(x, y); // 27 27
    // assignment operator's associativity: Right to Left

    // More operators
    x = x * 2;
    console.log(x); //54
    // is same as
    x *= 2;
    console.log(x); //108


    x = x + 1;
    console.log(x); //109
    // or
    x += 1
    console.log(x); //110
    // or 
    x++
    console.log(x); //111
})();