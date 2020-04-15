//1. Array.from()
Array.from({
    length: 10
}, (number, index) => {
    console.log(`${++index}`);
}); //1 2 3 4 5 6 7 8 9 10

let arr = [28, 28, 55, 75, 53, 89, 15, 19, 39, 44];


//3. Array.map()
arr.map(function(item, index, array) {
    return console.log("element at " + index + " is " + item);
});

//4. Array.reduce() methods:
let result = arr.reduce(function(prev, next) {
    return prev + next;
});
console.log(result);

//2. Array.forEach()
arr.forEach(function(item, index, array) {
    console.log(`${item} is at index ${index} in ${array}`);
});

(function() {
    // ## foreach() loop: forEach() method allows to run a function for every element of the array.
    // Syntax:
    let arrayExample = [];
    arrayExample.forEach(function(item, index, array) {
        // do something
    });
    let languageKnown = ['Swift', 'JavaScript', 'Haskell', 'Java', 'C#'];
    // e.g.,
    languageKnown.forEach((element) => console.log(element));
    // Here for each element call alert function

    // This can be done as:
    languageKnown.forEach((element) => console.log(element));

    // Or, More precise way:
    languageKnown.forEach((item, index, array) => {
        console.log(`${item} is at index ${index} in array [${array}]`);
    });

    // Swift is at index 0 in array Swift,JavaScript,Haskell,Java,C#
    // JavaScript is at index 1 in array Swift,JavaScript,Haskell,Java,C#
    // Haskell is at index 2 in array Swift,JavaScript,Haskell,Java,C#
    // Java is at index 3 in array Swift,JavaScript,Haskell,Java,C#
    // C# is at index 4 in array Swift,JavaScript,Haskell,Java,C#


    // Or, anotherway:
    ['Swift', 'JavaScript', 'Haskell', 'Java', 'C#'].forEach((item, index, array) => {
        console.log(`${item} is at index ${index} in array [${array}]`);
    });
})();


(function() {
    const numbers = [1, 2, 3, 4, 5];
    numbers.forEach(item => {
        console.log(`Square root of ${item} is ${Math.sqrt(item)}`);
        console.log(`Square of ${item} is ${item*item}`);
        console.log(`Cube of ${item} is ${item*item*item}`);
        console.log(`Logarith of ${item} is ${Math.log(item)}`);
    });
})();

// 1. Mathematical operation like root, square, cube ang log of first 25 numbers
for (let item = 1; item <= 25; item++) {
    console.log(`Square root of ${item} is ${Math.sqrt(item)}`);
    console.log(`Square of ${item} is ${item*item}`);
    console.log(`Cube of ${item} is ${item*item*item}`);
    console.log(`Logarith of ${item} is ${Math.log(item)}`);
}


// 2. Making an array of random number automatically
(function() {
    function makingArray() {

        let numberContainer = [];

        for (let i = 0; i < 10; i++) {
            // generating a random number between 0-99
            let randomNumber = Math.random() * 100;

            // It will give a two digit number
            let twoDigitNumber = randomNumber.toPrecision(3);

            let roundedUp = Math.round(twoDigitNumber);
            if (roundedUp === 0) {
                roundedUp += 1;
            }
            numberContainer.push(roundedUp);

        }

        return numberContainer;
    }

    console.log(makingArray());
    let ourArray = makingArray();
    console.log(ourArray)
        // Defining a higher-order function
    ourArray.forEach((value) => {
        console.log(`From Annonymous callback: Double of the number ${value} is ${value * 2}`);
    });


    // Callback with named arrow function
    const doubledVar = value => {
        console.log(`From Arrow callback: Double of the ${value} is ${value * 2}`);
    };
    ourArray.forEach(doubledVar);

    (function() {
        function doubledVar(value) {
            console.log(`From separate callback: Double of the ${value} is ${value * 2}`);
        }
        ourArray.forEach(doubledVar);
    })();

})();

// This will give the same result as above
Array.apply(null, Array(3)).map(Function.prototype.call.bind(Number)); //(3) [0, 1, 2]