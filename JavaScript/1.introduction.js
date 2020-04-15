// We are declaring variables, functions, arrays , objects by IIFE so that there will be no name collision
(function() {
    // This is called Immediately Invoked Function Expression(IIFE)
})();

//1. IIFE(Immediately invoked function expression)
(function() {
    function greeting() {
        console.log("WELCOME FRIENDS!");
    }
    greeting();
})();

//2. Alternate way
+
(function() {
    function greeting() {
        console.log("WELCOME friends!");
    }
    greeting();
})();

//3. Alternate way
!(function() {
    function greeting() {
        console.log("welcome friends!");
    }
    greeting();
})();

//4. Alternate way: If you don't know which
//  come first then you haave to do this
(function() {
    function greeting() {
        console.log("welcome friends again!");
    }
    greeting();
})();

//5. It's not poluting the global namespace and it retains closure
let iife = (function() {
    console.log("IIFE form one");
}());
// 6.form 
let iife2 = (function() {
    console.log("IIFE form two");
})();

//7. JavaScript classic Modular Pattern
let iifeModule = (function() {
    let object = {};
    // Private function
    function test() {
        console.log("I am a private function");
    }

    // Now we can access an private function with public object
    object.cool = function() {
        test();
    }

    // By using the return keyword we can make an object public
    return object;

})();
// calling the private function
iifeModule.cool(); //I am a private function

// 8. modular pattern example
var modularPattern = (function() {

    // private variable
    var counter = 0;

    return {
        add: function() {
            counter = counter + 1;
            return counter;
        },
        reset: function() {
            return counter = 0;
        }
    }
}());
console.log(modularPattern.add()); // alerts: 1
console.log(modularPattern.add()); // alerts: 2
console.log(modularPattern.reset()); // alerts: 0

//9. Revealing Module pattern

var rmodularPattern = (function() {
    'use strict';

    var _privateProperty = 'I am Private';
    var publicProperty = 'I am a public property';

    function _privateMethod() {
        console.log(_privateProperty);
    }

    function publicMethod() {
        _privateMethod();
    }

    return {
        publicMethod: publicMethod,
        publicProperty: publicProperty
    };
})();

rmodularPattern.publicMethod(); // outputs 'I am Private'
console.log(rmodularPattern.publicProperty); // outputs 'I am a public property'
// console.log(rmodularPattern._privateProperty); // is undefined protected by the module closure
// rmodularPattern._privateMethod(); // is TypeError protected by the module closure

//10. or using an iifee

(function(param) {

    let name = param;

    function greet() {
        return console.log("Hello!" + name)
    }
    greet();

}("Robert"));

//11. General sum
(function(a, b) {
    console.log(`Sum of the Two numbers is ${a+b}`)
})(5, 7);

//12. Sum of variable number of arguments
(function() {
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i]
    }
    console.log(`Total ${sum}`)
})(1, 3, 5, 7);

//13. difference of two numbers
let diff = (function(a, b) {
    let c = 0;
    c = a - b;
    return c;
})(799, 179);
console.log(diff);

// this can be alternatively written as:
console.log((function(a, b) {
    let c = 0;
    c = a - b;
    return c;
})(654, 567))

//14. Sum of two numbers
var sum = (function() {

    function result(num1, num2) {
        let res = num1 + num2;
        return res;
    }
    return {
        result: result
    };

})();
console.log(sum.result(7, 2));