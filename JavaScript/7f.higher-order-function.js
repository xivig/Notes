// function returns another function
// Type 1: Where higher-order function and callback function definition are separated
(function() {
    // higher-order function
    function higherOrderfunction(param, callback) {
        return callback(param, 50);
    }
    // Callback function
    function add(a, b) {
        return a + b;
    }
    console.log(higherOrderfunction(10, add)); //60
})();
// Type 2: Where higher-order function and callback function is an anonymous one
(function() {
    // higher-order function
    function higherOrderfunction(param, callback) {
        return callback(param, 50);
    }

    // Callback function is an anonymous one
    console.log(higherOrderfunction(10, (a, b) => {
        return a + b;
    })); //60
})();

// Type: 3
(function() {

    // function definition with callback function, this is actually called a higher-order function
    function funcDefinition(a, b, doLater) {
        let sum = a + b;
        console.log("Sum is " + sum);
        doLater(a, b);
    }

    // These are callback function
    function diffTwo(a, b) {

        let c = (a > b) ? a - b : b - a;
        return console.log(" Difference of the two numbers is " + c);

    }

    function multiply(a, b) {
        let mul = a * b;
        return console.log("Multiply result " + mul);
    }

    function divideBy(a, b) {
        let divide = a / b;
        let fixedToThreeDigit = (divide < 1) ? divide.toFixed(3) : divide;
        return console.log(fixedToThreeDigit);
    }

    // calling higher-order function with callback function diffTwo
    funcDefinition(5, 228, diffTwo);
    funcDefinition(525, 20, divideBy);


    // 1. calling higher-order function with callback function diffTwo with normal way:
    funcDefinition(5, 25, multiply);

    // 2. calling higher-order function with anonymous function as callback function:
    funcDefinition(5, 25, function(a, b) {
        console.log("Welcome to callback with anonymous function")
        let mul = a * b;
        return console.log(mul);
    });

    // 3. calling higher-order function with arrow function as callback
    funcDefinition(5, 25, (a, b) => {
        console.log("Welcome to callback with arrow function")
        let mul = a * b;
        console.log(mul);
    });

})();