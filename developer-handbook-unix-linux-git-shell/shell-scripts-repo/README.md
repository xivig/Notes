# Production Shell Scripts Repository (`shell-scripts-repo/`)

A curated, battle-tested library of 25 production-grade Bash and POSIX automation scripts, systems monitors, developer utilities, Git workflow automations, and testing harnesses.

> **Architecture & Deep-Dive Guides:**
> - [**Production Capstones Architectural Guide**](../docs/scripts/01-production-capstones-guide.md)
> - [**System, File & CLI Automation Guide**](../docs/scripts/02-system-and-file-automation-guide.md)
> - [**Git & GitHub Engineering Automation Guide**](../docs/scripts/03-git-workflow-automation-guide.md)
> - [**Historical Bourne Shell & POSIX Guide**](../docs/scripts/04-historical-bourne-and-posix-guide.md)
> - [**Testing, Linting & CI/CD Framework Guide**](../docs/scripts/05-testing-linting-and-ci-framework.md)

---

## Script Catalog & CLI Reference

### 1. Production Capstone Utilities

| Script | Purpose & Capabilities | CLI Syntax & Usage | Primary Tools |
| :--- | :--- | :--- | :--- |
| [`capstone1_system_health.sh`](capstone1_system_health.sh) | Multi-tier host & service health monitor checking root disk threshold (<85%), free RAM (Linux & macOS `vm_stat`), required binaries, and HTTPS network ping. | `./capstone1_system_health.sh` | `df`, `free`, `vm_stat`, `curl`, `awk` |
| [`capstone2_log_analyzer.sh`](capstone2_log_analyzer.sh) | High-throughput access log analyzer parsing status code distribution (2xx, 3xx, 4xx, 5xx), total bandwidth, and top client IPs via Awk associative arrays. | `./capstone2_log_analyzer.sh [access.log]` | `awk` associative arrays |
| [`capstone3_batch_organizer.sh`](capstone3_batch_organizer.sh) | Safe batch file organizer sorting files into category folders (`docs/`, `images/`, `archives/`, `data/`) with TSV rollback manifests and 1-click reversible rollback mode. | `./capstone3_batch_organizer.sh [--dry-run] <dir>`<br>`./capstone3_batch_organizer.sh --rollback <manifest.tsv>` | `find -print0`, `stat`, `mv -n` |

---

### 2. Developer Automation & Filesystem Operations

| Script | Purpose & Capabilities | CLI Syntax & Usage | Primary Tools |
| :--- | :--- | :--- | :--- |
| [`deploy_service.sh`](deploy_service.sh) | Production deployment template enforcing `set -euo pipefail`, pre-flight dependency audits, atomic locks, and cleanup signals (`trap cleanup EXIT`). | `./deploy_service.sh [staging\|production]` | `set -euo pipefail`, `trap`, `mktemp` |
| [`parse_arguments.sh`](parse_arguments.sh) | Robust CLI argument parser supporting short flags (`-p 443`), long flags (`--host`), boolean options (`-v`), and integer range validation. | `./parse_arguments.sh -e prod -p 8080 -v` | `case`, `shift`, regex validation |
| [`safe_file_batch.sh`](safe_file_batch.sh) | Space-immune file batch processor using NUL-delimited streams (`find -print0`) to process filenames with spaces, tabs, and newlines. | `./safe_file_batch.sh <dir> <ext>` | `find -print0`, `read -d ''` |
| [`scaffold_website.sh`](scaffold_website.sh) | Modern HTML5/CSS/JS project scaffolder generating semantic boilerplates, robots.txt, sitemap.xml, and initializing a local Git repo. | `./scaffold_website.sh [project-name]` | Heredocs, `mkdir -p`, `git` |
| [`directory_inventory.sh`](directory_inventory.sh) | Detailed TSV filesystem auditor capturing file paths, types, sizes in bytes, octal permissions, and modification timestamps. | `./directory_inventory.sh <dir> [out.tsv]` | `stat`, `find -print0` |
| [`copy_file_each_dir.sh`](copy_file_each_dir.sh) | Safely propagates a template file across all subdirectories up to a bounded maximum depth with `--dry-run` preview support. | `./copy_file_each_dir.sh <file> <dir> [depth] [--dry-run]` | `find -maxdepth`, `cp -p` |
| [`loops_showcase.sh`](loops_showcase.sh) | Practical educational demonstration of 7 modern shell loop paradigms (C-style, brace expansion, while-read, arrays) with auto-cleanup. | `./loops_showcase.sh` | `for`, `while`, `seq` |
| [`conditional_flow.sh`](conditional_flow.sh) | User input sanitization, integer arithmetic verification `(( ))`, and state file persistence. | `./conditional_flow.sh` | `[[ =~ ]]`, `(( ))`, `test` |

---

### 3. Git & GitHub Engineering Automation

| Script | Purpose & Capabilities | CLI Syntax & Usage | Primary Tools |
| :--- | :--- | :--- | :--- |
| [`git_setup_env.sh`](git_setup_env.sh) | Cross-platform Git baseline configuration: author identity, default branch `main`, and OS-specific line endings (`core.autocrlf`). | `./git_setup_env.sh` | `git config --global` |
| [`git_ssh_keygen.sh`](git_ssh_keygen.sh) | Generates modern ED25519 SSH keys, registers with `ssh-agent`, and tests live GitHub SSH connectivity. | `./git_ssh_keygen.sh` | `ssh-keygen`, `ssh-agent`, `ssh` |
| [`git_aliases_setup.sh`](git_aliases_setup.sh) | Configures high-velocity Git shortcuts including colorized ASCII branch commit graphs (`git lg`). | `./git_aliases_setup.sh` | `git config alias.*` |
| [`git_sandbox_lab.sh`](git_sandbox_lab.sh) | Builds an isolated 10-step practice playground repository (`~/git-practice-sandbox`) with simulated three-way merge conflicts. | `./git_sandbox_lab.sh` | `git init`, `git switch` |
| [`git_daily_sync.sh`](git_daily_sync.sh) | Morning developer sync script: auto-stashes dirty working trees, fetches remotes, prunes dead branches, and pulls `--ff-only`. | `./git_daily_sync.sh` | `git fetch --prune`, `git stash` |

---

### 4. Historical Bourne Shell Primitives (`unix examples.txt`)

| Script | Purpose & Capabilities | CLI Syntax & Usage | Primary Tools |
| :--- | :--- | :--- | :--- |
| [`bourne_password_auth.sh`](bourne_password_auth.sh) | Historic V7 Bourne shell password verification script demonstrating strict spacing rules inside `[ ... ]`. | `./bourne_password_auth.sh` | POSIX `test`, `[ = ]` |
| [`bourne_age_tracker.sh`](bourne_age_tracker.sh) | Multi-tier conditional branching with file existence checks (`-s`) and command substitution compatibility. | `./bourne_age_tracker.sh` | `[ -s ]`, `cat` |

---

### 5. Automated Quality Assurance & Testing Suite

| Script | Purpose & Capabilities | CLI Syntax & Usage | Primary Tools |
| :--- | :--- | :--- | :--- |
| [`test_all_scripts.sh`](test_all_scripts.sh) | Master automated test runner that validates shebang portability, performs `bash -n` syntax checks, and reports a pass/fail matrix. | `./test_all_scripts.sh` | `bash -n`, `head -n 1` |

---

## Exit Status Code Contract

Every script in this repository returns deterministic exit status codes adhering to POSIX standards:

| Exit Code | Semantic Meaning | Description |
| :---: | :--- | :--- |
| `0` | **Success** | Script executed successfully to completion with zero errors. |
| `1` | **General Error** | Environmental check failed (e.g. missing dependency, threshold exceeded). |
| `2` | **CLI Misuse** | Missing required positional argument, invalid flag, or numeric boundary violation. |
| `126` | **Command Invoked Cannot Execute** | Permission problem or command is not an executable binary. |
| `127` | **Command Not Found** | Required binary utility is missing from `$PATH`. |
| `130` | **Script Terminated by Control-C** | Process interrupted by `SIGINT` (handled gracefully by cleanup traps). |

---

## Cross-Platform Compatibility Matrix

All scripts are written to execute natively across:
* **GNU/Linux:** Ubuntu, Debian, RHEL, Fedora, CentOS, Arch, Alpine (bash).
* **macOS Darwin:** Apple Silicon (M1/M2/M3/M4) and Intel running macOS Monterey through Sequoia.
* **Windows WSL2 & Git Bash:** Windows Subsystem for Linux (WSL) and MinGW64 / MSYS2 environments.

---

## Running the Automated Test Suite

To verify syntax and shebang integrity across all scripts in the repository:

```bash
cd shell-scripts-repo
chmod +x test_all_scripts.sh
./test_all_scripts.sh
```
