# Web Accessibility (a11y), SEO & HTML Best Practices

A production guide to building accessible, search-engine-optimized, high-performance HTML documents following WCAG 2.2 and Core Web Vitals standards.

---

## 1. Web Accessibility (a11y) & The POUR Principles

Web accessibility ensures that all users—including individuals with visual, auditory, motor, or cognitive disabilities—can perceive, understand, navigate, and interact with the web.

The W3C Web Content Accessibility Guidelines (**WCAG 2.2**) are built around four core principles (**POUR**):

1. **Perceivable:** Information and UI components must be presentable to users in ways they can perceive (e.g., text alternatives for non-text content, minimum 4.5:1 color contrast ratio).
2. **Operable:** Interface components and navigation must be operable via keyboard alone without getting trapped.
3. **Understandable:** Information and operation of the UI must be clear and predictable (e.g., meaningful labels, clear error indicators).
4. **Robust:** Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.

---

## 2. The First Rule of ARIA

**WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications)** provides attributes to supplement HTML semantics.

> [!IMPORTANT]
> **The Golden Rule of ARIA:**
> *"If you can use a native HTML element or attribute with the semantics and behavior you require already built-in, then do so instead of re-purposing an element and adding ARIA."*

### ❌ Bad: Fabricating a fake button with ARIA
```html
<div role="button" tabindex="0" onclick="submitData()">Submit</div>
```
Requires manual keyboard event handlers (`Enter`, `Space`), focus styling, and accessibility roles.

### ✅ Good: Using native HTML5 element
```html
<button type="button" onclick="submitData()">Submit</button>
```
Natively supports keyboard activation, focus, disabled states, and screen reader announcements automatically.

---

## 3. Essential ARIA Attributes When Needed

When creating complex interactive custom widgets, use ARIA strategically:

### 3.1 Invisible Accessible Labels: `aria-label`
Use when an interactive element has no visible text (e.g., icon buttons):
```html
<button type="button" aria-label="Close navigation menu">
  <span aria-hidden="true">&times;</span>
</button>
```

### 3.2 Associating Descriptive Text: `aria-describedby`
Links an input to helper instructions or error messages:
```html
<label for="password">New Password:</label>
<input type="password" id="password" aria-describedby="password-rules password-error">
<small id="password-rules">Must contain at least 8 characters including 1 digit.</small>
<span id="password-error" class="error-msg" role="alert">Password is too weak.</span>
```

### 3.3 Hiding Decorative Elements: `aria-hidden="true"`
Prevents screen readers from announcing decorative icons or glyphs:
```html
<a href="/cart">
  <svg aria-hidden="true" width="20" height="20">...</svg>
  <span>Shopping Cart</span>
</a>
```

### 3.4 Live Regions for Dynamic Updates: `aria-live`
Announces changes to screen reader users without requiring focus shifts:
```html
<!-- Polite: Waits until user is idle before announcing message -->
<div aria-live="polite" class="status-banner">
  Item added to shopping cart.
</div>

<!-- Assertive: Interrupts user immediately (for urgent error alerts) -->
<div aria-live="assertive" role="alert" class="error-banner">
  Database connection lost. Please save your work locally.
</div>
```

---

## 4. Keyboard Navigation & Skip Links

Every interactive feature on your page must be fully usable with the keyboard alone (`Tab`, `Shift + Tab`, `Enter`, `Space`, and Arrow keys).

### 4.1 Skip-to-Content Navigation Link
Users navigating via keyboard or screen reader should not have to tab through dozens of navigation links on every page load before reaching the main article.

Add a **Skip Link** as the first child of `<body>`:

```html
<body>
  <!-- Visually hidden until focused by pressing Tab -->
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header>...</header>

  <main id="main-content">
    <h1>Page Headline</h1>
    ...
  </main>
</body>
```

#### CSS for Skip Link:
```css
.skip-link {
  position: absolute;
  top: -9999px;
  left: 10px;
  background: #7890ff;
  color: #090d18;
  padding: 8px 16px;
  font-weight: 700;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 10px;
}
```

### 4.2 The Rules of `tabindex`
* **`tabindex="0"`:** Inserts an element into the normal sequential keyboard navigation flow.
* **`tabindex="-1"`:** Removes an element from sequential keyboard navigation, but allows programmatic focus via JavaScript (`element.focus()`).
* **`tabindex="1+"` (Positive tabindex):** **Never use positive tabindex!** It overrides natural DOM tab order and creates a confusing, broken user experience.

---

## 5. Technical Search Engine Optimization (SEO)

Search engines read HTML markup to categorize, index, and rank your content.

### 5.1 Critical SEO Meta Tags
```html
<head>
  <title>Terminal &amp; Git Tutorials · Modern DevOps Guides</title>
  <meta name="description" content="Master macOS, Unix, and Git with production-ready tutorials, disaster recovery strategies, and cheat sheets.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://example.com/tutorials/git">
</head>
```

### 5.2 Structured Data (Schema.org with JSON-LD)
Structured data provides Google with explicit search snippets (rich results, author cards, FAQs, and breadcrumbs):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Essential macOS, Unix & Git Tricks",
  "description": "Production tutorials for developers and system administrators.",
  "author": {
    "@type": "Organization",
    "name": "XIVIG Elite"
  },
  "publisher": {
    "@type": "Organization",
    "name": "XIVIG",
    "url": "https://github.com/xivig"
  },
  "datePublished": "2026-11-08",
  "inLanguage": "en"
}
</script>
```

---

## 6. Performance & Core Web Vitals in HTML

Optimize resource loading to improve Google Core Web Vitals (Largest Contentful Paint `LCP`, Cumulative Layout Shift `CLS`, and First Input Delay `FID` / Interaction to Next Paint `INP`):

### 6.1 Resource Hints (`preload`, `preconnect`, `dns-prefetch`)
```html
<!-- 1. Preconnect to external font CDN to perform early DNS + TLS handshake -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- 2. Preload critical web font required for above-the-fold text -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<!-- 3. Preload above-the-fold hero image (Highest Priority LCP) -->
<link rel="preload" href="/images/hero-banner.webp" as="image" type="image/webp">

<!-- 4. DNS Prefetch for third-party analytics -->
<link rel="dns-prefetch" href="https://analytics.example.com">
```

### 6.2 Image Dimension Rule
Always define `width` and `height` (or CSS `aspect-ratio`) on images and videos so the browser reserves the exact space before downloading, eliminating layout shifts (`CLS = 0`).
