#!/usr/bin/env bash
# ==============================================================================
# Script Name: safe_file_batch.sh
# Description: NUL-delimited safe file processing immune to spaces and newlines
# ==============================================================================
set -euo pipefail

TARGET_DIR="${1:-.}"
DRY_RUN=true
FILE_EXT="${2:-txt}"

if [[ ! -d "$TARGET_DIR" ]]; then
    echo "Error: Target directory '$TARGET_DIR' does not exist." >&2
    exit 1
fi

log() { printf '[%s] %s\n' "$(date +'%H:%M:%S')" "$*"; }

log "Scanning directory '$TARGET_DIR' for files ending in *.$FILE_EXT..."
processed_count=0

# Safe NUL-delimited file traversal:
while IFS= read -r -d '' file_path; do
    ((processed_count++))
    file_size=$(stat -c%s "$file_path" 2>/dev/null || stat -f%z "$file_path" 2>/dev/null || echo "0")
    sha=$(sha256sum "$file_path" 2>/dev/null | cut -d' ' -f1 || echo "N/A")
    
    if [ "$DRY_RUN" = true ]; then
        log "[DRY-RUN] File #$processed_count: '$file_path' (${file_size} bytes, SHA: ${sha:0:8}...)"
    else
        log "[ACTIVE] Processing file #$processed_count: '$file_path'"
    fi
done < <(find "$TARGET_DIR" -type f -name "*.$FILE_EXT" -print0)

log "Completed batch scan. Total files identified: $processed_count"
