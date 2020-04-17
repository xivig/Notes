## Vagrant Getting Started

1.  Create a directory named vagrant-project under current directory
    named projects by the following command:

    `$ mkdir -p projects/vagrant-project && cd projects/vagrant-project/`

2.  To initialize the current directory with git run the following
    command:

    `$ git init .`

3.  Now check the content of the current directory:

    `$ ls -- la`

4.  To check the status of git run the following:

    `$ git status`

5.  `$ vagrant version`

6.  `$ vagrant status`

## Up and Running

1.  `$ vagrant init hashicorp/precise64`
2.  `$ atom Vagrantfile`

3.  `$ vagrant up`

4.  `$ vagrant ssh`

5.  `$ cd /vagrant/`

6.  `$ touch abc.txt`

7.  `$ ls`

8.  `$ rm abc.txt`

9.  `$ ls`

10. `$ exit`

11. `$ vagrant suspend // this will put the virtual` machine in sleep

12. `$ vagrant up // this will put the virtual` machine back to normal
    state

13. `$ vagrant halt // this will shut down the` virtual machine

14. `$ vagrant up // this will put the virtual` machine back to normal
    state

15. `$vagrant destroy`

16. `$ vagrant status`

17. `$ vagrant up`

18. `$vagrant reload // this will do halt and up` command simultaneously

19. Create a new file named .gitignore

20. Write in the file .vagrant to ignore the file and escaping the from
    statging.

21. `$ git commit -m "to ignore the .vagrant file"`

22. `$ git add .`

23. `$ git status`

**Getting external vagrant virtual image**

Go to this web site and get the virtual machine for vagrant

<http://www.vagrantbox.es/>

### Adding new virtual machine:

**OpenBSD 5.5 64-bit + Chef 11.16.0 + Puppet 3.4.2**

`$ vagrant box add openbsd55
<https://github.com/jose-lpa/veewee-openbsd/releases/download/v0.5.5/openbsd55.box>`

**Packaging local VM**

`$ vagrant package --output openbsd.box`

`$ vagrant box add OpenBSD openbsd.box`

`$vagrant status`

`$ vagrant box list`

`$atom Vagrantfile`

Add the following lines:

```
config.vm.box = "OpenBSD"

config.vm.synced_folder ".", "/vagrant", type: "rsync"
```

**To remove a folder run the following command**

`$ rm -rf \[name of the folder]`

Create a file and folder by

`$ mkdir cool && touch abc.txt`

Now remove the file and folder by

`$ rm abc.txt && rm -rf cool`
