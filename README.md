# 📚 Xivig Developer Notes & Knowledge Base

[![Topics](https://img.shields.io/badge/Knowledge%20Base-17%20Disciplines-6366f1?style=flat-square)](.)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](JavaScript/)
[![DOM](https://img.shields.io/badge/DOM-W3C%20%2F%20WHATWG-E34F26?style=flat-square&logo=html5&logoColor=white)](DOM/dom-facts.md)
[![jQuery](https://img.shields.io/badge/jQuery-4.0.0-0769AD?style=flat-square&logo=jquery&logoColor=white)](jQuery/README.md)
[![Jasmine](https://img.shields.io/badge/Testing-Jasmine%20BDD-8A4182?style=flat-square&logo=jasmine&logoColor=white)](Jasmine/unitTest-Jasmine-config.md)
[![PHP](https://img.shields.io/badge/PHP-8.0%20--%208.5-777BB4?style=flat-square&logo=php&logoColor=white)](all-in-one-php-tutorial/README.md)
[![Unix/Shell](https://img.shields.io/badge/Unix%20%26%20Shell-Bash%20%7C%20Zsh%20%7C%20HTML5-4EAA25?style=flat-square&logo=gnu-bash&logoColor=white)](developer-handbook-unix-linux-git-shell/README.md)
[![Git](https://img.shields.io/badge/Git-2.40%2B-F05032?style=flat-square&logo=git&logoColor=white)](git-essential-commands/README.md)
[![MySQL](https://img.shields.io/badge/MySQL-8.4%20LTS-4479A1?style=flat-square&logo=mysql&logoColor=white)](mysql-cheatsheet-example/README.md)
[![Markdown](https://img.shields.io/badge/Markdown-GFM%20%2F%20Mermaid-000000?style=flat-square&logo=markdown&logoColor=white)](Markdown/README.md)
[![Homebrew](https://img.shields.io/badge/macOS-Homebrew%20Bootstrap-FBB040?style=flat-square&logo=homebrew&logoColor=black)](homebrew-installer-script/README.md)
[![Sublime Text](https://img.shields.io/badge/Editor-Sublime%20Text-FF9800?style=flat-square&logo=sublimetext&logoColor=white)](sublime-text-editor-trick/README.md)
[![Vagrant](https://img.shields.io/badge/Virtualization-Vagrant%20%26%20Docker-1563FF?style=flat-square&logo=vagrant&logoColor=white)](VagrantSetup/gettingStartedVagrant.md)
[![Jekyll](https://img.shields.io/badge/Static%20Sites-Jekyll%204.x-CC0000?style=flat-square&logo=jekyll&logoColor=white)](Jekyll/Jekyll-config-windows-mac-linux.md)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg?style=flat-square)](LICENSE)

An exhaustive, modular collection of developer notes, architectural cheat sheets, code-first tutorials, automation scripts, and systems operations recipes curated across web, database, and systems engineering disciplines.

---

## 🗂️ Knowledge Base Directory

```text
xivig-all-in-one-notes/
├── JavaScript/                  # Complete 34-module JavaScript curriculum, tutorial & cheat sheet
├── DOM/                         # Modern Document Object Model (DOM) manual & cheat sheet
├── jQuery/                      # Modern jQuery 4.0.0 16-module curriculum, 7 projects & glossary
├── Jasmine/                     # Jasmine BDD unit testing setup, matchers, and async specs
├── CreateGithubPages/           # GitHub Pages deployment (Actions, branch deploys, custom domains)
├── Jekyll/                      # Jekyll 4.x configuration for Windows (WSL2), macOS, and Linux
├── Sizzle/                      # Sizzle selector engine history, jQuery 4 removal & modern CSS
├── VagrantSetup/                # Portable dev VMs (Ubuntu 22.04 LTS, Docker CE, synced folders)
├── Markdown/                    # Complete GitHub Flavored Markdown (GFM) 10-module curriculum & specs
├── Yaml/                        # YAML data types, multiline block scalars, anchors & aliases
├── git-essential-commands/      # Rigorous Git manual, desk cheatsheet, aliases & automation scripts
├── mysql-cheatsheet-example/    # MySQL 8.4 LTS handbook (Stages 0–18), cheatsheet & practice lab
├── homebrew-installer-script/   # Idempotent macOS workstation bootstrap script (homebrew.sh)
├── sublime-text-editor-trick/                # Sublime Text shortcuts, multi-cursor, Emmet, snippets & builds
├── all-in-one-php-tutorial/                  # Modern PHP 8.0–8.5 18-chapter handbook, runnable labs & portal
├── developer-handbook-unix-linux-git-shell/  # Unix/Linux, Git, Shell, macOS, HTML5 handbooks & 25 scripts
└── rc-meaning.md                             # The historical meaning and origin of Unix 'rc' files
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

### 3. 🧩 [jQuery 4.0 Mastery Curriculum & Developer Reference](jQuery/README.md)
* **Master Curriculum Hub**: 📘 **[jQuery 4.0 Complete Curriculum & Guide](jQuery/README.md)** (Modular 16-chapter curriculum, 7 production projects, 12-section pedagogical template).
* **Getting Started & Quickstart**: 🚀 **[Getting Started Guide](jQuery/GETTING-STARTED.md)** (5-minute CDN setup, npm / ES Modules, and Slim build).
* **Learning Roadmap & Tracks**: 🗺️ **[Learning Roadmap](jQuery/LEARNING-ROADMAP.md)** (4 structured progression tracks from beginner to senior architect).
* **Developer Desk Reference**: ⚡ **[jQuery 4.0 Developer Cheatsheet](jQuery/CHEATSHEET.md)** (One-page quick reference, breaking changes matrix, modern replacements).
* **Technical Glossary**: 📖 **[A–Z Glossary](jQuery/GLOSSARY.md)** (Authoritative definitions from AJAX to XSS, Trusted Types, and Layout Thrashing).
* **Core Curriculum Modules**:
  * [01. Fundamentals](jQuery/01-fundamentals/README.md) · [02. Installation](jQuery/02-installation/README.md) · [03. Syntax & Selectors](jQuery/03-syntax-and-selectors/README.md) · [04. DOM Traversal](jQuery/04-dom-traversal/README.md)
  * [05. DOM Manipulation](jQuery/05-dom-manipulation/README.md) · [06. Events](jQuery/06-events/README.md) · [07. CSS & Styling](jQuery/07-css-and-styling/README.md) · [08. Effects & Animation](jQuery/08-effects-and-animation/README.md)
  * [09. Forms & Validation](jQuery/09-forms-and-validation/README.md) · [10. AJAX & API](jQuery/10-ajax-and-api/README.md) · [11. Utilities](jQuery/11-utilities/README.md) · [12. Advanced Architecture](jQuery/12-advanced-jquery/README.md)
  * [13. Plugin Development](jQuery/13-plugin-development/README.md) · [14. Performance & Security](jQuery/14-performance-and-security/README.md) · [15. Modern JS Integration](jQuery/15-modern-javascript-integration/README.md) · [16. jQuery 4 Migration](jQuery/16-jquery-4-migration/README.md)
* **Hands-on Projects**: [01. Navigation](jQuery/projects/01-interactive-navigation/), [02. Data Table](jQuery/projects/02-data-table/), [03. Image Gallery](jQuery/projects/03-image-gallery/), [04. Shopping Cart](jQuery/projects/04-shopping-cart/), [05. Form Builder](jQuery/projects/05-form-builder/), [06. AJAX CRUD](jQuery/projects/06-ajax-crud/), [07. Admin Dashboard](jQuery/projects/07-admin-dashboard/).
* **Mastery Resources**: 🏋️ **[Practice Exercises](jQuery/exercises/README.md)** · 🎯 **[Interview Questions & Answers](jQuery/interview-questions/README.md)** · 📚 **[Reference Archives](jQuery/reference/README.md)**.

### 4. 📦 [GitHub Pages Deployment](CreateGithubPages/How-to-create-github-page.md)
* Standard branch deployment from `main` or `/docs`.
* Automated CI/CD deployment via modern **GitHub Actions** (`actions/deploy-pages@v4`).
* Bypassing Jekyll build conflicts with the `.nojekyll` configuration file.
* Setting up custom apex/sub-domains with automated HTTPS TLS enforcement.

### 5. 🧪 [Jasmine Unit Testing](Jasmine/unitTest-Jasmine-config.md)
* Clean local project setup via `npm install --save-dev jasmine`.
* ES Module (`"type": "module"`) test suite configuration.
* BDD syntax (`describe`, `it`, `expect`).
* Modern asynchronous spec testing with `async` / `await`.
* Complete matchers cheatsheet (`toBe`, `toEqual`, `toContain`, `toThrowError`).
* Method interception and assertions with Spies (`spyOn`).

### 6. 💎 [Jekyll Static Site Generator](Jekyll/Jekyll-config-windows-mac-linux.md)
* **Windows**: Recommended WSL2 workflow and native RubyInstaller with MSYS2 DevKit.
* **macOS**: Modern Homebrew Ruby configuration (avoiding system Ruby permissions).
* **Linux**: Ubuntu/Debian package dependencies (`ruby-full build-essential zlib1g-dev`).
* Bundler workflow (`bundle exec jekyll serve --livereload`).
* Solutions for common issues (missing `webrick` on Ruby 3.x+, Windows encoding).

### 7. 🔍 [Sizzle & Modern Native CSS Selectors](Sizzle/Sizzle.md)
* Historical background: bridging browser differences in the IE6–8 era.
* Evolution of W3C native selector APIs (`querySelector`, `querySelectorAll`).
* Why jQuery 4.0 officially retired Sizzle.
* Modern CSS Selector Level 4 superpowers (`:has()`, `:is()`, `:where()`, `:not()`).

### 8. 🖥️ [Vagrant & Local Virtualization](VagrantSetup/gettingStartedVagrant.md)
* **Guides & Templates**: [Getting Started Guide](VagrantSetup/gettingStartedVagrant.md) · [Up & Running Walkthrough](VagrantSetup/UpandRunningVagrant.md) · [Docker-Provisioned `Vagrantfile`](VagrantSetup/ubuntu-xenial-docker/Vagrantfile).
* Upgrading from legacy boxes (`precise64`, `xenial64`) to modern **Ubuntu 22.04 LTS (`ubuntu/jammy64`)** and **Ubuntu 24.04 LTS (`ubuntu/noble64`)**.
* Automated provisioning with **Docker Engine CE** and Docker Compose.
* Secure port forwarding (`host_ip: "127.0.0.1"`) and host-guest synced folders.
* Complete CLI command reference (`vagrant up`, `vagrant ssh`, `vagrant reload --provision`).

### 9. 📝 [Markdown & GFM Complete Master Curriculum](Markdown/README.md)
* **Master Hub**: [Curriculum Index](Markdown/README.md) & [Cheatsheet Desk Reference](Markdown/CHEATSHEET.md).
* **Specifications**: [GitHub Flavored Markdown (GFM) Spec](Markdown/GFM-SPECIFICATION.md) & [Extended Syntax](Markdown/EXTENDED-SYNTAX.md).
* **Best Practices**: [markdownlint Rules, Prettier, & Style Guides](Markdown/BEST-PRACTICES-AND-LINTING.md).
* **10 Deep-Dive Modules**:
  * [01 - Basic Syntax](Markdown/01-basic-syntax.md) (Headings, paragraphs, line breaks, emphasis)
  * [02 - Lists & Tasklists](Markdown/02-lists-and-tasklists.md) (Loose/tight lists, multi-level nesting, checklists)
  * [03 - Links, Images & Badges](Markdown/03-links-images-badges.md) (Reference links, HTML image sizing, Shields.io badges)
  * [04 - Code & Syntax Highlighting](Markdown/04-code-and-syntax-highlighting.md) (Fenced code blocks, language IDs, Git diffs)
  * [05 - Tables & Alignment](Markdown/05-tables-and-alignment.md) (GFM tables, escaping pipes, cell line breaks, HTML tables)
  * [06 - Callouts, Alerts & Details](Markdown/06-callouts-alerts-details.md) (GitHub Alerts [!NOTE]...[!CAUTION], <details> accordions)
  * [07 - Diagrams with Mermaid.js](Markdown/07-diagrams-mermaid.md) (Flowcharts, Sequence, Class, ER, State, Git Graphs)
  * [08 - Math & LaTeX Typesetting](Markdown/08-math-and-latex.md) (KaTeX inline $, display $$, calculus, matrices)
  * [09 - Frontmatter & Metadata](Markdown/09-frontmatter-and-metadata.md) (YAML, TOML, JSON frontmatter, Zod schema validation)
  * [10 - Security & Safe HTML](Markdown/10-security-and-html.md) (GFM disallowed tags, XSS prevention, DOMPurify & rehype)
* **Single-Page Reference**: [Comprehensive Syntax Manual](Markdown/markdownSyntax.md).

### 10. 📄 [YAML Syntax](Yaml/YAML-syntax.yml)
* Key-value mapping, lists, scalar types (strings, floats, booleans, dates).
* Multiline strings: literal block scalar (`|`) vs folded block scalar (`>`).
* DRY document references with Anchors (`&`) and Aliases (`*`).

### 11. 🌿 [Git Essential Commands & Automation Suite](git-essential-commands/README.md)
* **Core Documentation**: 📘 **[All-in-One Git Developer Manual](git-essential-commands/README.md)** (14-section architectural guide from DAG & `.git` object internals to `zdiff3` conflicts and `git reflog` recovery), ⚡ **[Developer Desk Cheatsheet](git-essential-commands/CHEATSHEET.md)** (80/20 daily workflow & Instant Error Resolver), and 📖 **[Workflow Toolkit Notes](git-essential-commands/README-git.md)**.
* **Modern Porcelain & Workflows**: `git switch`, `git restore`, interactive hunk staging (`git add -p`), Conventional Commits, linear rebasing (`git rebase -i`), `git worktree`, `--force-with-lease`, `git bisect`, and Ed25519 SSH / SSH-signed commits.
* **Included Automation Scripts & Configs**:
  * [`git-aliases.sh`](git-essential-commands/git-aliases.sh) — `--install` / `--preview` / `--uninstall` global Git aliases (`st`, `co`, `cob`, `unstage`, `undo`, `lg`, `wip`) and modern config defaults.
  * [`git-script.sh`](git-essential-commands/git-script.sh) — Interactive staging, whitespace check (`git diff --cached --check`), commit confirmation, and upstream push.
  * [`gitBatchScript.sh`](git-essential-commands/gitBatchScript.sh) — Non-interactive batch `git add -A`, diff check, dynamic branch detection, and push helper.
  * [`RemoveFileFromRepository.sh`](git-essential-commands/RemoveFileFromRepository.sh) — Safely untrack `.DS_Store`, `Thumbs.db`, and cached files (`git rm --cached`) without deleting local copies.
  * [`.gitattributes`](git-essential-commands/.gitattributes) & [`.gitignore`](git-essential-commands/.gitignore) — Cross-platform `LF`/`CRLF` normalization and repository hygiene templates.

### 12. 🐬 [MySQL 8.4 LTS Developer Handbook & SQL Lab](mysql-cheatsheet-example/README.md)
* **Core Documentation**: 📘 **[MySQL Developer Handbook (Stages 0–18)](mysql-cheatsheet-example/README.md)** & 📑 **[Everyday SQL Cheat Sheet](mysql-cheatsheet-example/CHEATSHEET.md)**.
* **Interactive Practice Lab**: 🧪 **[`mysql-developer-lab.sql`](mysql-cheatsheet-example/mysql-developer-lab.sql)** — Ready-to-run normalized `developer_lab` schema (`customers`, `products`, `orders`, `order_items`) and reporting views.
* **Curriculum Highlights**:
  * SQL command groups (`DDL`, `DML`, `DQL`, `DCL`, `TCL`), `InnoDB`, and `utf8mb4` / `DECIMAL(p,s)` type selection rules.
  * CRUD safety checklists, `JOIN`s, `GROUP BY` / `HAVING`, Subqueries, CTEs (`WITH`), and Window Functions (`RANK()`, `DENSE_RANK()`).
  * Constraints, composite index ordering, `EXPLAIN` / `EXPLAIN ANALYZE`, and Views.
  * Transactions (`START TRANSACTION`, `COMMIT`, `ROLLBACK`, `SAVEPOINT`, `SELECT ... FOR UPDATE`), least-privilege users, PHP PDO prepared statements, Laravel query builder/migrations, and `mysqldump --single-transaction` backups.

### 13. 🍺 [macOS Workstation Bootstrap via Homebrew](homebrew-installer-script/README.md)
* **Documentation & Script**: 📘 **[Bootstrap Guide](homebrew-installer-script/README.md)** & ⚙️ **[`homebrew.sh`](homebrew-installer-script/homebrew.sh)**.
* **Defensive, Idempotent Provisioning**: Built with `set -Eeuo pipefail` for macOS 12+ with native Apple Silicon (`/opt/homebrew`) and Intel (`/usr/local`) prefix & `~/.zprofile` `brew shellenv` detection.
* **Curated Stack**: Xcode CLT verification, modern CLI utilities (`git`, `gh`, `ripgrep`, `fd`, `fzf`, `bat`, `eza`, `jq`, `yq`, `tree`, `wget`, `shellcheck`, `shfmt`), Homebrew Zsh + completions/autosuggestions/syntax-highlighting (+ optional Oh My Zsh).
* **Optional Runtimes & Casks**: Interactive prompts or headless CI flags (`INSTALL_LANGUAGES`, `INSTALL_CASKS`, `SET_DEFAULT_SHELL`, `INSTALL_OH_MY_ZSH`) for Node.js, Python 3, Go, PHP, VS Code, iTerm2, Docker Desktop, Postman, DBeaver, and Rectangle.

### 14. ✨ [Sublime Text Editor Tricks & Developer Handbook](sublime-text-editor-trick/README.md)
* **18-Section Reference**: 📘 **[Sublime Text Developer Handbook](sublime-text-editor-trick/README.md)** with cross-platform Windows/Linux and macOS keymaps.
* **Editing Mastery**: Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`), Goto Anything (`Ctrl+P`), multi-cursor (`Ctrl+D`), Split into Lines (`Ctrl+Shift+L`), column selection, regex capture-group replacements, sorting, and case conversion.
* **HTML, Snippets & Customization**: Emmet wrapping/abbreviations, custom `.sublime-snippet` templates (HTML5, form fields, PHP functions, div wrappers), user settings & key bindings, Package Control, `.sublime-project` workspaces, custom build systems (Python, PHP, Node.js), and macros.

### 15. 💡 [Unix & Linux Shell Configuration (`rc` Files)](rc-meaning.md)
* **[The Meaning and History of Unix `rc` Files](rc-meaning.md)**: Historical origin from MIT CTSS `"runcom"` (Run Commands), everyday dotfiles (`.bashrc`, `.zshrc`, `.vimrc`, `.npmrc`, `.curlrc`), why hidden dot-files exist, and Login (`~/.bash_profile`, `~/.zprofile`) vs Non-Login Interactive (`~/.bashrc`, `~/.zshrc`) shell execution order.

### 16. 🐘 [Modern PHP 8.x All-in-One Developer Handbook](all-in-one-php-tutorial/README.md)
* **Master Hub & Resources**: 📘 **[18-Chapter PHP Handbook](all-in-one-php-tutorial/README.md)** · 🌐 **Interactive Handbook Portal ([Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/all-in-one-php-tutorial/index.html) · [Local](all-in-one-php-tutorial/index.html))** · ⚡ **[Developer Cheatsheet](all-in-one-php-tutorial/CHEATSHEET.md)** · 📖 **[A–Z Glossary](all-in-one-php-tutorial/GLOSSARY.md)** · 📦 **[PSR-4 `composer.json`](all-in-one-php-tutorial/composer.json)** · 🧪 **[Lab Verification Runner](all-in-one-php-tutorial/run-all-examples.php)**.
* **Track 1 — PHP Core Foundations**: [01. Foundations & Tooling](all-in-one-php-tutorial/chapters/01-php-foundations-and-tooling/README.md) · [02. Types & Strict Mode](all-in-one-php-tutorial/chapters/02-types-variables-and-strict-mode/README.md) · [03. Operators & Control Flow](all-in-one-php-tutorial/chapters/03-operators-and-control-flow/README.md) · [04. Functions, Closures & Callables](all-in-one-php-tutorial/chapters/04-functions-closures-and-callables/README.md) · [05. Arrays & Pipelines](all-in-one-php-tutorial/chapters/05-arrays-and-functional-pipelines/README.md) · [06. Strings, Regex & DateTimeImmutable](all-in-one-php-tutorial/chapters/06-strings-regex-and-datetime/README.md).
* **Track 2 — Object-Oriented Mastery**: [07. OOP Foundations & Inheritance](all-in-one-php-tutorial/chapters/07-oop-foundations-and-inheritance/README.md) · [08. Magic Methods & Lifecycle](all-in-one-php-tutorial/chapters/08-magic-methods-and-object-lifecycle/README.md) · [09. Abstraction, Polymorphism & Traits](all-in-one-php-tutorial/chapters/09-abstraction-polymorphism-and-traits/README.md) · [10. Encapsulation, Readonly & LSB](all-in-one-php-tutorial/chapters/10-encapsulation-immutability-and-lsb/README.md) · [11. Namespaces, PSR-4 & Composer](all-in-one-php-tutorial/chapters/11-namespaces-psr4-and-composer/README.md).
* **Track 3 — Modern PHP 8.0–8.5 Architecture**: [12. Type System, Promotion & Enums](all-in-one-php-tutorial/chapters/12-modern-php-8-type-system-and-enums/README.md) · [13. Attributes, Property Hooks (8.4) & Pipe (8.5)](all-in-one-php-tutorial/chapters/13-modern-php-8-syntax-attributes-and-hooks/README.md) · [14. Error Handling, Exceptions & Fibers](all-in-one-php-tutorial/chapters/14-error-handling-exceptions-and-fibers/README.md).
* **Track 4 — Applied Security, PDO & Production Architecture**: [15. Files, JSON, HTTP/cURL & CLI](all-in-one-php-tutorial/chapters/15-files-json-http-and-cli/README.md) · [16. Web Security, Passwords & CSRF](all-in-one-php-tutorial/chapters/16-web-security-sessions-and-validation/README.md) · [17. PDO & Transactions](all-in-one-php-tutorial/chapters/17-databases-pdo-and-transactions/README.md) · [18. Testing, Performance & Architecture](all-in-one-php-tutorial/chapters/18-testing-performance-and-architecture/README.md).

### 17. 🐧 [Developer Handbook: Unix, Linux, Git, Shell, macOS & HTML5](developer-handbook-unix-linux-git-shell/README.md)
* **Master Hub & Interactive Portal**: 📘 **[Handbook Index](developer-handbook-unix-linux-git-shell/README.md)** · 🌐 **Unified Web Documentation Portal ([Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/documentation/index.html) · [Local](developer-handbook-unix-linux-git-shell/documentation/index.html))** · 📚 **[Modular Docs Hub (`docs/`)](developer-handbook-unix-linux-git-shell/docs/README.md)**.
* **Interactive Single-Page Handbooks**:
  * 🖥️ **Linux & Unix Shell Developer Handbook (39 Ch)**: [Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/Linux_Unix_Shell_Developer_Handbook.html) · [Local](developer-handbook-unix-linux-git-shell/Linux_Unix_Shell_Developer_Handbook.html)
  * 🌿 **Git & GitHub Complete Tutorial (22 Ch)**: [Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/Git_GitHub_Complete_Tutorial.html) · [Local](developer-handbook-unix-linux-git-shell/Git_GitHub_Complete_Tutorial.html)
  * 🌐 **HTML5 & Modern Web Architecture Handbook (15 Ch)**: [Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/developer-handbook-unix-linux-git-shell/HTML5_Web_Developer_Handbook.html) · [Local](developer-handbook-unix-linux-git-shell/HTML5_Web_Developer_Handbook.html)
* **6 Modular Markdown Tracks (`docs/`)**:
  * [Track 1: Unix & Linux Systems (6 Ch)](developer-handbook-unix-linux-git-shell/docs/unix-linux/README.md) · [Track 2: Git Version Control (5 Ch)](developer-handbook-unix-linux-git-shell/docs/git/README.md) · [Track 3: Shell Scripting Masterclass](developer-handbook-unix-linux-git-shell/docs/shell-scripting/README.md)
  * [Track 4: HTML5 & WCAG 2.2 Standards (7 Ch)](developer-handbook-unix-linux-git-shell/docs/html/README.md) · [Track 5: macOS Darwin Setup (6 Ch)](developer-handbook-unix-linux-git-shell/docs/macos/README.md) · [Track 6: Utility Scripts Architecture](developer-handbook-unix-linux-git-shell/docs/scripts/README.md)
* **Production Shell Automation Suite**: 🛠️ **[25 Production Shell Scripts (`shell-scripts-repo/`)](developer-handbook-unix-linux-git-shell/shell-scripts-repo/README.md)** · 🧪 **[Automated QA Test Runner (`test_all_scripts.sh`)](developer-handbook-unix-linux-git-shell/shell-scripts-repo/test_all_scripts.sh)**.

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

### Daily Git, MySQL, macOS Bootstrap, PHP & Shell Labs
```bash
# Inspect compact Git status, diff staged changes, or install aliases
git status -sb && git diff --staged
./git-essential-commands/git-aliases.sh --preview

# Load the MySQL 8.4 practice lab schema into a disposable local server
mysql -h 127.0.0.1 -u root -p < mysql-cheatsheet-example/mysql-developer-lab.sql

# Non-interactive macOS workstation bootstrap
INSTALL_CASKS=yes INSTALL_LANGUAGES=yes ./homebrew-installer-script/homebrew.sh

# Run and verify all compatible Modern PHP 8.x handbook labs
php all-in-one-php-tutorial/run-all-examples.php

# Run the shell scripts QA suite (Unix/Linux/macOS/Git Bash)
bash developer-handbook-unix-linux-git-shell/shell-scripts-repo/test_all_scripts.sh
```

---

## 🤝 License

Distributed under the **[GNU General Public License v3.0](LICENSE)** (with imported companion repositories—`git-essential-commands`, `homebrew-installer-script`, `mysql-cheatsheet-example`, `sublime-text-editor-trick`, `all-in-one-php-tutorial`, and `developer-handbook-unix-linux-git-shell`—retaining their respective **MIT Licenses**). Free for personal, educational, and open-source software development.
