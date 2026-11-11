# Production Shell Scripts Architectural & Engineering Guide

> **Companion Documentation & Handbooks:**
> - [**Production Shell Scripts Repository (25 Executable Scripts)**](../../shell-scripts-repo/README.md)
> - [**The Rigorous All-in-One Shell Scripting Handbook**](../shell-scripting/README.md)
> - [**Linux, Unix & Shell Developer Handbook (39 Chapters)**](../../Linux_Unix_Shell_Developer_Handbook.html)
> - [**Git & GitHub Complete Tutorial Handbook (22 Chapters)**](../../Git_GitHub_Complete_Tutorial.html)
> - [**HTML5 & Modern Web Architecture Handbook (15 Chapters)**](../../HTML5_Web_Developer_Handbook.html)

Welcome to the **Shell Utility Scripts Architecture & Operational Guide**. This curriculum provides deep technical documentation, architectural blueprints, input/output contracts, and execution walk-throughs for every script in the production suite.

---

## Curriculum Roadmap

### 1. [Production Capstone Utilities](01-production-capstones-guide.md)
* **`capstone1_system_health.sh`**: Multi-tier host diagnostics, root disk thresholds, available RAM (Linux `free` & macOS `vm_stat`), essential binary validation, and network health.
* **`capstone2_log_analyzer.sh`**: High-throughput access log analytics via Awk associative arrays, HTTP status code distribution (2xx/3xx/4xx/5xx), bandwidth aggregation, and top client IP tracking.
* **`capstone3_batch_organizer.sh`**: Defensive file sorting by MIME category, atomic TSV rollback manifest generation, and 1-click reversible rollback mode (`--rollback`).

### 2. [System, File & CLI Automation](02-system-and-file-automation-guide.md)
* **`deploy_service.sh`**: Strict mode (`set -euo pipefail`), pre-flight checks, atomic rollback locks, and signal traps (`trap cleanup EXIT`).
* **`parse_arguments.sh`**: High-performance argument parsing supporting short options (`-p 8080`), long options (`--host`), flags (`-v`, `-n`), and integer regex validation.
* **`safe_file_batch.sh`**: Space-immune file processing using NUL-delimited streams (`find -print0 | while IFS= read -r -d ''`).
* **`scaffold_website.sh`**: Automated project scaffolding using Heredocs, strict directory creation, and Git repository initialization.
* **`directory_inventory.sh`**: Exporting structured TSV filesystem catalogs with size, permissions, inodes, and timestamps.
* **`copy_file_each_dir.sh`**: Bounded recursive propagation with `--maxdepth` and `--dry-run`.
* **`loops_showcase.sh`**: 7 modern iteration paradigms (C-style, brace expansion, while-read, arrays).
* **`conditional_flow.sh`**: User input sanitization, integer arithmetic `(( ))`, and state file persistence.

### 3. [Git & GitHub Engineering Automation](03-git-workflow-automation-guide.md)
* **`git_setup_env.sh`**: Automated global author setup, default branch `main`, and platform line-ending normalization (`core.autocrlf`).
* **`git_ssh_keygen.sh`**: Automated ED25519 cryptographic key generation, `ssh-agent` registration, and live GitHub SSH handshake testing.
* **`git_aliases_setup.sh`**: Configuring high-velocity shortcuts (`git lg` ASCII graph, `git s`, `git co`, `git br`).
* **`git_sandbox_lab.sh`**: Building an isolated 10-step practice repository (`~/git-practice-sandbox`) with simulated three-way merge conflicts.
* **`git_daily_sync.sh`**: Morning synchronization workflow: auto-stashing uncommitted work, pruning deleted remote branches, and fast-forward pull.

### 4. [Historical Bourne Shell & POSIX Compatibility](04-historical-bourne-and-posix-guide.md)
* **`bourne_password_auth.sh`**: Historic Seventh Edition Unix Bourne shell password validation and strict bracket spacing rules.
* **`bourne_age_tracker.sh`**: Multi-tiered conditional branching, file size tests (`-s`), and command substitution compatibility.
* **The Evolution from Bourne to POSIX**: Comparing V7 `/bin/sh` (1979), POSIX.1-2008, Bash 3.2 (macOS), and modern Bash 5.2.

### 5. [Testing, Linting & CI/CD Framework](05-testing-linting-and-ci-framework.md)
* **`test_all_scripts.sh`**: Automated test suite executing syntax checks (`bash -n`) and shebang validation.
* **Static Analysis with ShellCheck**: Common anti-patterns, severity levels, and pre-commit hooks.
* **Unit Testing with Bats-core**: Writing automated assertion test suites for shell scripts.
* **GitHub Actions CI Pipeline**: Continuous validation across Ubuntu Linux and macOS Darwin runners.
