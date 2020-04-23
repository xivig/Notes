# Jquery Selectors gist
_From the 'Jquery in Action' by Bear Bibeault, Yehuda Katz, Aurelio De Rosa_

- jQuery selectors allow you to select and manipulate HTML element(s).

- jQuery selectors are used to "find" (or select) HTML elements based on their name, id, classes, types, attributes, values of attributes and much more. 
- It's based on the existing CSS1 to CSS3 Selectors, and then adding its own. - jQuery offers a powerful set of tools for matching a set of elements in a document.
- All selectors in jQuery start with the dollar sign and parentheses: $().
- It has the syntax of:

```sh
$(selector expression, context)
            or
  
jQuery(selector expression, context)
```

## Selecting elements for manipulation

- To select elements in a page using jQuery, you need to pass the selector to the jQuery() function or its alias $().
- The jQuery() function and its alias return a jQuery object containing a set of DOM elements that match the given criteria.

## Basic selectors

## The All (or Universal) selector
- The first selector available is the All (or Universal) selector, which is represented by an asterisk (*).
- It allows you to retrieve all of the DOM elements of a web page, even the head element and its children.
- To retrieve all the elements of the page you need to use the Universal selector and pass it to the jQuery() function or its alias $() in a statement like the following:
    `var allElements = $('*');  `

- When savingthe result of a selection made with jQuery in a variable, a widely adopted convention is to prepend or (less commonly) append a dollar sign to the name of the variable.
- It doesn’t have a special meaning; it’s used as a reminder of what the variable is storing.
- Another reason to adopt one of these conventions is to be sure not to invoke $() on a set of DOM elements on which we’ve already called this method. For example, the following is erroneous:

  ```sh
  var allElements = $('*');
    // Other code here...
    $(allElements);
  ```
- Using the aforementioned conventions, you can rewrite the previous statement prepending the dollar sign to the variable name, as shown here:
    `var $allElements = $('*');`

-   Alternatively, you also can write it this way:
    `var allElements$ = $('*');`

- We recommend adopting one of these conventions and sticking with it. Throughout the rest of the book, we’ll use the first one: the dollar sign prepended.

- Here we’ll use a CDN to include jQuery using the fallback technique, and the Universal selector to select all the elements of
the page.
- There are two main reasons for this choice: brevity (that is, writing less code) and avoiding an additional HTTP request (that fails if you’re running the code while offline).

    ```html
    <!DOCTYPE html>
    <html>
       <head>
          <meta charset="utf-8" />
          <title>jQuery in Action, 3rd edition</title>
       </head>
       <body>
          <p>I'm a paragraph</p>
          <script src="//code.jquery.com/jquery.min.js"></script>
          <script>
             window.jQuery || document.write('<script src="assets/scripts/jquery.min.js"><\/script>');
             var $allElements = $('*');
          </script>
       </body>
    </html>
    ```
- Remember, the elements are retrieved and stored in the same order in which they appear on the page.
- the use of the All selector forces jQuery to traverse all of the DOM’s nodes. With a lot of elements in the DOM, the process might be very slow. So don't use it and you actually don't need it.

## The ID selector

- The ID selector is one of the most used selectors, not only in jQuery but also in plain JavaScript.
- In JavaScript, to select an element by its ID, you pass the ID to the native document.getElementById() function.
- If you have this paragraph in your page
<p id="description">jQuery in Action is a book about jQuery</p>
- One can retrieve it using the ID selector and jQuery by writing

    `$('#description');`

- When used with the ID selector, jQuery returns a collection of either zero or one DOM element.
- In case you have more than one element on a page with the same ID, the library retrieves only the first matched element encountered.
- Although you can have more than one element with the same ID, it’s invalid and you should not do that.
- The W3C specifications of HTML5 assert that the value of an ID “must not contain any space characters. There are no other restrictions on what form an ID can take; in particular, IDs can consist of just digits, start with a digit, start with an underscore, consist of just punctuation, etc.”
- It’s possible to use characters such as the period (.) that have a special meaning in CSS and jQuery ,i.e, a class sector.
- Because of this, they must be escaped by prepending two backslashes to the special character.
Thus, if you want to select an element with ID of .description, you have to write $('#\\.description').
- In jQuery the selection by ID is the fastest one, regardless of the browser used, because behind the scenes the library uses getElementById (), which is very fast.
- Using the ID selector you’re able to quickly retrieve one element in the DOM.

## The Class Selector

- The Class selector is used to retrieve elements by the CSS class names used.
- In JavaScript, behind the scene it uses the native getElementsByClassName() function.
- jQuery follows the CSS conventions, so we have to prepend a dot before the chosen class name. As for example:
    
    ```sh
    <div>
        <h1 class="green">A title</h1>
        <p class="description">I'm a paragraph</p>
    </div>
    <div>
        <h1 class="green">Another title</h1>
        <p class="description blue">I'm yet another paragraph</p>
    </div>
    ```
- If we want to select the class description, then we need to pass .description to the $() function by writing the following statement:

    `var $descriptions = $('.description');`

- The result of this statement is an object, referred to as a jQuery object or a jQuery collection containing the two paragraphs of the HTML snippet.
- In jQuery, it’s also possible to combine more class name selectors.
- If you want to select all the elements having the classes description and blue, you can concatenate them, resulting in $('.description.blue').

## The Element Selector

- The Element selector allows you to pick up elements based on their tag name.
-jQuery uses getElementsByTagName() to select elements by tag name behind the scenes.
- If you want to select  all the <div>s in a page, you have to  write

    `var $divs = $('div');`

- If you want all <div>s having class clearfix, you have to write the following statement:
 `var $clearfixDivs = $('div.clearfix');`

- It is  strongly recommended that don't combine class with the ID selector for two reasons: performance and usefulness.

- jQuery also enables you to use different types in a single selection, providing a performance gain because the DOM is traversed only once.
- To use it, you have to add a comma after each selector but the last one.
- To select all the <div>s and the <span>s in a page, you can write
    `$('div, span');`

### Retrieving elements by their hierarchy
- Retrieving a set of elements by their class name is a nice feature, but often you don’t want to search the whole page.
- Consider the following HTML fragment from the sample DOM in the Selectors Lab:
    
    ```sh
    <ul class="my-list">
      <li>
         <a href="http://jquery.com">jQuery supports</a>
         <ul>
            <li><a href="css1">CSS1</a></li>
            <li><a href="css2">CSS2</a></li>
            <li><a href="css3">CSS3</a></li>
            <li>Basic XPath</li>
         </ul>
      </li>
      <li>jQuery also supports
         <ul>
            <li>Custom selectors</li>
            <li>Form selectors</li>
         </ul>
      </li>
    </ul>
    ```
- If you want to select the element pointing to the jQuery website but not those to various local pages describing the different CSS specifications, you can use the Child selector in which a parent and its direct child are separated by the right angle bracket character (>).
You can write
    `ul.my-list > li > a`

- This selector will collect only links that are direct children of list elements, which are in turn direct children of the <ul> that have class my-list.
- The links contained in the sublists are excluded because the ul element serving as their parent doesn’t have the class my-list.

  1. E F  - Matches all elements with tag name F that are descendants of E
  2. E>F  - Matches all elements with tag name F that are direct children of E
  3. E + F  - Matches all elements with tag name F that are immediately preceded by sibling E
  4. E~F   - Matches all elements with tag name F preceded by any sibling E

### Selecting elements using attributes
- Attribute selectors are extremely powerful and allow you to select elements based on their attributes.
- Attribute selectors are wrapped with square brackets (e.g, [selector]).

- What usually makes the link pointing to an external site unique is the http:// at the beginning of the string value for the link’s href attribute.
- In CSS, you could select links that have an href value starting with http:// with the following selector:

    `a[href^='http://']`

- Using jQuery,the above statement looks like:

    `var $externalLinks = $("a[href^='http://']");`

- This matches all links with an href value beginning with the exact string http://.
The caret character (^) is used to specify that the match has to occur at the beginning of a value.
- Because this is the same character used by most regular expression processors to signify matching at the beginning of a candidate string, it should be easy to remember.

### Single and double quotes
- Pay attention to single and double quotes when you use the attribute selectors.
- A wrong combination of the latter will result in an invalid statement.
- If your style of code adopts the use of double quotes for strings and you want to use the same quotes for wrapping the attributes value, you must escape them.
- If you feel it’s easier for you to read a selection without escaped characters, you can mix the quote types.
- Using the selector a[href^="http://"] will result in the following equivalent statements:

```sh
  $("a[href^=\"http://\"]");
  $('a[href^=\'http://\']');
  $("a[href^='http://']");
  $('a[href^="http://"]');
```

- Now we want all the links but those pointing to the jQuery website’s homepage. we can write the following:

    `$("a[href!='http://jquery.com']");`
- This statement, using the “not equal attribute” selector, gives us the expected result.

- Because this selector isn’t part of the CSS specifications, behind the scenes jQuery can’t take advantage of the native querySelectorAll() method, so this results in a slower execution.
- These symbols can’t be combined with other ones to create even more powerful selectors. As example, if you want to select all links but the externals, you can’t write

    `$("a[href!A='http://']");`

- One can use whatever selector you like, and even no other selectors at all, resulting in a selector like [href^='http://' ]. In this case, the use of the Universal selector (*) is implicitly assumed.
- To match a specific attribute value, you use something like:

    `input[type='text']`
This selector matches all input elements with a type of text.

- The “match attribute at beginning” selector in action. As example:

    `div[title^='mypage']`
This selects all div elements with a title attribute whose value begins with mypage.

- What about an “attribute ends with” selector?

   ` a[href$='.pdf']`
This is a useful selector for locating all links that reference PDF files.

- What about an “attribute contains,” for locating elements whose attributes contain arbitrary strings anywhere in the attribute value:

   ` a[href*='jquery.com']`
This selector matches all 'a' elements that reference the jQuery site.

- The “contain prefix.” selects elements with a given attribute’s value equal to a specified string or equal to a specified string followed by a hyphen. If you write:

   ` div[class|='main']`
This selector will find all the <div>s having class="main" or having a class name starting with main-, like class="main-footer".

- If we want to perform a search to find if one of some <span>s, contains the value "javascript" in its data atrribute data-technologies.
- We can achieve this by using the following selector:

   ` span[data-technologies~="javascript"]`
This selects <span>s having an attribute like data-technologies="javascript" but also data-technologies= " jquery javascript Qunit".

- The presented selectors can also be chained in case you need to retrieve nodes that match more criteria.As for example, you can write:

   ` input[type="text"][required]`
This selector retrieves all the <input>s that are required and are of type text.

- Selectors aren’t used only to retrieve elements using the $() function, they’re one of the most used parameters to pass to jQuery’s methods.

**Attribute Selector list:**
1. E[A]     - Matches all elements with tag name E that have attribute A of any value
2. E[A='V'] - Matches all elements with tag name E that have attribute A whose value is exactly V
3. E[A^='V']    - Matches all elements with tag name E that have attribute A whose value starts with V
4. E[A$='V']    - Matches all elements with tag name E that have attribute A whose value ends with V
5. E[A!='V']    - Matches all elements with tag name E that have attribute A whose value doesn’t match V (are not equal to V) or that lack attribute A completely
6. E[A*='V']    - Matches all elements with tag name E that have attribute A whose value contains V
7. E[A|='V']    - Matches all elements with tag name E that have attribute A whose value is equal to V or to V- (V followed by a hyphen)
8. E[A~='V']    - Matches all elements with tag name E that have attribute A whose value is equal to V or contains V delimited by spaces
9. E[C1][C2]    - Matches all elements with tag name E that have attributes that satisfy the criteria C1 and C2

    `$("label input[type *='radio'][checked]")`
This will select the label element then matches all elements with tag name input that have attribute 'radio' whose value contains radio and satisfy the criterion 'checked'

    `$("label input[type *='checkbox'][checked]")`
This will select the label element then matches all elements with tag name input that have attribute 'checkbox' whose value contains checkbox and satisfy the criterion 'checked'

    `$("input[type |='radio'][checked]")`
This matches all elements with tag name input that have attribute 'type' whose value is equal to radio or to radio- (radio followed by a hyphen)

    `input[type='checkbox'][value='1']`
Here selection all the input element having the type of checkbox and the value of 1


## Introducing filters
- Filters are selectors that usually work with other types of selectors to reduce a set of matched elements.
- Filter selectors are  always start with a colon (:).
- One of the peculiarities of these selectors is that some of them accept an argument passed inside the parentheses; for example, p: nth-child(2).

### Position filters
- Sometimes you’ll need to select elements by their position on the page. You might want to select the first or last link on the page or from the third paragraph. For example,

    `a:first`
This format of selector matches the first <a> on the page.

- If you want to retrieve links starting from the third one on the page. To achieve this goal, you can write

   ` a:gt(1)`
- First, we’re using a selector called Greater than (gt) because there isn’t one called Greater than or equal. Also, it accepts an argu-ment (1 in this case) that specifies the index from which to start.

Why do you pass 1 if you want to start from the third element? Shouldn’t it be 2?
- The answer comes from our programming background where indexes usually start at 0. The first element has index 0, the second has index 1, and so on.
- These selectors specific to jQuery provide surprisingly elegant solutions to sometimes tough problems.

1. :first   - Selects the first match within the context. li a:first returns the first anchor that’s a descendant of a list item.
2. :last    - Selects the last match within the context. li a:last returns the last anchor that’s a descendant of a list item.
3. :even    - Selects even elements within the context. li:even returns every even-indexed list item.
4. :odd - Selects odd elements within the context. li:odd returns every odd- indexed list item.
5. :eq(n)   - Selects the nth matching element.
6. :gt(n)   - Selects elements after the nth matching element (the nth element is excluded).
7. :lt(n)   - Selects elements before the nth matching element (the nth element is excluded).

- The first index in a set of elements is always 0.
    - For this reason, the :even selector will counterintuitively(contrary to what common sense would suggest) retrieve the odd-positioned elements because of their even indexes.
    - For this reason, :even will collect the first, third, and so on elements of a set because they have even indexes (0, 2, and so on).

*The takeaway lesson is :even and :odd are related to the index of the elements within the set, not their position.
- You can also pass to :eq(), :gt (), and :lt() a negative index.
- In this case the elements are filtered counting backward from the last element.
    - If you write p:gt(-2), you’re collecting only the last paragraph in the page. Considering that the last paragraph has index -1, the penultimate has index -2, and so on, basically you’re asking for all the paragraphs that come after the penultimate.

### Child filters
- jQuery embraces the CSS selectors and specifications. Thus, we can use the child pseudo-classes introduced in CSS3.
- They allow us to select elements based on their position inside a parent element.

- Let’s say We want to retrieve elements based on their position inside a given element. For example,

    `ul li:last-child`
This selects the last child of parent elements. In this example, the last <li> child of each <ul> element is matched.

- We need to select elements of a type only if they’re the fourth child of a given parent. For example,

    `div p:nth-child(4)`
This retrieves all <p>s inside a <div> that are the fourth child of their parent element.

- The :nth-child() pseudo-class is different from :eq() although they’re often confused.
- Using the :nth-child() pseudo-class, all the children of a containing element are counted, regardless of their type.
- Using the :eq(), only the elements corresponding to the selector attached to the pseudo-class are counted, regardless of how many siblings they have before them.
- Another important difference is that :nth-child() is derived from the CSS specifications; therefore it assumes the index starts from 1 instead of 0.

- Another use case we can think of is “retrieve all the second elements having class description inside a <div>.”
This request is accomplished using the selector

    `div .description:nth-of-type(2)`
**List of Child filters of jQuery**

>:first-child   - Matches the first child element within the context
:last-child - Matches the last child element within the context
:first-of-type  - Matches the first child element of the given type
:last-of-type   - Matches the last child element of the given type

>:nth-child(n)
:nth-child(even|odd)
:nth-child(Xn+Y)    - Matches the nth child element, even or odd child elements, or nth child element computed by the supplied formula within the context based on the given parameter

>:nth-last-child(n)
:nth-last-child(even|odd)
:nth-last-child(Xn+Y)   - Matches the nth child element, even or odd child elements, or nth child element computed by the supplied formula within the context, counting from the last to the first element, based on the given parameter

>:nth-of-type(n)
:nth-of-type(even|odd)
:nth-of-type(Xn+Y)  - Matches the nth child element, even or odd child elements, or nth child element of their parent in relation to siblings with the same element name

>:nth-last-of-type(n)
:nth-last-of-type(even|odd)
:nth-last-of-type(Xn+Y) - Matches the nth child element, even or odd child elements, or nth child element of their parent in relation to siblings with the same element name, counting from the last to the first element

>:only-child    - Matches the elements that have no siblings
:only-of-type   - Matches the elements that have no siblings of the same type

- From the above list it points that :nth-child(), :nth-last-child(), :nth-last-of-type(), and :nth-of-type() accept different types of parameters.
- The parameter can be an index, the word “even,” the word “odd,” or an equation.
- The equation is a formula where you can have an unknown variable as n.
- If you want to target the element at any position that’s a multiple of 3(e.g., 3, 6, 9, and so on), you have to write 3n.
- If you need to select all the elements at a position that’s a multiple of 3 plus 1 (like 1, 4, 7, and so on), you have to write 3n+1.
Let us take a example:

```sh
<table id="languages">
    <thead>
        <tr>
            <th>Language</th>
            <th>Type</th>
            <th>Invented</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Java</td>
            <td>Static</td>
            <td>1995</td>
        </tr>
        <tr>
            <td>Ruby</td>
            <td>Dynamic</td>
            <td>1993</td>
        </tr>
        <tr>
            <td>Smalltalk</td>
            <td>Dynamic</td>
            <td>1972</td>
        </tr>
        <tr>
            <td>C++</td>
            <td>Static</td>
            <td>1983</td>
        </tr>
    </tbody>
</table>
```
- We want to get all of the table cells that contain the names of programming languages.
Because they’re all the first cells in their rows, you could use #languages td:first-child

We could also use #languages td:nth-child(1)

But the first syntax would be considered terse and and more elegant.

- To grab the language type cells, you have to use :nth-child(2),
- To grab the language in year they were invented you’d use :nth-child(3) or :last-child.

- If you wanted  the absolute last table cell (the one containing the text 1983), you’d use the :last pseudo-class , resulting in td:last.

- Now we want to retrieve the name of the languages and their year of creation using :nth-child(). i.e,we want to select the first and the third columns (<td>) from each table row (<tr>) .
- The easier solution is to pass odd as the argument to the filter, resulting in   #languages td:nth-child(odd)

- The second and hard solution by equation where passing a formula to the :nth-child() filter.
Remembering the index for :nth-child() starts at 1, we can turn the previous selector into #languages td:nth-child(2n+1)

## Form filters

- If you want to match all check boxes that are in a checked state. You may try something as the following lines:

    `$('input[type="checkbox"][checked]');`

- But trying to match by attribute will check only the initial state of the control as specified in the HTML markup.
- What we really want to check is the real-time state of the controls.
- CSS offers a pseudo-class, :checked, that matches elements that are in a checked state.
    - For example, whereas the input[type="checkbox" ] selector selects all input elements that are check boxes, the input[type="checkbox"]:checked selector narrows the search to only input elements that are check boxes and are currently checked.
    - When rewriting your previous statement to select all the check boxes that are currently checked using the filter, you can write
    `$('input[type="checkbox"]:checked');`

- The custom :checkbox selector identifies all check box elements. Combining these custom selectors can be powerful and shrink your selectors even more.
    - Consider rewriting once again our example using filters only:
    `$('input:checkbox:checked');`

**The CSS and custom jQuery filter selectors**

1. :button  - Selects only button elements (input[type=submit], input[type=reset],input[type=button], or button)
2. :checkbox    - Selects only check box elements (input[type=checkbox])
3. :checked - Selects check boxes or radio elements in the checked state or options of select elements that are in a selected state
4. :disabled    - Selects only elements in the disabled state
5. :enabled - Selects only elements in the enabled state
6. :file    - Selects only file input elements (input[type=file])
7. :focus   - Selects elements that have the focus at the time the selector is run
8. :image   - Selects only image input elements (input[type=image])
9. :input   - Selects only form elements (input, select, textarea, button)
10. :password   - Selects only password elements (input[type=password])
11. :radio  - Selects only radio elements (input[type=radio])
12. :reset  - Selects only reset buttons (input[type=reset] or button[type=reset])
13. :selected   - Selects only option elements that are in the selected state
14. :submit - Selects only submit buttons (button[type=submit] or input[type=submit])
15. :text   - Selects only text elements (input[type=text]) or input without a type specified (because type=text is the default)


- If you want to select only enabled and checked check boxes, you could use

`$('input:checkbox:checked:enabled');`

## Content filters
-These filters are designed to select elements based on their content. For example, you can choose elements if they contain a given word or if the content is completely empty.
- Note that by content we mean not only raw text but also child elements.
CSS defines a useful selector for selecting elements that are descendants of specific parents. For example, this selector

    `div span`
will select all span elements that are descendants of div elements.

- But what if you wanted the opposite? What if you wanted to select all <div>s that contained span elements?
That’s the job of the :has() filter. Consider this selector

    `div:has(span)`
which selects the div ancestor elements as opposed to the span descendant elements.

- Let’s say that we want to find a table row that contains a particular image element that can be uniquely identified using its src attribute. You might use a selector such as this

    `$('tr:has(img[src="puppy.png"])');`
which would return any table row element containing the identified image anywhere in its descendant hierarchy.

1. :contains(text)  - Selects only elements containing the specified text (the text of the children and the descendants is also evaluated).
2. :empty   - Selects only elements that have no children (including text nodes).
3. :has(selector)   - Selects only elements that contain at least one element that matches the specified selector.
:parent - Selects only elements that have at least one child node (either an element or text).

## Other filters

:visible and :hidden, are categorized in the library’s documentation under Visibility filters
- If you want to negate a selector,you can use the :not() filter. As for example to match any input element that’s not a check box, you could use
    `input:not(:checkbox)`

-   If you want to select all images except those whose src attribute contained the text dog. You might quickly come up with the following selector:
    `$(':not(img[src*="dog"])');`

- If you use this selector, you’d find that not only did you get all the image elements that don’t reference dog in their src, but every element in the DOM that isn’t an image element with such src attribute’s value!

- Remember that when a base selector is omitted, it defaults to the Universal selector.
- Your errant selector actually reads as “fetch all elements that aren’t images that reference ‘dog’ in their src attributes.” - What you intended was “fetch all image elements that don’t reference ‘dog’ in their src attributes,” which would be expressed like this:
    `$('img:not([src*="dog"])');`

- When working with jQuery it’s common to use its methods to hide one or more elements on a page.
- To retrieve these elements you can use the :hidden filter.
- An element is considered hidden not only if it has display: none;applied but also if it doesn’t occupy space. For example, a hidden element is also one that has its width and height set to zero. Using this selector

    `input:hidden`
Here you’re targeting all the input elements of the page that are hidden.

-Starting from jQuery 3, elements will be considered :visible if they have any layout boxes, including those of zero width and/or height. For example, br elements and inline elements with no content will now be selected by the :visible filter.

- When creating web pages, you often use foreign words.
- If you write correct, semantic HTML, you’ll find yourself tagging those words using the em element, adding the lang attribute to specify the language.
- Let’s say that you have a page about pizza; you could have markup like the following:

    `<p>The first pizza was called <em lang="it">Margherita</em>, and it was created in <em lang="it">Napoli</em> (Italy).</p>`
You can select all those foreign words of this example using the :lang() filter in this way:
    `var $foreignWords = $('em:lang(it)');`

**The remaining filters supported by jQuery
1. :animated    - Selects only elements that are currently under animated control
2. :header  - Selects only elements that are headers: 'h1' through 'h6'
3. :hidden  - Selects only elements that are hidden
4. :lang(language)  - Selects elements in a specified language
5. :not(selector)   Negates the specified selector
6. :root    - Selects the element that’s the root of the document
7. :target  - Selects the target element indicated by the fragment identifier of the document’s URI
8. :visible - Selects only elements that are visible

## How to create custom filters

- In jQuery there are two ways to create a custom filter.
    - The first is simpler to write but its use is discouraged because it has been replaced, starting from jQuery 1.8, by the second one.
    - To explain the new way to create a custom filter, we’ll start with an example.
- Pretend you’re developing a tech game where you have a list of levels to complete with a certain grade of difficulty, the number of points the user can earn, and a list of technologies to employ to complete it. Your hypothetical list could resemble this:

```sh
<ul class="levels">
    <li data-level="1" data-points="1" data-technologies="javascript node grunt">Level 1</li>
    <li data-level="2" data-points="10" data-technologies="php composer">Level 2</li>
    <li data-level="3" data-points="100" data-technologies="jquery requirejs">Level 3</li>
    <li data-level="4" data-points="1000" data-technologies="javascript jquery backbone">Level 4</li>
</ul>
```
- Now imagine you often need to retrieve levels (data-level) higher than 2 but only if they allow you to earn more than 100 points (data-points) and have jQuery in the list of the technologies to employ (data-technologies). As for example:
 (li[data-technologies~="jquery"])
- But how do you perform a number comparison using selectors? The truth is you can’t.
- To accomplish this task, you must loop over your initial selection and then retain only the elements you need, as shown here:

```sh
//Initial selection using the attribute selector
var $levels = $('.levels li[data-technologies~="jquery"]');
var matchedLevels = [];
for(var i = 0; i < $levels.length; i++) {
    if ($levels[i].getAttribute('data-level') > 2 &&
    $levels[i].getAttribute('data-points') > 100) {
        matchedLevels.push($levels[i]);
    }
}
```

Instead of repeating these lines every time, you can create a custom filter:

```sh
    //Declare the filter using the createPseudo() function.
    $.expr[':'].requiredLevel = $.expr.createPseudo(function(filterParam) {
        return function(element, context, isXml) {
            return element.getAttribute('data-level') > 2 &&
            element.getAttribute('data-points') > 100;
        };
    });
```

Here, a filter is nothing but a function added to a property called :, which belongs to jQuery’s expr attribute.
- It’s a property called “colon.”
- The expr is a property containing jQuery’s native filters, and you can use it to add your own.

You call your custom filter requiredLevel, and instead of passing the function directly, you use a jQuery utility  called createPseudo().
- To the createPseudo() function, you pass an anonymous function where you declare a parameter called filterParam. The name of the latter, standing for “filter parameter,” is arbitrary and you can

- To the createPseudo() function, you pass an anonymous function where you declare a parameter called filterParam.
    - Inside this anonymous function, you create another anonymous function that will be returned and that’s responsible for performing the filtering.
    - To this inner function, jQuery passes the elements to be processed one at a time (element parameter), the DOMElement or DOMDocument from which selection will occur (context parameter), and a Boolean that specifies if you’re working on an XML document or not (isXML parameter).
- Inside the innermost function, you write the code to test whether the element should be kept or not.
- In this case, you test whether the level is higher than 2 and the points the user can earn are more than 100.

- Imagine you want to retrieve levels based on the offered number of points — something like “select all the levels with a number of points higher than X.”
- That big X is a good opportunity to use a parameter to pass to your pseudo-selector. Based on this requirement, you can create a new filter:
    
    ```sh
    $.expr[':'].pointsHigherThan = $.expr.createPseudo(function(filterParam) {
        var points = parseInt(filterParam, 10);
        return function(element, context, isXml) {
            return element.getAttribute('data-points') > points;
        };
    });
    ```
- Here before declaring the second function, you need to save the argument in a variable called points so it’ll be available in its closure.
- At this point, you can use the given argument through the use of the stored variable.
- If you want to retrieve all the levels that allow you to earn more than 50 points, you can write

    `var $elements = $('.levels li:pointsHigherThan(50)');`
obtaining the last two list items.

##  Enhancing performances using context
- Untill now, we’ve been acting as if there were only one argument that we can pass to jQuery’s $() function.
- we are introduced to a second parameter called context which is  used to restrict the selection to one or more subtrees of the DOM, depending on the selector used.
- This argument is helpful when you have a large number of elements in a page because it can narrow down the subtree(s) where jQuery will perform the second phase of the search.

- When a selector is passed as the first parameter, context defaults to document, applying that selector to every element in the DOM tree.
- That’s often exactly what you want, so it’s a nice default. But there may be times when you want to limit your search to a subset of the entire DOM.
- In such cases, you can identify a subset of the DOM that serves as the root of the subtree to which the selector is applied.

- When a selector or jQuery collection is provided as context, the identified elements serve as the context for the application of the selector. Because there can be multiple such elements, this is a nice way to provide disparate subtrees in the DOM to serve as the context for the selection process.

- We’ll assume that the selector string is stored in a variable conveniently named selector. When you apply this submitted selector, you want to apply it only to the sample DOM, which is contained within a div element with an ID of sample-dom.
If you were to code the call to the jQuery function like this
    `$(selector);`
the selector would be applied to the entire DOM tree, including the form in which the selector was specified.

- What you want is to limit the selection process to the subtree of the DOM rooted at the div element with the ID of sample-dom; so instead you write

    `$(selector, '#sample-dom');`

which limits the application of the selector to the desired portion of the DOM.

- When you use context, jQuery first retrieves elements based on it and then selects the descendants that match the selector provided as the first argument. In other words, you search for elements that match selector that need to have context as their ancestor.

- Therefore, the Descendant selector can be replaced by the use of context. 
- Consider the following selection where you select the all 'p's inside a 'div':
    `$('div p');`

    It can be turned into
    `$('p', 'div');`
    giving the same result.






