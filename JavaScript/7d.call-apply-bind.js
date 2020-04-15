/* 
// ## Function Context:
* Functions in JavaScript run in a specific context, and using the 'this' variable we have access to it.

* All standard functions in the browser run under the Window context.Functions defined under an object or 
another function will use the context of the object it was created in .However, we can also change the 
context of a function at runtime, either before or while executing the function.

* Functions are treated as Objects that are composed of a name(optional, can be anonymous) and the code it executes when it is invoked.

- call(), apply() and bind() are methods which are used to control the invocation of the function.
- call() and apply() were introduced in ECMAScript3 while bind() was added as part of ECMAScript5.
- call() and apply() is used to invoke the function immediately.
- bind() con be used when the function needs to be called later in certain events when it's useful.
- call(), apply() and bind() methods come in handy when setting the 'this' value.

** Some facts about 'this' keyword **
- 'this' always refers to an object.
- 'this' refers to an object which calls the function it contains.
- In the global context 'this' refers to either windows object or is undefined if the 'strict mode' is used.


::Determination of 'this' keyword::
whenever you see the 'this' keyword inside of a function, these are the steps you take in order to figure out what it’s referencing:

1. Look to where the function was invoked.
2. Is there an object to the left of the dot? If so, that’s what the 'this' keyword is referencing. If not, continue to #3.
3. Was the function invoked with 'call', 'apply', or 'bind'? If so, it’ll explicitly state what the 'this' keyword is referencing. If not, continue to #4.
4. Was the function invoked using the 'new' keyword? If so, the 'this' keyword is referencing the newly created object that was made by the JavaScript interpreter. If not, continue to #5.
5. Is 'this' inside of an arrow function? If so, its reference may be found lexically in the enclosing (parent) scope. If not, continue to #6.
6. Are you in 'strict mode'? If yes, the 'this' keyword is undefined. If not, continue to #7.
7. JavaScript is weird. 'this' is referencing the 'window' object.

*/

// Creating object

(function() {
    let person = {
            firstName: "John",
            lastName: "Doe",
            age: 29,
            display: function() {
                console.log('I am', this.firstName, this.lastName, 'and I am', this.age, 'year old');
            },

        }
        // accessing object property
    person.display(); //I am John Doe and I am 29 year old
    // This code works perfectly fine
    // But what if we want to borrow a method from the above object? like:

    let displayInfo = person.display();
    displayInfo; //I am John Doe and I am 29 year old
    // console.log(displayInfo()); //TypeError: displayInfo is not a function
    // The above example gives error because there 'this' is assigned to the global context(i.e., window object) which doesn't have neither firstName , lastName nor the age property.

    // Solution: In such cases we can use bind() method of the Function.Prototype property.
    // This means bind() is available for every single function
    let personInfo = person.display.bind(person);
    personInfo();
    /* The bind() method creates a new function where 'this' refers to the parameter in the parenthese, in the above case it is the "person" object. This way the bind() method enables calling a function with a specific 'this' value. */


    // what if we would like to pass a parameter to the display() method?
    // Answer: The following example gives the essence of display(param) as displayJob(param):
    let person2 = {
        firstName: "John",
        lastName: "Doe",
        age: 29,
        displayJob: function(jobtitle) {
            let determineVowelConsonant = jobtitle.charAt(0);
            let selected;
            switch (determineVowelConsonant) {
                case 'a':
                    selected = 'an';
                    break;
                case 'e':
                    selected = 'an';
                    break;
                case 'i':
                    selected = 'an';
                    break;
                case 'o':
                    selected = 'an';
                    break;
                case 'u':
                    selected = 'an';
                    break;
                case 'A':
                    selected = 'an';
                    break;
                case 'E':
                    selected = 'an';
                    break;
                case 'I':
                    selected = 'an';
                    break;
                case 'O':
                    selected = 'an';
                    break;
                case 'U':
                    selected = 'an';
                    break;
                default:
                    selected = 'a';
                    break;
            }

            if (selected) {
                jobtitle = selected + ' ' + jobtitle;
            }

            console.log(this.firstName + ' ' + this.lastName + ' is ' + jobtitle);
        }

    }

    // passing arguments with bind()
    let personJob = person2.displayJob.bind(person, "Engineer")
    personJob()


    // apply() method 
    person2.displayJob.apply(person2, ['Programmer']);

    // use of call() function 
    person2.displayJob.call(person2, "Architech");

    /* ::Note:: 
    When using the apply() function the parameter must be supplied in the form of an array.Just remember:
    call() -- c[arguments]
    apply() -- a[array]
    */

})();


// * Binding a method to an object:
(function() {

    // To bind a function to an object and make it an object method, we can use the bind function.Here is a simple example:

    let person = {
        name: "Robert"
    };

    function displayName() {
        console.log(this.name);
    }
    /* Obviously, we are not able to call displayName() without associating the function with the object person.
    To do this we must create a bound method of the function displayName to person, using the following code: */

    let boundName = displayName.bind(person);
    boundName(); // prints out "Robert"

})();

// ## Calling a function with a different context::
(function() {
    /* We can use the call and apply functions to call a function as if it was bound to an object. 
    The difference between the call and apply functions is only by how they receive their arguments - the call function receives the 'this' argument first, and afterwards the arguments of the function, whereas the apply function receives the 'this' argument first, and an array of arguments to pass on to the function as a second argument to the function. */

    // As for example, let's call displayName with person as the context using the call method:
    let person = {
        name: "Robert"
    };

    function displayName() {
        console.log(this.name);
    }
    displayName.call(person); // prints out "Robert"

})();

(function() {
    /* ## call/apply vs bind::
    The difference between call/apply and bind is that bind returns a new function identical to the old function, except that the value of 'this' in the new function is now the object it was bound to. 
    call/apply calls the function with 'this' being the bound object, but it does not return a new function or change the original, it calls it with a different value for 'this'.

    As for example:
    */
    let person = {
        name: "Robert"
    };

    function displayName() {
        console.log(this.name);
    }
    // ❌ And this won't work
    /* var boundName = displayName.call(person); //boundName gets displayName's return value (null)
    boundName(); // Gives errors: doesn't work because it's not a function, it's null
    // ❌ And this won't work
    displayName.bind(person); //returns a new function, but nothing is using it so it's useless
    displayName(); //throws error because this.name is not defined */
})();


(function() {
    let person = {
        name: "Robert"
    };

    function displayName() {
        console.log(this.name);
    }
    // Think of call as executing the return value of bind.
    // For example:

    displayName.call(person); //is the same as
    displayName.bind(person)(); //executes the function returned by bind


    // Or think of bind returning a shortcut to call.
    // For example:
    let boundName = displayName.bind(person); //is the same as
    console.log(boundName());

    let boundName = function() {
        displayName.call(person);
    }
})();


(function() {
    // Example 2:
    var person = {
        firstName: "John",
        lastName: "Smith",
        age: 23
    };

    function getFullName() {
        console.log(this.firstName + " " + this.lastName);
    }

    function getDetails() {
        console.log(this.firstName + " is " + this.age + " years old");
    }

    // : creating bound copies of getFullName and getDetails.
    let boundFullName = getFullName.bind(person);
    let boundDetails = getDetails.bind(person);

    boundFullName();
    boundDetails();
})();


(function() {
    // 1. Passing Arrays as Function Arguments::
    function sandwich(a, b, c) {
        console.log(a) // '🍞'
        console.log(b) // '🥬'
        console.log(c) // '🥓'
    }

    const food = ['🍞', '🥬', '🥓'];
    // old way
    sandwich.apply(null, food);

    // ✅ ES6 way
    sandwich(...food);
    // Find the Largest Number::
    const largest = Math.max(5, 7, 3, 4);
    console.log(largest); // 7

    // This would be terrible:
    const numbers = [59, 77, 31];

    // 🤮 Yuck!
    console.log(Math.min(numbers[0], numbers[1], numbers[2])); //31

    // ❌ And this won't work
    console.log(Math.max(numbers)); // NaN

    //  we can use ES6's Spread Operator to solve the problem!
    const numbers2 = [15, 75, 33];

    // 😍 Much Better!
    console.log(Math.max(...numbers2)); // 75
    // What spread is doing here is taking the array element and expanding or unpacking it into a list of arguments for our variadic function.
    /*  What is a variadic function?
    A variadic function is a function that accepts an infinite or variable number of arguments. */
    const numbers3 = [55, 87, 93];

    console.log(...numbers3); // 55 87 93

    // Explaining spread in non - dev terms:
    /* // what spread does is:
    - It unpacks(spread) the nested elements into individual elements.
    - Now you have all these individual elements(arguments) to place nicely in your function.
    */

    // 2. Passing Multiple Arrays as Function Arguments:

    const one = [1, 2, 3];
    const two = [4, 5, 6];

    const merged = [...one, ...two];
    console.log(merged); // [ 1, 2, 3, 4, 5, 6 ]

    const three = [3, 4, 5];
    const four = [6, 7, 8];

    console.log(Math.max(...three, ...four)); // 8

    // It will create an array of length 20 and fill with all 5 and sum up to 100
    let autoArray = new Array(20).fill(5).reduce((a, b) => a + b)
    console.log(autoArray);

})();


(function() {

    let yearOfBirth = [1990, 1965, 1937, 2005, 1998];
    // This is the higher-order function
    function arrayCalculation(arr, fn) {
        let arrResult = [];
        for (let i of arr) {
            arrResult.push(fn(i));
        }
        return arrResult;
    }

    function calculateAge(element) {
        return 2020 - element;

    }

    function isCheckAge(limit, element) {
        return element >= limit;
    }

    // function called with callback function(calculateAge) and returns an array and stored in a variable
    let ages = arrayCalculation(yearOfBirth, calculateAge);
    // Now passing the retured array to the higher-order function and invoked it with bind() method
    let isPermissibleAge = arrayCalculation(ages, isCheckAge.bind(this, 20));
    console.log(ages); //[ 30, 55, 83, 15, 22 ]
    console.log(isPermissibleAge); //[ true, true, true, false, true ]

})();


// call or Function.prototype.call():
(function() {
    // Step 1:
    var person = {
        firstName: "John",
        lastName: "Smith",
    };
    // Step 2:
    let greetings = function(age, job, company) {
        console.log(`${this.firstName} ${this.lastName} is of ${age} old and working in ${company} as ${job}`);
    }

    // Step 3:
    // invoking the function.
    greetings.call(person, 28, "Developer", "Google");

})();

// apply or Function.prototype.apply():
(function() {
    // Step 1:
    let person = {
        firstName: "Jane",
        lastName: "Smith",
    };
    // Step 2:
    let greetings = function(age, job, company) {
        console.log(`${this.firstName} ${this.lastName} is of ${age} old and working in ${company} as ${job}`);
    }

    // Step 3: passing array of arguments
    let passingArray = [29, "Designer", "Microsoft"];

    // Step 4: invoking the function.
    greetings.apply(person, passingArray);

    // Step 4 can be written as follows:
    greetings.apply(person, [29, "Designer", "Microsoft"]);

})();

// bind or Function.prototype.bind():
(function() {
    // Step 1:
    let person = {
        firstName: "Robert",
        lastName: "Smith",
    };
    // Step 2:
    let greetings = function(age, job, company) {
        console.log(`${this.firstName} ${this.lastName} is of ${age} old and working in ${company} as ${job}`);
    }

    // Step 3: creating bound copies of greetings.
    let boundGreetings = greetings.bind(person);

    // Step 4: invoking the function.
    boundGreetings(this, 30, "DevOps", "Amazon");

})();

function checkFun(a, b, c) {
    console.log(this);
    console.log(a);
    console.log(b);
    console.log(c);
}
checkFun.call(1, 2, 3, 4);