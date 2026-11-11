# Git Fundamentals & Environment Setup

A beginner-to-advanced guide on understanding version control, installing Git across operating systems, configuring essential global settings, and establishing secure authentication via SSH and HTTPS.

---

## 1. What is Version Control and Git?

**Version Control** is a system that records changes to a file or set of files over time so that you can recall specific versions later, compare changes, see who modified what, and collaborate seamlessly without overwriting anyone's work.

### Centralized vs. Distributed (VCS)
* **Centralized VCS (SVN, CVS):** A single central server contains all versioned files. If the server goes down, collaboration halts; if the hard disk of the central database corrupts without a backup, you lose everything.
* **Distributed VCS (Git):** Every clone is a complete repository with the entire historical snapshot. If any server dies, any of the client repositories can be copied back up to the server to restore it.

---

## 2. Installing Git

### macOS
macOS comes with Apple's command-line developer tools, or you can install the latest upstream version via [Homebrew](https://brew.sh/):

```bash
# Option A: Install Xcode Command Line Tools (includes git)
xcode-select --install

# Option B: Install the latest Git via Homebrew (recommended)
brew install git
```
Verify the installation:
```bash
git --version
```

### Linux (Debian / Ubuntu / Linux Mint)
```bash
sudo apt update
sudo apt install git -y
```

### Linux (RHEL / CentOS / Fedora)
```bash
# Fedora
sudo dnf install git -y

# RHEL / CentOS
sudo yum install git -y
```

### Windows
Download the official installer from [git-scm.com](https://git-scm.com/) or install via winget / chocolatey:
```powershell
winget install --id Git.Git -e --source winget
```

---

## 3. Essential First-Time Git Configuration

Git comes with a tool called `git config` that lets you get and set configuration variables that control all facets of how Git looks and operates.

### 3.1 Identity Configuration
Set your name and email address. **This is critical** because every Git commit uses this information to establish authorship:

```bash
# Set your name and email globally
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

> [!NOTE]
> If you contribute to GitHub, ensure this email matches an email registered in your GitHub account so commits are properly linked to your profile.

### 3.2 Default Branch Name
Modern Git and GitHub use `main` as the default branch name instead of the legacy `master`:

```bash
git config --global init.defaultBranch main
```

### 3.3 Default Text Editor
Set your preferred terminal editor (e.g., Nano, Vim, VS Code):

```bash
# Use Nano
git config --global core.editor "nano"

# Use Vim
git config --global core.editor "vim"

# Use Visual Studio Code
git config --global core.editor "code --wait"
```

### 3.4 Line Endings Configuration (`core.autocrlf`)
Operating systems handle newlines differently:
* **Windows:** Carriage Return + Line Feed (`CRLF` / `\r\n`)
* **macOS & Linux:** Line Feed (`LF` / `\n`)

To prevent Git from marking entire files as changed simply due to newline formatting:

```bash
# On Windows:
git config --global core.autocrlf true

# On macOS and Linux:
git config --global core.autocrlf input
```

### 3.5 Checking Your Configuration
List all configured settings and where they originate:
```bash
git config --list --show-origin
```

---

## 4. Authentication: HTTPS vs. SSH

To push commits to remote hosting providers like GitHub or GitLab, you must authenticate.

### Method A: HTTPS with Personal Access Tokens (PAT)
GitHub no longer accepts plain account passwords for command-line Git operations. You must use a **Personal Access Token (Classic or Fine-grained)**.

1. Go to **GitHub Settings** > **Developer Settings** > **Personal access tokens** > **Tokens (classic)**.
2. Generate a new token with the `repo` scope.
3. Copy the token.
4. When Git prompts for your password in the terminal, paste your token instead.

To avoid entering credentials every time, enable the credential helper:
```bash
# On macOS:
git config --global credential.helper osxkeychain

# On Windows:
git config --global credential.helper wincred

# On Linux (cache for 1 hour):
git config --global credential.helper 'cache --timeout=3600'
```

### Method B: SSH Keys (Recommended & Most Secure)
SSH allows you to establish a secure, password-less connection between your computer and GitHub.

#### Step 1: Check for existing SSH keys
```bash
ls -la ~/.ssh
```
Look for `id_ed25519.pub` or `id_rsa.pub`.

#### Step 2: Generate a new Ed25519 SSH Key
The `Ed25519` algorithm is modern, compact, and cryptographically superior:
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```
Press `Enter` to accept the default file location. You may optionally enter a passphrase.

#### Step 3: Start the SSH agent and add your key
```bash
eval "$(ssh-agent -s)"

# On macOS (saves passphrase to Apple Keychain):
ssh-add --apple-use-keychain ~/.ssh/id_ed25519

# On Linux / Windows (Git Bash):
ssh-add ~/.ssh/id_ed25519
```

#### Step 4: Copy the public key to GitHub
```bash
# macOS
pbcopy < ~/.ssh/id_ed25519.pub

# Linux (with xclip installed)
xclip -selection clipboard < ~/.ssh/id_ed25519.pub

# Or simply display the key and copy it manually:
cat ~/.ssh/id_ed25519.pub
```
1. In GitHub, go to **Settings** > **SSH and GPG keys** > **New SSH key**.
2. Give it a title (e.g., "MacBook Pro M2" or "Workstation").
3. Paste the public key and save.

#### Step 5: Test the connection
```bash
ssh -T git@github.com
```
You should see:
`Hi username! You've successfully authenticated, but GitHub does not provide shell access.`

---

## 5. Initializing vs. Cloning a Repository

### Starting from Scratch: `git init`
Turn an existing folder on your computer into a Git repository:

```bash
mkdir my-new-project
cd my-new-project

# Initialize Git repository
git init

# Create your first file
echo "# My New Project" > README.md

# Stage and commit
git add README.md
git commit -m "Initial commit"
```

### Downloading an Existing Project: `git clone`
Copy a repository that already exists on GitHub to your local machine:

```bash
# Cloning via HTTPS
git clone https://github.com/username/repository.git

# Cloning via SSH (recommended if SSH keys configured)
git clone git@github.com:username/repository.git

# Cloning into a specific custom directory name
git clone https://github.com/username/repository.git my-custom-folder
```

---

## 6. Anatomy of the `.git` Directory

When you run `git init`, a hidden directory named `.git` is created. This folder holds the entire repository database:

* `HEAD`: A reference pointing to the currently checked-out branch.
* `config`: Repository-specific configuration settings.
* `index`: The staging area binary file recording files prepared for commit.
* `objects/`: The object database containing all blobs (file contents), trees (directory structures), commits, and annotated tags.
* `refs/`: Pointers to commit objects (local branches, remote branches, tags).
* `hooks/`: Client-side or server-side scripts triggered by Git actions (e.g., pre-commit, post-merge).

> [!CAUTION]
> Never manually delete or edit binary files inside `.git` unless you are using dedicated Git plumbing commands. Deleting `.git` removes all version history for that project.
