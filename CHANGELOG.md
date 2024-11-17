<!-- markdownlint-disable MD024 -->

# Changelog

## 0.2.0 (2024-11-17)

### Feat

- **Taskfile**: add environment variable support for task control and enhance task commands with conditional execution

## 0.1.0 (2024-11-10)

### Feat

- **devcontainer**: enable UID update for remote user to match local user settings in the dev container
- **lizard**: add Taskfile for Lizard code complexity analysis and requirements file for dependencies
- **docker**: add Taskfile for Docker installation and management tasks
- **docker**: create installation script for Debian-based systems
feat(docker): implement testing framework for Docker installation process
- **devcontainer**: add Dockerfile and related scripts for Debian-based environment setup
- **Taskfile**: add Taskfile.yml to configure the development environment with Docker, Node.js, and Bun installations
- **dependency-check**: add Taskfile.yml for managing Dependency-Check tasks to streamline security analysis process
- **commitlint**: add commitlint configuration and Taskfile for commit message validation

### Fix

- **ci**: update deployment key handling to decode base64 instead of removing carriage returns for better compatibility
- **tests**: update hello-world image reference to use the official image for simplicity and reliability
- **ci**: replace hardcoded GitLab SSH host with environment variable for flexibility and portability
