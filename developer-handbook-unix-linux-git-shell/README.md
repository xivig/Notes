# Developer Handbook: Unix, Linux, Git & Shell Scripting

[![Git Version](https://img.shields.io/badge/git-2.50+-blue.svg)](https://git-scm.com/)
[![Shell](https://img.shields.io/badge/shell-bash%20%7C%20zsh%20%7C%20posix-green.svg)](https://www.gnu.org/software/bash/)
[![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20macOS%20%7C%20Windows-lightgrey.svg)]()
[![Documentation](https://img.shields.io/badge/docs-interactive%20portal%20%26%20handbooks-purple.svg)](documentation/index.html)
[![License](https://img.shields.io/badge/license-MIT-orange.svg)](LICENSE)

An exhaustive, battle-tested engineering reference suite, interactive single-file documentation handbooks, modular markdown curriculum, and production shell automation library for modern developers, DevOps practitioners, and systems engineers.

---

## Central Documentation Resources & Online Guides

Read directly on GitHub as native Markdown guides, or launch the interactive single-page applications:

| Documentation Resource | Read Online on GitHub (Markdown) | Interactive HTML App | Highlights |
| :--- | :--- | :--- | :--- |
| **Linux & Unix Systems Handbook** | [**`docs/unix-linux/`**](docs/unix-linux/README.md) &bull; [Quick Links](#track-1-unix--linux-systems-engineering) | [Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/Linux_Unix_Shell_Developer_Handbook.html) &bull; [Local](Linux_Unix_Shell_Developer_Handbook.html) | **39 In-Depth Chapters**, 6 domain tracks, 48 reference tables, 40 copyable code blocks, and the Bourne shell Deep Dive Tutorial. |
| **Git & GitHub Practical Developer's Guide** | [**`docs/git/`**](docs/git/README.md) &bull; [Quick Links](#track-2-git-version-control--github-workflow) | [Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/Git_GitHub_Complete_Tutorial.html) &bull; [Local](Git_GitHub_Complete_Tutorial.html) | **22 Comprehensive Chapters**, 5 domain tracks, reflog disaster recovery labs, PR reviews, and merge conflict resolution. |
| **Rigorous Shell Scripting Masterclass** | [**`docs/shell-scripting/`**](docs/shell-scripting/README.md) &bull; [Quick Links](#track-3-the-rigorous-shell-scripting-masterclass) | [Interactive Ch 17–23 ↗](Linux_Unix_Shell_Developer_Handbook.html#ch17) &bull; [Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/Linux_Unix_Shell_Developer_Handbook.html#ch17) | **12 Progressive Steps**: strict mode (`set -euo pipefail`), subshell isolation, regex parameter expansions, and signal traps. |
| **Production Automation Scripts Suite** | [**`shell-scripts-repo/`**](shell-scripts-repo/README.md) &bull; [Quick Links](#track-4-production-shell-scripts-library) | [Architecture Guide ↗](docs/scripts/README.md) &bull; [QA Runner](shell-scripts-repo/test_all_scripts.sh) | **25 Production Scripts**: host diagnostics, log analytics, safe batch processors, Git automation, and automated test harness. |
| **macOS Darwin Terminal Setup** | [**`docs/macos/`**](docs/macos/README.md) &bull; [Quick Links](#track-5-macos-darwin-terminal-setup--architecture) | [Setup Guide ↗](docs/macos/01-macos-terminal-setup.md) | **6 Comprehensive Chapters**: Apple Silicon (M1–M4), Zsh lifecycle, launchd daemons, APFS CoW, BSD vs GNU portability, and power tricks. |
| **HTML5 & Modern Web Architecture Handbook** | [**`docs/html/`**](docs/html/README.md) &bull; [Quick Links](#track-6-html5-standards--web-architecture) | [Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/HTML5_Web_Developer_Handbook.html) &bull; [Local](HTML5_Web_Developer_Handbook.html) | **15 In-Depth Chapters**, 5 domain tracks, real-time live code sandbox, Web Components, and WCAG 2.2 accessibility. |
| **Interactive Documentation Portal** | [**`docs/README.md`**](docs/README.md) | [Launch Portal ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/documentation/index.html) &bull; [Local](documentation/index.html) | Central searchable documentation hub with live keyword search (`/`), cheat sheets, and mobile drawer. |

---

## Read Online on GitHub: Full Tutorial Curriculum

Click any chapter below to read the tutorial directly on GitHub in native Markdown:

### Track 1: Unix & Linux Systems Engineering ([`docs/unix-linux/`](docs/unix-linux/README.md))

* **[Chapter 01: Terminal & File Basics](docs/unix-linux/01-terminal-and-file-basics.md)** &mdash; Shell architecture, FHS directory hierarchy, directory navigation (`cd -`, `pushd`/`popd`), and `find` traversal.
* **[Chapter 02: Environment Variables Mastery](docs/unix-linux/02-environment-variables-mastery.md)** &mdash; Export mechanics, variable scoping, `$PATH` discovery, and parameter expansion patterns (`${var:-default}`).
* **[Chapter 03: Customizing Bash Prompt & History](docs/unix-linux/03-customizing-bash-prompt-and-history.md)** &mdash; Custom `PS1` prompts, git branch in prompt, `HISTCONTROL`, and privacy safeguards.
* **[Chapter 04: Bash Shell Scripting Guide](docs/unix-linux/04-bash-shell-scripting-guide.md)** &mdash; Shebangs, `set -euo pipefail`, positional parameters, modern `[[ ... ]]` conditionals, and loop structures.
* **[Chapter 05: Text Processing (Awk, Sed & Vim)](docs/unix-linux/05-text-processing-awk-sed-vim.md)** &mdash; Stream analytics with `awk`, in-place editing with `sed`, `xargs -0` safety, and Vim modal editing.
* **[Chapter 06: Unix/Linux Cheatsheet & Power Tricks](docs/unix-linux/06-unix-linux-cheatsheet-and-tricks.md)** &mdash; 40+ high-frequency one-liners, process diagnostics (`htop`, `lsof`), and Unix signal tables.

---

### Track 2: Git Version Control & GitHub Workflow ([`docs/git/`](docs/git/README.md))

* **[Chapter 01: Git Fundamentals & Setup](docs/git/01-git-fundamentals-and-setup.md)** &mdash; Distributed version control, global configuration (`user.name`, `init.defaultBranch`), ED25519 SSH keys, and `.git` internals.
* **[Chapter 02: Essential Everyday Git Workflow](docs/git/02-essential-git-workflow.md)** &mdash; The Three Trees, staging (`git add -p`), atomic commits, `.gitignore`, cached untracking, and log inspection.
* **[Chapter 03: Branching, Merging & Remote Repositories](docs/git/03-branching-merging-and-remotes.md)** &mdash; Branch navigation with `git switch`, 3-way merges vs fast-forward, tracking remotes, and `git stash`.
* **[Chapter 04: Troubleshooting & Disaster Recovery](docs/git/04-troubleshooting-and-common-errors.md)** &mdash; 12 critical errors, detached HEAD, non-fast-forward push resolution, and time travel with `git reflog`.
* **[Chapter 05: Git Cheatsheet & Power Tricks](docs/git/05-git-cheatsheet-and-tricks.md)** &mdash; High-velocity aliases (`git lg` graph), pickaxe search (`git log -S`), `git blame`, and clean exports.

---

### Track 3: The Rigorous Shell Scripting Masterclass ([`docs/shell-scripting/`](docs/shell-scripting/README.md))

* **[The Master Shell Scripting Handbook](docs/shell-scripting/README.md)** &mdash; A complete 25 KB masterclass covering:
  1. Execution model & shebang portability
  2. Defensive Strict Mode (`set -euo pipefail`, `IFS=$'\n\t'`)
  3. Variables, types & parameter expansion tricks
  4. CLI argument handling & options parsing (`getopts`)
  5. Conditionals, tests (`[[ ]]`) & pattern matching
  6. Loops, streams & NUL-delimited iterations
  7. I/O redirection, heredocs & process substitution
  8. Modular functions & `local` variable scoping
  9. Signals, atomic traps (`trap cleanup EXIT`) & rollbacks
  10. Arrays & associative arrays (hashmaps)
  11. Production script architectures & capstones
  12. Top 15 anti-patterns & ShellCheck checklist

---

### Track 4: Production Shell Scripts Library ([`shell-scripts-repo/`](shell-scripts-repo/README.md))

* **[Shell Scripts Reference & Flag Manual](shell-scripts-repo/README.md)** &mdash; Comprehensive documentation and CLI parameters for all 25 production automation scripts.
* **[01: Production Capstones Architectural Guide](docs/scripts/01-production-capstones-guide.md)** &mdash; Multi-tier host diagnostics, Awk log analytics, and reversible batch organizer with rollback mode.
* **[02: System, File & CLI Automation Guide](docs/scripts/02-system-and-file-automation-guide.md)** &mdash; Strict mode templates, argument parsing, NUL stream safety (`find -print0`), and project scaffolding.
* **[03: Git & GitHub Workflow Automation Guide](docs/scripts/03-git-workflow-automation-guide.md)** &mdash; Automated setup, ED25519 key generation, developer aliases, practice lab, and daily sync.
* **[04: Historical Bourne Shell & POSIX Guide](docs/scripts/04-historical-bourne-and-posix-guide.md)** &mdash; V7 Bourne shell spacing rules, `-s` file tests, and POSIX portability standards.
* **[05: Testing, Linting & CI/CD Framework Guide](docs/scripts/05-testing-linting-and-ci-framework.md)** &mdash; Automated test harness ([`test_all_scripts.sh`](shell-scripts-repo/test_all_scripts.sh)), ShellCheck linting, and GitHub Actions CI.
* **[Complete 25-Script Catalog](docs/scripts/01-utility-scripts-guide.md)** &mdash; Master matrix of tools, commands, and flag examples.

---

### Track 5: macOS Darwin Terminal Setup & Architecture ([`docs/macos/`](docs/macos/README.md))

* **[Chapter 01: Xcode Tools, Apple Silicon Architecture & Homebrew](docs/macos/01-macos-terminal-setup.md)** &mdash; Xcode CLI tools (`xcode-select`, `xcrun`), Apple Silicon ARM64 vs Intel x86_64, Rosetta 2 emulation (`arch -x86_64`), Homebrew `/opt/homebrew` vs `/usr/local`, and `brew services`.
* **[Chapter 02: Zsh Environment & Shell Mastery](docs/macos/02-zsh-environment-and-shell-mastery.md)** &mdash; macOS Zsh startup lifecycle (`.zprofile` vs `.zshrc`), path_helper deduplication (`typeset -U path PATH`), `compinit` completion cache, persistent history, and Starship prompt.
* **[Chapter 03: Darwin System Architecture, Launchd & Process Diagnostics](docs/macos/03-darwin-system-architecture-and-launchd.md)** &mdash; XNU hybrid kernel (Mach/BSD), `lsof` port hunting (`kill -9 $(lsof -ti :3000)`), virtual memory (`vm_stat`), `launchd` XML plist automation, and `caffeinate`.
* **[Chapter 04: APFS Filesystem, Extended Attributes & Security](docs/macos/04-apfs-filesystem-security-and-permissions.md)** &mdash; APFS Copy-on-Write clones (`cp -c`), case-insensitivity Git pitfalls (`git mv -f`), Gatekeeper quarantine removal (`xattr -d com.apple.quarantine`), and SIP/TCC permissions.
* **[Chapter 05: BSD vs. GNU CLI Deep Dive & Portability](docs/macos/05-bsd-vs-gnu-portability-guide.md)** &mdash; Incompatibility matrix (`sed -i ''`, `stat -f%z`, `readlink`), universal cross-platform patterns, and configuring Homebrew GNU Coreutils.
* **[Chapter 06: macOS Power Cheatsheet, System Bridge & Productivity](docs/macos/06-macos-developer-cheatsheet-and-power-tricks.md)** &mdash; `pbcopy`/`pbpaste` pipelines, `open -a`, Spotlight CLI (`mdfind`), scriptable image conversion (`sips`), DNS flushing, and 35 high-velocity one-liners.

---

### Track 6: HTML5 Standards & Web Architecture ([`docs/html/`](docs/html/README.md))

* **[Chapter 01: Document Foundations](docs/html/01-html5-foundations-and-document-structure.md)** &mdash; `<!DOCTYPE>`, head metadata, UTF-8, viewport, and OpenGraph sharing tags.
* **[Chapter 02: Semantic Landmarks](docs/html/02-semantic-html5-and-page-layout.md)** &mdash; `<header>`, `<main>`, `<article>`, `<nav>`, `<aside>`, `<footer>`.
* **[Chapter 03: Media & Responsive Images](docs/html/03-links-media-and-responsive-images.md)** &mdash; `<picture>`, `srcset`, `sizes`, native lazy loading, WebP/AVIF formats.
* **[Chapter 04: Modern Forms](docs/html/04-forms-input-types-and-validation.md)** &mdash; Native HTML5 form validation, accessible label associations, regex patterns.
* **[Chapter 05: Accessible Tables & Dialogs](docs/html/05-tables-embedded-content-and-dialogs.md)** &mdash; `<table>` ARIA standards, native `<dialog>` modals, `<details>`.
* **[Chapter 06: Accessibility (WCAG) & SEO](docs/html/06-accessibility-seo-and-best-practices.md)** &mdash; WCAG contrast standards, ARIA landmark roles, Schema.org JSON-LD.
* **[Chapter 07: Cheat Sheet & Code Recipes](docs/html/07-html5-cheatsheet-and-code-recipes.md)** &mdash; Production boilerplates, CSS integration patterns, and code recipes.

---

## Repository Directory Map

```text
developer-handbook-unix-linux-git-shell/
├── Linux_Unix_Shell_Developer_Handbook.html  # 39-chapter single-page Linux & Unix handbook
├── Git_GitHub_Complete_Tutorial.html         # 22-chapter single-page Git & GitHub guide
├── HTML5_Web_Developer_Handbook.html         # 15-chapter single-page HTML5 architecture handbook
│
├── documentation/                            # Unified interactive web portal
│   ├── index.html                            # Portal application shell with search
│   ├── styles.css                            # Glassmorphism styling and themes
│   └── app.js                                # Live search, drawer, and copy engine
│
├── docs/                                     # Modular Markdown documentation library (26 files)
│   ├── README.md                             # Central index mapping all 6 learning tracks
│   ├── git/                                  # Git version control mastery (5 chapters)
│   ├── unix-linux/                           # Unix & Linux fundamentals (6 chapters)
│   ├── shell-scripting/                      # Rigorous shell scripting masterclass (1 master guide)
│   ├── html/                                 # HTML5 semantic architecture (7 chapters)
│   ├── macos/                                # macOS developer setup & Darwin architecture (6 chapters)
│   └── scripts/                              # 24 utility scripts architectural guide
│
├── shell-scripts-repo/                       # 25 production-grade automation scripts
│   ├── capstone1_system_health.sh            # Host & service diagnostic monitor
│   ├── capstone2_log_analyzer.sh             # Nginx/Apache access log analyzer via AWK
│   ├── capstone3_batch_organizer.sh          # Batch file organizer with rollback manifest
│   ├── deploy_service.sh                     # Service deployment boilerplate with strict mode
│   ├── parse_arguments.sh                    # CLI option parser (short/long flags, validation)
│   ├── safe_file_batch.sh                    # NUL-delimited safe file processor
│   ├── scaffold_website.sh                   # Modern HTML5/CSS/JS project scaffolder
│   ├── directory_inventory.sh                # Structured TSV directory inventory exporter
│   ├── copy_file_each_dir.sh                 # Safe recursive file propagator
│   ├── loops_showcase.sh                     # 7 modern shell iteration paradigms
│   ├── conditional_flow.sh                   # User input validation & state persistence
│   ├── git_setup_env.sh                      # Automated Git identity & line-ending setup
│   ├── git_ssh_keygen.sh                     # ED25519 SSH key generator & agent setup
│   ├── git_aliases_setup.sh                  # Productivity aliases (`git lg` graph, etc.)
│   ├── git_sandbox_lab.sh                    # 10-step practice playground repository builder
│   ├── git_daily_sync.sh                     # Morning remote sync and branch pruning
│   ├── bourne_password_auth.sh               # Historic Bourne shell password authentication
│   ├── bourne_age_tracker.sh                 # Historic Bourne shell file persistence tracker
│   └── README.md                             # Comprehensive script manual & flag reference
│
├── .editorconfig                             # Formatting rules
├── .gitignore                                # Git ignore file
├── CONTRIBUTING.md                           # Developer contribution guidelines
├── LICENSE                                   # MIT open source license
├── package.json                              # Package metadata & quick scripts
└── README.md                                 # This master repository portal
```

---

## Quick Start & Usage

### 1. Cloning the Repository
```bash
git clone https://github.com/xivig/xivig-all-in-one-notes.git
cd xivig-all-in-one-notes/developer-handbook-unix-linux-git-shell
```

### 2. Launching Interactive Handbooks in Browser
Both single-file handbooks run 100% offline with zero build steps or runtime dependencies:
```bash
# macOS
open Linux_Unix_Shell_Developer_Handbook.html
open Git_GitHub_Complete_Tutorial.html
open HTML5_Web_Developer_Handbook.html
open documentation/index.html

# Linux
xdg-open Linux_Unix_Shell_Developer_Handbook.html
xdg-open Git_GitHub_Complete_Tutorial.html

# Windows (PowerShell)
Start-Process Linux_Unix_Shell_Developer_Handbook.html
Start-Process Git_GitHub_Complete_Tutorial.html
```

Or run via npm scripts:
```bash
npm run docs        # Opens documentation portal
npm run handbook    # Opens Linux & Unix Developer Handbook
npm run git-guide   # Opens Git & GitHub Complete Tutorial
npm run html-guide  # Opens HTML5 Modern Web Developer Handbook
```

### 3. Running Production Shell Scripts
All scripts in `shell-scripts-repo/` are standalone, executable, and portable:
```bash
cd shell-scripts-repo

# Run host health diagnostics
chmod +x capstone1_system_health.sh && ./capstone1_system_health.sh

# Parse web server logs
chmod +x capstone2_log_analyzer.sh && ./capstone2_log_analyzer.sh /var/log/nginx/access.log

# Preview batch file organization safely
chmod +x capstone3_batch_organizer.sh && ./capstone3_batch_organizer.sh --dry-run ~/Downloads

# Set up Git high-velocity aliases (git lg, git s, git co, etc.)
chmod +x git_aliases_setup.sh && ./git_aliases_setup.sh
```

---

## Engineering Standards

* **Portable Interpreters:** Scripts use `#!/usr/bin/env bash` (or `#!/bin/sh` for POSIX) to dynamically locate binaries via `PATH`.
* **Defensive Strict Mode:** Production scripts enforce `set -euo pipefail` to eliminate silent failures.
* **Whitespace & Globbing Invariants:** All variable expansions (`"$VAR"`) and path references are double-quoted.
* **Space-Immune File Streaming:** Bulk operations use NUL-delimited streams (`find -print0 | while IFS= read -r -d ''`).
* **Cross-Platform Compatibility:** Explicitly bridges Darwin (macOS/BSD) and GNU/Linux behavior (`core.autocrlf`, `sed -i ''`, `stat`, `readlink`).

---

## License

This project is licensed under the [MIT License](LICENSE).
