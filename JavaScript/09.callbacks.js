// Callback: passing a function as a value is often called callback
function foo() {
    console.log("foo");
}
// passing a function(here foo) as value just like a number 42
setTimeout(foo, 4000); //It will output 'foo' after 4 seconds


// 1. Arrow or Lamda function expression
(function() {
    // Arrow function expression
    const message = () => console.log("Welcome to ES6 with Babel");
    // Calling the Arrow function
    message(); // Welcome to ES6 with Babel

    const doubledVar = value => value * 2;
    // or it can be: let doubledVar = value => value * 2
    console.log("Doubled the value is " + doubledVar(20));
    // Doubled the value is 40
})();

// 2. Object creation by Object Literal 
(function() {
    // Object creation by Object Literal
    const employee = {
        name: "Jim",
        salary: 9000,
        getSalary: function() {
            return this.salary * 12;
        }
    };
    //Accessing the Object's property and method by dot access operator
    console.log(`${employee.name} has a anuual Salary of ${employee.getSalary()}`);
})();


// Events can be attached to function(which is called event handler)
//   1. html markup
/* 
< input id = "btn-target"
type = "button"
value = "Text Befor" >
    <
    br > < br >
    <
    input id = "btn"
type = "button"
value = "Event Handler"
onclick = "eventHandler()" >

*/
// 2. JavaScript code to be placed inside the index.html
/* 
function eventHandler() {
    let btnTarget = document.getElementById("btn-target");
    btnTarget.onclick = function () {
        alert("butoon fired");
    };
    btnTarget.value = "Text is replaced!";
}
*/

// callback function
let arrayList = [5, 8, 9, 2, 7, 6, 3, 1, 41];

function sortCallback(arrayList) {
    let newList = [];
    for (let list of arrayList) {
        if (list < 6) {
            newList.push(list);
        }
    }
    return newList;
}

function filter(passingArray, callback) {
    return callback(passingArray);
}
var filtered = filter(arrayList, sortCallback);
console.log(filtered); //(4) [5, 2, 3, 1]

// Callback functions:
//built-in callback functions are setTimeout, Arr.forEach, geolocation.getCurrentPosition 

// 1. define an array and is initialized with value
let names = ['John', 'Jane', 'Elsa', 'Marry', 'Chang'];
// 2.function declaration
// callback function is defined separately   
function greeting(element) {
    console.log(`Hello! ${element}`);
}
// 3.calling of the function
// forEach is the built-in callback function
names.forEach(greeting);

// another variant of forEach() with anonymous function
names.forEach(function(element, index, array) {
    console.log(`${index+1}. Hello! ${element} from the array ${array}`);
});
// another variant of forEach() with arrow function
names.forEach((element, index, array) => console.log(`${index+1}. Hello! ${element} from the array ${array}`));


//Own callback functions
// 1.let names = ['John', 'Jane', 'Elsa', 'Marry', 'Chang']; as already defined so we don't need it
// 2.function declaration
// This is the callback function
function mygreeting() {
    for (let name of names) {
        console.log(`Hello! ${name}`);
    }
}
// 3.Defining the callback containing function
// This is called higher-order function or host function
function myCallback(passingArray, callback) {
    callback(passingArray);
}
// 3a.calling of the higher-order function with callback as a parameter to it
myCallback(names, mygreeting);
// In the above forEach() function both 3. and 3a. are combined together




// C
let callbackFunction = function() {
    console.log('I am called from inside a function');
};

let higherOrderFunction = function(callback) {
    console.log('Hey I am from Higher-order function');
    callback();
};

higherOrderFunction(callbackFunction);

(function() {})();
// console.log(`${  }`);

// Two functions are are combined in a single function
let calculation = function(number1, number2, calculationType) {
    if (calculationType === 'add') {
        return number1 + number2;
    } else if (calculationType === 'mul') {
        return number1 * number2;
    }
};
console.log(calculation(500, 40, 'add'));
console.log(calculation(500, 40, 'mul'));

(function() {
    // Individual function definition
    function add(a, b) {
        return console.log('Sum =', a + b);
    }

    function sub(a, b) {
        return console.log('Diff =', a - b);
    }

    function mul(a, b) {
        return console.log('Multiplication =', a * b);
    }

    function div(a, b) {
        return console.log('Division =', a / b);
    }

    // definition of callback containing function
    function callingCallback(a, b, callback) {
        // Make sure that the callback is a function not other
        if (typeof callback === 'function') {
            return callback(a, b);
        }
    }
    // calling function with the callback provided
    console.log('I am called from callback containing function');
    callingCallback(5, 6, add);
    callingCallback(5, 6, sub);
    callingCallback(5, 6, mul);
    callingCallback(5, 6, div);
})();

function square(x) {
    return console.log('Square ', x * x);
}

function greet(name) {
    return console.log(`Hello! ${name}`);
}

function fullName(fname, lname) {
    return console.log(`Hello! My name is ${fname} ${lname}`);
}

let variableArray = [{
        number: 5,
        fruit: 'Apple'
    },
    {
        number: 7,
        fruit: 'Banana'
    },
    {
        number: 3,
        fruit: 'Orange'
    },
    {
        number: 8,
        fruit: 'Guava'
    },
    {
        number: 9,
        fruit: 'Pine Apple'
    }
];

// sorting the array by number
function sorting(value1, value2) {
    if (value1.number < value2.number) {
        return -1;
    } else {
        return 1;
    }
}

variableArray.sort(sorting); // stored the sorted array in the same array

// Normal for loop
console.log('From Normal for loop');
for (let i = 0; i < variableArray.length; i++) {
    console.log(variableArray[i].number, variableArray[i].fruit);
}

// from for .. of loop
console.log('From for ... of loop');
for (let i of variableArray) {
    console.log(i.number, i.fruit);
}
// forEach loop
console.log('From forEach loop');
variableArray.forEach((element) => {
    console.log(element.number, element.fruit);
});

// Callback function real example
// function definition of callback containing function
let proCallback = function(good, average, checkCharacter) {
    let timmer = Math.floor(Math.random() * 1000);
    if (checkCharacter.isCheck) {
        // good(checkCharacter.name)
        setTimeout(good, timmer, checkCharacter.name);
    } else {
        // average(checkCharacter.name)
        setTimeout(average, timmer, checkCharacter.name);
    }
};

let checkGood = function(name) {
    console.log('Depending on the test ', name, 'is a good Programmer');
};
let checkAvg = function(name) {
    console.log('Depending on the test ', name, 'is a average Programmer');
};

let programmer = (function() {
    const john = {
        name: 'John',
        isCheck: true
    };
    const jane = {
        name: 'Jane',
        isCheck: false
    };
    // using callback function and calling here
    proCallback(checkGood, checkAvg, john);
    proCallback(checkGood, checkAvg, jane);
})();

// callback function example 2
let students = [{
        name: 'Raju',
        score: 90,
        school: 'High School'
    },
    {
        name: 'Rabi',
        score: 100,
        school: 'Junior High School'
    },
    {
        name: 'Ratan',
        score: 50,
        school: 'High School'
    },
    {
        name: 'Rudra',
        score: 90,
        school: 'Junior High School'
    },
    {
        name: 'Ranjan',
        score: 85,
        school: 'High School'
    },
    {
        name: 'Rajpal',
        score: 95,
        school: 'Junior High School'
    },
    {
        name: 'Ramma',
        score: 75,
        school: 'High School'
    }
];

let checkStudents = function(data, callback) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].school.toLowerCase() === 'junior high school') {
            if (typeof callback === 'function') {
                callback(data[i]);
            }
        }
    }
};
checkStudents(students, function(obj) {
    if (obj.score > 75) {
        console.log(obj.name + ' passed with Distinction.');
    }
});

// sum total of score and no of students
let checkTotal = function() {
    let sum = 0;
    let counter = 0;
    checkStudents(students, (obj) => {
        sum = sum + obj.score;
        counter++;
    });
    console.log('Total Score: ', sum, ' Total No of Students: ', counter);
};
checkTotal();

// explain???
(function() {
    const nameList = {
        names: [],
        newName: null,
        init: function(callback) {
            this.newName = callback;
        },
        addName: function(name) {
            this.names.push(name);
            this.newName(name, this.names);
        }
    };
    nameList.init(function(newName, allNames) {
        console.log(newName);
        console.log('The list of all Name: ', allNames);
    });

    nameList.addName('Cool');
    nameList.addName('Robert');
})();

// Callback hell example
function getRecipe() {
    const recipeID = [1, 2, 3, 4, 5];
    //  console.log(recipeID);
    const recipe = {
        title: 'American Pasta',
        publisher: 'Xivig'
    };
    const recipe2 = {
        title: 'Italian Pitzza',
        publisher: 'Yisxa'
    };
    const recipe3 = {
        title: 'American Chopsee',
        publisher: 'Bandhu'
    };
    const recipe4 = {
        title: 'Green Salad',
        publisher: 'Cool'
    };
    const recipe5 = {
        title: 'Spagetti Pitzza',
        publisher: 'Suzy'
    };
    // Callback hell
    setTimeout(
        (id) => {
            console.log(`${id}: ${recipe5.title} by ${recipe5.publisher}`);
            setTimeout(
                (id) => {
                    console.log(`${id}: ${recipe.title} by ${recipe.publisher}`);
                    setTimeout(
                        (id) => {
                            console.log(`${id}: ${recipe2.title} by ${recipe2.publisher}`);
                            setTimeout(
                                (id) => {
                                    console.log(`${id}: ${recipe3.title} by ${recipe3.publisher}`);
                                    setTimeout(
                                        (id) => {
                                            console.log(`${id}: ${recipe4.title} by ${recipe4.publisher}`);
                                        },
                                        5000,
                                        recipeID[2]
                                    );
                                },
                                4000,
                                recipeID[0]
                            );
                        },
                        3000,
                        recipeID[1]
                    );
                },
                2000,
                recipeID[3]
            );
        },
        1000,
        recipeID[4]
    );
}

getRecipe();

// setInterval to check the excution time
/* setInterval(() => {
    let dateTime = new Date();
    console.log(dateTime.toLocaleTimeString());
}, 1000);

 */


// example 2
const posts = [{
        title: 'JavaScript Inheritance',
        body: 'This is about inheritance in javascript'
    },
    {
        title: 'JavaScript Prototype',
        body: 'This is about prototype in JavaScript'
    }
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
            output += `<p>${post.body}</p>`;
            console.log(output);

        });
        // document.body.innerHTML = output;
    }, 1000);
}


function createPost(post, callback) {
    setTimeout(() => {
        posts.push(post);
        console.log("Post created!")
        callback();
    }, 2000);
}

createPost({
    title: 'JavaScript Callback Hell',
    body: 'This is about callback hell in javascript'
}, getPosts);

console.log(posts);

// Here createPost function call takes the object and pushed to the array of object 'posts'
// and it takes 2 second and after creating the post it will callback the getPosts() and output the result


(function() {
    let person = {
        greet: 'Hi',
        talk: function() {
            console.log(this.greet, "Bro!")
        }
    }

    // function binding using bind keyword
    let referenceFunction = person.talk
    let boundFunction = referenceFunction.bind(person);
    boundFunction();



    // let button = document.getElementById('mycoolButton');
    // button.addEventListener('click', person.talk.bind(person));
})();


(function() {

    const person = {
        getFullName: function() {
            console.log(this.firstName, "", this.lastName);
        }
    }

    person.__proto__.hobby = function() {
        console.log("Cool Hobby");
    }

    // creating object by Object.craete(obj) method
    const person1 = Object.create(person);
    person1.firstName = "John";
    person1.lastName = "Doe";
    person1.getFullName();

    let person2 = Object.create(person);
    person2.hobby = function() {
        console.log('I loved to watch movie');
    }

    person1.hobby(); // Cool Hobby
    person2.hobby(); //I loved to watch movie

})();


(function() {
    // detecting the targeting tag by 'this' keyword
    var target = document.getElementById("mycoolButton");
    target.addEventListener("click", function() {
        console.log(this);
    }, false);
})();