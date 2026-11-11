#!/usr/bin/env bash
# ==============================================================================
# Script Name: scaffold_website.sh (Enhanced from websiteTemplate.sh)
# Description: Scaffolds clean HTML5/CSS/JS project structure with Git repo
# ==============================================================================
set -euo pipefail

PROJECT_NAME="${1:-my-web-project}"
TARGET_DIR="./$PROJECT_NAME"

if [[ -d "$TARGET_DIR" ]]; then
    echo "Error: Directory '$TARGET_DIR' already exists." >&2
    exit 1
fi

echo "Scaffolding modern web project at '$TARGET_DIR'..."

# 1. Create clean directory tree
mkdir -p "$TARGET_DIR"/{css,js,assets/images,docs}

# 2. Inject HTML5 boilerplate
cat <<EOF > "$TARGET_DIR/index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$PROJECT_NAME</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header>
    <h1>$PROJECT_NAME</h1>
    <p>Modern web scaffold generated via Bash automation.</p>
  </header>
  <main>
    <section>
      <h2>Welcome</h2>
      <p>Project initialized with structured assets and clean modular styles.</p>
    </section>
  </main>
  <footer>
    <p>&copy; $(date +%Y) $PROJECT_NAME</p>
  </footer>
  <script type="module" src="js/app.js"></script>
</body>
</html>
EOF

# 3. Inject modern CSS template
cat <<'EOF' > "$TARGET_DIR/css/style.css"
:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --bg: #0f172a;
  --surface: #1e293b;
  --text: #f8fafc;
  --accent: #3b82f6;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: var(--font-sans);
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  padding: 2rem;
}
header, main, footer { max-width: 800px; margin: 0 auto 2rem; }
h1 { font-size: 2.2rem; color: var(--accent); margin-bottom: 0.5rem; }
EOF

# 4. Inject JavaScript module boilerplate
cat <<'EOF' > "$TARGET_DIR/js/app.js"
console.log("Application initialized successfully.");
EOF

# 5. Inject robots.txt and sitemap.xml
cat <<'EOF' > "$TARGET_DIR/robots.txt"
User-agent: *
Allow: /
Sitemap: /sitemap.xml
EOF

cat <<EOF > "$TARGET_DIR/sitemap.xml"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>$(date +%F)</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
EOF

# 6. Inject .gitignore
cat <<'EOF' > "$TARGET_DIR/.gitignore"
.DS_Store
Thumbs.db
node_modules/
dist/
*.log
.env
EOF

# 7. Initialize Git repository
cd "$TARGET_DIR"
git init -q
git add .
git commit -q -m "chore: initial project scaffold"

echo "Project scaffolded successfully in '$TARGET_DIR'!"
