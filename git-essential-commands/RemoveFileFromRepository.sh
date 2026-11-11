#!/usr/bin/env bash
# ==============================================================================
# Untrack & Remove Files from Git Repository Without Deleting Local Copies
# ==============================================================================

set -e

echo "=== Git Untrack & Cache Cleanup Utility ==="

# ------------------------------------------------------------------------------
# 1. Untrack specific files or directories while keeping local files intact
# ------------------------------------------------------------------------------
# Syntax: git rm --cached <path>
# Example:
#   git rm --cached .env
#   git rm -r --cached node_modules/

# ------------------------------------------------------------------------------
# 2. Mass-remove all tracked .DS_Store and Thumbs.db files from git index
# ------------------------------------------------------------------------------
echo "Removing tracked .DS_Store and Thumbs.db from git index..."
find . \( -name ".DS_Store" -o -name "Thumbs.db" \) -print0 | xargs -0 git rm --cached --ignore-unmatch 2>/dev/null || true

# ------------------------------------------------------------------------------
# 3. Ensure global / repo-level .gitignore ignores these patterns
# ------------------------------------------------------------------------------
if ! grep -q "^\.DS_Store$" .gitignore 2>/dev/null; then
  echo ".DS_Store" >> .gitignore
fi

if ! grep -q "^Thumbs\.db$" .gitignore 2>/dev/null; then
  echo "Thumbs.db" >> .gitignore
fi

# ------------------------------------------------------------------------------
# 4. Commit gitignore and untracked changes
# ------------------------------------------------------------------------------
git add .gitignore
git commit -m "chore: untrack OS-generated files (.DS_Store, Thumbs.db) and update .gitignore" || echo "Working tree already clean."

echo "Completed successfully!"
