# xivig

![alt text](https://github.com/xivig/xivig/blob/master/src/assets/images/android-icon-72x72.png "Xivig Logo")

## Jekyll configuration

**In Windows**

1. Install Ruby from ruby installer following ruby website
2. check ruby installed or not by the following command:
 ```sh 
 ruby -v 
 ```
3. Start Command Prompt with Ruby from start menu
4. create a directory by the following command
 ```sh 
 md jekyll-project 
 ```
4. goto you project directory using
 ```sh 
 cd jekyll-project 
 ```
5. Run the following commands to install jekyll and bundler:
```sh
 gem install jekyll bundler
 ```
7. check jekyll installed or not by the following command:
   ```sh
    jekyll -v
    ```
8. create a new directory for serving the website by jekyll using following command:
 ```sh
  jekyll new blog
  ```
9. To start the site run the following command:
```sh

 jekyll serve 
 ```
10. Done!

**In MacOS**

1. Ruby is generally installed, so follow the steps from step 4
2. Open the terminal
3. create a directory by the following command
 ```sh
  mkdir jekyll-project 
  ```
4. goto you project directory using
 ```sh
  cd jekyll-project 
  ```
5. Run the following commands to install jekyll and bundler:
```sh
 gem install jekyll bundler
 ```
6. check jekyll installed or not by the following command:
   ```sh
    jekyll -v
    ```
7. create a new directory for serving the website by jekyll using following command:
 ```sh
  jekyll new blog
  ```
8. To start the site run the following command:
```sh
 jekyll serve 
 ```
9. Done!

**In Linux/Ubuntu**

1. Open the terminal
2. Run the following command 
```sh
 sudo apt-get install ruby
 ```
3. check Ruby is installed or not by the following command 
```sh 
   ruby  -v
 ```
4. create a directory by the following command
 ```sh
  mkdir jekyll-project
  ```
5. goto you project directory using
 ```sh
  cd jekyll-project 
  ```
6. Run the following commands to install jekyll and bundler:
```sh
 gem install jekyll bundler
 ```
7.If you get an error like: "Can't install a Ruby package: Failed to build gem native extension"
Follow the steps below:
8. Run the following command
```sh
 sudo apt-get install libmagickwand-dev
 ``` 
 or 
 ```sh 
 sudo apt-install ruby-dev
 ``` 
 following the stackoverflow instruction:
[stackoverflow](https://askubuntu.com/questions/600068/cant-install-a-ruby-package-failed-to-build-gem-native-extension)

Now run: 
```sh
 sudo gem install jekyll
 ``` 
 this time it will be fine

9. check jekyll installed or not by the following command:
   ```sh
    jekyll -v
    ```
10. create a new directory for serving the website by jekyll using following command:
 ```sh
  jekyll new blog
  ```
11. To start the site run the following command:
```sh
 jekyll serve 
 ```
12. Done!

## How to create github page

1. login to your github account
2. create a new Repository named "xivig" as for me
3. Following the link below you wull get your first step [Create Github Pages](https://help.github.com/en/github/working-with-github-pages/creating-a-github-pages-site)
4. open git bash and type the following commands
```sh
git clone https://github.com/xivig/xivig.git
git remote -v
git status 
```
5. Create a new file named index.html as follows: 
```sh 
touch index.html && echo "Welcome to github page" > index.html
 ```
6. create a readme file as follows: `echo "# Xivig" >> README.md`
7. git add all files to staging area as follows:
```sh
git add -A 
git commit -m 'readme.md file edited by xivig'
git push -u origin master 
```
9. Follow this link and you will get a list of all common commands used in git in brief 
[Yisxa Github command list page](https://github.com/yisxa/git-essential-command)
10.git creating a branch
`git branch branch_name`
11. git switching branch
`git checkout branch_name`
or single step for creating branch and checkout
`git checkout -b branch_name`
12. create a branch of your repo for github page by the following:
` git checkout -b gh-pages` # here name matters
13. Now run the following commands for push master repository from the command line and copying the source files to the branch
```sh
git push origin gh-pages

```
14. Now type the following address to the browser
` https://xivig.github.io/xivig/`
15. Now will see a living breathing website hosted on github
16.Done!

## writing and formatting on GitHub
GitHub combines a syntax for formatting text called GitHub Flavored Markdown with a few unique writing features.

*Markdown is an easy-to-read, easy-to-write syntax for formatting plain text.*

### Basic writing and formatting syntax

1. Headers
# H1
## H2
### H3
#### H4
##### H5
###### H6

2. Emphasis:
Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

3. Lists

1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
2. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses

5. links:

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or <http://www.example.com> and sometimes 
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

6. Here's our logo (hover to see the title text):

Inline-style: 
![alt text](https://github.com/xivig/xivig/blob/master/src/assets/images/favicon-32x32.png "Logo Title Text 1")

7. nline `code` has `back-ticks around` it.

8. Blocks of code are either fenced by lines with three back-ticks ```, or are indented with four spaces. I recommend only using the fenced code blocks -- they're easier and only they support syntax highlighting.

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```
 
```python
s = "Python syntax highlighting"
print s
```
 
```
No language indicated, so no syntax highlighting. 
But let's throw in a <b>tag</b>.
```
var s = "JavaScript syntax highlighting";
alert(s);
s = "Python syntax highlighting"
print s
No language indicated, so no syntax highlighting in Markdown Here (varies on Github). 
But let's throw in a <b>tag</b>.



9. Horizontal Rule
Three or more...

---

Hyphens

***

Asterisks

___

Underscores
Three or more...

Hyphens

Asterisks

Underscores


10. Task lists
To create a task list, preface list items with a regular space character followed by [ ]. To mark a task as complete, use [x].

- [x] Finish my changes
- [ ] Push my commits to GitHub
- [ ] Open a pull request
Rendered task list

If a task list item description begins with a parenthesis, you'll need to escape it with \:

- [ ] \(Optional) Open a followup issue

11. Mentioning people and teams
You can mention a person or team on GitHub by typing @ plus their username or team name. This will trigger a notification and bring their attention to the conversation. People will also receive a notification if you edit a comment to mention their username or team name.

@github/support What do you think about these updates?

Rendered @mention

When you mention a parent team, members of its child teams also receive notifications, simplifying communication with multiple groups of people. For more information, see "About teams."

Typing an @ symbol will bring up a list of people or teams on a project. The list filters as you type, so once you find the name of the person or team you are looking for, you can use the arrow keys to select it and press either tab or enter to complete the name. For teams, enter the @organization/team-name and all members of that team will get subscribed to the conversation.

The autocomplete results are restricted to repository collaborators and any other participants on the thread.

12. Using emoji
You can add emoji to your writing by typing :EMOJICODE:.

@octocat :+1: This PR looks great - it's ready to merge! :shipit:

Rendered emoji

Typing : will bring up a list of suggested emoji. The list will filter as you type, so once you find the emoji you're looking for, press Tab or Enter to complete the highlighted result.

For a full list of available emoji and codes, check out emoji-cheat-sheet.com.

13. Paragraphs
You can create a new paragraph by leaving a blank line between lines of text.

14. Ignoring Markdown formatting
You can tell GitHub to ignore (or escape) Markdown formatting by using \ before the Markdown character.

Let's rename \*our-new-project\* to \*our-old-project\*.

Rendered escaped character


15. Tables
Tables aren't part of the core Markdown spec, but they are part of GFM and Markdown Here supports them. They are an easy way of adding tables to your email -- a task that would otherwise require copy-pasting from another application.

Colons can be used to align columns.

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the 
raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| *Still*  | `renders` | **nicely** |
| 1        | 2         | 3          |
Colons can be used to align columns.

Tables	Are	Cool
col 3 is	right-aligned	$1600
col 2 is	centered	$12
zebra stripes	are neat	$1
There must be at least 3 dashes separating each header cell. The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

Markdown	Less	Pretty
Still	renders	nicely
1	2	3

| table | Name |
| ----- | ---- |
| 1     | 2    |
