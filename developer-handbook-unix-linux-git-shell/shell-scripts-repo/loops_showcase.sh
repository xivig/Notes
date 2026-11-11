#!/usr/bin/env bash
# ==============================================================================
# Script Name: loops_showcase.sh (Enhanced from 'Foor loop.sh')
# Description: Demonstrates 7 modern shell iteration & looping paradigms
# ==============================================================================
set -euo pipefail

echo "=== 1. Classic C-style For Loop ==="
for (( i = 1; i <= 5; i++ )); do
    echo "  Iteration: $i of 5"
done

echo -e "\n=== 2. Modern Brace Expansion {start..end..step} ==="
for n in {0..10..2}; do
    echo "  Even number: $n"
done

echo -e "\n=== 3. Iterating Over an Array of Words ==="
servers=("web01" "web02" "db01" "cache01")
for host in "${servers[@]}"; do
    echo "  Checking host: $host"
done

echo -e "\n=== 4. While Read Line-by-Line (IFS Safe) ==="
sample_text=$'Alpha\nBeta\nGamma\nDelta'
while IFS= read -r line; do
    echo "  Read line: $line"
done <<< "$sample_text"

echo -e "\n=== 5. Dynamic Sequence Loop (seq) ==="
for val in $(seq 10 5 25); do
    echo "  Step value: $val"
done

echo -e "\n=== 6. Associative Array (Dictionary) Traversal ==="
declare -A ports=([http]=80 [https]=443 [ssh]=22 [db]=5432)
for service in "${!ports[@]}"; do
    echo "  Service: $service -> Port: ${ports[$service]}"
done

echo -e "\n=== 7. File Creation & Automated Cleanup with Trap ==="
TEMP_DIR=$(mktemp -d "/tmp/loops_test_XXXXXX")
trap 'rm -rf "$TEMP_DIR"' EXIT

for f in {1..3}; do
    touch "$TEMP_DIR/sample_$f.txt"
    echo "  Created sandbox file: sample_$f.txt"
done
echo "Temporary files cleaned up automatically via EXIT trap."
