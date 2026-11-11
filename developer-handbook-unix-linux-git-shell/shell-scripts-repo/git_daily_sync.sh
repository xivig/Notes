#!/usr/bin/env bash
# ==============================================================================
# Script Name: git_daily_sync.sh
# Description: Automated morning Git sync, upstream pull, and dead branch pruning
# ==============================================================================
set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Error: Not inside a Git repository." >&2
    exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "=== Daily Git Health & Sync Utility ==="
echo "Active Repository: $(pwd)"
echo "Current Branch   : $BRANCH"

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "Notice: Uncommitted changes detected. Stashing changes..."
    git stash push -m "Auto-stash before daily sync $(date +%F)"
fi

# Fetch remote and prune deleted tracking branches
echo "Fetching from remote and pruning dead branches..."
git fetch --prune origin

# If on main, pull fast-forward
if [[ "$BRANCH" == "main" || "$BRANCH" == "master" ]]; then
    echo "Fast-forward pulling latest changes on $BRANCH..."
    git pull --ff-only origin "$BRANCH" || echo "Warning: Fast-forward not possible without merge."
else
    echo "Branch '$BRANCH' is not main. Checking upstream tracking status:"
    git status -s -b
fi

echo "Daily sync complete."
