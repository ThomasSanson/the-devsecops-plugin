## 13.0.10 (2025-09-04)

### Fix

- **deps**: update dependency @types/node to v22.18.1

## 13.0.9 (2025-09-01)

### Fix

- **deps**: update dependency @codeceptjs/ui to v1.3.7

## 13.0.8 (2025-08-30)

### Fix

- **deps**: update dependency copier to v9.10.1

## 13.0.7 (2025-08-30)

### Fix

- **deps**: update dependency @types/node to v22.18.0

## 13.0.6 (2025-08-30)

### Fix

- **deps**: update dependency ansible-core to v2.19.1

## 13.0.5 (2025-08-29)

### Fix

- **deps**: update dependency @codeceptjs/ui to v1.3.1

## 13.0.4 (2025-08-25)

### Fix

- **deps**: update dependency commitizen to v4

## 13.0.3 (2025-08-25)

### Fix

- **deps**: update dependency yamllint to v1.37.1

## 13.0.2 (2025-08-25)

### Fix

- **deps**: update dependency typescript to v5.9.2

## 13.0.1 (2025-08-25)

### Fix

- **deps**: update dependency playwright to v1.55.0

## 13.0.0 (2025-08-25)

### Fix

- **feedback.yml**: update needs section to include optional release job for better job dependency management

## 12.6.5 (2025-08-24)

### Fix

- **deps**: update dependency commitizen to v3.31.0

## 12.6.4 (2025-08-24)

### Fix

- **deps**: update dependency ansible-core to v2.19.0

## 12.6.3 (2025-08-24)

### Fix

- **deps**: update dependency @types/node to v22.17.2

## 12.6.2 (2025-08-24)

### Fix

- **deps**: update dependency @codeceptjs/ui to v1.3.0

## 12.6.1 (2025-08-24)

### Fix

- **deps**: update dependency lizard to v1.17.31

## 12.6.0 (2025-08-24)

### Feat

- **linter**: add pnpm task to run megalinter using pnpm dlx for improved linting process
- **yamllint**: add support for specifying Python version in Taskfile.yml for improved compatibility
- **taskfile**: add new variables for Python version and command to enhance configurability of lizard analysis tasks
- **Taskfile**: add support for dynamic Python version retrieval in copier tasks to enhance flexibility
- **commitizen**: add Python version handling to Taskfile for better compatibility with Python environments
- **ansible**: add Python version handling to Taskfile for improved compatibility

### Refactor

- **ansible**: streamline Ansible command handling and remove deprecated virtualenv references for improved clarity and functionality

## 12.5.0 (2025-08-22)

### Feat

- **devcontainer**: add Python 3.12 and related packages to install script for enhanced development environment
- **devcontainer**: add script to install UV for Python environment setup

### Fix

- **install-uv.sh**: add quotes around command substitution for safer parsing of Python version

## 12.4.2 (2025-08-22)

### Fix

- **ci**: update TASK_RENOVATE_REPOSITORY variable to use CI_PROJECT_PATH for accuracy

## 12.4.1 (2025-08-22)

### Feat

- **commitizen**: add TASK_COMMITIZEN_COMMAND to define default command for commitizen tasks
- **ci**: add pipx installation and setup for managing Python packages in before_script configuration

### Fix

- **Taskfile.feedback.yml**: enhance current branch resolution logic to prioritize CI variables before falling back to git commands

## 12.4.0 (2025-08-22)

## 12.3.1 (2025-08-21)

### Feat

- **Taskfile.feedback.yml**: add echo commands to display Git and Renovate variables for better debugging

### Fix

- **ci**: update pipeline rules to allow non-push sources and restrict blocking conditions for better flexibility

## 12.3.0 (2025-08-20)

### Feat

- **ci**: extend default tags in the DevSecOps plan configuration for better consistency
- **ci**: extend monitor job with default tags for improved configuration management
- **ci**: extend feedback job with default tags for better configuration management
- **ci**: add project-specific runner tags configuration for CI jobs
- **ci**: add test job configuration for DevSecOps pipeline in GitLab CI
- **ci**: add release configuration for GitLab CI to manage Docker tasks and scheduling rules
- **ci**: add operate job configuration for scheduled pipeline execution in GitLab CI
- **ci**: add monitor job configuration for scheduled pipeline execution in GitLab CI
- **ci**: add feedback job to CI pipeline for scheduled tasks and conditions
- **ci**: add deploy configuration for GitLab CI to manage deployment rules and scheduling
- **ci**: add DevSecOps code job configuration for GitLab CI pipeline
- **ci**: add build configuration for DevSecOps pipeline to enhance CI/CD process
- **ci**: add DevSecOps plan configuration for scheduled pipeline execution
- **ci**: add GitLab CI workflow rules to manage pipeline execution conditions
- **ci**: add stages configuration for GitLab CI to define the pipeline flow
- **ci**: add before_script configuration to install Taskfile and initialize environment
- **ci**: update GitLab CI configuration to refine pipeline rules for better control over job execution based on commit tags and branches

## 12.2.0 (2025-08-20)

## 12.1.3 (2025-08-20)

### Fix

- **deps**: update dependency codeceptjs to v3.7.4

## 12.1.2 (2025-08-20)

### Fix

- **copier**: update copier version from 9.4.1 to 9.9.1 for improved features and fixes
- **deps**: update codeceptjs/codeceptjs docker tag to v3.7.4

## 12.1.1 (2025-08-19)

### Feat

- **ci**: add renovate variables for repository and platform in CI configuration
- **devsecops**: add default branch variable and check for current branch in Taskfile for enhanced feedback tasks
- **devsecops**: add renovate task to validate Renovate configuration during the code phase
- **renovate**: add support for GitLab platform and enhance task descriptions for clarity
- **Taskfile.feedback.yml**: add renovate task to feedback phase for improved dependency management
- **renovate**: add log level variable to Taskfile for better logging control
- **tests**: add assertFileContains function to verify file content includes expected substring
- **Taskfile**: add CodeceptJS configuration and enablement variables for testing setup
- **Taskfile**: add renovate taskfile inclusion for better automation management
- **tests**: add feature test for Renovate plugin-only configuration to ensure correct project generation
- **renovate**: add Renovate configuration for managing dependencies with regex manager
- **renovate**: add Taskfile.yml for managing Renovate tasks and configurations

### Fix

- **deps**: update dependency @codeceptjs/ui to v1.2.5
- **renovate**: change default platform from gitlab to local and update environment variable handling for consistency
- **Taskfile.feedback.yml**: simplify renovate task command by removing unnecessary run suffix
- **renovate**: update enabledManagers and configuration fields in renovate_plugin_only.feature to reflect new plugin requirements
- **Taskfile.yml**: specify package for renovate-config-validator command to ensure correct execution

### Refactor

- **renovate**: enhance Taskfile with safer shell practices and improved command construction for Renovate execution

## 12.1.0 (2025-07-02)

### Feat

- **README**: add installation instructions for Taskfile to enhance setup guidance

## 12.0.1 (2025-06-18)

### Fix

- **ci**: update GitLab CI configuration by removing unused dependency proxy login script and adding CodeceptJS runner variable
- **README**: update license description from French to English for clarity

## 12.0.0 (2025-06-18)

### Feat

- **ci**: add TASK_CODECEPTJS_COMMAND to create Docker directory and link certificates for CodeceptJS execution
- **codeceptjs**: enhance Taskfile with additional Docker configuration options and improve command structure for running tests
- **ci**: add dependency proxy login logic to GitLab CI configuration for improved security and flexibility
- **megalinter**: add TASK_MEGALINTER_IMAGE_PREFIX variable for customizable image prefix in Taskfile configuration
- **devcontainer**: add Ubuntu dev container configuration for improved development environment setup
- **setup-user.sh**: add script to set up a non-root user with sudo access and shell configurations in the devcontainer environment
- **setup-proxy.sh**: add script to configure HTTP, HTTPS, and FTP proxy settings for development environment
- **setup-go.sh**: add script to configure Go environment variables system-wide
- **setup-docker.sh**: add script to configure Docker for the development environment
- **devcontainer**: add script to install Taskfile for development environment setup
- **devcontainer**: add script to install necessary packages for development environment setup
- **devcontainer**: add init.sh script to orchestrate the setup process for the development container
- **cleanup.sh**: add cleanup script for environment cleanup and resource management
- **devcontainer**: add Dockerfile for development container setup with necessary configurations and scripts

### Fix

- **Taskfile.yml**: simplify Docker run options by removing unnecessary flags for cleaner configuration
- **Taskfile.yml**: update Dockerfile path from debian to ubuntu for consistency with environment setup
- **kaniko**: update Dockerfile path from debian to ubuntu and change base image to ubuntu:24.04 for consistency with project requirements
- **docker-compose**: switch service from debian to ubuntu for better compatibility and updated user settings

## 11.0.0 (2025-06-16)

### Feat

- **tests**: add project scaffolding feature tests for Copier template generation and validation
- **python**: update Python version from 3.11 to 3.12 for compatibility improvements

### Fix

- **codecept.conf.js**: update feature path to correct relative location for Gherkin integration

## 10.1.0 (2025-06-07)

### Feat

- **ci**: remove unnecessary dependencies in GitLab CI stages to allow parallel execution of jobs

## 10.0.1 (2025-06-07)

### Fix

- **Taskfile.yml**: change default value of TASK_BUN_ENABLED from false to true to enable bun tasks by default

## 10.0.0 (2025-06-06)

### Feat

- breaking change
- **tests**: add diagnostic logging for git configuration in e2e tests to ensure proper setup and identity configuration for CI environment
- **env**: add TASK_CODECEPTJS_ENABLED variable to enable task configuration for CodeceptJS tests
- **tests**: add entrypoint.js.jinja for loading step definitions in e2e tests
- **tests**: add entrypoint.js to load step definitions for e2e tests
- **tests**: add end-to-end tests for the copier functionality to ensure project generation and validation of expected files and directories
- **tests**: add CodeceptJS configuration file for end-to-end testing setup
- **copier**: add project scaffolding feature to generate projects from templates for improved setup efficiency
- **codeceptjs**: add sample configuration file for CodeceptJS to streamline testing setup and provide default settings

### Fix

- **Taskfile.yml**: change default value of TASK_GO_ENABLED from false to true to enable Go tasks by default
- **Taskfile.yml**: change default value of TASK_PODMAN_ENABLED from true to false to prevent unintended podman usage
- **Taskfile.yaml**: change default value of TASK_KUBESEAL_ENABLED to false and clear default values for KUBECONFIG, SECRETS_FILE, and SEALED_FILE to enhance flexibility in configuration
- **Taskfile.yml**: change default value of TASK_K3D_ENABLED to false and remove default path for TASK_K3D_KUBECONFIG_DIR to enhance configuration flexibility
- **Taskfile.yml**: change default value of TASK_HELM_ENABLED to false and TASK_HELM_DIR to an empty string to prevent unintended behavior in helm tasks
- **Taskfile.yml**: change default value of TASK_GO_ENABLED from true to false to disable Go tasks by default
- **cspell**: update ignore patterns to reflect new project structure for sealed-secrets.yaml and secrets.yaml files
- **Taskfile.yml**: change default value of TASK_CODECEPTJS_ENABLED to false and update TASK_CODECEPTJS_CONFIG to point to sample config file to prevent unintended test runs in CI environments
- **Taskfile.yml**: change default value of TASK_BUN_ENABLED from true to false to prevent unintended task execution

### Refactor

- **Taskfile.yml**: replace hardcoded kubeconfig paths with a variable for better maintainability and flexibility

## 9.3.0 (2025-05-14)

### Feat

- **Taskfile.test.yml**: add helm dependency update task to ensure all dependencies are up to date before installation
- **Taskfile.yml**: add TASK_K3D_LOAD_IMAGE_RUN_TYPE variable to configure image run type dynamically

## 9.2.0 (2025-05-11)

### Feat

- add VERSION.jinja file to define the application version

## 9.1.0 (2025-05-11)

### Feat

- **copier.yml**: add _skip_if_exists configuration to prevent overwriting existing files during template generation

### Fix

- **copier-answers**: add YAML document start marker to ensure proper parsing of the file

## 9.0.2 (2025-05-11)

### Fix

- **copier.yml**: remove unnecessary _skip_if_exists configuration to simplify template setup

## 9.0.1 (2025-05-11)

### Fix

- **copier.yml**: remove obsolete migration for version 8.0.0 to clean up the configuration and simplify the file

## 9.0.0 (2025-05-10)

### Feat

- **Taskfile**: add copier test task to enhance project testing capabilities and ensure copier functionality
- **Taskfile**: add TASK_CODECEPTJS_GREP variable to CodeceptJS task for better test filtering options
- **ci**: add parallel execution for test jobs with different grep commands to enhance testing efficiency
- **project_scaffolding**: add tags for better categorization of the feature in the project scaffolding process
- **admin_authentication**: add tags for authentication, admin, login, and dashboard to enhance feature categorization and discoverability
- **Taskfile.test.yml**: enhance test infrastructure management with new destroy and cleanup options and restructure tasks for better clarity and flow
- **Taskfile.test.yml**: restructure test tasks to include infrastructure bootstrap and teardown phases for improved organization and clarity
- **ci**: add GitLab CI configuration for automated build, test, and deployment processes to streamline development workflow
- **ci**: add artifacts for build and pages jobs to ensure necessary files are available for subsequent stages
- **helm**: update build destination path and rename build task to package for clarity
- **docker**: add BuildKit support with caching options and save functionality for Docker images to enhance build performance and flexibility
- **index.html**: add initial HTML page for the Helm repository to provide documentation and usage instructions for users

### Fix

- **ci**: update test command to use project:test:copier for clarity and consistency in CI pipeline
- **copier.js**: update command execution to include TASK_CODECEPTJS_GREP variable for proper test execution in DevSecOps task
- **Taskfile.yml**: update task from reset to teardown:infrastructure for clarity in development environment reset process
- **Taskfile.yml**: increase timeout from 15m to 30m for project deployment to ensure sufficient time for completion
- **Taskfile.yml**: update TASK_DOCKER_CE_IMAGE_NAME to point to the correct Docker image path for the DevSecOps plugin
- **Taskfile.deploy.yml**: replace helm build task with helm package task to ensure proper packaging of Helm charts during deployment
- **Taskfile.build.yml**: change helm build task to helm package task to ensure correct packaging process during build phase

## 8.1.0 (2025-05-07)

### Feat

- **Taskfile.yml**: add TASK_K3D_FIX_DNS variable to control DNS fix option during cluster creation

## 8.0.0 (2025-05-05)

### Feat

- **tests**: add Ansible requirements file for infrastructure testing dependencies
- **copier.js**: enhance DevSecOps test task verification by adding steps to check task execution and success status
- **tests**: add end-to-end tests for the copier functionality to ensure project generation and validation of expected files and directories
- **entrypoint.js**: add copier step definitions to enhance test coverage and functionality
- **copier**: add project scaffolding feature tests to verify correct project structure and configuration after template generation
- **Taskfile**: add sync-templates task to streamline project template updates using a specific answers file
- **Taskfile**: add update task for project updates using Copier with specific answers file and preconditions for execution
- **commitizen**: add check-message task to validate commit message format using Commitizen for improved consistency and adherence to standards
- **ci**: add TASK_CODECEPTJS_CI variable to enable CodeceptJS in CI environment
- **Taskfile**: enhance task commands with informative echo statements for better user feedback and add troubleshooting tasks for pod status and logs
- **kaniko**: add logging messages for build and cache warmup processes to improve visibility and user feedback during execution
- **k3d**: enhance Taskfile with additional variables and tasks for improved cluster management and image loading capabilities
- **docker-ce**: enhance Taskfile.yml with improved variable handling and status messages for better clarity during execution phases
- **Taskfile.release.yml**: enhance release process with dynamic branch detection and improved logging for better user feedback during release tasks
- **Taskfile.plan.yml**: add logging for plan phase start and completion to enhance visibility during execution
- **Taskfile.operate.yml**: add logging for the start and completion of the operate phase to enhance visibility during execution
- **Taskfile.monitor.yml**: add monitor phase start and completion messages for better visibility during execution
- **Taskfile.feedback.yml**: add feedback phase start and completion messages to enhance user experience during task execution
- **Taskfile**: add start and completion messages for the code phase to improve user feedback during execution
- **Taskfile.build.yml**: add build phase start and completion messages for better feedback during the build process
- **Taskfile.yml**: add TASK_CODECEPTJS_CI variable to control CI behavior and improve task output messages for better clarity and user experience

### Fix

- **Taskfile.yml**: update TASK_CODECEPTJS_COMMAND to prevent failure on empty run by adding DONT_FAIL_ON_EMPTY_RUN environment variable
- **Taskfile.test.yml**: update path for TASK_ANSIBLE_COLLECTIONS_REQUIREMENTS_FILE to reflect new directory structure for Ansible requirements
- **ansible**: update path for TASK_ANSIBLE_COLLECTIONS_REQUIREMENTS_FILE to reflect the correct directory structure
- **Taskfile.yaml**: increase timeout from 5 minutes to 10 minutes for sealed-secrets deployment to ensure successful completion
- **lefthook**: add check for Git repository before running Lefthook installation to prevent errors when outside a repo
- **Taskfile.yml**: update default value for TASK_DOCKER_CE_DOCKERFILE to an empty string for better flexibility in Docker configurations
- **Taskfile.release.yml**: add check for Git repository before setting safe.directory and getting current branch to prevent errors in non-Git contexts
- **commitizen**: add check for Git repository in Taskfile to prevent errors when outside a repo and provide a default branch name
- **Taskfile.yml**: append CLI_ARGS to CODECEPTJS_RUN_COMMAND for enhanced command flexibility during test execution
- **docs**: update copier answers file path in README to reflect correct location for project setup instructions

### Refactor

- **copier.js**: reorganize utility functions and improve readability by consolidating file and directory assertions into dedicated functions, enhancing maintainability and clarity of test steps
- **project_scaffolding.feature**: update scenario description for clarity and add steps for executing DevSecOps test task
- **commitizen**: rename COMMITIZEN_CHECK_COMMAND to TASK_COMMITIZEN_COMMAND for consistency and clarity in task definitions
- **devsecops**: restructure Taskfile to improve readability and maintainability by simplifying task definitions and adding descriptive phases for testing operations


- add retry option to test job in GitLab CI for improved reliability

## 7.0.0 (2025-04-25)

### Feat

- **Taskfile.yml**: add entrypoint content verification task to ensure expected comments in entrypoint.js file
- **entrypoint.js.jinja**: add step definitions loader for specific files to enhance test modularity
- **create.taskfile.yaml**: enhance cluster creation with dynamic cluster name and additional variables for ports mapping and agents count
- **tests**: add verification tasks for features, screenshots, and step definitions structure to enhance test integrity and organization
- **Taskfile**: add new tasks for deployment, CodeceptJS, and port-forwarding for Superset service to enhance project workflow and testing capabilities
- **playbook.yml**: add local_bin_path variable and ensure ~/.local/bin directory exists for user-specific binary installations
- **Taskfile**: refactor variable definitions to use TASK_ prefix for consistency and add port-forward task for easier service access
- **Taskfile.release.yml**: enhance release process with additional variables and a new push-release task for better deployment control
- **Taskfile**: enhance development setup with initialization tasks and environment variables for better configuration management
- **Taskfile**: include additional optional taskfiles for codeceptjs and lefthook to enhance development capabilities
- **ansible**: refactor task variables to use TASK_ANSIBLE_ prefix for consistency and add syntax-check task for verifying playbook syntax
- **entrypoint.js**: add entry point for step definitions to load authentication steps for e2e tests
- **authentication**: add end-to-end tests for Superset login functionality to ensure proper authentication and dashboard display
- **tests**: add dashboard_after_login screenshot for end-to-end testing validation
- **authentication**: add admin authentication feature with successful login scenario and dashboard verification
- **lefthook**: add Taskfile.yml for Lefthook installation and configuration to streamline Git hooks management
- **steps_file.js**: add custom step methods file for CodeceptJS to enhance test automation capabilities
- **codeceptjs**: add initial configuration and step definitions for CodeceptJS testing framework to enable automated testing capabilities
- **jsconfig**: add jsconfig.json to enable JavaScript support in CodeceptJS for improved development experience
- **codeceptjs**: add initial configuration for CodeceptJS testing framework to enable end-to-end testing with Playwright and screenshot comparison features
- **codeceptjs**: add Taskfile.yml for CodeceptJS setup and test execution automation

### Fix

- **verify.taskfile.yaml**: update variable reference from OVERRIDE_TASK_ANSIBLE_VIRTUALENV to TASK_ANSIBLE_VIRTUALENV for consistency and clarity
- **side_effect.taskfile.yaml**: update variable reference from OVERRIDE_TASK_ANSIBLE_VIRTUALENV to TASK_ANSIBLE_VIRTUALENV for consistency in task configuration
- **destroy.taskfile.yaml**: update default value for cluster name to use current directory name for better context in task execution
- **converge.taskfile.yaml**: update task reference from :project:deploy to :deploy for clarity and consistency
- **cleanup.taskfile.yaml**: update variable reference to use correct context for TASK_TEST_INFRASTRUCTURE_CLEANUP_KUBECONFIG_DIR to ensure proper configuration loading
- **docs**: update variable references in DevSecOps guidelines to remove OVERRIDE prefix for consistency and clarity
- **Taskfile.yaml**: update variable references to remove OVERRIDE prefix for consistency and clarity in sealed secrets configuration
- **megalinter**: update variable references to use TASK_ prefix for consistency and clarity in Taskfile.yml
- **Taskfile.yml**: update variable references to use TASK_KIND_ prefix for consistency and clarity
- **Taskfile.plan.yml**: update variable reference from OVERRIDE_TASK_DEVSECOPS_PLAN_ENABLED to TASK_DEVSECOPS_PLAN_ENABLED for consistency and clarity
- **Taskfile.operate.yml**: correct variable reference from OVERRIDE_TASK_DEVSECOPS_OPERATE_ENABLED to TASK_DEVSECOPS_OPERATE_ENABLED for proper configuration handling
- **Taskfile.monitor.yml**: update variable reference for TASK_DEVSECOPS_MONITOR_ENABLED to ensure correct value retrieval
- **Taskfile.feedback.yml**: correct variable reference for TASK_DEVSECOPS_FEEDBACK_ENABLED to ensure proper configuration usage
- **Taskfile.deploy.yml**: update variable reference for TASK_DEVSECOPS_DEPLOY_ENABLED to ensure correct value retrieval
- **Taskfile.code.yml**: update variable reference for TASK_DEVSECOPS_CODE_ENABLED to ensure correct value retrieval
- **Taskfile.build.yml**: update variable reference for TASK_DEVSECOPS_BUILD_ENABLED to ensure correct value retrieval
- **dependency-check**: correct variable reference for TASK_DEPENDENCY_CHECK_USER to ensure proper functionality in Taskfile.yml
- **Taskfile.yml**: update variable references from OVERRIDE to TASK for consistency and clarity in configuration management
- **Taskfile.yml**: update variable references from OVERRIDE to direct TASK variables for consistency and clarity

### Refactor

- **tests**: simplify syntax checking tasks by replacing inline scripts with reusable tasks for Helm and Ansible to enhance maintainability and clarity
- **kaniko**: replace OVERRIDE_ prefix with TASK_ for consistency in variable naming across Taskfile.yml

## 6.0.0 (2025-04-03)

### Feat

- **init.sh**: add setup-go.sh script to initialization process for Go environment setup
- **setup-go.sh**: add script to configure Go environment variables and make Go available system-wide for development environments
- **Taskfile**: add devcontainer test task to streamline development workflow and enhance testing capabilities
- **devcontainer**: add Taskfile.yml to manage devcontainer testing tasks and streamline container command verification
- **playbook.yml**: add local_bin_path variable and ensure ~/.local/bin directory exists for user-specific installations of k3d
- **converge.taskfile.yaml**: add ENV variable for testing to support environment-specific configurations during deployment
- **Taskfile.yml**: add deploy environment check task to ensure proper ENV variable validation before deployment
- **Taskfile**: add TDD test task and conditional status check for deploy task to enhance testing and deployment processes
- **Taskfile**: add support for dynamic environment variable in deploy task to enhance flexibility in deployment configurations
- **iac**: add superset-values.yaml for configuring Superset environment and bootstrap script for dependencies installation
- **tests**: add additional files to check for existence in generated project to enhance verification process
- **Taskfile**: update test tasks to use TDD and add deployment commands for Apache Superset to streamline deployment process
- **tests**: add Ansible playbook to verify Apache Superset login page content for improved testing coverage
- **tests**: add Ansible playbook to verify Apache Superset deployment and pod status for improved testing and validation of the deployment process
- **Taskfile**: add k3d taskfile inclusion to support k3d operations in the task management system
- **k3d**: add requirements.txt to specify ansible-core dependency for k3d configuration
- **playbook**: add Ansible playbook for installing k3d using Go to streamline Kubernetes development environment setup
- **k3d**: add Taskfile.yml for managing k3d installation and dependencies with Ansible automation

### Fix

- **Taskfile**: reorder deployment tasks to ensure project deployment occurs before devsecops deployment for correct execution flow
- **Taskfile.deploy.yml**: update status check to use ENV variable instead of KUBECONFIG for better clarity and accuracy in test execution
- **Taskfile**: update deploy task status condition to improve logic for ENV variable check
- **Taskfile**: increase timeout from 5 minutes to 15 minutes for better stability during deployment
- **superset_login_page_check.yml**: rename url_to_test variable to url_to_check for clarity and consistency in naming
- **superset_login_page_check.yml**: update URL variable for login page check to improve maintainability and clarity
- **destroy.taskfile.yaml**: update task descriptions and commands to reflect the use of k3d instead of kind for cluster management
- **Taskfile.yml**: change default value of TASK_K3D_ENABLED from false to true to enable K3D tasks by default

### Refactor

- **playbook.yml**: update k3d symlink and copy tasks to use ~/.local/bin instead of /usr/local/bin for better user access and permissions management
- **kube**: migrate from Kind to k3d for cluster management to enhance compatibility and streamline infrastructure setup

## 5.1.1 (2025-03-18)

### Fix

- **Taskfile**: reorder release tasks to ensure project release runs before devsecops release for correct execution flow

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
- **kaniko**: add Dockerfile for Kaniko to facilitate container image builds
- **Dockerfile**: set entrypoint to ensure .bashrc is always sourced for a consistent shell environment
- **Taskfile**: add check for bunx command in task preconditions to ensure all dependencies are available
- **dependency-check**: add TASK_DEPENDENCY_CHECK_USER variable for user configuration in Docker command
- **Taskfile.release.yml**: add environment variables for Commitizen bump process to enhance release automation and control
- **kaniko**: add authentication settings for registry access and update build process to support authentication
- **release**: add variables for default and current branch in Taskfile for better release management
- **Taskfile.release.yml**: add Kaniko image push task with conditional execution based on TASK_KANIKO_ENABLED variable to enhance CI/CD process
- **requirements**: add requirements.txt for Ansible dependencies to manage project setup and ensure compatibility
- **Taskfile**: enhance Node.js installation process with Ansible automation and virtual environment setup
- **playbook**: add Ansible playbook for installing Node.js with configurable version to streamline setup process
- **kaniko**: update cache repository path to use $HOME for better portability and add cache directory preparation logic
- **kaniko**: add runtime command and volume flag variables for flexibility in container execution
- **Taskfile**: enhance DevSecOps task management with individual enable flags for better control over task execution
- **kaniko**: add Taskfile.yml for building and caching container images with Kaniko to streamline image creation and improve build efficiency
- **Taskfile**: add TASK_DEVSECOPS_BUILD_ENABLED variable to control DevSecOps build execution
- **Taskfile**: add support for Kaniko task configuration to enhance build capabilities and flexibility
- **debian.sh**: add function to update Node.js to the latest minor version using n package manager for better version management

### Fix

- **Taskfile.yml**: update bun and bunx command paths to use absolute paths for better reliability in task execution
- **ci**: enable DOCKER_TLS_VERIFY by setting it to 1 for improved security in CI pipeline
- **Dockerfile**: remove unnecessary blank line to maintain a cleaner Dockerfile structure
- **release**: enhance Kaniko task to read version from VERSION file and set image tag accordingly
- **kaniko**: update TASK_KANIKO_RUNTIME_CMD to use docker instead of podman for better compatibility with existing workflows

### Refactor

- **kaniko**: restructure build command to include authentication setup and improve error handling for missing credentials
- **kaniko**: replace hardcoded docker commands with variable references to support different container runtimes
- **Taskfile**: modify devsecops build task to conditionally execute based on TASK_DEVSECOPS_BUILD_ENABLED variable

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
- **commitizen**: add Commitizen configuration and setup for standardized commit messages
- **taskfile**: add Taskfile for managing Bun JavaScript runtime installation, configuration, and uninstallation
- **linter**: add MegaLinter configuration and task file for code analysis
- **nodejs**: add Taskfile for Node.js installation and testing automation
- **nodejs**: create debian.sh script for managing Node.js installation
test(nodejs): add tests for checking NODEJS_MAJOR_VERSION and root execution
test(nodejs): add full installation test for Node.js with defined version
- **trivy**: add Trivy configuration and ignore files for better security scanning management
- **yamllint**: add configuration files and task management for yamllint to ensure consistent YAML formatting and linting in the project
- **devcontainer**: add Debian dev container configuration for development environment setup
- **ci**: add GitLab CI configuration for automated build and deployment pipeline
- **Taskfile**: add a central Taskfile for orchestrating development operations and workflows

### Fix

- **ci**: update deployment key handling to decode base64 instead of removing carriage returns for better compatibility
- **tests**: update hello-world image reference to use the official image for simplicity and reliability
- **ci**: replace hardcoded GitLab SSH host with environment variable for flexibility and portability
