# Comprehensive Git Tutorials & Mastery Guide

> **Interactive Single-Page Guide:** Explore the complete 22-chapter handbook with Dark/Light themes, search, and category tracks: [**Git_GitHub_Complete_Tutorial.html**](../../Git_GitHub_Complete_Tutorial.html).

Welcome to the Git tutorial collection. Whether you are creating your first repository or managing production branches and troubleshooting merge conflicts, these guides cover every stage of the Git lifecycle.

---

## Tutorial Roadmap

### 1. [Fundamentals & Setup](01-git-fundamentals-and-setup.md)
* What is distributed version control
* Cross-platform installation (macOS, Linux, Windows)
* Essential global configurations (`user.name`, `user.email`, `init.defaultBranch`, `core.autocrlf`)
* HTTPS vs. SSH keys authentication with GitHub
* Initializing (`git init`) vs Cloning (`git clone`)
* Inside the `.git` directory structure

### 2. [Everyday Workflow & File Tracking](02-essential-git-workflow.md)
* The three Git states: Working Directory, Staging Area (Index), and HEAD
* Checking status (`git status -s`)
* Staging changes (`git add`, interactive hunk staging `git add -p`)
* Committing best practices and Conventional Commits
* Inspecting changes with `git diff`
* Mastering `.gitignore` and solving the "already tracked files" dilemma (`git rm --cached`)
* Exploring history with `git log` and `git show`

### 3. [Branching, Merging, Remotes & Stashing](03-branching-merging-and-remotes.md)
* How branches work under the hood
* Modern branch navigation with `git switch` and `git branch`
* Merging strategies: Fast-forward, three-way (`--no-ff`), and squash merges
* Managing remote repositories: tracking branches, `git fetch` vs `git pull`
* Pushing upstream (`git push -u origin main`)
* Saving uncommitted changes in progress with `git stash`

### 4. [Troubleshooting & Disaster Recovery](04-troubleshooting-and-common-errors.md)
* Resolving rejected pushes ("Updates were rejected because the remote contains work...")
* Step-by-step merge conflict resolution
* Fixing CRLF vs. LF line ending warnings across operating systems
* The undoing guide: `restore`, `commit --amend`, `reset`, and safe `revert`
* Time travel with `git reflog` to recover deleted commits or branches
* Safe force pushing with `--force-with-lease`

### 5. [Cheat Sheet & Power Tricks](05-git-cheatsheet-and-tricks.md)
* High-frequency daily command reference table
* Productive Git aliases for faster development
* macOS-specific tricks: `.DS_Store` global ignore, APFS case-sensitivity, and Keychain
* Code search tricks: `git grep`, `git log -S`, and `git blame`
* Repository cleanup and clean export with `git archive`
