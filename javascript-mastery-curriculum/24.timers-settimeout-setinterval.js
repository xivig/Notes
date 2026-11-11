/* 
JavaScript setTimeout(): Main Tips

The JS setTimeout() method will call a function after the time specified in milliseconds (1000 ms = 1 second) has passed.
The specified function will be executed once. If you need to run a function multiple times, use the setInterval() method.
To stop the timeout and prevent the function from executing, use the clearTimeout() method.
The JavaScript setTimeout() method returns an ID which can be used in clearTimeout() method.

Usage and Purpose:
Sometimes it is necessary to program a function call in a specific moment. The JavaScript setTimeout() function is ready to help you with this task-scheduling by postponing the execution of a function until the specified time.

Let's say you are a developer who wants to enhance user experience in their website. One of the possible features to include is to schedule a message to be displayed after users scroll down to the end of the page. JavaScript setTimeout() function can help you set timeout for the method and impress your website visitors with a new feature.

Please bear in mind that the setTimeout JavaScript function will execute functions once. If you want the function to be repeated multiple times, you should use setInterval().

Required Syntax
As you can see in the snippet below, the JavaScript setTimeout() function can contain several parameters:

setTimeout(function, milliseconds, param_one, param_two, ...)

First of all, the setTimeout JavaScript method should contain the function that you intend to apply. The second parameter sets a time when the specified function is to be called. However, it is optional, and the default value is 0. You can also specify parameters for the function you have indicated previously.

Parameter	Description
function	Required. Specifies the function that will be executed.
milliseconds	Not required. Specifies the time the function will be executed.
0 milliseconds by default.
param_one, param_two, ...	Not required. Parameters passed to the function.
Code Examples for Practice
To grasp the concept better, use the examples provided below. Don't forget to open them in the code editor and play around a little. This way, you'll get a much better understanding of how everything works.

The first example illustrates how JavaScript setTimeout() function can open an alert box after 2 seconds:

Example
var sampleVar;

function sampleFunction(){    
  sampleVar = setTimeout(alertFunc, 2000);
}

function alertFunc(){    
  alert("Two seconds have passed!");
}
This next example will change the text of an element every 2 seconds (3 times). For this to work properly, you must set an ID of some HTML element to counter:

Example
var x = document.getElementById("counter");
setTimeout(() => { x.innerHTML = "2 seconds" }, 2000);
setTimeout(() => { x.innerHTML = "4 seconds" }, 4000);
setTimeout(() => { x.innerHTML = "6 seconds" }, 6000);
The last example we prepared will stop the timeout if the clearTimeout is called before the timer runs out:

Example
var sampleVar;
function sampleFunction(){
  sampleVar = setTimeout(() => { 
    alert("This timer will be stopped") 
  }, 3000);
}
function sampleStopFunction(){
  clearTimeout(sampleVar);
}
sampleFunction();


*/



// callback

function _1(){
    console.log("Cool from One");

}
function done(){
    console.log("All done!!");

}

function functionTwo(){
    console.log("Cool from Two");

}


// definition of callback function
function someFunction(a, b, callback){
    console.log("I am called")
    return callback(a,b);
}


function add(a, b){
    return console.log("Sum = ", a+b);
}

function sub(a, b){
    return a-b;
}

function mul(a, b){
    return a*b;
}
function div(a, b){
    return a/b;
}

function square(x){
    return console.log("Square ", x * x);
}

function greet(name){
    return console.log(`Hello! ${name}`);
}

function fullName(fname, lname){
    return console.log(`Hello! My name is ${fname} ${lname}`);
}


// calling function
console.log(someFunction(5, 6, add));

console.log(someFunction(5, 6, sub));
console.log(someFunction(5, 6, mul));
console.log(someFunction(5, 6, div));


// Syntax: setTimeout(callback, time, parameter);
// Here parameter is to be passed to the callback function

//1. callback function don't need any parameter
setTimeout(functionTwo, 2000);
setTimeout(_1, 3000);
//1a. callback function don't need any parameter, by anonymous function
setTimeout(function(){
    console.log("callback function don't need any parameter from Anonymous function!")
}, 4000);
//1b. callback function don't need any parameter, by Arrow function
setTimeout(()=> console.log("callback function don't need any parameter from Arrow function!"), 5000);

//2. callback function needs only one parameter and its a number
setTimeout(square, 6000, 25);
//2a. callback function needs only one parameter and its a number, by anonymous function
setTimeout(function(x){
    return console.log("Square from Anonymous function!", x*x)
}, 7000, 17);
//2b. callback function needs only one parameter and its a number, by Arrow function
setTimeout(x=> console.log("Square from Arrow function!", x*x)
, 8000, 17);


//3. callback function needs two parameters and they are numbers
setTimeout(add, 9000, 2,5);
// 3a.callback function needs two parameters and they are numbers by anonymous function
setTimeout(function(a, b){
    return console.log("Sum = ", a+b, " from anonymous function")
}, 10000, 300, 200);
// 3b.callback function needs two parameters and they are numbers by Arrow function
setTimeout((a, b)=> console.log("Sum = ", a+b, " from Arrow function"), 11000, 300, 200);


//4. callback function needs only one parameter and its a string
setTimeout(greet, 12000, "John");
//4a. callback function needs only one parameter and its a string, by anonymous function
setTimeout(function(name){
    return console.log("Hi! ", name, " from anonymous function")
}, 13000, "Suzy" );
//4b. callback function needs only one parameter and its a string, by arrow function
setTimeout((name)=> console.log("Hi! ", name, " from Arrow function"), 14000, "Suzy" );


//5. callback function needs two parameters and they are string
setTimeout(fullName, 15000, "John", "Smith");

//5a. callback function needs two parameters and they are string, by anonymous function
setTimeout(function(fname,lname){
    return console.log(`Hi! my name is ${fname} ${lname}," from anonymous function"`);
}, 16000, "Alisha", "Smith" );

//5b. callback function needs two parameters and they are string, by arrow function
setTimeout((fname,lname) => console.log(`Hi! my name is ${fname} ${lname}, from Arrow function`), 17000, "Alisha", "Smith" );



// by named function
setTimeout(done, 18000);

// by anonymous function
setTimeout(function(){
    console.log("All done from Anonymous function!")
}, 19000);

// by arrow function
setTimeout(() =>{
    console.log("All done from Arrow function!")
}, 20000);

// in the above code as it is single statement so it don't need any braces
setTimeout(() => console.log("All done from concise Arrow function!"), 21000);


// setInterval
setInterval(() => {
    let dateTime = new Date();
    console.log(dateTime.toLocaleTimeString());
}, 1000);

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
            // output += `<p>${post.body}</p>`;
            console.log(output);
        });
        // document.body.innerHTML = output;
    }, 2000);
}


function createPost(post, callback) {
    setTimeout(() => {
        posts.push(post);
        console.log("Post created!")
        callback();
        console.log(posts); // shows posts after 2  seconds of post created
    }, 1000);
    

}

createPost({
    title: 'JavaScript Callback Hell',
    body: 'This is about callback hell in javascript'
}, getPosts);

console.log(posts); //shows the post before creation of post
