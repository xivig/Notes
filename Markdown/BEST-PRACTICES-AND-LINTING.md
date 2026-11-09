# 📏 Markdown Best Practices & Linting Guide

A professional guide to maintaining clean, accessible, and automated Markdown documentation using `markdownlint`, Prettier, and open-source style guides.

---

## 📑 Table of Contents
1. [Core Architectural Best Practices](#core-architectural-best-practices)
2. [Heading Hierarchy & Accessibility](#heading-hierarchy--accessibility)
3. [Link Integrity & Relative Paths](#link-integrity--relative-paths)
4. [Image Alt Text & Visual Clarity](#image-alt-text--visual-clarity)
5. [markdownlint Rule Matrix & Fixes](#markdownlint-rule-matrix--fixes)
6. [Prettier Formatting Integration](#prettier-formatting-integration)
7. [The Anatomy of a Production README.md](#the-anatomy-of-a-production-readmemd)

---

## Core Architectural Best Practices

1. **One Top-Level Heading (`#`) per Document**:
   Reserve `# Title` strictly for the document title. All sub-sections must start at `## Section` to maintain correct document outline structures for accessibility.

2. **Never Skip Heading Levels**:
   Moving from `## Heading 2` directly to `#### Heading 4` breaks screen reader navigation trees. Always step down sequentially: `#` ➔ `##` ➔ `###` ➔ `####`.

3. **Surround Lists, Tables & Code Blocks with Blank Lines**:
   While some Markdown parsers forgive missing blank lines, CommonMark requires a blank line before and after code fences, tables, and blockquotes to prevent parsing ambiguity.

4. **Favor Fenced Code Blocks over Indented Code**:
   Four-space indented code blocks are difficult to maintain, lack syntax highlighting language specifiers, and break easily when nested inside lists. Always use fenced triple backticks (```` ``` ````).

---

## Heading Hierarchy & Accessibility

```markdown
<!-- ❌ BAD: Skipped heading level (Triggers MD001) -->
# My Application
#### Quickstart Setup

<!-- ✅ GOOD: Sequential, accessible hierarchy -->
# My Application
## Getting Started
### Quickstart Setup
```

---

## Link Integrity & Relative Paths

When authoring documentation inside a Git repository:
- **Use Relative Paths**: Always link to files within the repository using relative paths (`[Architecture](../docs/architecture.md)`). Avoid absolute GitHub URLs (`https://github.com/user/repo/blob/main/...`), which break when forked or viewed offline.
- **Provide Informative Anchor Text**: Avoid writing `Click [here](...)`. Instead, write `Read the [Authentication Guide](auth.md)` so visually impaired users navigating via link lists have meaningful context.

---

## Image Alt Text & Visual Clarity

Always write descriptive `alt` text for images. Screen readers read `alt` text to visually impaired users, and search engines index it:

```markdown
<!-- ❌ BAD: Uninformative alt text -->
![screenshot](assets/login.png)

<!-- ✅ GOOD: Descriptive, contextual alt text -->
![Login screen showing email input field, password field, and Google SSO button](assets/login.png)
```

---

## markdownlint Rule Matrix & Fixes

`markdownlint` is the industry-standard linter for Markdown across CI pipelines and VS Code.

| Rule | Description | Solution / Fix |
| :--- | :--- | :--- |
| **MD001** | Heading levels should only increment by one level at a time | Change `####` following `##` to `###`. |
| **MD004** | Unordered list style consistency | Standardize on `-` or `*` across the entire document. |
| **MD009** | Trailing spaces | Strip trailing whitespace (except intentional 2-space line breaks). |
| **MD012** | Multiple consecutive blank lines | Reduce multiple empty lines down to a single blank line. |
| **MD013** | Line length limit (default: 80 chars) | Configure `code_blocks: false, tables: false` in `.markdownlint.json`. |
| **MD025** | Multiple top-level headings in the same document | Ensure only one `# Document Title` exists at the top. |
| **MD031** | Fenced code blocks should be surrounded by blank lines | Insert an empty line before and after ```` ``` ````. |
| **MD032** | Lists should be surrounded by blank lines | Insert an empty line before starting a list. |
| **MD033** | Inline HTML | Whitelist permitted tags (e.g. `<kbd>`, `<details>`, `<summary>`). |
| **MD041** | First line in a file should be a top-level heading | Begin the file with `# Title`. |

### Recommended `.markdownlint.json` Configuration:
```json
{
  "default": true,
  "MD013": {
    "line_length": 120,
    "code_blocks": false,
    "tables": false
  },
  "MD033": {
    "allowed_elements": ["kbd", "details", "summary", "br", "sub", "sup", "img", "div", "span"]
  }
}
```

---

## Prettier Formatting Integration

To automatically format all Markdown files in a repository via Prettier:

```bash
# Check formatting
npx prettier --check "**/*.md"

# Automatically fix and format
npx prettier --write "**/*.md"
```

### Recommended `.prettierrc`:
```json
{
  "proseWrap": "preserve",
  "singleQuote": true,
  "tabWidth": 2
}
```
`"proseWrap": "preserve"` ensures that Prettier does not arbitrarily break long sentences into awkward hard-wrapped lines.

---

## The Anatomy of a Production README.md

A production-grade open-source or enterprise README should follow this battle-tested layout:

```markdown
# 📦 Project Name
> A one-sentence value proposition describing what this project accomplishes.

[![Build Status](https://img.shields.io/github/actions/workflow/status/owner/repo/ci.yml?branch=main)](...)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm version](https://img.shields.io/npm/v/package-name.svg)](...)

---

## ✨ Features
- Bulleted key capabilities.

## 🚀 Quickstart
Prerequisites and 3-step startup commands.

## ⚙️ Configuration
Environment variables and configuration tables.

## 📖 Documentation
Links to deeper architecture guides.

## 🤝 Contributing
Guidelines for submitting issues and pull requests.

## 📄 License
SPDX License name and copyright notice.
```
