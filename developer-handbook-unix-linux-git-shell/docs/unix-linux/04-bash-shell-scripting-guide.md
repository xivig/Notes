# Bash Shell Scripting Guide: From Novice to Automation Pro

A comprehensive guide to shell scripting covering variables, arithmetic, conditional branching, comparison tests, loops, functions, cross-platform caveats, and real-world automation scripts.

---

## 1. Anatomy of a Robust Shell Script

A production-ready shell script contains four fundamental parts:

```bash
#!/usr/bin/env bash
# ==============================================================================
# Script: deploy_website.sh
# Description: Automates website directory creation and template generation
# ==============================================================================

# Exit immediately if a command exits with a non-zero status
set -e

# Treat unset variables as an error when substituting
set -u

# Ensure pipelines fail if any command in the chain fails
set -o pipefail
```

### 1.1 The Shebang (`#!`)
* `#!/usr/bin/env bash` is preferred over hardcoded `#!/bin/bash` because it dynamically locates the `bash` executable in your `$PATH` (critical on systems like macOS, FreeBSD, or NixOS).

### 1.2 Making Scripts Executable
Before executing your script, grant execute permission:
```bash
chmod +x script.sh
./script.sh
```

---

## 2. Variables, Quotes & Substitutions

### 2.1 Quoting Rules
* **Single Quotes (`'...'`):** Preserves the literal value of all characters. No variable expansion occurs.
* **Double Quotes (`"..."`):** Allows parameter expansion (`$VAR`) and command substitution (`$(...)`).
* **Always quote variables:** `"$VAR"` prevents word-splitting and glob expansion when variables contain spaces.

```bash
NAME="World"
echo 'Hello $NAME'  # Outputs: Hello $NAME
echo "Hello $NAME"  # Outputs: Hello World
```

### 2.2 Command Substitution
Capture command output into a variable:

```bash
# Modern syntax (Recommended):
CURRENT_DATE=$(date +"%Y-%m-%d")
FILE_COUNT=$(ls -1 | wc -l)

# Legacy backtick syntax (still found in older scripts):
CURRENT_DATE=`date +"%Y-%m-%d"`
```

### 2.3 Variable Parameter Expansion Tricks
```bash
# Provide default value if variable is unset or empty
PORT="${APP_PORT:-8080}"

# Get string length
TEXT="Developer"
echo "${#TEXT}"  # outputs: 9

# String search and replace
PATH_VAR="/usr/local/bin"
echo "${PATH_VAR//usr/opt}"  # outputs: /opt/local/bin
```

---

## 3. Arithmetic Operations

### Modern Arithmetic Expansion: `$(( ... ))`
Perform integer arithmetic natively without launching external processes:

```bash
A=10
B=20

SUM=$(( A + B ))          # 30
DIFF=$(( B - A ))         # 10
PRODUCT=$(( A * B ))      # 200
QUOTIENT=$(( B / A ))     # 2
REMAINDER=$(( 23 % 5 ))   # 3

# Increment and decrement
COUNTER=0
(( COUNTER++ ))
echo "$COUNTER"           # 1
```

### Legacy `expr` (For Historical Compatibility)
Earlier shells used the external program `expr`. Note that spaces around operators are strictly required:

```bash
val=`expr 2 + 2`
echo "Total: $val"

# Multiplication requires escaping the asterisk \*
prod=`expr 5 \* 10`
```

---

## 4. User Input & Script Arguments

### 4.1 Positional Arguments
When executing `./script.sh arg1 arg2`:
* `$0` : The script name (`./script.sh`)
* `$1`, `$2`, `$3` : The first, second, and third command-line arguments
* `${10}` : Tenth argument (braces required for double digits)
* `$#` : Total count of arguments passed
* `$@` : All arguments expanded as separate words (`"$1" "$2" ...`)
* `$$` : Process ID (PID) of the running script
* `$?` : Exit status of the most recently executed command (`0` = success)

### 4.2 Interactive User Prompts: `read`
```bash
# Read input with a prompt message
read -p "Please enter your username: " USERNAME

# Read silent input (ideal for passwords)
read -s -p "Enter your secret password: " PASSWORD
echo ""

# Read with a timeout of 10 seconds
read -t 10 -p "Continue? (y/n): " CONFIRM
```

---

## 5. Conditionals & Comparison Tests

> [!IMPORTANT]
> Spaces inside brackets `[ condition ]` or `[[ condition ]]` are mandatory!
> `[ "$A" == "$B" ]` is valid syntax; `["$A"=="$B"]` will result in a syntax error.

### 5.1 Test Operators Reference

#### Numeric Comparison Operators:
| Operator | Meaning | Example |
|---|---|---|
| `-eq` | Equal to | `[ "$a" -eq "$b" ]` |
| `-ne` | Not equal to | `[ "$a" -ne "$b" ]` |
| `-lt` | Less than | `[ "$a" -lt "$b" ]` |
| `-le` | Less than or equal to | `[ "$a" -le "$b" ]` |
| `-gt` | Greater than | `[ "$a" -gt "$b" ]` |
| `-ge` | Greater than or equal to | `[ "$a" -ge "$b" ]` |

#### String Comparison Operators:
| Operator | Meaning | Example |
|---|---|---|
| `=` or `==` | Equal to | `[ "$str1" = "$str2" ]` |
| `!=` | Not equal to | `[ "$str1" != "$str2" ]` |
| `-z` | String is empty (zero length) | `[ -z "$input" ]` |
| `-n` | String is not empty | `[ -n "$input" ]` |

#### File Inspection Operators:
| Operator | Meaning | Example |
|---|---|---|
| `-e` | Path exists (file, directory, or socket) | `[ -e "$path" ]` |
| `-f` | Regular file exists (not a directory) | `[ -f "config.json" ]` |
| `-d` | Directory exists | `[ -d "/var/log" ]` |
| `-s` | File exists and is not empty (size > 0) | `[ -s "data.txt" ]` |
| `-r` | File exists and has read permission | `[ -r "$file" ]` |
| `-w` | File exists and has write permission | `[ -w "$file" ]` |
| `-x` | File exists and is executable | `[ -x "./deploy.sh" ]` |

### 5.2 `if`, `elif`, `else` Flow Control
```bash
read -p "Enter your age: " AGE

if [ "$AGE" -lt 18 ]; then
    echo "Minor: Access restricted."
elif [ "$AGE" -ge 18 ] && [ "$AGE" -lt 65 ]; then
    echo "Adult: Standard access granted."
else
    echo "Senior: Special benefits applied."
fi
```

### 5.3 Pattern Matching: `case` Statements
```bash
read -p "Choose an option (start|stop|restart|status): " ACTION

case "$ACTION" in
    start)
        echo "Starting server service..."
        ;;
    stop)
        echo "Stopping server service..."
        ;;
    restart)
        echo "Restarting service..."
        ;;
    status)
        echo "Service is running normally."
        ;;
    *)
        echo "Error: Unknown option '$ACTION'. Usage: start|stop|restart|status"
        exit 1
        ;;
esac
```

---

## 6. Loops & Iteration

### 6.1 `for` Loops

#### Over a List of Words:
```bash
for color in red green blue yellow; do
    echo "Color: $color"
done
```

#### Over Files:
```bash
for img in ./images/*.jpg; do
    echo "Processing image: $img"
done
```

#### C-Style Loop:
```bash
for (( i = 1; i <= 5; i++ )); do
    echo "Iteration: $i"
done
```

#### Brace Expansion:
```bash
for num in {1..5}; do
    echo "Number: $num"
done
```

> [!WARNING]
> **macOS Compatibility Note:** The syntax `{0..10..2}` (range with step) requires Bash 4+. macOS ships with Bash 3.2 due to GPL licensing!
> If writing scripts for stock macOS bash, use `seq 0 2 10` or a C-style loop:
> ```bash
> # Portable across Linux and stock macOS:
> for i in $(seq 0 2 10); do
>     echo "Step: $i"
> done
> ```

### 6.2 `while` Loops

#### Reading a File Line by Line Safely:
```bash
while IFS= read -r line || [ -n "$line" ]; do
    echo "Read line: $line"
done < input.txt
```

#### Counter Loop:
```bash
COUNT=1
while [ $COUNT -le 5 ]; do
    echo "Count is $COUNT"
    (( COUNT++ ))
done
```

---

## 7. Functions in Bash

```bash
# Define a function
log_message() {
    local LEVEL="$1"
    local MESSAGE="$2"
    local TIMESTAMP
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    echo "[$TIMESTAMP] [$LEVEL] $MESSAGE"
}

# Invoke the function
log_message "INFO" "Application started."
log_message "WARN" "Low disk space on /var."
log_message "ERROR" "Failed to connect to database."
```

---

## 8. Real-World Practical Automation Scripts

### 8.1 Modern Web Project Scaffolding
Creates a standardized HTML5/CSS/JS frontend project structure in seconds:

```bash
#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR="${1:-./my-website}"

echo "Scaffolding website project in: $TARGET_DIR"

mkdir -p "$TARGET_DIR"/{css,js,images,assets}

# Create base website files
cat << 'EOF' > "$TARGET_DIR/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Website</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1>Welcome to Your New Website</h1>
  <script src="js/main.js"></script>
</body>
</html>
EOF

touch "$TARGET_DIR/css/style.css"
touch "$TARGET_DIR/js/main.js"
touch "$TARGET_DIR/robots.txt"
touch "$TARGET_DIR/.gitignore"

echo "node_modules/" >> "$TARGET_DIR/.gitignore"
echo ".DS_Store" >> "$TARGET_DIR/.gitignore"

echo "Project scaffolded successfully in $TARGET_DIR"
```

### 8.2 Bulk Distribute a File Across Subdirectories
Safely copies a template file (such as `index.php` or `README.md`) into every subfolder:

```bash
#!/usr/bin/env bash
set -euo pipefail

SOURCE_FILE="${1:-index.php}"
ROOT_DIR="${2:-.}"

if [ ! -f "$SOURCE_FILE" ]; then
    echo "Error: Source file '$SOURCE_FILE' does not exist."
    exit 1
fi

echo "Copying '$SOURCE_FILE' to all subdirectories under '$ROOT_DIR'..."

find "$ROOT_DIR" -mindepth 1 -maxdepth 5 -type d -exec cp -v "$SOURCE_FILE" {} \;

echo "Distribution complete."
```
