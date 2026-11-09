# Jekyll Installation & Configuration Guide (Windows, macOS, Linux)

> **Jekyll** is a static site generator written in Ruby that powers GitHub Pages. It takes raw text (Markdown, Textile, Liquid) and renders ready-to-publish static HTML/CSS websites.

---

## Table of Contents

1. [Windows Installation](#1-windows-installation)
   - [Method A: Windows Subsystem for Linux (WSL2 - Recommended)](#method-a-windows-subsystem-for-linux-wsl2---recommended)
   - [Method B: Native RubyInstaller with DevKit](#method-b-native-rubyinstaller-with-devkit)
2. [macOS Installation (Homebrew)](#2-macos-installation-homebrew)
3. [Linux / Ubuntu Installation](#3-linux--ubuntu-installation)
4. [Creating & Serving a New Jekyll Site](#4-creating--serving-a-new-jekyll-site)
5. [Important Tips for Ruby 3.0+ & Modern Jekyll](#5-important-tips-for-ruby-30--modern-jekyll)

---

## 1. Windows Installation

### Method A: Windows Subsystem for Linux (WSL2 - Recommended)
The official Jekyll team recommends running Jekyll on Windows via **WSL2** to prevent native gem compilation errors:

```bash
# In Windows PowerShell (Run as Administrator):
wsl --install

# Once Ubuntu terminal opens:
sudo apt update
sudo apt install -y ruby-full build-essential zlib1g-dev

# Configure gem environment in ~/.bashrc:
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install Jekyll & Bundler:
gem install jekyll bundler
```

---

### Method B: Native RubyInstaller with DevKit
If you prefer running natively on Windows:

1. Download **Ruby+Devkit** (Ruby 3.2.x or 3.3.x x64) from [rubyinstaller.org](https://rubyinstaller.org/downloads/).
2. Run the installer. On the final screen, check **Run 'ridk install'** to install MSYS2 development headers.
3. Open a new Command Prompt or PowerShell:
   ```cmd
   ruby -v
   gem install jekyll bundler
   ```
4. On Windows, ensure UTF-8 encoding is active:
   ```cmd
   chcp 65001
   ```

---

## 2. macOS Installation (Homebrew)

Apple removed developer headers from macOS system Ruby. **Never install gems using `sudo gem install` against system Ruby.** Use Homebrew:

```bash
# 1. Install modern Ruby via Homebrew
brew install ruby

# 2. Add Homebrew Ruby to your PATH in ~/.zprofile:
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zprofile
# For Intel Macs:
# echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zprofile

source ~/.zprofile
ruby -v

# 3. Install Jekyll and Bundler
gem install jekyll bundler
```

---

## 3. Linux / Ubuntu Installation

```bash
# 1. Install Ruby and development headers
sudo apt update
sudo apt install -y ruby-full build-essential zlib1g-dev

# 2. Configure user gem path (avoids needing sudo for gems)
echo '# Ruby Gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 3. Install Jekyll and Bundler
gem install jekyll bundler
```

---

## 4. Creating & Serving a New Jekyll Site

```bash
# 1. Generate a new scaffolded site
jekyll new my-blog
cd my-blog

# 2. Install site bundle dependencies
bundle install

# 3. Start the local development server with LiveReload:
bundle exec jekyll serve --livereload
```

Open your browser to: **`http://127.0.0.1:4000/`**. Changes made to `.md` and `.html` files will refresh automatically.

---

## 5. Important Tips for Ruby 3.0+ & Modern Jekyll

### 1. Missing `webrick` on Ruby 3.x+
Ruby 3.0 removed `webrick` from the standard library. If `jekyll serve` fails with:
`LoadError: cannot load such file -- webrick`

Add `webrick` to your project's `Gemfile`:
```bash
bundle add webrick
```

### 2. LiveReload on Windows/WSL
When running in WSL or mapped network drives, if file change detection fails, add `--force_polling`:
```bash
bundle exec jekyll serve --livereload --force_polling
```

### 3. Production Build
To generate static production HTML files into `_site/`:
```bash
JEKYLL_ENV=production bundle exec jekyll build
```
*(Deploy the generated `_site/` directory to GitHub Pages, Netlify, or Apache/Nginx).*
