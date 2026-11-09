# Generic Object Methods

## 1. Object.values()

_Return an array of the values of an object_

### Example 1:

```js
let pastaTypes = {
	// name: shape
	capellini: "angel hair",
	fettuccine: "flat ribon-shaped",
	fusilli: "spiral-shaped",
	farfalle: "bow tie",
	linguine: "long thin and flat",
	macaroni: "curved-shape",
	orecchiette: "little ears",
	penne: "tube-shape hollow",
	spaghetti: "thin round-shaped"

}


// extracting values
let pastaNames = Object.values(pastaTypes);
console.log(pastaNames);
// Now the pastaManes will be ["angel hair", "flat ribon-shaped", "spiral-shaped", "bow tie", "long thin and flat", "curved-shape", "little ears", "tube-shape hollow", "thin round-shaped"]
```

## 2. Object.keys()
_Return an array of the keys of an object_
### Example 2:

```js
let pastaTypes = {
	// name: shape
	capellini: "angel hair",
	fettuccine: "flat ribon-shaped",
	fusilli: "spiral-shaped",
	farfalle: "bow tie",
	linguine: "long thin and flat",
	macaroni: "curved-shape",
	orecchiette: "little ears",
	penne: "tube-shape hollow",
	spaghetti: "thin round-shaped"

}


// extracting values
let pastaShapes = Object.keys(pastaTypes);
console.log(pastaNames);
// Now the pastaShapes will be ["capellini", "fettuccine", "fusilli", "farfalle", "linguine", "macaroni", "orecchiette", "penne", "spaghetti"]
```



## 3. Object.entries()
_Create an array which contains array of key-value pairs of an object_
### Example 3:

```js
let fettuccine = {
	shape: "ribon-shaped",
	pairings: "cheese sauces",
	recipe: " fettuccine alfredo",
	cooking: "10-12 minutes"
}
let objEntries = Object.entries(fettuccine);
console.log(objEntries);

// Ourput:
/*
0: (2) ["shape", "ribon-shaped"]
1: (2) ["pairings", "cheese sauces"]
2: (2) ["recipe", " fettuccine alfredo"]
3: (2) ["cooking", "10-12 minutes"]
length: 4
*/

```

## 4. Object.freeze()
_Prevents us from modifying existing object properties_

_Once the object is frozen we can no longer add, update, or delete properties from it_

_Any attempt at changing the object will be rejected without an error_

### Example 4:
```js
const freezeObj = {
	name: "Bandhu"
}

Object.freeze(freezeObj);
freezeObj.name = "Yisxa"; // will be ignored, mutation not allowed
freezeObj.newProp = "Cool"; // will be ignored, mutation not allowed
console.log(freezeObj); // { name: "Bandhu" }

freezeObj.age = 27;
console.log(freezeObj); { name: "Bandhu" }
```

## 5. Object.seal()
_We can use the Object.seal() method on an object to seal it._
- A sealed object is non-extensible, and all of its properties are non-configurable. 
- That means we can't add new properties to the object, but we also can’t remove properties or change their type from data to accessor or vice versa. 
- If an object is sealed, we can only read from and write to its properties.
- When that happens, the [[Extensible]] attribute is set to false, and all properties have their [[Configurable]] attribute set to false. 
- We can also check to see whether an object is sealed using Object.isSealed() as follows:
```js
(function () {
    let createObj = {
        name: "Bandhu"
    }
    console.log(Object.isExtensible(createObj)); // true
    console.log(Object.isSealed(createObj)); // false
    Object.seal(createObj);
    console.log(Object.isExtensible(createObj)); // false
    console.log(Object.isSealed(createObj)); // true
    /* createObj.sayHello = function(){
        console.log(`Hi, ${this.name}`);
    } //TypeError: Cannot add property sayHello, object is not extensible
    console.log("sayHello" in createObj); // false
    createObj.name = 'Xivig';

    // delete createObj.name; // TypeError: Cannot delete property 'name' of #<Object>
    console.log("name" in createObj); //	true
    console.log(createObj.name); // Xivig
    let descriptor = Object.getOwnPropertyDescriptor(createObj, "name");
    console.log(descriptor.configurable); // false

})();
```
- This code seals createObj so we can’t add or remove properties. 
- Since all sealed objects are non-extensible, Object.isExtensible() returns false when used on createObj, and the attempt to add a method called sayHello() fails silently. 
- Though createObj.name is successfully changed to a new value, the attempt to delete it silently fails.
- Be sure to use strict mode with sealed objects so you’ll get an error when someone tries to use the object incorrectly.

- We can still change the property xivig:
```
createObj.xivig = 'b';  //'b'
createObj.xivig //'b'
```
- but we can’t change its attributes:
```
Object.defineProperty(createObj, 'xivig', { 
    enumerable: false 
}); //TypeError: Cannot redefine property: xivig
```

### Example 5:
```js
(function{
    var createObj = {
        xivig: 'a'
    };
    Object.getOwnPropertyDescriptor(createObj, 'xivig') // before sealing
    {
        value: 'a',
        writable: true,
        enumerable: true,
        configurable: true
    }

    Object.seal(createObj) // On sealing

    Object.getOwnPropertyDescriptor(createObj, 'xivig') // after sealing

    {
        value: 'a',
        writable: true,
        enumerable: true,
        configurable: false
    }
})();
```

## 6. Object.assign()
_It will clone the old Object_
### Example 6:
```js
let oldObj = {
	name: 'Cool'
}
let newObj = oldObj // It doesn't work
// solution to above problem
let clonedObj = Object.assign({}, oldObj)

// alternative is a spread operator
let clonedObj2 = {...oldObj}

clonedObj //Object { name: "Cool" }

clonedObj2	//Object { name: "Cool" }

// Shallow cloning: means it will copy only one level
let oldObj2 = {
	name: 'Cool',
	hobbies: ['Music', 'Reading']
}
let clonedObj3 = Object.assign({}, oldObj2)
clonedObj3.hobbies.push('Football');
clonedObj3 //  { name: "Cool", hobbies: [ "Music", "Reading", "Football" ] }

// alternative
let clonedObj4 = {...oldObj2, hobbies: [...oldObj2.hobbies]}

```
## 7. Object.create()
_We can create object by this method_
### Example 7:
```js
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

```
## 8.
_Sample_
## 9.
## 10.
## 11.
## 12.
