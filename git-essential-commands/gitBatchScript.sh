#!/usr/bin/env bash
# ==============================================================================
# Git Automated Batch Commit & Push Helper
# Usage:
#   chmod +x gitBatchScript.sh
#   ./gitBatchScript.sh "docs: update notes"
# ==============================================================================

set -euo pipefail

COMMIT_MSG="${1:-chore: batch commit updates}"

echo "==> Checking repository status..."
git status -s

echo "==> Staging all modified and untracked files..."
git add -A

# Check if there are changes to commit
if git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "==> No changes to commit. Working tree clean."
    exit 0
fi

echo "==> Committing with message: '$COMMIT_MSG'..."
git commit -m "$COMMIT_MSG"

CURRENT_BRANCH=$(git branch --show-current)
echo "==> Pushing to origin/${CURRENT_BRANCH}..."
git push origin "$CURRENT_BRANCH"

echo "==> Repository synchronized successfully!"
