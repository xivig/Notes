# Comprehensive HTML5 Tutorials & Web Standards Mastery

> **Interactive Single-Page Guide:** Explore the complete 15-chapter handbook with real-time live code sandbox, Dark/Light themes, and category tracks: [**HTML5_Web_Developer_Handbook.html**](../../HTML5_Web_Developer_Handbook.html).

Welcome to the **HTML5 Tutorials** curriculum within Developer Handbook: Unix, Linux, Git & Shell Scripting.

From foundational document anatomy and metadata to modern semantic layout, responsive media, accessible native forms, and zero-JavaScript interactive widgets, these guides cover every aspect of professional modern web authoring.

---

## Tutorial Roadmap

### 1. [Foundations & Document Architecture](01-html5-foundations-and-document-structure.md)
* What is HTML5 and how browsers parse markup
* Anatomy of an HTML document (`<!DOCTYPE html>`, `html`, `head`, `body`)
* Critical `<head>` setup: `<meta charset="UTF-8">`, viewport scaling, SEO tags
* Open Graph & Twitter Social Sharing Cards
* Script loading strategies: blocking vs `defer` vs `async` vs `type="module"`
* Void elements, attributes (`data-*`), and the DOM tree model

### 2. [Semantic HTML5 & Modern Page Layout](02-semantic-html5-and-page-layout.md)
* The four benefits of semantic markup (Accessibility, SEO, Maintenance, Device support)
* Landmark architecture: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`
* Heading hierarchy rules (`<h1>`–`<h6>`) and document outlines
* Text-level semantics: `<strong>`, `<em>`, `<code>`, `<pre>`, `<time>`, `<mark>`, `<abbr>`
* Lists (`<ul>`, `<ol>`, `<dl>`) and figure captions (`<figure>`, `<figcaption>`)

### 3. [Hyperlinks, Media & Responsive Images](03-links-media-and-responsive-images.md)
* Hyperlinks (`<a>`): absolute, relative, fragment anchors, `mailto:`, `tel:`
* Secure external links: `rel="noopener noreferrer"` to prevent Reverse Tabnabbing
* High-performance `<img>` attributes (`alt`, `width`, `height`, `loading="lazy"`, `decoding="async"`)
* Responsive resolution switching with `srcset` and `sizes`
* Art direction and next-gen format negotiation (AVIF > WebP > JPEG) with `<picture>`
* Native `<video>` and `<audio>` players with accessibility subtitles (`<track>`)
* Secure iframes (`sandbox`, `loading="lazy"`)

### 4. [Forms, Input Types & Client-Side Validation](04-forms-input-types-and-validation.md)
* Form architecture (`action`, `method`, `enctype="multipart/form-data"`)
* Accessible labeling best practices (explicit `for`/`id` linking vs wrapping)
* 14 specialized mobile-optimized input types (`email`, `tel`, `date`, `color`, `file`)
* Controls beyond input: `<textarea>`, `<select>`, `<fieldset>` / `<legend>`, `<datalist>`, `<output>`
* Native client-side validation (`required`, `pattern`, `minlength`, `min`/`max`, `:valid`/`:invalid`)
* Autocomplete standards for credentials and SMS one-time passcode (OTP) autofill

### 5. [Tables, Modals, Disclosures & Templates](05-tables-embedded-content-and-dialogs.md)
* Semantic tabular data structures (`table`, `caption`, `thead`, `tbody`, `tfoot`, `th scope`, `colspan`)
* Native modal dialogs with `<dialog>` (`.showModal()`, `.close()`, `::backdrop`, native `Esc` handling)
* Interactive accordions and disclosures without JavaScript via `<details>` and `<summary>`
* Client-side inert markup with `<template>` and `<slot>`

### 6. [Web Accessibility (a11y), SEO & Best Practices](06-accessibility-seo-and-best-practices.md)
* WCAG 2.2 POUR principles (Perceivable, Operable, Understandable, Robust)
* The First Rule of ARIA and essential ARIA attributes (`aria-label`, `aria-describedby`, `aria-live`)
* Keyboard navigation, tab flow, `tabindex` rules, and skip-to-content links
* Search Engine Optimization (SEO) essentials and Schema.org JSON-LD structured data
* Core Web Vitals optimization: resource hints (`preload`, `preconnect`, `dns-prefetch`), preventing CLS

### 7. [HTML5 Cheat Sheet & Production Code Recipes](07-html5-cheatsheet-and-code-recipes.md)
* Comprehensive HTML5 elements reference table by category
* Production-ready HTML5 starter boilerplate template
* UI code recipes: accessible registration form, responsive product card, zero-JS FAQ accordion
