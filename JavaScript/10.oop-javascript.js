// :: OOP JavaScripts ::

(function() {
    // JavaScript uses functions as if classes to create objects using the new keyword.
    function Person(firstName, lastName) {
        // construct the object using the arguments
        this.firstName = firstName;
        this.lastName = lastName;

        // a method which returns the full name
        this.fullName = function() {
            return this.firstName + " " + this.lastName;
        }
    }

    let person = new Person("John", "Smith");
    console.log(person.fullName()); //John Smith

    // Creating an object using the new keyword is the same as
    // writing the following code:

    let myPerson = {
        firstName: "John",
        lastName: "Doe",
        fullName: function() {
            return this.firstName + " " + this.lastName;
        }
    }

    console.log(myPerson.fullName()); //John Doe

    /* The difference between the two methods of creating objects is
    that the first method uses a class-like syntax to define the object and then
     the new keyword to instantiate it, and the second method immediately
      creates an instance of the object. */
})();

(function() {
    //  ## Inheritance
    /* JavaScript uses prototype based inheritance. Every object has a prototype, and when a method of the object is called then JavaScript tries to find the right function to execute from the prototype object.

    * The prototype attribute:
    Without using the prototype object, we can define the object Person like this: */

    function Person(name, age) {
        this.name = name;
        this.age = age;

        function describe() {
            return this.name + ", " + this.age + " years old.";
        }
    }


})();

(function() {
    /* When creating instances of the Person object, we create a new copy of all members and methods of the functions. This means that every instance of an object will have its own name and age properties, as well as its own describe function.
    However, if we use the Person.prototype object and assign a function to it, it will also work. */

    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype.describe = function() {
            return this.name + ", " + this.age + " years old.";
        }
        /* When creating instances of the Person object, they will not contain a copy of the describe function. Instead, when calling an object method, JavaScript will attempt to resolve the describe function first from the object itself, and then using its prototype attribute.*/
})();


(function() {
    // Inheritance::
    // Now we want to create a Person object, and a Student object derived from Person: 

    let Person = function() {};

    Person.prototype.initialize = function(name, age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype.describe = function() {
        return this.name + ", " + this.age + " years old.";
    }

    let Student = function() {};
    Student.prototype = new Person();

    Student.prototype.learning = function(subject) {
        console.log(this.name + " just learned " + subject);
    }

    let student = new Student();

    student.initialize("Bandhu", 25);
    student.learning("Inheritance"); //Bandhu just learned Inheritance
    /* In this example, the initialize() method belongs to Person and the learning() method belongs to Student, both of which are now part of the student object.  */
})();

(function() {
    // Example type 1:
    let Person = function() {};

    Person.prototype.initialize = function(name, age) {
        this.name = name;
        this.age = age;
    }

    // TODO: create the class Teacher and a method teach
    let Teacher = function() {};

    Teacher.prototype = new Person();
    Teacher.prototype.teach = function(subject) {
        console.log(`${this.name} is now teaching ${subject}`);
    }

    let obj = new Teacher();

    obj.initialize("Adam", 45);
    obj.teach("Inheritance");

})();

(function() {
    // Example type 2:
    var Person = function() {};

    Person.prototype.initialize = function(name, age) {
        this.name = name;
        this.age = age;
    }

    let Teacher = function(subject) {
            this.subject = subject;
            this.teach = function() {
                console.log(`${this.name} is now teaching ${this.subject}`);
            }
        }
        // TODO: create the class Teacher and a method teach
    Teacher.prototype = new Person();

    var teacher = new Teacher("C#");

    teacher.initialize("Ranjan", 45);
    teacher.teach(); //Ranjan is now teaching C#

})();

(function() {
    // ##Callbacks:
    /* Callbacks in JavaScript are functions that are passed as arguments to other functions. This is a very important feature of asynchronous programming, and it enables the function that receives the callback to call our code when it finishes a long task, while allowing us to continue the execution of the code.
     */

    // For example:
    let callback = function() {
        console.log("First callback Done!");
    }

    setTimeout(callback, 5000);
    /* This code waits 5 seconds and prints out "Done!" when the 5 seconds are up. Note that this code will not work in the interpreter because it is not designed for handling callbacks.
    It is also possible to define callbacks as anonymous functions, like so: */

    setTimeout(function() {
        console.log("Done!");
    }, 5000);
    // Like regular functions, callbacks can receive arguments and be executed more than once.

})();

// Object.create() method
(function() {
    // Object.create
    let person = {
        calAge: function() {
            console.log(2020 - this.dob);
        }
    };

    let abc = Object.create(person);
    abc.name = "Abc";
    abc.dob = 2001;
    abc.job = "developer";

    // another way
    let cool = Object.create(person, {
        name: { value: "Cool" },
        dob: { value: 1991 },
        job: { value: "Designer" }
    });

    cool.calAge();
    abc.calAge();

})();

// Object descriptor
let user = {
    name: "abc"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
// alert( JSON.stringify(descriptor, null, 2));

console.log(JSON.stringify(descriptor, null, 2))