# Changelog

## 2.0.0 (2024-12-09)

### Feat

- **Taskfile**: add default task to orchestrate TDD workflows for better development process automation
- **cspell**: add "robertdebock" to the cspell configuration for improved spell checking accuracy
- **Taskfile.yml**: add INVENTORY_TARGET variable for better inventory management in Ansible tasks
- **Taskfile.yml**: add podman installation task to development environment setup for improved container management
- **devcontainer**: enhance Docker Compose configuration for Podman support by adding necessary privileges and cgroup settings
- **podman**: add Taskfile and playbook for automated Podman installation and role management
chore(podman): create requirements files for Ansible dependencies and roles
chore(podman): add .gitignore for roles directory to prevent unnecessary tracking

### Fix

- **megalinter**: correct typo in TASK_MEGALINTER variable name to TASK_MEGALINTER_CONTAINER_VERSION for consistency and functionality
- **Taskfile.yml**: update variable references in tasks to match new naming convention and ensure correct functionality
- **Taskfile.release.yml**: correct environment variable names for commitizen bump to ensure proper execution during release process
- **Taskfile.yml**: rename BUN_VERSION variable to TASK_BUN_VERSION for clarity and consistency in task definitions
- **Taskfile.release.yml**: update environment variable names for commitizen bump to use OVERRIDE prefix for clarity and consistency
- **Taskfile.yml**: update NODEJS_MAJOR_VERSION variable to use OVERRIDE_NODEJS_MAJOR_VERSION for better flexibility in version management
- **Taskfile.yml**: update variable names to use OVERRIDE prefix for clarity and consistency in overriding defaults
- **Taskfile.yml**: update BUN_VERSION variable to use OVERRIDE_BUN_VERSION for better flexibility in version management

### Refactor

- **Taskfile.yml**: rename variables to include TASK_PODMAN_ prefix for better clarity and organization
- **Taskfile.yml**: rename NODEJS_MAJOR_VERSION to TASK_NODEJS_MAJOR_VERSION for clarity and consistency in variable naming
- **Taskfile.yml**: rename LIZARD_* variables to TASK_LIZARD_* for better clarity and consistency in task definitions
- **dependency-check**: rename variables for consistency and clarity in Taskfile.yml
- **Taskfile.yml**: rename copier variables to task-specific variables for clarity and consistency in configuration management
- **Taskfile.yml**: replace hardcoded localhost with INVENTORY_TARGET for improved flexibility

## 1.0.2 (2024-11-18)

### Fix

- **copier.yml**: exclude copier.yml from being copied to improve project cleanliness

## 1.0.1 (2024-11-17)

### Fix

- **copier.yml**: exclude .git directory from copier to prevent copying version control files
