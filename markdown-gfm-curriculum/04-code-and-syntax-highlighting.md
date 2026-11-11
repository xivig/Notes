# 💻 04: Code and Syntax Highlighting

Master inline code formatting, fenced code blocks, language specifiers, git diff highlighting, and terminal command conventions.

---

## 1. Inline Code

Wrap short identifiers, function names, and variable references in single backticks:

```markdown
Use the `Array.prototype.map()` method to transform arrays.
```

### Escaping Backticks Inside Inline Code:
To display a literal backtick inside inline code, surround it with double backticks with spaces:
```markdown
Run `` `npm test` `` to execute specs.
```

---

## 2. Fenced Code Blocks

Enclose blocks of code between lines containing triple backticks (```` ``` ````) or triple tildes (`~~~`). Always include a language identifier immediately following the opening backticks:

````markdown
```javascript
import { useState, useEffect } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
}
```
````

---

## 3. Supported Language Identifiers Matrix

Common syntax highlighting identifiers supported on GitHub, GitLab, and Prism.js:

| Language | Specifiers |
| :--- | :--- |
| **JavaScript / TypeScript** | `javascript`, `js`, `typescript`, `ts`, `jsx`, `tsx` |
| **Web Markup & Styles** | `html`, `css`, `scss`, `less`, `svg` |
| **Backend & Systems** | `python`, `py`, `rust`, `rs`, `go`, `golang`, `java`, `c`, `cpp`, `csharp`, `cs`, `php`, `ruby`, `rb` |
| **Shell & DevOps** | `bash`, `sh`, `zsh`, `powershell`, `pwsh`, `dockerfile`, `docker` |
| **Data Formats** | `json`, `yaml`, `yml`, `toml`, `xml`, `csv`, `graphql` |
| **Database** | `sql`, `pgsql`, `mysql`, `sqlite` |
| **Configuration** | `ini`, `nginx`, `apache`, `properties` |
| **Version Control** | `diff`, `git` |

---

## 4. Git Diff Highlighting

Use the `diff` language identifier to visualize file changes:
- Prefix lines with `+` for added lines (highlighted green).
- Prefix lines with `-` for removed lines (highlighted red).
- Prefix lines with ` ` (space) for unchanged context lines.

````markdown
```diff
--- a/src/auth.js
+++ b/src/auth.js
@@ -10,3 +10,3 @@
- const tokenExpiry = 3600; // 1 hour
+ const tokenExpiry = 86400; // 24 hours
  export function verifySession() { ... }
```
````

---

## 5. Terminal & Console Formatting Conventions

When documenting terminal instructions, choose a clear convention:

### Clean / Copy-Paste Friendly (Recommended):
Omit the leading `$` or `#` prompt so developers can click "Copy" and paste directly into their terminal:

````markdown
```bash
git clone https://github.com/xivig/Notes.git
cd Notes
npm install
npm run dev
```
````

### With Output Demonstration:
````markdown
```shell
$ git status
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```
````
