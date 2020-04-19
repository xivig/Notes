# jQuery
_Notes from 'Pro jQuery' by Adam Freeman_

- Once you start using jQuery, there is no going back.
- Here are the top reasons that We use jQuery in my projects:
	- jQuery is expressive because I can do more work with much less code than when using the
browser DOM API.
	- jQuery methods apply to multiple elements. The DOM API approach of select-iterate-
modify is gone, meaning fewer for loops to iterate through elements and fewer mistakes.
	- jQuery deals with implementation differences between browsers which means, I don’t have to
worry about whether IE or any browser supports a feature in an odd way or not.
	- jQuery is open source. When I don’t understand how something works or I don’t
quite get the result I was expecting, I can read through the JavaScript code and, if
    needed, make changes.
    - One of the nice aspects of jQuery is that almost any task can be performed in several different ways, allowing you to develop a personal jQuery style.

- jQuery places a high priority on ensuring that code will work consistently across all major browsers; many of the harder JavaScript problems have been silently solved for you.
- The jQuery library is exposed through a property called jQuery and a shortcut called $. Using them gives you access to the properties, methods, and functions that jQuery provides.
- One of the utilities available is the function for trimming strings, whose aim is to remove whitespaces from the beginning and the end of a string. A call to it could look like this:

    `var trimmed = $.trim(someString);`

- If the value of someString is “ hello ”, the result of the $.trim() call will be “hello”. Here we used the jQuery shortcut ($) as an identifier like any other in JavaScript. Writing a call to the same function using the jQuery identifier, rather than its alias, will result the same output:

    `var trimmed = jQuery.trim(someString);`

- Another utility function is $.isArray(), which tests if a given argument is an array.
- In addition to properties and functions, the jQuery library also exposes methods that are available once you call the jQuery() function.
- jQuery plugins extend the functionality of the basic library.
- jQuery UI is a general-purpose UI toolkit intended to be used on any device, and jQuery Mobile is designed for use with touch-enabled devices such as smartphones and tablets.

## The jQuery object
- The first function we encounter  to learn jQuery is jQuery().
- It accepts up to two arguments, and, depending on their number and type, performs different tasks.
- It allows for chaining.
Chaining is a programming technique used to call several methods in a single statement. As for example:
    ```
    var obj = new Obj();
    obj.method();
    obj.anotherMethod();
    obj.yetAnotherMethod();
    ```
- Instead of writing several lines of code we can write

    var obj = new Obj();
    obj.method().anotherMethod().yetAnotherMethod();

- The most common use of jQuery() is to select elements from the DOM so you can apply some changes to them.
- It accepts two parameters: a selector and (optionally) a context.
- The jQuery() function returns an object containing a collection of DOM elements that match the given criteria.

### But what’s a selector?
- jQuery selectors allow you to select and manipulate HTML element(s).

- jQuery selectors are used to "find" (or select) HTML elements based on their name, id, classes, types, attributes, values of attributes and much more. 
- It's based on the existing CSS1 to CSS3 Selectors, and then adding its own. - jQuery offers a powerful set of tools for matching a set of elements in a document.
- All selectors in jQuery start with the dollar sign and parentheses: $().
- It has the syntax of:

    ```$(selector expression, context)
                or
      jQuery(selector expression, context)
    ```
- jQuery is a two-step pattern. The first step is to select some elements, and the second step is to perform one or more operations on those elements.
    ```
    //Example 1:
    $(document).ready(function () {
    	//Here the methods we chained were mouseenter and mouseout methods which let me define handler functions for the mouseenter and mouseout events.
    	$("img:odd").mouseenter(function(e){
    		$(this).css("opacity", 0.4);
    	}).mouseout(function (e) {
    		$(this).css("opacity", 1.0);
    	});
    	/*The script changes the opacity of the  images of index odd(1, 3, 5 in array form i.e, image2 or daffodil is of index[1]) when the mouse is moved over them. This has the effect of making the image look a little brighter and washed out. When the mouse is moved away from the image, the opacity returns to its previous value. The images for the aster, rose, and primula are unaffected.*/
    });
    ```
- One can access jQuery by using the $(...) function, or simply $ function. The $ function is the entry point to the jQuery and is a shorthand for the jQuery function. You can rewrite the script to use the full function name if you prefer, as follows:
    ```
    jQuery(document).ready(function () {
    	jQuery("img:odd").mouseenter(function(e){
    		jQuery(this).css("opacity", 0.4);
    	}).mouseout(function (e) {
    		jQuery(this).css("opacity", 1.0);
    	});
    });
    ```
- This script provides the same functionality as the above one. It requires slightly more typing but has the advantage of making the use of jQuery explicit.

- jQuery is not the only JavaScript library that uses the $ notation, which can cause problems if you
are trying to use multiple libraries in the same document. You can make jQuery relinquish control of the
$ by calling the jQuery.noConflict method as follows:
    ```
    jQuery.noConflict();
    jQuery(document).ready(function () {
    	jQuery("img:odd").mouseenter(function(e){
    		jQuery(this).css("opacity", 0.4);
    	}).mouseout(function (e) {
    		jQuery(this).css("opacity", 1.0);
    	});
    });
    ```
- You can also define your own shorthand notation by assigning the result of the noConflict method to a variable as follows:
    ```
    var jQ = jQuery.noConflict();
    //Here I have created my own shorthand, jQ, and then used this shorthand throughout the rest of my script.
    jQ(document).ready(function () {
    	jQ("img:odd").mouseenter(function(e){
    		jQ(this).css("opacity", 0.4);
    	}).mouseout(function (e) {
    		jQ(this).css("opacity", 1.0);
    	});
    });
    ```
- Irrespective of how you refer to the main jQuery function, you can pass the same set of arguments.


## Arguments to the Main jQuery Function:
1. $(function)  - Specifies a function to be executed when the DOM is ready
2. $(selector), $(selector, context)  - Selects elements from the document
3. $(HTMLElement), $(HTMLElement[])   -Creates a jQuery object from an HTMLElement or an array of HTMLElement objects
4. $() - Creates an empty selection
5. $(HTML) - Creates new elements from a fragment of HTML Waiting for

### Script tag:

- We generally placed the script element at the end of the document so that the browser would create
all of the objects in the DOM before executing the JavaScript code.
- We can neatly avoid this issue by using jQuery $(document).ready(function(){}) method as follows:
    ```
    $(document).ready(function () {
    // ...code to execute...
    });
    ```
- Here we  pass the document variable to the $ function and call the ready method, passing in a function that we want to execute when the DOM is loaded and ready to be used. Now you can place the script element wherever you prefer in the document, jQuery will prevent the function from being executed prematurely.

**Note:**
- Passing a function to the ready method creates a handler for the jQuery ready event.
- The function you pass to the ready method will be invoked when the document is loaded and the DOM is ready for use.
- It is a common mistake to omit the function part of the ready method and just pass a series of JavaScript
statements which are executed by the browser immediately and not when the DOM is ready.
    ```
    function countImgElements() {
    	return $('img').length;
    }
    $(document).ready(function() {
    	console.log("Ready function invoked. IMG count: " + countImgElements());
    });
    
    $(document).ready(
    	console.log("Ready statement invoked. IMG count: " + countImgElements())
    );
    ```
- Here we call the ready method twice, once with a function and once just passing in a regular JavaScript statement. Both the countImgElements() function call returns the number of img elements that are present in the DOM.It gives the following result:

    /*
    Output:
    Ready statement invoked. IMG count: 0
    Ready function invoked. IMG count: 6
    */

- Here the statement without the function is executed as the document is loaded and before the browser has discovered the img elements in the document and created the corresponding DOM objects.

## Alternative to the long $(document).ready(function(){}):
- One can pass anonymous function as the parameter to the jQuery $ function if needed. This has the same effect as using the $(document).ready approach.
    ```
    $(function(){
    	// This is the short synytax
    	// Your code goes here
    });
    ```
So our original code will be:
    ```sh
        $(function () {
        	$("img:odd").mouseenter(function(e){
        		$(this).css("opacity", 0.4);
        	}).mouseout(function (e) {
        		$(this).css("opacity", 1.0);
        	});
        });
    ```
## Deferring the ready Event:
- We can control when the ready event is triggered by using the holdReady method. This can be useful if we need to load external resources dynamically.
- The holdReady method must be called before the ready event is triggered and can then be called again when we are
ready.
    ```sh
    $.holdReady(true);
    $(document).ready(function() {
        console.log("Ready event triggered");
        $("img:odd").mouseenter(function(e) {
            $(this).css("opacity", 0.4);
        }).mouseout(function(e) {
            $(this).css("opacity", 1.0);
        });
    });
    setTimeout(() =>{
    	console.log("Releasing Hold");
    	$.holdReady(false);
    },5000);
    ```
- Here we call the holdReady method at the start of the script element and  passed a value of true as the argument, indicating that I want the ready event to be held, then defining the function we want to be called when the ready event is fired.
- Finally, we use the setTimeout method which calls the holdReady method with an argument of false and after 5,000 milliseconds jQuery to trigger the ready event. This will give the following output:
/*
Output:
Releasing Hold
Ready event triggered (After 5 second)
*/
**Note:** 
- In between 5 seconds you can do nothing means no mouseenter() or mouseout() effect.
- One can call the holdReady method multiple times, but the number of calls to the holdReady method with the true argument must be balanced by the same number of calls with the false argument before the ready event will be triggered.

## Selecting Elements:
- One of the most important areas of jQuery functionality is how you select elements from the DOM.
- To select elements, you simply pass a selector to the $ function.
- jQuery supports all of the CSS selectors, here  :odd pseudo-selector, which selects the odd-numbered elements
matched by the main part of the selector (img , which selects all of the img elements).
- The :odd selector is zero-based, meaning that the first element is considered to be even.
- One can create an empty selection by calling the $ function without any arguments ($()).

## jQuery Extension Selectors:
1. :animated - Selects all elements that are being animated
2. :contains(text)  - Selects elements that contain the specified text
3. :eq(n) - Selects the element at the nth index (zero-based)
4. :has(selector) - Selects elements that contain at least one element that matches the specified selector
5.	:visible - Selects all elements that are visible.
6. :text - Selects all text elements
7. :first  - Selects the first matched element
8. :last - Selects the last matched element
9.	:gt(n) - Selects all of the elements with an index greater than n (zero-based)
10. :lt(n) - Selects all of the elements with an index smaller than n (zero-based)
11. :odd - Selects all the odd-numbered elements (one-based)
12. :even  - Selects all the event-numbered elements (one-based)
13. :button - Selects all button elements and elements of type button.
14. :checkbox - Selects all elements of type checkbox.
15. :file - Selects all elements of type file.
16. :header - Selects all elements that are headers, like h1, h2, h3 and so on.
17. :hidden - Selects all elements that are hidden.
18. :image - Selects all elements of type image.
19. :input - Selects all input, textarea, select and button elements.
20. :parent - Select all elements that have at least one child node (either an element or text).
21. :password - Selects all elements of type password.:radio - Selects all elements of type radio.
22. :reset - Selects all elements of type reset.
23. :selected - Selects all elements that are selected.
24. :submit - Selects all elements of type submit.
25. Attribute Not Equal Selector [name!="value"] - Select elements that either don’t have the specified attribute, or do have the specified attribute but not with a certain value.

Note:
- These are the most useful because they define functionality that would be difficult to recreate using CSS selectors.
- These selectors are used just like the CSS pseudo-selectors.
- They can be used on their own, in which case they are applied to all of the elements in the DOM, like this:

	$(':even')

or combined with other selectors to restrict their effect, like this:

	`$('img:even')`

## Narrowing the Selection with a Context:
- By default, jQuery searches the entire DOM for elements.
- One can narrow the scope of a search by providing an additional argument to the $ function.
- This gives the search a context, which is used as the starting point for matching elements.
    ```
    $(document).ready(function() {
        $("img:odd", $('.drow')).mouseenter(function(e) {
            $(this).css("opacity", 0.4);
        }).mouseout(function(e) {
            $(this).css("opacity", 1.0);
        })
    });
    ```

Here we use one jQuery selection [$('.drow')] as the context for another.
- The context is evaluated first, and it matches all of the elements that are members of the drow class. This set of elements is then used as the context for the img:odd selector.
- When you supply a context that contains multiple elements, then each element is used as a starting
point in the search.
- The elements that match the context are gathered together, and then the main selection is performed
- This means the img:odd selector is applied to the results of the drow selector, which means that the odd-numbered
elements are not the same as when you search the entire document.
- The net result is that the opacity effect is applied to the odd-numbered img elements in each div element in the drow class.
- This will give the mouse effect on daffodil and primula images.
- When you omitted the context, the effect was applied to the daffodil, peony, and snowdrop images.

**Note:**
- If you just want to match elements starting at a given point in the document, then you can use an HTMLElement object as the context.
    ```
    $(document).ready(function() {
    	var element = document.getElementById("oblock");
    	$("img:odd", element).mouseenter(function(e) {
    		$(this).css("opacity", 0.5);
    	}).mouseout(function(e) {
    		$(this).css("opacity", 1.0);
    	})
    });
    ```
**Here:**
- The script  searches for odd-numbered img elements, limiting the search to those elements that are descended from the element whose id is oblock.
- One could achieve the same effect using the descendant CSS selector.
- The benefit of this approach arises when you want to narrow a search programmatically, without having to construct a selector string.
- A good example of such a situation is when handling an event.



## Understanding the Selection Result:
- When we use jQuery to select elements from the DOM, the result from the $ function is a named jQuery object, which represents zero or more DOM elements.
- When you perform a jQuery operation that modifies one or more elements, the result is also a jQuery object.
- Some of the methods and properties that are defined by the jQuery object are given below:

**Basic jQuery Object Members**

1. context - Returns the set of elements used as the search context(i.e, it returns HTMLElement) deprecated
2. each(function) - Performs the function on each of the selected elements(i.e, it returns (i.e, it returns Query)
3. get(index) - Gets the HTMLElement object at the specified index(i.e, it returns HTMLElement)
4. index(HTMLElement) - Returns the index of the specified HTMLElement(i.e, it returns number)
5. index(jQuery)-  Returns the index of the first element in the jQuery object(i.e, it returns number)
6. index(selector) - Returns the index of the first element in the jQuery object in the set of elements matched by the selector(i.e, it returns number)
7. length Returns the number of elements contained by the jQuery object(i.e, it returns number)
8. selector Returns the selector(i.e, it returns string) deprecated
9. size() Returns the number of elements in the jQuery object(i.e, it returns number)
10. toArray() Returns the HTMLElement objects contained by the jQuery object as an array(i.e, it returns HTMLElement[])

## Determining the Selector:
- The selector property returns a selector that describes the elements in the jQuery object.
- When you narrow or widen the selection, the selector property returns a selector that describes the combined set of operations.
    ```
    $(document).ready(function() {
    	var selector = $("img:odd").selector
    	console.log("Selector: " + selector);
    });
    ```
This script produces the following output to the console:
    `Selector: img:odd`

# Determining the Context:

- The context property provides you with details of the context used when the jQuery was created.
- If a single HTMLElement object was used as the context, then the context property will return that
HTMLElement.
- If no context was used or if multiple elements were used, then the context property returns undefined instead.
    ```
    $(document).ready(function() {
    	var jq1 = $("img:odd");
    	console.log("No context: " + jq1.context.tagName);
    	var jq2 = $("img:odd", $('.drow'));
    	console.log("Multiple context elements: " + jq2.context.tagName);
    	var jq3 = $("img:odd", document.getElementById("oblock"));
    	console.log("Single context element: " + jq3.context.tagName);
    });
   
    //This script selects elements using no context, multiple context objects, and a single context object.
    //The output is as follows:
    
    // No context: undefined
    // script.js:80 Multiple context elements: undefined
    // script.js:82 Single context element: DIV
    ```
## Creating jQuery Objects from DOM Objects:
- We can create jQuery objects by passing an HTMLElement object or an array of HTMLElement objects as the argument to the $ function.
- This can be useful when dealing with JavaScript code that isn’t written in jQuery or in situations where jQuery exposes the underlying DOM objects, such as event processing. As for example:
    ```
    $(document).ready(function() {
        var elements = document.getElementsByTagName("img");
        $(elements).mouseenter(function(e) {
            $(this).css("opacity", 0.5);
        }).mouseout(function(e) {
            $(this).css("opacity", 1.0);
        })
    });
    ```
- Here we select the img elements in the document using the document.getElementsByTagName method, rather than using jQuery directly with a selector and pass the results of this method (which is a collection of HTMLElement objects) to the $ function, which returns a regular jQuery object.
- This script also demonstrates how you can create a jQuery object from a single HTMLElement object:
$(this).css("opacity", 1.0);
- When you are handling events, jQuery sets the value of the this variable to the HTMLElement that is processing the event.

## Treating a jQuery Object as an Array
- One can treat the jQuery object as an array of HTMLElement objects.
- One can use the length property or the size method to determine how many elements are collected in the jQuery object and access individual DOM objects by using an array-style index (using the [ and ] brackets).
- You can use the toArray() method to extract the HTMLElement objects from the jQuery object as an array.
- The following example shows how you can enumerate the contents of a jQuery object to access the HTMLElement
objects contained within.

    ```sh
        $(document).ready(function() {
            var elems = $('img:odd');
            for (var i = 0; i < elems.length; i++) {
                console.log("Element: " + elems[i].tagName + " " + elems[i].src);
            }
        });
    ```

- Here we use the $ function to select the odd-numbered img elements and enumerate the selected elements to print out the value of the tagName and src properties to the console. The results are as follows:
`
Element: IMG http://www.jacquisflowershop.com/jquery/daffodil.png
Element: IMG http://www.jacquisflowershop.com/jquery/peony.png
Element: IMG http://www.jacquisflowershop.com/jquery/snowdrop.png
`
## Iterate a Function Over DOM Objects
- The each() method lets one define a function that is performed for each DOM object in the jQuery object.
    $('img:odd').each(function(index, elem) {
        console.log("Element: " + elem.tagName + " " + elem.src);
    });
    **Here:**
- jQuery passes two arguments to the specified function. The first is the index of the element in the
collection, and the second is the element object itself.
- We write the tag name and the value of the src property to the console, producing the same results as the previous script.

## Finding Indices and Specific Elements
- The index() method lets one find the index of an HTMLElement in a jQuery object.
- One can pass the index that you want using either an HTMLElement or jQuery object as the argument.
- When you use a jQuery object, the first matched element is the one whose index is returned.
    ```
    $(document).ready(function() {
        var elements = $('body *');
    
        // find an index using the basic DOM API
        var index = elements.index(document.getElementById("oblock"));
        console.log("Index using DOM element is: " + index);
    
        // find an index using another jQuery object
        index = elements.index($('#oblock'));
        console.log("Index using jQuery object is: " + index);
    });
    ```
    **Here:**
- We locate a method using the DOM API’s getElementById method to find a div element by the id attribute value. This returns an HTMLElement object.
- We then use the index method on a jQuery object to find the index of the object that represents the div element.
- We repeat the process using a jQuery object, which We obtain through the $ function.

    /*
    Index using DOM element is: 2
    Index using jQuery object is: 2
    */

- We can also pass a string to the index method, then the string is interpreted as a selector.
However, this approach causes the index method to behave in a different way than the previous example.
- When we pass a string to the index method, the order in which the collection of elements is used changes.
- jQuery matches elements using the selector and then returns the index in the matched elements of the first element in the jQuery object on which we called the index method.
This means that this statement:

    index = imgElems.index("body *");

    is equivalent to this statement:

   ` index = $("body *").index(imgElems);`

So what is the catch? passing a string argument reverses the way in which the two sets of elements are considered.
- We can use the index method without an argument to get the position of an element relative to its siblings. This can be useful when using jQuery to explore the DOM.
- The get() method is the complement to the index method, such that you specify an index and receive the HTMLElement object at that position in the jQuery object. This has the same effect as using the array-style index.
    ```
    $(document).ready(function() {
    	var elem = $('img:odd').get(1);
    	console.log("Element: " + elem.tagName + " " + elem.src);
    });
    ```
    **Here:**
We select the odd-numbered img elements, use the get() method to retrieve the HTMLElement object at index 1, and write the value of the tagName and src properties to the console. The output from this script is as follows:

    `Element: IMG http://www.jacquisflowershop.com/jquery/peony.png`

## Modifying Multiple Elements and Chaining Method Calls
    $(document).ready(function() {
        $('label').css("color", "blue");
    
         // Same effect by DOM API with more lines of code
        var labelElems = document.getElementsByTagName("label");
        for (var i = 0; i < labelElems.length; i++) {
            labelElems[i].style.color = "blue";
        }
    });

**Here:**
- We select all of the label elements in the document and change the value of the CSS color property to blue.
- We do this in a single statement in jQuery, but it takes a bit more effort using the basic DOM API.
- Whenever you call a method that modifies the contents of the object, the result of the method is another jQuery object which allows us to perform method chaining.
```
    $(document).ready(function() {
    	//Method Chaining Method Calls on a jQuery Object
        $('label').css("color", "blue").css("font-size", ".75em");
    
        // Same effect by DOM API with more lines of code
        var labelElems = document.getElementsByTagName("label");
        for (var i = 0; i < labelElems.length; i++) {
            labelElems[i].style.color = "blue";
            labelElems[i].style.fontSize = "1.75em";
        }
    });
```
Here:
We create a jQuery object using the $ function, call the css method to set a value for the color property, and then call the css method again, this time to set the font-size property.
```
    $(document).ready(function() {
        $('label').css("color", "green").add("input[name!='rose']").filter("[for!='snowdrop']").css("font-size", ".75em");
    
        // Same effect by DOM API with more lines of code
        var elems = document.getElementsByTagName("label");
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.color = "green";
            if (elems[i].getAttribute("for") != "snowdrop") {
                elems[i].style.fontSize = ".75em";
            }
        }
        elems = document.getElementsByTagName("input");
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].getAttribute("name") != "rose") {
                elems[i].style.fontSize = ".75em";
            }
        }
    });
```
Here:
* We start with this:

$('label').css("color", "blue")

Where we have selected all of the label elements in the document and set the value of the CSS color property to be blue for all of them.

* The next step is as follows:

$('label').css("color", "blue").add("input[name!='rose']")

The add method adds the elements that match the specified selector to the jQuery object.
We have selected all input elements that don’t have a name attribute whose value is rose. These are
combined with the previously matched elements to give me a mix of label and input elements.

* Here is the next addition:

$('label').css("color", "blue").add("input[name!='rose']").filter("[for!='snowdrop']")

The filter method removes all of the elements in a jQuery object that don’t meet a specified condition which allows me to remove any element from the jQuery object that has a 'for' attribute whose value is snowdrop.

$('label').css("color", "blue").add("input[name!='rose']")
.filter("[for!='snowdrop']").css("font-size", ".75em");

The final step is to call the css method again, this time setting the font-size property to .75em.

* The net result of this is as follows:
1. All label elements are assigned the value blue for the color CSS property.
2. All label elements except the one that has the for attribute value of snowdrop are assigned the value .75em for the CSS font-size property.
3. All input elements that don’t have a name attribute value of rose are assigned the value of .75em for the CSS font-size property.

- Achieving the same effect using the basic DOM API is a lot more complex.


# Managing the Element Selection

## Expanding the Selection

- The add method allows you to expand the contents of a jQuery object by adding additional elements.

add(selector), add(selector, context) - Adds all of the elements that are matched by the selector, with or without a context
add(HTMLElement),add(HTMLElement[])  - Adds a single HTMLElement or an array of HTMLElements add(jQuery) Adds the contents of the specified jQuery object
add(jQuery) - Adds the contents of the specified jQuery object

- the add method returns a jQuery object on which you can call other methods, including further calls to the add method.
- A common mistake is to assume that the remove method is the counterpart to the add method and will narrow the selection. But, the remove method changes the structure of the DOM.
```
$(document).ready(function() {
	var labelElems = document.getElementsByTagName("label");
	var jq = $('img[src*=daffodil]');
	$('img:even').add('img[src*=primula]').add(jq)
		.add(labelElems).css("border", "thick double red");
});
```
This script uses all three approaches to add elements to the initial selection: with another selector, with some HTMLElement objects, and with another jQuery object.

## Narrowing the Selection
** Methods to Filter Elements **
eq(index) - Removes all of the elements except the one at the specified index.
filter(condition) - Removes elements that don’t match the specified condition.
first() - Removes all of the elements except the first.
has(selector), has(jQuery), has(HTMLElement), has(HTMLElement[]) -Removes elements that don’t have a descendant matched by the specified selector or jQuery object or whose descendants don’t include the specified HTMLElement objects.
last() - Removes all but the last element.
not(condition) - Removes all elements that match the condition. See the later discussion for details of how the condition can be specified.
slice(start, end) - Removes all elements outside the specified range of index values.

- The above methods allow us to remove elements from the selection and the methods return a new jQuery object that contains the reduced element selection.
- The jQuery object on which the method was called remains unchanged.

## Reducing the Selection to a Specific Element
- The three most basic reduction methods are first, last, and eq. These three methods allow you to select a specific element based on its position in the jQuery object.
```
$(document).ready(function(){
    var jq = $('label');
// select and operate on the first element
jq.first().css("border", "thick double red");
// select and operate on the last element
jq.last().css("border", "thick double green");
// -1 means it operate on the last element
jq.eq(-1).css("border", "thick double purple");
// select and operate on an element by index and its actually element three
jq.eq(2).css("border", "thick double black");
// -2 means it operate on second from the last element
jq.eq(-2).css("border", "thick double black");
});
```

- When the argument to this method is positive, the index is counted from the first element in the jQuery object. When the argument is negative, the counting is done backward, starting from the last element.

## Reducing the Selection by Range
- The slice method lets you reduce the selection to a range of elements, specified by index.
```
$(document).ready(function() {
    var jq = $('label');
    jq.slice(0, 2).css("border", "thick double black");
    jq.slice(4).css("border", "thick solid red");
});
```
- The arguments to the slice method are the index to begin selection and the index to end selection.
Indexes are zero-based, so the arguments (0 and 2) have the effect of selecting the first two elements.
- If you omit the second argument, then the selection continues to the end of the set of elements. By specifying a single argument of 4 for a set of six elements, we selected the last two elements (which have the index values of 4 and 5).


## Filtering Elements
The filter method lets you specify a condition. Any elements that don’t meet the condition are
removed from the selection.

filter(selector) - Removes elements that don’t match the selector.
filter(HTMLElement) - Removes all but the specified element.
filter(jQuery) - Removes elements that are not contained in the specified jQuery object.
filter(function(index)) - The function is called for each element; those for which the function returns false are removed.

```
$(document).ready(function() {
    // remove elements whose src attribute contains the letter 's'
    $('img').filter('[src*=s]').css("border", "thick double red");
    // remove elements that don't contain the letter p
    var jq = $('[for*=p]');
    $('label').filter(jq).css("color", "blue");
    // remove elements that are not the specified element
    var elem = document.getElementsByTagName("label")[1];
    $('label').filter(elem).css("font-size", "1.5em");
    // remove elements using a function
    $('img').filter(function(index) {
        return this.getAttribute("src") == "peony.png" || index == 4;
    }).css("border", "thick solid red")
});
```
In the last example, jQuery calls your function once for every element contained by the jQuery object.
- If you return true from the method, the element for which the function has been called is retained.
- If you return false, then the element is removed. There is one argument passed to the function, which is the index of the element for which the function is being called.
- In addition, the 'this' variable is set to the HTMLElement object that you need to process. In the listing, I return true if the element has a particular value for the src attribute and for a specific index value.

- The complement to the filter method is not(), which works in much the same way but inverts the filtering process.
not(selector) - Removes elements that match the selector.
not(HTMLElement[]), not(HTMLElement) - Removes the specified element or elements.
not(jQuery) - Removes elements that are contained in the specified jQuery object.
not(function(index)) - The function is called for each element; those for which the function returns true are removed.
```
$(document).ready(function() {
    $('img').not('[src*=s]').css("border", "thick double red");
    var jq = $('[for*=p]');
    $('label').not(jq).css("color", "blue");
    var elem = document.getElementsByTagName("label")[1];
    $('label').not(elem).css("font-size", "1.5em");
    $('img').not(function(index) {
        return this.getAttribute("src") == "peony.png" || index == 4;
    }).css("border", "thick solid red")
});
```
## Reducing the Selection Based on Descendants
- One can use the has() method to reduce the selection to elements that have particular descendants, by
specifying either a selector or one or more HTMLElement objects.
```
$(document).ready(function() {
    $('div.dcell').has('img[src*=astor]').css("border", "thick solid red");
    var jq = $('[for*=p]');
    $('div.dcell').has(jq).css("border", "thick solid blue");
});
```

- Here we reduce the selection by removing elements that don’t have specific descendants.
- In the first case, where we use a selector, we remove elements that don’t have at least one descendant img element with a src attribute value that contains astor.
- In the second case, where we use a jQuery object, we remove elements that don’t have at least one descendant that has a for attribute with a value that contains the letter p.

## Mapping the Selection
- The map method provides a flexible way to use one jQuery object as a means to create another.
- The map method calls the passing function for every element in the source jQuery object, and the HTMLElement objects that you return from the function are included in the result jQuery object.
```
$(document).ready(function() {
    $('div.dcell').map(function(index, elem) {
        return elem.getElementsByTagName("img")[0];
    }).css("border", "thick solid red");
    $('div.dcell').map(function(index, elem) {
        return $(elem).children()[1];
    }).css("border", "thick solid blue");
});
```
- The first uses the DOM API to return the first img element contained in each element, and the second uses jQuery to return the first item in the jQuery object returned by the children method (it returns the child nodes of each element in a jQuery object).
- You can return only one element each time the function is called. If you want to project multiple result elements for each source element, you can combine the each and add methods.

## Testing the Selection
is() method is used to determine whether one of more elements in a jQuery object meets a specified condition.

is(selector) - Returns true if the jQuery object contains at least one of the elements matched by the selector
is(HTMLElement[]), is(HTMLElement) -Returns true if the jQuery object contains the specified element, or at least one of the elements in the specified array
is(jQuery) - Returns true if the jQuery object contains at least one of the elements in the argument object
is(function(index)) - Returns true if the function returns true at least once

- When you specify a function, jQuery will invoke that function once for each element in the jQuery object, passing the index of the element as the function argument and setting the this variable to the element itself.
- This method returns a boolean value. Not all jQuery methods return a jQuery object.
```sh
$(document).ready(function() {
    var isResult = $('img').is(function(index) {
        return this.getAttribute("src") == "rose.png";
    });
    console.log("Result: " + isResult);
});

```
This script tests to see whether the jQuery object contains an element whose src attribute value is rose.png and writes out the result to the console, as follows: Result: true

## Changing and Then Unwinding the Selection
- jQuery preserves a history stack when you modify the selection by chaining methods together, and you can use a couple of methods to take advantage of this

* Methods to Unwind the Selection Stack
end() - Pops the current selection off the stack and returns to the previous selection
andSelf() - Adds the previous selection to the current selection

- One can use the end() method to return to the previous selection, which allows you to select some elements, expand or reduce the selection, perform some operations, and then return to the original selection.

$(document).ready(function() {
    $('label').first().css("border", "thick solid blue").end().css("font-size", "1.5em");
});

Here we start by selecting all of the label elements in the document, then reduce the selection by calling the first method (to get the first matched element) and then set a value for the CSS border property using the css method.
We then call the end method to return to the previous selection (which moves you from the first label element back to all of the label elements) and then call the css method again, this time to set a value for the font-size property.

- The andSelf method adds the contents of the previous selection on the stack to the current selection.
$(document).ready(function() {
	$('div.dcell').children('img').andSelf().css("border", "thick solid blue");
});

Here we select all of the div elements that are members of the dcell class and then use the children method to select all of the img elements that are their children.
We then call the andSelf method, which combines the previous selection (the div element) with the current selection (the img elements) in a single jQuery object. Finally, We call use the css method to set a border for the selected elements.

## Navigating the DOM
- One can use a selection as the start point for navigating elsewhere in the DOM, in essence using one selection as the start point for creating another.
- All of the methods that are described in the following sections return a jQuery object which will contain the matched elements if there are any and will be empty (i.e., the length property will be zero) if there are not.

### Navigating Down the Hierarchy

- When you navigate down the DOM hierarchy, you are selecting children and descendants of the elements contained in a jQuery object.

children() - Selects the children of all of the elements in the jQuery object
children(selector) - Selects all of the elements that match the selector and that are children of the elements in the jQuery object
contents() - Returns the children and text content of all the elements in the jQuery object
find() - Selects the descendants of the elements in the jQuery object
find(selector) - Selects the elements that match the selector and that are descendants of the elements in the jQuery object
find(jQuery), find(HTMLElement), find(HTMLElement[]) - Selects the intersection between the children of the elements in the jQuery object and the argument object

- The children method will select only those elements that are immediate descendants of each element in the jQuery object, optionally filtered by a selector.
- The find method will select all descendant elements, not just the immediate ones.
- The contents method will return the children elements, plus any text content.
```sh
$(document).ready(function() {
    var childCount = $('div.drow').children().each(function(index, elem) {
        console.log("Child: " + elem.tagName + " " + elem.className);
    }).length;
    console.log("There are " + childCount + " children");
    var descCount = $('div.drow').find('img').each(function(index, elem) {
        console.log("Descendant: " + elem.tagName + " " + elem.src);
    }).length;
    console.log("There are " + descCount + " img descendants");
});
```

Here we  use the children method without a selector and the find method with one.
The console output from this script is as follows:
```
/*
Child: DIV dcell
Child: DIV dcell
Child: DIV dcell
Child: DIV dcell
Child: DIV dcell
Child: DIV dcell
There are 6 children
Descendant: IMG http://www.jacquisflowershop.com/jquery/astor.png
Descendant: IMG http://www.jacquisflowershop.com/jquery/daffodil.png
Descendant: IMG http://www.jacquisflowershop.com/jquery/rose.png
Descendant: IMG http://www.jacquisflowershop.com/jquery/peony.png
Descendant: IMG http://www.jacquisflowershop.com/jquery/primula.png
Descendant: IMG http://www.jacquisflowershop.com/jquery/snowdrop.png
There are 6 img descendants
*/
```
- One of the nice features of the children and find methods is that you don’t receive duplicate elements in the selection.
```
//Generating a Selection with Overlapping Descendants
<script type="text/javascript">
	$(document).ready(function() {
		$('div.drow').add('div.dcell').find('img').each(function(index, elem) {
			console.log("Element: " + elem.tagName + " " + elem.src);
		});
	});
</script>
```

- Here we start by creating a jQuery object that contains all of the div elements that are members of the drow class and all of the div elements that are members of the dcell class.
- The key point to note is that all of the members of the dcell class are contained within members of the drow class, meaning that you have overlapping sets of descendants and the potential for duplication when we use the find method with the img selector, since the img elements are descendants of both classes of div elements.
- But jQuery comes to the rescue and ensures that there are no duplicates in the elements returned, as demonstrated in the output from this script:
```
/*
Element: IMG http://www.jacquisflowershop.com/jquery/astor.png
Element: IMG http://www.jacquisflowershop.com/jquery/daffodil.png
Element: IMG http://www.jacquisflowershop.com/jquery/rose.png
Element: IMG http://www.jacquisflowershop.com/jquery/peony.png
Element: IMG http://www.jacquisflowershop.com/jquery/primula.png
Element: IMG http://www.jacquisflowershop.com/jquery/snowdrop.png
 */
```
## Using the find Method to Create an Intersection

- One can pass a jQuery object, an HTMLElement object, or an array of HTMLElement objects as the argument to the find method. When we do this, we select the intersection between the descendants in the source jQuery object and the elements in the argument object.
```
//Using the find Method to Create an Intersection
<script type="text/javascript">
$(document).ready(function() {
	var jq = $('label').filter('[for*=p]').not('[for=peony]');
	$('div.drow').find(jq).css("border", "thick solid blue");
});
</script>
```
- Here we create a jQuery object that we then reduce using the filter and not methods. This object then becomes the argument to the find method on another jQuery object that contains all of the div elements in the drow class. The final selection is the intersection between the descendants of the div.drow elements and my reduced set of label elements

## Navigating Up the Hierarchy
When you navigate up the DOM hierarchy, you are interested in parents and ancestors of the elements contained in a jQuery object.

closest(selector),
closest(selector, context)	- Selects the nearest ancestor for each element in the jQuery object that intersects with the specified selector.
closest(jQuery),
closest(HTMLElement)	- Selects the nearest ancestor for each element in the jQuery object that intersects with the elements contained in the argument object.
offsetParent()	- Finds the nearest ancestor that has a value for the CSS position property of fixed, absolute, or relative.
parent() parent(selector)	- Selects the parent for each element in the jQuery object, optionally filtered by a selector.
parents() parents(selector)	- Selects the ancestors for each element in the jQuery object, optionally filtered by a selector.
parentsUntil(selector),
parentsUntil(selector, selector)	- Selects the ancestors for each element in the jQuery object until a match for the selector is encountered. The results can be filtered using a second selector.
parentsUntil(HTMLElement),
parentsUntil(HTMLElement, selector),
parentsUntil(HTMLElement[])
parentsUntil(HTMLElement[], selector)	- Selects the ancestors for each element in the jQuery object until one of the specified elements is encountered. The results can be filtered using a selector.

### Selecting Parent Elements
- The parent method lets you select the parent element for each of the elements in a jQuery object.
- If you provide a selector, then only parent elements that match the selector will be included in the result.
```
<script type="text/javascript">
	$(document).ready(function() {
		$('div.dcell').parent().each(function(index, elem) {
			console.log("Element: " + elem.tagName + " " + elem.id);
		});
		$('div.dcell').parent('#row1').each(function(index, elem) {
			console.log("Filtered Element: " + elem.tagName + " " + elem.id);
		});
	});
</script>
```
Here we select all of the div elements who are members of the dcell class and then call the parent method to select the parent elements. we have also demonstrated using the parent method with a selector. we use the each method to write information about the selected parent elements to the console, which produces the following output:

Element: DIV row1
Element: DIV row2
Filtered Element: DIV row1

### Selecting Ancestors
- The parents method (note the final letter s) lets you select all of the ancestors of elements in a jQuery object, not just the immediate parents. Once again, you can pass a selector as a method to the argument to filter the results.
```sh
<script type="text/javascript">
$(document).ready(function() {
	$('img[src*=peony], img[src*=rose]').parents().each(function(index, elem) {
		console.log("Element: " + elem.tagName + " " + elem.className + " " + elem.id);
	});
});
</script>
```
- Here we have selected two of the img elements and used the parents method to select their ancestors. we then write information about each ancestor to the console, to produce the following output:

Element: DIV dcell
Element: DIV drow row2
Element: DIV dcell
Element: DIV drow row1
Element: DIV dtable
Element: DIV oblock
Element: FORM
Element: BODY
Element: HTML

- A variation on selecting ancestors is presented by the parentsUntil method.
- For each element in the jQuery object, the parentsUntil method works its way up the DOM hierarchy, selecting ancestor elements until an element that matches the selector is encountered.
```sh
<script>
//Using the parentsUntil Method
	$(document).ready(function() {
	$('img[src*=peony], img[src*=rose]').parentsUntil('form')
		.each(function(index, elem) {
		console.log("Element: " + elem.tagName + " " + elem.className + " " + elem.id);
		});
	});
</script>
```
- Here the ancestors for each element are selected until a form element is encountered. The output from the script is as follows:

Element: DIV dcell
Element: DIV drow row2
Element: DIV dcell
Element: DIV drow row1
Element: DIV dtable
Element: DIV oblock

Notice: that elements that match the selector are excluded from the selected ancestors which means that the form element is excluded.
- One can filter the set of ancestors by providing a second selector argument, as shown below:

```sh
<script type="text/javascript">
//Filtering the Set ofElements Selected by the parentsUntil Method
$(document).ready(function() {
	$('img[src*=peony], img[src*=rose]').parentsUntil('form', ':not(.dcell)') .each(function(index, elem) {
	console.log("Element: " + elem.tagName + " " + elem.className + " " + elem.id);
	});
});
</script>
```
Here we have added a selector that will filter out elements that belong to the dcell class. The output from this script is as follows:

Element: DIV drow row2
Element: DIV drow row1
Element: DIV dtable
Element: DIV oblock

## Selecting the First Matching Ancestor
The closest method lets you select the first ancestor that is matched by a selector for each element in a jQuery object.
```sh
<script type="text/javascript">
//Using the closest Method
$(document).ready(function() {
	$('img').closest('.drow').each(function(index, elem) {
		console.log("Element: " + elem.tagName + " " + elem.className + " " + elem.id);
	});
	var contextElem = document.getElementById("row1");
	$('img').closest('.drow', contextElem).each(function(index, elem) {
		console.log("Context Element: " + elem.tagName + " " + elem.className + " " + elem.id);
	});
});
</script>
```
- Here we select the img elements in the document and then use the closest method to find the nearest ancestor that belongs to the drow class.
- You can narrow the scope for selecting ancestors by specifying an HTMLElement object as the second argument to the method.
- Ancestors that are not the context object or are not descendants of the context object are excluded from the selection.
The output from the script is as follows:

Element: DIV drow rowl
Element: DIV drow row2
Context Element: DIV drow row2


- When you specify a jQuery object or one or more HTMLElement objects as the argument to the closest method, jQuery works its way up the hierarchy for each element in the source jQuery object, matching the first argument object it finds.
```sh
<script type="text/javascript">
//Using the Closest Method with a Set of Reference Objects
$(document).ready(function() {
	var jq = $('#row1, #row2, form');
	$('img[src*=rose]').closest(jq).each(function(index, elem) {
		console.log("Context Element: " + elem.tagName + " " + elem.className + " " + elem.id);
	});
});
</script>
```
- Here we select one of the img elements in the document and then use the closest method to select the ancestor elements. We have supplied a jQuery object containing the form element and the elements with the row1 and row2 ID as the argument to the closest method. jQuery will select whichever of the elements is the nearest ancestor to the img element.
- In other words, it will start to work its way up the hierarchy until it encounters one of the elements in the argument object. The output for this script is as follows:

Context Element: DIV drow row1

- The offsetParent is a variation on the closest theme and funds the first ancestor that has a value for the position CSS property of relative, absolute, or fixed. Such an element is known as a positioned ancestor, and finding one can be useful when working with animation.

```
<!--Using the offsetParentMethod -->
<!DOCTYPE html>
<html>

<head>
    <title>Example</title>
    <script src="jquery-1.7.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="styles.css" />
    <style type="text/css">
        #oblock {
            position: fixed;
            top: 120px;
            left: 50px
        }

    </style>
    <script type="text/javascript">
        $(document).ready(function() {
            $('img[src*=astor]').offsetParent().css("background-color", "lightgrey");
        });

    </script>
</head>

<body>
    <h1>Jacqui's Flower Shop</h1>
    <form method="post">
        <div id="oblock">
            <div class="dtable">
                <div id="row1" class="drow">
                    <div class="dcell">
                        <img src="astor.png" /><label for="astor">Astor:</label>
                        <input name="astor" value="0" required>
                    </div>
                    <div class="dcell">
                        <img src="daffodil.png" /><label for="daffodil">Daffodil:</label> <input name="daffodil" value="0" required>
                    </div>
                    <div class="dcell">
                        <img src="rose.png" /><label for="rose">Rose:</label>
                        <input name="rose" value="0" required>
                    </div>
                </div>
            </div>
        </div>
        <div id="buttonDiv"><button type="submit">Place Order</button></div>
    </form>
</body>

</html>
```

Here we have used CSS to set a value for the position property for the element with the id of oblock.
- In the script, I use jQuery to select one of the img elements and then call the offsetParent method to find the closest positioned element.
- This method works its way up the hierarchy until it reaches an element with one of the required values. We use the css property to set a value for the background-color property for the selected element.

## Navigating Across the Hierarchy
- The final form of DOM navigation deals with siblings.
- Methods to Navigate Across the DOM Hierarchy

next(),
next(selector) - Selects the immediate next sibling for each element in the jQuery object, optionally filtered by a selector.
nextAll(), nextAll(selector) - Selects all of the next siblings for each element in the jQuery object, optionally filtered by a selector.

nextUntil((selector),
nextUntil(selector, selector),
nextUntil(jQuery),
nextUntil(jQuery, selector),
nextUntil(HTMLElement[]),
nextUntil(HTMLElement[], selector) - Selects the next siblings for each element up to (and excluding) an element that matches the selector or an element in the jQuery object or the HTMLElement array. The results can optionally be filtered by a selector as the second argument to the method.

prev(),
prev(selector) - Selects the immediate previous sibling for each element in the jQuery object, optionally filtered by a selector.

prevAll(),
prevAll(selector) - Selects all of the previous siblings for each element in the jQuery object, optionally filtered by a selector.

prevUntil(selector),
prevUntil(selector, selector),
prevUntil(jQuery),
prevUntil(jQuery, selector),
prevUntil(HTMLElement[]),
prevUntil(HTMLElement[], selector) - Selects the previous siblings for each element up to (and excluding) an element that matches the selector or an element in the jQuery object or the HTMLElement array. The results can optionally be filtered by a selector as the second argument to the method.

siblings(),
siblings(selector) - Selects all of the siblings for each of the elements in the jQuery object, optionally filtered by a selector.

## Selecting All Siblings
- The siblings method selects all of the siblings for all of the elements in a jQuery object.
```sh
<script type="text/javascript">
//Using the siblings Method
$(document).ready(function() {
	$('img[src*=astor], img[src*=primula]')
		.parent().siblings().css("border", "thick solid blue");
});
</script>
```
- Here we select two of the img elements, call the parent method to select their parent elements, and then call the siblings method to select their sibling elements.
- Both the previous and next siblings will be selected, and we use the css method to set a value for the border property.

- Notice that only the siblings are selected, not the elements themselves. Of course, this changes if one element in the jQuery object is a sibling of another, as shown below:
```sh
<script type="text/javascript">
//Overlapping Sets ofSiblings
$(document).ready(function() {
	$('#row1 div.dcell').siblings().css("border", "thick solid blue");
});
</script>
```
- In this script, we start by selecting all of the div elements that are children of the row1 element and then call the siblings method. Each of the elements in the selection is the sibling to at least one of the other elements.

## Selecting Next and Previous Siblings
```sh
<script type="text/javascript">
//Using the nextAll and prevAll Methods
$(document).ready(function() {
	$('img[src*=astor]').parent().nextAll().css("border", "thick solid blue");
	$('img[src*=primula]').parent().prevAll().css("border", "thick double red");
});
</script>
```
This script selects the next siblings for the parent of the astor image and the previous siblings for the primula image. 


































