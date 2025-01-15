<!-- markdownlint-disable MD024 MD037 -->

# Changelog

## 4.0.0 (2025-01-15)

### Feat

- **Taskfile**: add build and push tasks for Docker images with authentication support and customizable labels to enhance Docker management capabilities
- **Taskfile.release.yml**: add Docker CE build and push task with conditional execution based on TASK_DOCKER_CE_ENABLED variable to enhance deployment flexibility

### Fix

- **Taskfile.yml**: update bun and bunx command paths to use absolute paths for better reliability in task execution
- **ci**: enable DOCKER_TLS_VERIFY by setting it to 1 for improved security in CI pipeline

## 3.0.0 (2024-12-15)

### Feat

- **Taskfile**: add support for dynamic task flags in installation commands to enhance flexibility in task execution
- **Taskfile.yml**: add status check for Docker installation before running playbook to ensure prerequisites are met
- **install-packages.sh**: read Python version from configuration file and install corresponding packages to ensure compatibility with the project requirements
- **Taskfile**: add conditional task for podman installation based on TASK_PODMAN_ENABLED variable to enhance flexibility in development environment setup
- **Taskfile**: add TASK_PODMAN_ENABLED variable to manage Podman integration settings
- **tests**: add Taskfile.yml for comprehensive Docker installation testing on Debian containers to ensure reliability and correctness of the installation process
- **Taskfile.yml**: add build task for all Dockerfiles to verify integrity and functionality
- **Taskfile.yml**: include test taskfile for better organization of testing tasks
- **Taskfile**: enhance setup-environment task with conditional installation
- **Taskfile**: add TASK_COPIER_ENABLED variable and rename TASK_DOCKER_ENABLED to TASK_DOCKER_CE_ENABLED for clarity and consistency in task management
- **docker**: add Taskfile.yml for managing Docker-CE installation with Ansible automation and virtual environment setup
- **docker**: add requirements.yml for Ansible roles to manage Docker CE installation and dependencies
- **docker**: add requirements.txt for Ansible dependencies to manage Ansible versions in Docker configuration
- **docker**: add Ansible playbook for installing Docker-CE to streamline setup process
- **Taskfile**: add optional docker-ce taskfile inclusion for better modularity
- **Taskfile.yml**: update setup-environment task to include copier installation and remove duplicate bun installation

### Fix

- **megalinter**: update paths in Taskfile.yml to reflect new directory structure for lint reports and temporary files
- **megalinter**: update paths in Taskfile.yml to reflect new directory structure for lint reports and working directory
- **Taskfile.release.yml**: update commitizen bump command to include dynamic task flags for better flexibility in release process
- **Taskfile.code.yml**: update task commands to include dynamic TASK_FLAGS for better flexibility in task execution
- **Taskfile.build.yml**: update Docker build command to use dynamic TASK_FLAGS for improved flexibility in task execution
- **playbook.yml**: update environment variable lookup from USERNAME to USER for consistency with standard practice
- **setup-docker.sh**: rename USERNAME variable to USER for consistency and clarity in the script
- **init.sh**: update user variable from USERNAME to USER for consistency in script execution
- **Dockerfile**: rename ARG USERNAME to USER for consistency and clarity in environment variable usage
- **devcontainer**: rename USERNAME argument to USER for consistency with Docker conventions
- **Taskfile.yml**: update task names to use a consistent naming convention for better clarity
- **playbook.yml**: update environment variable lookup from USER to USERNAME for compatibility with Windows systems
- **Dockerfile**: change working directory before running init.sh to ensure script execution in the correct context
- **Taskfile.yml**: update error message to reflect correct Docker installation task name from 'docker:install' to 'docker-ce:install' for clarity
- **Taskfile.test.yml**: update environment variable from TASK_DOCKER_ENABLED to TASK_DOCKER_CE_ENABLED for accurate Docker test execution
- **Taskfile.build.yml**: update environment variable from TASK_DOCKER_ENABLED to TASK_DOCKER_CE_ENABLED for better clarity and accuracy in Docker build tasks
- **docs**: update Docker task environment variable names for clarity and consistency
- **Taskfile.yml**: add --roles-path option to ansible-galaxy install command to specify roles installation directory

### Refactor

- **setup-user.sh**: rename USERNAME variable to USER for consistency and clarity in user setup script
- **ci**: remove unnecessary dependencies on deploy job for operate and monitor stages to streamline pipeline execution
- **Taskfile.yml**: rename task identifiers for consistency and clarity, update Python version command to dynamically read from a file, and adjust dependencies to reflect new task names

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
