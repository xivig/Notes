# Customizing the Shell Prompt & History Management

How to design colorful, informative Bash/Zsh prompts with Git branch indicators, and manage shell history privacy, limits, and security.

---

## 1. Understanding Prompt Variables

The Bash shell uses four special variables to control command prompt appearance:

* **`PS1` (Primary Prompt):** The default prompt displayed when the shell is waiting for a command (e.g. `user@host:~$ `).
* **`PS2` (Secondary Prompt):** Displayed when a command spans multiple lines (default is `> `).
* **`PS3` (Selection Prompt):** Displayed when running interactive `select` menu loops in shell scripts.
* **`PS4` (Execution Trace Prompt):** Displayed during script execution debugging when `set -x` is enabled (default is `+ `).

Check your current `PS1` setting:
```bash
echo "$PS1"
```

---

## 2. Common Prompt Escape Sequences

You can inject dynamic system information into `PS1` using backslash escape sequences:

| Sequence | Description | Example Output |
|---|---|---|
| `\u` | Current logged-in username | `alice` |
| `\h` | Hostname up to the first dot | `server01` |
| `\H` | Complete fully-qualified hostname | `server01.example.com` |
| `\w` | Full current working directory (`~` for home) | `~/projects/web` |
| `\W` | Basename of current working directory | `web` |
| `\d` | Date in "Weekday Month Date" format | `Sun Nov 08` |
| `\t` | Current time in 24-hour `HH:MM:SS` format | `14:32:05` |
| `\@` | Current time in 12-hour AM/PM format | `02:32 PM` |
| `\$` | Displays `#` if user is root (UID 0), else `$` | `$` |
| `\n` | Inserts a newline (creates multi-line prompts) | Line break |
| `\!` | History number of this command | `102` |

---

## 3. Adding Colors & Text Styling to Prompts

ANSI color escape codes format text in the terminal.

> [!IMPORTANT]
> Always wrap non-printing ANSI color codes inside `\[ ... \]` in Bash!
> If you omit `\[` and `\]`, Bash miscalculates the visual width of the prompt, causing long commands to wrap erratically over the same line.

### Color Table

```bash
# Reset / Turn off all attributes
Reset="\[\033[0m\]"

# Regular Foreground Colors
Black="\[\033[0;30m\]"
Red="\[\033[0;31m\]"
Green="\[\033[0;32m\]"
Yellow="\[\033[0;33m\]"
Blue="\[\033[0;34m\]"
Purple="\[\033[0;35m\]"
Cyan="\[\033[0;36m\]"
White="\[\033[0;37m\]"

# Bold Foreground Colors
Bold_Red="\[\033[1;31m\]"
Bold_Green="\[\033[1;32m\]"
Bold_Yellow="\[\033[1;33m\]"
Bold_Blue="\[\033[1;34m\]"
Bold_Purple="\[\033[1;35m\]"
Bold_Cyan="\[\033[1;36m\]"
Bold_White="\[\033[1;37m\]"
```

### 3.1 Ready-to-Use Prompt Recipes

#### Recipe 1: Clean Developer Prompt
Displays `user@hostname` in green, current folder in blue, followed by `$`:
```bash
export PS1="\[\033[1;32m\]\u@\h\[\033[0m\]:\[\033[1;34m\]\w\[\033[0m\]\$ "
```

#### Recipe 2: Two-Line Power Prompt
Separates path information from typing space:
```bash
export PS1="\[\033[1;36m\][\t] \[\033[1;32m\]\u\[\033[0m\]@\[\033[1;33m\]\h \[\033[1;34m\]\w\[\033[0m\]\n\[\033[1;35m\]\$\[\033[0m\] "
```

#### Recipe 3: Dynamic Git Branch in Prompt
Add this helper function to your `~/.bashrc`:

```bash
parse_git_branch() {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}

export PS1="\[\033[1;32m\]\u@\h\[\033[0m\]:\[\033[1;34m\]\w\[\033[1;35m\]\$(parse_git_branch)\[\033[0m\]\$ "
```
When you enter a Git repository, the active branch name appears automatically in purple.

---

## 4. Shell History Management & Security

The Bash shell logs typed commands into memory and writes them to `~/.bash_history` upon session termination.

### 4.1 Viewing and Searching History
```bash
# View complete history
history

# View the last 15 commands
history 15

# Search history using grep
history | grep "git clone"

# Interactive reverse history search (press Ctrl + R in terminal)
(reverse-i-search)`': <type keyword to search>
```

### 4.2 History Execution Shortcuts
* `!!` : Re-run the immediately preceding command.
* `sudo !!` : Re-run the previous command with `sudo` privileges.
* `!125` : Re-run command line #125 from `history`.
* `!$` : The last argument of the previous command (e.g., `mkdir test` followed by `cd !$`).

### 4.3 Customizing History Configuration in `~/.bashrc`
Add these lines to your `~/.bashrc` to maximize utility:

```bash
# Number of commands stored in memory
HISTSIZE=10000

# Number of commands stored on disk in ~/.bash_history
HISTFILESIZE=20000

# Ignore duplicate commands and commands starting with a space
HISTCONTROL=ignoreboth

# Ignore specific trivial commands from history
HISTIGNORE="ls:ps:history:pwd:exit:clear"

# Record timestamp for every command
HISTTIMEFORMAT="%F %T "

# Append to history file immediately rather than overwriting on exit
shopt -s histappend
```

---

## 5. Security: Disabling History & Preventing Sensitive Leaks

When entering passwords, API tokens, or SSH keys, you should prevent commands from being logged to disk.

### 5.1 The Leading Space Trick
If `HISTCONTROL=ignoreboth` or `HISTCONTROL=ignorespace` is configured, simply **type a space before your command**:

```bash
# This command is executed, but NOT recorded in history:
 export STRIPE_SECRET_KEY="sk_live_123456789"
```

### 5.2 Disabling History for Current Session
```bash
# Temporarily disable command history recording
set +o history

# To re-enable later:
set -o history
```

### 5.3 Forcing the Shell to Forget History on Logout
```bash
# Unset the history file location so nothing writes to disk:
unset HISTFILE

# Or set size to 0:
export HISTSIZE=0
export HISTFILESIZE=0
```

### 5.4 Purging Existing History
```bash
# Clear current in-memory history list
history -c

# Overwrite the ~/.bash_history file with the empty list
history -w
```
