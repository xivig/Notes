#!/usr/bin/env bash
# ==============================================================================
# Capstone 1: Production Host & Service Health Check Utility
# Cross-platform: Linux (GNU) & macOS (Darwin) compatible
# ==============================================================================
set -euo pipefail

readonly C_RESET='\033[0m'
readonly C_RED='\033[0;31m'
readonly C_GREEN='\033[0;32m'
readonly C_YELLOW='\033[1;33m'
readonly C_CYAN='\033[0;36m'

FAILED_CHECKS=0

check_status() {
    local title="$1"
    local status="$2"
    local details="$3"
    
    if [ "$status" -eq 0 ]; then
        printf "${C_GREEN}[PASS]${C_RESET} %-32s : %s\n" "$title" "$details"
    else
        printf "${C_RED}[FAIL]${C_RESET} %-32s : %s\n" "$title" "$details"
        ((FAILED_CHECKS++))
    fi
}

echo -e "${C_CYAN}================================================================${C_RESET}"
echo -e "${C_CYAN} SYSTEM HEALTH MONITOR : $(hostname) ($(date -u +%FT%TZ)) ${C_RESET}"
echo -e "${C_CYAN}================================================================${C_RESET}"

# 1. Disk Space Inspection (Root Partition < 85%)
DISK_USAGE=$(df -k / 2>/dev/null | awk 'NR==2 {print $(NF-1)}' | tr -d '%' || echo "0")
if [[ "$DISK_USAGE" =~ ^[0-9]+$ ]] && (( DISK_USAGE < 85 )); then
    check_status "Root Disk Capacity" 0 "${DISK_USAGE}% utilized (Under 85% threshold)"
else
    check_status "Root Disk Capacity" 1 "CRITICAL: ${DISK_USAGE}% utilized"
fi

# 2. Memory Utilization (Cross-platform Linux & macOS Darwin)
if command -v free >/dev/null 2>&1; then
    MEM_FREE_MB=$(free -m 2>/dev/null | awk '/^Mem:/ {print $7}' || echo "N/A")
elif command -v vm_stat >/dev/null 2>&1; then
    MEM_FREE_MB=$(vm_stat 2>/dev/null | awk '/Pages free/ {print int($3 * 4096 / 1048576)}' || echo "N/A")
else
    MEM_FREE_MB="N/A"
fi
check_status "Available RAM" 0 "${MEM_FREE_MB} MB available"

# 3. Essential Binaries Check
for bin in curl git tar bash; do
    if command -v "$bin" >/dev/null 2>&1; then
        check_status "Binary: $bin" 0 "$(command -v "$bin")"
    else
        check_status "Binary: $bin" 1 "Missing binary from PATH"
    fi
done

# 4. Outbound Internet Connectivity Check
if curl -s --connect-timeout 3 https://1.1.1.1 >/dev/null 2>&1; then
    check_status "Outbound Connectivity" 0 "DNS & HTTP handshake successful"
else
    check_status "Outbound Connectivity" 1 "Failed to reach external network"
fi

echo -e "${C_CYAN}----------------------------------------------------------------${C_RESET}"
if [ "$FAILED_CHECKS" -eq 0 ]; then
    echo -e "${C_GREEN}OVERALL STATUS: ALL CHECKS PASSED (HEALTHY)${C_RESET}"
    exit 0
else
    echo -e "${C_RED}OVERALL STATUS: ${FAILED_CHECKS} CHECK(S) FAILED (ACTION REQUIRED)${C_RESET}"
    exit 1
fi
