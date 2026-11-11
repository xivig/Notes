# 🔗 03: Links, Images, and Badges

Master inline links, reference links, relative repository paths, image rendering, custom dimensions, and Shields.io badge architecture.

---

## 1. Hyperlinks

### Inline Links
The most common link format: `[Link Text](URL "Optional Title")`.

```markdown
Visit the [Official jQuery Website](https://jquery.com "The Write Less, Do More JavaScript Library").
```

### Reference-Style Links
Keeps prose clean by separating link definitions from paragraphs:

```markdown
Modern web applications rely on [React][1], [TypeScript][2], and [Vite][3].

[1]: https://react.dev "React Library"
[2]: https://www.typescriptlang.org "TypeScript"
[3]: https://vite.dev "Vite Next-Gen Tooling"
```

### Relative Links (Repository Navigation)
Always use relative paths when linking between files inside a Git repository:

```markdown
- [Read License](../LICENSE)
- [Inspect Config](config/settings.json)
- [Jump to line range in file](src/index.js#L42-L55)
```

### Autolinks
```markdown
<https://github.com>
<contact@xivig.org>
```

---

## 2. Images

Image syntax is identical to link syntax, prefixed with an exclamation mark `!`:
`![Alt Text](Image_URL "Optional Title")`

```markdown
![Xivig Logo](assets/images/logo.png "Xivig Platform Logo")
```

### Clickable Images (Image as Link)
Wrap the image syntax inside standard link brackets:

```markdown
[![Watch Demo Video](assets/images/video-thumb.png)](https://youtube.com/watch?v=xyz)
```

### Sizing & Aligning Images via HTML
Pure Markdown does not support width/height attributes. To resize an image, use standard HTML:

```html
<p align="center">
  <img src="assets/images/logo.png" alt="Company Logo" width="200" height="auto">
</p>
```

---

## 3. Shields.io Status Badges

Badges provide instant visual indicators for continuous integration, code coverage, licenses, and releases.

```markdown
<!-- Standard Static Badge -->
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)

<!-- Dynamic GitHub Release Badge -->
![GitHub Release](https://img.shields.io/github/v/release/owner/repo?style=flat-square)

<!-- Clickable CI Status Badge -->
[![CI Status](https://img.shields.io/github/actions/workflow/status/owner/repo/ci.yml?branch=main&style=flat-square)](https://github.com/owner/repo/actions)

<!-- Social Badges with Logos -->
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=flat-square&logo=docker&logoColor=white)
```

### Badge Styling Options:
- `?style=flat` (Default)
- `?style=flat-square` (Modern rectangular aesthetic)
- `?style=for-the-badge` (Large bold corporate badge)
