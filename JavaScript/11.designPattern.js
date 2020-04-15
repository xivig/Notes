
// 1. The Factory pattern
function createPerson(fname, lname, age, job) {
    let obj = new Object();
    obj.fname = fname;
    obj.lname = lname;
    obj.age = age;
    obj.job = job;
    obj.fullName = function () {
        console.log(`His full name is ${this.fname} ${this.lname}`);
    };
    return obj;
}

let person1 = createPerson("Juley", "Smith", 28, "Developer");
let person2 = createPerson("Jooyee", "Anderson", 28, "Designer");

console.log(person1.fullName()); //His full name is Juley Smith
console.log(person2.fullName()); //His full name is Jooyee Anderson

// 2. The Constructor pattern

//  The Constructor function
function Employee(firstName, lastName, gender, designation) {
    //let this = {};
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.designation = designation;
    this.fullName = function () {
        console.log(`His full name is ${this.firstName} ${this.lastName}`);
    };
    //return this;
}
// when you use constructor function with the 'new' keyword javascript inserts two lines
// 1. let this = {};
// 2. at the end 'return this;'
// In constructor mode function should be Capitalize to specify the other programmer
//  that it is a constructor but not a regular function
let employee1 = new Employee("Steve", "Moore", "M", "Developer");
console.log(employee1.fullName()); //employeeObjectOne {firstName: "Steve", lastName: "Moore", gender: "M", designation: "Developer"}
// Calling a constructor function without the new keyword doesn't work! 
// No new object gets created , and the return value is undefined

// 3. The Prototype pattern

// Constructor function without any variable
function Person() {

}

Person.prototype.firstName = "Colrej";
Person.prototype.lastName = "Mano";
Person.prototype.age = 28;
Person.prototype.job = "Engineer";
Person.prototype.fullName = function () {
    console.log(`His full name is ${this.firstName} ${this.lastName}`);
};

let person3 = new Person();
let person4 = new Person();

person3.fullName();

console.log(person3.fullName === person4.fullName); // return true
console.log(person3.hasOwnProperty('fullName')); // return false
// console.log(person4.isPrototypeOf(person4));

// 3a. Alternative Prototype Syntax

function Person22() {

}

Person22.prototype = {
    firstName: "Cool",
    lastName: "Mann",
    age: 28,
    job: "Engineer",
    fullName: function () {
        console.log(`His full name is ${this.firstName} ${this.lastName}`);
    }
};

let friend = new Person22();

friend.fullName(); /* His full name is Cool Mann */
console.log(friend instanceof Object); // return true
console.log(friend.constructor === Object); // return true
console.log(friend.constructor === Person22); // return false

// 3b. Alternative Prototype Syntax

function Person33() {

}

Person33.prototype = {
    constructor: Person33, /* New line added */
    firstName: "Rosa",
    lastName: "Smith",
    age: 28,
    job: "Engineer",
    fullName: function () {
        console.log(`His full name is ${this.firstName} ${this.lastName}`);
    }
};

let friend33 = new Person33();

friend33.fullName(); /* His full name is Rosa Smith */
console.log(friend33 instanceof Object); // return true
console.log(friend33.constructor === Object); // return false
console.log(friend33.constructor === Person33); // return true

// 3c. Alternative Prototype Syntax

function Person44() {

}

Person44.prototype = {
    
    firstName: "Succy",
    lastName: "Smith",
    age: 28,
    job: "Engineer",
    fullName: function () {
        console.log(`His full name is ${this.firstName} ${this.lastName}`);
    }
};
// ES5 only- restore the constructor
Object.defineProperty(Person44.prototype, "constructor", {
    enumerable: false,
    value: Person44
});

let person44 = new Person44();

Person44.prototype.sayHi = function(){
    console.log("Hi! Man");
}

person44.fullName(); /* His full name is Cool Mann */
console.log(person44 instanceof Object); // return true
console.log(person44.constructor === Object); // return false
console.log(person44.constructor === Person44); // return true

person44.sayHi(); /* Hi! Man */


// 4. Combination of Constructor/Prototype pattern

function Person55(firstName, lastName, gender, designation){
     //let this = {};
     this.firstName = firstName;
     this.lastName = lastName;
     this.gender = gender;
     this.designation = designation;
    this.friends = ["Abby", "Ruby"];
     //return this;
}
// when you use constructor function with the 'new' keyword javascript inserts two lines
// 1. let this = {};
// 2. at the end 'return this;'
// In constructor mode function should be Capitalize to specify the other programmer
//  that it is a constructor but not a regular function

Person55.prototype = {
    constructor: Person55,    /* New line added */
    fullName: function () {
        console.log(`His full name is ${this.firstName} ${this.lastName}`);
    }
};


let person55 = new Person55("CleK", "Boyd", "M", "Developer");
let person56 = new Person55("Mark", "Clark", "M", "Teacher");
person55.friends.push("Babby");
console.log(person55.friends); //["Abby", "Ruby", "Babby"]
console.log(person56.friends); // ["Abby", "Ruby"]
console.log(person55.friends === person56.friends); // return false
console.log(person55.fullName === person56.fullName); // return true

