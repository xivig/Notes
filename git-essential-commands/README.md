# Git Essential Commands: The Rigorous All-in-One Developer Manual

[![Git Version](https://img.shields.io/badge/Git-2.40%2B-F05032?logo=git&logoColor=white)](https://git-scm.com/)
[![Architecture](https://img.shields.io/badge/Architecture-DAG%20%26%20Three%20Trees-blue?logo=diagramsdotnet)](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Format](https://img.shields.io/badge/Guide-All--in--One%20Complete-green.svg)](#table-of-contents)
[![Companion: Cheatsheet](https://img.shields.io/badge/Companion-CHEATSHEET.md-orange.svg)](CHEATSHEET.md)
[![Tooling: Aliases](https://img.shields.io/badge/Tooling-git--aliases.sh-purple.svg)](git-aliases.sh)

> **The definitive, battle-tested Git reference manual for software engineers, systems programmers, and DevOps architects.**  
> Moving beyond blind command memorization to master Git's internal object model, cryptographic DAG architecture, modern porcelain commands (`switch`, `restore`, `sparse-checkout`, `worktree`), atomic commit discipline, collaborative branch integration, and bulletproof disaster recovery via `git reflog`.

---

## ⚡ Quick Navigation & Companions

- 📄 **[Developer Desk Cheatsheet (CHEATSHEET.md)](CHEATSHEET.md)** — Ultra-condensed one-pager for fast daily lookups and copy-pasting.
- 🚀 **[Automated Aliases Script (git-aliases.sh)](git-aliases.sh)** — One-command installer for modern, high-velocity Git terminal aliases.
- 🛠️ **[Untrack & Cache Cleanup Utility (RemoveFileFromRepository.sh)](RemoveFileFromRepository.sh)** — Safely untrack files (.env, node_modules, .DS_Store, Thumbs.db) without deleting local copies.
- 🤖 **[Interactive Commit & Push Workflow (git-script.sh)](git-script.sh)** — Robust script for atomic staging, branch verification, commit confirmation, and upstream pushing.
- ⚡ **[Automated Batch Commit Script (gitBatchScript.sh)](gitBatchScript.sh)** — Fast single-command staging, diff checking, dynamic branch resolution, and upstream push.
- 📖 **[Read Online Guide on GitHub (Markdown)](https://github.com/xivig/developer-handbook-unix-linux-git-shell/tree/master/docs/git)** — 22-chapter comprehensive curriculum rendered natively on GitHub.
- 🌐 **[Launch Interactive App (Live in Browser) ↗](https://htmlpreview.github.io/?https://github.com/xivig/developer-handbook-unix-linux-git-shell/blob/master/Git_GitHub_Complete_Tutorial.html)** — Live interactive handbook with instant search, dark/light themes, and track filters.

---

## 📑 Table of Contents

1. [Architectural Foundations & Mental Model](#1-architectural-foundations-mental-model)
   - [Directed Acyclic Graphs (DAG) & Content-Addressable Storage](#11-directed-acyclic-graphs-dag-content-addressable-storage)
   - [The Four Logical States of Git](#12-the-four-logical-states-of-git)
   - [Anatomy of the `.git` Directory](#13-anatomy-of-the-git-directory)
   - [Git Object Internals: Blobs, Trees, Commits & Tags](#14-git-object-internals-blobs-trees-commits-tags)
   - [Demystifying `HEAD` and Detached `HEAD`](#15-demystifying-head-and-detached-head)
2. [Essential First-Time & Enterprise Configuration](#2-essential-first-time-enterprise-configuration)
   - [Configuration Scopes Hierarchy](#21-configuration-scopes-hierarchy)
   - [Core Identity & Default Branch](#22-core-identity-default-branch)
   - [Cross-Platform Line Endings (CRLF vs LF) & `.gitattributes`](#23-cross-platform-line-endings-crlf-vs-lf-gitattributes)
   - [Modern Merge & Pull Safety Policies](#24-modern-merge-pull-safety-policies)
   - [Credential Storage & Multi-Account Management](#25-credential-storage-multi-account-management)
3. [Repository Lifecycle & Tracking](#3-repository-lifecycle-tracking)
   - [Repository Initialization (`git init`)](#31-repository-initialization-git-init)
   - [High-Efficiency Cloning Strategies](#32-high-efficiency-cloning-strategies)
   - [Staging Mechanics: `git add .` vs `-A` vs `-u`](#33-staging-mechanics-git-add-vs--a-vs--u)
   - [The Art of Interactive Staging (`git add -p`)](#34-the-art-of-interactive-staging-git-add--p)
   - [Untracking & Removing Files (`git rm` vs `git rm --cached`)](#35-untracking-removing-files-git-rm-vs-git-rm---cached)
   - [Mastering `.gitignore` Patterns & Precedence](#36-mastering-gitignore-patterns-precedence)
4. [Status, Inspection & Diffing Mastery](#4-status-inspection-diffing-mastery)
   - [Porcelain Status Codes (`git status -s`)](#41-porcelain-status-codes-git-status--s)
   - [Diffing the Three Trees](#42-diffing-the-three-trees)
   - [Navigating History with `git log`](#43-navigating-history-with-git-log)
   - [History Mining with Pickaxe Search (`-S` and `-G`)](#44-history-mining-with-pickaxe-search--s-and--g)
   - [Code Archaeology with `git blame`](#45-code-archaeology-with-git-blame)
5. [Committing & History Construction](#5-committing-history-construction)
   - [The Anatomy of an Atomic Commit](#51-the-anatomy-of-an-atomic-commit)
   - [Conventional Commits Specification](#52-conventional-commits-specification)
   - [Amending Commits Safely (`git commit --amend`)](#53-amending-commits-safely-git-commit---amend)
   - [The Golden Rule of Public History](#54-the-golden-rule-of-public-history)
   - [Automated Commit & Push Tooling (`git-script.sh` & `gitBatchScript.sh`)](#55-automated-commit--push-tooling-git-scriptsh--gitbatchscriptsh)
6. [Modern Branching & Switching (Git 2.23+)](#6-modern-branching-switching-git-223)
   - [Why `git switch` Replaced `git checkout`](#61-why-git-switch-replaced-git-checkout)
   - [Branch Creation, Navigation & Tracking](#62-branch-creation-navigation-tracking)
   - [Branch Auditing & Comparison (`git branch -vv`)](#63-branch-auditing-comparison-git-branch--vv)
   - [Safe Branch Deletion Rules](#64-safe-branch-deletion-rules)
   - [Renaming Local and Remote Branches](#65-renaming-local-and-remote-branches)
7. [Merging, Rebasing & Integration Strategies](#7-merging-rebasing-integration-strategies)
   - [Fast-Forward vs Non-Fast-Forward (`--no-ff`) Merges](#71-fast-forward-vs-non-fast-forward---no-ff-merges)
   - [Squash Merging for Clean Feature Integration](#72-squash-merging-for-clean-feature-integration)
   - [Linear Rebasing (`git rebase`)](#73-linear-rebasing-git-rebase)
   - [Interactive Rebasing Mastery (`git rebase -i`)](#74-interactive-rebasing-mastery-git-rebase--i)
   - [Merge Conflict Resolution with `zdiff3`](#75-merge-conflict-resolution-with-zdiff3)
8. [Stashing, Cleaning & Worktrees](#8-stashing-cleaning-worktrees)
   - [Stashing Workflows (`git stash push/pop/apply`)](#81-stashing-workflows-git-stash-pushpopapply)
   - [Interactive & Partial Stashing (`git stash -p`)](#82-interactive-partial-stashing-git-stash--p)
   - [Working Directory Hygiene (`git clean`)](#83-working-directory-hygiene-git-clean)
   - [Concurrent Multi-Branch Development (`git worktree`)](#84-concurrent-multi-branch-development-git-worktree)
9. [Remotes, Collaboration & Upstream Workflows](#9-remotes-collaboration-upstream-workflows)
   - [Remote Management (`git remote`)](#91-remote-management-git-remote)
   - [`git fetch` vs `git pull` Deep Dive](#92-git-fetch-vs-git-pull-deep-dive)
   - [Safe Force-Pushing (`--force-with-lease`)](#93-safe-force-pushing---force-with-lease)
   - [Release Tagging: Lightweight vs Annotated Tags](#94-release-tagging-lightweight-vs-annotated-tags)
   - [Fork & Upstream Synchronization Workflow](#95-fork-upstream-synchronization-workflow)
10. [Undoing Changes, Time Travel & Disaster Recovery](#10-undoing-changes-time-travel-disaster-recovery)
   - [The Undoing Decision Tree](#101-the-undoing-decision-tree)
   - [Modern File Restoration (`git restore`)](#102-modern-file-restoration-git-restore)
   - [Reset Mechanics Demystified (`--soft`, `--mixed`, `--hard`)](#103-reset-mechanics-demystified---soft---mixed---hard)
   - [Public History Rollbacks (`git revert`)](#104-public-history-rollbacks-git-revert)
   - [Disaster Recovery with `git reflog`](#105-disaster-recovery-with-git-reflog)
11. [Security, Cryptography & SSH Authentication](#11-security-cryptography-ssh-authentication)
   - [Generating Modern ED25519 SSH Keys](#111-generating-modern-ed25519-ssh-keys)
   - [SSH Client Configuration (`~/.ssh/config`)](#112-ssh-client-configuration-sshconfig)
   - [GPG & SSH Commit Signature Verification](#113-gpg-ssh-commit-signature-verification)
12. [High-Velocity Aliases & Power Tools](#12-high-velocity-aliases-power-tools)
   - [Battle-Tested Global Git Aliases](#121-battle-tested-global-git-aliases)
   - [Automated Bug Hunting with `git bisect`](#122-automated-bug-hunting-with-git-bisect)
   - [Submodules & Monorepo Essentials](#123-submodules-monorepo-essentials)
13. [Emergency Troubleshooting Matrix ("Oh Shit, Git!")](#13-emergency-troubleshooting-matrix-oh-shit-git)
14. [Cross-Platform Ecosystem & Companion Guides](#14-cross-platform-ecosystem-companion-guides)

---

## 1. Architectural Foundations & Mental Model

Most developers struggle with Git because they try to memorize commands as magic incantations. To truly master Git, you must understand its underlying architectural model: **Git is a simple, content-addressable key-value store with a cryptographically verified Directed Acyclic Graph (DAG) layered on top.**

### 1.1 Directed Acyclic Graphs (DAG) & Content-Addressable Storage

Unlike legacy version control systems (SVN, CVS, Perforce) that track **file deltas** (differences per file over time), Git stores data as a sequence of **complete snapshots**.

```
Legacy VCS (Delta-Based):
File A  ──>  ΔA1  ──>  ΔA2  ──>  ΔA3
File B  ─────────>  ΔB1  ──────────>  ΔB2

Git (Snapshot-Based DAG):
Commit 1 (C1)  <────  Commit 2 (C2)  <────  Commit 3 (C3)  <──── [main]
  ├── Tree               ├── Tree               ├── Tree
  │     ├── File A (v1)  │     ├── File A (v2)  │     ├── File A (v3)
  │     └── File B (v1)  │     └── File B (v1)* │     └── File B (v2)
  * If a file did not change, Git reuses the identical cryptographic hash pointer!
```

Every object in Git is addressed by its **SHA-1 (160-bit)** or **SHA-256 (256-bit)** hash computed directly from the object's type, byte length, and content. If a single byte in any file changes, its hash changes, forcing the parent tree hash to change, which forces the parent commit hash to change. This forms a tamper-evident cryptographic blockchain.

---

### 1.2 The Four Logical States of Git

A developer workspace is divided into four distinct zones:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                     LOCAL MACHINE                                      │
│                                                                                        │
│   ┌──────────────────┐    git add -p / -A    ┌──────────────────┐     git commit       │
│   │   Working Tree   │ ────────────────────> │  Staging (Index) │ ──────────────────┐  │
│   │ (Unstaged Files) │                       │  (Prepared State)│                   │  │
│   └──────────────────┘ <──────────────────── └──────────────────┘                   │  │
│            ▲              git restore --staged        ▲                             │  │
│            │                                          │ git reset --soft            │  │
│            │ git restore                              │                             ▼  │
│            │                                          │                    ┌────────┴─────────┐
│            └──────────────────────────────────────────┴─────────────────── │ Local Repository │
│                                  git reset --hard                          │  (HEAD History)  │
│                                                                            └────────┬─────────┘
└─────────────────────────────────────────────────────────────────────────────────────┼──────────┘
                                                                                      │
                                   git push origin <branch>                           │  git fetch /
                                                                                      │  git pull
                                                                                      ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       REMOTE (GitHub / GitLab)                                 │
│                                      Remote Tracking (origin/main)                             │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Working Tree**: Your actual filesystem directory on disk where you view, create, edit, and compile code.
2. **Staging Area (Index)**: A binary cache file (`.git/index`) that prepares the exact snapshot that will constitute the next commit. It decouples what you edit on disk from what you commit.
3. **Local Repository (`HEAD`)**: The immutable database of all permanent commits and branch pointers residing inside `.git/objects` on your machine.
4. **Remote Tracking Branches**: Read-only local pointers (such as `origin/main`) reflecting the state of remote branches the last time you ran `git fetch` or `git pull`.

---

### 1.3 Anatomy of the `.git` Directory

When you run `git init`, Git creates a hidden directory named `.git`. Inside lies the complete version database:

```
.git/
├── HEAD               # Symbolic pointer to currently active branch (e.g. ref: refs/heads/main)
├── config             # Repository-specific configuration options
├── description        # Used primarily by GitWeb
├── hooks/             # Client-side and server-side automation scripts (pre-commit, commit-msg, etc.)
├── info/
│   └── exclude        # Personal local ignore patterns (not shared across team)
├── index              # The binary Staging Area state file
├── objects/           # The Content-Addressable Object Database (Blobs, Trees, Commits, Tags)
│   ├── [0-9a-f]{2}/   # Subdirectories named after first 2 characters of SHA hash
│   ├── info/
│   └── pack/          # Compressed packfiles and index files for network and disk efficiency
└── refs/              # Pointers to commits
    ├── heads/         # Local branch references (e.g., refs/heads/main, refs/heads/feature)
    ├── remotes/       # Remote-tracking references (e.g., refs/remotes/origin/main)
    └── tags/          # Annotated and lightweight tag pointers
```

---

### 1.4 Git Object Internals: Blobs, Trees, Commits & Tags

Git uses exactly four fundamental object types:

| Object Type | Role | What It Contains |
| :--- | :--- | :--- |
| **Blob** (*Binary Large Object*) | Represents file data | Raw file bytes only. Does **not** store filename, directory path, or file mode. |
| **Tree** | Represents directory structure | A list of directory entries: POSIX file mode (`100644`, `100755`), name, and pointer to child Blob or Tree SHA. |
| **Commit** | Represents a repository snapshot | Root Tree SHA, parent Commit SHA(s), author name/email/timestamp, committer name/email/timestamp, commit log message. |
| **Annotated Tag** | Immutable release milestone | Target Commit SHA, tagger metadata, timestamp, message, and optional GPG signature. |

#### Inspecting Git Objects Directly with Plumbing Commands:

```bash
# Check the type of any object hash
git cat-file -t 4b825dc642cb6eb9a060e54bf8d69288fbee4904

# Print the full content of any object
git cat-file -p HEAD

# View the root tree pointed to by the current commit
git ls-tree HEAD

# Compute the SHA hash of a file without writing it to database
git hash-object path/to/file.py
```

---

### 1.5 Demystifying `HEAD` and Detached `HEAD`

In Git, `HEAD` is simply a reference that tells Git **what you are currently looking at and building upon**.

- Under normal conditions, `HEAD` is a **symbolic reference** pointing to a branch:
  ```
  HEAD ──> refs/heads/main ──> Commit [7d83317]
  ```
- A **Detached HEAD** occurs when you check out a specific commit hash, a remote tracking branch, or a tag directly instead of a local branch pointer:
  ```
  HEAD ──────────────────────> Commit [7d83317] (No branch attached!)
  ```

> [!WARNING]
> If you make commits while in a detached `HEAD` state, they will **not belong to any branch**. If you switch back to `main`, those commits become orphaned and will eventually be permanently deleted by Git's garbage collection (`git gc`).

#### How to Safely Resolve a Detached `HEAD`:
```bash
# If you made experimental commits in detached HEAD that you want to KEEP:
git switch -c rescue-my-experiment

# If you just wanted to inspect past code and want to return without saving:
git switch main
```

---

## 2. Essential First-Time & Enterprise Configuration

### 2.1 Configuration Scopes Hierarchy

Git evaluates configuration settings in a cascading precedence order from highest to lowest:

```
[Highest Precedence]
1. Command-line flags  (--config-env, -c key=val)
2. Worktree Scope      (.git/config.worktree)
3. Local Scope         (.git/config)
4. Global Scope        (~/.gitconfig or ~/.config/git/config)
5. System Scope        (/etc/gitconfig or C:\Program Files\Git\etc\gitconfig)
[Lowest Precedence]
```

To inspect which file sets a particular value:
```bash
git config --list --show-origin --show-scope
```

---

### 2.2 Core Identity & Default Branch

Always configure your author identity and modernize the default branch name from the legacy `master` to `main`:

```bash
# Set author identity (used for all future commits)
git config --global user.name "Your Name"
git config --global user.email "your.email@domain.com"

# Set modern default initial branch
git config --global init.defaultBranch main

# Set default code editor (VS Code, Nano, Vim, Neovim)
git config --global core.editor "code --wait"
# Or: git config --global core.editor "nvim"
# Or: git config --global core.editor "nano"

# Enable colorized terminal outputs
git config --global color.ui auto
```

---

### 2.3 Cross-Platform Line Endings (CRLF vs LF) & `.gitattributes`

Mismatched line endings between Windows (`CRLF` / `

`) and Unix/Linux/macOS (`LF` / `
`) cause spurious diffs where entire files appear modified simply because carriage returns were introduced or stripped.

```bash
# On Windows workstations:
git config --global core.autocrlf true

# On macOS and Linux workstations:
git config --global core.autocrlf input
```

#### Enterprise Best Practice: Repository-Level `.gitattributes`
Rather than relying on individual developer machines having identical global configs, enforce deterministic line endings at the repository root by committing a `.gitattributes` file:

```gitattributes
# Set default behavior: auto-normalize line endings to LF on commit
* text=auto eol=lf

# Explicit text files that MUST use LF
*.sh text eol=lf
*.bash text eol=lf
*.py text eol=lf
*.js text eol=lf
*.ts text eol=lf
*.json text eol=lf
*.md text eol=lf

# Windows-specific files that require CRLF
*.bat text eol=crlf
*.cmd text eol=crlf
*.ps1 text eol=crlf

# Binary files that must NEVER be touched
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.pdf binary
*.woff binary
*.woff2 binary
```

---

### 2.4 Modern Merge & Pull Safety Policies

Modern Git installations should enforce fast-forward or linear pull strategies to avoid silent and unwanted merge commits when syncing branches:

```bash
# Fast-Forward only: aborts pull if branches have diverged
git config --global pull.ff only

# Use advanced 3-way conflict display (shows base ancestor in conflicts)
git config --global merge.conflictstyle zdiff3

# Highlight blocks of code that were moved across lines or files
git config --global diff.colorMoved default
```

---

### 2.5 Credential Storage & Multi-Account Management

Avoid entering passwords and Personal Access Tokens (PAT) repeatedly:

```bash
# Windows (uses Windows Credential Manager):
git config --global credential.helper manager

# macOS (uses macOS Keychain):
git config --global credential.helper osxkeychain

# Linux (uses freedesktop libsecret):
git config --global credential.helper libsecret
```

#### Managing Multiple Accounts (e.g., Work vs Personal):
Add directory-conditional configuration in your `~/.gitconfig`:

```ini
# ~/.gitconfig (Default Personal Config)
[user]
    name = Personal Dev
    email = personal@domain.com

# Automatically override identity when inside work repositories
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
```

Inside `~/.gitconfig-work`:
```ini
[user]
    name = Enterprise Dev
    email = dev@enterprise-corp.com
```

---

## 3. Repository Lifecycle & Tracking

### 3.1 Repository Initialization (`git init`)

```bash
# Initialize a new standard repository in current directory
git init

# Initialize with explicit branch name
git init -b main

# Initialize a bare repository (used on central servers; has no working tree)
git init --bare /srv/git/project.git
```

---

### 3.2 High-Efficiency Cloning Strategies

```bash
# Standard clone (fetches full history, all branches, all tags)
git clone https://github.com/xivig/git-essential-commands.git

# Shallow clone (fetch only the single most recent commit, saving 90%+ bandwidth)
git clone --depth 1 https://github.com/torvalds/linux.git

# Clone only one single branch without remote tracking references to others
git clone --single-branch --branch main https://github.com/organization/monorepo.git

# Blobless clone (downloads commit tree structure; downloads file blobs on demand)
git clone --filter=blob:none https://github.com/organization/huge-repo.git

# Treeless clone (downloads commit history only; trees and blobs on demand)
git clone --filter=tree:0 https://github.com/organization/huge-repo.git
```

---

### 3.3 Staging Mechanics: `git add .` vs `-A` vs `-u`

Understanding the staging flags prevents accidental file commits:

| Command | New Files (Untracked) | Modified Files | Deleted Files | Scope |
| :--- | :---: | :---: | :---: | :--- |
| `git add <file>` | ✅ | ✅ | ✅ | Specified file only |
| `git add .` | ✅ | ✅ | ✅ | Current directory and subdirectories |
| `git add -A` / `--all` | ✅ | ✅ | ✅ | Entire repository from root |
| `git add -u` / `--update` | ❌ | ✅ | ✅ | Tracked files only (no untracked files) |

---

### 3.4 The Art of Interactive Staging (`git add -p`)

Senior software engineers never blindly stage massive multi-file modifications. **Interactive staging** allows you to stage code at the precision of individual hunks or even single lines.

```bash
git add -p
# Or: git add --patch path/to/file.py
```

When Git presents a hunk, it prompts with: `Stage this hunk [y,n,q,a,d,s,e,?]?`

| Key | Action | Engineering Purpose |
| :---: | :--- | :--- |
| `y` | **Yes** | Stage this hunk for the next commit |
| `n` | **No** | Skip this hunk; leave it in working directory |
| `q` | **Quit** | Exit patch mode; keep everything staged so far |
| `a` | **All** | Stage this hunk and all remaining hunks in this file |
| `d` | **Do not stage** | Skip this hunk and all remaining hunks in this file |
| `s` | **Split** | Split the current hunk into smaller distinct hunks |
| `e` | **Edit** | Manually edit the hunk in your configured code editor |
| `?` | **Help** | Print command help |

---

### 3.5 Untracking & Removing Files (`git rm` vs `git rm --cached`)

```bash
# Delete file from filesystem AND stage its deletion in Git
git rm obsolete_file.txt

# Remove file from Git tracking BUT keep it untouched on disk
git rm --cached .env

# Recursively untrack an entire directory (e.g. accidentally tracked node_modules or build output)
git rm -r --cached node_modules/
git commit -m "chore: stop tracking node_modules"
```

---

### 3.6 Mastering `.gitignore` Patterns & Precedence

A `.gitignore` file specifies intentionally untracked files that Git should ignore.

```gitignore
# 1. Blank lines and lines starting with '#' are ignored as comments

# 2. Ignore all files ending in .log
*.log

# 3. But DO track production error log
!production-error.log

# 4. Ignore all files in any directory named 'temp'
temp/

# 5. Ignore build output at the root directory only (due to leading slash)
/dist

# 6. Ignore all .txt files inside doc/ and its immediate subdirectories
doc/**/*.txt

# 7. Ignore credentials and environmental secrets
.env
.env.*.local
*.pem
*.key
```

#### Debugging Why a File is Ignored:
```bash
# Find out exactly which .gitignore rule is ignoring a file
git check-ignore -v path/to/suspicious_file.ts
```

---

## 4. Status, Inspection & Diffing Mastery

### 4.1 Porcelain Status Codes (`git status -s`)

The default `git status` output is verbose. The porcelain shorthand flag `-s` (or `-sb` to include branch tracking status) displays a two-column status matrix:

```bash
git status -sb
## main...origin/main [ahead 1, behind 2]
 M src/index.ts
M  src/config.ts
A  src/new-feature.ts
D  src/deprecated.ts
?? notes.txt
```

| Column 1 (Staged / Index) | Column 2 (Unstaged / Working Tree) | Meaning |
| :---: | :---: | :--- |
| ` ` | `M` | File modified in working tree, NOT staged |
| `M` | ` ` | File modified and staged in index |
| `M` | `M` | File modified, staged, then modified again in working tree |
| `A` | ` ` | New file staged in index |
| `D` | ` ` | File deleted and staged in index |
| ` ` | `D` | File deleted in working tree, deletion not staged |
| `?` | `?` | Untracked file (never added to Git) |
| `U` | `U` | Unresolved merge conflict! |

---

### 4.2 Diffing the Three Trees

```bash
# 1. Compare Working Tree against Staging Area (shows unstaged changes)
git diff

# 2. Compare Staging Area against HEAD commit (shows what WILL be committed)
git diff --staged
# Equivalent legacy syntax:
git diff --cached

# 3. Compare Working Tree against HEAD commit (unstaged + staged changes)
git diff HEAD

# 4. Compare across two specific commits
git diff 7d83317 e2e6930

# 5. Two-Dot Diff vs Three-Dot Diff:
# A..B compares tip of branch A directly with tip of branch B
git diff main..feature

# A...B compares merge-base (common ancestor) with tip of branch B (ideal for PR review)
git diff main...feature

# 6. Word-level diff (highlights specific characters/words changed rather than whole lines)
git diff --color-words
```

---

### 4.3 Navigating History with `git log`

```bash
# Modern compact one-line log
git log --oneline

# Visual ASCII commit DAG graph showing all branches
git log --graph --oneline --decorate --all

# Inspect commit metadata plus files changed and line stats
git log --stat -n 5

# Inspect commit metadata plus full patch diffs
git log -p -n 2

# Filter commits by author
git log --author="xivig"

# Filter commits by date range
git log --since="2 weeks ago" --until="yesterday"

# Filter commits by message search pattern
git log --grep="fix(auth)"
```

---

### 4.4 History Mining with Pickaxe Search (`-S` and `-G`)

The Git "pickaxe" is one of Git's most potent forensic tools. It searches commit diffs rather than commit messages.

```bash
# Find all commits that added or removed the exact string "SECRET_TOKEN"
git log -S "SECRET_TOKEN" --oneline

# Find all commits whose changes match a regular expression
git log -G "def calculate_tax\(" -p

# Track the entire evolution and change history of a specific function or line range
git log -L 120,150:src/auth.ts
```

---

### 4.5 Code Archaeology with `git blame`

```bash
# Standard blame: inspect line-by-line commit authorship
git blame src/engine.py

# Blame ignoring whitespace changes (avoids attributing reformatting to wrong author)
git blame -w src/engine.py

# Blame detecting code copied or moved from other files (-C) or within the file (-M)
git blame -w -C -M src/engine.py

# Inspect blame for a specific line slice (lines 45 to 65)
git blame -L 45,65 src/engine.py
```

---

## 5. Committing & History Construction

### 5.1 The Anatomy of an Atomic Commit

An **atomic commit** encapsulates a single logical change:
- It solves one bug, implements one feature, or performs one refactor.
- The project must compile, pass tests, and run cleanly before and after the commit.
- Never bundle an unformatted codebase sweep with functional business logic.

---

### 5.2 Conventional Commits Specification

Follow the standard [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body providing technical context and rationale]

[optional footer(s) such as Breaking Changes or Issue references]
```

#### Common Types:
- `feat`: A new user-facing feature or API capability.
- `fix`: A bug fix.
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `perf`: Performance optimization.
- `docs`: Documentation updates only.
- `style`: Whitespace, formatting, missing semicolons (no code logic changes).
- `test`: Adding missing unit/integration tests or correcting existing tests.
- `ci`: Changes to CI/CD workflows and configuration scripts.
- `chore`: Maintenance tasks, dependency updates, build tooling.

#### Example Production Commit:
```bash
git commit -m "feat(auth): add ed25519 signature verification middleware

Implement cryptographically secure verification for incoming webhook payloads.
Reject signatures older than 300 seconds to prevent replay attacks.

Closes #1042"
```

---

### 5.3 Amending Commits Safely (`git commit --amend`)

Forgot to stage a file, or made a typo in the commit message? Amend it before pushing:

```bash
# 1. Stage the forgotten file
git add forgotten_file.ts

# 2. Incorporate staged file into previous commit WITHOUT changing commit message
git commit --amend --no-edit

# Or edit the previous commit message:
git commit --amend -m "feat(auth): correct spelling of payload parameter"
```

---

### 5.4 The Golden Rule of Public History

> [!CAUTION]
> **Never modify, amend, rebase, or force-push commits that have already been pushed to a shared public or team repository branch (e.g. `main` or `develop`).**  
> Rewriting shared history changes SHA hashes, corrupts collaborator clones, and creates severe divergence nightmares. History rewriting is strictly reserved for local private feature branches.
### 5.5 Automated Commit & Push Tooling (`git-script.sh` & `gitBatchScript.sh`)

This repository includes two production-grade bash automation utilities designed for daily development velocity:

1. **Interactive Workflow ([`git-script.sh`](git-script.sh))**:
   - Inspects porcelain status, displays branch name, prompts for an explicit commit message with confirmation, and pushes upstream with full error trapping.
   ```bash
   chmod +x git-script.sh
   ./git-script.sh
   ```

2. **Non-Interactive Batch Helper ([`gitBatchScript.sh`](gitBatchScript.sh))**:
   - Automatically stages all modified and untracked files (`git add -A`), checks `git diff-index --quiet HEAD --` to prevent empty commits, accepts an optional CLI message argument, dynamically resolves the current branch via `git branch --show-current`, and pushes to `origin`:
   ```bash
   chmod +x gitBatchScript.sh
   ./gitBatchScript.sh "docs: batch commit updates"
   ```

---

## 6. Modern Branching & Switching (Git 2.23+)

### 6.1 Why `git switch` Replaced `git checkout`

Historically, `git checkout` handled two completely disparate responsibilities:
1. Navigating and switching branches.
2. Discarding uncommitted file modifications in the working tree.

In Git 2.23, Git introduced two distinct, specialized porcelain commands:
- **`git switch`**: Dedicated exclusively to branch navigation.
- **`git restore`**: Dedicated exclusively to file state manipulation and rollbacks.

---

### 6.2 Branch Creation, Navigation & Tracking

```bash
# Switch to an existing local branch
git switch main

# Create and switch to a new branch in a single command
git switch -c feature/payment-gateway

# Switch back to the previous branch you were on (instant toggle!)
git switch -

# Create and switch to a branch starting from a specific remote tracking branch
git switch -c feature/api-v2 origin/feature/api-v2
```

---

### 6.3 Branch Auditing & Comparison (`git branch -vv`)

```bash
# List local branches with upstream tracking info and ahead/behind commit counts
git branch -vv

# List all branches (both local and remote)
git branch -a -vv

# List branches that have already been merged into current branch
git branch --merged

# List branches that have NOT been merged into current branch
git branch --no-merged
```

---

### 6.4 Safe Branch Deletion Rules

```bash
# Safe delete: Git checks if the branch has been fully merged into upstream
git branch -d feature/user-profile

# Force delete: Deletes the branch regardless of its merge status (destructive!)
git branch -D feature/abandoned-experiment

# Delete a remote branch on GitHub
git push origin --delete feature/user-profile
```

---

### 6.5 Renaming Local and Remote Branches

```bash
# Rename the currently active branch to 'main'
git branch -m main

# Rename a different local branch
git branch -m old-name new-name

# Push the newly renamed branch to remote and set tracking upstream
git push -u origin main

# Delete the old branch from remote
git push origin --delete old-name
```

---

## 7. Merging, Rebasing & Integration Strategies

### 7.1 Fast-Forward vs Non-Fast-Forward (`--no-ff`) Merges

When the base branch has received no new commits since the feature branch diverged, Git can perform a **Fast-Forward (FF)** merge by simply moving the branch pointer forward.

```
Fast-Forward Merge:
Before:   main: A ─── B
                      └─── C ─── D (feature)

After:    main: A ─── B ─── C ─── D (feature)
```

To preserve branch history and topology, use `--no-ff`:

```bash
# Create a true 3-way merge commit even if fast-forward is possible
git merge --no-ff feature/user-auth

# Enforce fast-forward only; fail immediately if a merge commit would be required
git merge --ff-only feature/user-auth
```

---

### 7.2 Squash Merging for Clean Feature Integration

Squash merging collapses 20 messy work-in-progress feature commits into one clean commit on the target branch:

```bash
git switch main
git merge --squash feature/data-pipeline
git commit -m "feat(pipeline): complete etl ingestion pipeline"
```

---

### 7.3 Linear Rebasing (`git rebase`)

Rebasing rewrites a branch by taking all commits unique to your feature branch and replaying them on top of another base branch:

```bash
git switch feature/my-work
git fetch origin main
git rebase origin/main
```

```
Before Rebase:
main:     A ─── B ─── C
                 └─── D ─── E (feature)

After Rebase:
main:     A ─── B ─── C
                       └─── D' ─── E' (feature: linear history!)
```

---

### 7.4 Interactive Rebasing Mastery (`git rebase -i`)

Interactive rebasing gives you full editorial control over your commit history before submitting a Pull Request:

```bash
# Interactively rewrite the last 4 commits on current branch
git rebase -i HEAD~4
```

Git opens your editor with a script list:

```
pick a1b2c3d feat(auth): add login endpoint
pick e4f5g6h fix typo in password validator
pick 7i8j9k0 test: add unit tests for login
pick m1n2o3p fix test assertion

# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = meld into previous commit (concatenates commit messages)
# f, fixup <commit> = meld into previous commit (discards this commit's message)
# d, drop <commit> = remove commit entirely
# x, exec <command> = run shell command (e.g. run test suite) after this commit
```

#### Cleaned Up Script:
```
pick a1b2c3d feat(auth): add login endpoint
fixup e4f5g6h fix typo in password validator
pick 7i8j9k0 test: add unit tests for login
fixup m1n2o3p fix test assertion
```

Save and close the editor; Git replays the history into two pristine atomic commits!

---

### 7.5 Merge Conflict Resolution with `zdiff3`

When two branches modify the same lines, Git pauses and writes conflict markers:

```
<<<<<<< HEAD (current branch)
const API_URL = "https://api.production.internal";
||||||| merged common ancestors (with zdiff3 enabled)
const API_URL = "https://api.staging.internal";
=======
const API_URL = "https://api.v2.production.internal";
>>>>>>> feature/api-upgrade (incoming branch)
```

#### Step-by-Step Conflict Resolution Workflow:
1. Locate conflicting files:
   ```bash
   git status -s
   # Conflicted files show as 'UU'
   ```
2. Open conflicting files and manually edit out the markers (`<<<<<<<`, `|||||||`, `=======`, `>>>>>>>`).
3. Mark files as resolved by staging them:
   ```bash
   git add src/config.ts
   ```
4. Continue the merge or rebase:
   ```bash
   git merge --continue
   # Or during rebase:
   git rebase --continue
   ```
5. If you made a mistake and want to cancel the merge entirely:
   ```bash
   git merge --abort
   # Or:
   git rebase --abort
   ```

---

## 8. Stashing, Cleaning & Worktrees

### 8.1 Stashing Workflows (`git stash push/pop/apply`)

Need to switch branches to fix a critical production bug, but your current work is half-finished and uncommittable? Stash it!

```bash
# Stash tracked modifications with a human-readable label
git stash push -m "wip: shopping cart checkout session"

# Stash including all untracked files
git stash push -u -m "wip: including new service files"

# View all saved stashes
git stash list

# Inspect what changed in stash@{0} without applying it
git stash show -p stash@{0}

# Apply the latest stash AND remove it from stash list
git stash pop

# Apply stash BUT leave it saved in stash list
git stash apply stash@{0}

# Drop a specific stash
git stash drop stash@{0}

# Clear all stashes permanently
git stash clear
```

---

### 8.2 Interactive & Partial Stashing (`git stash -p`)

Stash only specific hunks, leaving the remainder in your working tree:
```bash
git stash push -p -m "stash experimental performance test only"
```

---

### 8.3 Working Directory Hygiene (`git clean`)

Remove untracked files that are cluttering your directory:

```bash
# Dry run: see what WOULD be removed without deleting anything (ALWAYS do this first!)
git clean -n -d

# Force delete all untracked files and untracked directories
git clean -f -d

# Force delete all untracked files, untracked directories, AND ignored files (.env, build artifacts)
git clean -f -d -x
```

---

### 8.4 Concurrent Multi-Branch Development (`git worktree`)

`git worktree` allows you to have **multiple branches checked out simultaneously in different folders** on your filesystem, sharing a single underlying `.git` object store!

```bash
# Check out 'hotfix-urgent' in a separate folder without disturbing your current workspace
git worktree add ../hotfix-urgent hotfix-branch

# List all active linked worktrees
git worktree list

# Remove a worktree after completing work
git worktree remove ../hotfix-urgent
```

---

## 9. Remotes, Collaboration & Upstream Workflows

### 9.1 Remote Management (`git remote`)

```bash
# List all remotes with their fetch and push URLs
git remote -v

# Add a remote named 'origin'
git remote add origin https://github.com/xivig/git-essential-commands.git

# Change the URL of an existing remote (e.g. switch from HTTPS to SSH)
git remote set-url origin git@github.com:xivig/git-essential-commands.git

# Delete stale local tracking branches that were deleted on the remote server
git remote prune origin
```

---

### 9.2 `git fetch` vs `git pull` Deep Dive

- **`git fetch`**: Downloads new commits, branches, and tags from remote into your `.git/objects` and updates `origin/*` pointers. It **never touches your working directory or local branches**.
- **`git pull`**: Shorthand for `git fetch` followed immediately by `git merge FETCH_HEAD`.

> [!TIP]
> **Engineering Best Practice**: Run `git fetch` first. Inspect incoming work with `git log HEAD..origin/main --oneline` or `git diff HEAD..origin/main`, then merge deliberately.

```bash
# Fetch all remotes and prune deleted branches in one shot
git fetch --prune --all
```

---

### 9.3 Safe Force-Pushing (`--force-with-lease`)

When you rebase a private feature branch, its commits receive new SHAs, requiring a force push.

- `git push -f` (Raw Force): Blindly overwrites the remote branch even if a teammate pushed new commits!
- `git push --force-with-lease`: **Verifies that the remote branch matches your local tracking reference before overwriting**. If someone else pushed new code, the push is safely rejected.

```bash
# ALWAYS use --force-with-lease:
git push --force-with-lease origin feature/payment-gateway
```

---

### 9.4 Release Tagging: Lightweight vs Annotated Tags

```bash
# Create an annotated release tag (stores tagger name, email, date, message, and cryptographic data)
git tag -a v1.0.0 -m "Release version 1.0.0: Production launch"

# Create a lightweight tag (just a simple pointer to a commit)
git tag v1.0.0-rc1

# Push a specific tag to remote
git push origin v1.0.0

# Push all local tags to remote
git push origin --tags

# Delete a tag locally
git tag -d v1.0.0-rc1

# Delete a tag on remote
git push origin --delete v1.0.0-rc1
```

---

### 9.5 Fork & Upstream Synchronization Workflow

When contributing to open-source forks:

```bash
# 1. Add original repository as 'upstream'
git remote add upstream https://github.com/original-author/project.git

# 2. Fetch upstream changes
git fetch upstream

# 3. Switch to your local main
git switch main

# 4. Fast-forward your main to upstream main
git merge --ff-only upstream/main

# 5. Push updated main to your personal GitHub fork
git push origin main
```

---

## 10. Undoing Changes, Time Travel & Disaster Recovery

### 10.1 The Undoing Decision Tree

```
                                  What do you need to undo?
                                             │
           ┌─────────────────────────────────┼─────────────────────────────────┐
           ▼                                 ▼                                 ▼
Uncommitted changes               Recent local commits               Published remote commits
           │                                 │                                 │
   Is it staged?                     Keep changes?                     Use git revert!
   ├── No  ─> git restore <file>     ├── Yes ─> git reset --soft HEAD~1
   └── Yes ─> git restore --staged   └── No  ─> git reset --hard HEAD~1
```

---

### 10.2 Modern File Restoration (`git restore`)

```bash
# Discard unstaged working tree changes in a file (revert to last staged/committed version)
git restore src/app.ts

# Unstage a file from the index (keep your modifications in working directory)
git restore --staged src/app.ts

# Discard ALL unstaged changes across entire repository (destructive!)
git restore .

# Restore a specific file from an earlier commit
git restore --source=HEAD~3 src/database.ts
```

---

### 10.3 Reset Mechanics Demystified (`--soft`, `--mixed`, `--hard`)

```bash
# 1. SOFT Reset:
# Moves branch pointer back 1 commit.
# ALL changes remain staged in the Index! (Ideal for squashing or re-authoring commit)
git reset --soft HEAD~1

# 2. MIXED Reset (Default):
# Moves branch pointer back 1 commit.
# Staging area is reset, but modifications REMAIN untouched in your Working Directory!
git reset --mixed HEAD~1

# 3. HARD Reset (DANGEROUS):
# Moves branch pointer back 1 commit.
# Overwrites both Staging Area AND Working Directory to match the target commit!
git reset --hard HEAD~1
```

---

### 10.4 Public History Rollbacks (`git revert`)

When a commit has already been merged into `main` and pushed to remote, **do not reset**. Create an inverse commit with `git revert`:

```bash
# Revert a specific commit by creating a new commit that exactly inverts its diff
git revert 7d83317

# Revert a merge commit (must specify mainline parent index, typically -m 1)
git revert -m 1 33b732d

# Revert multiple commits without committing each one individually
git revert -n HEAD~3..HEAD
git commit -m "revert: rollback payment integration rollout"
```

---

### 10.5 Disaster Recovery with `git reflog`

The **Reflog** (Reference Log) is Git's ultimate safety net. It records every single movement of the `HEAD` reference, capturing commits even after an accidental branch deletion or `git reset --hard`.

#### Scenario 1: Recovering from an Accidental `git reset --hard`
```bash
# 1. Inspect the reflog
git reflog
# 7d83317 (HEAD -> main) HEAD@{0}: reset: moving to HEAD~1
# a1b2c3d HEAD@{1}: commit: important work you thought was lost!

# 2. Restore your state to HEAD@{1}
git reset --hard HEAD@{1}
# Your work is fully restored!
```

#### Scenario 2: Resurrecting a Deleted Branch
```bash
# You accidentally ran: git branch -D feature/critical-api
# 1. Run reflog
git reflog
# Locate the commit SHA at the tip of the deleted branch before deletion (e.g. e4f5g6h)

# 2. Re-create the branch pointer instantly:
git switch -c feature/critical-api e4f5g6h
```

---

## 11. Security, Cryptography & SSH Authentication

### 11.1 Generating Modern ED25519 SSH Keys

RSA keys are legacy. Standardize on **Ed25519** (faster, smaller, and immune to timing attacks):

```bash
# Generate modern Ed25519 keypair
ssh-keygen -t ed25519 -C "your.email@domain.com"
```

Start the SSH agent and register your key:
```bash
# Start ssh-agent in background
eval "$(ssh-agent -s)"

# Add your private key to agent
ssh-add ~/.ssh/id_ed25519
```

Print your public key to add to GitHub (`Settings` -> `SSH and GPG keys`):
```bash
cat ~/.ssh/id_ed25519.pub
```

Test the authenticated handshake:
```bash
ssh -T git@github.com
# Expected output: Hi username! You've successfully authenticated...
```

---

### 11.2 SSH Client Configuration (`~/.ssh/config`)

Store configuration in `~/.ssh/config` for seamless multi-key authentication:

```sshconfig
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
    AddKeysToAgent yes
```

---

### 11.3 GPG & SSH Commit Signature Verification

Prove commit authenticity and prevent author impersonation:

```bash
# Configure Git to sign commits using your SSH key (Git 2.34+)
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true

# Verify commit signatures in log
git log --show-signature -n 5
```

---

## 12. High-Velocity Aliases & Power Tools

### 12.1 Battle-Tested Global Git Aliases

Install our included automated script:
```bash
chmod +x git-aliases.sh
./git-aliases.sh --install
```

Or configure manually in `~/.gitconfig`:

```ini
[alias]
    # Status & Navigation
    st = status -sb
    co = switch
    cob = switch -c
    br = branch -vv
    bra = branch -a -vv

    # Commits
    cm = commit -m
    cma = commit -am
    amend = commit --amend --no-edit

    # Modern Restorations & Safety
    unstage = restore --staged
    discard = restore
    undo = reset --soft HEAD~1

    # Inspection & Diffs
    diffs = diff --staged
    diffw = diff --color-words
    last = log -1 HEAD --stat

    # Beautiful Commit Graph
    lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative
    hist = log --pretty=format:'%C(yellow)%h%Creset %ad | %s%d [%C(green)%an%Creset]' --graph --date=short

    # Remotes & Sync
    remotes = remote -v
    prune-all = fetch --prune --all
```

---

### 12.2 Automated Bug Hunting with `git bisect`

`git bisect` uses binary search to find the exact commit that introduced a regression in $O(\log n)$ steps.

#### Automated Bisect with Test Script:
```bash
# Start bisect session
git bisect start

# Mark current state as broken/bad
git bisect bad

# Mark a known good historical commit/tag
git bisect good v1.4.0

# Let Git automatically test each commit by running your test runner:
git bisect run pytest tests/test_payment.py

# Git automatically narrows down and reports:
# a1b2c3d4e5f is the first bad commit

# Reset repository to normal state
git bisect reset
```

---

### 12.3 Submodules & Monorepo Essentials

```bash
# Add external Git repository as submodule
git submodule add https://github.com/organization/shared-lib.git libs/shared-lib

# Clone a repository including all nested submodules
git clone --recurse-submodules https://github.com/organization/main-app.git

# Initialize and update submodules in an already-cloned repo
git submodule update --init --recursive
```

---

## 13. Emergency Troubleshooting Matrix ("Oh Shit, Git!")

| Symptom / Error Message | Root Cause | Exact Solution |
| :--- | :--- | :--- |
| `Updates were rejected because the remote contains work that you do not have` | Remote tracking branch has commits your local branch lacks | `git fetch origin && git rebase origin/<branch>` |
| `fatal: refusing to merge unrelated histories` | Two repos created separately without common root | `git pull origin main --allow-unrelated-histories` |
| `error: Your local changes to the following files would be overwritten by merge` | Uncommitted local edits conflict with incoming merge | `git stash push -u -m "temp" && git pull && git stash pop` |
| Committed a sensitive API secret / password | Plaintext secret committed to Git history | Revoke key immediately. Then scrub history using `git-filter-repo`: `git filter-repo --invert-paths --path secret.env` |
| Accidental `git reset --hard` wiped recent unpushed work | Commits orphaned from branch pointer | Run `git reflog`, locate pre-reset `HEAD@{n}`, run `git reset --hard HEAD@{n}` |
| Commits created in `detached HEAD` state | Checked out commit or tag instead of branch | Run `git switch -c my-saved-branch` before leaving |
| `warning: LF will be replaced by CRLF` | Cross-platform line ending translation notice | Commit a `.gitattributes` file with `* text=auto eol=lf` |
| Merge conflict made a mess and you want to start over | Conflict resolution went wrong | `git merge --abort` (or `git rebase --abort`) |
| Unstaged modifications you want to wipe completely | Experimental code that you don't want to keep | `git restore .` |

---

## 14. Cross-Platform Ecosystem & Companion Guides

This repository is maintained as part of the **xivig Developer Handbook Series**. For complementary skills and comprehensive guides across the full systems engineering stack, explore:

| Companion Resource | Read Online on GitHub (Markdown) | Interactive Web App (Live in Browser) |
| :--- | :--- | :--- |
| **Git & GitHub Practical Developer's Guide (22 Ch)** | [**`docs/git/` Curriculum ↗**](https://github.com/xivig/developer-handbook-unix-linux-git-shell/tree/master/docs/git) | [**Launch Interactive Guide ↗**](https://htmlpreview.github.io/?https://github.com/xivig/developer-handbook-unix-linux-git-shell/blob/master/Git_GitHub_Complete_Tutorial.html) |
| **Linux & Unix Systems Handbook (39 Ch)** | [**`docs/unix-linux/` Guide ↗**](https://github.com/xivig/developer-handbook-unix-linux-git-shell/tree/master/docs/unix-linux) | [**Launch Interactive Guide ↗**](https://htmlpreview.github.io/?https://github.com/xivig/developer-handbook-unix-linux-git-shell/blob/master/Linux_Unix_Shell_Developer_Handbook.html) |
| **HTML5 & Modern Web Architecture (15 Ch)** | [**`docs/html/` Guide ↗**](https://github.com/xivig/developer-handbook-unix-linux-git-shell/tree/master/docs/html) | [**Launch Interactive Sandbox ↗**](https://htmlpreview.github.io/?https://github.com/xivig/developer-handbook-unix-linux-git-shell/blob/master/HTML5_Web_Developer_Handbook.html) |
| **Rigorous Shell Scripting Masterclass** | [**`docs/shell-scripting/` Guide ↗**](https://github.com/xivig/developer-handbook-unix-linux-git-shell/tree/master/docs/shell-scripting) | [**Interactive Ch 17–23 ↗**](https://htmlpreview.github.io/?https://github.com/xivig/developer-handbook-unix-linux-git-shell/blob/master/Linux_Unix_Shell_Developer_Handbook.html#ch17) |
| **Production Automation Scripts Suite (25 Scripts)** | [**`shell-scripts-repo/` Suite ↗**](https://github.com/xivig/developer-handbook-unix-linux-git-shell/tree/master/shell-scripts-repo) | [**Architecture Guide ↗**](https://github.com/xivig/developer-handbook-unix-linux-git-shell/tree/master/docs/scripts) |
| **macOS Darwin Terminal Setup (6 Ch)** | [**`docs/macos/` Guide ↗**](https://github.com/xivig/developer-handbook-unix-linux-git-shell/tree/master/docs/macos) | [**Architecture & Setup ↗**](https://github.com/xivig/developer-handbook-unix-linux-git-shell/blob/master/docs/macos/01-macos-terminal-setup.md) |
| **Central Documentation Portal** | [**`docs/` Hub ↗**](https://github.com/xivig/developer-handbook-unix-linux-git-shell/tree/master/docs) | [**Launch Portal App ↗**](https://htmlpreview.github.io/?https://github.com/xivig/developer-handbook-unix-linux-git-shell/blob/master/documentation/index.html) |

---

## 📄 License

This repository is licensed under the permissive **[MIT License](LICENSE)**. Free for personal, educational, and commercial use.
