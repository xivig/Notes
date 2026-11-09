# The Meaning and Origin of "rc" in Unix & Linux Files

Ever wondered why so many developer configuration files end with **`rc`** (such as `.bashrc`, `.zshrc`, `.vimrc`, `.npmrc`, `.wgetrc`, or `/etc/rc.d`)?

---

## 1. What Does "rc" Stand For?

> **`rc`** stands for **"Run Commands"** (historically abbreviated from **"runcom"**).

### Historical Origin
The term originated in the **MIT CTSS (Compatible Time-Sharing System)** around **1965**. 

As Unix co-creators Brian Kernighan and Dennis Ritchie recounted:
> *"There was a facility that would execute a bunch of commands stored in a file; it was called 'runcom' for 'run commands', and the file began to be called 'a runcom'. 'rc' in Unix is a linguistic fossil from that usage."*

Tom Van Vleck, a CTSS programmer, also documented:
> *"The idea of having the command script processor directed by a file was coined 'runcom', and files containing sequences of commands were named with a .rc suffix."*

---

## 2. Common "rc" Files in Everyday Development

| Configuration File | Tool / Environment | Purpose |
|---|---|---|
| **`.bashrc`** | GNU Bash Shell | Executed for interactive non-login bash shells; sets aliases, functions, prompt (`PS1`). |
| **`.zshrc`** | Zsh Shell | Primary configuration file for Zsh and Oh My Zsh. |
| **`.vimrc`** | Vim Text Editor | Editor configurations (syntax highlighting, line numbers, plugins, keymaps). |
| **`.npmrc`** | Node Package Manager | npm registries, auth tokens, package scope settings, and lockfile preferences. |
| **`.yarnrc.yml`** | Yarn Package Manager | Modern Yarn 4+ configuration file. |
| **`.inputrc`** | GNU Readline | Keyboard shortcuts and terminal completion behavior across shells and CLI tools. |
| **`.curlrc` / `.wgetrc`** | cURL / Wget | Default headers, proxy settings, user-agents, and timeout values. |
| **`/etc/rc.d` / `/etc/rc.local`**| System V Init / Linux | Historical system startup runlevel scripts. |

---

## 3. Why the Leading Dot (`.`)?

In Unix and Linux operating systems, files starting with a dot (e.g. `.bashrc`) are **hidden files**. Standard `ls` hides them to avoid cluttering your home directory, visible only when passing the `-a` (all) flag:

```bash
ls -la ~
```

---

## 4. Shell Execution Order: `.bash_profile` vs `.bashrc`

* **Login Shell** (e.g. SSH login, terminal login on macOS):
  * Reads `~/.bash_profile` or `~/.zprofile`.
  * Best for global environment variables (`PATH`, `JAVA_HOME`).
* **Non-Login Interactive Shell** (e.g. opening a new tab in terminal):
  * Reads `~/.bashrc` or `~/.zshrc`.
  * Best for aliases, prompt styling, and custom shell functions.
