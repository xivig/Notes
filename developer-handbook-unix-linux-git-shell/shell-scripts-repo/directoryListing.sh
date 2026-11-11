#!/usr/bin/env bash
# ==============================================================================
# Script Name: directory_inventory.sh (Enhanced directoryListing.sh)
# Description: Generates clean, structured CSV/TSV filesystem inventory
# ==============================================================================
set -euo pipefail

TARGET_DIR="${1:-.}"
OUTPUT_FILE="${2:-Directory_Inventory.tsv}"

log() { printf '[%s] %s\n' "$(date +'%H:%M:%S')" "$*"; }
log "Generating directory inventory for '$TARGET_DIR'..."

# Write TSV Header
printf "PATH\tTYPE\tSIZE_BYTES\tPERMISSIONS\tLAST_MODIFIED\n" > "$OUTPUT_FILE"

item_count=0
while IFS= read -r -d '' item; do
    ((item_count++))
    if [[ -d "$item" ]]; then
        ftype="DIR"
        fsize="-"
    else
        ftype="FILE"
        fsize=$(stat -c%s "$item" 2>/dev/null || stat -f%z "$item" 2>/dev/null || echo "0")
    fi
    
    perms=$(stat -c%A "$item" 2>/dev/null || stat -f%Sp "$item" 2>/dev/null || echo "---")
    mtime=$(stat -c%y "$item" 2>/dev/null || stat -f"%Sm" -t "%Y-%m-%d %H:%M:%S" "$item" 2>/dev/null || echo "unknown")
    
    printf "%s\t%s\t%s\t%s\t%s\n" "$item" "$ftype" "$fsize" "$perms" "$mtime" >> "$OUTPUT_FILE"
done < <(find "$TARGET_DIR" -maxdepth 4 -print0)

log "Inventory complete. Saved $item_count items to '$OUTPUT_FILE'."
