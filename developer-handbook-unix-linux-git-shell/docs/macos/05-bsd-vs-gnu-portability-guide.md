# Chapter 05: BSD vs. GNU CLI Deep Dive & Cross-Platform Portability

macOS utilities trace their lineage to BSD Unix (4.4BSD-Lite / FreeBSD), whereas Linux distributions utilize GNU Coreutils. While command names are identical (`sed`, `grep`, `stat`, `date`), their syntax and CLI flags differ significantly.

---

## 1. BSD vs. GNU Incompatibility Matrix

| Utility Function | macOS (BSD Darwin) | Linux (GNU Coreutils) | Universal Cross-Platform Pattern |
|---|---|---|---|
| **In-place `sed` edit** | `sed -i '' 's/old/new/g' f` | `sed -i 's/old/new/g' f` | `sed -i.bak 's/old/new/g' f && rm f.bak` |
| **File size in bytes** | `stat -f%z file` | `stat -c%s file` | `wc -c < file \| tr -d ' '` |
| **File modification time** | `stat -f%m file` | `stat -c%Y file` | Python `os.path.getmtime()` |
| **Relative date offset** | `date -v+1d +%Y-%m-%d` | `date -d "+1 day" +%Y-%m-%d` | Python `datetime` or Perl |
| **Base64 decode** | `base64 -D <<< "$str"` | `base64 -d <<< "$str"` | `openssl base64 -d` |
| **Canonical path** | `perl -MCwd -e 'print Cwd::realpath shift'` | `readlink -f path` | Pure shell directory traversal |
| **xargs without empty run**| Always avoids empty runs | Requires `xargs -r` | `[ -s list ] && xargs ...` |
| **Perl regex grep** | Stock `grep` lacks `-P` | `grep -P 'regex'` | Use `perl -ne` or `ripgrep` |

---

## 2. In-Depth Workarounds for Cross-Platform Shell Scripts

### 2.1 The In-Place `sed -i` Dilemma
* On macOS BSD, `sed -i` requires an explicit extension argument immediately following `-i`. Passing `sed -i 's/a/b/' file` causes BSD sed to treat `'s/a/b/'` as the backup extension and fails!
* On GNU Linux, passing `sed -i '' file` causes GNU sed to fail looking for an input file named `''`.

#### The Universal Portable Solution:
```bash
# Approach A: Use temporary backup extension and delete it
sed -i.bak 's/search/replace/g' file.txt && rm -f file.txt.bak

# Approach B: Detect OS in script preamble
if [[ "$OSTYPE" == "darwin"* ]]; then
  sed -i '' 's/search/replace/g' file.txt
else
  sed -i 's/search/replace/g' file.txt
fi
```

### 2.2 Finding File Size Portably
```bash
# ❌ Fails on Linux:
stat -f%z file.txt

# ❌ Fails on macOS:
stat -c%s file.txt

# ✅ 100% Portable (works on BSD, GNU, Solaris, Alpine BusyBox):
wc -c < file.txt | tr -d ' '
```

### 2.3 Resolving Absolute Canonical File Paths
macOS BSD `readlink` does not implement the `-f` flag:
```bash
# ✅ Portable shell function to resolve absolute paths without readlink -f:
get_realpath() {
  local target="$1"
  if [ -d "$target" ]; then
    (cd "$target" && pwd -P)
  elif [ -f "$target" ]; then
    local dir=$(cd "$(dirname "$target")" && pwd -P)
    echo "$dir/$(basename "$target")"
  fi
}
```

---

## 3. Installing GNU Coreutils on macOS

If you want your macOS terminal to behave identically to a Linux server, install the GNU toolchain via Homebrew:

```bash
brew install coreutils gnu-sed grep gawk findutils
```

### Activating GNU Tools without `g` Prefixes:
Homebrew installs GNU utilities with a `g` prefix by default (`gsed`, `gdate`, `gstat`, `gtar`). To use them as standard commands, add their `gnubin` directories to your `$PATH` in `~/.zshrc`:

```zsh
# Prepend Homebrew GNU binaries ahead of macOS default BSD tools
if [ -d "/opt/homebrew/opt/coreutils/libexec/gnubin" ]; then
  export PATH="/opt/homebrew/opt/coreutils/libexec/gnubin:$PATH"
  export PATH="/opt/homebrew/opt/gnu-sed/libexec/gnubin:$PATH"
  export PATH="/opt/homebrew/opt/grep/libexec/gnubin:$PATH"
  export PATH="/opt/homebrew/opt/findutils/libexec/gnubin:$PATH"
fi
```
