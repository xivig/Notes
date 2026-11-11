# Git Essential Commands: Developer Desk Cheatsheet

> Quick-reference cheat sheet for high-velocity software engineering. For the comprehensive, deep-dive architectural manual, see [README.md](README.md).

---

## ⚡ 1. Daily Core Workflow (80/20 Rule)

```bash
# 1. Start fresh from remote main
git switch main
git pull --ff-only

# 2. Create and cut a new feature branch
git switch -c feature/user-auth

# 3. Check status compactly
git status -s

# 4. Stage selectively (interactive patch mode)
git add -p
# Or stage everything
git add -A

# 5. Commit with Conventional Commits
git commit -m "feat(auth): implement oauth2 token refresh handler"

# 6. Publish branch and establish upstream tracking
git push -u origin feature/user-auth

# 7. Keep feature branch rebased onto latest main
git fetch origin main
git rebase origin/main
```

---

## 🧭 2. The 4 States of Git

```
┌─────────────────┐      git add       ┌─────────────────┐     git commit     ┌─────────────────┐
│                 │ ─────────────────> │                 │ ─────────────────> │                 │
│  Working Tree   │                    │  Staging (Index) │                    │ Local Repository│
│  (Unstaged)     │ <───────────────── │                 │ <───────────────── │  (HEAD commit)  │
└─────────────────┘    git restore     └─────────────────┘    git reset/undo  └─────────────────┘
         ▲               --staged                                                       │
         │                                                                              │ git push
         │                          git pull / git fetch                                │
         └──────────────────────────────────────────────────────────────────────────────▼
                                     Remote Repository (origin)
```

---

## ⚙️ 3. Global Configuration

```bash
# Set identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Modern default branch
git config --global init.defaultBranch main

# Safe pull strategy (prevent unexpected merge commits)
git config --global pull.ff only

# Better conflict markers (includes original common ancestor)
git config --global merge.conflictstyle zdiff3

# Highlight moved code blocks in diffs
git config --global diff.colorMoved default

# Cross-platform line endings
git config --global core.autocrlf input    # macOS / Linux
git config --global core.autocrlf true     # Windows

# List all active configs with origin source
git config --list --show-origin
```

---

## 🔍 4. Status, Inspection & Diffing

| Goal | Command | Description |
| :--- | :--- | :--- |
| **Compact status** | `git status -sb` | Shows current branch, ahead/behind count, and shorthand status |
| **Unstaged diff** | `git diff` | Diff between working tree and staging area |
| **Staged diff** | `git diff --staged` | Diff between staging area and current `HEAD` commit |
| **Commit diff** | `git diff HEAD~1 HEAD` | Diff introduced by the most recent commit |
| **Branch comparison** | `git diff main...feature` | Diff between merge-base and `feature` tip |
| **Stat summary** | `git diff --stat` | Summary of changed files and line insertion/deletion count |
| **Visual commit graph** | `git log --graph --oneline --all` | ASCII tree of branches and commit history |
| **Pickaxe search** | `git log -S "query"` | Search commits where string `"query"` was added or deleted |
| **File line blame** | `git blame -w -L 40,80 app.py` | Shows commit author for lines 40-80, ignoring whitespace |

---

## 🌿 5. Branching & Switching (Git 2.23+)

| Action | Modern Command (Preferred) | Legacy Command |
| :--- | :--- | :--- |
| **Create & switch** | `git switch -c <name>` | `git checkout -b <name>` |
| **Switch branch** | `git switch <name>` | `git checkout <name>` |
| **Switch to previous** | `git switch -` | `git checkout -` |
| **List branches with tracking** | `git branch -vv` | `git branch -v` |
| **List all (local + remote)** | `git branch -a -vv` | `git branch -a` |
| **Safe delete (merged)** | `git branch -d <name>` | `git branch -d <name>` |
| **Force delete (unmerged)** | `git branch -D <name>` | `git branch -D <name>` |
| **Delete remote branch** | `git push origin --delete <name>` | `git push origin :<name>` |
| **Rename current branch** | `git branch -m <new-name>` | `git branch -m <new-name>` |

---

## 🗃️ 6. Stashing & Context Switching

```bash
# Stash with descriptive message (including untracked files)
git stash push -u -m "wip: oauth endpoint refactoring"

# List all stashed entries
git stash list

# Inspect what is inside stash@{0} without applying
git stash show -p stash@{0}

# Restore the most recent stash and remove it from list
git stash pop

# Restore stash but keep it stored in the stash list
git stash apply stash@{0}

# Drop a specific stash entry
git stash drop stash@{0}

# Clear all stashes permanently
git stash clear
```

---

## 🔄 7. Merging & Rebasing

```bash
# True 3-way merge with merge commit (preserves feature context)
git merge --no-ff feature/user-auth

# Fast-forward only (fails if branch diverged)
git merge --ff-only feature/user-auth

# Squash merge into one single commit
git merge --squash feature/user-auth
git commit -m "feat(auth): complete oauth2 implementation"

# Rebase feature branch onto latest main
git switch feature/user-auth
git rebase main

# Interactive rebase (clean up last 4 commits before PR)
git rebase -i HEAD~4

# Abort rebase or merge during conflicts
git rebase --abort
git merge --abort

# Continue after resolving conflict files
git add <resolved-files>
git rebase --continue
```

### Interactive Rebase Commands
- `p, pick`: Use commit as-is
- `r, reword`: Use commit, but edit commit message
- `e, edit`: Pause rebase to edit commit contents
- `s, squash`: Meld commit into previous commit; keep message
- `f, fixup`: Meld commit into previous commit; discard message
- `d, drop`: Delete commit entirely

---

## ⏪ 8. Undoing Changes & Disaster Recovery

```bash
# Discard unstaged changes in a file (working directory)
git restore <path/to/file>

# Unstage a file (keep edits in working directory)
git restore --staged <path/to/file>

# Discard ALL uncommitted changes (destructive!)
git restore .

# Amend the last commit (add missed file without altering message)
git add missed-file.ts
git commit --amend --no-edit

# Undo last commit; keep changes staged in index
git reset --soft HEAD~1

# Undo last commit; keep changes unstaged in working directory
git reset --mixed HEAD~1

# Nuclear rollback: discard last commit AND all modifications (dangerous!)
git reset --hard HEAD~1

# Safe public rollback: create a new revert commit (collaborative safety)
git revert <commit-sha>

# Rescue deleted branch or accidental hard reset via Reflog
git reflog
# Locate the target HEAD@{n} SHA, then:
git switch -c recovered-branch HEAD@{3}
```

---

## 🚀 9. Remotes & Synchronization

```bash
# Add new remote repository
git remote add origin https://github.com/xivig/git-essential-commands.git

# Verify remotes
git remote -v

# Change remote URL (e.g. switch to SSH)
git remote set-url origin git@github.com:xivig/git-essential-commands.git

# Clean up stale remote tracking branches deleted on GitHub
git remote prune origin
# Or in one command:
git fetch --prune --all

# Push with lease (ALWAYS prefer over raw -f)
git push --force-with-lease origin feature/my-branch

# Create and push annotated release tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

---

## 🛡️ 10. Instant Error Resolver

| Problem | Root Cause | Exact Resolution |
| :--- | :--- | :--- |
| `Updates were rejected because the remote contains work that you do not have` | Remote branch has new commits not in local copy | `git fetch origin && git rebase origin/<branch>` |
| `fatal: refusing to merge unrelated histories` | Two repositories merged without shared ancestor | `git pull origin main --allow-unrelated-histories` |
| `You are in 'detached HEAD' state` | Checked out a commit directly instead of a branch | Run `git switch -c new-branch-name` to preserve work, or `git switch main` to return |
| Accidental commit pushed with sensitive secret / API key | Secret committed to Git history | Remove from code, revoke key immediately, use `git-filter-repo` or BFG to scrub |
| `error: pathspec 'file' did not match any file(s) known to git` | Typo in filename or file not tracked | Check exact casing with `git status` |
