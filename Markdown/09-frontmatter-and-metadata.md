# Module 09: Frontmatter and Document Metadata

> **Scope**: Managing document metadata across static site generators (SSGs) and content pipelines using YAML, TOML, and JSON frontmatter blocks, programmatic extraction, and TypeScript schema validation.

---

## 1. What is Frontmatter?

Frontmatter is a block of metadata placed at the absolute beginning of a Markdown file (before line 1 content). It allows static site generators (Jekyll, Astro, Hugo, Next.js, VitePress, Docusaurus) to parse page properties—such as titles, publishing dates, SEO descriptions, authors, tags, and layout templates—without polluting the body text.

---

## 2. Frontmatter Formats

### 1. YAML Frontmatter (Most Common Standard)
Enclosed by three hyphens `---` on the opening and closing lines:

```markdown
---
title: "Building Microservices with Go and gRPC"
description: "A comprehensive hands-on guide to implementing performant gRPC services."
date: 2026-11-09
author: "Alex Morgan"
tags:
  - go
  - grpc
  - microservices
draft: false
canonical_url: "https://example.com/blog/grpc-guide"
---

# Building Microservices with Go and gRPC
Content starts here...
```

### 2. TOML Frontmatter (Common in Hugo)
Enclosed by three plus signs `+++`:

```markdown
+++
title = "Modern CSS Layouts"
date = 2026-11-09T14:30:00Z
draft = false
tags = ["css", "grid", "flexbox"]

[author]
name = "Sarah Connor"
github = "sconnor"
+++
```

### 3. JSON Frontmatter
Enclosed by curly braces `{` and `}`:

```markdown
{
  "title": "Introduction to WebAssembly",
  "publishDate": "2026-11-09",
  "categories": ["Performance", "Browsers"],
  "sidebar_position": 3
}
```

---

## 3. Standard Metadata Schema

While custom fields can be defined freely, standard content pipelines typically conform to these common keys:

| Field | Type | Description |
| :---- | :--- | :---------- |
| `title` | `string` | The page title (used in `<title>`, Open Graph, and breadcrumbs). |
| `description` | `string` | A 1-2 sentence summary for meta tags and search snippets. |
| `date` | `YYYY-MM-DD` | Publication timestamp. |
| `updatedAt` | `YYYY-MM-DD` | Date of last major revision. |
| `author` | `string \| object` | Name or object with name, avatar, and social handle. |
| `tags` | `array<string>` | Keywords for filtering and tag archive generation. |
| `categories` | `array<string>` | Hierarchical classification. |
| `slug` | `string` | Custom URL route segment overriding the file name. |
| `draft` | `boolean` | When `true`, excluded from production builds. |
| `layout` | `string` | The parent template or layout component to wrap the content. |
| `image` | `string` | Open Graph image URL for social media cards. |

---

## 4. Programmatic Parsing with Node.js (`gray-matter`)

In JavaScript and TypeScript build scripts, frontmatter is commonly parsed using the industry-standard [`gray-matter`](https://github.com/jonschlinkert/gray-matter) package:

```typescript
import matter from "gray-matter";
import fs from "node:fs";

// Read the markdown file
const fileContent = fs.readFileSync("post.md", "utf-8");

// Parse frontmatter and body
const { data, content } = matter(fileContent);

console.log("Post Title:", data.title);
console.log("Tags:", data.tags);
console.log("Raw Markdown Content:\n", content);
```

---

## 5. Type-Safe Schema Validation with Zod (Astro Content Collections)

Modern frameworks validate frontmatter schemas at build time so broken metadata never reaches production:

```typescript
// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().max(70, "Keep title under 70 chars for SEO"),
    description: z.string().min(20).max(160),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default("Engineering Team"),
    tags: z.array(z.string()).nonempty("Specify at least one tag"),
    draft: z.boolean().default(false),
    heroImage: z.string().url().optional()
  }),
});

export const collections = {
  blog: blogCollection,
};
```

---

## 6. Best Practices

1. **Keep it at the top**: Frontmatter must be the first thing in the file without any blank lines above the initial `---`.
2. **Quote strings containing colons**: In YAML, colons denote key-value pairs. If your title contains a colon (e.g., `"Guide: How to Use Markdown"`), wrap the title string in double quotes to prevent syntax errors.
3. **Use ISO 8601 dates**: Always format dates as `YYYY-MM-DD` (or `YYYY-MM-DDTHH:mm:ssZ`) for reliable cross-engine sorting.
