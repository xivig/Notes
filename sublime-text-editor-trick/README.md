# Sublime Text Editor Tricks & Developer Handbook

A practical, expandable reference for using **Sublime Text** efficiently. This handbook brings together the original shortcuts and snippets in this repository and expands them into workflows for everyday editing, web development, customization, and automation.

> **Platform note:** Shortcut examples primarily use Windows/Linux conventions. On macOS, `Ctrl` is generally replaced by `Cmd` for the common editing commands, while `Alt` is generally replaced by `Option`. Some commands and mouse gestures differ by platform, Sublime Text version, keyboard layout, and user key bindings. If a shortcut does not work, use **Tools → Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`) and search for the command name.

## Contents

- [1. Quick start](#1-quick-start)
- [2. Essential editing shortcuts](#2-essential-editing-shortcuts)
- [3. Selection and multi-cursor editing](#3-selection-and-multi-cursor-editing)
- [4. Navigation and project search](#4-navigation-and-project-search)
- [5. Indentation, lines, and code folding](#5-indentation-lines-and-code-folding)
- [6. Find, replace, and regular expressions](#6-find-replace-and-regular-expressions)
- [7. Sorting, case conversion, and clipboard](#7-sorting-case-conversion-and-clipboard)
- [8. HTML wrapping and Emmet](#8-html-wrapping-and-emmet)
- [9. Custom snippets](#9-custom-snippets)
- [10. Settings, themes, and key bindings](#10-settings-themes-and-key-bindings)
- [11. Packages and Package Control](#11-packages-and-package-control)
- [12. Projects and workspaces](#12-projects-and-workspaces)
- [13. Build systems](#13-build-systems)
- [14. Macros and automation](#14-macros-and-automation)
- [15. Developer workflows](#15-developer-workflows)
- [16. Troubleshooting](#16-troubleshooting)
- [17. Practice exercises](#17-practice-exercises)
- [18. Original notes and corrections](#18-original-notes-and-corrections)

---

## 1. Quick start

### Open the Command Palette

- Windows/Linux: `Ctrl+Shift+P`
- macOS: `Cmd+Shift+P`

The Command Palette searches available commands, settings, and package commands. It is often the fastest way to discover a feature without memorizing its shortcut.

### Open files quickly

- `Ctrl+P` / `Cmd+P`: Goto Anything; type part of a filename.
- `Ctrl+O` / `Cmd+O`: Open a file using the system file picker.
- `Ctrl+N` / `Cmd+N`: New file.
- `Ctrl+S` / `Cmd+S`: Save.
- `Ctrl+Shift+S` / `Cmd+Shift+S`: Save As.

### Learn a command before memorizing its shortcut

Open the Command Palette, search for a command, and inspect its menu entry or key binding. This is especially useful when a package adds commands or when a custom keymap changes the defaults.

---

## 2. Essential editing shortcuts

The following table lists common default bindings. A customized keymap can change them.

| Action | Windows/Linux | macOS |
|---|---|---|
| New file | `Ctrl+N` | `Cmd+N` |
| Open file | `Ctrl+O` | `Cmd+O` |
| Save | `Ctrl+S` | `Cmd+S` |
| Save As | `Ctrl+Shift+S` | `Cmd+Shift+S` |
| Close file | `Ctrl+W` | `Cmd+W` |
| Reopen last closed file | `Ctrl+Shift+T` | `Cmd+Shift+T` |
| Undo | `Ctrl+Z` | `Cmd+Z` |
| Redo | `Ctrl+Y` | `Cmd+Shift+Z` |
| Select all | `Ctrl+A` | `Cmd+A` |
| Copy | `Ctrl+C` | `Cmd+C` |
| Cut | `Ctrl+X` | `Cmd+X` |
| Paste | `Ctrl+V` | `Cmd+V` |
| Duplicate line/selection | `Ctrl+Shift+D` | `Cmd+Shift+D` |
| Delete line | `Ctrl+Shift+K` | `Ctrl+Shift+K` |
| Toggle comment | `Ctrl+/` | `Cmd+/` |
| Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Goto Anything | `Ctrl+P` | `Cmd+P` |
| Find | `Ctrl+F` | `Cmd+F` |
| Replace | `Ctrl+H` | `Alt+Cmd+F` |
| Find in files | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Preferences | `Ctrl+,` | `Cmd+,` |

**Tip:** On macOS, some keyboard shortcuts depend on the active keyboard layout and Sublime Text version. Use the Command Palette when a table entry differs from your installation.

---

## 3. Selection and multi-cursor editing

Multi-cursor editing lets you change repeated text in several places at once.

### Select matching occurrences

1. Place the caret inside a word.
2. Press `Ctrl+D` (Windows/Linux) or `Cmd+D` (macOS) to select the next occurrence.
3. Repeat to add more occurrences.
4. Type once to replace all selected occurrences.

Useful related commands:

- `Ctrl+K`, then `Ctrl+D`: Skip the current occurrence and select the next one (default Windows/Linux sequence).
- `Alt+F3`: Select all occurrences of the current word on Windows/Linux.
- `Esc`: Cancel multiple selections and return to a single caret.

### Split a selection into lines

`Ctrl+Shift+L` (Windows/Linux) or `Cmd+Shift+L` (macOS) converts each selected line into an independent selection.

Example: select a list of class names, invoke Split into Lines, then add a prefix or suffix to every line.

```text
header
main
footer
```

With one selection per line, place the caret at the start or end of each line and type once.

### Add carets with the mouse

- Windows/Linux: use the platform's multi-selection mouse gesture; commonly `Ctrl`/`Alt` plus click depending on the OS and preferences.
- macOS: `Cmd`-click is commonly used to add a caret.
- For a rectangular/column selection, use the platform-specific drag gesture or search the Command Palette for **Column Selection**.

Mouse gestures can vary. The reliable fallback is to use the Command Palette and search for `add cursor` or `column selection`.

### Column selection

Column selection is useful for editing aligned text, CSV-like data, or repeated prefixes.

Example:

```text
name       role       status
Asha       editor     active
Ravi       author     active
Mina       reviewer   pending
```

Create a rectangular selection over the same column, then type or delete once to affect every row.

### Practice: add a common suffix

Starting text:

```text
alpha
beta
gamma
```

Select all three lines, split the selection into lines, move each caret to the end, and type `,`. Result:

```text
alpha,
beta,
gamma,
```

---

## 4. Navigation and project search

### Goto Anything (`Ctrl+P` / `Cmd+P`)

Type a filename or part of a path to open a file. Goto Anything also accepts navigation operators:

| Pattern | Purpose |
|---|---|
| `filename` | Open a matching file |
| `filename:25` | Open the file at line 25 |
| `filename@symbol` | Jump to a symbol in a file |
| `@symbol` | Search symbols in the current file |
| `#word` | Search for text in the current file |

The exact symbol list depends on the file's syntax definition and available symbol index.

### Find in files

Use `Ctrl+Shift+F` / `Cmd+Shift+F` to search across a folder or project.

- **Find:** text or regular expression to search for.
- **Where:** folders, project paths, or include/exclude patterns.
- **Replace:** optional replacement text.
- Review matches before replacing across many files.

Examples of useful `Where` patterns:

```text
.
*.html
src/
*.js,*.css
```

### Bookmarks

Bookmarks help you return to important lines in long files. Search the Command Palette for `toggle bookmark`, `next bookmark`, and `previous bookmark` to see the available commands and bindings in your version.

---

## 5. Indentation, lines, and code folding

### Indent and unindent

- `Ctrl+]`: indent.
- `Ctrl+[`: unindent.
- Select multiple lines to indent or unindent the block.
- Use **Edit → Line → Reindent** to reformat indentation according to the active syntax and settings.

To reindent a whole file:

1. Press `Ctrl+A` / `Cmd+A`.
2. Open **Edit → Line → Reindent**.
3. Inspect the result, especially in files containing embedded languages or intentionally aligned text.

### Move and delete lines

| Action | Windows/Linux default |
|---|---|
| Move line/selection up | `Ctrl+Shift+Up` |
| Move line/selection down | `Ctrl+Shift+Down` |
| Duplicate line/selection | `Ctrl+Shift+D` |
| Delete line | `Ctrl+Shift+K` |
| Join lines | Search Command Palette for `Join Lines` |

### Code folding

- `Ctrl+Shift+[` folds the current code block.
- `Ctrl+Shift+]` unfolds the current code block.
- Use the gutter arrows to fold or unfold a region with the mouse.
- Search the Command Palette for `Fold`, `Unfold`, and `Unfold All` for additional commands.

Folding depends on the syntax definition and the structure recognized by Sublime Text.

### Paste and indentation

`Ctrl+Shift+V` is commonly **Paste and Indent** on Windows/Linux. It adapts pasted text to the current indentation context; it does not guarantee that arbitrary source code will retain exactly the original formatting. After pasting, inspect the result and use Reindent if needed.

---

## 6. Find, replace, and regular expressions

### Basic find and replace

- `Ctrl+F`: Find in the current file.
- `Ctrl+H`: Replace in the current file.
- `Ctrl+Shift+F`: Find across files.

The find panel provides options such as case sensitivity, whole-word matching, regular expressions, and wrap-around search.

### Useful regular expressions

Enable the `.*` regular-expression option in the find panel before using these patterns.

| Goal | Pattern |
|---|---|
| One or more digits | `\d+` |
| One or more whitespace characters | `\s+` |
| A word boundary | `\bword\b` |
| Lines beginning with `TODO` | `^TODO.*` |
| Blank or whitespace-only line | `^\s*$` |
| HTML-like opening tag (basic example) | `<([A-Za-z][A-Za-z0-9]*)\b[^>]*>` |

Regular expressions are powerful but are not a substitute for an HTML, XML, or programming-language parser. Test replacements on a small selection or a copy first.

### Capture groups in replacements

Find:

```regex
(\w+),\s*(\w+)
```

Replace:

```text
$2 $1
```

This changes text such as `Mondal, Tapas` to `Tapas Mondal`. Sublime Text replacement syntax supports capture references; check the find panel's help if a more complex expression is needed.

---

## 7. Sorting, case conversion, and clipboard

### Sort lines

- `F9`: Sort Lines.
- `Ctrl+F9`: Sort Lines (case sensitive) on common Windows/Linux defaults.

Select the lines first if you only want to sort a portion of the document. Sorting changes order; it does not understand semantic relationships between lines.

### Change letter case

Select the text, then use:

- `Ctrl+K`, then `Ctrl+U`: Upper Case.
- `Ctrl+K`, then `Ctrl+L`: Lower Case.

You can also search the Command Palette for `Upper Case`, `Lower Case`, `Title Case`, or related commands.

### Clipboard history

Sublime Text's built-in clipboard behavior is not a full multi-item clipboard manager. If you need a persistent clipboard history, use an operating-system clipboard manager or a trusted package.

---

## 8. HTML wrapping and Emmet

### Wrap selected text with an HTML tag

A convenient built-in workflow is:

1. Select the text.
2. Open the Command Palette.
3. Search for **Emmet: Wrap with Abbreviation** (if Emmet is installed).
4. Enter a tag or abbreviation, such as `p`, `div.card`, or `ul>li*3`.

Example input:

```text
A short paragraph.
```

Abbreviation:

```text
p
```

Result:

```html
<p>A short paragraph.</p>
```

The original notes mention `Alt+Shift+W` for wrapping. This binding may be supplied by an installed package or custom keymap; it is not safe to assume it exists in every Sublime Text installation.

### Emmet installation

Emmet abbreviation expansion is generally provided through the Emmet package. Install it using Package Control, then follow the package's current setup instructions. If `Tab` does not expand an abbreviation, check:

- Emmet is installed and enabled.
- The current file has the correct syntax.
- The abbreviation is recognized.
- Another package or key binding has not taken over the Tab key.

### Common Emmet examples

These examples show typical HTML expansions. Exact behavior can depend on Emmet version and editor configuration.

| Abbreviation | Meaning |
|---|---|
| `!` | HTML5 document skeleton |
| `.banner` | Element with class `banner` (usually a `div`) |
| `#app` | Element with id `app` |
| `ul>li*3` | Unordered list with three list items |
| `ul>li.item-$*3` | Three list items with numbered classes |
| `nav>ul>li*4>a` | Navigation list with four links |
| `section>h2+p` | Section with heading and paragraph |
| `form>label+input` | Form with a label and input |

Example:

```text
ul>li.item-$*3>a
```

Typical expansion:

```html
<ul>
  <li class="item-1"><a href=""></a></li>
  <li class="item-2"><a href=""></a></li>
  <li class="item-3"><a href=""></a></li>
</ul>
```

Number padding can be expressed with repeated dollar signs in Emmet:

```text
ul>li#item-$$*3>a
```

Typical IDs: `item-01`, `item-02`, `item-03`.

---

## 9. Custom snippets

Snippets insert reusable code through a tab trigger or the Command Palette.

### Create a snippet

1. Open **Tools → Developer → New Snippet**.
2. Replace the sample content inside the `<content><![CDATA[ ... ]]></content>` block.
3. Set a `<tabTrigger>`.
4. Optionally set a `<scope>` to limit where it is available.
5. Save the file with the `.sublime-snippet` extension in the suggested User package folder.
6. Type the trigger in a matching syntax and press `Tab`.

### Understand snippet fields

- `${1:default}`: first editable tab stop with a default value.
- `${2:default}`: second tab stop.
- `$0`: final cursor position after tabbing through the snippet.
- `$1`: a tab stop that can be reused in multiple places.
- `<tabTrigger>`: text used to trigger the snippet.
- `<scope>`: syntax scope where the snippet is offered.
- `<description>`: optional description shown in snippet menus.

### Example 1: HTML5 page skeleton

Save as `html5.sublime-snippet`:

```xml
<snippet>
  <content><![CDATA[
<!doctype html>
<html lang="${1:en}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${2:Page title}</title>
</head>
<body>
  $0
</body>
</html>
]]></content>
  <tabTrigger>html5</tabTrigger>
  <scope>text.html</scope>
  <description>HTML5 document skeleton</description>
</snippet>
```

### Example 2: reusable HTML form field

Save as `field.sublime-snippet`:

```xml
<snippet>
  <content><![CDATA[
<div class="form-group">
  <label for="${1:field-id}">${2:Field label}</label>
  <input
    type="${3:text}"
    name="${1:field-id}"
    id="${1:field-id}"
    class="form-control"
    placeholder="${4:Enter value}"
  >
</div>
$0
]]></content>
  <tabTrigger>field</tabTrigger>
  <scope>text.html</scope>
  <description>Accessible HTML form field</description>
</snippet>
```

This is a starting point, not a complete production form. Add validation, error messaging, and appropriate input types for the actual application.

### Example 3: PHP function

Save as `php-function.sublime-snippet`:

```xml
<snippet>
  <content><![CDATA[
function ${1:functionName}(${2:$args})
{
    $0
}
]]></content>
  <tabTrigger>fn</tabTrigger>
  <scope>source.php</scope>
  <description>PHP function</description>
</snippet>
```

### Example 4: HTML div with comments

Save as `div-comment.sublime-snippet`:

```xml
<snippet>
  <content><![CDATA[
<!-- ${1:component} start -->
<div class="${1:component}">
  $0
</div>
<!-- ${1:component} end -->
]]></content>
  <tabTrigger>divc</tabTrigger>
  <scope>text.html</scope>
  <description>Div wrapper with start/end comments</description>
</snippet>
```

### Snippet troubleshooting

- Confirm the file ends in `.sublime-snippet`.
- Check that the XML tags are correctly closed.
- Confirm the scope matches the active syntax.
- Check whether the tab trigger conflicts with an Emmet abbreviation.
- Use the Command Palette to find snippet-related commands if the trigger does not appear.

---

## 10. Settings, themes, and key bindings

Sublime Text stores user preferences separately from its default package resources. Prefer editing **Preferences → Settings** and **Preferences → Key Bindings** rather than modifying default files that may be replaced by updates.

### Example user settings

Open **Preferences → Settings** and add or merge settings such as:

```json
{
  "font_size": 12,
  "tab_size": 4,
  "translate_tabs_to_spaces": true,
  "ensure_newline_at_eof_on_save": true,
  "trim_trailing_white_space_on_save": true,
  "highlight_line": true,
  "word_wrap": false,
  "rulers": [80, 120]
}
```

Settings are preferences, not universal rules. For example, use the indentation width required by the project rather than forcing four spaces in every language.

### Custom key binding

Open **Preferences → Key Bindings**. The left pane shows defaults; the right pane is for user overrides. Add entries to the user array rather than editing the default keymap.

Example: bind a shortcut to Reindent:

```json
[
  {
    "keys": ["ctrl+shift+i"],
    "command": "reindent"
  }
]
```

Example: bind a shortcut to Split Selection into Lines:

```json
[
  {
    "keys": ["ctrl+alt+l"],
    "command": "split_selection_into_lines"
  }
]
```

Do not assign the same key combination to multiple commands unless you intentionally use context conditions. If a binding does not work, check for conflicts and verify the command name in the Command Palette.

### Theme and color scheme

- A **theme** changes the editor's interface, such as tabs, side bar, and panels.
- A **color scheme** changes syntax highlighting colors.
- Install themes from a trusted source or Package Control.
- Preview a scheme before applying it to a large project; contrast and syntax readability matter more than decoration.

---

## 11. Packages and Package Control

Packages add language support, navigation, linting, formatting, Git features, and other workflows.

### Install Package Control

Use the official Package Control installation instructions for your Sublime Text version. Once installed:

1. Open the Command Palette.
2. Run **Package Control: Install Package**.
3. Search for the package name.
4. Install and restart or reload the editor if requested.

### Package categories to explore

Package availability and maintenance change over time. Review each package's compatibility, publisher, release history, and permissions before installing.

| Category | What it helps with |
|---|---|
| Emmet | Expand HTML/CSS abbreviations |
| LSP | Language Server Protocol integration |
| GitGutter | Show Git diff indicators in the gutter |
| SublimeLinter | Integrate configured linters |
| Formatter packages | Format supported languages |
| Markdown packages | Preview and author Markdown |
| Sidebar enhancements | Additional file and folder actions |

Avoid installing multiple packages that perform the same task unless you have a clear reason. Too many overlapping packages can cause key-binding conflicts and slow startup.

---

## 12. Projects and workspaces

Projects let you work with multiple folders and save project-specific configuration.

### Create a project

1. Open the project folder.
2. Choose **Project → Save Project As**.
3. Save a `.sublime-project` file.
4. Add project folders and settings as required.
5. Reopen the project later using **Project → Open Project**.

### Example project file

```json
{
  "folders": [
    {
      "path": ".",
      "folder_exclude_patterns": ["node_modules", ".git", "vendor"],
      "file_exclude_patterns": ["*.log"]
    }
  ],
  "settings": {
    "tab_size": 2,
    "translate_tabs_to_spaces": true
  }
}
```

Keep secrets, passwords, API keys, and machine-specific absolute paths out of shared project files. Use environment variables or local untracked configuration for sensitive values.

---

## 13. Build systems

Build systems run a command and display its output inside Sublime Text. A build system is not automatically a debugger or a complete development environment.

### Run a build

- **Tools → Build System**: choose a build system.
- `Ctrl+B` / `Cmd+B`: run the build.
- `Ctrl+Shift+B` / `Cmd+Shift+B`: choose a build variant or build system.

### Example: Python

Save a custom build system as `Python.sublime-build`:

```json
{
  "cmd": ["python", "-u", "$file"],
  "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
  "selector": "source.python"
}
```

On some systems the executable is `python3` rather than `python`. Update the command to match the interpreter installed on your machine.

### Example: PHP syntax check

```json
{
  "cmd": ["php", "-l", "$file"],
  "selector": "source.php"
}
```

This checks PHP syntax; it does not run a web server or execute the application.

### Example: Node.js

```json
{
  "cmd": ["node", "$file"],
  "selector": "source.js"
}
```

Make sure Node.js is installed and available on the system PATH. Build output and error parsing can vary by tool and operating system.

---

## 14. Macros and automation

Macros record a sequence of editor actions so it can be replayed.

### Record and replay a macro

1. Start recording using **Tools → Record Macro** or the Command Palette.
2. Perform the editing steps.
3. Stop recording using **Tools → Stop Recording Macro**.
4. Replay using **Tools → Playback Macro**.

The original notes mention `Ctrl+Q` for macro recording. Treat that as a possible default or customized binding, not a universal shortcut; verify it in your keymap.

### Save a macro

Use **Tools → Save Macro** if available in your version, or save the recorded macro through the editor's macro workflow. Saved macros are stored as `.sublime-macro` files.

Macros are best for deterministic editor actions. For complex logic, use a plugin or an external script instead.

---

## 15. Developer workflows

### Workflow A: Rename a repeated variable

1. Place the caret in the variable.
2. Use `Ctrl+D` / `Cmd+D` to select matching occurrences one by one.
3. Skip matches that should not change.
4. Type the new name.
5. Review the file for missed or unintended replacements.

For project-wide refactoring, use language-aware rename support where available rather than blind text replacement.

### Workflow B: Build a list from plain text

1. Put one item on each line.
2. Select all lines.
3. Split selection into lines.
4. Add the opening markup at each line start and closing markup at each line end, or use an Emmet abbreviation for a structured list.
5. Review the resulting HTML.

### Workflow C: Clean indentation

1. Confirm the correct syntax is selected.
2. Select all.
3. Run Reindent.
4. Inspect embedded scripts, templates, and intentionally aligned blocks.
5. Save only after reviewing the diff.

### Workflow D: Search and replace across a project

1. Save or commit your current work.
2. Open Find in Files.
3. Set the project folder and appropriate file filters.
4. Test the search pattern.
5. Review matches.
6. Replace and inspect the resulting diff.

### Workflow E: Create a reusable component snippet

1. Identify the repeated markup.
2. Replace changing values with tab stops.
3. Set a descriptive trigger and the correct syntax scope.
4. Save the snippet.
5. Test it in a scratch file.
6. Document the trigger for your team.

---

## 16. Troubleshooting

| Problem | What to check |
|---|---|
| Shortcut does nothing | Search the command in Command Palette; inspect user key bindings and conflicts |
| Tab does not expand Emmet | Confirm Emmet is installed, syntax is correct, and Tab is not intercepted |
| Snippet does not appear | Check `.sublime-snippet` extension, XML, trigger, and scope |
| Wrong indentation after paste | Check tab settings; try Paste and Indent or Reindent |
| Build says command not found | Install the runtime/compiler and verify PATH or executable path |
| Build runs the wrong file | Check the active file, build-system selector, and custom command |
| Syntax colors look wrong | Check the file's syntax selection and installed syntax packages |
| Editor becomes slow | Disable recently added packages one at a time and inspect large files |
| Project excludes files | Review project folder and file exclusion patterns |

For difficult issues, reproduce the problem in a clean scratch file and temporarily disable user packages. This helps separate editor behavior from package or project configuration.

---

## 17. Practice exercises

Try these exercises in a disposable file.

1. **Multi-cursor:** Create five lines and add the same suffix to each line.
2. **Duplicate and move:** Duplicate a block, move it above the original, and edit its heading.
3. **Regex:** Find all lines that begin with `TODO`.
4. **Sorting:** Sort a list alphabetically, then try case-sensitive sorting.
5. **HTML wrapping:** Wrap a sentence in a paragraph tag using Emmet.
6. **Snippet:** Create a `card` snippet with tab stops for title, body, and link.
7. **Project:** Save a project with a root folder and exclude generated directories.
8. **Build:** Create a build system for a language runtime installed on your computer.
9. **Macro:** Record a repeatable formatting sequence and replay it.
10. **Keymap:** Add one custom shortcut and verify that it does not conflict with an existing command.

---

## 18. Original notes and corrections

This handbook preserves the topics from the original repository notes and clarifies several shortcut details.

### Original shortcut notes retained

- `Ctrl+D`: add the next matching occurrence to the selection.
- `Ctrl+Shift+L`: split a multi-line selection into separate line selections.
- `Alt+Shift+W`: wrap selection with an HTML tag in setups where the binding/package provides it.
- `Ctrl+Shift+[` / `Ctrl+Shift+]`: fold and unfold code.
- `Ctrl+[` / `Ctrl+]`: unindent and indent.
- `Ctrl+Shift+Up` / `Ctrl+Shift+Down`: move a line or selection.
- `Ctrl+Shift+K`: delete a line.
- **Edit → Line → Reindent**: reindent selected text or the whole file.
- `Ctrl+Shift+V`: Paste and Indent on common Windows/Linux defaults.
- `Ctrl+K`, then `Ctrl+U`: uppercase.
- `Ctrl+K`, then `Ctrl+L`: lowercase.
- `Ctrl+P`: Goto Anything.
- `Ctrl+Shift+P`: Command Palette.
- `F9`: sort lines.
- `Ctrl+F9`: case-sensitive sort on common Windows/Linux defaults.
- Snippet creation through **Tools → Developer → New Snippet**.

### Important correction: duplicate versus split selection

The original notes listed `Ctrl+Shift+L` as both “split selection into lines” and “duplicate content.” These are different commands:

- `Ctrl+Shift+L`: split selection into lines.
- `Ctrl+Shift+D`: duplicate line or selection on common Windows/Linux defaults.

### Snippet tab stops

The original snippet examples use numbered fields such as `$1`, `${1:default}`, and `$0`. These are tab stops. Reusing the same numbered field mirrors the same value in multiple places, which is useful for linked HTML attributes such as `name` and `id`.

### Emmet dependency

The original `fun`, `ife`, `if`, `!`, `art`, `foot`, `.banner`, and list abbreviations are Emmet-style expansions or package-provided completions. They should not be treated as guaranteed built-in Sublime Text snippets. Install and configure Emmet before relying on those triggers.

---

## Useful official resources

- [Sublime Text Documentation](https://www.sublimetext.com/docs/)
- [Sublime Text Keyboard Shortcuts](https://www.sublimetext.com/docs/keyboard_shortcuts.html)
- [Sublime Text Editing](https://www.sublimetext.com/docs/editing.html)
- [Sublime Text Settings](https://www.sublimetext.com/docs/settings.html)
- [Sublime Text Key Bindings](https://www.sublimetext.com/docs/key_bindings.html)
- [Sublime Text Snippets](https://www.sublimetext.com/docs/snippets.html)
- [Sublime Text Projects](https://www.sublimetext.com/docs/projects.html)
- [Sublime Text Build Systems](https://www.sublimetext.com/docs/build_systems.html)
- [Package Control](https://packagecontrol.io/)
- [Emmet Documentation](https://docs.emmet.io/)

---

## Contributing

Suggestions, tested shortcuts, useful snippets, and package recommendations are welcome.

When contributing:

1. Mention the operating system and Sublime Text version.
2. Distinguish built-in commands from package-provided behavior.
3. Include a short example and expected result.
4. Avoid publishing secrets, access tokens, or private project paths.
5. Test snippets and build systems before submitting them.

## License

Add a repository license before redistributing this handbook as a packaged learning resource. Until a license is selected, do not assume that the repository grants broad reuse rights.
