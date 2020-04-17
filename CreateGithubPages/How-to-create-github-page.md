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
