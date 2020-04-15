// 1. Declaration of variable
(function() {
    // Declaration of identifier or variable using var keyword
    var variableName;

    // e.g., var message;
    var message;

    // declaring variable with snake case
    let last_name = "cool";

    //1a. Initialization of varibale
    // e.g., var message = "Welcome to Nodejs!";
    message = "Welcome to Nodejs!";

    // 1b. Logout the output to console
    console.log(message); // Welcome to Nodejs!

})();

//2. Declaration and Initialization using var keyward in a single line
(function() {
    // Declaration and Initialization using var keyward
    // var variableName = value;
    // We can write the both statement in a single line
    var message = "Welcome to Nodejs!";
    // 1b. Logout the output to console
    console.log(message); // Welcome to Nodejs!


})();

// 3. Variable scope
(function() {
    var number = 20; // global scope
    function test() {
        var number = 100; // local scope
        console.log("Value of number inside test() function is: " + number); // 

    }
    console.log("Value of number outside test() function is: " + number); // 

})();

//4. Declaration and Initialization using let keyward
(function() {
    let name = "Bandhu";
    // You can't Redeclare name variable
    // let name = "Abc"; //  This will output an error
})();

// 5. Solution to the above problem
(function() {
    // Solution:
    let name = "Bandhu";
    name = "Abc";
    console.log(name); // Abc
})();

// 6. Alternative to solution 4:
(function() {
    // Alternative way:
    let name;
    name = "Abc";
    console.log(name);
})();

// 7. You can declare multiple variables in a single line by comma separated manner
(function() {
    // You can declare multiple variables by using the following
    let name, age, job, interest;
    name = "Robert";
    age = 28;
    job = "Developer";
    interest = ["Music", "Football", "Watching Movie"];
    console.log(name, age, job);

    for (let i of interest) {
        console.log(i);
    }
})();

// 8. block scope 
(function() {
    if (true) {
        let name = "Xivig";
    }
    // console.log(name); //generates an error
})();