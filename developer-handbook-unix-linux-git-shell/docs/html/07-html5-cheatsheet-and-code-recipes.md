# HTML5 Cheat Sheet & Production Code Recipes

A high-speed element reference matrix, complete production starter template, and ready-to-use accessible UI patterns.

---

## 1. HTML5 Elements by Category

### Structural & Landmark Elements
| Element | Description |
|---|---|
| `<!DOCTYPE html>` | Triggers standards mode rendering in modern browsers |
| `<html lang="en">` | Root container; `lang` specifies language for a11y & SEO |
| `<head>` | Holds metadata, title, viewport, stylesheets, and scripts |
| `<body>` | Contains all visible content displayed to the user |
| `<header>` | Introductory header for page or section |
| `<nav>` | Navigation section containing primary links |
| `<main>` | Unique primary content of the document (one per page) |
| `<article>` | Self-contained, independently distributable composition |
| `<section>` | Thematic grouping of content with a heading |
| `<aside>` | Content tangentially related to the main content (sidebar) |
| `<footer>` | Closing information (copyright, sitemap, legal links) |

### Text Formatting & Semantics
| Element | Description |
|---|---|
| `<h1>` – `<h6>` | Hierarchical headings (`<h1>` is highest, `<h6>` is lowest) |
| `<p>` | Paragraph of text |
| `<strong>` | High importance or seriousness (bold) |
| `<em>` | Stress emphasis changing verbal meaning (italic) |
| `<mark>` | Highlighted text for reference |
| `<code>` | Inline code snippet |
| `<pre>` | Preformatted text preserving line breaks and spaces |
| `<blockquote>` | Quoted block with optional `cite` attribute |
| `<time>` | Machine-readable date/time (`datetime="YYYY-MM-DD"`) |
| `<abbr>` | Abbreviation with expansion in `title` attribute |

### Media & Embedded Content
| Element | Description |
|---|---|
| `<img>` | Image with `src`, `alt`, `width`, `height`, `loading="lazy"` |
| `<picture>` | Wrapper for art direction and format negotiation (AVIF/WebP) |
| `<source>` | Media resource source for `<picture>`, `<video>`, `<audio>` |
| `<video>` | Native video streaming with `controls`, `poster`, `preload` |
| `<audio>` | Native audio playback with `controls` |
| `<track>` | Subtitles, closed captions, and chapters for video |
| `<iframe>` | Embedded document with `title`, `sandbox`, `loading="lazy"` |

### Forms & Interactive Elements
| Element | Description |
|---|---|
| `<form>` | Container with `action`, `method` (GET/POST), `enctype` |
| `<label>` | Accessible input caption linked via `for="id"` |
| `<input>` | Dynamic input control (`text`, `email`, `tel`, `date`, `file`, etc.) |
| `<textarea>` | Multi-line text input field |
| `<select>` / `<option>` | Dropdown selection menu |
| `<fieldset>` / `<legend>` | Group of related inputs with title legend |
| `<button>` | Clickable button (`type="submit"`, `type="button"`) |
| `<dialog>` | Native modal dialog with `.showModal()`, `.close()`, backdrop |
| `<details>` / `<summary>` | Native disclosure accordion without JavaScript |
| `<template>` | Inert client-side markup template cloned via JavaScript |

---

## 2. Production HTML5 Starter Boilerplate

Copy and use this template as the standard foundation for any new project:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO & Social Sharing -->
  <title>Your Brand · Modern Web Platform</title>
  <meta name="description" content="Production-ready web platform built with semantic HTML5, CSS3, and JavaScript.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://example.com">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Your Brand">
  <meta property="og:description" content="Production-ready web platform.">
  <meta property="og:image" content="https://example.com/assets/og-image.jpg">
  <meta property="og:url" content="https://example.com">

  <!-- Favicons -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <!-- Resource Preloading & CSS -->
  <link rel="stylesheet" href="css/style.css">

  <!-- Deferred Scripts -->
  <script defer src="js/main.js"></script>
</head>
<body>
  <!-- Accessible Skip Link -->
  <a href="#content" class="skip-link">Skip to main content</a>

  <!-- Header -->
  <header class="site-header">
    <a href="/" class="brand-logo">YourBrand</a>
    <nav aria-label="Main Navigation">
      <ul>
        <li><a href="/features">Features</a></li>
        <li><a href="/docs">Docs</a></li>
        <li><a href="/pricing">Pricing</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main Content -->
  <main id="content">
    <section class="hero">
      <h1>Build Faster with Modern Web Standards</h1>
      <p>Clean, semantic, and accessible markup designed for peak performance.</p>
      <a href="/get-started" class="btn btn-primary">Get Started</a>
    </section>
  </main>

  <!-- Footer -->
  <footer class="site-footer">
    <p>&copy; 2026 YourBrand, Inc. All rights reserved.</p>
  </footer>
</body>
</html>
```

---

## 3. Production UI Recipes

### 3.1 Accessible Registration Form with Native Validation
```html
<form action="/register" method="POST" class="auth-form">
  <div class="form-row">
    <label for="reg-name">Full Name (required)</label>
    <input type="text" id="reg-name" name="name" required autocomplete="name" minlength="2">
  </div>

  <div class="form-row">
    <label for="reg-email">Email Address (required)</label>
    <input type="email" id="reg-email" name="email" required autocomplete="email">
  </div>

  <div class="form-row">
    <label for="reg-password">Password (8+ characters)</label>
    <input type="password" 
           id="reg-password" 
           name="password" 
           required 
           minlength="8" 
           autocomplete="new-password"
           aria-describedby="pass-help">
    <small id="pass-help">Must be at least 8 characters long.</small>
  </div>

  <div class="form-row checkbox-row">
    <label>
      <input type="checkbox" name="terms" required>
      I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
    </label>
  </div>

  <button type="submit" class="btn-submit">Create Account</button>
</form>
```

### 3.2 Responsive Product Card with Art Direction
```html
<article class="card">
  <picture>
    <source type="image/avif" srcset="images/headset.avif">
    <source type="image/webp" srcset="images/headset.webp">
    <img src="images/headset.jpg" 
         alt="Wireless noise-canceling headphones in matte black finish" 
         width="600" 
         height="400" 
         loading="lazy">
  </picture>
  <div class="card-body">
    <span class="badge">Hardware</span>
    <h2>Wireless Pro Headset</h2>
    <p>Ultra-low latency audio with 40-hour battery life and custom EQ profiles.</p>
    <div class="card-footer">
      <span class="price">$199.00</span>
      <button type="button" class="btn-cart" data-product-id="hp-100">Add to Cart</button>
    </div>
  </div>
</article>
```

### 3.3 Zero-JavaScript FAQ Accordion
```html
<section class="faq-section" aria-labelledby="faq-heading">
  <h2 id="faq-heading">Frequently Asked Questions</h2>

  <details>
    <summary>Can I use these tutorials for commercial projects?</summary>
    <p>Yes. The entire repository is published under the permissive ISC License.</p>
  </details>

  <details>
    <summary>Do these scripts work on Apple Silicon Macs?</summary>
    <p>Yes. All scripts are tested and optimized for macOS Darwin with Zsh and Apple Silicon architecture.</p>
  </details>

  <details>
    <summary>How can I contribute new guides?</summary>
    <p>Check out our <code>CONTRIBUTING.md</code> file for style guides and pull request requirements.</p>
  </details>
</section>
```
