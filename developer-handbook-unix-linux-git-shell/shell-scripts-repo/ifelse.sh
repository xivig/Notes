#!/usr/bin/env bash
# ==============================================================================
# Script Name: conditional_flow.sh (Enhanced from ifelse.sh)
# Description: Validated user input, state tracking, and range evaluation
# ==============================================================================
set -euo pipefail

echo "=========================================="
echo " User Profile & Age Verification System   "
echo "=========================================="

read -r -p "Please enter your username: " USERNAME

# Sanitize username (alphanumeric and dashes only to prevent path traversal)
USERNAME=$(echo "$USERNAME" | tr -cd '[:alnum:]_-')
if [[ -z "$USERNAME" ]]; then
    echo "Error: Invalid username supplied." >&2
    exit 1
fi

DATA_FILE="./${USERNAME}_DATA.txt"

# Check if returning user
if [[ -s "$DATA_FILE" ]]; then
    SAVED_AGE=$(cat "$DATA_FILE")
    echo "Welcome back, $USERNAME! Your registered age is $SAVED_AGE."
    exit 0
fi

# New user registration
read -r -p "How old are you? " AGE

# Validate integer input
if ! [[ "$AGE" =~ ^[0-9]+$ ]]; then
    echo "Error: Age must be a positive integer." >&2
    exit 1
fi

if (( AGE < 13 )); then
    echo "Access Denied: You must be at least 13 years old to register."
    exit 1
elif (( AGE >= 100 )); then
    echo "Notice: Exceptional age entered ($AGE). Please verify details."
fi

# Range classification
if (( AGE >= 13 && AGE < 20 )); then
    CATEGORY="Teenager"
elif (( AGE >= 20 && AGE < 30 )); then
    CATEGORY="In your 20s"
elif (( AGE >= 30 && AGE < 50 )); then
    CATEGORY="In your 30s-40s"
else
    CATEGORY="Experienced Developer"
fi

echo "Classification: $CATEGORY"
echo "$AGE" > "$DATA_FILE"
echo "Profile saved successfully to '$DATA_FILE'."
