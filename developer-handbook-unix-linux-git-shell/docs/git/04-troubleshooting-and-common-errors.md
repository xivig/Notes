# Git Troubleshooting & Disaster Recovery

Practical solutions for common Git hurdles: rejected pushes, merge conflict resolution, CRLF line ending warnings, undoing mistakes, and recovering lost commits with `git reflog`.

---

## 1. Problem: "Updates Were Rejected" (Push Rejected Error)

### The Error
```text
To https://github.com/user/repo.git
 ! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/user/repo.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
```

### Why This Happens
Git protects your repository against accidental data loss. If another collaborator (or you via GitHub web interface) pushed commits to `main`, your local branch is behind the remote tracking branch (`origin/main`). A direct push would overwrite the remote history.

### The Complete Resolution Workflow

#### Case 1: You have no uncommitted local changes
```bash
# Pull and integrate remote commits
git pull --rebase origin main

# If no conflicts, push your changes
git push origin main
```

#### Case 2: You have uncommitted local changes in progress
```bash
# Step 1: Stash your current uncommitted changes
git stash push -m "temp work before pull"

# Step 2: Fetch and rebase/merge remote commits
git pull --rebase origin main

# Step 3: Pop your stashed work back
git stash pop

# Step 4: Verify status, test code, stage, commit, and push
git status
git add .
git commit -m "fix: your local changes"
git push origin main
```

---

## 2. Resolving Merge Conflicts

A conflict occurs when two branches modify the same lines in a file, or one branch deletes a file that another modified.

### Identifying the Conflict Markers
When a conflict happens, Git pauses and marks the conflicting files with conflict markers:

```html
<<<<<<< HEAD
<h1>Welcome to Our Store</h1>
<p>Special discounts this weekend!</p>
=======
<h1>Welcome to the Mega Store</h1>
<p>Exclusive deals for members only.</p>
>>>>>>> feature/store-update
```
* `<<<<<<< HEAD`: The changes on your currently checked-out branch.
* `=======`: The divider separating the two conflicting versions.
* `>>>>>>> feature/store-update`: The changes from the incoming branch you are merging.

### Resolution Steps
1. Open the conflicting file in your text editor.
2. Edit the content to the desired final version and remove all conflict marker lines (`<<<<<<<`, `=======`, `>>>>>>>`).
3. Save the file.
4. Mark the file as resolved:
   ```bash
   git add path/to/conflicting-file.html
   ```
5. Complete the merge or continue the rebase:
   ```bash
   # If merging:
   git commit -m "merge: resolve conflicts in index.html"

   # If rebasing:
   git rebase --continue
   ```

### Aborting a Conflict
If the conflict is too messy and you want to start over:
```bash
# Abort a merge
git merge --abort

# Abort a rebase
git rebase --abort
```

---

## 3. Resolving Line Ending Warnings (CRLF vs. LF)

### The Warning
```text
warning: LF will be replaced by CRLF in file.txt.
The file will have its original line endings in your working directory.
```

### Explanation
* **Windows** uses `CRLF` (Carriage Return `\r` + Line Feed `\n`).
* **macOS and Linux** use `LF` (Line Feed `\n`).
Without standardized configuration, switching between Windows and macOS/Linux can cause Git to see every line of a file as modified.

### Solution 1: Configure `core.autocrlf`
```bash
# Windows users:
git config --global core.autocrlf true

# macOS and Linux users:
git config --global core.autocrlf input
```

### Solution 2: Standardize with `.gitattributes` (Best Practice)
Place a `.gitattributes` file in the root of your repository so team members on any operating system share consistent line endings:

```gitattributes
# Auto-detect text files and normalize line endings to LF on commit
* text=auto

# Explicitly declare text files you want normalized to LF
*.js text eol=lf
*.ts text eol=lf
*.html text eol=lf
*.css text eol=lf
*.md text eol=lf
*.sh text eol=lf

# Explicitly declare Windows batch files to use CRLF
*.bat text eol=crlf
*.cmd text eol=crlf

# Denote all binary files to prevent corruption
*.png binary
*.jpg binary
*.pdf binary
*.docx binary
```

To normalize existing files across the repository after configuring `.gitattributes`:
```bash
git add --renormalize .
git commit -m "chore: normalize line endings according to .gitattributes"
```

---

## 4. Undoing Mistakes Safely

| Goal | Command | Safe for Shared/Pushed Commits? |
|---|---|---|
| Discard unstaged changes in a file | `git restore <file>` | Yes (local only) |
| Unstage a staged file | `git restore --staged <file>` | Yes (local only) |
| Amend the message or contents of the latest commit | `git commit --amend` | Only if not pushed |
| Undo commits keeping all changes in staging | `git reset --soft HEAD~1` | Only if not pushed |
| Undo commits keeping changes as unstaged edits | `git reset --mixed HEAD~1` | Only if not pushed |
| Completely discard commit and all changes | `git reset --hard HEAD~1` | Destructive |
| Safely revert a commit that is already pushed | `git revert <commit-hash>` | **Yes! Always safe** |

### Safely Undoing Pushed Commits with `git revert`
`git revert` does not rewrite history; instead, it generates a **new commit** that applies the exact inverse of the targeted commit:

```bash
# Revert the most recent commit
git revert HEAD

# Revert a specific past commit
git revert 4f7c2a1
```

---

## 5. Recovering "Lost" Commits: `git reflog`

If you ran `git reset --hard` by accident, deleted a branch with unmerged work, or checked out the wrong commit: **Git rarely loses data immediately.**

`git reflog` records every update to `HEAD` in your local repository for 30–90 days:

```bash
# View HEAD movement log
git reflog
```
Example output:
```text
4a3b2c1 HEAD@{0}: reset: moving to HEAD~1
8f9e0d1 HEAD@{1}: commit: add payment integration
3c2b1a0 HEAD@{2}: checkout: moving from main to feature
```

To recover the commit before the accidental reset (`HEAD@{1}` / `8f9e0d1`):
```bash
# Restore your branch to that commit
git reset --hard 8f9e0d1

# Or create a new branch from that commit
git switch -c recovered-work 8f9e0d1
```

---

## 6. Force Pushing: When and How

> [!CAUTION]
> Running `git push --force` (`-f`) unconditionally overwrites the remote branch. If a teammate pushed commits while you were rebasing, their commits will be permanently destroyed.

### The Safe Alternative: `--force-with-lease`
Always prefer `--force-with-lease`:
```bash
git push --force-with-lease origin feature-branch
```
`--force-with-lease` only allows the force push if the remote branch has **not** been updated by anyone else since your last fetch.
