# Chapter 03: Darwin System Architecture, Launchd & Process Diagnostics

macOS is built on Darwin &mdash; a certified Unix operating system powered by the hybrid XNU kernel. Understanding its process hierarchy, daemon orchestration, and port inspection tools gives you complete control over your workstation.

---

## 1. Darwin Kernel Anatomy

Unlike Linux, which utilizes a monolithic kernel, macOS runs on **XNU** ("X is Not Unix"):

```text
[ User Space: Applications, CLI Tools, Zsh ]
===================================================
[ XNU Hybrid Kernel ]
   |-- Mach Microkernel (IPC, Threads, Memory Management, CPU Scheduling)
   |-- BSD Layer (POSIX API, BSD Process Model, File Systems, Networking)
   |-- I/O Kit (Object-Oriented C++ Driver Framework)
   |-- AppleSEP / Security Framework
```

* **Mach:** Handles low-level tasks: thread scheduling, task management, inter-process communication (IPC) via Mach ports, and virtual memory.
* **BSD Layer:** Sits above Mach, presenting the standard POSIX interface (PIDs, file descriptors, signals, and BSD networking sockets).

---

## 2. Process & Network Diagnostics with `lsof`

In macOS Darwin, `lsof` ("list open files") is the primary diagnostic weapon for resolving blocked ports and locked files.

### 2.1 Resolving "Port Already in Use"
When local web servers (Vite, Next.js, Django, Docker) crash and leave background sockets open:

```bash
# 1. Find the process listening on TCP port 3000
lsof -nP -iTCP:3000 -sTCP:LISTEN

# Breakdown of flags:
# -n: Disables IP-to-hostname DNS lookups (speed boost)
# -P: Disables port-number-to-service-name resolution (shows 3000, not custom names)
# -iTCP:3000: Filters strictly to TCP port 3000
# -sTCP:LISTEN: Filters strictly to listening sockets

# 2. Extract only the PID holding port 3000
lsof -ti :3000

# 3. Kill the blocked process in one atomic pipeline
kill -9 $(lsof -ti :3000)
```

### 2.2 Inspecting Open Files by Process
```bash
# List all files currently held open by Visual Studio Code
lsof -c "Code"

# Find which process is preventing a directory or volume from unmounting
lsof +D /Volumes/ExternalDrive
```

### 2.3 Memory Diagnostics with `vm_stat`
Linux provides `/proc/meminfo` and `free -m`. Darwin manages memory in 4 KB or 16 KB virtual pages:
```bash
# Display virtual memory statistics
vm_stat

# Calculate free memory in MB from 4096-byte pages:
python3 -c '
import subprocess, re
out = subprocess.check_output("vm_stat", encoding="utf-8")
pages = {k: int(re.search(r"\d+", v).group()) for k, v in [l.split(":") for l in out.splitlines() if ":" in l]}
page_size = 4096
free_mb = (pages.get("Pages free", 0) + pages.get("Pages inactive", 0)) * page_size / (1024 * 1024)
print(f"Available Memory: {free_mb:.2f} MB")
'
```

---

## 3. System Automation with `launchd`

macOS officially deprecates `cron`. The central init and daemon supervisory system is **`launchd`** (PID 1).

### 3.1 Agents vs. Daemons
| Entity | Configuration Directory | Execution Context | User Access |
|---|---|---|---|
| **User Agent** | `~/Library/LaunchAgents` | Logged-in GUI user account | User files, display |
| **Global Agent** | `/Library/LaunchAgents` | Runs per user at login | User files |
| **System Daemon** | `/Library/LaunchDaemons` | Root user (`root`) | System background, no GUI |

### 3.2 Authoring a LaunchAgent (.plist)
Create `~/Library/LaunchAgents/com.user.backup.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <!-- Unique reverse-domain identifier -->
  <key>Label</key>
  <string>com.user.backup</string>

  <!-- Program arguments array -->
  <key>ProgramArguments</key>
  <array>
    <string>/usr/local/bin/bash</string>
    <string>/Users/username/scripts/daily_backup.sh</string>
  </array>

  <!-- Execution Schedule: Run every night at 02:30 AM -->
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key>
    <integer>2</integer>
    <key>Minute</key>
    <integer>30</integer>
  </dict>

  <!-- Standard Output & Error Logging -->
  <key>StandardOutPath</key>
  <string>/Users/username/logs/backup.log</string>
  <key>StandardErrorPath</key>
  <string>/Users/username/logs/backup_err.log</string>
</dict>
</plist>
```

### 3.3 Managing Services with `launchctl`
```bash
# Load and activate the agent
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.user.backup.plist

# Unload and disable the agent
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.user.backup.plist

# Force immediate execution of service for testing
launchctl kickstart -k gui/$(id -u)/com.user.backup

# Check service status
launchctl print gui/$(id -u)/com.user.backup
```

---

## 4. Preventing System Sleep with `caffeinate`

When executing long-running builds, large database migrations, or video encodings, macOS may put the display and CPU to sleep, pausing background jobs.

```bash
# Prevent display and system idle sleep until the command finishes
caffeinate -i -s make build-all

# Prevent system sleep for 2 hours (7200 seconds)
caffeinate -t 7200 &

# Keep machine awake as long as an existing process (PID 4821) is alive
caffeinate -w 4821
```
