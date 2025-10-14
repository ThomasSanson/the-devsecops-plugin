#!/bin/bash

# Setup Docker

set -e

# shellcheck disable=SC1091
source "$TEMP_DIR/env_vars"

setup_docker() {
  local USER="$1"

  echo "Configuring Docker..."

  # Create docker group if it doesn't exist
  if ! getent group docker >/dev/null 2>&1; then
    echo "Creating docker group..."
    sudo groupadd docker
  fi

  sudo usermod -aG docker "$USER"

  echo "Docker configuration completed."
}

setup_docker "$1" "$2"
