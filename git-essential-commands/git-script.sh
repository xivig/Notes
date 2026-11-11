
#!/usr/bin/env bash

# Professional Git Commit & Push Helper
# Usage:
#   ./git-script.sh
#   ./git-script.sh "feat: add user dashboard"

set -Eeuo pipefail

readonly SCRIPT_NAME="Git Commit & Push"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info()    { echo -e "${BLUE}[INFO]${NC} $*"; }
success() { echo -e "${GREEN}[SUCCESS]${NC} $*"; }
warning() { echo -e "${YELLOW}[WARNING]${NC} $*"; }
error()   { echo -e "${RED}[ERROR]${NC} $*" >&2; }

fail() {
    error "$*"
    exit 1
}

confirm() {
    local answer
    read -r -p "$1 [y/N]: " answer
    [[ "$answer" =~ ^[Yy]$ ]]
}

# 1. Verify Git installation
command -v git >/dev/null 2>&1 || fail "Git is not installed."

# 2. Verify repository
git rev-parse --is-inside-work-tree >/dev/null 2>&1 \
    || fail "Current directory is not a Git repository."

# 3. Detect current branch
BRANCH=$(git branch --show-current)

[[ -n "$BRANCH" ]] || fail "Could not detect current branch. Are you in detached HEAD state?"

# 4. Verify remote
git remote get-url origin >/dev/null 2>&1 \
    || fail "Remote 'origin' is not configured."

REMOTE_URL=$(git remote get-url origin)

echo
echo "======================================"
echo "       $SCRIPT_NAME"
echo "======================================"
echo "Branch : $BRANCH"
echo "Remote : $REMOTE_URL"
echo

# 5. Check working tree
info "Checking repository status..."
git status --short

# 6. Stage changes
echo
info "Staging all changes..."

git add -A

# 7. Check staged changes
if git diff --cached --quiet; then
    warning "No changes to commit."
    exit 0
fi

echo
info "Staged changes:"
git diff --cached --stat

echo
warning "Review staged changes for secrets or unwanted files."
git diff --cached --check || fail "Whitespace errors detected."

# 8. Get commit message
COMMIT_MESSAGE="${1:-}"

if [[ -z "$COMMIT_MESSAGE" ]]; then
    read -r -p "Enter commit message: " COMMIT_MESSAGE
fi

[[ -n "$COMMIT_MESSAGE" ]] || fail "Commit message cannot be empty."

# 9. Confirm commit
echo
info "Commit message: $COMMIT_MESSAGE"

confirm "Proceed with commit?" || {
    warning "Commit cancelled. Your changes remain staged."
    exit 0
}

git commit -m "$COMMIT_MESSAGE"

success "Commit created successfully."

# 10. Confirm push
echo

confirm "Push branch '$BRANCH' to origin?" || {
    warning "Commit completed, but push was skipped."
    exit 0
}

# 11. Push using existing upstream or set one
if git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}' \
    >/dev/null 2>&1; then

    git push

else
    git push --set-upstream origin "$BRANCH"
fi

success "Changes pushed successfully!"
echo
info "Final repository status:"
git status --short --branch

echo
success "All operations completed."
