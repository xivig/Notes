#!/usr/bin/env bash
# ==============================================================================
# Laravel Architecture & Resource Scaffolder (Laravel 11 / 12 / 13)
# Generates layouts (Admin, Home, Blog), Blade partials, anonymous UI components,
# Models (-mfs), and Admin Resource Controllers cleanly inside a Laravel root.
#
# Usage:
#   ./laravel_artisan_setup.sh [--dry-run]
# ==============================================================================

set -Eeuo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
fi

run_cmd() {
  if [[ "$DRY_RUN" == true ]]; then
    echo "[DRY-RUN] $*"
  else
    "$@"
  fi
}

if [[ "$DRY_RUN" == false && ! -f "artisan" ]]; then
  echo "Error: Run this script from a Laravel project root containing the 'artisan' file." >&2
  echo "Hint: Preview commands without changing files using: $0 --dry-run" >&2
  exit 1
fi

echo "==> Step 1: Creating Class-Based Layouts & Relocating Views into resources/views/layouts/"
run_cmd mkdir -p resources/views/layouts

layouts=("AdminLayout:admin-layout.blade.php:admin.blade.php"
         "HomeLayout:home-layout.blade.php:home.blade.php"
         "BlogLayout:blog-layout.blade.php:blog.blade.php")

for entry in "${layouts[@]}"; do
  IFS=":" read -r class_name src_blade dest_blade <<< "$entry"
  run_cmd php artisan make:component "$class_name"
  if [[ "$DRY_RUN" == true ]]; then
    echo "[DRY-RUN] mv resources/views/components/${src_blade} resources/views/layouts/${dest_blade}"
  elif [[ -f "resources/views/components/${src_blade}" ]]; then
    mv "resources/views/components/${src_blade}" "resources/views/layouts/${dest_blade}"
  fi
done

echo "==> Step 2: Generating Anonymous Form UI Components (--view)"
form_views=("forms.form" "forms.field" "forms.label" "forms.input" "forms.textarea" "forms.select" "forms.option" "forms.error" "forms.button" "alert-message")
for view_comp in "${form_views[@]}"; do
  run_cmd php artisan make:component "$view_comp" --view
done

echo "==> Step 3: Generating Layout Partials for Admin, User, Tutor, Blog & Home"
roles=("admin" "user" "tutor" "blog" "home")
partials=("head" "header" "sidebar" "content" "footer")
for role in "${roles[@]}"; do
  for part in "${partials[@]}"; do
    run_cmd php artisan make:view "${role}.partials.${part}"
  done
done

echo "==> Step 4: Creating Core CMS Models (-mfs) & Admin Resource Controllers"
models=("Admin" "Author" "Gallery" "Category" "Comment" "Post" "Tag")
for model in "${models[@]}"; do
  echo "  -> Model & Migration/Factory/Seeder: $model"
  run_cmd php artisan make:model "$model" -mfs
  echo "  -> Controller: Admin/${model}Controller"
  run_cmd php artisan make:controller "Admin/${model}Controller" --resource --model="$model"
done

echo ""
echo "Scaffolding complete! Next steps:"
echo "  1. Update render() inside app/View/Components/{Admin,Home,Blog}Layout.php to view('layouts.*')."
echo "  2. Edit database/migrations/* schemas before running: php artisan migrate"
