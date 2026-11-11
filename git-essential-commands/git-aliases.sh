#!/usr/bin/env bash
# ==============================================================================
# Script: git-aliases.sh
# Purpose: Installs, previews, or uninstalls essential modern Git aliases
# Repository: https://github.com/xivig/git-essential-commands
# License: MIT
# ==============================================================================

set -euo pipefail

# ANSI Color Codes
BOLD="\033[1m"
GREEN="\033[32m"
YELLOW="\033[33m"
CYAN="\033[36m"
RED="\033[31m"
RESET="\033[0m"

ALIASES=(
    "st:status -sb:Short status showing current branch and tracking status"
    "co:switch:Modern branch switching (Git 2.23+)"
    "cob:switch -c:Create and switch to a new branch"
    "br:branch -vv:List local branches with upstream tracking and ahead/behind counts"
    "bra:branch -a -vv:List all local and remote branches"
    "ci:commit:Standard commit with editor"
    "cm:commit -m:Fast single-line commit"
    "cma:commit -am:Stage tracked modifications and commit"
    "amend:commit --amend --no-edit:Amend recent commit without altering commit message"
    "unstage:restore --staged:Safely remove file from staging area back to working directory"
    "discard:restore:Safely discard working directory modifications to a file"
    "undo:reset --soft HEAD~1:Undo the last commit keeping all changes staged in the index"
    "lg:log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --date=relative:Beautiful ANSI-colored commit graph"
    "hist:log --pretty=format:'%C(yellow)%h%Creset %ad | %s%d [%C(green)%an%Creset]' --graph --date=short:Date-oriented compact commit history"
    "last:log -1 HEAD --stat:Inspect the very last commit and its modified file statistics"
    "diffs:diff --staged:Inspect diff between staging area and HEAD commit"
    "diffw:diff --color-words:Word-level diff instead of line-level diff"
    "remotes:remote -v:List configured remote repositories with fetch and push URLs"
    "prune-all:fetch --prune --all:Fetch all remotes and delete stale remote-tracking branches"
    "wip:!git add -A && git commit -m 'chore: work in progress [skip ci]':Fast checkpoint commit"
    "unwip:!git reset --soft HEAD~1:Rollback WIP commit keeping staged changes"
)

show_help() {
    cat <<EOF
${BOLD}Git Essential Aliases Installer${RESET}
Usage: $(basename "$0") [OPTION]

Options:
  --install     Apply modern high-velocity aliases to your global ~/.gitconfig
  --preview     List all aliases and their corresponding Git commands without applying
  --uninstall   Remove all configured aliases from your global ~/.gitconfig
  --help, -h    Display this help menu and exit
EOF
}

preview_aliases() {
    echo -e "${CYAN}${BOLD}=== High-Velocity Git Aliases Preview ===${RESET}\n"
    printf "${BOLD}%-14s %-60s %s${RESET}\n" "ALIAS" "GIT COMMAND" "DESCRIPTION"
    printf "%-14s %-60s %s\n" "--------------" "------------------------------------------------------------" "----------------------------------------"
    for item in "${ALIASES[@]}"; do
        IFS=":" read -r name cmd desc <<< "$item"
        printf "${GREEN}%-14s${RESET} ${YELLOW}%-60s${RESET} %s\n" "git $name" "$cmd" "$desc"
    done
    echo ""
}

install_aliases() {
    echo -e "${CYAN}${BOLD}Configuring Git Global Aliases...${RESET}\n"
    for item in "${ALIASES[@]}"; do
        IFS=":" read -r name cmd desc <<< "$item"
        git config --global "alias.$name" "$cmd"
        echo -e "  [${GREEN}OK${RESET}] Configured ${BOLD}git $name${RESET} -> ${YELLOW}$cmd${RESET}"
    done

    # Recommended productivity configurations
    git config --global init.defaultBranch main
    git config --global pull.ff only
    git config --global merge.conflictstyle zdiff3
    git config --global diff.colorMoved default

    echo -e "\n${GREEN}${BOLD}✓ All aliases and modern Git ergonomics successfully configured in ~/.gitconfig!${RESET}"
    echo -e "Test your new log graph now by running: ${CYAN}git lg${RESET}\n"
}

uninstall_aliases() {
    echo -e "${YELLOW}${BOLD}Removing Git Global Aliases...${RESET}\n"
    for item in "${ALIASES[@]}"; do
        IFS=":" read -r name cmd desc <<< "$item"
        git config --global --unset "alias.$name" 2>/dev/null || true
        echo -e "  [${RED}REMOVED${RESET}] Removed alias: ${BOLD}git $name${RESET}"
    done
    echo -e "\n${GREEN}${BOLD}✓ Git aliases removed from global config.${RESET}\n"
}

case "${1:-}" in
    --install)
        install_aliases
        ;;
    --preview)
        preview_aliases
        ;;
    --uninstall)
        uninstall_aliases
        ;;
    --help|-h)
        show_help
        ;;
    "")
        preview_aliases
        echo -e "To install these aliases globally, run: ${CYAN}$(basename "$0") --install${RESET}\n"
        ;;
    *)
        echo -e "${RED}Error: Unknown argument '$1'${RESET}\n"
        show_help
        exit 1
        ;;
esac
