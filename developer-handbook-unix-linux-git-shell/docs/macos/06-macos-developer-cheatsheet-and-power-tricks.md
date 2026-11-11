# Chapter 06: macOS Power Cheatsheet, System Bridge & Productivity

macOS includes unique terminal bridge utilities that interface directly with the macOS Cocoa GUI, system clipboard, Spotlight search index, and audio synthesis subsystems.

---

## 1. Native macOS Bridge Utilities

### 1.1 The System Clipboard: `pbcopy` and `pbpaste`
Seamlessly transfer data between terminal pipelines and your GUI clipboard:

```bash
# Copy your public SSH key directly to clipboard
pbcopy < ~/.ssh/id_ed25519.pub

# Pipe terminal output into clipboard
git diff | pbcopy

# Paste clipboard content into a file
pbpaste > patch.diff

# Strip trailing newlines when copying
printf "%s" "token-value" | pbcopy
```

### 1.2 Launching Files, Folders & Applications with `open`
```bash
# Open current directory in a native Finder window
open .

# Open a URL in your default browser
open https://github.com/xivig

# Open an HTML document in a specific browser
open -a "Google Chrome" index.html

# Reveal a file in Finder without opening it
open -R config/database.yml

# Open file in default GUI text editor
open -t README.md
```

### 1.3 Fast Spotlight CLI Search with `mdfind`
`mdfind` queries the pre-indexed Apple Spotlight database instantaneously, locating files across millions of files in milliseconds:

```bash
# Search for files containing text "API_SECRET_KEY"
mdfind "API_SECRET_KEY"

# Find files matching name within a specific directory
mdfind -onlyin ~/Projects -name "package.json"

# Search by macOS Metadata Attribute (e.g. PDFs modified in last 24h)
mdfind 'kMDItemContentType == "com.adobe.pdf" && kMDItemFSContentChangeDate >= $time.now(-86400)'
```

### 1.4 Scriptable Image Processing with `sips`
macOS includes a native image manipulation utility without requiring ImageMagick:

```bash
# Convert an image from PNG to WebP
sips -s format webp input.png --out output.webp

# Resize image to a maximum width of 1200px while maintaining aspect ratio
sips --resampleWidth 1200 photo.jpg

# Inspect image dimensions and color profile
sips -g pixelWidth -g pixelHeight -g space photo.jpg
```

### 1.5 Terminal Audio & Speech Notifications with `say`
Notify yourself when long-running builds, test suites, or deployments finish:

```bash
# Speak text using the default system voice
say "Build completed successfully"

# Notification on failure vs success
npm run build && say "Deploy succeeded" || say "Build failed with error"
```

---

## 2. macOS Network & System Diagnostics

```bash
# Flush DNS Cache across modern macOS versions (Sonoma, Sequoia, Ventura):
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

# Display active Wi-Fi interface status (SSID, BSSID, RSSI, Channel):
/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I

# List all network hardware interfaces (Wi-Fi, Ethernet, Thunderbolt):
networksetup -listallhardwareports

# Query system DNS resolvers
scutil --dns
```

---

## 3. Top 35 High-Frequency macOS Terminal One-Liners

| Task | Command |
|---|---|
| **Kill blocked port 3000** | `kill -9 $(lsof -ti :3000)` |
| **Copy public SSH key** | `pbcopy < ~/.ssh/id_ed25519.pub` |
| **Reveal file in Finder** | `open -R /path/to/file` |
| **Clean all .DS_Store** | `find . -name '.DS_Store' -delete` |
| **Strip quarantine attribute** | `xattr -r -d com.apple.quarantine ./dir` |
| **Prevent sleep during task** | `caffeinate -i -s make build` |
| **Check Apple Silicon status** | `uname -m; sysctl -n sysctl.proc_translated` |
| **Run x86_64 emulated shell** | `arch -x86_64 /bin/zsh` |
| **Clone 10GB file instantly** | `cp -c source.db clone.db` |
| **Flush DNS cache** | `sudo killall -HUP mDNSResponder` |
| **Search files with Spotlight**| `mdfind -name "filename"` |
| **Convert PNG to WebP** | `sips -s format webp in.png --out out.webp` |
| **Check Homebrew health** | `brew doctor` |
| **Restart Homebrew service** | `brew services restart redis` |
| **View Homebrew dep tree** | `brew deps --tree package` |
| **Check SIP status** | `csrutil status` |
| **Check battery state CLI** | `pmset -g batt` |
| **Show hidden files in Finder**| `defaults write com.apple.finder AppleShowAllFiles -bool true && killall Finder` |
| **Hide hidden files in Finder**| `defaults write com.apple.finder AppleShowAllFiles -bool false && killall Finder` |
| **Speak build alert** | `npm test && say "Tests passed"` |
