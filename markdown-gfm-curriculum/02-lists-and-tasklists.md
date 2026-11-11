# 📋 02: Lists and Task Lists

Master ordered, unordered, nested, mixed, loose vs tight lists, and GitHub Flavored Markdown (GFM) task checkboxes.

---

## 1. Unordered Lists

Unordered lists use hyphens (`-`), asterisks (`*`), or plus signs (`+`) followed by a space:

```markdown
- Standard hyphen bullet
- Second bullet
  - Nested sub-item (indent with 2 or 4 spaces)
  - Another sub-item
    - Third-level nesting
```

*Rendered Output:*
- Standard hyphen bullet
- Second bullet
  - Nested sub-item
  - Another sub-item
    - Third-level nesting

> [!TIP]
> Standardize on a single bullet character (e.g. `-`) across your entire repository to satisfy `markdownlint` rule MD004.

---

## 2. Ordered Lists

Ordered lists use numbers followed by a period (`.`) or parenthesis (`)`):

```markdown
1. First step
2. Second step
3. Third step
```

### Automatic Numbering:
CommonMark only cares about the first number. The parser automatically generates sequential numbers:

```markdown
1. Setup environment
1. Install dependencies
1. Run application
```
*Renders cleanly as 1, 2, 3!*

### Custom Starting Numbers:
```markdown
5. Step five
6. Step six
```
*Starts numbering at 5!*

---

## 3. Loose vs. Tight Lists

- **Tight List**: No blank lines between list items. Renders compact `<li>` tags without wrapping paragraph `<p>` tags.
- **Loose List**: A blank line separates any of the items. Renders items wrapped inside `<p>` tags, adding vertical padding between all list items.

```markdown
<!-- Tight List (Compact) -->
- Item A
- Item B
- Item C

<!-- Loose List (Spaced out) -->
- Item A

- Item B

- Item C
```

---

## 4. Multi-Paragraph & Multi-Element List Items

To include paragraphs, blockquotes, or code blocks inside a list item, indent each subsequent block by **4 spaces** or **1 tab**:

```markdown
1. **Initialize the Repository**:
   Run the git init command to create a new branch.

   ```bash
   git init my-project
   cd my-project
   ```

2. **Configure Remote Origin**:
   Link your local repository to GitHub.
```

---

## 5. Interactive Task Lists (GFM)

Task lists provide interactive checkboxes in GitHub issues, PRs, and markdown previews:

```markdown
### Milestone Checklist
- [x] Initial design specifications approved
- [x] Core schema migrations executed
- [ ] Automated end-to-end testing
- [ ] Production rollout
```

### Escaping Parentheses in Tasks:
If a task item begins with a parenthesis, escape it with a backslash:
```markdown
- [ ] \(Optional) Configure Sentry error tracking
```
