## Vagrant Getting Started



**1.Install Vagrant from [Vagrant](https://www.vagrantup.com/downloads.html)**

**2.Install Virtualbox from [Virtualbox](https://www.virtualbox.org/wiki/Downloads)**

**For New virtualbox add the following line**

`config.vm.box = "envimation/ubuntu-xenial-docker"`

The name is is from the vagrantbox.es as follows:
`envimation/ubuntu-xenial-docker  VirtualBox  
https://atlas.hashicorp.com/envimation/boxes/ubuntu-xenial-docker`



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

## Vagrantfile configuration sample:

```sh

# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "hashicorp/precise64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
   config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
    vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
    vb.memory = "1024"
    end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Ansible, Chef, Docker, Puppet and Salt are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # config.vm.provision "shell", inline: <<-SHELL
  #   apt-get update
  #   apt-get install -y apache2
  # SHELL
end

```

**If you got an error like 'Vagrant - OpenSSL SSL_read: SSL_ERROR_SYSCALL, errno 54' , The fix is here:

`vagrant box add envimation/ubuntu-xenial-docker -c --insecure`


"Options used:

    -c or --clean Clean any temporary download files
    --insecure Do not validate SSL certificates

"

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

Go to this web site and get the virtual machine for vagrant from [Vagrantbox](<http://www.vagrantbox.es/>)

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
