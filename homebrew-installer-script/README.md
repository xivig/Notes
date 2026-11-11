# macOS Developer Workstation Bootstrap

[![macOS](https://img.shields.io/badge/macOS-12%20%7C%2013%20%7C%2014%20%7C%2015-black?logo=apple&logoColor=white)](https://apple.com/macos)
[![Architecture](https://img.shields.io/badge/Architecture-Apple%20Silicon%20(M1--M4)%20%7C%20Intel%20x86__64-blue)](https://brew.sh)
[![Homebrew](https://img.shields.io/badge/Homebrew-4.x%2B-orange?logo=homebrew&logoColor=white)](https://brew.sh)
[![Shell](https://img.shields.io/badge/Shell-Bash%20%7C%20Zsh-4EAA25?logo=gnu-bash&logoColor=white)](https://zsh.sourceforge.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An automated, robust, and idempotent shell script to bootstrap a pristine macOS machine into a full-fledged modern development environment.

Replaces deprecated legacy scripts (such as old Ruby installers and defunct `brew cask` invocations) with modern Homebrew standards, complete Apple Silicon (`/opt/homebrew`) and Intel (`/usr/local`) detection, persistent shellenv integration, and customizable software manifests.

---

## Highlights

- **Native Architecture Awareness**: Automatically configures Apple Silicon (`/opt/homebrew`) or Intel (`/usr/local`) Homebrew prefixes and adds `brew shellenv` to `~/.zprofile`.
- **Xcode Command Line Tools Check**: Detects missing developer tools and triggers non-blocking system installation dialogs.
- **Modern CLI Stack**: Equips your terminal with high-performance modern developer replacements (`ripgrep`, `fd`, `fzf`, `bat`, `eza`, `jq`, `yq`, `gh`).
- **Enhanced Shell Experience**: Configures Homebrew-managed Zsh with completions, syntax highlighting, autosuggestions, and optional Oh My Zsh.
- **Runtimes & SDKs**: Optional automated installation of Node.js, Python 3, Go, and PHP.
- **Desktop Application Suite**: Automated cask installation for industry-standard tools (VS Code, iTerm2, Docker, Postman, Chrome, Firefox, DBeaver, Rectangle).
- **Headless / CI Capable**: Supports interactive prompts for selective installs or non-interactive deployment via environment variables.
- **Defensive Shell Design**: Built with `set -Eeuo pipefail` and clean modular helper functions.

---

## Quick Start

### 1. Clone & Run Interactively

Clone the repository and run the setup script:

```bash
git clone https://github.com/xivig/homebrew-installer-git-script.git
cd homebrew-installer-git-script
chmod +x homebrew.sh
./homebrew.sh
```

The script will guide you through interactive prompts for optional language runtimes, GUI desktop applications, default shell updates, and Oh My Zsh setup.

### 2. One-Liner Execution

Run directly via `curl` in your macOS Terminal:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/xivig/homebrew-installer-git-script/master/homebrew.sh)"
```

---

## Non-Interactive / Automated Setup

To run in automated provisioning pipelines, MDM setups, or unattended setups without prompts, pass environment variables:

```bash
INSTALL_CASKS=yes \
INSTALL_LANGUAGES=yes \
SET_DEFAULT_SHELL=yes \
INSTALL_OH_MY_ZSH=yes \
./homebrew.sh
```

### Supported Configuration Flags

| Variable | Values | Default | Purpose |
|---|---|---|---|
| `INSTALL_LANGUAGES` | `yes` / `no` | Prompt (`N`) | Installs Node.js, Python 3, Go, and PHP via Homebrew formula |
| `INSTALL_CASKS` | `yes` / `no` | Prompt (`N`) | Installs VS Code, iTerm2, Chrome, Firefox, Docker, Postman, Rectangle, DBeaver |
| `SET_DEFAULT_SHELL` | `yes` / `no` | Prompt (`N`) | Adds Homebrew Zsh to `/etc/shells` and switches current user login shell |
| `INSTALL_OH_MY_ZSH` | `yes` / `no` | Prompt (`N`) | Installs the Oh My Zsh framework in unattended mode |

---

## Software Manifest

### 1. Core Developer CLI Utilities

| Tool | Description | Modern Replacement For |
|---|---|---|
| `git` | Distributed version control system | System Git |
| `gh` | Official GitHub command line tool | Browser UI |
| `ripgrep` (`rg`) | Blazing fast line-oriented search tool | `grep` |
| `fd` | Fast, user-friendly alternative to find | `find` |
| `fzf` | General-purpose command-line fuzzy finder | Manual scanning |
| `bat` | Cat clone with syntax highlighting and Git integration | `cat` |
| `eza` | Modern, maintained replacement for ls | `ls` |
| `jq` & `yq` | Command-line JSON and YAML/XML processors | Sed / Awk hacks |
| `tree` | Recursive directory visualizer | Plain `ls -R` |
| `wget` | Network retrieval utility | `curl -O` |
| `shellcheck` & `shfmt` | Static analysis and formatting for shell scripts | Manual linting |

### 2. Shell & Terminal Stack

* **`zsh`**: Latest Homebrew-maintained Zsh shell.
* **`zsh-completions`**: Additional tab-completion definitions.
* **`zsh-autosuggestions`**: Fish-like autosuggestions based on command history.
* **`zsh-syntax-highlighting`**: Real-time syntax validation on the command line.
* **Oh My Zsh** (Optional): Extensible plugin and theme management framework.

### 3. Programming Language Runtimes (Optional)

* **Node.js**: Modern JavaScript runtime (includes `npm`).
* **Python**: Python 3.x runtime (includes `pip`).
* **Go**: Google Go programming language compiler and toolchain.
* **PHP**: Modern PHP CLI and runtime environment.

### 4. Desktop Applications via Cask (Optional)

* **Code & Terminals**: Visual Studio Code, iTerm2, Android Studio.
* **Browsers**: Google Chrome, Mozilla Firefox.
* **DevOps & APIs**: Docker Desktop, Postman.
* **Database & Utilities**: DBeaver Community (Universal SQL GUI), Rectangle (Window tiling manager).

---

## Post-Installation Verification & Maintenance

After running the script, open a fresh Terminal window to ensure all PATH variables and environment configurations are reloaded, then run:

```bash
# 1. Verify Homebrew health
brew doctor

# 2. Check installed versions
git --version
zsh --version
node -v 2>/dev/null || echo "Node not selected"
python3 --version 2>/dev/null || echo "Python not selected"

# 3. Update all formulas and desktop casks at any time
brew update && brew upgrade && brew cleanup
```

---

## Troubleshooting

### `xcode-select: error: tool 'xcode-select' requires Xcode or CLT`
Run manual CLT installation in Terminal:
```bash
xcode-select --install
```
Follow the graphical installer prompt to completion, then re-run `./homebrew.sh`.

### `brew: command not found` after opening a new shell
If running on Apple Silicon (M1/M2/M3/M4), ensure your `~/.zprofile` contains the Homebrew environment initialization:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### Password Prompt for `/etc/shells`
Setting Homebrew's modern Zsh as your default login shell requires adding `/opt/homebrew/bin/zsh` (or `/usr/local/bin/zsh`) to `/etc/shells`. The script will request administrator password via `sudo` solely for this registration.

---

## License

This project is open-source under the [MIT License](LICENSE).
