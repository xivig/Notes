# Comprehensive Unix & Linux Tutorials & CLI Mastery

> **Interactive Single-Page Guide:** Explore the complete 39-chapter handbook with Dark/Light themes, search, 6 domain tracks, and the Bourne shell Deep Dive Tutorial: [**Linux_Unix_Shell_Developer_Handbook.html**](../../Linux_Unix_Shell_Developer_Handbook.html).  
> **Production Scripts Library:** Browse all 24 battle-tested shell utilities in [**shell-scripts-repo/**](../../shell-scripts-repo/README.md).

A complete instructional guide covering essential terminal commands, filesystem navigation, environment variable architecture, prompt and history customization, Bash shell scripting, text processing, and system operations.

---

## Tutorial Roadmap

### 1. [Terminal & File Management Basics](01-terminal-and-file-basics.md)
* The Unix filesystem hierarchy (`/`, `/bin`, `/etc`, `/home`, `/Users`, `/var`)
* Navigation (`pwd`, `cd`, `ls -la`)
* File & folder manipulation (`mkdir -p`, `touch`, `cp -r`, `mv`, `rm -rf`)
* File permissions and ownership: numeric (`755`, `644`, `600`) vs symbolic (`chmod +x`), `chown`
* I/O streams (`stdin`, `stdout`, `stderr`), redirection (`>`, `>>`, `2>&1`), pipelines (`|`)
* Searching files with `find`: filtering by name, type, size, modification time, and executing actions (`-exec`, `-delete`)

### 2. [Environment Variables Mastery](02-environment-variables-mastery.md)
* Shell (local) variables vs Environment (exported) variables
* Viewing variables (`printenv`, `env`, `set`, `echo $VAR`)
* Setting, exporting, and one-time temporary command assignments
* Process locality and parent-to-child inheritance rules
* Mastering the `$PATH` variable (how the shell resolves executables, appending vs prepending)
* Persistence and startup files: `~/.bashrc`, `~/.bash_profile`, `~/.zshrc`, `/etc/environment`

### 3. [Customizing Shell Prompt & History](03-customizing-bash-prompt-and-history.md)
* Understanding prompt variables: `PS1`, `PS2`, `PS3`, `PS4`
* Prompt escape sequences (`\u`, `\h`, `\w`, `\t`, `\$`)
* Adding ANSI colors and text formatting (and why `\[ ... \]` is mandatory)
* Integrating dynamic Git branch detection into `PS1`
* Shell history management: `HISTSIZE`, `HISTFILESIZE`, `HISTCONTROL=ignoreboth`
* Security and privacy: disabling history, leading space trick, clearing session history

### 4. [Bash Shell Scripting Guide](04-bash-shell-scripting-guide.md)
* Script anatomy: shebang portability (`#!/usr/bin/env bash`), permissions, `set -euo pipefail`
* Quoting rules (single vs double), parameter expansions, command substitution `$(...)`
* Modern arithmetic expansion `$(( a + b ))` vs legacy `expr`
* Positional arguments (`$0`, `$1`, `$#`, `$@`) and interactive input (`read`)
* Conditionals and comparison tests: numbers (`-eq`, `-gt`), strings (`==`, `-z`), file tests (`-f`, `-d`, `-s`)
* Loops: `for` (words, files, C-style, brace expansion), macOS Bash 3.2 compatibility notes, `while`, `until`
* Functions and exit statuses
* Real-world scripts: website scaffolding and batch file distribution

### 5. [Text Processing & Editor Mastery: Awk, Sed, Xargs & Vim](05-text-processing-awk-sed-vim.md)
* `awk` fundamentals: records, fields, built-in variables (`FILENAME`, `NR`, `FNR`, `NF`)
* Printing filename with awk (using `FNR == 1` and `BEGIN { print ARGV[1] }`)
* Stream editing with `sed`: substitutions, line deletions, GNU Linux vs macOS BSD `sed -i ''`
* Batch execution with `xargs` and handling spaces safely with `-print0` / `-0`
* The definitive Vim guide: 4 modes, navigation, editing, search/replace, and how to exit (`:wq`, `:q!`, `:x`, `ZZ`, `ZQ`)

### 6. [Cheat Sheet & Power Tricks](06-unix-linux-cheatsheet-and-tricks.md)
* Readline terminal keyboard shortcuts
* Process and system resource inspection (`top`, `ps aux`, `df -h`, `du -sh`)
* Port inspection and kill one-liners (`lsof -i :PORT`)
* macOS (BSD/Darwin) vs. Linux (GNU/Coreutils) cross-platform comparison
* High-productivity CLI one-liners
