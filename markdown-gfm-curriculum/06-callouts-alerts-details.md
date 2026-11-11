# Module 06: Callouts, Alerts, and Collapsible Details

> **Scope**: GitHub Alert callout syntax (`[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, `[!CAUTION]`), multi-line alerts, standard blockquotes, and interactive `<details>`/`<summary>` accordion disclosures.

---

## 1. GitHub Alerts Specification

GitHub Flavored Markdown supports native callouts (Alerts) designed to highlight critical information, tips, and warnings with semantic color-coding and icons.

### Syntax Rules
1. Must be placed inside a blockquote starting with `>`.
2. The first line must be exactly `> [!TYPE]` (case-insensitive, but uppercase is recommended).
3. Supported types are: `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION`.
4. The alert body follows on subsequent `>` lines.

---

## 2. The 5 Standard Alert Types

### 1. Note (`[!NOTE]`)
Use for useful information that users should know, even while skimming through documentation.

```markdown
> [!NOTE]
> This feature requires Node.js version 18.0.0 or higher.
```

### 2. Tip (`[!TIP]`)
Use for helpful advice, performance optimizations, keyboard shortcuts, or productivity suggestions.

```markdown
> [!TIP]
> You can run `git switch -` to return to your previous branch instantly.
```

### 3. Important (`[!IMPORTANT]`)
Use for crucial information required for users to succeed with the task at hand.

```markdown
> [!IMPORTANT]
> Verify that your environment variables are configured before running database migrations.
```

### 4. Warning (`[!WARNING]`)
Use for urgent info that needs immediate attention to avoid failure, security issues, or breaking changes.

```markdown
> [!WARNING]
> Deprecated API: `getUserById()` will be completely removed in v3.0.0. Migrate to `findUser()`.
```

### 5. Caution (`[!CAUTION]`)
Use to warn about destructive actions, data loss, irreversible operations, or dangerous consequences.

```markdown
> [!CAUTION]
> Running `drop-database --force` permanently wipes all tables and schema definitions without confirmation.
```

---

## 3. Formatting Inside Alerts

Alerts support full inline and block Markdown formatting, including headers, lists, and code blocks:

```markdown
> [!TIP]
> ### Pro Git Alias Setup
> Add this one-liner to your `~/.gitconfig` for interactive tree graphs:
> ```bash
> git config --global alias.lg "log --oneline --graph --decorate --all"
> ```
> * **Instant visual history**
> * Works directly in your CLI
```

---

## 4. Traditional Blockquotes

Blockquotes are created using the `>` character before lines. They are ideal for citing external sources, quoting dialogue, or calling out quotes.

### Single-Line and Multi-Paragraph Blockquotes

```markdown
> "Simplicity is prerequisite for reliability."
>
> — Edsger W. Dijkstra
```

### Nested Blockquotes
Prepend multiple `>` symbols to nest quotes:

```markdown
> Level 1: Outer quote
>
> > Level 2: Nested response
> >
> > > Level 3: Deeply nested thread
```

---

## 5. Collapsible Sections (`<details>` & `<summary>`)

HTML `<details>` and `<summary>` elements create interactive accordions in GitHub, GitLab, and most Markdown renderers. They are ideal for hiding long stack traces, large logs, secondary configuration examples, or FAQs.

### Basic Collapsible Block

```markdown
<details>
<summary>Click to view system debug logs</summary>

```log
[2026-11-09 10:14:02] INFO: Connecting to database pool...
[2026-11-09 10:14:03] INFO: Connection pool established (pool_size=10).
[2026-11-09 10:14:04] SUCCESS: Health check passed.
```

</details>
```

> [!IMPORTANT] **Markdown Inside HTML Tags Rule**
> Always leave an empty newline between `<summary>` and the opening Markdown content, and an empty newline before `</details>`. Without these empty lines, many Markdown parsers treat the inner text as literal HTML text and skip parsing Markdown syntax (such as backticks, bold, or lists).

### Pre-Expanded Collapsible Block (`open`)
Add the `open` attribute to show the accordion expanded by default:

```markdown
<details open>
<summary><strong>FAQ: How to obtain an API key</strong></summary>

1. Navigate to the Developer Dashboard.
2. Click **Generate New Token**.
3. Select `read:packages` scope.
4. Copy the token into your `.env` file.

</details>
```

---

## 6. Best Practices Summary

| Feature | When to Use | What to Avoid |
| :------ | :---------- | :------------ |
| **`[!NOTE]` / `[!TIP]`** | Additional context, shortcuts, helpful guidance | Do not use for critical warnings or destructive alerts |
| **`[!WARNING]` / `[!CAUTION]`** | Breaking changes, security holes, irreversible data loss | Do not overuse for trivial tips or notices |
| **`<details>`** | Terminal dumps, verbose JSON outputs, FAQ answers | Do not hide primary documentation or essential setup steps |
| **Spacing in HTML** | Empty line before and after inner Markdown | Forgetting empty lines breaks inner code blocks and links |
