#!/usr/bin/env sh
# Install Go if not already present

set -eu

log() { printf "%s\n" "$*"; }

if command -v go >/dev/null 2>&1; then
  log "go already installed: $(go version)"
  exit 0
fi

log "go not found. Installing..."

# Try to detect the package manager and install Go
if command -v apt-get >/dev/null 2>&1; then
  log "Detected: Debian/Ubuntu (apt-get)"
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y -qq golang-go
elif command -v dnf >/dev/null 2>&1; then
  log "Detected: Fedora/RHEL (dnf)"
  dnf install -y golang
elif command -v yum >/dev/null 2>&1; then
  log "Detected: RHEL/CentOS (yum)"
  yum install -y golang
elif command -v microdnf >/dev/null 2>&1; then
  log "Detected: Fedora/RHEL (microdnf)"
  microdnf install -y golang
elif command -v apk >/dev/null 2>&1; then
  log "Detected: Alpine Linux (apk)"
  apk add --no-cache go
elif command -v pacman >/dev/null 2>&1; then
  log "Detected: Arch Linux (pacman)"
  pacman -Sy --noconfirm go
elif command -v zypper >/dev/null 2>&1; then
  log "Detected: openSUSE (zypper)"
  zypper --non-interactive refresh
  zypper --non-interactive install go
else
  log "Error: Unknown or unsupported package manager."
  exit 1
fi

# Verify installation
if command -v go >/dev/null 2>&1; then
  log "go installed successfully: $(go version)"
else
  log "Error: Failed to install go."
  exit 1
fi
