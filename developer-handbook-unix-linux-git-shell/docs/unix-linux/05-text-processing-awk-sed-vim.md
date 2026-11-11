# Text Processing & Editor Mastery: Awk, Sed, Xargs & Vim

Master the core command-line text manipulation utilities of Unix and Linux systems alongside complete navigation and survival techniques for the Vim editor.

---

## 1. Pattern Scanning & Processing: `awk`

`awk` is a complete domain-specific programming language designed for text processing, data extraction, and reporting.

### 1.1 The Awk Mental Model
`awk` automatically breaks input into:
* **Records:** Typically lines (separated by newline).
* **Fields:** Individual words or columns (separated by whitespace by default).

### 1.2 Essential Awk Built-In Variables
| Variable | Description |
|---|---|
| `$0` | The entire current record (full line) |
| `$1`, `$2`, ... | The 1st, 2nd, ... field in the line |
| `$NF` | The value of the **last** field in the line |
| `NF` | Total number of fields in the current line |
| `NR` | Total number of records processed so far across all files |
| `FNR` | Record number within the **current** file |
| `FILENAME` | Name of the current input file |
| `FS` | Input Field Separator (default is space/tab) |
| `OFS` | Output Field Separator (default is space) |

---

### 1.3 Printing File Names with `awk`

A frequent interview and system administration challenge is printing the file name currently being processed.

#### The Problem:
Running `awk '{ print FILENAME }' filename.txt` prints the filename on **every single line** of the file.

#### Solution 1: Use `FNR == 1`
To print the filename once at the beginning of each file:
```bash
# Displays the filename only once for each file processed
awk 'FNR == 1 { print FILENAME }' /etc/hosts /etc/passwd
```

#### Solution 2: In the `BEGIN` Block
Inside the `BEGIN` block, `FILENAME` is not yet initialized because no input record has been read. Instead, access the filename through `ARGV[1]`:
```bash
awk 'BEGIN { print "Processing file:", ARGV[1] }' /etc/hosts
```

---

### 1.4 Practical `awk` Recipes

```bash
# 1. Extract usernames and shells from /etc/passwd (colon-delimited)
awk -F: '{ print $1, "uses shell:", $7 }' /etc/passwd

# 2. Print lines where column 3 is greater than 100
awk '$3 > 100 { print $1, $3 }' data.txt

# 3. Print the last column of any file regardless of column count
awk '{ print $NF }' input.txt

# 4. Sum all values in column 1 and display total at the end
awk '{ sum += $1 } END { print "Sum Total =", sum }' numbers.txt

# 5. Calculate average value of column 2
awk '{ sum += $2; count++ } END { print "Average =", sum / count }' scores.txt
```

---

## 2. Stream Editor: `sed`

`sed` parses and transforms text line-by-line in a single pass without opening an interactive editor.

### 2.1 Basic Search and Replace
```bash
# Replace first occurrence of 'foo' with 'bar' per line (prints to terminal)
sed 's/foo/bar/' file.txt

# Replace ALL occurrences globally ('g') per line
sed 's/foo/bar/g' file.txt

# Case-insensitive replacement ('i')
sed 's/apple/orange/gi' file.txt
```

### 2.2 In-Place File Editing (`-i`)

> [!WARNING]
> **GNU Linux vs. macOS BSD Sed:**
> * On **Linux (GNU sed)**: `sed -i 's/foo/bar/g' file.txt` modifies the file in place.
> * On **macOS (BSD sed)**: The `-i` flag requires an extension argument for backups. To edit in place without creating a backup file on macOS, provide an explicit empty string:
> ```bash
> # macOS BSD syntax:
> sed -i '' 's/foo/bar/g' file.txt
> ```

### 2.3 Deleting Lines with `sed`
```bash
# Delete line 5
sed '5d' file.txt

# Delete lines 10 through 20
sed '10,20d' file.txt

# Delete all blank or empty lines
sed '/^$/d' file.txt

# Delete lines matching a regex pattern
sed '/DEBUG/d' application.log
```

---

## 3. Batch Argument Processing: `xargs`

Commands like `rm`, `cp`, and `kill` take arguments as command-line parameters rather than standard input (`stdin`). `xargs` converts standard input into arguments.

### 3.1 Basic Usage
```bash
# Kill multiple process IDs
pgrep -f "python worker" | xargs kill -9

# Copy a template file into subdirectories one by one:
find . -mindepth 1 -maxdepth 10 -type d | xargs -n 1 cp -i index.php
```

### 3.2 Handling Spaces and Special Characters Safely (`-print0` & `-0`)
Standard `xargs` splits on whitespace, which breaks if file names contain spaces (e.g. `My Photos 2026.jpg`). Use null-character delimiters:

```bash
# Safely find and delete temporary files with spaces in names
find . -type f -name "*.tmp" -print0 | xargs -0 rm -v
```

---

## 4. The Definitive Vim Survival & Mastery Guide

Vim is the standard, omnipresent terminal text editor available on virtually every Unix, Linux, and macOS server.

### 4.1 Understanding Vim's Four Modes
1. **Normal Mode:** For navigation and commands (default upon launch; press `Esc` to return here anytime).
2. **Insert Mode:** For typing text (enter via `i`, `a`, or `o`).
3. **Visual Mode:** For selecting text blocks (enter via `v` or `Shift + V`).
4. **Command-Line Mode:** For executing commands, saving, and quitting (enter via `:` from Normal mode).

---

### 4.2 How to Exit Vim (The Complete Reference)

From **Normal mode** (press `Esc` first), type `:` followed by the command and press `Enter`:

| Command | Action | Description |
|---|---|---|
| `:q` | Quit | Quits if no unsaved changes exist |
| `:q!` | Force Quit | Quits discarding all unsaved changes |
| `:w` | Write | Saves (writes) changes to disk |
| `:wq` | Write & Quit | Saves changes and exits |
| `:wq!` | Force Write & Quit | Saves changes even if file is marked read-only (if owner) |
| `:x` | Exit | Writes only if changes exist, then quits (preserves file timestamp) |
| `:qa!` | Quit All | Closes all open files and tabs, discarding changes |
| `:cq` | Quit with Error | Exits immediately returning a non-zero exit code |

#### Exiting Directly from Normal Mode (No colon required):
* `ZZ` (Shift + Z + Z) : Save and exit (equivalent to `:x`).
* `ZQ` (Shift + Z + Q) : Quit without saving (equivalent to `:q!`).

---

### 4.3 Essential Vim Navigation & Editing Commands

#### Switching to Insert Mode:
* `i` : Insert before cursor
* `a` : Append after cursor
* `o` : Open a new line below current line and enter Insert mode
* `O` : Open a new line above current line and enter Insert mode

#### Moving the Cursor:
* `h`, `j`, `k`, `l` : Left, Down, Up, Right
* `w` : Jump forward to beginning of next word
* `b` : Jump backward to beginning of previous word
* `0` : Jump to beginning of current line
* `$` : Jump to end of current line
* `gg` : Jump to first line of the file
* `G` : Jump to last line of the file
* `:50` : Jump directly to line 50

#### Editing and Manipulating Text:
* `x` : Delete character under cursor
* `dd` : Delete (cut) current line
* `5dd` : Delete (cut) 5 lines
* `yy` : Yank (copy) current line
* `p` : Paste cut/copied text after cursor
* `u` : Undo last action
* `Ctrl + r` : Redo undone action

#### Searching and Replacing in Vim:
* `/search_term` : Search forward (press `n` for next match, `N` for previous)
* `?search_term` : Search backward
* `:%s/old/new/g` : Replace all occurrences of `old` with `new` across entire file
* `:%s/old/new/gc` : Replace all occurrences with interactive confirmation prompt
