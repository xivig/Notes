# Chapter 02: Zsh Environment & Shell Mastery on macOS

Since macOS Catalina (10.15), Zsh (Z Shell) is the default interactive and login shell on macOS. Understanding its startup sequence, completion engine, and history mechanics is essential for developer productivity.

---

## 1. The Zsh Startup File Lifecycle on macOS

When an interactive login terminal window opens on macOS, Zsh reads configuration files in a strictly defined order:

```text
[ Terminal App / iTerm2 Launches ]
       |
       v
1. /etc/zshenv          (System-wide environment, runs for EVERY shell)
2. ~/.zshenv             (User environment variables, PATH - non-interactive scripts included)
       |
       +---> [If Login Shell]
       |     3. /etc/zprofile   (/usr/libexec/path_helper runs here!)
       |     4. ~/.zprofile     (User login configuration, Homebrew shellenv)
       |
       +---> [If Interactive Shell]
       |     5. /etc/zshrc      (System-wide interactive settings)
       |     6. ~/.zshrc        (User aliases, prompt, completions, plugins)
       |
       +---> [If Login Shell Completes]
       |     7. /etc/zlogin
       |     8. ~/.zlogin
       |
[ Shell Active & Ready ]
       |
       v [Terminal Window Closes / Exit]
9. ~/.zlogout
10. /etc/zlogout
```

### 1.1 The macOS `path_helper` Quirk
On macOS, `/etc/zprofile` executes `/usr/libexec/path_helper`. This utility reads `/etc/paths` and `/etc/paths.d/` and prepends standard system paths (`/usr/bin:/bin:/usr/sbin:/sbin`).

> **Warning:** If you define custom paths (like Homebrew or Node) in `~/.zshenv`, `path_helper` running later in `/etc/zprofile` will reorder your `$PATH`, causing system binaries to take precedence over Homebrew binaries!

#### The Solution:
Place Homebrew and language version manager PATH exports in **`~/.zprofile`** or **`~/.zshrc`**:
```zsh
# In ~/.zprofile:
eval "$(/opt/homebrew/bin/brew shellenv)"

# Ensure deduplication in Zsh:
typeset -U path PATH
```
The declaration `typeset -U path PATH` instructs Zsh to automatically remove duplicate entries from your `$PATH` array!

---

## 2. Advanced Zsh Completion System (`compinit`)

Zsh includes the most capable completion system in Unix computing. Enable and tune it in `~/.zshrc`:

```zsh
# Enable new completion system
autoload -Uz compinit
# Only regenerate zcompdump once per day to ensure instant shell startup
if [[ -n ${ZDOTDIR:-$HOME}/.zcompdump(#qN.m+1) ]]; then
  compinit
else
  compinit -C
fi

# Visual Menu Navigation with Arrow Keys
zstyle ':completion:*' menu select

# Case-insensitive (all), partial-word, and substring completion
zstyle ':completion:*' matcher-list 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=*' 'l:|=* r:|=*'

# Colorize completion lists matching LS_COLORS
zstyle ':completion:*' list-colors "${(s.:.)LS_COLORS}"
```

---

## 3. Bulletproof Zsh History Management

By default, Zsh forgets command history when terminal sessions close. Configure persistent, shared history across tabs:

```zsh
# History file location and capacity
HISTFILE="$HOME/.zsh_history"
HISTSIZE=50000
SAVEHIST=50000

# High-Performance History Options
setopt EXTENDED_HISTORY          # Save timestamp and duration in seconds
setopt INC_APPEND_HISTORY        # Write to history immediately, not upon exit
setopt SHARE_HISTORY             # Share history across all active terminal windows
setopt HIST_EXPIRE_DUPS_FIRST    # Expire duplicate entries first when trimming
setopt HIST_IGNORE_DUPS          # Don't record an entry if it matches previous
setopt HIST_IGNORE_ALL_DUPS      # Delete old duplicate when saving a newer one
setopt HIST_FIND_NO_DUPS         # Do not display duplicates when searching
setopt HIST_IGNORE_SPACE         # Do not record command if it begins with space (privacy guard)
setopt HIST_REDUCE_BLANKS        # Remove superfluous blanks before recording
setopt HIST_VERIFY               # Don't execute immediately when using history expansion (!$)
```

---

## 4. Modern Prompt Architecture

### Option A: The Starship Cross-Shell Prompt (Recommended)
[Starship](https://starship.rs/) is an ultra-fast, cross-shell prompt written in Rust. It automatically renders Git branches, Node/Python/Go versions, battery status, and exit codes:

```bash
# Install Starship via Homebrew
brew install starship
```

Add to the bottom of `~/.zshrc`:
```zsh
eval "$(starship init zsh)"
```

### Option B: Pure Native Zsh Git Prompt (Zero Dependencies)
If you prefer zero external dependencies, use Zsh's built-in `vcs_info`:

```zsh
autoload -Uz vcs_info
precmd() { vcs_info }

# Format git info: (branch) [dirty]
zstyle ':vcs_info:git:*' formats ' %F{242}(%F{cyan}%b%F{242})%f%u'
zstyle ':vcs_info:git:*' check-for-changes true
zstyle ':vcs_info:git:*' unstagedstr '%F{yellow}*%'

# Build prompt
setopt PROMPT_SUBST
PROMPT='%F{blue}%~%f${vcs_info_msg_0_} %F{%(?.green.red)}%#%f '
```

---

## 5. Keyboard Navigation & Option-Key Word Jumps

On macOS, pressing `Option + Left Arrow` or `Option + Right Arrow` frequently inserts raw characters like `\e[1;5D` instead of jumping words.

### The Fix for `~/.zshrc`:
```zsh
# Enable standard Emacs-style keybindings
bindkey -e

# Fix Option + Left/Right Arrow word jumping in Terminal.app and iTerm2
bindkey "^[[1;5D" backward-word
bindkey "^[[1;5C" forward-word
bindkey "^[b" backward-word
bindkey "^[f" forward-word

# Fix Home and End keys
bindkey "^[[H" beginning-of-line
bindkey "^[[F" end-of-line
```
