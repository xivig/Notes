# Module 05: Tables and Alignment

> **Scope**: GitHub Flavored Markdown (GFM) table syntax, column alignment rules, formatting inside cells, pipe escaping, and HTML table fallbacks for complex layouts (colspan/rowspan).

---

## 1. Table Fundamentals

Standard CommonMark does not include table syntax. Tables were introduced by GitHub Flavored Markdown (GFM) and are now a de facto standard supported across GitHub, GitLab, Bitbucket, Obsidian, VS Code, and most static site generators.

### Anatomy of a Markdown Table

A markdown table consists of three components:
1. **Header Row**: Defines column names separated by pipes (`|`).
2. **Delimiter Row**: Must contain at least three hyphens (`---`) per column, optionally with colons (`:`) to define alignment.
3. **Data Rows**: Contains table cells separated by pipes.

```markdown
| Header 1 | Header 2 | Header 3 |
| :------- | :------: | -------: |
| Left     |  Center  |    Right |
| Alpha    |   Beta   |    Gamma |
```

**Rendered Output:**

| Header 1 | Header 2 | Header 3 |
| :------- | :------: | -------: |
| Left     |  Center  |    Right |
| Alpha    |   Beta   |    Gamma |

---

## 2. Column Alignment Rules

Alignment is controlled exclusively by colons (`:`) in the delimiter row:

| Alignment Style | Delimiter Syntax | Explanation |
| :-------------- | :--------------- | :---------- |
| **Left Align** (Default) | `---` or `:---` | Content aligns flush left (ideal for text, titles, descriptions). |
| **Center Align** | `:---:` | Content aligns in the center (ideal for statuses, codes, badges, dates). |
| **Right Align** | `---:` | Content aligns flush right (ideal for numbers, currency, percentages). |

### Example with Diverse Alignment

```markdown
| Item ID | Product Description | Status | Quantity | Unit Price |
| :------ | :------------------ | :----: | -------: | ---------: |
| SKU-101 | Ergonomic Keyboard  | Active |       15 |     $89.99 |
| SKU-102 | Wireless Mouse      | Active |       42 |     $29.50 |
| SKU-103 | USB-C Docking Hub   | OOS    |        0 |    $119.00 |
```

---

## 3. Inline Formatting Inside Cells

You can format text inside table cells with almost all inline Markdown syntax:

| Feature | Syntax in Cell | Example Output |
| :--- | :--- | :--- |
| **Bold & Italic** | `**bold**`, `*italic*` | **bold**, *italic* |
| **Inline Code** | `` `code` `` | `npm run build` |
| **Hyperlinks** | `[Label](url)` | [GitHub](https://github.com) |
| **Strikethrough** | `~~strike~~` | ~~deprecated~~ |
| **Emoji** | `:sparkles:` or unicode ✨ | ✨ High Priority |
| **Badges / Images** | `![alt](url)` | Inline shields badges |

### Cell Formatting Code Example

```markdown
| Tool | Package | Command | Link |
| :--- | :------ | :------ | :--- |
| ESLint | `eslint@9` | `npx eslint .` | [Docs](https://eslint.org) |
| Prettier | `prettier@3` | `npx prettier --write .` | [Docs](https://prettier.io) |
| TypeScript | `typescript@5` | `tsc --noEmit` | [Docs](https://typescriptlang.org) |
```

---

## 4. Escaping Special Characters

### Escaping Pipe Characters (`|`)
Because pipes separate cells, a raw pipe character will break table parsing. Escape it with a backslash `\|`:

```markdown
| Logical Operator | Meaning | Example |
| :---------------- | :------ | :------ |
| `\|\|`            | OR      | `a \|\| b` |
| `&&`              | AND     | `a && b` |
| `!`               | NOT     | `!a` |
```

### Multi-Line Content / Line Breaks Inside Cells
Markdown table cells cannot span multiple physical lines. To create a line break within a single table cell, use the HTML `<br>` tag:

```markdown
| Step | Description | Action Required |
| :--- | :---------- | :-------------- |
| 1 | Clone repository<br>and install deps | `git clone ...`<br>`npm install` |
| 2 | Configure environment variables | Copy `.env.example`<br>Add `API_KEY` |
```

---

## 5. Pipe Formatting Conventions (Leading and Trailing Pipes)

GFM accepts tables without leading and trailing pipes:

```markdown
Header 1 | Header 2
--- | ---
Cell 1 | Cell 2
```

> [!WARNING] **Style Recommendation (markdownlint MD055 / MD056)**
> Always include leading and trailing pipes, and ensure every row has the exact same number of columns. Omitting exterior pipes makes tables harder to read in raw source text and can cause rendering inconsistencies across different Markdown parsers.

### Recommended Clean Form:

```markdown
| Endpoint | Method | Description |
| :------- | :----- | :---------- |
| `/auth/login` | `POST` | Authenticates user session |
| `/users/me`   | `GET`  | Fetches active profile |
```

---

## 6. Complex Tables: Fallback to Raw HTML

Standard Markdown tables **do not** support:
- Cells spanning multiple columns (`colspan`)
- Cells spanning multiple rows (`rowspan`)
- Nested lists or code blocks inside cells

When your document requires these advanced layouts, use standard HTML `<table>` tags:

```html
<table>
  <thead>
    <tr>
      <th rowspan="2">Component</th>
      <th colspan="2">Test Results</th>
      <th rowspan="2">Status</th>
    </tr>
    <tr>
      <th>Unit</th>
      <th>E2E</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Auth Module</td>
      <td>100%</td>
      <td>98%</td>
      <td><strong>Passed</strong></td>
    </tr>
    <tr>
      <td>Payment Gateway</td>
      <td>95%</td>
      <td>90%</td>
      <td><strong>Passed</strong></td>
    </tr>
  </tbody>
</table>
```

---

## 7. Common Mistakes & Best Practices

| Anti-Pattern | Correct Pattern | Reason |
| :----------- | :-------------- | :----- |
| Using tabs inside tables | Use single spaces around pipes | Tabs cause misaligned rendering in monospaced editors. |
| Forgetting header delimiter `---` | Always include delimiter row | Without delimiters, text renders as a single plain paragraph. |
| Raw pipes inside code spans: `` `a | b` `` | Escape the pipe: `` `a \| b` `` | Raw pipes break cell boundaries even inside backticks. |
| Splitting table rows with empty newlines | Keep table rows contiguous | An empty line terminates the table block immediately. |
