#!/usr/bin/env bash
# ==============================================================================
# Script Name: parse_arguments.sh
# Description: Robust CLI argument parser supporting short/long options & flags
# ==============================================================================
set -euo pipefail

# Default values
ENVIRONMENT="development"
VERBOSE=false
DRY_RUN=false
PORT=8080
TARGET_HOST=""

usage() {
    cat <<EOF
Usage: $(basename "$0") [OPTIONS] --host <hostname>

Options:
  -h, --help            Show this help message and exit
  -e, --env <name>      Target environment: development, staging, production (default: development)
  -p, --port <number>   Network port number (default: 8080)
  -v, --verbose         Enable verbose execution tracing
  -n, --dry-run         Preview actions without executing changes
  --host <hostname>     Target server hostname or IP address (Required)

Examples:
  $(basename "$0") --host api.example.com --env production --port 443 -v
  $(basename "$0") -h
EOF
    exit 0
}

# Parse command line options using a while loop with shifting
while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help)
            usage
            ;;
        -e|--env)
            if [[ -z "${2:-}" || "$2" =~ ^- ]]; then
                echo "Error: Argument for $1 is missing." >&2
                exit 1
            fi
            ENVIRONMENT="$2"
            shift 2
            ;;
        -p|--port)
            if [[ -z "${2:-}" || ! "$2" =~ ^[0-9]+$ ]]; then
                echo "Error: --port requires a valid numeric integer." >&2
                exit 1
            fi
            PORT="$2"
            shift 2
            ;;
        --host)
            if [[ -z "${2:-}" || "$2" =~ ^- ]]; then
                echo "Error: Argument for --host is missing." >&2
                exit 1
            fi
            TARGET_HOST="$2"
            shift 2
            ;;
        -v|--verbose)
            VERBOSE=true
            shift 1
            ;;
        -n|--dry-run)
            DRY_RUN=true
            shift 1
            ;;
        *)
            echo "Error: Unknown argument '$1'. Run with --help for usage." >&2
            exit 1
            ;;
    esac
done

# Validate required arguments
if [[ -z "$TARGET_HOST" ]]; then
    echo "Error: Missing required argument: --host <hostname>" >&2
    echo "Run with --help for full usage instructions." >&2
    exit 1
fi

echo "--- Configuration Summary ---"
echo "Host        : $TARGET_HOST"
echo "Environment : $ENVIRONMENT"
echo "Port        : $PORT"
echo "Verbose     : $VERBOSE"
echo "Dry Run     : $DRY_RUN"
echo "Status      : Arguments parsed successfully."
