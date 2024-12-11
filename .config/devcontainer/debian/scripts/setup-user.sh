#!/bin/bash

# Setup Non-Root User

set -e

# shellcheck disable=SC1091
source "$TEMP_DIR/env_vars"

setup_user() {
  local USER="$1"

  echo "Setting up non-root user: $USER"
  useradd -m "$USER"
  echo "$USER ALL=(root) NOPASSWD:ALL" >"/etc/sudoers.d/$USER"
  chmod 0440 "/etc/sudoers.d/$USER"

  echo "Configuring shell for $USER"
  echo 'source ~/.bashrc' >>"/home/$USER/.bash_profile"
  echo "alias ll='ls -lisa --color'" >>"/home/$USER/.bashrc"

  # Setup Taskfile completion
  wget --progress=dot:giga https://raw.githubusercontent.com/go-task/task/main/completion/bash/task.bash -O "/home/$USER/task.bash"
  chmod +x "/home/$USER/task.bash"
  echo 'source ~/task.bash' >>"/home/$USER/.bashrc"

  echo "Non-root user setup completed."
}

setup_user "$1"
