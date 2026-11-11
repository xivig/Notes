# Semantic HTML5 & Modern Page Layout

Why semantic markup is the backbone of accessible, searchable, and maintainable web architecture, and how to structure modern page layouts without `<div>` soup.

---

## 1. Why Semantic HTML Matters

**Semantic HTML** means using HTML tags that convey the actual **meaning and purpose** of the content rather than just defining its appearance.

### The Contrast: "Div Soup" vs. Semantic Markup

#### ❌ Non-Semantic ("Div Soup"):
```html
<div class="header">
  <div class="nav-links">
    <div class="link"><a href="/">Home</a></div>
  </div>
</div>
<div class="content">
  <div class="article-title">Post Title</div>
  <div class="text">Lorem ipsum...</div>
</div>
<div class="footer">Copyright 2026</div>
```
* Screen readers cannot determine page landmarks.
* Search engine bots cannot identify which text is primary content versus boilerplate navigation.
* Keyboard navigation cannot jump between sections.

#### ✅ Semantic HTML5:
```html
<header>
  <nav aria-label="Main Navigation">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Post Title</h1>
    <p>Lorem ipsum...</p>
  </article>
</main>
<footer>
  <p>&copy; 2026 Developer Portal.</p>
</footer>
```

### The 4 Major Benefits of Semantic HTML:
1. **Accessibility (a11y):** Screen readers use landmarks (`<nav>`, `<main>`, `<aside>`) to allow visually impaired users to jump directly to specific page areas.
2. **SEO & Crawlers:** Search engines prioritize content inside `<article>` and headings over sidebars and footers.
3. **Responsive Maintenance:** Clear hierarchy simplifies CSS selector design and component encapsulation.
4. **Device Compatibility:** Smart readers, RSS parsers, and browser "Reader Modes" rely on `<article>` and `<main>` to extract distraction-free reading views.

---

## 2. Page Architecture Landmark Elements

Modern HTML5 defines landmark regions that structure the overall layout:

```
+-------------------------------------------------------------------+
|                            <header>                               |
|   +-----------------------------------------------------------+   |
|   |                           <nav>                           |   |
|   +-----------------------------------------------------------+   |
+-------------------------------------------------------------------+
|                                                                   |
|   +---------------------------------------+   +---------------+   |
|   |                <main>                 |   |    <aside>    |   |
|   |                                       |   |   (Sidebar,   |   |
|   |   +-------------------------------+   |   |    Related,   |   |
|   |   |           <article>           |   |   |    Ads)       |   |
|   |   |   +-----------------------+   |   |   |               |   |
|   |   |   |       <section>       |   |   |   |               |   |
|   |   |   +-----------------------+   |   |   |               |   |
|   |   +-------------------------------+   |   |               |   |
|   +---------------------------------------+   +---------------+   |
|                                                                   |
+-------------------------------------------------------------------+
|                            <footer>                               |
+-------------------------------------------------------------------+
```

### 2.1 `<header>`
Represents introductory content or navigation aids. Typically contains site logo, heading, search bar, and primary navigation:
```html
<header class="site-header">
  <a href="/" class="brand-logo">DevDocs</a>
  <nav aria-label="Primary Navigation">
    <ul>
      <li><a href="/guides">Guides</a></li>
      <li><a href="/api">API Reference</a></li>
    </ul>
  </nav>
</header>
```

### 2.2 `<nav>`
Designates major navigation blocks:
* Use for site menus, table of contents, pagination, or breadcrumbs.
* Avoid wrapping individual isolated links; use `<nav>` for navigation groupings.
* Use `aria-label` when multiple `<nav>` elements appear on one page (e.g. `aria-label="Main"` vs `aria-label="Footer"`).

### 2.3 `<main>`
Holds the dominant, unique content of the page:
* Must **NOT** include content repeated across multiple pages (e.g. logos, global footers, search bars).
* There must only be **one visible `<main>` element** per document.
* It must not be a child of `<header>`, `<footer>`, `<nav>`, or `<article>`.

### 2.4 `<article>`
Represents a self-contained composition that makes sense on its own and could be syndicated independently:
* Ideal for blog articles, forum topics, news items, product review cards, and interactive widgets.
* Typically begins with an `<h1>`–`<h6>` heading.

### 2.5 `<section>`
Represents a standalone generic section of a document that groups related content thematically:
* Every `<section>` should typically contain a heading.
* If you only need a styling container without thematic meaning, use a `<div>`.

### 2.6 `<aside>`
Represents content tangentially related to the main content:
* Sidebars, callout boxes, related articles, author biographies, and advertising blocks.

### 2.7 `<footer>`
Represents the footer for its nearest sectioning ancestor or the entire page:
* Author credentials, copyright notices, sitemaps, privacy policy links, and back-to-top buttons.

---

## 3. Headings Hierarchy & Outlines (`<h1>` – `<h6>`)

Headings communicate the structural outline of your document.

### Rules of Headings:
1. **Single `<h1>` per page:** Represents the primary document title.
2. **Never skip heading levels:** Go from `<h1>` to `<h2>` to `<h3>`. Never jump from `<h2>` directly to `<h4>` merely for font size (use CSS for visual styling).
3. **Headings form an outline:** Assistive technologies allow users to navigate between headings like a table of contents.

```html
<h1>Web Development Guide</h1>
  <h2>Frontend Engineering</h2>
    <h3>HTML5 Semantics</h3>
    <h3>CSS3 Modern Layouts</h3>
  <h2>Backend Engineering</h2>
    <h3>Node.js Runtime</h3>
    <h3>Database Design</h3>
```

---

## 4. Text-Level Semantics

Use the right tag to convey proper nuance:

| Element | Semantic Purpose | Typical Rendering |
|---|---|---|
| `<strong>` | Indicates strong importance, seriousness, or urgency | Bold |
| `<b>` | Draws attention to text without conveying extra importance (keywords in a summary) | Bold |
| `<em>` | Indicates stress emphasis (changes the verbal meaning of a sentence) | Italic |
| `<i>` | Represents an alternate voice, mood, technical term, or idiomatic phrase | Italic |
| `<mark>` | Represents highlighted text for reference due to relevance in another context | Yellow highlight |
| `<small>` | Side-comments, legal disclaimers, or copyright small print | Smaller font |
| `<s>` | Represents content that is no longer accurate or relevant (struck out) | Strikethrough |
| `<del>` / `<ins>` | Represents explicit document edits: deleted text and inserted text | Strikethrough / Underline |
| `<code>` | Inline fragment of computer code | Monospace font |
| `<pre>` | Preformatted text preserving whitespace and line breaks | Monospace block |
| `<time>` | Machine-readable date or time | Standard text |
| `<abbr>` | Abbreviation or acronym with optional `title` tooltip | Dotted underline |
| `<blockquote>` | Extended quotation from an external source | Indented block |
| `<q>` | Short inline quotation (browser adds quotation marks) | Quoted inline |

### Examples:
```html
<p>
  The server deployment was completed on 
  <time datetime="2026-11-08T12:00:00Z">November 8, 2026</time>.
</p>

<p>
  Use the <abbr title="HyperText Markup Language">HTML</abbr> specification.
</p>

<blockquote cite="https://www.w3.org/TR/html52/">
  <p>HTML is the World Wide Web's core markup language.</p>
  <footer>— <cite>W3C Recommendation</cite></footer>
</blockquote>
```

---

## 5. Lists & Data Grouping

### 5.1 Unordered Lists (`<ul>`)
Used when item sequence is non-chronological:
```html
<ul>
  <li>MacBook Pro</li>
  <li>Dell XPS 15</li>
  <li>ThinkPad X1 Carbon</li>
</ul>
```

### 5.2 Ordered Lists (`<ol>`)
Used when sequence matters (steps, rankings, recipes):
```html
<ol start="1">
  <li>Initialize repository with git init</li>
  <li>Stage changes with git add</li>
  <li>Commit changes with git commit</li>
</ol>
```

### 5.3 Description Lists (`<dl>`)
Used for terms and descriptions, metadata key-value pairs, or glossaries:
```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language for document structure.</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets for layout and visual styling.</dd>

  <dt>JavaScript</dt>
  <dd>High-level language for dynamic client-side interactivity.</dd>
</dl>
```

---

## 6. Figures & Captions (`<figure>` & `<figcaption>`)

Use `<figure>` to wrap self-contained visual elements (images, code listings, diagrams, or charts) with an optional caption:

```html
<figure>
  <img src="images/dom-tree.png" alt="Diagram showing the HTML DOM tree hierarchy with root, head, and body nodes">
  <figcaption>Figure 1: The browser Document Object Model (DOM) tree structure.</figcaption>
</figure>

<figure>
  <pre><code>const server = http.createServer();</code></pre>
  <figcaption>Listing 2.1: Initializing an HTTP server in Node.js.</figcaption>
</figure>
```
