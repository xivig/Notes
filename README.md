# 📚 Xivig Developer Notes & Knowledge Base

[![Topics](https://img.shields.io/badge/Knowledge%20Base-11%20Disciplines-6366f1?style=flat-square)](.)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](JavaScript/)
[![DOM](https://img.shields.io/badge/DOM-W3C%20%2F%20WHATWG-E34F26?style=flat-square&logo=html5&logoColor=white)](DOM/dom-facts.md)
[![Jasmine](https://img.shields.io/badge/Testing-Jasmine%20BDD-8A4182?style=flat-square&logo=jasmine&logoColor=white)](Jasmine/unitTest-Jasmine-config.md)
[![Vagrant](https://img.shields.io/badge/Virtualization-Vagrant%20%26%20Docker-1563FF?style=flat-square&logo=vagrant&logoColor=white)](VagrantSetup/gettingStartedVagrant.md)
[![Jekyll](https://img.shields.io/badge/Static%20Sites-Jekyll%204.x-CC0000?style=flat-square&logo=jekyll&logoColor=white)](Jekyll/Jekyll-config-windows-mac-linux.md)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg?style=flat-square)](LICENSE)

An exhaustive, modular collection of developer notes, architectural cheat sheets, code-first tutorials, and systems operations recipes curated across web engineering disciplines.

---

## 🗂️ Knowledge Base Directory

```text
Notes/
├── JavaScript/              # Complete 27-module JavaScript mastery curriculum
├── DOM/                     # Modern Document Object Model (DOM) manual & cheat sheet
├── jQuery/                  # Comprehensive reference from 'Pro jQuery' by Adam Freeman
├── Jasmine/                 # Jasmine BDD unit testing setup, matchers, and async specs
├── CreateGithubPages/       # GitHub Pages deployment (Actions, branch deploys, custom domains)
├── Jekyll/                  # Jekyll 4.x configuration for Windows (WSL2), macOS, and Linux
├── Sizzle/                  # Sizzle selector engine history, jQuery 4 removal & modern CSS
├── VagrantSetup/            # Portable dev VMs (Ubuntu 22.04 LTS, Docker CE, synced folders)
├── Markdown/                # Complete GitHub Flavored Markdown (GFM) syntax guide
├── Yaml/                    # YAML data types, multiline block scalars, anchors & aliases
├── trick/                   # Git cache cleaning and untracking utilities
├── rc-meaning.md            # The historical meaning and origin of Unix 'rc' files
└── gitBatchScript.sh        # Modern multi-branch batch commit and push script
```

---

## 📑 Core Topics Overview

### 1. ⚡ [JavaScript Curriculum & Architecture](JavaScript/README.md)
* **Foundations**: [1. Introduction & IIFE](JavaScript/1.introduction.js), [2. Intro Notes](JavaScript/2.intro-notes.js), [3. Variables & TDZ](JavaScript/3.variable.js), [4. Loops](JavaScript/4.loop.js).
* **Execution & Scopes**: [6. Hoisting](JavaScript/6.hoisting.js), [7a. Scope Chains](JavaScript/7a.scope.js), [7b. Closures](JavaScript/7b.closure.js).
* **Functions & Methods**: [7. Functions & Rest Parameters](JavaScript/7.functions.js), [7c. Constructors](JavaScript/7c.constructor.js), [7d. Call, Apply & Bind](JavaScript/7d.call-apply-bind.js), [7f. Higher-Order Functions](JavaScript/7f.higher-order-function.js), [7g. Callbacks](JavaScript/7g.callbacks.js).
* **Objects & Prototypes**: [5. Object Creation Patterns](JavaScript/5.objectCreation.js), [7e. Prototype Chain](JavaScript/7e.prototype.js), [Object Protection (`seal`, `freeze`)](JavaScript/ProtectingObjectsModification.js), [Generic Object Methods](JavaScript/Generic-object-meyhods.md), [OOP Principles](JavaScript/oop-javascript.js).
* **Arrays & Collections**: [8. Arrays](JavaScript/8.array.js), [8a. Modern Array Methods](JavaScript/8a.array-methods.js), [8b. Array-like Objects](JavaScript/8b.array-object.js).
* **Asynchronous Architecture**: [9. Event Loop](JavaScript/9.asynchronous.js), [9a. Timers](JavaScript/9a.setTimeout.js), [9b. Promises & Async/Await](JavaScript/9b.promise.js), [9c. Modern Fetch API & Networking](JavaScript/9c.ajax.js), [Generators & Iterators](JavaScript/generator.js).
* **Design Patterns**: [Classic Gang-of-Four & Modern JS Design Patterns](JavaScript/design-pattern.js).

### 2. 🌐 [Document Object Model (DOM)](DOM/dom-facts.md)
* Tree nodes vs Element nodes.
* Modern queries (`querySelector`, `querySelectorAll`, `closest`, `matches`).
* Fast element creation and insertion (`append`, `prepend`, `before`, `after`, `insertAdjacentHTML`).
* Manipulating attributes, classes (`classList`), inline styles, and HTML5 `dataset`.
* Modern event handling (`addEventListener`, `AbortController` cancellation, Event Delegation).
* High-performance DOM operations (`DocumentFragment`, `IntersectionObserver`, `MutationObserver`).

### 3. 📦 [GitHub Pages Deployment](CreateGithubPages/How-to-create-github-page.md)
* Standard branch deployment from `main` or `/docs`.
* Automated CI/CD deployment via modern **GitHub Actions** (`actions/deploy-pages@v4`).
* Bypassing Jekyll build conflicts with the `.nojekyll` configuration file.
* Setting up custom apex/sub-domains with automated HTTPS TLS enforcement.

### 4. 🧪 [Jasmine Unit Testing](Jasmine/unitTest-Jasmine-config.md)
* Clean local project setup via `npm install --save-dev jasmine`.
* ES Module (`"type": "module"`) test suite configuration.
* BDD syntax (`describe`, `it`, `expect`).
* Modern asynchronous spec testing with `async` / `await`.
* Complete matchers cheatsheet (`toBe`, `toEqual`, `toContain`, `toThrowError`).
* Method interception and assertions with Spies (`spyOn`).

### 5. 💎 [Jekyll Static Site Generator](Jekyll/Jekyll-config-windows-mac-linux.md)
* **Windows**: Recommended WSL2 workflow and native RubyInstaller with MSYS2 DevKit.
* **macOS**: Modern Homebrew Ruby configuration (avoiding system Ruby permissions).
* **Linux**: Ubuntu/Debian package dependencies (`ruby-full build-essential zlib1g-dev`).
* Bundler workflow (`bundle exec jekyll serve --livereload`).
* Solutions for common issues (missing `webrick` on Ruby 3.x+, Windows encoding).

### 6. 🔍 [Sizzle & Modern Native CSS Selectors](Sizzle/Sizzle.md)
* Historical background: bridging browser differences in the IE6–8 era.
* Evolution of W3C native selector APIs (`querySelector`, `querySelectorAll`).
* Why jQuery 4.0 officially retired Sizzle.
* Modern CSS Selector Level 4 superpowers (`:has()`, `:is()`, `:where()`, `:not()`).

### 7. 🖥️ [Vagrant & Local Virtualization](VagrantSetup/gettingStartedVagrant.md)
* Upgrading from legacy boxes (`precise64`, `xenial64`) to modern **Ubuntu 22.04 LTS (`ubuntu/jammy64`)** and **Ubuntu 24.04 LTS (`ubuntu/noble64`)**.
* Automated provisioning with **Docker Engine CE** and Docker Compose.
* Secure port forwarding (`host_ip: "127.0.0.1"`) and host-guest synced folders.
* Complete CLI command reference (`vagrant up`, `vagrant ssh`, `vagrant reload --provision`).

### 8. 📝 [Markdown Formatting](Markdown/markdownSyntax.md)
* GitHub Flavored Markdown (GFM) specification.
* Headings, emphasis, blockquotes, lists, checklists, tables, code fences, and autolinks.

### 9. 📄 [YAML Syntax](Yaml/YAML-syntax.yml)
* Key-value mapping, lists, scalar types (strings, floats, booleans, dates).
* Multiline strings: literal block scalar (`|`) vs folded block scalar (`>`).
* DRY document references with Anchors (`&`) and Aliases (`*`).

### 10. 💡 [Shell, Git & System Utilities](trick/RemoveFileFromRepository.sh)
* [The Meaning and History of Unix 'rc' files (`.bashrc`, `.zshrc`, `.vimrc`)](rc-meaning.md).
* [Untrack files from Git without deleting local copies (`git rm --cached`)](trick/RemoveFileFromRepository.sh).
* [Automated Git batch staging, commit, and push script](gitBatchScript.sh).

---

## 🚀 Quick Reference Snippets

### Modern JavaScript (ES2024+)
```javascript
// Optional Chaining & Nullish Coalescing
const userStreet = user?.address?.street ?? 'Default Address';

// Modern Non-Mutating Array Sort (ES2023+)
const numbers = [5, 2, 8, 1, 4];
const sorted = numbers.toSorted((a, b) => a - b); // [1, 2, 4, 5, 8]
```

### Modern DOM Query & Event Delegation
```javascript
// Clean event delegation
document.querySelector('#todo-list').addEventListener('click', (e) => {
  const deleteBtn = e.target.closest('.btn-delete');
  if (deleteBtn) {
    deleteBtn.closest('li').remove();
  }
});
```

---

## 🤝 License

Distributed under the **[GNU General Public License v3.0](LICENSE)**. Free for personal, educational, and open-source software development.
