#!/usr/bin/env bash
#
# macOS Developer Workstation Bootstrap
# Automated setup for Homebrew, CLI utilities, development runtimes, and desktop applications.
#
# Usage:
#   chmod +x homebrew.sh
#   ./homebrew.sh
#
# Non-interactive automated execution:
#   INSTALL_CASKS=yes INSTALL_LANGUAGES=yes SET_DEFAULT_SHELL=yes INSTALL_OH_MY_ZSH=yes ./homebrew.sh
#
# Compatibility:
#   macOS 12+ (Monterey, Ventura, Sonoma, Sequoia) on Apple Silicon (M1/M2/M3/M4) and Intel x86_64.
#

set -Eeuo pipefail

readonly SCRIPT_NAME="${0##*/}"
readonly LOG_PREFIX="[mac-dev-setup]"

log()  { printf '%s %s\n' "$LOG_PREFIX" "$*"; }
warn() { printf '%s WARNING: %s\n' "$LOG_PREFIX" "$*" >&2; }
die()  { printf '%s ERROR: %s\n' "$LOG_PREFIX" "$*" >&2; exit 1; }

has() { command -v "$1" >/dev/null 2>&1; }

ask_yes_no() {
  local prompt="$1"
  local default="${2:-N}"
  local answer

  if [[ "${default}" == "Y" ]]; then
    prompt="${prompt} [Y/n] "
  else
    prompt="${prompt} [y/N] "
  fi

  if [[ ! -t 0 ]]; then
    [[ "${default}" == "Y" ]]
    return
  fi

  read -r -p "$prompt" answer
  answer="${answer:-$default}"
  case "$answer" in
    [Yy]|[Yy][Ee][Ss]) return 0 ;;
    *) return 1 ;;
  esac
}

require_macos() {
  [[ "$(uname -s)" == "Darwin" ]] || die "macOS is required. This script is tailored for Darwin systems."
  has xcode-select || die "xcode-select is missing. Install Xcode Command Line Tools first."
}

install_command_line_tools_if_needed() {
  if ! xcode-select -p >/dev/null 2>&1; then
    log "Requesting Xcode Command Line Tools installation..."
    xcode-select --install || true
    die "Complete the Xcode Command Line Tools installation in the system dialog, then run this script again."
  fi
}

bootstrap_homebrew() {
  if has brew; then
    log "Homebrew already installed: $(command -v brew)"
    return
  fi

  log "Installing Homebrew via official installer..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

  # Source Homebrew environment for this process
  if [[ -x /opt/homebrew/bin/brew ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [[ -x /usr/local/bin/brew ]]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi

  has brew || die "Homebrew installed but 'brew' command is not on PATH. Please reload your terminal."
}

configure_brew_path() {
  local brew_bin
  brew_bin="$(command -v brew)"
  local brew_prefix
  brew_prefix="$(brew --prefix)"
  eval "$("$brew_bin" shellenv)"
  log "Homebrew prefix verified: $brew_prefix"

  # Ensure ~/.zprofile persists brew shellenv on modern macOS
  local zprofile="${HOME}/.zprofile"
  local shellenv_cmd="eval \"\$(${brew_bin} shellenv)\""

  if [[ ! -f "$zprofile" ]] || ! grep -Fq "shellenv" "$zprofile" 2>/dev/null; then
    log "Persisting Homebrew shellenv in $zprofile..."
    printf '\n# Homebrew environment\n%s\n' "$shellenv_cmd" >> "$zprofile"
  fi
}

install_formula() {
  local package="$1"
  if brew list --formula --versions "$package" >/dev/null 2>&1; then
    log "Formula already installed: $package"
  else
    log "Installing formula: $package"
    brew install "$package"
  fi
}

install_cask() {
  local package="$1"
  if brew list --cask --versions "$package" >/dev/null 2>&1; then
    log "Cask already installed: $package"
  else
    log "Installing cask application: $package"
    brew install --cask "$package"
  fi
}

install_core_tools() {
  local packages=(
    git
    gh
    wget
    tree
    jq
    yq
    ripgrep
    fd
    fzf
    bat
    eza
    shellcheck
    shfmt
    zsh
    zsh-completions
    zsh-autosuggestions
    zsh-syntax-highlighting
  )

  log "Installing core CLI tools and utilities..."
  local package
  for package in "${packages[@]}"; do
    install_formula "$package"
  done
}

install_language_runtimes() {
  local packages=(node python go php)
  log "Installing core programming language runtimes..."
  local package
  for package in "${packages[@]}"; do
    install_formula "$package"
  done
}

install_optional_apps() {
  local apps=(
    firefox
    visual-studio-code
    iterm2
    google-chrome
    android-studio
    docker
    postman
    rectangle
    dbeaver-community
  )

  log "Installing desktop developer applications via Homebrew Cask..."
  local app
  for app in "${apps[@]}"; do
    install_cask "$app"
  done
}

set_default_zsh() {
  local zsh_path
  zsh_path="$(command -v zsh)" || die "Zsh is not installed."

  if [[ ! -x "$zsh_path" ]]; then
    die "Zsh executable not found at $zsh_path"
  fi

  if ! grep -Fxq "$zsh_path" /etc/shells; then
    log "Registering $zsh_path in /etc/shells (administrator password may be requested)..."
    printf '%s\n' "$zsh_path" | sudo tee -a /etc/shells >/dev/null
  fi

  if [[ "${SHELL:-}" != "$zsh_path" ]]; then
    log "Changing user default shell to $zsh_path..."
    chsh -s "$zsh_path" || warn "Unable to change shell automatically. Run: chsh -s $zsh_path"
    log "Shell changed. Please open a new terminal tab to use the updated login shell."
  else
    log "Default shell is already set to $zsh_path."
  fi
}

install_oh_my_zsh() {
  if [[ -d "${HOME}/.oh-my-zsh" ]]; then
    log "Oh My Zsh directory already exists; keeping existing configuration."
    return
  fi

  log "Installing Oh My Zsh framework (unattended mode)..."
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
}

print_summary() {
  printf '\n'
  log "=========================================================="
  log "           Setup Completed Successfully!                 "
  log "=========================================================="
  printf 'macOS Version : %s\n' "$(sw_vers -productVersion 2>/dev/null || echo unknown)"
  printf 'Architecture  : %s\n' "$(uname -m)"
  printf 'Active Shell  : %s\n' "${SHELL:-unknown}"
  printf 'Homebrew      : %s\n' "$(brew --version 2>/dev/null | head -n 1 || echo not-found)"
  printf 'Git           : %s\n' "$(git --version 2>/dev/null || echo not-installed)"
  printf 'Zsh           : %s\n' "$(zsh --version 2>/dev/null || echo not-installed)"
  printf '\n'
  log "Next Steps:"
  printf '  1. Open a new Terminal window or run: source ~/.zprofile\n'
  printf '  2. Verify your environment health: brew doctor\n'
  printf '  3. Keep everything updated anytime with: brew update && brew upgrade\n'
  printf '  4. Refer to README.md for customization and troubleshooting details.\n'
}

main() {
  log "Starting macOS developer workstation bootstrap..."
  require_macos
  install_command_line_tools_if_needed
  bootstrap_homebrew
  configure_brew_path

  log "Refreshing Homebrew formula index..."
  brew update

  install_core_tools

  if [[ "${INSTALL_LANGUAGES:-}" == "yes" ]] || ask_yes_no "Install language runtimes (Node.js, Python 3, Go, PHP)?" "N"; then
    install_language_runtimes
  fi

  if [[ "${INSTALL_CASKS:-}" == "yes" ]] || ask_yes_no "Install desktop applications (VS Code, iTerm2, Chrome, Firefox, Docker, Postman, Rectangle, DBeaver)?" "N"; then
    install_optional_apps
  fi

  if [[ "${SET_DEFAULT_SHELL:-}" == "yes" ]] || ask_yes_no "Set modern Homebrew Zsh as your default login shell?" "N"; then
    set_default_zsh
  fi

  if [[ "${INSTALL_OH_MY_ZSH:-}" == "yes" ]] || ask_yes_no "Install Oh My Zsh configuration framework?" "N"; then
    install_oh_my_zsh
  fi

  print_summary
}

main "$@"
