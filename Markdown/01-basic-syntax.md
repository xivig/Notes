# 📝 01: Basic Syntax

Master headings, paragraphs, hard line breaks, text typography (bold, italic, strikethrough), and horizontal rules in Markdown.

---

## 1. Headings: ATX vs Setext

Markdown provides two heading styles:

### ATX Headings (Standard & Recommended)
Prefix the line with one to six `#` symbols followed by a space:

```markdown
# Heading 1 (Document Title)
## Heading 2 (Major Section)
### Heading 3 (Subsection)
#### Heading 4 (Component)
##### Heading 5 (Minor detail)
###### Heading 6 (Smallest header)
```

> [!TIP]
> Always include a space between `#` and the heading text (`# Heading`, not `#Heading`). Some modern parsers will not render headings without the space.

### Setext Headings (Legacy)
Underline text with `=` for H1 or `-` for H2:

```markdown
Heading 1
=========

Heading 2
---------
```

---

## 2. Paragraphs & Line Breaks

### Paragraphs
In Markdown, a paragraph is one or more consecutive lines of text separated by one or more blank lines:

```markdown
This is the first paragraph of text explaining an idea.

This is the second paragraph. The blank line between them creates a new paragraph block.
```

### Soft Breaks vs Hard Line Breaks
- **Soft Break**: Pressing `Enter` once in raw markdown does **not** create a new line in rendered HTML; the lines are joined by a space.
- **Hard Line Break**: To create a line break `<br>` without starting a new paragraph:
  - Add **two spaces** at the end of the line, or
  - End the line with a backslash `\`.

```markdown
Line one with two spaces at the end  
Line two follows immediately below.

Line three with a backslash\
Line four follows immediately below.
```

---

## 3. Emphasis & Typography

Surround words or phrases with asterisks (`*`) or underscores (`_`):

| Styling | Syntax | Output |
| :--- | :--- | :--- |
| **Italic** | `*italic*` or `_italic_` | *italic* |
| **Bold** | `**bold**` or `__bold__` | **bold** |
| **Bold & Italic** | `***bold italic***` or `___bold italic___` | ***bold italic*** |
| **Strikethrough** | `~~strikethrough~~` | ~~strikethrough~~ |
| **Inline Code** | `` `code` `` | `code` |

### Intra-word Emphasis:
Use asterisks when styling parts of words: `un**believ**able` ➔ un**believ**able.

---

## 4. Horizontal Rules (Thematic Breaks)

To create a horizontal divider line (`<hr>`), place three or more hyphens (`---`), asterisks (`***`), or underscores (`___`) on a line by themselves:

```markdown
Section One Content

---

Section Two Content
```

> [!WARNING]
> Always ensure there is an empty line before `---`, otherwise text directly above it will be converted into a Setext Heading 2!
