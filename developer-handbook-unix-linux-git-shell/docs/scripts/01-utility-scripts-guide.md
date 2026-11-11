# Shell Utility Scripts Reference & Guide

A comprehensive architectural and functional reference for all 24 production-grade automation shell scripts bundled within [`shell-scripts-repo/`](../../shell-scripts-repo/README.md).

---

## 1. Complete Scripts Catalog

### Domain 1: Production Capstones & System Diagnostics
| Script | Primary Tools | Execution Example | Purpose |
|---|---|---|---|
| [`capstone1_system_health.sh`](../../shell-scripts-repo/capstone1_system_health.sh) | `df`, `free`, `curl`, `awk` | `./capstone1_system_health.sh` | Production host health monitor: disk threshold (<85%), free RAM, required CLI binaries, internet connectivity. |
| [`capstone2_log_analyzer.sh`](../../shell-scripts-repo/capstone2_log_analyzer.sh) | `awk` associative arrays | `./capstone2_log_analyzer.sh access.log` | Parses Nginx/Apache logs: HTTP status breakdown (2xx, 3xx, 4xx, 5xx), bandwidth served, and top client IPs. |
| [`capstone3_batch_organizer.sh`](../../shell-scripts-repo/capstone3_batch_organizer.sh) | `find -print0`, `stat`, `mv -n` | `./capstone3_batch_organizer.sh --dry-run ./downloads` | Reorganizes files into category folders (`docs/`, `images/`, `archives/`, `data/`) with rollback TSV manifest. |

### Domain 2: Developer Automation & Filesystem Operations
| Script | Primary Tools | Execution Example | Purpose |
|---|---|---|---|
| [`deploy_service.sh`](../../shell-scripts-repo/deploy_service.sh) | `set -euo pipefail`, `trap` | `./deploy_service.sh production` | Production deployment template featuring strict error modes, pre-flight dependency audits, and cleanup traps. |
| [`parse_arguments.sh`](../../shell-scripts-repo/parse_arguments.sh) | `case`, `shift`, regex | `./parse_arguments.sh --host api.com -e prod -p 443` | Robust CLI parser supporting short/long options, flags (`-v`, `-n`), and numeric integer validation. |
| [`safe_file_batch.sh`](../../shell-scripts-repo/safe_file_batch.sh) | `find -print0`, `read -d ''` | `./safe_file_batch.sh ./data csv` | NUL-delimited file processor immune to spaces, tabs, and newlines in filenames. |
| [`scaffold_website.sh`](../../shell-scripts-repo/scaffold_website.sh) | Heredocs, `mkdir -p`, `git` | `./scaffold_website.sh my-portfolio` | Generates modern HTML5/CSS/JS boilerplates, sitemap, robots.txt, and initializes a Git repository. |
| [`directory_inventory.sh`](../../shell-scripts-repo/directory_inventory.sh) | `stat`, `find -print0` | `./directory_inventory.sh . inventory.tsv` | Generates structured TSV filesystem inventory with paths, types, sizes, permissions, and timestamps. |
| [`copy_file_each_dir.sh`](../../shell-scripts-repo/copy_file_each_dir.sh) | `find -maxdepth`, `cp -p` | `./copy_file_each_dir.sh index.php . 3 --dry-run` | Recursively copies a template file safely across subdirectories up to a specified maximum depth. |
| [`loops_showcase.sh`](../../shell-scripts-repo/loops_showcase.sh) | `for`, `while`, `seq` | `./loops_showcase.sh` | Demonstrates 7 modern shell iteration paradigms with automatic temporary sandbox cleanup. |
| [`conditional_flow.sh`](../../shell-scripts-repo/conditional_flow.sh) | `[[ =~ ]]`, `(( ))` | `./conditional_flow.sh` | User input sanitization, integer age verification, and atomic file state persistence. |

### Domain 3: Git & GitHub Engineering Automation
| Script | Primary Tools | Execution Example | Purpose |
|---|---|---|---|
| [`git_setup_env.sh`](../../shell-scripts-repo/git_setup_env.sh) | `git config --global` | `./git_setup_env.sh` | Automated global Git configuration: author identity, default branch `main`, and OS-specific `core.autocrlf`. |
| [`git_ssh_keygen.sh`](../../shell-scripts-repo/git_ssh_keygen.sh) | `ssh-keygen`, `ssh-agent` | `./git_ssh_keygen.sh` | Generates modern ED25519 SSH keys, registers with `ssh-agent`, and tests GitHub connection. |
| [`git_aliases_setup.sh`](../../shell-scripts-repo/git_aliases_setup.sh) | `git config alias.*` | `./git_aliases_setup.sh` | Configures high-productivity Git aliases including the colorized ASCII commit graph (`git lg`). |
| [`git_sandbox_lab.sh`](../../shell-scripts-repo/git_sandbox_lab.sh) | `git init`, `git switch` | `./git_sandbox_lab.sh` | Builds an isolated 10-step practice playground repository (`~/git-practice-sandbox`) with simulated merge conflicts. |
| [`git_daily_sync.sh`](../../shell-scripts-repo/git_daily_sync.sh) | `git fetch --prune`, `git stash` | `./git_daily_sync.sh` | Morning developer routine: auto-stashes uncommitted work, prunes dead tracking branches, and pulls `--ff-only`. |

### Domain 4: Historical Bourne Shell Primitives (`unix examples.txt`)
| Script | Primary Tools | Execution Example | Purpose |
|---|---|---|---|
| [`bourne_password_auth.sh`](../../shell-scripts-repo/bourne_password_auth.sh) | POSIX `test`, `[ = ]` | `./bourne_password_auth.sh` | Historic Bourne shell password verification script demonstrating strict spacing rules inside `[ ... ]`. |
| [`bourne_age_tracker.sh`](../../shell-scripts-repo/bourne_age_tracker.sh) | `[ -s ]`, `cat` | `./bourne_age_tracker.sh` | Multi-tier conditional branching with file existence checks (`-s`) and command substitution. |

---

## 2. Engineering Standards

Every script in this repository adheres to modern defensive shell engineering principles:
* **Portable Shebangs:** `#!/usr/bin/env bash` (or `#!/bin/sh` for POSIX compliance).
* **Strict Mode:** `set -euo pipefail` halts execution immediately upon error, unset variable expansion, or pipeline failure.
* **Double-Quoting Rigor:** All variable expansions (`"$VAR"`) and path strings are double-quoted.
* **Safety & Dry-Runs:** Operations that modify or relocate files support `--dry-run` preview flags.
* **Zero Residual Clutter:** Scripts generating temporary files use `trap 'rm -rf "$TEMP_DIR"' EXIT INT TERM`.
