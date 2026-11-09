# 🐙 GitHub Flavored Markdown (GFM) Complete Specification & Manual

GitHub Flavored Markdown (GFM) is a strict formal superset of the **CommonMark** specification created by GitHub to support tables, task lists, strikethrough, autolinks, security sanitization, and team collaboration primitives.

---

## 📑 Table of Contents
1. [Core Differences: CommonMark vs GFM](#core-differences-commonmark-vs-gfm)
2. [Tables Specification](#tables-specification)
3. [Task Lists](#task-lists)
4. [Strikethrough Syntax](#strikethrough-syntax)
5. [Extended Autolinks](#extended-autolinks)
6. [GitHub Native Callouts / Alerts](#github-native-callouts--alerts)
7. [Footnotes](#footnotes)
8. [GitHub Mentions & Issue/Commit Linking](#github-mentions--issuecommit-linking)
9. [Collapsible `<details>` Disclosures](#collapsible-details-disclosures)
10. [HTML Sanitization & Disallowed Raw HTML](#html-sanitization--disallowed-raw-html)

---

## Core Differences: CommonMark vs GFM

Standard CommonMark defines foundational plain text markup: headings, paragraphs, lists, links, blockquotes, and code blocks.

GFM extends CommonMark with 7 major enhancements:
1. **Tables**: Pipe-delimited ASCII tables with column alignment.
2. **Task Lists**: Interactive checkbox lists (`- [ ]`, `- [x]`).
3. **Strikethrough**: Delimited with two tildes (`~~text~~`).
4. **Extended Autolinks**: Automatic linkification of bare URLs, `www.` domains, and email addresses.
5. **Alerts / Admonitions**: Standardized warning and note callouts.
6. **Footnotes**: Anchor-based documentation citations (`[^1]`).
7. **Disallowed HTML Filtering**: Enforced security filtering against script injection.

---

## Tables Specification

GFM defines tables using pipes (`|`) and hyphens (`-`).

### 1. Structure Requirements
- A header row followed by a delimiter row.
- The delimiter row must have at least three hyphens (`---`) per column.
- Colons (`:`) in the delimiter row define column alignment:
  - `:---` (Left align — default)
  - `:---:` (Center align)
  - `---:` (Right align)

### 2. Syntax Example
```markdown
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/v1/users` | List all active users | No |
| `POST` | `/api/v1/users` | Create user profile | Yes |
| `DELETE` | `/api/v1/users/:id` | Purge user record | Yes |
```

### 3. In-Table Formatting Rules
- You **can** use inline code (`` `code` ``), bold (`**bold**`), italics (`*italic*`), links, and images inside table cells.
- To display a literal pipe character inside a cell, escape it with a backslash: `\|`.
- Line breaks (`<br>`) can be used to insert new lines inside a cell.

---

## Task Lists

Task lists render interactive checkboxes in issues, pull requests, and markdown documents:

```markdown
### Deployment Checklist
- [x] Run unit and integration tests (`npm test`)
- [x] Build production bundle (`npm run build`)
- [ ] Tag release commit (`git tag v1.4.0`)
- [ ] Deploy container to Kubernetes cluster
```

### Escaping Parentheses
If a task description begins with an open parenthesis, escape it with `\` so it is not misinterpreted as an inline link:
```markdown
- [ ] \(Optional) Run visual regression suite
```

---

## Strikethrough Syntax

Surround text with two tildes (`~~`) on each side:

```markdown
The meeting was ~~rescheduled for Tuesday~~ cancelled entirely.
```

Rendered:
The meeting was ~~rescheduled for Tuesday~~ cancelled entirely.

---

## Extended Autolinks

In standard CommonMark, links must be wrapped in angle brackets (`<https://github.com>`). In GFM, URLs are autolinked automatically:
- `https://github.com` ➔ automatically hyperlinked.
- `www.github.com` ➔ automatically prepended with `http://` and hyperlinked.
- `support@example.com` ➔ automatically hyperlinked as a `mailto:` link.

To prevent autolinking, wrap the URL in backticks: `` `https://example.com` ``.

---

## GitHub Native Callouts / Alerts

GitHub natively renders five standardized blockquote alerts to emphasize critical information:

```markdown
> [!NOTE]
> Highlights useful information that users should know even when skimming.

> [!TIP]
> Optional information to help a user be more successful or efficient.

> [!IMPORTANT]
> Crucial information necessary for users to succeed with their task.

> [!WARNING]
> Critical content demanding immediate user attention to prevent failures.

> [!CAUTION]
> Advises about dangerous risks or irreversible consequences (e.g. data loss).
```

### Alert Rules:
- The alert identifier (`> [!TYPE]`) must be on the very first line of the blockquote.
- Alerts cannot be nested consecutively without a separating paragraph.
- Labels are case-insensitive, but uppercase (`[!NOTE]`) is standard.

---

## Footnotes

Footnotes allow citing sources or adding explanatory footnotes without cluttering prose:

```markdown
Microservices architecture enables independent deployment cycles.[^1] 
However, it introduces distributed tracing complexity.[^2]

[^1]: Martin Fowler, "Microservices Guide" (2014).
[^2]: See OpenTelemetry distributed context propagation standards.
```

Rendered footnotes generate interactive bidirectional jump links between text anchors and the bottom citations section.

---

## GitHub Mentions & Issue/Commit Linking

When authored on GitHub (issues, PRs, comments, discussions):
- **User / Org Mention**: `@username` or `@organization/team-slug` triggers a notification.
- **Issue / PR Linking**: `#104` automatically links to issue or pull request #104 in the current repo.
- **Cross-Repo Linking**: `owner/repo#42` links to issue #42 in another repository.
- **Commit SHA Linking**: Pasting a 7+ character commit hash (e.g. `250938e`) automatically links to that commit.

---

## Collapsible `<details>` Disclosures

To hide lengthy logs, stack traces, or configuration payloads:

```markdown
<details>
<summary>▶ Click to inspect Kubernetes Deployment YAML</summary>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-service
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: api
        image: ghcr.io/xivig/api:latest
```

</details>
```

---

## HTML Sanitization & Disallowed Raw HTML

For security reasons, GitHub strips dangerous HTML tags and attributes to prevent Cross-Site Scripting (XSS).

### Filtered (Stripped) Tags:
- `<script>`
- `<iframe>`
- `<object>`, `<embed>`, `<applet>`
- `<style>`
- `<form>`, `<input>` (outside task lists)

### Allowed Safe HTML Tags:
- Text: `<b>`, `<strong>`, `<i>`, `<em>`, `<s>`, `<del>`, `<sub>`, `<sup>`, `<kbd>`.
- Structure: `<details>`, `<summary>`, `<br>`, `<hr>`, `<div>`, `<span>`, `<p>`.
- Tables: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.
- Media: `<img>` (attributes like `src`, `alt`, `width`, `height`, `title` are permitted; event handlers like `onload` or `onerror` are permanently stripped).
