#!/bin/bash

set -e

# shellcheck disable=SC1091
source "$TEMP_DIR/env_vars"

install_packages() {
  echo "Updating package lists..."
  apt-get update

  echo "Installing necessary packages..."
  apt-get install -y --no-install-recommends \
    bash-completion \
    curl \
    git \
    gnupg2 \
    lsb-release \
    nano \
    openssh-client \
    pipx \
    sudo \
    unzip \
    wget

  echo "Package installation completed."
}

install_packages
