# Git Cheat Sheet & Power Tricks

A quick-reference lookup table of essential Git commands, productivity-boosting aliases, and specialized tricks for macOS and Linux developers.

---

## 1. High-Frequency Daily Commands

| Task | Command |
|---|---|
| Initialize repository | `git init` |
| Clone repository | `git clone <url>` |
| Check status (concise) | `git status -s` |
| Stage all changes | `git add .` |
| Stage interactive hunks | `git add -p` |
| Commit with message | `git commit -m "feat: description"` |
| Amend previous commit | `git commit --amend --no-edit` |
| Create & switch branch | `git switch -c <branch-name>` |
| Switch branch | `git switch <branch-name>` |
| List local branches | `git branch` |
| Delete merged branch | `git branch -d <branch-name>` |
| Pull updates | `git pull --rebase origin <branch>` |
| Push to remote | `git push -u origin <branch>` |
| Stash changes | `git stash push -m "description"` |
| Pop stashed changes | `git stash pop` |
| Pretty branch history | `git log --oneline --graph --all` |
| Discard file modifications | `git restore <file>` |
| Unstage a staged file | `git restore --staged <file>` |
| Remove tracked file from Git | `git rm --cached <file>` |

---

## 2. Recommended Git Aliases

Speed up your daily workflow by setting short, intuitive command aliases:

```bash
# Status & Logging
git config --global alias.st "status -s"
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Branching & Navigation
git config --global alias.co "checkout"
git config --global alias.sw "switch"
git config --global alias.br "branch"

# Committing & Staging
git config --global alias.cm "commit -m"
git config --global alias.ca "commit --amend"
git config --global alias.unstage "restore --staged"

# Remotes & Stashing
git config --global alias.up "pull --rebase --autostash"
git config --global alias.sl "stash list"
git config --global alias.sp "stash pop"
```

Now you can run:
```bash
git st      # instead of git status -s
git lg      # visually rich colorful commit graph
git up      # pulls updates safely while auto-stashing uncommitted work
```

---

## 3. macOS Specific Git Tricks

### 3.1 Global `.gitignore` for `.DS_Store`
macOS Finder automatically writes `.DS_Store` files into viewed directories. Instead of manually adding `.DS_Store` to every single project's `.gitignore`, configure a global ignore rule:

```bash
# Create a global gitignore file in your home directory
echo ".DS_Store" >> ~/.gitignore_global
echo "._*" >> ~/.gitignore_global

# Tell Git to use it globally
git config --global core.excludesfile ~/.gitignore_global
```

### 3.2 APFS Case-Sensitivity Awareness
By default, macOS filesystems (APFS and HFS+) are case-insensitive but case-preserving. If you rename `file.js` to `File.js`, Git might not notice the change.

To rename a file with case change only:
```bash
git mv file.js File.js
```
To check your repository's case sensitivity setting:
```bash
git config core.ignorecase
```

### 3.3 macOS Keychain Integration
Store credentials securely in Apple Keychain so you are never prompted repeatedly:
```bash
git config --global credential.helper osxkeychain
```

---

## 4. Searching & Inspecting Code

### 4.1 Search the Entire Codebase with `git grep`
Faster than normal `grep` because it ignores untracked files and files in `.gitignore`:
```bash
# Search for keyword across tracked files
git grep "apiKey"

# Search with line numbers
git grep -n "handleLogin"

# Count occurrences
git grep -c "useState"
```

### 4.2 Find Commits that Added or Removed a Specific String ("Pickaxe")
Use `git log -S` to find when a specific function or variable was introduced or deleted:
```bash
git log -S "calculateTax" --oneline
```

### 4.3 Who Modified What Line: `git blame`
```bash
# Show who last modified lines 20 through 45 of server.js
git blame -L 20,45 server.js
```

---

## 5. Cleaning Up Your Repository

### Remove untracked files and folders
```bash
# Dry run: see what would be deleted without actually deleting
git clean -nd

# Force delete untracked files and directories
git clean -fd
```

### Export repository without `.git` history
Create a clean zip archive of the project for deployment or distribution:
```bash
git archive --format=zip --output=release-v1.0.0.zip main
```
