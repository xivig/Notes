# Branching, Merging, Remotes & Stashing

A complete guide to managing branches, understanding three-way vs fast-forward merges, working with remote repositories, and leveraging `git stash`.

---

## 1. How Git Branches Work

In Git, a branch is not a copy of all your files; it is simply a **lightweight, movable pointer** to a specific commit. When you commit, the branch pointer automatically moves forward to the new commit.

```
                    Feature Branch
                    +---------------------------+
                    | commit C3  <-- [feature]  |
                    +---------------------------+
                         /
+-----------+       +-----------+       +-----------+
| commit C1 | <---- | commit C2 | <---- | commit C4 |  <-- [main] [HEAD]
+-----------+       +-----------+       +-----------+
```

---

## 2. Managing Branches

### 2.1 Viewing Branches
```bash
# List local branches
git branch

# List local branches with their last commit and tracking remote
git branch -vv

# List all branches (both local and remote-tracking)
git branch -a
```

### 2.2 Creating and Switching Branches

> [!TIP]
> Git introduced `git switch` in version 2.23 to separate branch navigation from file restoration (which `git checkout` historically conflated).

```bash
# Create a new branch without switching to it
git branch feature/user-profile

# Switch to an existing branch (Modern)
git switch feature/user-profile

# Create AND switch to a new branch in one command (Modern)
git switch -c feature/payment-gateway

# Legacy equivalent (still widely used)
git checkout -b feature/payment-gateway
```

### 2.3 Renaming and Deleting Branches
```bash
# Rename current branch
git branch -m new-branch-name

# Delete a branch safely (prevents deletion if unmerged changes exist)
git branch -d feature/completed-task

# Force delete a branch (even if unmerged)
git branch -D feature/abandoned-task

# Delete a remote branch on GitHub
git push origin --delete feature/old-branch
```

---

## 3. Merging Branches

Merging combines the history of two branches together.

### 3.1 Fast-Forward Merge
Occurs when the target branch has no new commits since the source branch branched off. Git simply moves the pointer forward.

```bash
# Switch to main
git switch main

# Fast-forward merge feature into main
git merge feature/user-profile
```

### 3.2 Three-Way Merge (`--no-ff`)
Occurs when both branches have progressed independently, or when you explicitly preserve the branch topology using `--no-ff`:

```bash
git merge --no-ff feature/user-profile -m "merge: integrate user profile feature"
```

### 3.3 Squash Merge (`--squash`)
Condenses all commits on the feature branch into a single set of staged changes on the target branch:

```bash
git switch main
git merge --squash feature/experimental
git commit -m "feat: complete experimental implementation"
```

---

## 4. Working with Remotes

A remote is a version of your project hosted on the internet or network (such as GitHub, GitLab, or Bitbucket).

### 4.1 Understanding the Three Kinds of Branches
When working with remotes, distinguish between:
1. **Local branch:** `main` (exists purely on your machine).
2. **Remote branch:** `main` on the server (e.g. `github.com/org/repo`).
3. **Remote-tracking branch:** `origin/main` (a local read-only copy that reflects where the branch was on the remote the last time you ran `git fetch`).

### 4.2 Adding and Viewing Remotes
```bash
# Add a remote named 'origin'
git remote add origin https://github.com/username/repository.git

# Display configured remotes with their fetch and push URLs
git remote -v

# Inspect detailed status of a remote
git remote show origin
```

### 4.3 Changing or Renaming Remotes
```bash
# Switch from HTTPS to SSH URL
git remote set-url origin git@github.com:username/repository.git

# Rename remote
git remote rename origin upstream

# Remove remote
git remote remove upstream
```

### 4.4 Fetching vs. Pulling
* **`git fetch origin`:** Downloads commits, files, and refs from the remote repository into your remote-tracking branches (`origin/main`). It does **NOT** modify your local working directory or current branch.
* **`git pull origin main`:** Executes `git fetch` followed immediately by `git merge FETCH_HEAD`.

```bash
# Inspect remote changes before merging
git fetch origin
git log HEAD..origin/main --oneline

# Pull with rebase to keep history linear (recommended for feature branches)
git pull --rebase origin main
```

### 4.5 Pushing to Remote
Push your commits to the remote:

```bash
# Push and set upstream tracking reference (-u or --set-upstream)
git push -u origin main

# Subsequent pushes on this branch require only:
git push
```

---

## 5. Saving Uncommitted Work: `git stash`

When you need to switch branches or pull incoming updates, but have uncommitted work in progress that is not ready to be committed, stash it!

### 5.1 Basic Stashing
```bash
# Save uncommitted changes with a helpful descriptive note
git stash push -m "WIP: cart checkout calculations"
# or simply
git stash

# Stash including untracked (newly created) files
git stash -u
```

### 5.2 Reviewing and Restoring Stashes
```bash
# View list of stashed snapshots
git stash list
# Output example:
# stash@{0}: On main: WIP: cart checkout calculations
# stash@{1}: WIP on feature/login: 8a4c112 fix button styles

# View diff of a specific stash
git stash show -p stash@{0}

# Restore the most recent stash AND remove it from stash list
git stash pop

# Restore a specific stash without removing it from the stash list
git stash apply stash@{1}

# Delete a specific stash
git stash drop stash@{0}

# Clear all stashes permanently
git stash clear
```
