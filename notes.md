 **Sizzle:** 
>jQuery is a DOM manipulation library that will generally do what you tell it to do.

According to Timmy Willison-
>The basic API of jQuery is to select something and then do something with what was selected. Sizzle, the selector engine in jQuery, handles the first half. It’s been a fast and efficient little engine that has paved the way for native selector APIs like querySelectorAll and additional native JavaScript and CSS selectors.

While initially part of jQuery, Sizzle has had a wider-ranging influence and its selectors have made their way into modern browsers, making them redundant in jQuery, hence the decision to remove Sizzle in jQuery 4.0.

To pave the way for this change, in which Sizzle will be replaced by a small wrapper around querySelectorAll, the following list of non-standard positional selectors, that would be almost impossible to reimplement without a larger selector engine, are being deprecated:
```
:first
:last 
:eq
:even
:odd
:lt
:gt
:nth
```
Noting that the postional methods, such as: 
```
.first
.last 
.eq
```
will still be supported, Willison says, and I have to agree with him: 

>Anything you can do with positional selectors, you can do with positional methods instead. They perform better anyway.

On the other hand if you have to support a legacy browser, such as IE, Internet Explorer, you may need to continue to use Sizzle, either by using an version of jQuery pre-dating 4.0, the date for which has yet to be announced, or by downloading Sizzle itself.

1. Sizzle is a crossbrowser Javascript DOM selector engine used in the jQuery library (actually a spin-off from jQuery project)
2. When you do a jQuery select like $('#someid'), jQuery will trigger Sizzle to 
do the DOM select and then return the result back to jQuery
3. So, if you want to use jQuery selector but do not use much other of its 
features use standalone Sizzle that will help reduce the nasty overhead of 
the jQuery.
4. Sizzle is much smaller than jQuery size is only 18.4KB compare to around 90KB of jQuery 2.1.4 (5 times larger) So using Sizzle will help decrease your page loading time.
5. Sizzle use CSS selector syntax that is quite similiar to jQuery.
6. To use Sizzle, simply include the .js file into our page.
7. Now, we're ready. I'm going to select our first div by id. You can use Sizzle('selector') simliar to $('selector') of jQuery. So it'll be Sizzle('#testdiv') and let's put the div text in he popup so we can see the result. 

**Note:** 
* the returned result is always in array so we need to specify the index
* Any selector that work with jQuery should also work with Sizzle too. 

Let's try 

select by class

or by custom attribute

or even something like :last-child selector


__To sum up, Sizzle is part of jQuery. Use Sizzle if you plan to use only the selector or performance/load time is your most concern. Otherwise go with jQuery__


