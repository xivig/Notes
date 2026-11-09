// 1. First the simplest way
(function() {
    let animal = {}; // creating an empty object
    animal.name = "Lion"; // assign some property to the object
    animal.energy = 10; // assign some property to the object

    // creating some methods to the object
    anamal.eat = function(eng) {
        console.log(`${this.name} is eating`);
        this.energy += eng;
    }

    anamal.play = function(eng) {
        console.log(`${this.name} is playing`);
        this.energy += eng;
    }

    anamal.sleep = function(eng) {
        console.log(`${this.name} is sleeping`);
        this.energy += eng;
    }

})();

//2. The above code could be written in a better way using function
(function() {

    function Animal(name, energy) {
        let animal = {};
        animal.name = name; // assign some property to the object
        animal.energy = energy; // assign some property to the object

        // creating some methods to the object
        anamal.eat = function(eng) {
            console.log(`${this.name} is eating`);
            this.energy += eng;
        }

        anamal.play = function(eng) {
            console.log(`${this.name} is playing`);
            this.energy += eng;
        }

        anamal.sleep = function(eng) {
            console.log(`${this.name} is sleeping`);
            this.energy += eng;
        }
        return animal;
    }

    let lion = Animal("Lion", 8);
    let cub = Animal("Cub", 5);

})();

//3. The above code could be written in a more concise way
(function() {
    // We are going to put all methods in a single object
    let animalMethods = {

        eat(eng) {
            console.log(`${this.name} is eating`);
            this.energy += eng;
        },

        play(eng) {
            console.log(`${this.name} is playing`);
            this.energy += eng;
        },

        sleep(eng) {
            console.log(`${this.name} is sleeping`);
            this.energy += eng;
        },
        // if we need a new method we have to define that in the
        //  animalMethods object then we need to reference the new method
        //   in the Animal function. Just like:
        fight(eng) {
            console.log(`${this.name} is fighting`);
            this.energy += eng;
        }

    }

    function Animal(name, energy) {
        let animal = {};
        animal.name = name; // assign some property to the object
        animal.energy = energy; // assign some property to the object
        // we want to get the reference to the animalMethods to access all the methods
        animal.eat = animalMethods.eat;
        animal.play = animalMethods.play;
        animal.sleep = animalMethods.sleep;
        // add the new method to reference here
        animal.fight = animalMethods.fight;

        return animal;
    }

})();

//4. let us see what the inheritance do in the JavaScript
(function() {
    let parent = {
        name: 'Robert',
        age: 35,
        heritage: 'Indian'
    }

    // creating the child object using Object.create()
    //  method so that it can be a prototype object and the
    //  child object can inherit from the parent object

    let child = Object.create(parent);
    /* Object.create allows you to create an object which will 
    delegate to another object on failed lookups.
    # Object.create allows you to create an object and whenever there’s
     a failed property lookup on that object, it can consult another object to see
    if that other object has the property.*/
    child.name = 'Babby';
    child.age = 8;

    console.log(child.name); //Babby
    console.log(child.age); //8
    console.log(child.heritage); // Indian
    /* The child object doesn't have a heritage property of its own. So it 
    going to lookup in the parent object if that has a heritage property 
    and the child object finds the heritage property and returns it
    */
    /* So in the example above, because child was created with Object.create(parent), whenever there’s a failed property lookup on child, JavaScript will delegate that lookup to the parent object. What that means is that even though child doesn’t have a heritage property, parent does so when you log child.heritage you’ll get the parent’s heritage which was Indian. */
})();

// 5. Now using Object.create() method we can simplify our Animal code even better.
(function() {
    // * Functional Instantiation with Shared Methods and Object.create:
    let animalMethods = {

        eat(eng) {
            console.log(`${this.name} is eating`);
            this.energy += eng;
        },

        play(eng) {
            console.log(`${this.name} is playing`);
            this.energy += eng;
        },

        sleep(eng) {
            console.log(`${this.name} is sleeping`);
            this.energy += eng;
        },
        // if we need a new method we have to define that in the
        //  animalMethods object then we need to reference the new method
        //   in the Animal function. Just like:
        fight(eng) {
            console.log(`${this.name} is fighting`);
            this.energy += eng;
        }

    }

    function Animal(name, energy) {
        /* Well, instead of adding all the shared methods to the animal one by one like we’re doing now, we can use Object.create to delegate to the animalMethods object instead. */
        let animal = Object.create(animalMethods);
        animal.name = name; // assign some property to the object
        animal.energy = energy; // assign some property to the object
        return animal;
    }

    let lion = Animal("Lion", 8);
    let cub = Animal("Cub", 5);
    lion.eat();
    cub.play();
    /* So now when we call lion.eat, JavaScript will look for the eat method on the lion object. That lookup will fail, then, because of Object.create, it’ll delegate to the animalMethods object which is where it’ll find eat. */
})();

// 6.There are still some improvements we can make though.
(function() {
    // By using prototype:
    // Every function in JavaScript has a prototype property that references an object.

    function protoFunction() {}
    console.log(protoFunction.prototype) // it will return a empty object {} 

    /* What if instead of creating a separate object to manage our methods (like we’re doing with animalMethods, we just put each of those methods on the Animal function’s prototype? Then all we would have to do is instead of using Object.create to delegate to animalMethods, we could use it to delegate to Animal.prototype. We’ll call this pattern Prototypal Instantiation. */


    // Prototypal Instantiation:
    Animal.prototype.eat = function(eng) {
        console.log(`${this.name} is eating`);
        this.energy += eng;
    }

    Animal.prototype.play = function(eng) {
        console.log(`${this.name} is playinging`);
        this.energy += eng;
    }

    Animal.prototype.sleep = function(eng) {
        console.log(`${this.name} is sleeping`);
        this.energy += eng;
    }

    // Constructor function
    function Animal(name, energy) {
        /* all we would have to do is instead of using Object.create to delegate to animalMethods, we could use it to delegate to Animal.prototype.  */
        let animal = Object.create(Animal.prototype);
        animal.name = name; // assign some property to the object
        animal.energy = energy; // assign some property to the object
        return animal;
    }

    let lion = Animal("Lion", 8);
    let cub = Animal("Cub", 5);
    lion.eat(10);
    cub.play(5);
    /* Prototype is just a property that every function in JavaScript has and it allows us to share methods across all instances of a function. All our functionality is still the same but now instead of having to manage a separate object for all the methods, we can just use another object that comes built into the Animal function itself, Animal.prototype. */

})();

/* At this point we know three things:
1.How to create a constructor function.
2.How to add methods to the constructor function’s prototype.
3.How to use Object.create to delegate failed lookups to the function’s prototype.
*/

// 7.Is JavaScript there’s a “built in” way to accomplish the same thing above by using the new keyword.
(function() {
    /* Now we want to have a deep understanding of exactly what the new keyword in JavaScript is doing under the hood. */

    /* Looking back at our Animal constructor, the two most important parts were creating the object and returning it. Without creating the object with Object.create, we wouldn’t be able to delegate to the function’s prototype on failed lookups. Without the return statement, we wouldn’t ever get back the created object. */

    // Constructor function
    function Animal(name, energy) {
        /* Using comments to show what happens under the hood and 
        assuming the Animal constructor is called with the new keyword,
        it can be re-written as this. */
        let animal = Object.create(Animal.prototype); //Part one:creating the object
        animal.name = name;
        animal.energy = energy;
        return animal; //Part two: return the object
    }

    // Prototypal Instantiation
    Animal.prototype.eat = function(eng) {
        console.log(`${this.name} is eating`);
        this.energy += eng;
    }

    Animal.prototype.play = function(eng) {
        console.log(`${this.name} is playinging`);
        this.energy += eng;
    }

    Animal.prototype.sleep = function(eng) {
        console.log(`${this.name} is sleeping`);
        this.energy += eng;
    }

    /* When we invoke a function using the new keyword, those two lines are done for us
     implicitly (“under the hood”) and the object that is created is called this */
    let lion = new Animal("Lion", 8);
    let cub = new Animal("Cub", 5);
    lion.eat(10);
    cub.play(5);

})();

// 8. using constructor function and new keyword and replacing animal object using 'this' keyword by javascript engine

(function() {
    // Constructor function
    function Animal(name, energy) {
        /* Using comments to show what happens under the hood and 
        assuming the Animal constructor is called with the new keyword,
        it can be re-written as this. */

        // let this = Object.create(Animal.prototype); //Part one:creating the object
        this.name = name;
        this.energy = energy;
        // return this; //Part two: return the object
    }

    // Prototypal Instantiation
    Animal.prototype.eat = function(eng) {
        console.log(`${this.name} is eating`);
        this.energy += eng;
    }

    Animal.prototype.play = function(eng) {
        console.log(`${this.name} is playinging`);
        this.energy += eng;
    }

    Animal.prototype.sleep = function(eng) {
        console.log(`${this.name} is sleeping`);
        this.energy += eng;
    }

    /* When we invoke a function using the new keyword, those two lines are done for us
     implicitly (“under the hood”) and the object that is created is called this */
    let lion = new Animal("Lion", 8);
    let cub = new Animal("Cub", 5);
    lion.eat(10);
    cub.play(5);
    /* Again the reason this works and that the this object is created for us is because we called the constructor function with the new keyword. If you leave off new when you invoke the function, that this object never gets created nor does it get implicitly returned.  */
})();

// 9.If you leave off new when you invoke the function, that this object never gets created nor does it get implicitly returned. 
// We can see the issue with 'this' in the example below:
(function() {
    function Animal(name, energy) {
        this.name = name;
        this.energy = energy;
    }
    let deer = Animal("deer", 8);
    console.log(deer); //Uncaught TypeError: Cannot set property 'name' of undefined

})();

// 10. Using class syntax by ES6
(function() {
    /* A Class allows you to create a blueprint for an object. Then whenever you create
 an instance of that Class, you get an object with the properties and methods defined 
 in the blueprint. */

    /* Sound familiar? That’s basically what we did with our Animal constructor
    function above.However, instead of using the class keyword, we just used a regular old JavaScript
    function to re-create the same functionality.Granted, it took a little extra work as well as some knowledge about what happens“ under the hood” of JavaScript but the results are the same.
    */
    /* Here’s the good news. JavaScript isn’t a dead language. It’s constantly being improved and added to by the TC-39 committee. What that means is that even though the initial version of JavaScript didn’t support classes, there’s no reason they can’t be added to the official specification. In fact, that’s exactly what the TC-39 committee did. In 2015, EcmaScript (the official JavaScript specification) 6 was released with support for Classes and the class keyword. */

    class Animal {
        constructor(name, energy) {
            this.name = name;
            this.energy = energy;
        }
        eat(eng) {
            console.log(`${this.name} is eating`);
            this.energy += eng;
        }
        play(eng) {
            console.log(`${this.name} is playing`);
            this.energy += eng;
        }
        sleep(eng) {
            console.log(`${this.name} is sleeping`);
            this.energy += eng;
        }
    }

    let lion = new Animal("Lion", 8);
    let cub = new Animal("Cub", 5);
    lion.eat(10);
    cub.play(5);
    /* So if this is the new way to create classes, why did we spend so much time going over the old way? The reason for that is because the new way (with the class keyword) is primarily just “syntactical sugar” over the existing way we’ve called the pseudoclassical pattern.  */

})();

// 11. Array Methods:
(function() {
    /* if you want to share methods across instances of a class, you should stick those methods on the class’(or function’s) prototype.We can see this same pattern demonstrated if we look at the Array class. */

    const friendsWithSugar = [];

    const friendsWithoutSugar = new Array();
    /* One thing you might have never thought about is how does every instance of an array have all of those built in methods (splice, slice, pop, etc)?

    Well as you now know, it’s because those methods live on Array.prototype and when you create a new instance of Array, you use the new keyword which sets up that delegation to Array.prototype on failed lookups.
     */
    console.log(Array.prototype);
    /*
      concat: ƒn concat()
      constructor: ƒn Array()
      copyWithin: ƒn copyWithin()
      entries: ƒn entries()
      every: ƒn every()
      fill: ƒn fill()
      filter: ƒn filter()
      find: ƒn find()
      findIndex: ƒn findIndex()
      forEach: ƒn forEach()
      includes: ƒn includes()
      indexOf: ƒn indexOf()
      join: ƒn join()
      keys: ƒn keys()
      lastIndexOf: ƒn lastIndexOf()
      length: 0n
      map: ƒn map()
      pop: ƒn pop()
      push: ƒn push()
      reduce: ƒn reduce()
      reduceRight: ƒn reduceRight()
      reverse: ƒn reverse()
      shift: ƒn shift()
      slice: ƒn slice()
      some: ƒn some()
      sort: ƒn sort()
      splice: ƒn splice()
      toLocaleString: ƒn toLocaleString()
      toString: ƒn toString()
      unshift: ƒn unshift()
      values: ƒn values()
    */

    /* The exact same logic exists for Objects as well. All objects will delegate to Object.prototype on failed lookups which is why all objects have methods like toString and hasOwnProperty. */
})();