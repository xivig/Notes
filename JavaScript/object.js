/*
A. What are objects?
- Objects are simple pairs of unique keys that correspond to a value.
- This key-value pair is called propery.

Objects can be created in three ways:
1. Object.create() function
- It takes a parent and an optional set of property descriptors and makes a brand new instance.
- An empty object is an object with no parent, and no properties.
- The syntax to create such object in JavaScript is the following:
let createObj = Object.create(null);

2. Object constructor 

3. Object Literal


B. Creating properties

- Properties in JavaScript are dynamic.
- That means that they can be created or removed at any time.
- Properties are unique, in the sense thata property key inside an object correspond to exactly one value.
- Creating new properties is done through the Object.defineProperty() function, which takes
a. a reference to an object
b. the name of the property to create
c. a descriptor that defines the semantics of the property

*/

let createObj = Object.create(null);

/*
Object.defineProperty(createObj, 'name', {
	value: 'Bandhu',
	writable: true,
	configurable: true,
	enumerable: true
})

Object.defineProperty(createObj, 'age', {
	value: 30,
	writable: true,
	configurable: true,
	enumerable: true
})

Object.defineProperty(createObj, 'gender', {
	value: 'male',
	writable: true,
	configurable: true,
	enumerable: true
})*/

console.log(createObj); // [Object: null prototype] { name: 'bandhu', age: 30, gender: 30 }

// Object.defineProperty() will create a new property if a property with the given key does not exist in the object, otherwise it'll update the semantics and value of the existing property.

// We can use the Object.defineProperties() when we need to add more than one property to an object:

Object.defineProperties(createObj, {name: {
	value: 'Bandhu',
	writable: true,
	configurable: true,
	enumerable: true },
	age: {
		value: 30,
		writable: true,
		configurable: true,
		enumerable: true
	},
	gender: {
		value: 'male',
		writable: true,
		configurable: true,
		enumerable: true
	}
})


console.log(createObj);	// [Object: null prototype] { name: 'bandhu', age: 30, gender: male }

// C. Descriptors

