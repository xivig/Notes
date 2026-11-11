# 05: Testing, Linting & CI/CD Framework for Shell Scripts

Treating shell scripts as first-class software requires static analysis (ShellCheck), automated smoke tests, and continuous integration pipelines.

---

## 1. `test_all_scripts.sh`: Automated Test Runner

The repository bundles `shell-scripts-repo/test_all_scripts.sh` to run immediate pre-commit sanity checks across all scripts.

### 1.1 What It Tests:
1. **Shebang Portability:** Verifies the first line uses `#!/usr/bin/env bash` or `#!/bin/sh`, rejecting hardcoded `/bin/bash`.
2. **Syntax Validation:** Runs `bash -n` to detect syntax errors, unclosed quotes, and invalid grammar without executing the script payload.
3. **Execution Permitted:** Verifies execution file bits.

### 1.2 Execution:
```bash
cd shell-scripts-repo
chmod +x test_all_scripts.sh
./test_all_scripts.sh
```

---

## 2. Static Analysis with ShellCheck

[ShellCheck](https://www.shellcheck.net/) is the industry standard linter for shell scripts. It catches subtle quoting traps, subshell variable leakage, and portability bugs.

```bash
# Install ShellCheck
# macOS:
brew install shellcheck

# Ubuntu / Debian:
sudo apt-get install -y shellcheck

# Run analysis on all scripts in repository:
shellcheck shell-scripts-repo/*.sh
```

### Top 3 ShellCheck Warnings Handled in This Suite:
* **SC2086:** Double quote to prevent globbing and word splitting (`"$VAR"`).
* **SC2155:** Declare and assign separately to avoid masking return values (`local res; res=$(cmd)`).
* **SC2164:** Use `cd ... || exit` in case `cd` fails.

---

## 3. GitHub Actions Continuous Integration

The repository includes [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) to automatically validate every commit:

```yaml
name: CI Suite

on: [push, pull_request]

jobs:
  shell-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install ShellCheck
        run: sudo apt-get update && sudo apt-get install -y shellcheck
        
      - name: Run Syntax & Shebang Test Runner
        run: |
          chmod +x shell-scripts-repo/test_all_scripts.sh
          ./shell-scripts-repo/test_all_scripts.sh
          
      - name: Run ShellCheck Static Analysis
        run: |
          shellcheck shell-scripts-repo/*.sh
```
