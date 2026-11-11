#!/usr/bin/env bash
# ==============================================================================
# Script Name: copy_file_each_dir.sh (Enhanced copyFileEachDir / copyOnEachDir)
# Description: Safely copies a source file into each subfolder up to max-depth
# ==============================================================================
set -euo pipefail

SOURCE_FILE="${1:-index.php}"
ROOT_DIR="${2:-.}"
MAX_DEPTH="${3:-5}"
DRY_RUN=false
[[ "${4:-}" == "--dry-run" ]] && DRY_RUN=true

if [[ ! -f "$SOURCE_FILE" ]]; then
    # Create empty source placeholder if not existing
    touch "$SOURCE_FILE"
    echo "Created placeholder '$SOURCE_FILE'"
fi

log() { printf '[%s] %s\n' "$(date +'%H:%M:%S')" "$*"; }
log "Copying '$SOURCE_FILE' into all subdirectories under '$ROOT_DIR' (depth <= $MAX_DEPTH)..."

copied_count=0
while IFS= read -r -d '' dir; do
    # Skip the root directory itself
    [[ "$dir" == "$ROOT_DIR" || "$dir" == "." ]] && continue
    
    ((copied_count++))
    if [ "$DRY_RUN" = true ]; then
        log "[DRY-RUN] Would copy '$SOURCE_FILE' -> '$dir/'"
    else
        cp -p "$SOURCE_FILE" "$dir/"
        log "[COPIED] '$SOURCE_FILE' -> '$dir/'"
    fi
done < <(find "$ROOT_DIR" -mindepth 1 -maxdepth "$MAX_DEPTH" -type d -print0)

log "Operation complete. Copied to $copied_count directories."
