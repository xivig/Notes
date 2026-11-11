// ## Javascript for loop
let languageKnown = ["Swift", "JavaScript", "Haskell", "Java", "C#"];

console.log("1.Normal for loop...............\n");

for (let i = 0; i < languageKnown.length; i++) {
    console.log(languageKnown[i]);
}

console.log("2.for  of loop....................");
for (let i of languageKnown) {
    console.log(i);
}
console.log("3. for  in loop....................");
let arr4 = ['Apple', 'Orange', 'Banana'];

for (let key in arr4) {
    console.log(arr4[key]);
}

// ['Swift', 'JavaScript', 'Haskell', 'Java', 'C#'].forEach((item, index, array) =>{
// 	alert(`${item} is at index ${index} in array [${array}]`);
// });

console.log("4. forEach  loop....................");
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(item => {
    console.log(`Square root of ${item} is ${Math.sqrt(item)}`);
    console.log(`Square of ${item} is ${item*item}`);
    console.log(`Cube of ${item} is ${item*item*item}`);
    console.log(`Logarith of ${item} is ${Math.log(item)}`);

});