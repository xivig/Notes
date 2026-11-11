# Everyday Git Workflow & File Tracking

Mastering the day-to-day Git lifecycle: the three trees, staging, committing, diffing, log inspection, and writing bulletproof `.gitignore` configurations.

---

## 1. The Three States of Git

Git manages files across three distinct architectural areas:

```
+-------------------+        git add        +-------------------+       git commit      +-------------------+
| Working Directory | --------------------> |   Staging Area    | --------------------> |  Git Repository   |
| (Modified Files)  |                       |      (Index)      |                       |      (HEAD)       |
+-------------------+ <-------------------- +-------------------+ <-------------------- +-------------------+
                          git restore             git restore                             git checkout
                         (discard edit)            --staged                                  or switch
```

1. **Working Directory:** The local filesystem folder on your computer where you edit, create, and delete files.
2. **Staging Area (Index):** A temporary preview area that holds snapshot changes you intend to include in the next commit.
3. **Git Repository (HEAD):** The database where Git permanently stores your committed snapshots.

---

## 2. Checking Status: `git status`

`git status` inspects what has changed in your working directory and what is staged:

```bash
git status
```

### Compact Status (`-s` / `--short`)
For a fast, compact view, use the `-s` flag:

```bash
git status -s
```

Status code table:
* `??` : Untracked file
* ` A` : Added to staging area
* ` M` : Modified (not yet staged)
* `M ` : Modified and staged
* `MM` : Modified, staged, then modified again in the working directory
* ` D` : Deleted (not yet staged)
* `D ` : Deleted and staged

---

## 3. Staging Changes: `git add`

Moving changes from your working directory into the staging area:

```bash
# Stage a specific file
git add index.html

# Stage multiple files
git add app.js styles.css

# Stage all changes in current directory and subdirectories
git add .

# Stage all changes across the entire repository (including deletions)
git add -A
```

### Interactive Staging (`git add -p`)
Stage granular chunks ("hunks") within a single file rather than committing the entire file at once:

```bash
git add -p app.js
```
Key interactive prompts:
* `y` : stage this hunk
* `n` : do not stage this hunk
* `s` : split the current hunk into smaller hunks
* `q` : quit staging

---

## 4. Committing Changes: `git commit`

A commit records the staged snapshot into the repository's permanent history.

```bash
# Commit with an inline message
git commit -m "feat(auth): implement JWT token refresh"

# Open configured editor for multi-line commit message
git commit
```

### Writing Clear Commit Messages
Adhere to the Conventional Commits format for readable, automated changelogs:

```
<type>(<scope>): <short summary in imperative mood>

[optional body explaining WHY the change was made, trade-offs, context]

[optional footer, e.g., Fixes #123]
```

Common types:
* `feat`: A new feature
* `fix`: A bug fix
* `docs`: Documentation updates only
* `style`: Formatting, semicolons, whitespace (no code change)
* `refactor`: Restructuring code without changing behavior
* `perf`: Performance optimization
* `test`: Adding or modifying tests
* `chore`: Build tasks, package updates, dependencies

---

## 5. Inspecting Differences: `git diff`

Compare files across different stages:

```bash
# View unstaged changes in working tree compared to the staging area
git diff

# View staged changes compared to the last commit (HEAD)
git diff --staged
# or
git diff --cached

# Compare specific file
git diff path/to/file.js

# Compare two branches or commits
git diff main feature-branch
git diff commit_hash_A commit_hash_B
```

---

## 6. Mastering `.gitignore` & Cache Management

A `.gitignore` file tells Git which files or directories to ignore and never track.

### 6.1 Basic Pattern Rules
```gitignore
# Ignore the node_modules folder anywhere in the project
node_modules/

# Ignore compiled files
*.o
*.pyc
*.class

# Ignore build output folders
build/
dist/
coverage/

# Ignore OS-specific files
.DS_Store
Thumbs.db
desktop.ini

# Ignore local environment credentials
.env
.env.local
.env.*.local
*.pem
*.key

# Ignore log files
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Negation: ignore all .log files, BUT keep important.log
!important.log
```

### 6.2 The "Already Tracked" Problem & The Solution
If a file or folder (like `node_modules/` or `.env`) was committed **before** adding it to `.gitignore`, Git will continue tracking it even after adding it to `.gitignore`.

#### The Fix: Untrack without deleting local files
Use `git rm --cached`:

```bash
# Remove a single file from Git tracking (keeps file on disk)
git rm --cached .env

# Remove an entire directory (e.g. node_modules) recursively from cache
git rm -r --cached node_modules/

# Remove ALL cached files and re-index based on .gitignore
git rm -r --cached .
git add .
git commit -m "chore: stop tracking files specified in .gitignore"
```

### 6.3 Checking Why a File is Ignored
Use `git check-ignore` to debug ignore rules:

```bash
git check-ignore -v path/to/somefile.log
```
Output shows the exact `.gitignore` file and line number triggering the rule.

---

## 7. Viewing History: `git log`

Inspect repository commit logs:

```bash
# Standard full log
git log

# One-line compact log
git log --oneline

# Graphical branch visualization with tags and refs
git log --oneline --graph --all --decorate

# Show the last 5 commits
git log -n 5 --oneline

# Show commits modifying a specific file
git log -p path/to/file.js

# Show commit statistics (files changed, lines inserted/deleted)
git log --stat

# Filter commits by author or date
git log --author="Alice"
git log --since="2 weeks ago"
```

### Inspecting a Specific Commit: `git show`
```bash
# Show commit details and full diff for the latest commit
git show

# Show specific commit by hash
git show 7a9b3c4
```
