#!/usr/bin/env sh
# Install Taskfile if not already present

set -eu

log() { printf "%s\n" "$*"; }

if command -v task >/dev/null 2>&1; then
  log "Taskfile already installed: $(task --version)"
  exit 0
fi

log "Taskfile not found. Installing..."

# Install Taskfile binary from official script
sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin

# Verify installation
if command -v task >/dev/null 2>&1; then
  log "Taskfile installed successfully: $(task --version)"
else
  log "Error: Taskfile installation failed."
  exit 1
fi
