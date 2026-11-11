#!/usr/bin/env bash
# ==============================================================================
# Script Name: git_aliases_setup.sh
# Description: Installs productivity Git aliases including graphical commit logs
# ==============================================================================
set -euo pipefail

echo "Configuring high-velocity Git aliases..."

# Everyday status & shortcuts
git config --global alias.s "status -s"
git config --global alias.co "switch"
git config --global alias.cb "switch -c"
git config --global alias.cm "commit -m"
git config --global alias.ca "commit --amend --no-edit"
git config --global alias.df "diff"
git config --global alias.dfs "diff --staged"
git config --global alias.last "log -1 HEAD --stat"
git config --global alias.br "branch -av"

# Beautiful Colored ASCII Graph Alias:
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative"

echo "Configured aliases:"
echo "  git s     -> git status -s"
echo "  git co    -> git switch"
echo "  git cb    -> git switch -c <new_branch>"
echo "  git cm    -> git commit -m <msg>"
echo "  git ca    -> git commit --amend --no-edit"
echo "  git df    -> git diff"
echo "  git dfs   -> git diff --staged"
echo "  git lg    -> Visual colorized ASCII commit graph"
echo "Aliases installed successfully."
