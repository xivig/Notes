#!/usr/bin/env bash
# ==============================================================================
# Capstone 3: Safe Batch File Organizer with Rollback Manifest & Rollback Mode
# Usage:
#   Organize: ./capstone3_batch_organizer.sh [--dry-run] <target_dir>
#   Rollback: ./capstone3_batch_organizer.sh --rollback <manifest_path.tsv>
# ==============================================================================
set -euo pipefail

log() { printf '[%s] %s\n' "$(date +'%H:%M:%S')" "$*"; }

# Check for Rollback Mode
if [[ "${1:-}" == "--rollback" ]]; then
    MANIFEST="${2:-}"
    if [[ -z "$MANIFEST" || ! -f "$MANIFEST" ]]; then
        echo "Usage Error: Please specify a valid manifest file." >&2
        echo "Example: $0 --rollback /path/to/organizer_rollback_YYYYMMDD_HHMMSS.tsv" >&2
        exit 1
    fi
    
    log "Initiating atomic rollback from manifest: $MANIFEST"
    count=0
    # Read TSV skipping header line
    tail -n +2 "$MANIFEST" | while IFS=$'\t' read -r src dest; do
        if [[ -f "$dest" ]]; then
            mkdir -p "$(dirname "$src")"
            mv -n "$dest" "$src"
            log "[RESTORED] '$dest' -> '$src'"
            ((count++)) || true
        else
            log "[WARN] File '$dest' not found. Skipping."
        fi
    done
    log "Rollback finished. Restored files."
    exit 0
fi

# Organization Mode
DRY_RUN=false
[[ "${1:-}" == "--dry-run" ]] && { DRY_RUN=true; shift; }

TARGET_DIR="${1:-./downloads}"
mkdir -p "$TARGET_DIR"

MANIFEST_FILE="$TARGET_DIR/organizer_rollback_$(date +%Y%m%d_%H%M%S).tsv"
mkdir -p "$TARGET_DIR"/{docs,images,archives,data,misc}

log "Starting file organization for: $TARGET_DIR (Dry Run: $DRY_RUN)"
[[ "$DRY_RUN" == false ]] && printf "SOURCE\tDESTINATION\n" > "$MANIFEST_FILE"

find "$TARGET_DIR" -maxdepth 1 -type f -print0 | while IFS= read -r -d '' filepath; do
    filename=$(basename "$filepath")
    
    # Skip manifest files
    [[ "$filename" == organizer_rollback_* ]] && continue
    
    ext="${filename##*.}"
    ext=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
    
    case "$ext" in
        pdf|doc|docx|txt|md)   category="docs" ;;
        jpg|jpeg|png|gif|svg)  category="images" ;;
        zip|tar|gz|bz2|xz|7z)  category="archives" ;;
        csv|json|xml|yaml|yml) category="data" ;;
        *)                     category="misc" ;;
    esac
    
    dest="$TARGET_DIR/$category/$filename"
    
    if [ "$DRY_RUN" = true ]; then
        log "[PREVIEW] Move '$filename' -> '$category/'"
    else
        printf "%s\t%s\n" "$filepath" "$dest" >> "$MANIFEST_FILE"
        mv -n "$filepath" "$dest"
        log "[MOVED] '$filename' -> '$category/'"
    fi
done

log "Batch organization complete."
if [[ "$DRY_RUN" == false ]]; then
    log "Rollback manifest saved at: $MANIFEST_FILE"
    log "To revert all changes, run: $0 --rollback '$MANIFEST_FILE'"
fi
