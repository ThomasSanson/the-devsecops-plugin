<!-- markdownlint-disable MD024 -->

# Changelog

## 1.1.1 (2024-12-08)

### Fix

- **megalinter**: correct typo in TASK_MEGALINTER variable name to TASK_MEGALINTER_CONTAINER_VERSION for consistency and functionality
- **Taskfile.yml**: update variable references in tasks to match new naming convention and ensure correct functionality
- **Taskfile.release.yml**: correct environment variable names for commitizen bump to ensure proper execution during release process
- **Taskfile.yml**: rename BUN_VERSION variable to TASK_BUN_VERSION for clarity and consistency in task definitions

### Refactor

- **Taskfile.yml**: rename variables to include TASK_PODMAN_ prefix for better clarity and organization
- **Taskfile.yml**: rename NODEJS_MAJOR_VERSION to TASK_NODEJS_MAJOR_VERSION for clarity and consistency in variable naming
- **Taskfile.yml**: rename LIZARD_* variables to TASK_LIZARD_* for better clarity and consistency in task definitions
- **dependency-check**: rename variables for consistency and clarity in Taskfile.yml
- **Taskfile.yml**: rename copier variables to task-specific variables for clarity and consistency in configuration management

## 1.1.0 (2024-12-07)

### Feat

- **cspell**: add "robertdebock" to the cspell configuration for improved spell checking accuracy
- **Taskfile.yml**: add INVENTORY_TARGET variable for better inventory management in Ansible tasks
- **Taskfile.yml**: add podman installation task to development environment setup for improved container management
- **devcontainer**: enhance Docker Compose configuration for Podman support by adding necessary privileges and cgroup settings
- **podman**: add Taskfile and playbook for automated Podman installation and role management
chore(podman): create requirements files for Ansible dependencies and roles
chore(podman): add .gitignore for roles directory to prevent unnecessary tracking

### Refactor

- **Taskfile.yml**: replace hardcoded localhost with INVENTORY_TARGET for improved flexibility

## 1.0.3 (2024-12-07)

### Fix

- **Taskfile.release.yml**: update environment variable names for commitizen bump to use OVERRIDE prefix for clarity and consistency
- **Taskfile.yml**: update NODEJS_MAJOR_VERSION variable to use OVERRIDE_NODEJS_MAJOR_VERSION for better flexibility in version management
- **Taskfile.yml**: update variable names to use OVERRIDE prefix for clarity and consistency in overriding defaults
- **Taskfile.yml**: update BUN_VERSION variable to use OVERRIDE_BUN_VERSION for better flexibility in version management

## 1.0.2 (2024-11-18)

### Fix

- **copier.yml**: exclude copier.yml from being copied to improve project cleanliness

## 1.0.1 (2024-11-17)

### Fix

- **copier.yml**: exclude .git directory from copier to prevent copying version control files

## 1.0.0 (2024-11-17)

### Feat

- **copier**: add Taskfile.yml for managing Copier installation and execution in a virtual environment
- **copier.yml**: add template configuration for project setup to streamline DevSecOps project creation process

## 0.3.0 (2024-11-17)

### Feat

- **Taskfile**: add Taskfile.yml to define project-specific tasks for better automation and organization
- **devsecops**: add Taskfile.test.yml to define generic test tasks for better automation and organization of testing processes
- **release**: add Taskfile.release.yml for managing release tasks with Commitizen support
- **devsecops**: add Taskfile.plan.yml to define default tasks for the project
- **devsecops**: add Taskfile.operate.yml to define and manage operate tasks for the project
- **Taskfile.monitor.yml**: add a new Taskfile for monitoring tasks to streamline development processes
- **Taskfile.feedback.yml**: add a new Taskfile for generic feedback tasks to streamline development processes
- **devsecops**: add Taskfile.deploy.yml for managing deployment tasks in DevSecOps
- **devsecops**: add Taskfile for managing code quality tasks with conditional execution based on environment variables
- **devsecops**: add Taskfile.build.yml for managing build tasks and Docker image builds
- **Taskfile**: add devsecops tasks for planning, coding, building, testing, releasing, deploying, operating, monitoring, and feedback

### Fix

- **commitizen**: enhance error handling in Taskfile for commit verification process to provide clearer feedback on failures and warnings

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
