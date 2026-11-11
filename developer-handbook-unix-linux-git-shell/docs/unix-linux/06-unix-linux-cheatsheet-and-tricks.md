# Unix & Linux Command Cheat Sheet & Power Tricks

A consolidated reference card of essential command-line tools, readline shortcuts, system monitoring commands, cross-platform macOS vs. Linux nuances, and production one-liners.

---

## 1. Terminal Readline Keyboard Shortcuts

These shortcuts work in Bash, Zsh, and most interactive CLI prompts:

| Shortcut | Action |
|---|---|
| `Ctrl + A` | Move cursor to the **beginning** of the line |
| `Ctrl + E` | Move cursor to the **end** of the line |
| `Ctrl + U` | Clear the line from cursor back to the beginning |
| `Ctrl + K` | Clear the line from cursor to the end |
| `Ctrl + W` | Delete the word immediately preceding the cursor |
| `Ctrl + L` | Clear terminal screen (equivalent to `clear`) |
| `Ctrl + C` | Send `SIGINT` to terminate running foreground process |
| `Ctrl + Z` | Send `SIGTSTP` to suspend process to background |
| `Ctrl + R` | Interactive reverse history search |
| `Alt + F` (or `Esc + F`) | Jump cursor forward one word |
| `Alt + B` (or `Esc + B`) | Jump cursor backward one word |

---

## 2. System Resources & Process Management

```bash
# Display disk space usage in human-readable units (GB/MB)
df -h

# Check size of all files/directories in current path
du -sh * | sort -h

# Inspect running processes
ps aux

# Filter processes by name
ps aux | grep "nginx"

# Kill process by PID
kill -9 12345

# Kill all processes by program name
killall -9 node

# Find which process is listening on a specific port (e.g. 3000)
# (Works identically on macOS and Linux)
lsof -i :3000

# Kill whatever is running on port 3000 in one command:
kill -9 $(lsof -t -i :3000)

# Check system memory / RAM usage:
# On Linux:
free -h
# On macOS:
vm_stat
```

---

## 3. Networking & Web Diagnostics

```bash
# Inspect HTTP response headers only without downloading body
curl -I https://api.github.com

# Follow redirects and download remote file
curl -LO https://example.com/package.tar.gz

# Test if a port on a remote server is open
nc -zv example.com 443

# DNS lookup details
dig +short example.com
```

---

## 4. macOS vs. Linux Command-Line Differences

| Feature / Task | macOS (Darwin / BSD) | Linux (GNU / Coreutils) |
|---|---|---|
| **Default Shell** | `zsh` (since macOS Catalina) | `bash` |
| **Package Manager** | Homebrew (`brew`) | `apt`, `dnf`, `pacman` |
| **Clipboard Copy** | `pbcopy < file.txt` | `xclip -sel clip < file.txt` |
| **Clipboard Paste** | `pbpaste > file.txt` | `xclip -out -sel clip > file.txt` |
| **Open File/URL in GUI** | `open index.html` / `open https://...` | `xdg-open index.html` |
| **In-place `sed`** | `sed -i '' 's/old/new/g' file` | `sed -i 's/old/new/g' file` |
| **Get File Size (Bytes)** | `stat -f%z file.txt` | `stat -c%s file.txt` |
| **Base64 Decode** | `base64 -D <<< "..."` | `base64 -d <<< "..."` |
| **MD5 Checksum** | `md5 file.iso` | `md5sum file.iso` |
| **SHA256 Checksum** | `shasum -a 256 file.iso` | `sha256sum file.iso` |

---

## 5. Production CLI Power One-Liners

### 5.1 Find the 10 Largest Files in a Directory
```bash
find . -type f -exec du -h {} + | sort -rh | head -n 10
```

### 5.2 Find All Files Modified in the Last 24 Hours
```bash
find . -type f -mtime -1
```

### 5.3 Recursively Replace Text in All Project Files
```bash
# On Linux:
grep -rl "http://old-api.com" ./src | xargs sed -i 's|http://old-api.com|https://new-api.com|g'

# On macOS:
grep -rl "http://old-api.com" ./src | xargs sed -i '' 's|http://old-api.com|https://new-api.com|g'
```

### 5.4 Generate a Random Secure 32-Character Password
```bash
openssl rand -base64 32
# or
LC_ALL=C tr -dc 'A-Za-z0-9!@#$%^&*()' < /dev/urandom | head -c 32; echo
```

### 5.5 Watch File or Directory Changes in Real Time
```bash
# Re-run a command every 2 seconds to monitor status
watch -n 2 "ls -la /tmp"
```
