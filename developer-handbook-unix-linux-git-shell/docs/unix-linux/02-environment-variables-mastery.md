# Environment Variables Mastery in Unix & Linux

A definitive guide to understanding shell variables, environment variables, process inheritance, configuring `$PATH`, and ensuring persistent settings across sessions.

---

## 1. What Are Environment Variables?

An **Environment Variable** is a dynamically named value stored within the operating system that affects how running processes and programs behave in their environment.

Environment variables act as central configuration placeholders for:
* Where programs look for executables (`$PATH`)
* The current logged-in user (`$USER` or `$LOGNAME`)
* The user's home folder location (`$HOME`)
* The active shell (`$SHELL`)
* Default terminal editor (`$EDITOR`)
* System localization, language, and character encoding (`$LANG`, `$LC_ALL`)

---

## 2. Shell Variables vs. Environment Variables

| Property | Shell (Local) Variable | Environment (Exported) Variable |
|---|---|---|
| **Scope** | Available **only** in the current shell session | Inherited by child processes, commands, and subshells |
| **Creation** | `GREETING="Hello"` | `export GREETING="Hello"` |
| **Inheritance** | Not passed to launched scripts or child processes | Passed automatically to child processes |
| **Visibility** | Seen by `set` | Seen by `env`, `printenv`, and `set` |

---

## 3. Inspecting Variables

```bash
# Print all exported environment variables
printenv

# Alternatively:
env

# Print the value of a specific variable
printenv HOME
echo "$USER"
echo "$PATH"

# Display all variables (both local shell variables and exported environment variables)
set

# Search for a specific variable using grep
printenv | grep -i "user"
```

---

## 4. Setting, Exporting, and Unsetting Variables

### 4.1 Creating a Local Shell Variable
```bash
DATABASE_NAME="production_db"
echo "$DATABASE_NAME"  # outputs: production_db
```
If you launch a subshell or a bash script, `$DATABASE_NAME` will be empty because it was not exported.

### 4.2 Exporting an Environment Variable
Use `export` to make the variable available to child processes:

```bash
# Define and export in a single command
export API_KEY="xyz123secret"

# Or export an existing local variable
PORT=8080
export PORT
```

### 4.3 One-Time Command Assignment (Temporary Inheritance)
You can assign an environment variable strictly for a single command invocation without modifying your current shell session:

```bash
# PORT is only visible during node server.js execution
PORT=4000 node server.js

# Check in current shell:
echo "$PORT"  # Empty (or previous value)
```

### 4.4 Erasing Variables: `unset`
Remove a variable from the shell memory:
```bash
unset API_KEY
```

---

## 5. Process Locality & The Rule of Inheritance

Every time you type a command or execute a script like `./deploy.sh`, Linux forks a **child process**.

```
[ Parent Process: Interactive Terminal ]
      |
      |-- exports: PATH, USER, API_KEY
      v
[ Child Process: ./script.sh ]  <-- Reads parent's exported variables
      |
      |-- Sets: LOCAL_VAR="secret"
      v (Child exits)
[ Return to Parent ]            <-- Parent has NO access to LOCAL_VAR!
```

### Key Rules:
1. **Child processes inherit copies:** Modifying an inherited variable inside a child process modifies only that child's private copy.
2. **Children cannot write to parent:** A child process cannot set, modify, or unset environment variables in its parent shell.

### Executing in the Current Shell: `source`
If you want a script to set environment variables that remain active in your current terminal, **source** it instead of running it as a separate process:

```bash
# These two commands are identical:
source ./setenv.sh
. ./setenv.sh
```

---

## 6. Mastering the `$PATH` Variable

### 6.1 How `$PATH` Works
When you type a command (like `git` or `python`), the shell does not search your entire hard drive. Instead, it looks in the directories listed in your `$PATH` variable in sequential order from left to right.

View your current `$PATH` formatted one directory per line:
```bash
tr ':' '\n' <<< "$PATH"
```
Example output:
```text
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/sbin
```

### 6.2 Adding a Directory to `$PATH`

#### Appending to `$PATH` (Search system tools first)
```bash
export PATH="$PATH:/home/john/custom-scripts"
```

#### Prepending to `$PATH` (Override system tools with custom versions)
```bash
export PATH="/home/john/.local/bin:$PATH"
```

> [!CAUTION]
> Always include `$PATH` in the assignment (`$PATH:...` or `...:$PATH`). If you run `export PATH="/custom/bin"` without `$PATH`, standard system binaries like `ls`, `cat`, and `cp` will no longer resolve!

---

## 7. Making Environment Variables Persistent

Variables defined in a live terminal are lost when that terminal window is closed. To make them permanent, define them in the appropriate startup configuration file.

### 7.1 Shell Startup File Loading Hierarchy

#### Interactive Login Shell (SSH session, virtual console, or macOS Terminal):
1. `/etc/profile` (System-wide)
2. `~/.bash_profile` or `~/.bash_login` or `~/.profile` (First found in user home)
3. On macOS using Zsh: `/etc/zshenv` -> `~/.zshenv` -> `~/.zprofile` -> `~/.zshrc` -> `~/.zlogin`

#### Interactive Non-Login Shell (Opening a new tab in Linux desktop terminal):
1. `/etc/bash.bashrc` (System-wide)
2. `~/.bashrc` (User-specific)

### 7.2 Where to Place Your Custom Variables

#### For Linux (Ubuntu, Debian, Fedora, CentOS):
Add your exports to `~/.bashrc`:
```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
echo 'export EDITOR="vim"' >> ~/.bashrc
```

#### For macOS (Catalina and newer use Zsh):
Add your exports to `~/.zshrc`:
```zsh
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
echo 'export PATH="$HOME/scripts:$PATH"' >> ~/.zshrc
```

#### System-Wide Environment (All Users on Linux):
Edit `/etc/environment` (format is plain `KEY="VALUE"` without `export`):
```text
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
```

### 7.3 Applying Changes Without Restarting
Reload the configuration file immediately into your current active session:

```bash
# On Linux Bash:
source ~/.bashrc

# On macOS Zsh:
source ~/.zshrc
```
