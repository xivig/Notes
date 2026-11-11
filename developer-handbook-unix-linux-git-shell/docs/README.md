# Terminal Mastery & DevOps Documentation Hub

Welcome to the comprehensive documentation directory for **Developer Handbook: Unix, Linux, Git & Shell Scripting**.

This repository contains modular Markdown chapters, interactive single-file standalone handbooks, a searchable web documentation portal, and an automation script library.

---

## Central Documentation Portals & Handbooks

| Resource | Read on GitHub (Markdown) | Interactive HTML App | Description |
|---|---|---|---|
| **Linux & Unix Shell Developer Handbook** | [**`unix-linux/` Guide**](unix-linux/README.md) | [Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/Linux_Unix_Shell_Developer_Handbook.html) &bull; [Local](../Linux_Unix_Shell_Developer_Handbook.html) | 39 in-depth chapters, Light/Dark themes, 6 domain tracks, and the complete Bourne shell Deep Dive Tutorial. |
| **Git & GitHub Practical Developer's Guide** | [**`git/` Guide**](git/README.md) | [Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/Git_GitHub_Complete_Tutorial.html) &bull; [Local](../Git_GitHub_Complete_Tutorial.html) | 22 comprehensive chapters, 5 domain tracks, disaster recovery labs with `git reflog`, and PR workflows. |
| **HTML5 & Modern Web Architecture Handbook** | [**`html/` Guide**](html/README.md) | [Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/HTML5_Web_Developer_Handbook.html) &bull; [Local](../HTML5_Web_Developer_Handbook.html) | 15 in-depth chapters, 5 domain tracks, live code sandbox, Web Components, and WCAG 2.2. |
| **Rigorous Shell Scripting Masterclass** | [**`shell-scripting/` Guide**](shell-scripting/README.md) | [Handbook Ch 17–23](../Linux_Unix_Shell_Developer_Handbook.html#ch17) | 12 progressive steps: strict mode, subshells, arrays, traps, and defensive programming practices. |
| **Production Shell Scripts Suite** | [**`shell-scripts-repo/`**](../shell-scripts-repo/README.md) | [Scripts Architecture Guide](scripts/README.md) &bull; [QA Test Runner](../shell-scripts-repo/test_all_scripts.sh) | 25 battle-tested, defensive automation scripts with `set -euo pipefail`, `--dry-run`, and automated QA suite. |
| **Interactive Documentation Portal** | [**Docs Hub Index**](README.md) | [Launch Portal ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/documentation/index.html) &bull; [Local](../documentation/index.html) | Unified, searchable desktop and mobile web portal indexing all terminal guides and cheat sheets. |

---

## Modular Documentation Tracks (`docs/`)

```
docs/
├── git/                  # Git version control mastery (5 chapters)
├── unix-linux/           # Unix & Linux terminal fundamentals (6 chapters)
├── shell-scripting/      # All-in-one rigorous shell scripting handbook (1 comprehensive guide)
├── html/                 # HTML5 semantics, forms, media & accessibility (7 chapters)
├── macos/                # macOS developer setup & Darwin architecture (6 chapters)
└── scripts/              # 24 shell utility scripts reference & guide
```

---

### Track 1: Git Version Control ([`docs/git/`](git/README.md))

*Paired with the standalone single-page handbook: [Git_GitHub_Complete_Tutorial.html](../Git_GitHub_Complete_Tutorial.html)*

| Chapter | Document | Topics Covered |
|---|---|---|
| **01** | [Fundamentals & Setup](git/01-git-fundamentals-and-setup.md) | Distributed VCS, config, `init.defaultBranch`, ED25519 SSH keys, `.git` internals |
| **02** | [Everyday Workflow](git/02-essential-git-workflow.md) | 3 states, staging (`add -p`), commits, `.gitignore`, cached untracking, logs |
| **03** | [Branching & Remotes](git/03-branching-merging-and-remotes.md) | `switch`, fast-forward vs 3-way, tracking branches, `push -u`, `stash` |
| **04** | [Troubleshooting & Recovery](git/04-troubleshooting-and-common-errors.md) | 12 critical errors, detached HEAD, non-fast-forward push, reflog disaster rescue |
| **05** | [Cheat Sheet & Power Tricks](git/05-git-cheatsheet-and-tricks.md) | High-velocity aliases, `git lg` ASCII graph, pickaxe search (`-S`), `git blame` |

---

### Track 2: Unix & Linux Systems ([`docs/unix-linux/`](unix-linux/README.md))

*Paired with the standalone single-page handbook: [Linux_Unix_Shell_Developer_Handbook.html](../Linux_Unix_Shell_Developer_Handbook.html)*

| Chapter | Document | Topics Covered |
|---|---|---|
| **01** | [Terminal & File Basics](unix-linux/01-terminal-and-file-basics.md) | Shell architecture, FHS hierarchy, `cd` navigation, directory stacks, `find` |
| **02** | [Environment Variables](unix-linux/02-environment-variables-mastery.md) | Export, scope, `$PATH` discovery, parameter expansion (`${var:-default}`) |
| **03** | [Prompt & History](unix-linux/03-customizing-bash-prompt-and-history.md) | Custom `PS1` prompts, git branch in prompt, `HISTCONTROL`, privacy guards |
| **04** | [Shell Scripting](unix-linux/04-bash-shell-scripting-guide.md) | Shebangs, `set -euo pipefail`, positional parameters, `[[ ]]` tests, loops |
| **05** | [Text Processing & Vim](unix-linux/05-text-processing-awk-sed-vim.md) | Pipelines, `awk` analytics, `sed` stream edits, `xargs -0`, Vim modal editing |
| **06** | [Cheat Sheet & Tricks](unix-linux/06-unix-linux-cheatsheet-and-tricks.md) | 40+ power one-liners, process management, signals table, networking tools |

---

### Track 3: Shell Scripting Masterclass ([`docs/shell-scripting/`](shell-scripting/README.md))

* [Master Shell Scripting Guide](shell-scripting/README.md) &mdash; A rigorous, 25 KB deep dive into modern Bash programming, defensive error trapping, subshell isolation, functions with `local` scope, associative arrays, signal traps, and production capstone scripts.

---

### Track 4: HTML5 Standards & Web Architecture ([`docs/html/`](html/README.md))

| Chapter | Document | Topics Covered |
|---|---|---|
| **01** | [Document Architecture](html/01-html5-foundations-and-document-structure.md) | `<!DOCTYPE>`, head metadata, UTF-8, viewport, OpenGraph |
| **02** | [Semantic Landmarks](html/02-semantic-html5-and-page-layout.md) | `<header>`, `<main>`, `<article>`, `<nav>`, `<aside>`, `<footer>` |
| **03** | [Media & Responsive Images](html/03-links-media-and-responsive-images.md) | `<picture>`, `srcset`, `sizes`, lazy loading, WebP/AVIF |
| **04** | [Modern Forms](html/04-forms-input-types-and-validation.md) | Input types, native HTML5 regex validation, accessible labels |
| **05** | [Tables & Dialogs](html/05-tables-embedded-content-and-dialogs.md) | Accessible `<table>`, native `<dialog>` modals, `<details>` |
| **06** | [Accessibility & SEO](html/06-accessibility-seo-and-best-practices.md) | WCAG standards, ARIA roles, structured schema.org data |
| **07** | [Cheat Sheet & Recipes](html/07-html5-cheatsheet-and-code-recipes.md) | Production boilerplates, CSS integration, clean code patterns |

---

### Track 5: macOS Darwin Systems Engineering ([`docs/macos/`](macos/README.md))

| Chapter | Document | Topics Covered |
|---|---|---|
| **01** | [Xcode, Apple Silicon & Homebrew](macos/01-macos-terminal-setup.md) | Xcode CLI tools, Apple Silicon ARM64, Rosetta 2 emulation, Homebrew `/opt/homebrew`, `brew services` |
| **02** | [Zsh Environment & Shell Mastery](macos/02-zsh-environment-and-shell-mastery.md) | Startup lifecycle, `path_helper` deduplication, `compinit` completion cache, persistent history, Starship prompt |
| **03** | [Darwin Architecture & Launchd](macos/03-darwin-system-architecture-and-launchd.md) | XNU kernel (Mach/BSD), `lsof` port hunting, `vm_stat` memory, `launchd` XML plist daemons, `caffeinate` |
| **04** | [APFS Filesystem & Security](macos/04-apfs-filesystem-security-and-permissions.md) | APFS CoW cloning (`cp -c`), Git case renaming, Gatekeeper quarantine removal (`xattr -d`), SIP & TCC |
| **05** | [BSD vs. GNU Portability Guide](macos/05-bsd-vs-gnu-portability-guide.md) | Incompatibility matrix (`sed -i ''`, `stat -f%z`, `readlink`), universal cross-platform patterns, GNU coreutils |
| **06** | [Power Cheatsheet & Productivity](macos/06-macos-developer-cheatsheet-and-power-tricks.md) | `pbcopy`/`pbpaste`, `open -a`, `mdfind` Spotlight CLI, `sips` image conversion, DNS flush, 35 power one-liners |

---

### Track 6: Shell Utility Scripts & Automation Suite ([`docs/scripts/`](scripts/README.md))

| Guide | Document | Topics Covered |
|---|---|---|
| **01** | [Production Capstones Guide](scripts/01-production-capstones-guide.md) | Host health diagnostics, Awk log analytics, batch file organizer with reversible `--rollback` |
| **02** | [System & CLI Automation Guide](scripts/02-system-and-file-automation-guide.md) | Strict mode templates, argument parsing, NUL stream safety (`find -print0`), scaffolding |
| **03** | [Git Workflow Automation Guide](scripts/03-git-workflow-automation-guide.md) | Global setup, ED25519 keygen, aliases, interactive sandbox lab, morning sync |
| **04** | [Historical Bourne & POSIX Guide](scripts/04-historical-bourne-and-posix-guide.md) | V7 Bourne shell spacing rules, non-empty file tests (`-s`), POSIX `/bin/sh` standards |
| **05** | [Testing, Linting & CI/CD Framework](scripts/05-testing-linting-and-ci-framework.md) | Automated test harness (`test_all_scripts.sh`), ShellCheck static analysis, GitHub Actions |
| **All** | [Complete 25-Script Catalog](scripts/01-utility-scripts-guide.md) | Master flag reference and execution examples for all 25 production scripts |
