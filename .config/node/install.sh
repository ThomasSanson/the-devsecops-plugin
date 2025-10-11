#!/usr/bin/env sh
# Install Node.js if not already present

set -eu

log() { printf "%s\n" "$*"; }

if command -v node >/dev/null 2>&1; then
  log "node already installed: $(node --version)"
  exit 0
fi

log "node not found. Installing..."

# Try to detect the package manager and install node
if command -v apt-get >/dev/null 2>&1; then
  # Debian/Ubuntu - Install Node.js 20.x LTS via NodeSource
  log "Detected: Debian/Ubuntu (apt-get)"
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y -qq ca-certificates curl gnupg

  # Add NodeSource repository for Node.js 20.x
  mkdir -p /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list >/dev/null

  apt-get update -qq
  apt-get install -y -qq nodejs
elif command -v dnf >/dev/null 2>&1; then
  # Modern Fedora/RHEL
  log "Detected: Fedora/RHEL (dnf)"
  dnf install -y nodejs npm
elif command -v yum >/dev/null 2>&1; then
  # Legacy RHEL/CentOS
  log "Detected: RHEL/CentOS (yum)"
  yum install -y nodejs npm
elif command -v apk >/dev/null 2>&1; then
  # Alpine Linux
  log "Detected: Alpine Linux (apk)"
  apk add --no-cache nodejs npm
elif command -v pacman >/dev/null 2>&1; then
  # Arch Linux
  log "Detected: Arch Linux (pacman)"
  pacman -Sy --noconfirm nodejs npm
elif command -v zypper >/dev/null 2>&1; then
  # openSUSE
  log "Detected: openSUSE (zypper)"
  zypper --non-interactive refresh
  zypper --non-interactive install nodejs npm
else
  log "Error: Unknown or unsupported package manager."
  exit 1
fi

# Verify installation
if command -v node >/dev/null 2>&1; then
  log "node installed successfully: $(node --version)"
  log "npm installed successfully: $(npm --version)"
else
  log "Error: Failed to install node."
  exit 1
fi
