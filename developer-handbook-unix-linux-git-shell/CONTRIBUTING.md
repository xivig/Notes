# Contributing to Essential macOS, Unix & Git Tricks

Thank you for considering contributing! We aim to maintain high-quality, production-grade documentation, tutorials, and automation scripts.

---

## Code of Conduct

* Be respectful, inclusive, and collaborative.
* Focus on clear, accurate, cross-platform technical explanations.

---

## How Can I Contribute?

### 1. Improving Existing Tutorials
* Fix typos or outdated command syntax.
* Add missing edge cases (especially macOS BSD vs Linux GNU coreutils nuances).
* Clarify explanations with real-world examples.

### 2. Adding New Tutorials or One-Liners
* When adding a new tutorial, follow the modular format in `docs/`:
  * Clear section headings with numbers.
  * Syntax blocks with language specifiers (`bash`, `zsh`, `gitattributes`).
  * GitHub alerts (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`).
  * Cross-platform compatibility table or note.
* Update both:
  1. The Markdown chapter in `docs/`
  2. The interactive portal in `documentation/index.html`

### 3. Shell Scripts
* Scripts should use portable shebangs (`#!/usr/bin/env bash` or `#!/bin/sh`).
* Include error handling (`set -euo pipefail` where applicable).
* Test compatibility across macOS (Zsh/BSD) and Linux (Bash/GNU).

---

## Pull Request Checklist

Before submitting a Pull Request:
1. Ensure all Markdown links resolve correctly.
2. Verify shell script syntax with `bash -n script.sh`.
3. Follow the commit message conventions (Conventional Commits, e.g. `docs(git): fix reflog recovery example`).
4. Rebase against latest `main`/`master` to prevent merge conflicts.
