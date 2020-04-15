// ## Arrays in JavaScript:
/* 
# Ref: JavaScript Novice to Ninja

Data Structures used in JavaScript to store lists of values are called
a) Arrays
b) Sets
c) Maps

Arrays: An array is an ordered list of values.
* To create an array literal, simply write a pair of square brackets.
var arr = []; //array literal
let arr = []; //array literal
const arr = []; //array literal

we will use:  
*/
//## create an array with array literals 
const coolArray = [];


(function() {
    /* Second way or alternative way of expressing array literal:
    by using an array constructor function */

    const coolArray = new Array();
    /* It is rarely used, because square brackets[] are shorter.
    It's safer to use [] than the use of new Array(), because you can actually override the value of array in JavaScript. */
})();

/*
* Both of these produce an empty array, but it's preferable to stick to using array literals.(an added advantage is that [] notation require less typing)
* Arrays are not primitive values but a special built-in object.
This can be seen by using typeof operator
*/
console.log(typeof coolArray); // Object

(function() {
    Array = function() {};

    var x = new Array();
    // Here x is now an object instead of an Array.
    // If new Array is called with a single argument which is a number, then it creates an array without items, but with the given length.
})();

(function() {
    let arr = new Array(2);
    // It will create an array with two empty items.
    console.log(arr.length); // length 2
    console.log(arr[0]); //Output: undefined, no elements
    console.log(arr); // (2)[emptyx2] 
})();

/*N.B: In the above example, new Array(Number) has all elements undefined. To escape such surprises, we usually use square brackets, unless we really know what we're doing.*/

(function() {
    // Array length checking
    let testArray = function(array) {
        console.log('length: ' + array.length);
        array.forEach(function(element, index, array) {
            console.log(index + ':' + element);
        });
    };
    // calling the testArray
    testArray([]); // length:0
    testArray([4, 3, 2, 6, 8, 5]); //length:6
    // 0:4
    // 1:3
    // 2:2
    // 3:6
    // 4:8
    // 5:5
})();

/* An array where the length is greater than the amount of numbered properties is known as a sparse array while one with the length equal to the number of numbered properties is a dense array.

A sparse array is an array of data in which many elements have a value of zero. This is in contrast to a dense array, where most of the elements have non-zero values or are “full” of numbers. A sparse array may be treated differently than a dense array in digital data handling.
A sparse array may be compressed or truncated to fit a particular storage space. Rather than holding all of the actual zero values in variables, the array could simply point to the number of zero values in a sequence or otherwise compress the array’s data storage.
An array of six variables named A(6) can hold values for A1, A2, A3, A4, A5 and A6. If more than three or four of these values are zero, the array is said to be “sparse.”
*/

(function() {
    let arr = new Array(3);

    /* This will create an array with no numbered entries.i.e.,
    this will create an array of three elememts. */

    console.log(arr); //(3) [empty × 3]
    console.log(arr.length); //3
    console.log(arr[0]); //undefined
})();

//## Dense arrays:
(function() {
    // Dense arrays:
    let arr = Array.apply(null, Array(3));
    console.log(arr); //(3) [empty × 3]
    console.log(arr.length); //3
    console.log(arr[0]); //undefined

    arr.forEach(function(item, index, array) {
        console.log(`${item} is at index ${index} in ${array}`);
    });
    // undefined is at index 0 in ,,
    // undefined is at index 1 in ,,
    // undefined is at index 2 in ,,

    arr.map(function(item, index, array) {
        return index; // (3) [0, 1, 2]
    });

    // This will give the same result as above
    Array.apply(null, Array(3)).map(Function.prototype.call.bind(Number)); //(3) [0, 1, 2]
})();

//## Array declaration and initialization
(function() {
    const languageKnown = [];
    /*This will create an empty array literal called languageKnown

    * for finding out element 0 in the languageKnown array we can use:
    languageKnown[0]; //undefined

    * To access a specific value in an array, we write its position in the array in square brackets(this is known as its index).
    If an element is an array is empty, undefined is returned.

    Adding values to Arrays:
    * To place the string 'Scala' inside the first element of our languageKnown array, we can assaign it to be element 0, like so:*/
    languageKnown[0] = 'Scala';

    /** Each item in an array can be treated like a variable
     * We can change the value of the first item in the languageKnown array to 'Swift' by assignment operator.*/
    languageKnown[0] = 'Swift';
    // * We can add more values to our array by assigning them to other indices:
    languageKnown[1] = 'JavaScript';
    languageKnown[2] = 'Haskell';

    // * we can use the index notation to add new items to any position in the languageKnown array:
    languageKnown[5] = 'C#';

    // * we can look at the languageKnown array by simply typing its name into the console or :
    languageKnown; // in console:(6) ["Swift", "JavaScript", "Haskell", empty × 2, "C#"]
    console.log(languageKnown);
    /* Here we can see that the sixth item(with an index of 5) has been filled with the string 'C#'.
    This has made the array longer than it was before, so all the other unused slots in the array are filled by the value undefined. */

})();

// ##  Creating Array literals:
(function() {
    /*  
We can create an array literal using square brackets that already contain some initial values, so there's no need to add each value one by one. e.g., */

    let languageKnown = ["Swift", "JavaScript", "Haskell", "Java", "C#"];
    // You don 't even have to use the same types of items inside an array
    const mixedArray = [null, 1, [], 'two', true];
    // Here mixedArray contains Null, Number, Empty Array, String, Boolean

    // mixed value array
    let arr = ['Apple', { name: 'Cool' }, true, function() { console.log('Hi'); }];

    //get the object at index 1 then show its name
    console.log(arr[1].name);
    //get the function at index  and run it
    arr[3]();

})();

// ## Removing value from Array:

(function() {
    let languageKnown = ["Swift", "JavaScript", "Haskell", "Java", "C#"];
    // The delete operator will remove an item from an array:

    delete languageKnown[2];
    languageKnown; // ["Swift", "JavaScript", empty, "Java", "C#"]

    /*   If we look at the languageKnown array, we can see that the third entry, 'Haskell' (with an index of 2), has been removed.
      But it has been replaced by a value of empty.*the value that was in the index of 2('Haskell') has been deleted from the array, but the space that it occupied is still there and contains a value of empty.This means the array still has the same number of elements, and the position can still be referenced as an index, but it will just return empty. */

    languageKnown[2]; //undefined
})();

// ## Destucturing Arrays:

(function() {
    /* 
    - Destucturing an array is the concept of taking values out of an array and presenting them as individual values.
    - Destucturing allows us to assign multiple values at the same time, using arrays: 
    */
    let [x, y] = [5, 6];

    // - Even though the assignment is made using arrays, each individual variable exists on its own outside the array.
    // - we can get the individual value

    x; //5
    y; //6

    // - Destucturing gives a neat way of swapping the value of two variables over: [x, y] = [y, x];
    // Now
    x; //6
    y; //5

    // - Before ES6, a temporary variable would have to be used to achieve the same result.

    let a = 5;
    let b = 6;
    console.log(a, b);
    const temp = a;
    a = b;
    b = temp;
    console.log(a, b);

})();

// ## Array Length:
(function() {
    let languageKnown = ["Swift", "JavaScript", "Haskell", "Java", "C#"];
    // - To find the length of an array, we can use the length property:
    anguageKnown.length; //5

    // - The length property can be used as part of the index to find the last item in an array:

    languageKnown[languageKnown.length - 1]; // "C#"

    // Alternatively this can be written as:
    let arrLength = languageKnown.length;
    languageKnown[arrLength - 1];

    // N.B: Here we have to subtract 1 from the length property because the index starts at 0, so the last item in the array will have an index of one less than the array 's length. *
    // The length property is mutable meaning you can manually change it:

    languageKnown.length = 6;
    languageKnown; // ["Swift", "JavaScript", empty, "Java", "C#", empty]

    // - If you make the array shorter than it already is, all the extra elements will be removed completely.

    languageKnown.length = 2;
    languageKnown; // ["Swift", "JavaScript"]

    // - If you make the array longer, the extra slots will be filled in with empty(undefined)
})();


// ## Looping in Arrays:
(function() {
    let languageKnown = ["Swift", "JavaScript", "Haskell", "Java", "C#"];
    // 1. If you need both array index and the value it contains, then use normal for loop
    for (let i = 0; i < languageKnown.length; i++) {
        console.log(languageKnown[i]);
    }

    // 2. If you need only value then use for .. of loop
    for (let i of languageKnown) {
        console.log(i);
    }

    // 3. If you want to iterate over object, then use for .. in loop
    // but practically for....in(Never use)

    let arr4 = ['Apple', 'Orange', 'Banana'];

    for (let key in arr4) {
        console.log(arr4[key]);
    }

    // 4. If you want to use methods and iterate over each value, then use forEach()
    // This gives us full control over item, index, array
    // foreach() loop: forEach() method allows to run a function for every element of the array.
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

    /* - Technically, arrays are objects, so it is possible to iterate the array by using
    for....in.But that's actually a bad idea. There are potential problems with it.

    a) The for...in loop is optimized for generic objects, not arrays, and thus is 10 - 100 times slower.
    b) The for....in loop iterates over all properties, not only the numeric ones.

    - There are 'array-like' object in the browser and in other environments, that look like arrays.They have length, index properties and also other non-numeric properties and methods.The for...in loop will list them all.
    So if we need to work with array-like objects, then these 'extra' properties can become a problem.
     - Generally, we shouldn't use for...in for arrays. */
})();