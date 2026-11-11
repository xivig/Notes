#!/usr/bin/env bash
# ==============================================================================
# Script Name: git_ssh_keygen.sh
# Description: Generates modern ED25519 SSH key pair & registers with ssh-agent
# ==============================================================================
set -euo pipefail

EMAIL=$(git config --global user.email || echo "developer@example.com")
KEY_PATH="$HOME/.ssh/id_ed25519"

echo "=== GitHub SSH Authentication Setup ==="

if [[ -f "$KEY_PATH" ]]; then
    echo "Notice: An ED25519 key already exists at '$KEY_PATH'."
else
    echo "Generating new ED25519 SSH key for '$EMAIL'..."
    mkdir -p "$HOME/.ssh"
    chmod 700 "$HOME/.ssh"
    ssh-keygen -t ed25519 -C "$EMAIL" -f "$KEY_PATH"
fi

# Ensure ssh-agent is running and add key
eval "$(ssh-agent -s)"
ssh-add "$KEY_PATH" 2>/dev/null || true

echo -e "\n--- Your Public SSH Key (Add this to GitHub Settings -> SSH Keys) ---"
cat "${KEY_PATH}.pub"
echo "---------------------------------------------------------------------"

echo -e "\nTesting authentication to GitHub (ssh -T git@github.com)..."
ssh -T -o StrictHostKeyChecking=accept-new git@github.com 2>&1 || true
