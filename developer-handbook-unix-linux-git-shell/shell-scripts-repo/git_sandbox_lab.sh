#!/usr/bin/env bash
# ==============================================================================
# Script Name: git_sandbox_lab.sh
# Description: Creates an isolated Git playground with branches & simulated conflict
# ==============================================================================
set -euo pipefail

LAB_DIR="$HOME/git-practice-sandbox"

echo "Initializing hands-on Git practice sandbox at '$LAB_DIR'..."
rm -rf "$LAB_DIR"
mkdir -p "$LAB_DIR"
cd "$LAB_DIR"

git init -q
git config user.name "Sandbox Developer"
git config user.email "sandbox@example.com"

# Initial commit
cat <<'EOF' > README.md
# Sandbox Project
Interactive practice environment for Git commands.
EOF
git add README.md
git commit -q -m "docs: initialize repository"

# Create feature branch
git switch -q -c feature/calc
cat <<'EOF' > calc.py
def add(a, b):
    return a + b
EOF
git add calc.py
git commit -q -m "feat(calc): implement addition"

# Switch back to main and create concurrent edit
git switch -q main
cat <<'EOF' >> README.md

## Main Updates
Concurrent work committed directly on main branch.
EOF
git commit -q -am "docs: update main branch documentation"

echo "Sandbox created successfully!"
echo "Location: $LAB_DIR"
echo "Active branches: main, feature/calc"
echo "Try running:"
echo "  cd $LAB_DIR"
echo "  git log --graph --oneline --all"
echo "  git merge feature/calc"
