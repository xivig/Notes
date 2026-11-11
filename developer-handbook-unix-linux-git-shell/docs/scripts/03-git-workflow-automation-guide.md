# 03: Git & GitHub Engineering Automation Guide

Automation scripts to streamline local developer configuration, cryptographic authentication, productivity aliases, and branch maintenance.

---

## 1. `git_setup_env.sh`: Automated Workstation Configuration

When onboarding a new engineer or configuring a CI/CD runner, configuring Git manually is prone to human error. `git_setup_env.sh` automates the entire baseline configuration:

```bash
# 1. Author Identity
git config --global user.name "Alex Morgan"
git config --global user.email "alex@example.com"

# 2. Modern Standard Branch
git config --global init.defaultBranch main

# 3. Cross-Platform Line Endings
if [[ "$OSTYPE" == "msys"* || "$OSTYPE" == "cygwin"* ]]; then
    git config --global core.autocrlf true
else
    git config --global core.autocrlf input
fi

# 4. Pull Safety (Disallows accidental merge commits during pull)
git config --global pull.rebase false
git config --global pull.ff only
```

---

## 2. `git_ssh_keygen.sh`: ED25519 Cryptographic Setup

Legacy tutorials recommend RSA 2048 or 4096-bit keys. Modern security standards mandate **ED25519** (Edwards-curve Digital Signature Algorithm), which provides higher security with smaller, faster 256-bit keys.

`git_ssh_keygen.sh` performs the complete setup:
```bash
# Generate key with comment and strict permissions
ssh-keygen -t ed25519 -C "developer@company.com" -f "$HOME/.ssh/id_ed25519" -N ""

# Start ssh-agent in background and register key
eval "$(ssh-agent -s)"
ssh-add "$HOME/.ssh/id_ed25519"

# Output public key formatted for 1-click clipboard copying:
echo "Public Key to add to GitHub (Settings -> SSH Keys):"
cat "$HOME/.ssh/id_ed25519.pub"
```

---

## 3. `git_aliases_setup.sh`: High-Velocity Shortcuts

Configures universal developer aliases across any terminal:

| Alias | Full Git Command | Description |
|---|---|---|
| `git lg` | `git log --graph --oneline --decorate --all` | Visual ASCII branch commit graph |
| `git s` | `git status -s` | Compact, 2-letter status view |
| `git co` | `git switch` | Modern branch checkout |
| `git cb` | `git switch -c` | Create and checkout new branch |
| `git unstage` | `git restore --staged --` | Remove files from index without losing work |
| `git amend` | `git commit --amend --no-edit` | Update previous commit with staged changes |
| `git last` | `git log -1 HEAD --stat` | Detailed inspection of latest commit |

---

## 4. `git_sandbox_lab.sh`: Practice Repository Builder

Builds an isolated practice repository under `~/git-practice-sandbox` containing:
* Initial commit history across multiple branches (`main`, `feature/analytics`).
* Intentional conflicting edits on the same file (`config.json`).
* Step-by-step instructions displayed in terminal for practicing three-way merge resolution and `git reflog` commit recovery.

---

## 5. `git_daily_sync.sh`: Morning Routine Automation

Engineers waste 10 minutes every morning pulling branches and cleaning deleted remotes. `git_daily_sync.sh` automates the sequence:
1. Detects dirty uncommitted working trees and automatically stashes them (`git stash save`).
2. Fetches upstream and prunes deleted tracking branches (`git fetch --prune origin`).
3. Pulls current branch with fast-forward only (`git pull --ff-only`).
4. Re-applies stashed work cleanly (`git stash pop`).
