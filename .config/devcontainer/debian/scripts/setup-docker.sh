#!/bin/bash

# Setup Docker

set -e

# shellcheck disable=SC1091
source "$TEMP_DIR/env_vars"

setup_docker() {
  local USERNAME="$1"
  local DOCKER_GROUP_ID="$2"

  echo "Configuring Docker..."
  sudo groupmod -g "$DOCKER_GROUP_ID" docker
  sudo usermod -aG docker "$USERNAME"

  echo "Docker configuration completed."
}

setup_docker "$1" "$2"
