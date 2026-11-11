#!/usr/bin/env bash
# ==============================================================================
# Capstone 2: Production Access Log Analyzer via AWK
# Usage: ./capstone2_log_analyzer.sh <path_to_access.log>
# ==============================================================================
set -euo pipefail

LOG_FILE="${1:-}"

if [[ -z "$LOG_FILE" || ! -f "$LOG_FILE" ]]; then
    # Generate a demo sample log if no file provided
    LOG_FILE=$(mktemp "/tmp/sample_access_XXXXXX.log")
    cat <<'EOF' > "$LOG_FILE"
192.168.1.10 - - [08/Nov/2026:10:00:01 +0000] "GET /index.html HTTP/1.1" 200 4812
192.168.1.11 - - [08/Nov/2026:10:00:02 +0000] "GET /api/v1/users HTTP/1.1" 200 1284
192.168.1.10 - - [08/Nov/2026:10:00:03 +0000] "POST /api/v1/auth HTTP/1.1" 401 320
192.168.1.12 - - [08/Nov/2026:10:00:04 +0000] "GET /missing HTTP/1.1" 404 512
192.168.1.10 - - [08/Nov/2026:10:00:05 +0000] "GET /dashboard HTTP/1.1" 500 890
EOF
    echo "Notice: No log file specified. Running against generated sample log."
fi

awk '
BEGIN {
    print "=================================================";
    print " ACCESS LOG ANALYTICS REPORT                     ";
    print "=================================================";
}
{
    total_requests++;
    ip = $1;
    status = $9;
    bytes = $10;
    
    if (status ~ /^2/) status_2xx++;
    else if (status ~ /^3/) status_3xx++;
    else if (status ~ /^4/) status_4xx++;
    else if (status ~ /^5/) status_5xx++;
    
    ip_count[ip]++;
    if (bytes != "-") total_bytes += bytes;
}
END {
    printf "Total Requests Analyzed : %d\n", total_requests;
    printf "Total Bandwidth Served  : %.2f KB\n", total_bytes / 1024;
    print "\n--- HTTP Status Code Breakdown ---";
    printf "2xx (Success)    : %-8d (%.1f%%)\n", status_2xx, (status_2xx/total_requests)*100;
    printf "3xx (Redirect)   : %-8d (%.1f%%)\n", status_3xx, (status_3xx/total_requests)*100;
    printf "4xx (Client Err) : %-8d (%.1f%%)\n", status_4xx, (status_4xx/total_requests)*100;
    printf "5xx (Server Err) : %-8d (%.1f%%)\n", status_5xx, (status_5xx/total_requests)*100;
    
    print "\n--- Top Client IP Addresses ---";
    for (client in ip_count) {
        printf "%-18s : %d hits\n", client, ip_count[client];
    }
    print "=================================================";
}
' "$LOG_FILE"
