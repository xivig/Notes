// constructor approach: 1
(function() {
    function userCreator(name, score) {
        this.name = name;
        this.score = score;
    }

    userCreator.prototype.sayName = function() {
        console.log("I am " + this.name);
    };

    userCreator.prototype.increment = function() {
        this.score++;
        console.log(this.score);
    };

    const user1 = new userCreator("Abc", 10);
    const user2 = new userCreator("Cool", 20);

    user1.sayName(); //I am Abc
    user2.sayName(); //I am Cool

    user1.increment(); //11
    user2.increment(); //22
})();

// constructor approach: 2
(function() {
    // Name should be capitalized to differentiate from the normal function
    function Employee(name, salary, empNumber) {
        // Javascript engine automatically set to the following line:
        // var this = {};
        this.name = name;
        this.salary = salary;
        this.empNumber = empNumber;
        // At the end engine return the following line:
        // return this;
    }

    /* Now age is assigned to prototype property and
    the age property now accessible to all object instances */
    Employee.prototype.age = 28;
    // 2. We can instantiate "objects" from constructor function using 'new'
    //  keyword and modifying a 'constructor function' will affect all the relevant objects

    let empObject1 = new Employee(1008, "Cool", 52000);
    let empObject2 = new Employee(1009, "Cool", 54000);

    console.log(empObject1.age); //28
    console.log(empObject2.age); //28


})();

// constructor approach: 3
(function() {
    // Constructor function Person
    function Person(first, last, age, gender, interests) {
        this.name = {
            'first': first,
            'last': last
        };
        this.age = age;
        this.gender = gender;
        this.interests = interests;
        this.bio = function() {
            // First define a string, and make it equal to the part of
            // the bio that we know will always be the same.
            var string = this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. ';
            // define a variable that will contain the pronoun part of
            // the second sentence
            var pronoun;

            // check what the value of gender is, and set pronoun
            // to an appropriate value in each case
            if (this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
                pronoun = 'He likes ';
            } else if (this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
                pronoun = 'She likes ';
            } else {
                pronoun = 'They like ';
            }

            // add the pronoun string on to the end of the main string
            string += pronoun;

            // use another conditional to structure the last part of the
            // second sentence depending on whether the number of interests
            // is 1, 2, or 3
            if (this.interests.length === 1) {
                string += this.interests[0] + '.';
            } else if (this.interests.length === 2) {
                string += this.interests[0] + ' and ' + this.interests[1] + '.';
            } else {
                // if there are more than 2 interests, we loop through them
                // all, adding each one to the main string followed by a comma,
                // except for the last one, which needs an and & a full stop
                for (var i = 0; i < this.interests.length; i++) {
                    if (i === this.interests.length - 1) {
                        string += 'and ' + this.interests[i] + '.';
                    } else {
                        string += this.interests[i] + ', ';
                    }
                }
            }

            // finally, with the string built, we console.log() it
            console.log(string);
        };
        this.greeting = function() {
            console.log(`Hi! I'm ${this.name.first}.`);
        };
    };

    let person1 = new Person('John', 'Smith', 28, 'male', ['music', 'reading', 'football']);

    person1.bio(); //John Smith is 28 years old. He likes music, reading, and football.

    Person.prototype
    Object.prototype
    person1.constructor
    person2.constructor
    let person2 = Object.create(person1);
    person2.__proto__ //This will return the person1 object.
    person1.__proto__
    person1.__proto__.__proto__

    let person3 = new person1.constructor('Jane', 'Smith', 26, 'female', ['playing cards', 'dancing']);

    person3.name.first //"Jane"
    person3.age //Hi!I 'm Jane.
    person3.greeting() //26
    person3.bio() //Jane Smith is 26 years old.She likes playing cards and dancing.

    Person.prototype.farewell = function() {
        console.log(this.name.first + ' has left the building. Bye for now!');
    };

    person1.farewell(); //John has left the building. Bye for now!

    person1.constructor.name
})();

// constructor approach: 4
(function() {

    let obj = {}
    obj.constructor === Object // true

    let obj = new Object
    obj.constructor === Object // true

    let arr = []
    arr.constructor === Array // true

    let arr = new Array
    arr.constructor === Array // true

    let number = new Number(3)
    number.constructor === Number // true

    function greet(name) {
        alert(`Hello, my name is ${name}`)
    }
    greet.greet('Bandhu')
})();