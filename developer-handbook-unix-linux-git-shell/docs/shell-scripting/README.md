# The Rigorous All-in-One Shell Scripting Handbook

A progressive, production-grade master guide to shell scripting. Written for every software engineer, DevOps practitioner, and system administrator who wants to transition from copy-pasting terminal commands to engineering bulletproof, maintainable automation software.

> **Interactive Companion Handbooks & Scripts Catalog:**
> - [Linux, Unix & Shell Developer Handbook (39 Chapters)](../../Linux_Unix_Shell_Developer_Handbook.html)
> - [Git & GitHub Complete Tutorial Handbook (22 Chapters)](../../Git_GitHub_Complete_Tutorial.html)
> - [Production Shell Scripts Repository (24 Shell Scripts)](../../shell-scripts-repo/README.md)
> - [Full Interactive Documentation Portal](../../documentation/index.html)

---

## Table of Contents

1. [Step 1: The Foundations & Execution Model](#step-1-the-foundations--execution-model)
2. [Step 2: Defensive Shell Scripting (The Strict Mode)](#step-2-defensive-shell-scripting-the-strict-mode)
3. [Step 3: Variables, Types & Parameter Expansions](#step-3-variables-types--parameter-expansions)
4. [Step 4: Special Variables & CLI Argument Handling](#step-4-special-variables--cli-argument-handling)
5. [Step 5: Conditionals, Modern Tests & Pattern Matching](#step-5-conditionals-modern-tests--pattern-matching)
6. [Step 6: Loops, Streams & Iteration Mechanics](#step-6-loops-streams--iteration-mechanics)
7. [Step 7: I/O, Redirection, Heredocs & Process Substitution](#step-7-io-redirection-heredocs--process-substitution)
8. [Step 8: Modular Functions, Scope & Structured Logging](#step-8-modular-functions-scope--structured-logging)
9. [Step 9: Signals, Traps & Atomic Resource Cleanup](#step-9-signals-traps--atomic-resource-cleanup)
10. [Step 10: Arrays & Associative Arrays (Dictionaries)](#step-10-arrays--associative-arrays-dictionaries)
11. [Step 11: Production Architectures & Real-World Scripts](#step-11-production-architectures--real-world-scripts)
12. [Step 12: The 15 Anti-Patterns & ShellCheck Checklist](#step-12-the-15-anti-patterns--shellcheck-checklist)

---

## Step 1: The Foundations & Execution Model

### 1.1 What Happens When a Script Executes?
When you type `./backup.sh` in your terminal:
1. The operating system kernel performs the `execve()` system call.
2. The kernel examines the first two bytes of the file looking for the magic number `0x23 0x21` (`#!`, known as the **shebang**).
3. The kernel invokes the interpreter path specified after the shebang and passes the script file path as its first argument.
4. A new **child process** is created (forked). Changes to environment variables inside the script do not leak into the parent terminal session.

```
[ Interactive Terminal: PID 1001 ]
      |
      |-- Forks new process & calls execve()
      v
[ /usr/bin/env bash ./backup.sh: PID 2045 ]
      |
      |-- Executes line by line in subshell
      v (Exits with status code 0-255)
[ Control returns to PID 1001 ($? captures exit code) ]
```

### 1.2 The Shebang: Portable vs. Hardcoded
```bash
# ❌ Hardcoded (fails if bash is installed under /usr/local/bin or /opt/homebrew/bin)
#!/bin/bash

# ✅ Portable (searches user's current $PATH for the bash binary)
#!/usr/bin/env bash

# ✅ Strict POSIX shell (maximum portability, but lacks arrays and modern bash features)
#!/bin/sh
```

### 1.3 Permissions and Execution
In Unix, file extensions (`.sh`) are cosmetic hints for humans. Execution capability is controlled strictly by file metadata bits:

```bash
# Make file executable by user, group, and others
chmod +x deploy.sh

# Run via PATH search or relative path
./deploy.sh

# Execute in current shell without spawning a subshell (sources variables directly into terminal)
source ./deploy.sh
# or equivalent POSIX dot command:
. ./deploy.sh
```

---

## Step 2: Defensive Shell Scripting (The Strict Mode)

By default, Bash fails **silently**. If a command errors out or a variable is misspelled, Bash continues executing subsequent lines, often leading to catastrophic data loss (e.g. `rm -rf "$UNSET_VAR/*"` expanding to `rm -rf "/*"`).

Every non-trivial shell script should open with the **Unofficial Bash Strict Mode**:

```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'
```

### Anatomy of Strict Mode:

| Setting | Long Name | Behavior |
|---|---|---|
| `set -e` | `errexit` | Immediately exits script if any command returns a non-zero exit code. |
| `set -u` | `nounset` | Immediately exits with an error if an undeclared/uninitialized variable is referenced. |
| `set -o pipefail` | `pipefail` | Causes a pipeline (`cmd1 \| cmd2 \| cmd3`) to fail if *any* command in the chain fails, not just the last. |
| `IFS=$'\n\t'` | Field Separator | Changes Internal Field Separator to newlines and tabs only (stops spaces from splitting filenames). |

### Handling Intentional Non-Zero Exits
When using `set -e`, if a command is expected to return non-zero (like `grep` finding no matches), guard it with `|| true`:

```bash
# Without guard: script crashes immediately if 'test' is not found
grep "test" /etc/hosts || true

# Or evaluate inside an if statement (set -e is suspended inside conditionals)
if grep -q "nginx" /etc/hosts; then
  echo "Nginx configured."
fi
```

### Debugging Flags
* `set -x` (`xtrace`): Prints every command and its expanded arguments to stderr before execution.
* `set +x`: Turns off execution tracing.
* Customizing the trace prompt with line numbers:
  ```bash
  export PS4='+ [${BASH_SOURCE}:${LINENO}] '
  ```

---

## Step 3: Variables, Types & Parameter Expansions

### 3.1 Naming Conventions & Scope
* **Environment & System Variables:** `ALL_CAPS` (e.g. `PATH`, `USER`, `API_URL`).
* **Internal Script Variables:** `lowercase_with_underscores` (e.g. `file_path`, `max_retries`).
* **Function Local Variables:** Always prefix with `local`:
  ```bash
  calculate_tax() {
    local base_amount="$1"
    local tax_rate="0.15"
    echo "$(( base_amount * tax_rate ))"
  }
  ```

### 3.2 Quoting Rules: The Universal Law
> [!IMPORTANT]
> **Always double-quote your variables: `"$variable"`**
> If `file="my photo.jpg"`, running `rm $file` executes `rm "my" "photo.jpg"`. Double quoting (`rm "$file"`) preserves the string as a single token.

### 3.3 Explicit Variable Declarations: `declare`
Bash supports optional type constraints:

```bash
# Read-only constant (cannot be modified or unset)
declare -r MAX_CONNECTIONS=500
readonly API_VERSION="v2"

# Integer constraint (arithmetic evaluation on assignment)
declare -i count=10
count=count+5
echo "$count" # outputs 15

# Lowercase conversion automatically
declare -l normalized_user="JohnDoe"
echo "$normalized_user" # outputs "johndoe"

# Uppercase conversion automatically
declare -u env_tier="staging"
echo "$env_tier" # outputs "STAGING"
```

### 3.4 The Parameter Expansion Arsenal

Parameter expansion is the fastest way to manipulate strings in Bash because it executes internally in C without spawning slow child processes like `sed`, `awk`, or `cut`.

```bash
filename="production_application_server.tar.gz"

# 1. Default Value (${VAR:-default}): Use default if unset or empty
PORT="${APP_PORT:-8080}"

# 2. Assign Default Value (${VAR:=default}): Assigns default to variable if unset
DATABASE_NAME="${DB_NAME:=production}"

# 3. Error if Unset (${VAR:?error_message}): Exits script with error message if unset
DEPLOY_ENV="${ENVIRONMENT:?Error: ENVIRONMENT must be specified.}"

# 4. String Length (${#VAR})
echo "${#filename}" # 36

# 5. Substring Extraction (${VAR:offset:length})
echo "${filename:0:10}" # "production"
echo "${filename:11:11}" # "application"

# 6. Delete Shortest Match from Front (${VAR#pattern})
echo "${filename#*_}" # "application_server.tar.gz"

# 7. Delete Longest Match from Front (${VAR##pattern})
echo "${filename##*.}" # "gz" (Extracts file extension!)

# 8. Delete Shortest Match from Back (${VAR%pattern})
echo "${filename%.*}" # "production_application_server.tar" (Strips extension!)

# 9. Delete Longest Match from Back (${VAR%%pattern})
echo "${filename%%_*}" # "production"

# 10. Search and Replace First Occurrence (${VAR/pattern/replacement})
echo "${filename/server/cluster}" # "production_application_cluster.tar.gz"

# 11. Search and Replace All Occurrences (${VAR//pattern/replacement})
echo "${filename//_/--}" # "production--application--server.tar.gz"
```

---

## Step 4: Special Variables & CLI Argument Handling

### 4.1 Automatic Special Variables
| Variable | Description | Example / Output |
|---|---|---|
| `$0` | Name or path of the running script | `./deploy.sh` |
| `$1` – `$9` | The 1st through 9th command-line arguments | `server01` |
| `${10}` | 10th argument (curly braces required for 2+ digits) | `true` |
| `$#` | Total count of positional arguments passed | `3` |
| `"$@"` | All arguments expanded as separate words (`"$1" "$2" ...`) | Preserves spaces! |
| `"$*"` | All arguments joined into a single string (`"$1 $2 ..."`) | `"arg1 arg2 arg3"` |
| `$?` | Exit code of the most recently executed command | `0` (success), `1-255` (fail) |
| `$$` | Process ID (PID) of the current running script | `14298` |
| `$!` | Process ID (PID) of the most recently spawned background job | `14302` |

### 4.2 Why `"$@"` vs `"$*"` Matters
```bash
# Given the command: ./script.sh "first argument" "second argument"

for arg in "$*"; do
  echo "Arg: $arg"
done
# Runs ONCE: "Arg: first argument second argument"

for arg in "$@"; do
  echo "Arg: $arg"
done
# Runs TWICE:
# "Arg: first argument"
# "Arg: second argument"
```

### 4.3 Professional CLI Argument & Flag Parsing: `getopts`

The standard, robust method for parsing flags (`-h`, `-v`, `-f filename`, `-e environment`):

```bash
#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat << EOF
Usage: $(basename "$0") [-h] [-v] -e ENVIRONMENT -f FILE [-p PORT]

Options:
  -h            Show this help message and exit
  -v            Enable verbose output
  -e ENV        Deployment environment (staging|production)
  -f FILE       Configuration file to deploy
  -p PORT       Network port (default: 8080)
EOF
  exit 1
}

# Default values
verbose=false
environment=""
config_file=""
port="8080"

# Note: Leading colon ':' enables silent error handling; colons after letters require arguments
while getopts ":hve:f:p:" opt; do
  case "$opt" in
    h)
      usage
      ;;
    v)
      verbose=true
      ;;
    e)
      environment="$OPTARG"
      ;;
    f)
      config_file="$OPTARG"
      ;;
    p)
      port="$OPTARG"
      ;;
    :)
      echo "Error: Option -$OPTARG requires an argument." >&2
      usage
      ;;
    \?)
      echo "Error: Invalid option -$OPTARG." >&2
      usage
      ;;
  esac
done

# Shift off the parsed options so positional arguments remain in $@
shift $(( OPTIND - 1 ))

# Validate mandatory arguments
if [[ -z "$environment" || -z "$config_file" ]]; then
  echo "Error: Missing required arguments (-e and -f are mandatory)." >&2
  usage
fi

echo "Deploying '$config_file' to '$environment' on port '$port' (Verbose: $verbose)..."
```

---

## Step 5: Conditionals, Modern Tests & Pattern Matching

### 5.1 POSIX `[ ... ]` vs. Modern Bash `[[ ... ]]`

Always prefer `[[ ... ]]` in Bash scripts:

| Feature | Legacy `[ ... ]` (`test`) | Modern `[[ ... ]]` |
|---|---|---|
| Word splitting on unquoted variables | Yes (crashes if variable is empty) | **No** (safe against unquoted variables) |
| Logical AND / OR | `-a`, `-o` (fragile and deprecated) | `&&`, `\|\|` (intuitive, short-circuiting) |
| Pattern & Wildcard Matching | No | **Yes** (`[[ $file == *.tar.gz ]]`) |
| Regular Expression Matching | No | **Yes** (`[[ $email =~ ^[a-z]+@[a-z]+\.[a-z]+$ ]]`) |
| Numerical inequality operators | Syntax errors on `<` and `>` | Supported inside `(( ... ))` |

### 5.2 The Complete Test Operator Matrix

```bash
# --- 1. File Inspection Tests ---
[[ -f "$path" ]]  # True if file exists and is a regular file (not directory)
[[ -d "$path" ]]  # True if directory exists
[[ -e "$path" ]]  # True if path exists (any type: file, dir, socket, symlink)
[[ -s "$path" ]]  # True if file exists and has size > 0 (non-empty)
[[ -L "$path" ]]  # True if path is a symbolic link
[[ -r "$path" ]]  # True if file is readable
[[ -w "$path" ]]  # True if file is writable
[[ -x "$path" ]]  # True if file is executable
[[ "$f1" -nt "$f2" ]] # True if file f1 is newer than file f2 (modification time)
[[ "$f1" -ot "$f2" ]] # True if file f1 is older than file f2

# --- 2. String Tests ---
[[ -z "$str" ]]   # True if string length is ZERO (empty)
[[ -n "$str" ]]   # True if string length is NON-ZERO (not empty)
[[ "$a" == "$b" ]] # True if strings are identical
[[ "$a" != "$b" ]] # True if strings are not equal

# --- 3. Regular Expression Evaluation (=~) ---
version="v2.4.1"
if [[ "$version" =~ ^v([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]; then
  echo "Major: ${BASH_REMATCH[1]}" # "2"
  echo "Minor: ${BASH_REMATCH[2]}" # "4"
  echo "Patch: ${BASH_REMATCH[3]}" # "1"
fi
```

### 5.3 Arithmetic Evaluation: `(( ... ))`
Use arithmetic evaluation syntax for pure mathematical comparisons:

```bash
score=85

if (( score >= 90 )); then
  echo "Grade: A"
elif (( score >= 80 && score < 90 )); then
  echo "Grade: B"
else
  echo "Grade: C"
fi
```

### 5.4 Pattern Matching: `case`
```bash
file="archive.tar.gz"

case "$file" in
  *.tar.gz|*.tgz)
    tar -xzf "$file"
    ;;
  *.zip)
    unzip "$file"
    ;;
  *.json)
    jq . "$file"
    ;;
  *)
    echo "Unsupported file extension."
    exit 1
    ;;
esac
```

---

## Step 6: Loops, Streams & Iteration Mechanics

### 6.1 The Correct Way to Read a File Line-by-Line

> [!CAUTION]
> **The Classic Anti-Pattern:**
> `for line in $(cat file.txt); do ... done`
> This fails disastrously if lines contain spaces, tabs, or wildcards (`*`).

#### The Production Standard: `while IFS= read -r`
```bash
# -r: Prevents backslash escapes from being interpreted
# IFS=: Prevents leading and trailing whitespace from being trimmed
# || [[ -n "$line" ]]: Ensures the final line is processed even if missing a trailing newline

while IFS= read -r line || [[ -n "$line" ]]; do
  # Skip comments and empty lines
  [[ "$line" =~ ^[[:space:]]*# ]] && continue
  [[ -z "${line// }" ]] && continue

  echo "Processing record: $line"
done < "servers.txt"
```

### 6.2 Safe File Iteration (Handling Spaces in Names)
```bash
# Enable nullglob so the loop does not execute if no files match
shopt -s nullglob

for img in ./photos/*.{jpg,png,webp}; do
  echo "Optimizing: $img"
  # $img safely expands even if filename is "Family Photo 2026 (1).jpg"
done

shopt -u nullglob
```

### 6.3 C-Style and Range Loops
```bash
# C-style integer loop
for (( i = 1; i <= 5; i++ )); do
  echo "Request #$i"
done

# Range with step (Cross-platform compatible with seq)
for i in $(seq 0 10 100); do
  echo "Progress: $i%"
done
```

---

## Step 7: I/O, Redirection, Heredocs & Process Substitution

### 7.1 Standard File Descriptors
* `0`: `stdin` (Standard Input)
* `1`: `stdout` (Standard Output)
* `2`: `stderr` (Standard Error)

```bash
# Redirect stdout, overwriting file
echo "data" > output.txt

# Redirect stdout, appending to file
echo "data" >> output.txt

# Redirect stderr only
command 2> errors.log

# Discard both stdout and stderr completely
command > /dev/null 2>&1
# or modern bash shorthand:
command &> /dev/null

# Duplicate stdout to terminal AND file simultaneously
echo "Deployment successful" | tee -a deploy.log
```

### 7.2 Heredocs (`<< EOF` vs `<< 'EOF'`)
Heredocs embed multi-line text blocks directly in scripts:

#### Interpolated Heredoc (Variables Expand):
```bash
server_name="app01.internal"
cat << EOF > /etc/motd
========================================
Authorized access only!
Connected server: $server_name
Generated on: $(date)
========================================
EOF
```

#### Literal Heredoc (Quotes prevent all variable expansion):
```bash
# Crucial when generating other shell scripts or code templates!
cat << 'EOF' > install_service.sh
#!/usr/bin/env bash
echo "The script name is: $0"
echo "Arguments count: $#"
EOF
```

### 7.3 Herestrings (`<<<`)
Pass a variable directly into a command's standard input without spawning a subshell with `echo`:

```bash
# ❌ Slower (forks echo process and pipe buffer)
echo "$json_string" | jq .

# ✅ Faster (built-in herestring)
jq . <<< "$json_string"
```

### 7.4 Process Substitution: `<(command)`
Treats the output of a command as a temporary read-only file path (`/dev/fd/63`):

```bash
# Compare output of local branch vs remote branch directly without saving files:
diff -u <(git show main:config.json) <(git show feature:config.json)

# Feed output of a curl request directly into a while loop:
while IFS= read -r user; do
  echo "User: $user"
done < <(curl -fsSL https://api.example.com/users.txt)
```

---

## Step 8: Modular Functions, Scope & Structured Logging

### 8.1 Writing Reusable, Isolated Functions
```bash
#!/usr/bin/env bash
set -euo pipefail

# Pure function: takes arguments, returns result via stdout
calculate_hash() {
  local target_file="${1:?File path required}"
  
  if [[ ! -f "$target_file" ]]; then
    echo "Error: '$target_file' not found." >&2
    return 1
  fi

  sha256sum "$target_file" | awk '{print $1}'
}

# Capturing function output:
checksum=$(calculate_hash "archive.tar.gz")
echo "SHA256: $checksum"
```

### 8.2 Production Structured Logger
```bash
# ANSI Color Codes
readonly COLOR_RESET="\033[0m"
readonly COLOR_INFO="\033[1;34m"
readonly COLOR_SUCCESS="\033[1;32m"
readonly COLOR_WARN="\033[1;33m"
readonly COLOR_ERROR="\033[1;31m"

log_info() {
  echo -e "${COLOR_INFO}[INFO]${COLOR_RESET}  [$(date +'%Y-%m-%d %H:%M:%S')] $*"
}

log_success() {
  echo -e "${COLOR_SUCCESS}[OK]${COLOR_RESET}    [$(date +'%Y-%m-%d %H:%M:%S')] $*"
}

log_warn() {
  echo -e "${COLOR_WARN}[WARN]${COLOR_RESET}  [$(date +'%Y-%m-%d %H:%M:%S')] $*" >&2
}

log_error() {
  echo -e "${COLOR_ERROR}[ERROR]${COLOR_RESET} [$(date +'%Y-%m-%d %H:%M:%S')] $*" >&2
}

die() {
  log_error "$*"
  exit 1
}

# Usage:
log_info "Connecting to database cluster..."
log_success "Database connected."
log_warn "Disk threshold at 82% capacity."
# die "Fatal: Authentication token expired."
```

---

## Step 9: Signals, Traps & Atomic Resource Cleanup

Production scripts frequently create temporary directories, download archives, or acquire mutex locks. If a user presses `Ctrl+C` (`SIGINT`) or a command fails (`set -e`), uncleaned temporary files clutter the disk.

### 9.1 Guaranteed Cleanup with `trap ... EXIT`
The `EXIT` pseudo-signal executes **whenever the script exits for any reason** (normal termination, error termination, or signals):

```bash
#!/usr/bin/env bash
set -euo pipefail

# Create a secure temporary directory
WORK_DIR=$(mktemp -d -t myapp-XXXXXX)

# Register trap function
cleanup() {
  local exit_code=$?
  echo "Cleaning up temporary directory: $WORK_DIR"
  rm -rf "$WORK_DIR"
  exit "$exit_code"
}

# Trap normal exit, Ctrl+C (INT), and kill (TERM)
trap cleanup EXIT INT TERM

# Script work executes safely inside WORK_DIR
echo "Working in: $WORK_DIR"
touch "$WORK_DIR/payload.bin"

# If the script fails here or user hits Ctrl+C, cleanup() STILL runs!
```

### 9.2 Mutual Exclusion: Preventing Concurrent Runs
Ensure only one instance of a background cron job runs at a time:

```bash
LOCK_FILE="/tmp/nightly_sync.lock"

# Try to acquire lock via atomic directory creation
if ! mkdir "$LOCK_FILE" 2>/dev/null; then
  echo "Another instance of this script is already running. Exiting."
  exit 1
fi

# Ensure lock directory is removed on exit
trap 'rmdir "$LOCK_FILE"' EXIT INT TERM

# Run critical payload...
sleep 5
```

---

## Step 10: Arrays & Associative Arrays (Dictionaries)

### 10.1 Indexed Arrays
```bash
# Declaration
servers=("web01" "web02" "db01" "cache01")

# Append element
servers+=("worker01")

# Access elements (0-indexed)
echo "${servers[0]}"   # "web01"
echo "${servers[-1]}"  # "worker01" (last element)

# Total number of elements (${#arr[@]})
echo "Server count: ${#servers[@]}" # 5

# Iterate over all elements safely:
for server in "${servers[@]}"; do
  echo "Pinging: $server"
done

# Slicing (${arr[@]:offset:length})
echo "${servers[@]:1:2}" # "web02 db01"
```

### 10.2 Associative Arrays (Hash Maps / Key-Value Dictionaries)
Requires Bash 4+:

```bash
# Mandatory explicit declaration with -A
declare -A server_ips

server_ips["web01"]="192.168.1.10"
server_ips["web02"]="192.168.1.11"
server_ips["db01"]="192.168.1.50"

# Access value by key
echo "Database IP: ${server_ips["db01"]}"

# Check if a key exists
if [[ -v server_ips["cache01"] ]]; then
  echo "Cache IP configured."
else
  echo "Cache IP missing."
fi

# Iterate over all keys (${!dict[@]})
for server in "${!server_ips[@]}"; do
  echo "$server has IP ${server_ips[$server]}"
done
```

---

## Step 11: Production Architectures & Real-World Scripts

### Real-World Script: Production Backup & Retention Rotation

This complete script illustrates strict mode, flag parsing, traps, dynamic dates, validation, and retention pruning:

```bash
#!/usr/bin/env bash
# ==============================================================================
# Script: backup_manager.sh
# Description: Automated compressed backup with retention policy rotation
# ==============================================================================
set -euo pipefail
IFS=$'\n\t'

# --- Configuration & Defaults ---
SOURCE_DIR=""
BACKUP_DIR=""
RETENTION_DAYS=7
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# --- Structured Logging ---
log() {
  echo -e "[$(date +'%Y-%m-%d %H:%M:%S')] $*"
}

die() {
  echo -e "[$(date +'%Y-%m-%d %H:%M:%S')] [ERROR] $*" >&2
  exit 1
}

# --- CLI Options ---
usage() {
  cat << EOF
Usage: $(basename "$0") -s SOURCE -b BACKUP [-r DAYS]

Options:
  -s SOURCE     Source directory to archive
  -b BACKUP     Destination backup storage directory
  -r DAYS       Retention period in days (default: 7)
  -h            Show this help message
EOF
  exit 1
}

while getopts ":s:b:r:h" opt; do
  case "$opt" in
    s) SOURCE_DIR="$OPTARG" ;;
    b) BACKUP_DIR="$OPTARG" ;;
    r) RETENTION_DAYS="$OPTARG" ;;
    h) usage ;;
    :) die "Option -$OPTARG requires an argument." ;;
    \?) die "Invalid option: -$OPTARG." ;;
  esac
done

# --- Validation ---
[[ -z "$SOURCE_DIR" || -z "$BACKUP_DIR" ]] && usage
[[ ! -d "$SOURCE_DIR" ]] && die "Source directory '$SOURCE_DIR' does not exist."
mkdir -p "$BACKUP_DIR"

# --- Atomic Workspace & Cleanup Trap ---
TEMP_DIR=$(mktemp -d)
cleanup() {
  rm -rf "$TEMP_DIR"
}
trap cleanup EXIT INT TERM

ARCHIVE_NAME="$(basename "$SOURCE_DIR")_${TIMESTAMP}.tar.gz"
DESTINATION_ARCHIVE="${BACKUP_DIR}/${ARCHIVE_NAME}"

# --- Execution ---
log "Starting backup of '$SOURCE_DIR'..."
tar -czf "${TEMP_DIR}/${ARCHIVE_NAME}" -C "$(dirname "$SOURCE_DIR")" "$(basename "$SOURCE_DIR")"

# Atomically move completed archive to destination
mv "${TEMP_DIR}/${ARCHIVE_NAME}" "$DESTINATION_ARCHIVE"
log "Backup archive successfully created: $DESTINATION_ARCHIVE"

# --- Retention Policy Pruning ---
log "Pruning backups older than $RETENTION_DAYS days in '$BACKUP_DIR'..."
find "$BACKUP_DIR" -type f -name "$(basename "$SOURCE_DIR")_*.tar.gz" -mtime +"$RETENTION_DAYS" -exec rm -v {} +

log "Backup maintenance complete."
```

---

## Step 12: The 15 Anti-Patterns & ShellCheck Checklist

| # | Anti-Pattern | Why it Breaks | Correct Modern Pattern |
|---|---|---|---|
| 1 | `for line in $(cat file)` | Word-splits on spaces, newlines, and wildcards | `while IFS= read -r line; do ... done < file` |
| 2 | `rm $file` (unquoted) | If `file="my app.log"`, deletes `my` and `app.log` | `rm "$file"` |
| 3 | `[ $a == $b ]` | Crashes with syntax error if `$a` is empty | `[[ "$a" == "$b" ]]` |
| 4 | Missing shebang | Kernel runs script with user's ambient login shell | `#!/usr/bin/env bash` |
| 5 | Relying on default `set` | Fails silently on errors and continues executing | `set -euo pipefail` |
| 6 | `cd $dir && rm -rf *` | If `cd` fails, deletes current directory contents! | `cd "$dir" && rm -rf ./*` (or `set -e`) |
| 7 | `echo $VAR` for passwords | Echoes secret to process table and shell history | Use `printf` or `<<<` |
| 8 | `my_var = "value"` | Spaces around `=` causes Bash to run `my_var` command | `my_var="value"` (no spaces) |
| 9 | `function my_func()` | Redundant keyword and parenthesis syntax | `my_func() { ... }` |
| 10 | Global variable pollution | Functions overwrite caller's variables | Use `local my_var="value"` |
| 11 | `kill -9 $(pgrep node)` | If `pgrep` returns empty, kills all local processes! | `pgrep node \| xargs -r kill -9` |
| 12 | Using `expr` for math | Spawns heavy external process for every sum | `$(( a + b ))` |
| 13 | Hardcoded `/tmp/temp.txt` | Subject to race conditions and symlink hijacking | `mktemp` / `mktemp -d` |
| 14 | Missing double quotes in `"$@"` | Drops arguments containing whitespace | `"$@"` |
| 15 | Ignoring ShellCheck | Leaves latent bugs and portability issues | Run `shellcheck script.sh` |

---

## Testing Your Scripts with ShellCheck

[ShellCheck](https://www.shellcheck.net/) is an industry-standard static analysis tool that detects syntax errors, quoting hazards, and non-portable constructs in shell scripts.

### Installation
```bash
# On macOS via Homebrew:
brew install shellcheck

# On Debian/Ubuntu:
sudo apt install shellcheck -y
```

### Usage
```bash
shellcheck my_script.sh
```
Fix all warnings before committing any shell script into production.
