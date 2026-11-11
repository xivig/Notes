# Unix & Linux Terminal & File Management Basics

A complete foundation covering the Unix filesystem hierarchy, directory navigation, file operations, permissions, I/O streams, and file searching with `find`.

---

## 1. The Unix File Hierarchy Architecture

In Unix and Linux systems, **everything is a file** (including hardware devices, sockets, and directories). All files and directories stem from the root directory `/`.

```
/ (Root)
+--- bin/      Essential command binaries (ls, cp, bash)
+--- sbin/     System binaries for administration (reboot, fdisk)
+--- etc/      System configuration files (passwd, hosts, nginx/)
+--- home/     User home directories on Linux (/home/username)
+--- Users/    User home directories on macOS (/Users/username)
+--- var/      Variable dynamic data (logs, mail, caches)
+--- tmp/      Temporary files (cleared upon reboot)
+--- dev/      Device nodes representing hardware (/dev/null, /dev/disk)
+--- usr/      Secondary hierarchy for user utilities and applications
```

---

## 2. Directory Navigation & Inspection

### 2.1 Basic Navigation
```bash
# Print current working directory
pwd

# Change to home directory
cd ~
# or simply
cd

# Change to previous directory
cd -

# Move up one directory level
cd ..

# Move up two directory levels
cd ../..
```

### 2.2 Listing Directory Contents: `ls`
```bash
# Basic list
ls

# Long format (permissions, owner, size, modification date)
ls -l

# Show hidden files (starting with dot .)
ls -a

# Human-readable file sizes (e.g. 4.2K, 35M, 2G)
ls -lh

# Sort by modification time (most recent first)
ls -lt

# Reverse sort order (oldest first or reverse alphabetical)
ls -ltr

# Recursive listing of subdirectories
ls -R
```

---

## 3. File & Directory Manipulation

### 3.1 Creating Folders & Files
```bash
# Create directory
mkdir my-folder

# Create nested directory tree in a single command (-p creates parents)
mkdir -p project/{src,dist,tests,docs}
mkdir -p website/{css,js,images}

# Create empty file or update timestamp of existing file
touch index.html style.css app.js
```

### 3.2 Copying Files & Directories: `cp`
```bash
# Copy a single file
cp file.txt backup.txt

# Copy a file to another directory
cp index.html /var/www/html/

# Copy a directory recursively (-r or -R)
cp -r src/ src_backup/

# Preserve file attributes (permissions, timestamps, ownership)
cp -a src/ /backup/src/
```

### 3.3 Moving & Renaming: `mv`
```bash
# Rename a file
mv old-name.txt new-name.txt

# Move file to another directory
mv script.sh ./scripts/

# Move multiple files into a directory
mv *.png *.jpg ./images/
```

### 3.4 Removing Files & Folders: `rm`
```bash
# Remove a single file
rm file.txt

# Remove a file interactively (prompts before deletion)
rm -i file.txt

# Remove an empty directory
rmdir empty-folder/

# Remove directory and all contents recursively
rm -rf unwanted-directory/
```

> [!CAUTION]
> In Unix, `rm` deletes files permanently without moving them to a trash bin. Never run `rm -rf /` or `rm -rf *` from the root directory.

### 3.5 Viewing File Contents
```bash
# Concatenate and display entire file
cat README.md

# View file page-by-page with navigation (q to quit)
less server.log

# View the first 10 lines
head -n 10 file.txt

# View the last 10 lines
tail -n 10 file.txt

# Follow log output live in real time (stream dynamic updates)
tail -f /var/log/syslog
```

---

## 4. Permissions & Ownership (`chmod` & `chown`)

Every file and directory has permissions assigned to three categories of actors:
1. **User (u):** The owner of the file.
2. **Group (g):** Members of the file's assigned group.
3. **Others (o):** Everyone else.

### 4.1 Understanding `ls -l` Permission Strings
Example output: `-rwxr-xr--`

```
-   rwx   r-x   r--
^    ^     ^     ^
|    |     |     +-- Others permissions (read-only)
|    |     +-------- Group permissions (read, execute)
|    +-------------- User / Owner permissions (read, write, execute)
+------------------- File type (- = regular file, d = directory, l = symlink)
```

Permission values:
* `r` (Read) = `4`
* `w` (Write) = `2`
* `x` (Execute) = `1`
* `-` (None) = `0`

### 4.2 Octal (Numeric) Permission Notation
Sum the numbers for each tier:
* `755` (`rwxr-xr-x`): Owner can do anything; group and others can read and execute (ideal for scripts & web folders).
* `644` (`rw-r--r--`): Owner can read & write; group and others can only read (standard for documents & web pages).
* `600` (`rw-------`): Owner only can read & write; everyone else has zero access (ideal for private keys & `.env` files).
* `700` (`rwx------`): Owner only can read, write, execute (standard for `.ssh` directory).

```bash
# Make a script executable by everyone
chmod 755 deploy.sh

# Protect a private SSH key
chmod 600 ~/.ssh/id_ed25519

# Secure SSH directory
chmod 700 ~/.ssh
```

### 4.3 Symbolic Permission Notation
```bash
# Add execute permission for user (owner)
chmod u+x script.sh

# Add execute permission for everyone
chmod +x script.sh

# Remove write permission from group and others
chmod go-w sensitive.txt

# Set exact permissions: user read/write, others none
chmod u=rw,go= confidential.pdf
```

### 4.4 Changing Ownership: `chown`
```bash
# Change owner to 'john'
sudo chown john document.txt

# Change owner and group simultaneously
sudo chown john:developers document.txt

# Change ownership recursively across an entire folder
sudo chown -R www-data:www-data /var/www/html/
```

---

## 5. Streams, Redirection & Pipelines

Every Unix process opens three standard streams:
1. `0` : **Standard Input (`stdin`)** - Keyboard or piped input
2. `1` : **Standard Output (`stdout`)** - Normal terminal output
3. `2` : **Standard Error (`stderr`)** - Error messages

### 5.1 Redirection Operators
```bash
# Overwrite stdout to a file (creates file if missing)
echo "Hello World" > output.txt

# Append stdout to the end of a file
echo "Second line" >> output.txt

# Redirect stderr to a file
ls /nonexistent-folder 2> errors.log

# Discard errors completely (send to black hole /dev/null)
command 2> /dev/null

# Redirect BOTH stdout and stderr to the same file
command > output.log 2>&1
# or modern Bash shorthand:
command &> output.log

# Append both stdout and stderr
command &>> output.log
```

### 5.2 Pipelines (`|`) and `tee`
Pipes route the `stdout` of one command directly into the `stdin` of the next:

```bash
# Count total files in current directory
ls -1 | wc -l

# Search running processes for nginx
ps aux | grep nginx

# Filter and sort output
cat users.txt | sort | uniq

# Display output on screen AND write to a file at the same time:
echo "Server deployed" | tee -a deployment.log
```

---

## 6. Finding Files: Deep Dive into `find`

The `find` utility searches through directory hierarchies based on conditions like name, size, type, or timestamps.

### 6.1 Basic Syntax
```bash
find <starting-directory> <criteria> <actions>
```

### 6.2 Search by Name
```bash
# Search for exact file name in current directory and subdirectories
find . -name "index.html"

# Case-insensitive search (-iname)
find /home/user -iname "toms-first-birthday.mp4"

# Search using wildcards (always quote wildcards!)
find . -name "*.js"
find . -name "*.docx"
```

### 6.3 Filter by File Type (`-type`)
```bash
# Find files only (-type f)
find . -type f -name "*.sh"

# Find directories only (-type d)
find . -type d -name "node_modules"

# Find symbolic links only (-type l)
find /usr/bin -type l
```

### 6.4 Controlling Search Depth
```bash
# Search only the current directory (do not enter subfolders)
find . -maxdepth 1 -name "*.txt"

# Limit search to 3 directory levels deep
find . -maxdepth 3 -type f -name "*.config"

# Minimum depth (ignore root directory files)
find . -mindepth 2 -type f
```

### 6.5 Search by Size & Modification Time
```bash
# Find files larger than 100 Megabytes
find /var/log -type f -size +100M

# Find files modified within the last 7 days
find /backup -type f -mtime -7

# Find files modified more than 30 days ago
find /tmp -type f -mtime +30
```

### 6.6 Performing Actions on Found Files (`-exec` & `-delete`)
```bash
# Copy an index.php file into every directory found:
find . -mindepth 1 -maxdepth 3 -type d -exec cp index.php {} \;

# Change permissions of all directories to 755:
find /var/www/html -type d -exec chmod 755 {} +

# Change permissions of all files to 644:
find /var/www/html -type f -exec chmod 644 {} +

# Delete all temporary .DS_Store files:
find . -name ".DS_Store" -delete
```

> [!NOTE]
> * `{} \;` invokes the command once per matching file.
> * `{} +` aggregates matching files and runs the command once on the batch (substantially faster for large directories).
