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
├── JavaScript/              # Complete 34-module JavaScript mastery curriculum & Cheat Sheet
├── DOM/                     # Modern Document Object Model (DOM) manual & cheat sheet
├── jQuery/                  # Comprehensive step-by-step tutorial & reference manual
├── Jasmine/                 # Jasmine BDD unit testing setup, matchers, and async specs
├── CreateGithubPages/       # GitHub Pages deployment (Actions, branch deploys, custom domains)
├── Jekyll/                  # Jekyll 4.x configuration for Windows (WSL2), macOS, and Linux
├── Sizzle/                  # Sizzle selector engine history, jQuery 4 removal & modern CSS
├── VagrantSetup/            # Portable dev VMs (Ubuntu 22.04 LTS, Docker CE, synced folders)
├── Markdown/                # Complete GitHub Flavored Markdown (GFM) syntax guide
├── Yaml/                    # YAML data types, multiline block scalars, anchors & aliases
├── rc-meaning.md            # The historical meaning and origin of Unix 'rc' files
└── gitBatchScript.sh        # Modern multi-branch batch commit and push script
```

---

## 📑 Core Topics Overview

### 1. ⚡ [JavaScript Curriculum & Architecture](JavaScript/README.md)
* **Core Documentation**: 📘 **[Comprehensive JavaScript Tutorial](JavaScript/TUTORIAL.md)** (All-in-one 34-module master tutorial), 🚀 **[Developer Cheat Sheet](JavaScript/DEVELOPER-CHEATSHEET.md)** (Array Decision Matrix, Equality Table, Type-Checking Helpers, Top 10 Gotchas).
* **Phase 1: Foundations**: [01. Introduction & IIFE](JavaScript/01.introduction.js), [02. Data Types & Coercion](JavaScript/02.data-types-and-coercion.js), [03. Variables & TDZ](JavaScript/03.variables-and-tdz.js), [04. Loops & Iteration](JavaScript/04.loops-and-iteration.js), [05. Hoisting](JavaScript/05.hoisting.js).
* **Phase 2: Functions & Scopes**: [06. Functions & Parameters](JavaScript/06.functions-and-parameters.js), [07. Scopes & Scope Chain](JavaScript/07.scope-and-scope-chain.js), [08. Closures](JavaScript/08.closures.js), [09. Callbacks](JavaScript/09.callbacks.js), [10. Higher-Order Functions](JavaScript/10.higher-order-functions.js), [11. Call, Apply & Bind](JavaScript/11.call-apply-bind.js).
* **Phase 3: Objects, Prototypes & OOP**: [12. Object Creation](JavaScript/12.object-creation.js), [13. Object Methods & Descriptors](JavaScript/13.object-methods-and-descriptors.js), [14. Constructor Functions](JavaScript/14.constructor-functions.js), [15. Prototypes & Prototype Chain](JavaScript/15.prototypes-and-prototype-chain.js), [16. OOP & Classes](JavaScript/16.oop-and-classes.js), [17. Object Protection (`freeze`, `seal`)](JavaScript/17.object-protection-freeze-seal.js), [18. Generic Object Methods](JavaScript/18.generic-object-methods.md).
* **Phase 4: Arrays & Keyed Collections**: [19. Array Fundamentals](JavaScript/19.arrays-fundamentals.js), [20. Modern Array Methods (ES2023+)](JavaScript/20.array-methods-modern.js), [21. Array-Like Objects](JavaScript/21.array-like-objects.js), [22. Map & Set Collections (ES2024)](JavaScript/22.collections-map-set.js).
* **Phase 5: Asynchronous Architecture**: [23. Event Loop & Microtasks](JavaScript/23.event-loop-and-asynchronous.js), [24. Timers, Debounce & Throttle](JavaScript/24.timers-settimeout-setinterval.js), [25. Promises & Async/Await](JavaScript/25.promises-and-async-await.js), [26. Modern Fetch & Networking](JavaScript/26.fetch-api-and-networking.js), [27. Generators & Iterators](JavaScript/27.generators-and-iterators.js).
* **Phase 6: Modern ES2024+, Web APIs & Architecture**: [28. ES Modules vs CommonJS](JavaScript/28.modules-esm-and-cjs.js), [29. Modern ES Features (ES2020–ES2024)](JavaScript/29.modern-es-features.js), [30. Defensive Error Handling & Causes](JavaScript/30.error-handling-and-causes.js), [31. Regular Expressions Mastery](JavaScript/31.regular-expressions-mastery.js), [32. Browser Storage & Web APIs](JavaScript/32.browser-storage-and-web-apis.js), [33. JSDoc & Zero-Build Type-Checking](JavaScript/33.jsdoc-and-type-checking.js), [34. Design Patterns](JavaScript/34.design-patterns.js).

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

### 10. 💡 [Shell, Git & System Utilities](gitBatchScript.sh)
* [The Meaning and History of Unix 'rc' files (`.bashrc`, `.zshrc`, `.vimrc`)](rc-meaning.md).
* [Untrack files from Git without deleting local copies (`git rm --cached`)](https://github.com/xivig/git-essential-commands/blob/master/RemoveFileFromRepository.sh) (Maintained in [`git-essential-commands`](https://github.com/xivig/git-essential-commands)).
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
