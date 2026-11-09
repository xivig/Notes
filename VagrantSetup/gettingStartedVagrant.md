# Vagrant Getting Started & Modern Developer Guide

> **Vagrant** is an open-source tool by HashiCorp for building and maintaining portable, reproducible virtual software development environments using providers like VirtualBox, VMware, Hyper-V, and Docker.

---

## Table of Contents

1. [Prerequisites & Installation](#1-prerequisites--installation)
2. [Finding Modern Base Boxes](#2-finding-modern-base-boxes)
3. [Quick Start: Up and Running in 3 Minutes](#3-quick-start-up-and-running-in-3-minutes)
4. [Modern `Vagrantfile` Configuration](#4-modern-vagrantfile-configuration)
5. [Port Forwarding & Synced Folders](#5-port-forwarding--synced-folders)
6. [Shell Provisioning (Automated Setup)](#6-shell-provisioning-automated-setup)
7. [Essential Vagrant CLI Commands](#7-essential-vagrant-cli-commands)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Prerequisites & Installation

To run virtual machines via Vagrant, install both **Vagrant** and a virtualization hypervisor (such as **VirtualBox**):

1. **Install VirtualBox**:
   Download the latest version from [virtualbox.org](https://www.virtualbox.org/wiki/Downloads) (or via Homebrew on macOS: `brew install --cask virtualbox`).
2. **Install Vagrant**:
   Download from [developer.hashicorp.com/vagrant/install](https://developer.hashicorp.com/vagrant/install) (or via Homebrew: `brew install hashicorp/tap/hashicorp-vagrant`).
3. **Verify installation**:
   ```bash
   vagrant --version
   # Example: Vagrant 2.4.x
   ```

---

## 2. Finding Modern Base Boxes

Browse official base boxes on **Vagrant Cloud**: [app.vagrantup.com/boxes/search](https://app.vagrantup.com/boxes/search).

### Recommended Modern Linux Distributions

| Distribution | Architecture | Box Name on Vagrant Cloud |
|---|---|---|
| **Ubuntu 24.04 LTS (Noble Numbat)** | 64-bit AMD/Intel | `ubuntu/noble64` |
| **Ubuntu 22.04 LTS (Jammy Jellyfish)**| 64-bit AMD/Intel | `ubuntu/jammy64` |
| **Debian 12 (Bookworm)** | 64-bit AMD/Intel | `debian/bookworm64` |
| **Rocky Linux 9 (RHEL-compatible)** | 64-bit AMD/Intel | `rockylinux/9` |
| **Alpine Linux 3.19 (Minimal)** | 64-bit AMD/Intel | `generic/alpine319` |

*(Avoid legacy boxes like `precise64` (Ubuntu 12.04) or `xenial64` (Ubuntu 16.04) which have reached official End-of-Life).*

---

## 3. Quick Start: Up and Running in 3 Minutes

```bash
# 1. Create a dedicated project directory
mkdir -p dev-workspace && cd dev-workspace

# 2. Initialize a modern Ubuntu 22.04 LTS box
vagrant init ubuntu/jammy64

# 3. Boot and configure the virtual machine
vagrant up

# 4. Connect to the machine via SSH
vagrant ssh

# Inside the VM:
uname -a
lsb_release -a
exit

# 5. Shut down the machine cleanly when finished
vagrant halt
```

---

## 4. Modern `Vagrantfile` Configuration

Create or modify `Vagrantfile` in your project root:

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  # Base operating system
  config.vm.box = "ubuntu/jammy64"

  # Automatic box update check
  config.vm.box_check_update = true

  # VM Hostname
  config.vm.hostname = "dev-box.local"

  # Port Forwarding (Guest port -> Host port)
  # Access guest web server on host via http://localhost:8080
  config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"
  # Forward MySQL/PostgreSQL
  config.vm.network "forwarded_port", guest: 3306, host: 33060, host_ip: "127.0.0.1"

  # Private Network (Fixed internal IP)
  config.vm.network "private_network", ip: "192.168.56.10"

  # Shared/Synced Folder (Host folder -> Guest folder)
  config.vm.synced_folder ".", "/var/www/html",
    owner: "vagrant",
    group: "vagrant",
    create: true

  # VirtualBox Provider Resource Allocations
  config.vm.provider "virtualbox" do |vb|
    vb.name = "ubuntu-jammy-dev"
    vb.memory = 2048  # 2 GB RAM
    vb.cpus = 2        # 2 CPU Cores
    vb.linked_clone = true # Saves disk space and accelerates provisioning
  end

  # Automated Shell Provisioning
  config.vm.provision "shell", inline: <<-SHELL
    set -e
    echo "Updating package lists..."
    apt-get update -y
    apt-get install -y git curl wget unzip htop nginx

    # Install Docker Engine
    curl -fsSL https://get.docker.com | sh
    usermod -aG docker vagrant

    echo "Dev environment ready! Visit http://localhost:8080"
  SHELL
end
```

---

## 5. Port Forwarding & Synced Folders

* **Port Forwarding**: Maps network ports between host and guest. Always bind to `127.0.0.1` (`host_ip: "127.0.0.1"`) to avoid inadvertently exposing dev ports to your local network.
* **Synced Folders**: Edits made in your favorite host editor (VS Code, Sublime Text) immediately appear inside the guest virtual machine at the mount path (e.g. `/var/www/html`).

---

## 6. Shell Provisioning (Automated Setup)

Instead of manually installing software every time a VM is created, use external provisioning scripts:

```ruby
config.vm.provision "shell", path: "provision/setup.sh"
```

In `provision/setup.sh`:
```bash
#!/usr/bin/env bash
set -Eeuo pipefail

apt-get update -y
apt-get install -y nodejs npm php-cli git
```

Run provisioning at any time on an active VM:
```bash
vagrant provision
# or restart and provision in one command:
vagrant reload --provision
```

---

## 7. Essential Vagrant CLI Commands

| Command | Action |
|---|---|
| `vagrant init [box]` | Creates an initial `Vagrantfile` in current directory |
| `vagrant up` | Boots the virtual machine (downloads box on first run) |
| `vagrant ssh` | Opens a secure interactive shell inside the guest machine |
| `vagrant halt` | Gracefully powers down the virtual machine |
| `vagrant reload` | Restarts the VM (applies network/Vagrantfile changes) |
| `vagrant reload --provision` | Restarts and forces provisioning scripts to re-run |
| `vagrant suspend` | Pauses the VM in memory (fast resume via `vagrant up`) |
| `vagrant resume` | Resumes a suspended virtual machine |
| `vagrant status` | Displays the current running state of the VM |
| `vagrant destroy -f` | Deletes the VM and reclaims all host disk space |
| `vagrant snapshot save [name]`| Creates a named restore point snapshot |
| `vagrant snapshot restore [name]`| Rolls back the VM to the snapshot state |

---

## 8. Troubleshooting

### VT-x / AMD-V Hardware Virtualization Disabled
* **Symptom**: `VT-x is not available (VERR_VMX_NO_VMX)`.
* **Fix**: Enable Hardware Virtualization (Intel VT-x or AMD SVM) in your computer's BIOS/UEFI firmware settings.

### VirtualBox Guest Additions Mismatch
* **Fix**: Install the `vagrant-vbguest` plugin to automatically install matching guest additions:
  ```bash
  vagrant plugin install vagrant-vbguest
  ```
