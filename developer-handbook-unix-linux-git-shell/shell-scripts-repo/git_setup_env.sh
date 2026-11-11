#!/usr/bin/env bash
# ==============================================================================
# Script Name: git_setup_env.sh
# Description: Automated global Git configuration with cross-platform defaults
# ==============================================================================
set -euo pipefail

echo "=== Git Automated Global Environment Setup ==="

# Check Git installation
if ! command -v git >/dev/null 2>&1; then
    echo "Error: Git is not installed or not on system PATH." >&2
    exit 1
fi

echo "Git Version: $(git --version)"

# Author Setup
CURRENT_NAME=$(git config --global user.name || echo "")
CURRENT_EMAIL=$(git config --global user.email || echo "")

read -r -p "Enter your Full Name [$CURRENT_NAME]: " INPUT_NAME
NAME="${INPUT_NAME:-$CURRENT_NAME}"

read -r -p "Enter your GitHub Email [$CURRENT_EMAIL]: " INPUT_EMAIL
EMAIL="${INPUT_EMAIL:-$CURRENT_EMAIL}"

if [[ -n "$NAME" ]]; then
    git config --global user.name "$NAME"
fi
if [[ -n "$EMAIL" ]]; then
    git config --global user.email "$EMAIL"
fi

# Modern Standard Defaults
git config --global init.defaultBranch main
git config --global pull.rebase false

# Cross-platform line endings
case "$(uname -s)" in
    CYGWIN*|MINGW*|MSYS*)
        git config --global core.autocrlf true
        echo "Configured core.autocrlf=true for Windows environment."
        ;;
    *)
        git config --global core.autocrlf input
        echo "Configured core.autocrlf=input for Unix/macOS environment."
        ;;
esac

echo -e "\n--- Configured Git Global Settings ---"
git config --global --list | grep -E 'user\.|init\.|pull\.|core\.autocrlf'
echo "Git environment configuration completed successfully!"
