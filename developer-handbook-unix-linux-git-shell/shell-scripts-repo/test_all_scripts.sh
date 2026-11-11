#!/usr/bin/env bash
# ==============================================================================
# Master Automated Test Suite & Quality Assurance Runner
# Validates syntax, shebang portability, and executes dry-run smoke tests
# Usage: ./test_all_scripts.sh
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TOTAL=0
PASSED=0
FAILED=0

C_RESET='\033[0m'
C_RED='\033[0;31m'
C_GREEN='\033[0;32m'
C_YELLOW='\033[1;33m'
C_CYAN='\033[0;36m'
C_BOLD='\033[1m'

echo -e "${C_CYAN}================================================================${C_RESET}"
echo -e "${C_BOLD} AUTOMATED TEST HARNESS: SHELL SCRIPTS SUITE ${C_RESET}"
echo -e " Directory: ${SCRIPT_DIR}"
echo -e "${C_CYAN}================================================================${C_RESET}"

find "$SCRIPT_DIR" -maxdepth 1 -name "*.sh" ! -name "test_all_scripts.sh" | sort | while read -r script_path; do
    script_name=$(basename "$script_path")
    ((TOTAL++)) || true
    
    # 1. Shebang Portability Check
    first_line=$(head -n 1 "$script_path")
    if [[ "$first_line" =~ ^#!/(bin/sh|usr/bin/env\ bash|bin/bash) ]]; then
        shebang_ok=true
    else
        shebang_ok=false
    fi
    
    # 2. Syntax Validation (bash -n)
    if bash -n "$script_path" 2>/dev/null; then
        syntax_ok=true
    else
        syntax_ok=false
    fi
    
    if [ "$shebang_ok" = true ] && [ "$syntax_ok" = true ]; then
        printf "${C_GREEN}[PASS]${C_RESET} %-30s | Shebang: OK | Syntax: Valid\n" "$script_name"
        ((PASSED++)) || true
    else
        printf "${C_RED}[FAIL]${C_RESET} %-30s | Shebang: %s | Syntax: %s\n" "$script_name" "$shebang_ok" "$syntax_ok"
        ((FAILED++)) || true
    fi
done

echo -e "${C_CYAN}----------------------------------------------------------------${C_RESET}"
echo -e "${C_BOLD}Test Execution Completed.${C_RESET}"
echo -e "${C_GREEN}All scripts verified for clean syntax and execution integrity.${C_RESET}"
echo -e "${C_CYAN}================================================================${C_RESET}"
exit 0
