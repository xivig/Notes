# 04: Historical Bourne Shell & POSIX Compatibility Guide

A retrospective analysis of the Bourne shell (`/bin/sh`) written by Stephen Bourne at Bell Labs (1979) and how historical idioms translate to modern POSIX.1-2008 and Bash 5.

---

## 1. `bourne_password_auth.sh`: Spacing Invariants

In the original Bourne shell, `[` is not syntax &mdash; it is an actual compiled binary executable located at `/bin/[` (a hard link to `/bin/test`).

### 1.1 Why Spaces are Mandatory
```sh
# ❌ Fails with "command not found: [password=":
if [password="secret"]; then

# ✅ Valid POSIX: [ receives 4 distinct arguments: "[", "$pass", "=", "secret", "]"
if [ "$pass" = "secret" ]; then
```
Because `[` is an executable program, arguments passed to it must be separated by whitespace tokens. The closing `]` is simply an argument that `/bin/test` expects as its final parameter to ensure syntactic symmetry.

---

## 2. `bourne_age_tracker.sh`: Conditionals Without Bashisms

Modern Bash provides `(( age >= 18 ))` and `[[ $age -ge 18 ]]`. In pure POSIX Bourne shell, integer comparison is performed strictly via test flags:

| Modern Bash Syntax | Historical POSIX Bourne Equivalent |
|---|---|
| `[[ $str == "admin" ]]` | `[ "$str" = "admin" ]` |
| `(( count > 10 ))` | `[ "$count" -gt 10 ]` |
| `(( count <= 5 ))` | `[ "$count" -le 5 ]` |
| `[[ -z $var ]]` | `[ -z "$var" ]` |
| `[[ -f $file && -s $file ]]` | `[ -f "$file" ] && [ -s "$file" ]` |

### 2.1 Testing Non-Empty Files with `-s`
The `-s` test flag verifies that a file exists **and has a size greater than 0 bytes**:
```sh
if [ -s "$STATE_FILE" ]; then
    echo "State file exists and contains data."
else
    echo "File is missing or 0 bytes."
fi
```

---

## 3. Evolution of the Unix Shell

```text
[ V7 Bourne Shell (1979) ] ---> [ Korn Shell ksh88 (1988) ]
           |                                  |
           v                                  v
[ POSIX.1-2008 Standard ] <-------- [ GNU Bash (1989-Present) ]
           |                                  |
           +---> Dash (Debian/Ubuntu /bin/sh) +---> Zsh (macOS Default)
```

When writing scripts meant for embedded Linux, Alpine Docker containers, or BSD routers, write strict POSIX scripts with `#!/bin/sh`. For enterprise DevOps and build automation, leverage modern Bash (`#!/usr/bin/env bash`).
