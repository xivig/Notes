//1.  associative array
(function() {
    let emp = [];
    emp['empNumber'] = 1000;
    emp['name'] = "John";
    emp['salary'] = 50000;

    console.log(emp); //[empNumber: 1000, name: "John", salary: 50000]
    console.log(emp.name); //John
})();


//2. Object can be created by the following three ways:
(function() {
    // 1. Using 'new Object'
    let emp = new Object();
    emp.empNumber = 005;
    emp.name = "Jane";
    emp.salary = 60000;
    console.log(emp); //{empNumber: 1005, name: "Jane", salary: 60000}})();

})();

(function() {
    // 2. Using braces(Object literals)
    let emp = {};
    emp.empNumber = 1006;
    emp.name = "Mark";
    emp.salary = 55000;
    console.log(emp); // {empNumber: 1006, name: "Mark", salary: 55000}
})();

(function() {
    // 3. Using Object initializer(Object literals)
    let emp = {
        empNumber: 1007,
        name: "Brad",
        salary: 50000
    }
    console.log(emp); // {empNumber: 1007, name: "Brad", salary: 50000}

    for (let key in emp) {
        console.log(key + " = " + emp[key]);
        // empNumber = 1007
        // name = Brad
        // salary = 50000
    }

    // Other methods to access the all key:value pairs of an object
    console.log(Object.keys(emp)); // this will give us the all the property name


    let arr = Object.keys(emp2);
    for (let i = 0; i < arr.length; i++) {
        console.log("Property Name(" + arr[i] + "): value(= " + emp[arr[i]] + ")");
        /* 
        Property Name(empNumber): value(= 1000)
        Property Name(name): value(= John)
        Property Name(salary): value(= 50000) 
        */
    }
})();

//Object Literal
const automobile = {
    year: 2020,
    model: 'A8',
    make: 'BMW',
    startEngine: function() {
        return 'Starting';
    }
}
//console.log(automobile.model );
//console.log(automobile.startEngine());

// automobile.name = automobile.make + " " + automobile.model;
// by another way 
automobile.__proto__.fullName = function() {
    return this.make + " " + this.model;
}
// console.log(automobile.name);
console.log(automobile.fullName());

//Create Method using previous object literal const swift = Object.create(automobile);
const maped = Object.create(automobile);
maped.make = "Audi";
maped.model = 'Maped';
maped.startEngine = function() {
    return 'Vroom, Vroom';
};



console.log(maped.startEngine());
console.log(automobile.fullName());


//Similar to object literal above, would prefer to use object literal using new keyword.
const automobile2 = new Object();
automobile2.year = 2020;
automobile2.model = 'Zxi';
automobile2.make = 'Suzuki';
automobile2.startEngine = function() {
    return 'Hey i am starting'
};

console.log(automobile2.startEngine());
console.log(automobile2.fullName());

//3. ## Constructor function in JavaScript(or Instance Object)
(function() {
    /* 
    1.It describes the structure of an object which is
    a) similar to "class" in C++/C#/Java
    b) and members are usually preceded with 'this' keyword
    */
    // Name should be capitalized to differentiate from the normal function
    function Employee(empNumber, name, salary) {
        // Javascript engine automatically set to the following line:
        // var this = {};
        this.empNumber = empNumber;
        this.name = name;
        this.salary = salary;
        // At the end engine return the following line:
        // return this;
    }

    // 2. We can instantiate "objects" from constructor function using 'new' keyword
    //  and modifying a 'constructor function' will affect all the relevant objects

    let emp = new Employee(1008, "Cool", 52000);
    console.log(emp.name); //Cool

})();

// 4. constructor function can also be annonymous
(function() {
    // Name should be capitalized to differentiate from the normal function
    let Emp = function(empNumber, name, salary) {
        // Javascript engine automatically set to the following line:
        // var this = {};
        this.empNumber = empNumber;
        this.name = name;
        this.salary = salary;
        // At the end engine return the following line:
        // return this;
    }
    let emp1 = new Emp(1009, "Rock", 53000);
    console.log(emp1.name + " has a salary of: " + emp1.salary);
    //Rock has a salary of: 53000

    // 4. Accessing members in various ways:
    //  a) Using dot(.) natation
    //  b) Using 'for ... in' loop
    //  c) Using 'with'

    let emp2 = new Emp(1010, "Bob", 54000);
    //a) Accessing members using dot(.) natation
    console.log(emp2.empNumber);

    // b) Accessing members using 'for ... in' loop
    for (let key in emp2) {
        console.log(key + " = " + emp7[key]);
        // empNumber = 1007
        // name = Brad
        // salary = 50000
    }
    // c) Accessing members using 'with'
    function showOutput(obj) {
        with(obj) { // don't use with
            console.log(empNumber + " " + name + " " + salary);
        }
    }
    showOutput(emp2); // calling the function
    // Uncaught SyntaxError: Strict mode code may not include a with statement
    // we can get output in console but not from the script

})();


//5. ##Methods in objects
// Methods have access to any member in the object

/* How do you define a method in an object?
a) Using external function
b) Using functions(or annonymous functions) inside the object
c) Using Constructor functions
*/

// a) Using external function
(function() {

    function getAnualSalary() {
        return this.salary * 12;
    }

    let employee = {
        name: "Robert",
        salary: 8000,
        anualSalary: getAnualSalary
    };
    console.log(`${employee.name} has a anuual Salary of ${employee.anualSalary()}`);
    // Robert has a anuual Salary of 96000

})();


// b) Using functions(or annonymous functions) inside yhe object
(function() {
    let employee = {
        name: "Jim",
        salary: 9000,
        getSalary: function() {
            return this.salary * 12;
        }
    };
    console.log(`${employee.name} has a anuual Salary of ${employee.getSalary()}`);
    // Jim has a anuual Salary of 108000
})();


// c) Using Constructor functions
(function() {
    let EmployeeOne = function(name, salary) {
        this.name = name,
            this.salary = salary,
            this.getSalary = function() {
                return this.salary * 12;
            }
    };
    let emp = new EmployeeOne("Jimmy", 10000)
    console.log(`${emp.name} draws $${emp.getSalary()} per annum`);
})();


/* 
 * 1.Methods can accept parameters and return values similar to normal function
 * 2.Methods can have 'objects' as parameters
 * 3.Methods can 'return' objetcs
 */

// * 2.Methods can have 'objects' as parameters
(function() {
    let Employee = function(name, salary) {
        this.name = name;
        this.salary = salary;

        this.setEmployee = function(obj) {
            this.name = obj.name;
            this.salary = obj.salary;
        };
        this.getAnnualSalary = function() {
            return this.salary * 12;
        }
    };
    // way No 1
    let empObject = new Employee();
    empObject.name = "Johny";
    empObject.salary = 6000;


    let emp11 = new Employee();
    emp11.setEmployee(empObject);
    console.log(`${emp11.name} draws $${emp11.getAnnualSalary()} per annum`);


    // way No 2
    let empObject1 = new Employee("Barbara", 5000);
    let emp12 = new Employee();
    emp12.setEmployee(empObject1);
    console.log(`${emp12.name} draws $${emp12.getAnnualSalary()} per annum`);
})();




// * 3.Methods can 'return' objetcs
(function() {
    let Employee = function(name, salary) {
        this.name = name;
        this.salary = salary;
        this.getEmployeeSalary = function() {
            let obj = {
                getName: this.name,
                getSalary: this.salary * 12
            };
            return obj;
        }
    };

    let empObject4 = new Employee("Ruby", 7500);
    console.log(`${empObject4.name} draws $${empObject4.salary} per month`);
    let emp = empObject4.getEmployeeSalary(); // It will assign the obj object to emp

    console.log(`${emp.getName} draws $${emp.getSalary}  per annum`);

    // aleternative way of accessing the obj directly
    console.log(`Anual Salary draws $${empObject4.getEmployeeSalary().getSalary}`);
})();




// * 3a.Methods can 'return' objetcs (another syntax): Concise way
(function() {
    let Employee = function(name, salary) {
        this.name = name;
        this.salary = salary;
        this.getEmployeeSal = function() {
            return {
                name: this.name,
                getAnnual: this.salary * 12
            };
        }
    };
    let empObject5 = new Employee("Hussy", 1000);
    console.log(`${empObject5.name} draws $${empObject5.getEmployeeSal().getAnnual}`);
})();


//6. ## Introducing Array of Objects
(function() {
    let Employee = function(name, salary) {
        this.name = name;
        this.salary = salary;
        this.getAnnualSalary = function() {
            return this.salary * 12;
        }
    };

    let arrVar = [];

    arrVar[0] = new Employee("Anna", 5000);
    arrVar[1] = new Employee("Sara", 6000);
    arrVar[2] = new Employee("Alsa", 7000);
    arrVar[3] = new Employee("Sinza", 8000);
    arrVar[4] = new Employee("Tecy", 5500);

    for (let i = 0; i < arrVar.length; i++) {
        console.log(`${arrVar[i].name} draws $${arrVar[i].getAnnualSalary()} in a year`);
    }
})();


//8. ## Method chaining
(function() {
    let Employee = function(name, salary) {
        this.name = name;
        this.salary = salary;

        this.incrementSalary = function(increment) {
            this.salary += increment;
            return this;

        }
    };
    let empObject = new Employee("Hussy", 8000);
    console.log(empObject.salary);
    /* let tempObj = empObject.incrementSalary(500);
    tempObj.incrementSalary(700)
    console.log(empObject.salary); // 9200 */

    // The above two lines can be written in a singlr line as: 
    empObject.incrementSalary(500).incrementSalary(400); // This is called method chaining
    console.log(empObject6.salary); // 89000
})();


//9. ## JavaScript private and public function 
(function() {
    /* Members with 'this' keyword are aceessible from everywhere(beyondObjectScope).These are calledpublic members */

    /* Members with 'var or let/const' are accessible only within Object.
    These are called private members */
    let Employee = function(name, salary) {
        this.name = name; // public member
        let eSalary = salary; // private member
        this.annualSalary = 0.0; // public member

        this.calSalary = function() {
            this.annualSalary = eSalary * 12;
            return this;

        }
    };
    let empObject = new Employee("Khussy", 5000);
    console.log(empObject.eSalary) // undefined
    console.log(empObject.annualSalary) // 0 before calculating the salary
    empObject.calSalary();
    console.log(empObject.annualSalary);
})();


//10. ## Nested Object:
/* Object can be nested in the form of 'key:value' pairs
It can be accessible using dot natation.
It can also be defined by using Constructor functions
*/

(function() {
    // Direct object
    let employee = {
        name: "Maya",
        salary: 5000,
        dept: {
            deptNo: 11,
            deptName: "HR"
        }
    };
    console.log(`${employee.name} is from ${employee.dept.deptName} department`);

    // using Constructor functions
    let Employee = function(name, salary, deptNo, deptName) {
        this.name = name; // public member
        this.salary = salary;
        this.dept = {
            deptNo: deptNo,
            deptName: deptName
        }

    };

    let empObject = new Employee("Sujan", 2000, 10, "Account");
    console.log(`${ empObject.name } is from ${ empObject.dept.deptName } department `);
})();