// Synchronous JavaScript

(function() {
    const first = () => {
        console.log("First Arrow function");
        second();
        console.log("The end");
    }

    const second = () => {
        console.log("Second Arrow function");
    }

    // Invoking the first() function
    first();

    // Output:
    // First Arrow function
    // Second Arrow function
    // The end */
})();


// Asynchronous JavaScript
(function() {
    const first = () => {
        console.log("First Arrow function");
        second();
        console.log("The end");
    }

    const second = () => {
        // setTimeout() function for delaying the output
        setTimeout(() => {
            console.log("Asynchronous JavaScript");
        }, 2000); // It will delay 2000 miliseconds   
    }

    // Invoking the first() function
    first();

    // This will Output:
    // First Arrow function
    // The end
    // Asynchronous JavaScript
})();


// function without callback
(function() {
    function first() {
        // simulate a code delay for 2000 miliseconds
        setTimeout(function() {
            console.log("First function with a delay of 2 seconds");
        }, 2000);
    }

    function second() {
        console.log("Second function");
    }

    first();
    second();
})();

(function() {
    let first = () => {
        // simulate a code delay for 2000 miliseconds
        setTimeout(() => {
            console.log("First function with a delay of 2 seconds");
        }, 2000);
        second();
    }

    let second = () => {
        console.log("Second function");
    }

    first();

})();

(function() {
    //1. Create a normal function declaration
    function homeTask(subject) {
        console.log(`Starting for ${subject} home task now.....`)
    }
    homeTask("Math");

    // 2. Now lets add a callback function as a parameter in the homeTask() function

    // Modifying the above funcrion with a callback function
    // Syntax:
    function homeTask(subject, callback) {
        console.log(`Starting for ${subject} home task now.....`);
        callback();
    }

    // Invoking the homeTask() function with annonymous callback function
    homeTask('Math', function() {
        console.log('Finished home task');
    });

    // This can also be written by Arrow function as follows:
    homeTask('Physics', () => {
        console.log('Finished home task');
    });
    /* 
    //Output:
    Starting for Math home task now.....
    Finished home task

    Starting for Physics home task now.....
    Finished home task 
    */

    function finishedHometask() {
        console.log('Finished home task');
    }

    homeTask('Chemistry', finishedHometask);

    /*
    //Output:
    Starting for Chemistry home task now.....
    Finished home task 
    */
})();

(function() {
    //  This function is to be passed as an argument
    function greeting(name) {
        console.log(`Hi, ${name}`);
    }

    function processUserInput(callback) {
        // Getting the username from the prompt
        let name = prompt("Enter your name...");
        callback(name);
        // passing the name parameter to the greeting function when it is called as callback
    }

    // Invoking the processUserInput() with greeting function as an arguement
    processUserInput(greeting);
})();