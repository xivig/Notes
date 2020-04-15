// 1. function closure
(function() {
    let scope = "I am global";

    function scopeDefinition() {
        let scope = "I am just a local variable inside a function";

        function innerFunction() {
            return console.log(scope);
        }
        return innerFunction;
    }
    scopeDefinition()()
})();

//2. function closure example where function returns function
(function() {
    function addOuter(x) {
        // parameter 'x' is an inner variable
        function add(y) {
            // inner function 'add()' uses 'x', so it has a "closure" over it.
            return x + y;
        }
        //returns the inner function
        return add;
    }

    /* Note: The reference to the inner add(..) function that gets returned with each call to the outer 
    addOter(..) is able to remember whatever x value was passed in to addOuter(..)
    */

    //Calling the addOuter() function

    let result = addOuter(10); // It will return inner function add() and it still needs argument to output

    // Here 'result' gets a reference to the inner 'add(..)' function with closure over the 'x' parameter of the outer addOuter(..).

    console.log(result(5)); //15 ,it retains the value of x as 10. So the output: 10+5 =15
    console.log(result(20)); //30 (10+20)
    console.log(result(25)); //35 (10+25)
})();

// 3. modified function of addOuter() function
(function() {
    // modified function of addOuter() function
    function hello(firstName) {
        // This is a private function
        function greet(lastName) {
            console.log(firstName, lastName)
        }

        function firstname() {
            return console.log(firstName);
        }

        function changeName(newName) {
            firstName = newName;
            console.log(firstName);
        }
        // it returns an object
        return {
            sayHello: greet, // we can use a different name for the property sayHello
            changeName: changeName,
            fName: firstname,

        };
        // returning this object from a function call is called a public API
    }

    let obj = hello("Yisxa");
    obj.fName(); // Yisxa
    obj.changeName("John");
    obj.fName();
    obj.sayHello("Cool!"); // Xivig cool!
})();


// 4. function closure
(function() {
    function hello(name) {

        function greet() {
            console.log(name)
        }
        return greet;
    }

    // it can be called as follows:
    hello("Bandhu")(); //Bandhu

    // or using a reference 
    let fn = hello("Xivig")
    fn(); //Xivig
})();

//5. using as object
(function() {
    function hello(name) {

        function greet() {
            console.log('Hello!', name)
        }
        // it returns an object
        return {
            greet: greet,
            sayHello: greet // we can use a different name for the property sayHello
        };
    }
    // accessing object
    let obj = hello("Bandhu!!");
    obj.greet();
    let obj2 = hello("Cool@")
    obj2.sayHello();
})();

//6. or using an iifee

(function(param) {

    let name = param;

    function greet() {
        return console.log("Hello! " + name)
    }
    greet();

}("Robert"));

//7. Scope and Closure

(function() {
    // Any variables declared in a function get created everytime the function called

    function createPerson() {
        // these are private properties
        let firstName = "John";
        let lastName = "Smith";
        let obj = {
            getFullName: function() {
                return `My full name is ${firstName} ${lastName}`;
            },
            setFullName: function(fname, lname) {
                firstName = fname;
                lastName = lname;
            }
        }

        return obj;

    }

    let individual = createPerson();
    console.log(individual);
    console.log(individual.firstName);
    console.log(individual.getFullName());
    console.log(individual.setFullName("John", "Doe"));
})();