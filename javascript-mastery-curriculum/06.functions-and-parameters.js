// Notes on functions:
/* 
1. Function can be nested
    -Scope of nested functions are local to their parent
    -nested function can not be executed other than the parent function
2. Function can return other function
3. Inner functions can be assigned to outer function
4. function can be stored in an Array elements and it become functions too
5. Events can be attached to function(which is called event handler)
*/

// 1. Nested function start: form one
(function() {
    // inner functuion can access the value of the variale of the outer function
    function higherFunction(a, b) {

        // here all functions namely sum, diff, multiply, divide 
        // have access to the parameter a,b of the higherFunction()
        function sum() {
            let sum = a + b;
            console.log("Sum is " + sum);

        }

        function diff() {
            let c = (a > b) ? a - b : b - a;
            return console.log("Difference of the two numbers is " + c);

        }

        function multiply() {
            let mul = a * b;
            console.log("Multiply result " + mul);
        }

        function divideBy() {
            let divide = a / b;
            let fixedToThreeDigit = (divide < 1) ? divide.toFixed(3) : divide;
            console.log(fixedToThreeDigit);
        }
        sum();
        diff();
        multiply();
        divideBy();


    }
    higherFunction(15, 5);
    /* sum(); // This is out of scope so gives an error
    // Uncaught ReferenceError: sum is not defined
    */
})();
// Nested function end: form one

// 2.Nested function start: second form
(function() {
    function higherFunction2(a, b) {

        // here all functions namely sum, diff, multiply, divide 
        // have access to the parameter a,b of the higherFunction
        function sum() {
            let sum = a + b;
            console.log("Sum is " + sum);

        }

        function diff() {
            let c = (a > b) ? a - b : b - a;
            return console.log("Difference of the two numbers is " + c);

        }

        function multiply() {
            let mul = a * b;
            console.log("Multiply result " + mul);
        }

        function divideBy() {
            let divide = a / b;
            let fixedToThreeDigit = (divide < 1) ? divide.toFixed(3) : divide;
            console.log("Division result " + fixedToThreeDigit);
        }
        // Here sum(), diff(), multiply() automatically being called when the outer function is called 
        sum();
        diff();
        multiply();

        // Here outer function returned only divideBy()function definition.
        // So in the first call higherFunction() calls the above three functions(sum(), diff(), multiply() automatically) and divideBy() definition is returned. In the second call the divideBy() function is actually called.
        return divideBy;


    }
    let higherReult = higherFunction2(100, 200);
    higherReult();
})();
// Nested function end: second form

// Nested function start: third form
function higherFunction3(a, b) {

    // here all functions namely sum, diff, multiply, divide 
    // have access to the parameter a,b of the higherFunction
    function sum() {
        let sum = a + b;
        console.log("Sum is " + sum);

    }

    function diff() {
        let c = (a > b) ? a - b : b - a;
        return console.log("Difference of the two numbers is " + c);

    }

    function multiply() {
        let mul = a * b;
        console.log("Multiply result " + mul);
    }


    sum();
    diff();
    multiply();

    // here we can write the whole divideBy function in the return statement
    // and it will give the same result
    return function divideBy() {
        let divide = a / b;
        let fixedToThreeDigit = (divide < 1) ? divide.toFixed(3) : divide;
        console.log("Division result " + fixedToThreeDigit);
    };


}
let higherResult3 = higherFunction3(400, 200);
higherResult3();
// Nested function end: third form


// Nested function start: fourth form
function higherFunction4(a, b) {

    // here all functions namely sum, diff, multiply, divide 
    // have access to the parameter a,b of the higherFunction
    function sum() {
        let sum = a + b;
        console.log("Sum is " + sum);

    }

    function diff() {
        let c = (a > b) ? a - b : b - a;
        return console.log("Difference of the two numbers is " + c);

    }

    function multiply() {
        let mul = a * b;
        console.log("Multiply result " + mul);
    }


    sum();
    diff();
    multiply();

    // here we can write the whole divideBy function in the return statement
    // and it will give the same result

    // By arraow function
    return () => {
        let divide = a / b;
        let fixedToThreeDigit = (divide < 1) ? divide.toFixed(3) : divide;
        console.log("Division result " + fixedToThreeDigit);
    };


}
let higherResult4 = higherFunction4(500, 200);
higherResult4();
// Nested function end: fourth form

// Nested function start: fifth form
function higherFunction5(a, b) {

    // here all functions namely sum, diff, multiply, divide 
    // have access to the parameter a,b of the higherFunction
    function sum() {
        let sum = a + b;
        console.log("Sum is " + sum);

    }

    function diff() {
        let c = (a > b) ? a - b : b - a;
        return console.log("Difference of the two numbers is " + c);

    }

    function multiply() {
        let mul = a * b;
        console.log("Multiply result " + mul);
    }


    sum();
    diff();
    multiply();

    // here we can write the whole divideBy function in the return statement
    // and it will give the same result

    // By arraow function:
    // Assign inner function to outer function
    higherFunction5 = function() {
            let divide = a / b;
            let fixedToThreeDigit = (divide < 1) ? divide.toFixed(3) : divide;
            console.log("Division result " + fixedToThreeDigit);
        }
        // alternative way:
        /*  higherFunction5 = () => {
            let divide = a / b;
            let fixedToThreeDigit = (divide < 1) ? divide.toFixed(3) : divide;
            console.log("Division result " + fixedToThreeDigit);
        }; */

}
higherFunction5(700, 200) // calls the first three function
higherFunction5(); // calls the divide function with the outer function parameter
// Nested function end: fifth form

// Nested function start: sixth form
function mainFunction6(a, b) {

    // here all functions namely sum, diff, multiply, divide 
    // have access to the parameter a,b of the mainFunction
    function sum() {
        let sum = a + b;
        console.log("Sum is " + sum);

    }

    function diff() {
        let c = (a > b) ? a - b : b - a;
        return console.log("Difference of the two numbers is " + c);

    }

    function multiply() {
        let mul = a * b;
        console.log("Multiply result " + mul);
    }
    sum();
    diff();
    multiply();

    // here we can write the whole divideBy function in the return statement
    // and it will give the same result

    // By arraow function:
    // Assign inner function to outer function
    mainFunction6 = (a, b) => {
        let divide = a / b;
        let fixedToThreeDigit = (divide < 1) ? divide.toFixed(3) : divide;
        console.log("Division result " + fixedToThreeDigit);
    };


}
mainFunction6(700, 200) // calls the first three function
mainFunction6(25, 5); // calls the divide anonymous arrow function with the specefied actual argument
// Nested function end: sixth form

// Functions as array elements
let arrList = [];
arrList[0] = () => console.log("First function as element");
arrList[1] = () => console.log("Second function as element");
arrList[2] = () => console.log("Third function as element");
arrList[3] = () => console.log("Fourth function as element");
console.log(arrList)

// normal for loop
for (let i = 0; i < arrList.length; i++) {
    // let fn = arrList[i];
    // fn();
    // or in single line
    arrList[i]();
}

//by for .. of loop the syntax are more concise
for (let i of arrList) {
    i();
}

(function() {
    // Functions as array elements
    let arrList = [
        function() { console.log("First function as element"); },
    ];
    arrList[0] = () => console.log("First function as element");
    arrList[1] = () => console.log("Second function as element");
    arrList[2] = () => console.log("Third function as element");
    arrList[3] = () => console.log("Fourth function as element");
    console.log(arrList)

    // normal for loop
    for (let i = 0; i < arrList.length; i++) {
        // let fn = arrList[i];
        // fn();
        // or in single line
        arrList[i]();
    }

    //by for .. of loop the syntax are more concise
    for (let i of arrList) {
        i();
    }
})();