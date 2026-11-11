//## JavaScript Array and Object:

/*when creating arrays use box brackets [] 
and when creating object use braces {}

examples:
*/

// examples: 1
(function() {
    let arr = []; // empty array
    let obj = {}; //empty object

    let person = {
        firstName: "Cool",
        LastName: "Tepid",
        job: "Developer",
        email: "cool@cool.com"

        // here before ':' is property(key) and after ':' is the value
    };

    console.log("First Name: " + person.firstName); //First Name: Cool

    // Alternative way of accessing property

    console.log("Alternative way of expressing First Name: " + person['firstName']); //First Name: Cool
})();

// examples:2

(function() {
    // Another example containing all datatype:
    let person = {
        firstName: "Cool", // value of type string
        LastName: "Tepid",
        job: "Developer",
        email: "cool@cool.com",
        age: 28, //Value of type number
        favoriteColor: "Green",
        favoriteMusic: [ // Value of type array
            "Rabindra Sangget",
            "Raga",
            "Gazal"
        ],
        livingPlace: { // Value of type object
            city: "Kolkata",
            country: "India"
        },
        fullName: function() { // Value of type function
            console.log(`I am ${this.firstName} ${this.LastName}`);
        },
        birthYear: function() {
            return (new Date()).getFullYear() - this.age
        },
        getJobTitle: function() {
            return this.job;
        }

    };

    // printing age
    console.log(`Age: ${person.age}`);

    // printing favorite music
    console.log(`My favorite Music: ${person.favoriteMusic}`)

    // printing residence
    console.log(`My Birth Place: ${person.livingPlace.city}, ${person.livingPlace.country}`)

    // printing full name
    console.log("Who am I: " + person.fullName()); // Outputing undefined?
    // console.log(person.fullName());


    // printing birth year
    console.log(`I was Born: ${person.birthYear()}`);

    // printing job title

    console.log(`My profession: ${person.getJobTitle()}`);

})();


//## Dates in JavaScripts are also object
// Example: 3
(function() {
    // Example: 3
    const today = new Date();
    console.log("Today is: " + today);

    const curentMonth = today.getMonth();
    // Returns the month (0–11) in the specified date according to local time.
    console.log("Current month: " + curentMonth);
    //Output: Thursday

    const weekday = today.getDay();
    // Returns the day of the week (0–6) for the specified date according to local time.
    console.log("Today is: " + weekday);
    /*If needed, the full name of a day ("Monday" for example) 
    can be obtained by using Intl.DateTimeFormat with an options parameter.
    */
    let options = { weekday: 'long' };
    console.log(new Intl.DateTimeFormat('en-US', options).format(weekday));

    const curentFullYear = today.getFullYear();
    console.log("This year: " + curentFullYear);

    const curentHours = today.getHours();
    console.log("Current hour is: " + curentHours);

    const curentMinutes = today.getMinutes();
    console.log("Current minute is: " + curentMinutes);

    const curentSeconds = today.getSeconds();
    console.log("Current second is: " + curentSeconds);

    /*Today is: Wed Mar 11 2020 23:18:55 GMT+0530 (India Standard Time)
    Current month: 2
    Today is: 3
    This year: 2020
    Current hour is: 23
    Current minute is: 18
    Current second is: 55 
    */
})();

// set will set the value
// example: 4
(function() {
    today.setDate(25);
    let output = today.getDate(25);
    console.log(output);
})();



// ## Array of object
// example:5
(function() {
    let cars = [
        { model: "Lxi", engine: 6.0 },
        { model: "Vxi", engine: 6.5 },
        { model: "Zxi", engine: 7.0 },
    ];


    console.log(cars); // Objects in browser and 
    // in Nodejs
    /*[ { model: 'Lxi', engine: 6 },
      { model: 'Vxi', engine: 6.5 },
      { model: 'Zxi', engine: 7 } ]
    */
    // Outputting each model

    for (let i = 0; i < cars.length; i++) {
        console.log("Number of Models available: " + cars.length);

        console.log("These are : " + (i + 1) + ". " + cars[i].model);
    }

    /*
    Number of Models available: 3
    These are : 1. Lxi
    Number of Models available: 3
    These are : 2. Vxi
    Number of Models available: 3
    These are : 3. Zxi

    */
})();

// Example:6

(function() {
    const numberArray = [1, 2, 3];
    numberArray[0] = 5;
    //this will reset the first element of the array to 5 in place of 1
    console.log(numberArray); //[ 5, 2, 3 ]

    numberArray.push(7);
    console.log(numberArray); //[ 5, 2, 3, 7 ]

    /*You can assign a value to the object 
    but you cannot reassign the name
    */

    let person = {
        name: "Abc",
        age: 28
    };

    person.name = "Cool"; // It will reassign the value of 'name' property to "Cool"
    console.log(person);
})();