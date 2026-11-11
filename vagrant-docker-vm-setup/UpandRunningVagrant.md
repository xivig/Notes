# Up and Running with Vagrant — Step-by-Step

A quick reference walkthrough for creating, configuring, and connecting to your first Vagrant development machine.

---

## 1. Project Initialization

Create a project directory and initialize the `Vagrantfile`:

```bash
mkdir -p vagrant_getting_started
cd vagrant_getting_started

# Initialize a modern Ubuntu 22.04 LTS box
vagrant init ubuntu/jammy64
```

---

## 2. Configuring the Box

Open `Vagrantfile` in your editor. A clean configuration looks like:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  # Optional: Lock to a specific version release
  # config.vm.box_version = ">= 20240101.0.0"

  # Optional: Download URL if using an internal corporate registry
  # config.vm.box_url = "https://app.vagrantup.com/ubuntu/boxes/jammy64"
end
```

---

## 3. Booting & Connecting via SSH

```bash
# Boot the VM (downloads box from Vagrant Cloud if not cached locally)
vagrant up

# Connect interactively to the VM
vagrant ssh
```

Once connected, you will be in the `/home/vagrant` directory of the Linux guest. The host project folder is automatically mounted inside the VM at `/vagrant`.

```bash
# Verify shared folder
ls -la /vagrant
```

To exit the guest shell, type `exit`.

---

## 4. Lifecycle Operations

```bash
# Temporarily pause the VM to save host CPU and battery
vagrant suspend

# Resume the VM from suspended state
vagrant resume

# Gracefully shut down the VM
vagrant halt

# Restart the VM
vagrant reload

# Completely remove the VM from disk
vagrant destroy -f
```
