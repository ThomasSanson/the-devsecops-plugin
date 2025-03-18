<!-- markdownlint-disable MD024 MD037 -->

# Changelog

## 5.1.0 (2025-03-18)

### Feat

- **Taskfile.yml**: add new verification task to check for non-existent files in the generated project to enhance project validation process
- **Taskfile**: add Docker build and push tasks with versioning support to streamline container management and deployment processes
- **helm**: add initial Chart.yaml.jinja for Helm chart configuration with dependencies for sealed-secrets
- **Taskfile**: add helm chart name verification task to ensure correct project naming in Chart.yaml file
- **Taskfile.yml**: add commitizen configuration verification task to ensure correct cz.yaml setup and version compliance
- **tests/copier**: add Taskfile.yml for testing copier functionality with detailed tasks and verification steps
- **Taskfile**: add initial Taskfile.yml.jinja with project-specific tasks
- **tests**: add verification task for DevSecOps capabilities in generated project to ensure proper configuration and functionality
- **tests**: add Taskfile.copier.yml for testing copier functionality and cleanup process
- **Taskfile.yml**: add includes section for tests copier and integrate test-copy-local task to streamline testing process
- **iac**: add Kind cluster configuration for testing in GitLab CI environment to enable Kubernetes API access from outside the dind service
- **create.taskfile.yaml**: add KIND config file variable and update cluster creation command to use it
- **create.taskfile.yaml**: add conditional adjustment for kubeconfig server addresses in GitLab CI environment
- **tests**: add verification taskfile for Ansible playbook execution to streamline infrastructure verification process
- **tests**: add syntax checking taskfile for Helm charts and Ansible playbooks to ensure code quality in the test environment
- **tests**: add side effect simulation taskfile for testing system resilience with Ansible playbooks
- **tests**: add prepare taskfile for setting up test infrastructure components
- **tests**: add idempotence taskfile for testing infrastructure deployment consistency and ensuring no changes occur on re-deployment
- **tests**: add destroy taskfile for managing Kind cluster lifecycle in testing environment
- **tests**: add dependency taskfile for verifying and installing required tools for testing infrastructure
- **tests**: add taskfile for creating and verifying Kubernetes test infrastructure to streamline testing setup and ensure environment consistency
- **tests**: add converge taskfile for managing test infrastructure setup and deployment
- **tests**: add cleanup taskfile for Kubernetes infrastructure to automate cleanup operations for kubeconfig, sealed secrets, and Helm chart archives
- **tests**: add Ansible playbook to verify Sealed Secrets controller deployment and service readiness in Kubernetes environment
- **tests**: add Ansible playbook to disrupt Sealed Secrets controller for resilience testing

### Fix

- **Taskfile.yml**: add additional directories to DIRS_TO_CHECK to ensure they do not exist in the generated project
- **tests**: update TEST_TMP_DIR to use USER_WORKING_DIR for better compatibility with different environments and adjust CLI_ARGS accordingly
- **Taskfile.yml**: update taskfile paths for tests to ensure correct inclusion and execution of test tasks
- **copier.yml**: update excluded directory from project/tests to tests/copier for accurate project setup
- **create.taskfile.yaml**: fix formatting of echo command in GitLab CI environment check for better readability
- **create.taskfile.yaml**: correct formatting of echo command in GitLab CI environment check for better readability and maintainability
- **docs**: update GitLab repository URLs in README to reflect the correct domain
- **Taskfile.deploy.yml**: update task names for Kubernetes infrastructure tests to reflect new naming conventions
- **ansible**: update path for TASK_ANSIBLE_COLLECTIONS_REQUIREMENTS_FILE to reflect new directory structure

### Refactor

- **Taskfile.yml**: rename verification task and generalize directory checks to improve clarity and maintainability
- **tests**: simplify DevSecOps task testing by removing output checks and using a direct task execution command for efficiency
- **tests**: restructure copier test tasks
- **Taskfile**: rename test-copy-local task to project:tests:copier for better clarity and organization
- **Taskfile**: reorganize test tasks under a new 'infra:kube' namespace for better structure and clarity
- **Taskfile.test.yml**: update infrastructure test tasks to use kube prefix for better clarity and organization

## 5.0.0 (2025-03-09)

### Feat

- **Taskfile.deploy.yml**: add helm build task to prepare infrastructure for deployment
- **Taskfile.deploy.yml**: add check-testing-environment task to validate KUBECONFIG variables and run TDD tests for better deployment safety
- **Taskfile.yaml**: add namespace and create-namespace options to helm upgrade for sealed-secrets installation to ensure proper namespace handling
- **kubeseal**: enhance installation playbook to create a global symlink for kubeseal and verify accessibility
- **playbook.yml**: enhance Kind installation process by creating a symlink in /usr/local/bin for global access and adding verification steps for accessibility
- **playbook.yml**: add result registration for bashrc sourcing to improve task verification
- **dependency.taskfile.yaml**: add Go installation verification task to ensure Go is properly set up in the environment
- **Taskfile**: add optional Go taskfile inclusion for better modularity
- **Taskfile.yaml**: add TASK_KUBESEAL_ENABLED variable for better task control and configuration flexibility
- **Taskfile.yml**: update tasks to install Helm instead of Node.js and add TASK_HELM_ENABLED variable for configuration
- **go**: add requirements.yml to define Ansible roles for Go setup
- **requirements**: add ansible-core dependency to requirements.txt for automation support
- **playbook.yml**: add Ansible playbook for installing Go with configurable version and checksum
- **Taskfile**: add Taskfile for managing Go installation and dependencies using Ansible automation to streamline setup process
- **Taskfile.yml**: add TASK_LIZARD_ENABLED variable to control lizard task execution and enhance configurability
- **docker**: add community.general collection to requirements for enhanced functionality
- **Taskfile.yml**: add TASK_DOCKER_CE_ENABLED variable for better configuration management and enhance role installation with collection support
- **Taskfile.test.yml**: add new tasks for running tests and TDD for infrastructure with conditional execution based on environment variable
- **Taskfile.plan.yml**: add variable for enabling/disabling devsecops plan and update default task status check
- **Taskfile.operate.yml**: add variable for enabling/disabling devsecops operate tasks to enhance configurability
- **Taskfile.monitor.yml**: add variable for enabling/disabling DevSecOps monitor tasks to enhance configurability
- **tests**: add verification taskfile for Ansible playbook execution to streamline infrastructure verification process
- **tests**: add syntax checking taskfile for Helm charts and Ansible playbooks to ensure code quality in the test environment
- **tests**: add side effect simulation taskfile for testing system resilience with Ansible playbooks
- **tests**: add requirements.yml for Ansible collections needed for infrastructure testing
- **prepare.taskfile.yaml**: add a new task file to prepare test infrastructure with required components
- **tests**: add idempotence testing task to verify infrastructure deployment consistency
- **tests**: add destroy taskfile for managing Kind cluster destruction in testing environment
- **tests**: add dependency taskfile for managing testing dependencies and tools installation
- **tests**: add create.taskfile.yaml for managing test infrastructure setup and verification in Kind clusters
- **tests**: add converge taskfile for managing test infrastructure setup and deployment process
- **tests**: add cleanup taskfile for infrastructure to manage resource removal
- **tests**: add Ansible playbook to verify Sealed Secrets controller deployment and service readiness for testing environment
- **tests**: add Ansible playbook to disrupt Sealed Secrets controller for resilience testing
- **Taskfile**: add Taskfile.yml to define project-specific tasks for planning, coding, building, testing, releasing, deploying, operating, monitoring, and feedback
- **helm**: add values.yaml for sealed-secrets configuration to manage installation settings and namespace details
- **helm**: add Chart.yaml for Helm chart deployment with dependencies for sealed-secrets
- **helm**: add Chart.lock file to manage dependencies for sealed-secrets Helm chart
- **secrets.yaml**: add secrets configuration for testing environment to manage sensitive data securely
- **sealed-secrets**: add Taskfile.yaml for managing sealed-secrets installation and verification in Kubernetes
- **config**: add lychee configuration file to exclude specific URLs from checks
- **kubeseal**: add requirements.txt to specify ansible-core dependency for better environment management
- **kubeseal**: add Ansible playbook for installing Kubeseal using Go to streamline the setup process and ensure proper environment configuration
- **kubeseal**: add Taskfile.yaml for managing Kubeseal installation and operations with Ansible automation
- **kubectl**: add Ansible playbook for installing kubectl with verification and PATH setup to streamline development environment setup
- **kubectl**: add Taskfile.yml for managing kubectl installation and dependencies using Ansible automation
- **requirements**: add ansible-core version 2.18.2 to requirements for improved automation capabilities
- **playbook**: add Ansible playbook for installing Kind using Go to streamline setup process
- **taskfile**: add Taskfile.yml for managing Kind installation and dependencies with Ansible automation
- **helm**: add requirements.yml to define Helm chart dependencies for better management
- **helm**: add playbook.yml for installing Helm with specified roles and version management
- **helm**: add Taskfile.yml for managing Ansible and Helm tasks to streamline setup and installation processes
- **Taskfile.feedback.yml**: add variable for enabling/disabling feedback tasks to enhance configurability
- **Taskfile.deploy.yml**: add deploy task with bootstrap preparation steps and environment variable for enabling/disabling deployment
- **Taskfile.yml**: add TASK_DEV_ENABLED variable to allow overriding task execution in development environment
- **Taskfile.yml**: add TASK_COPIER_ENABLED variable to allow overriding task copier enablement for better configuration flexibility
- **ansible**: add requirements.txt to specify ansible-core and kubernetes versions for dependency management
- **ansible**: add Taskfile.yml to manage Ansible setup and execution tasks in a virtual environment

### Fix

- **ci**: add dependency on release job for deploy stage to ensure proper execution order
- **Taskfile.deploy.yml**: update KUBECONFIG check to ensure it is not empty before running tests
- **playbook.yml**: improve error handling for Go installation checks and symlink creation to ensure proper execution flow and clarity in failure conditions
- **playbook.yml**: improve error handling for Go and Kind installation checks to ensure accurate failure reporting and better debugging
- **playbook.yml**: update Go command paths to use absolute paths for consistency and reliability
- **playbook.yml**: update Go command paths to absolute to ensure correct execution in Ansible tasks
- **megalinter**: remove unnecessary sudo commands and streamline report cleanup process
- **dependency-check**: update volume mount path from /src to /project for consistency in scanning directory

### Refactor

- **kubeseal**: remove GOPATH modification steps and add fallback copy method for permissions issues
- **devsecops**: restructure Taskfile.release.yml to improve task organization and readability by defining tasks for commitizen, kaniko, and docker separately
- **Taskfile**: restructure task definitions for better organization and clarity by consolidating installation commands into individual tasks

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
