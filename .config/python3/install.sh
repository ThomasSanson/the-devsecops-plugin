#!/usr/bin/env sh
# Install Python3 if not already present

set -eu

log() { printf "%s\n" "$*"; }

if command -v python3 >/dev/null 2>&1; then
  log "python3 already installed: $(python3 --version)"
  exit 0
fi

log "python3 not found. Installing..."

# Install Python3 via apt-get (Ubuntu/Debian)
if command -v apt-get >/dev/null 2>&1; then
  log "Detected: Debian/Ubuntu (apt-get)"
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq
  apt-get install -y -qq python3
else
  log "Error: apt-get not found. Only Debian/Ubuntu is supported."
  exit 1
fi

# Verify installation
if command -v python3 >/dev/null 2>&1; then
  log "python3 installed successfully: $(python3 --version)"
else
  log "Error: python3 installation failed."
  exit 1
fi
