# 02: System, File & CLI Automation Guide

Defensive programming patterns for shell scripts handling filesystem operations, command-line arguments, deployment pipelines, and loops.

---

## 1. `deploy_service.sh`: The Canonical Strict Mode Template

### 1.1 Anatomy of a Production Script
Every production script should follow this structural blueprint:

```bash
#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# Global constants and color codes
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly TEMP_DIR="$(mktemp -d "/tmp/deploy_XXXXXX")"

# Mandatory Cleanup Trap
cleanup() {
    local exit_code=$?
    rm -rf "$TEMP_DIR"
    if [ "$exit_code" -ne 0 ]; then
        echo "Deployment failed with exit code $exit_code. Cleaned up." >&2
    fi
    exit "$exit_code"
}
trap cleanup EXIT INT TERM
```

### 1.2 Signal Trapping Mechanics
* `EXIT`: Fires when the script terminates under any circumstance (clean exit or crash).
* `INT`: Fires on `Ctrl + C` interrupt.
* `TERM`: Fires on `kill <pid>` termination signal.

By trapping all three, you guarantee temporary directories are never orphaned on disk.

---

## 2. `parse_arguments.sh`: Production CLI Flag Parsing

### 2.1 Why Avoid `getopts` for Complex Scripts?
Standard POSIX `getopts` only supports single-character flags (`-h`, `-v`). It does not support long flags (`--host`, `--dry-run`, `--config`).

`parse_arguments.sh` implements a pure-Bash `while [ $# -gt 0 ]` loop with `case "$1"`:

```bash
while [ $# -gt 0 ]; do
    case "$1" in
        -h|--help)
            show_help
            exit 0
            ;;
        -e|--env)
            [[ $# -lt 2 ]] && { echo "Error: --env requires an argument" >&2; exit 1; }
            ENVIRONMENT="$2"
            shift 2
            ;;
        -p|--port)
            [[ $# -lt 2 ]] && { echo "Error: --port requires an argument" >&2; exit 1; }
            # Validate integer with regex
            if [[ ! "$2" =~ ^[0-9]+$ ]] || (( $2 < 1 || $2 > 65535 )); then
                echo "Error: Invalid port number '$2' (must be 1-65535)" >&2
                exit 1
            fi
            PORT="$2"
            shift 2
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        --) # End of all options
            shift
            break
            ;;
        -*)
            echo "Error: Unknown option '$1'" >&2
            exit 1
            ;;
        *) # Positional arguments
            POSITIONAL_ARGS+=("$1")
            shift
            ;;
    esac
done
```

---

## 3. `safe_file_batch.sh`: NUL-Delimited Safety

### 3.1 The Space and Newline Dilemma
Filenames on Unix can contain any character except the NUL byte (`\0`) and forward slash (`/`).
Using `for file in $(ls *.csv)` is fatal:
* A file named `Quarterly Report 2026.csv` splits into three tokens: `Quarterly`, `Report`, and `2026.csv`.
* A file containing a newline (`Report\nNov.csv`) corrupts stream processing.

### 3.2 The NUL Invariant
`safe_file_batch.sh` uses `find -print0` paired with `read -d ''`:
```bash
find "$TARGET_DIR" -type f -name "*.$EXT" -print0 | while IFS= read -r -d '' file; do
    printf "Processing safe file: %s\n" "$file"
done
```
The NUL delimiter guarantees that filenames with spaces, tabs, and newlines are processed safely as single atomic strings.

---

## 4. `directory_inventory.sh`: TSV Filesystem Catalogs

Generates structured TSV reports capturing file paths, sizes, permission octals, and modification timestamps for filesystem audits and migration verification:
```bash
./directory_inventory.sh /var/www audit_report.tsv
```
