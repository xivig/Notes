# How to Create and Deploy GitHub Pages — Modern Guide

GitHub Pages is a static site hosting service that takes HTML, CSS, and JavaScript files directly from a repository on GitHub, optionally runs the files through a build process, and publishes a website.

---

## Table of Contents

1. [Publishing Sources Overview](#1-publishing-sources-overview)
2. [Method A: Deploy from Branch (`main` / `/docs`)](#2-method-a-deploy-from-branch-main--docs)
3. [Method B: Deploy via GitHub Actions (Modern Recommended)](#3-method-b-deploy-via-github-actions-modern-recommended)
4. [Method C: Dedicated `gh-pages` Branch](#4-method-c-dedicated-gh-pages-branch)
5. [The `.nojekyll` Configuration File](#5-the-nojekyll-configuration-file)
6. [Custom Domains and HTTPS](#6-custom-domains-and-https)
7. [Summary & Verification](#7-summary--verification)

---

## 1. Publishing Sources Overview

GitHub Pages supports two repository types:

* **User/Organization Site**:
  * Repository name format: `<username>.github.io` (e.g. `xivig.github.io`).
  * Published URL: `https://<username>.github.io/`.
* **Project Site**:
  * Repository name: any repo name (e.g. `Notes` or `my-project`).
  * Published URL: `https://<username>.github.io/<project-name>/`.

---

## 2. Method A: Deploy from Branch (`main` / `/docs`)

The easiest and most common way to publish a project site without maintaining separate branches:

### Step 1: Initialize Repository and Content
```bash
# Clone or initialize your repository
git clone https://github.com/xivig/my-project.git
cd my-project

# Create a docs folder (standard GitHub Pages export directory)
mkdir docs

# Create your entry point
echo "<!DOCTYPE html><html><head><title>My Project</title></head><body><h1>Welcome to GitHub Pages!</h1></body></html>" > docs/index.html

# Prevent Jekyll processing of files with underscores/node_modules
touch docs/.nojekyll

# Commit and push to main
git add docs/
git commit -m "docs: add GitHub Pages entrypoint"
git push origin main
```

### Step 2: Configure in GitHub Repository Settings
1. Go to your repository on GitHub.
2. Click **Settings** (top tabs).
3. In the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   * **Source**: Select `Deploy from a branch`.
   * **Branch**: Select `main`.
   * **Folder**: Select `/docs` (or `/ (root)` if your `index.html` is in the repository root).
5. Click **Save**.
6. Wait 1–2 minutes. Your site will be live at `https://<username>.github.io/<project-name>/`.

---

## 3. Method B: Deploy via GitHub Actions (Modern Recommended)

For projects using modern build tools (Vite, Gulp, Webpack, React, Vue, Next.js static export), use the native GitHub Pages Actions workflow:

### Step 1: Create Workflow File
Create `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout source
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies & Build
        run: |
          npm ci
          npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist' # Directory containing compiled index.html

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 2: Enable GitHub Actions Source
In **Settings &rarr; Pages &rarr; Source**, select **GitHub Actions**. Pushes to `main` will automatically build and publish your site.

---

## 4. Method C: Dedicated `gh-pages` Branch

If your build script exports files to an orphan branch:

```bash
# 1. Create and switch to gh-pages branch
git checkout --orphan gh-pages

# 2. Clear any staged files
git reset --hard

# 3. Add your built assets
echo "<h1>Hello from gh-pages branch</h1>" > index.html
touch .nojekyll

# 4. Commit and push
git add .
git commit -m "deploy: initial gh-pages release"
git push -u origin gh-pages
```

In **Settings &rarr; Pages**, choose branch `gh-pages` and root `/`.

---

## 5. The `.nojekyll` Configuration File

By default, GitHub Pages processes published files through **Jekyll**. This causes severe issues for modern frontend builds:
* Folders beginning with an underscore (e.g. `_assets/`, `_next/`) are ignored and return **404 Not Found**.
* Single-page app routing rules may be altered.

### The Fix:
Always place an empty file named `.nojekyll` in the root of your published folder:

```bash
touch docs/.nojekyll
# or in dist:
touch dist/.nojekyll
```

---

## 6. Custom Domains and HTTPS

To use a custom domain (e.g. `docs.example.com` or `example.com`):

1. **DNS Configuration**:
   * **Apex Domain (`example.com`)**: Add `A` records pointing to GitHub's IPs:
     * `185.199.108.153`
     * `185.199.109.153`
     * `185.199.110.153`
     * `185.199.111.153`
   * **Subdomain (`docs.example.com`)**: Add a `CNAME` record pointing to `<username>.github.io`.
2. **GitHub Settings**:
   * Under **Settings &rarr; Pages &rarr; Custom domain**, enter your domain.
   * This creates a `CNAME` file in your repository.
3. **Enforce HTTPS**:
   * Check **Enforce HTTPS** once your DNS propagation and TLS certificate issuance finishes (usually within 15 minutes).

---

## 7. Summary & Verification

| Checklist Item | Status Check |
|---|---|
| **Entry Point** | An `index.html` file must exist in the root of the published branch/folder. |
| **Asset Paths** | Use relative paths (`./assets/...`) or root paths matching `/<repo-name>/`. |
| **Bypass Jekyll** | Ensure `.nojekyll` exists if using directories starting with `_`. |
| **Deployment URL** | `https://<username>.github.io/<repo-name>/` |
| **Build Status** | View active status under the **Actions** or **Deployments** tab. |
