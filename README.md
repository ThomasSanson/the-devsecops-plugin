# ∞ The DevSecOps Plugin

<div align="center">

[![Project license](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)
[![Made with Go-Task](https://img.shields.io/badge/Built%20with-Task-blue?style=flat-square)](https://taskfile.dev)
[![Powered by Docker](https://img.shields.io/badge/Powered%20by-Docker-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)
[![Made with Copier](https://img.shields.io/badge/Made%20with-Copier-blue?style=flat-square)](https://copier.readthedocs.io)

</div>

<details open="open">
<summary>Table of Contents</summary>

- [About](#about)
  - [Key Features](#key-features)
  - [Built With](#built-with)
  - [Project Structure](#project-structure)
  - [Pipeline Stages](#pipeline-stages)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Task Control](#task-control)
  - [Common Operations](#common-operations)
  - [Project Customization](#project-customization)
  - [Available Commands](#available-commands)
- [Environment Variables](#environment-variables)
- [Development Setup](#development-setup)
- [Architecture](#architecture)
- [Features](#features)
- [Security](#security)
  - [Security Best Practices](#security-best-practices)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

</details>

---

## About

The DevSecOps Plugin is a comprehensive toolset designed to streamline and enforce DevSecOps practices in your development workflow. It integrates various tools and best practices for continuous integration, security scanning, code quality analysis, and deployment automation.

### Key Features

- **Modular Architecture**: Each tool and component has its dedicated configuration in `.config/`
- **Task Abstraction**: All operations are abstracted through Taskfile.yml for consistency
- **Comprehensive Security**: Integrated security scanning and vulnerability assessment
- **Code Quality Assurance**: Automated linting, formatting, and complexity analysis
- **Standardised Workflow**: Enforced commit messages and code review processes
- **Containerised Development**: DevContainer support for consistent environments

### Built With

- [Task](https://taskfile.dev) - Task runner & build tool
- [Docker](https://www.docker.com/) - Containerization
- [MegaLinter](https://megalinter.io/) - Code quality & security scanning
- [Commitizen](https://commitizen.github.io/cz-cli/) - Commit message standardization
- [Lizard](https://github.com/terryyin/lizard) - Code complexity analysis
- [Grype](https://github.com/anchore/grype) - Vulnerability scanning
- [Trivy](https://github.com/aquasecurity/trivy) - Security scanner
- [Copier](https://copier.readthedocs.io) - Project templating and scaffolding

### Project Structure

```bash
.
├── .config/           # Tool-specific configurations
│   ├── bun/          # Bun package manager configuration
│   ├── commitizen/   # Commit message standardisation
│   ├── devsecops/   # DevSecOps pipeline stages
│   ├── docker-ce/   # Docker configuration
│   └── ...          # Other tool configurations
├── .devcontainer/    # Development container configuration
├── src/             # Source code
└── Taskfile.yml     # Task runner configuration
```

### Pipeline Stages

The plugin implements a complete DevSecOps lifecycle through distinct stages:

1. 🎯 **Plan**: Initial planning and setup
2. 💻 **Code**: Development with integrated security checks

- Commitlint validation
- MegaLinter checks
- Commitizen formatting
- Lizard code analysis

3. 🏗️ **Build**: Automated building with security

- Docker image builds
- Security scans

4. 🧪 **Test**: Comprehensive testing

- Docker tests
- Security testing

5. 📦 **Release**: Secure release management

- Version bumping
- Changelog generation

6. 🚀 **Deploy**: Automated deployment
7. 🔄 **Operate**: Operational management
8. 📊 **Monitor**: Continuous monitoring
9. 💭 **Feedback**: Continuous improvement

## Getting Started

### Prerequisites

Before using the DevSecOps Plugin, ensure you have the following installed:

- Python 3.11 or higher
- Docker Desktop 4.x or newer (for container support)
- Visual Studio Code (recommended)
- Git

### Installation

1. Create and activate a Python virtual environment:

```bash
mkdir -p ~/workspace
python3 -m venv ~/workspace/venv
```

2. Install Copier in the virtual environment:

```bash
source ~/workspace/venv/bin/activate
pip install copier
```

3. Generate a new project using the template:

```bash
cd ~/workspace/path/to/your/new/project

source ~/workspace/venv/bin/activate
copier copy -a .config/devsecops/copier-answers.yml https://gitlab.mim-libre.fr/digital-commons/devsecops/tools/work-in-progress/proof-of-concept/the-devsecops-plugin.git .
```

Replace `/path/to/your/new/project` with your desired project location.
Use `.` to create in the current directory

## Usage

### Task Control

The plugin uses Task for operation control. Key environment variables:

```bash
# Core Controls
export TASK_FLAGS=""
export TASK_SEPARATOR="----------------------------------------"

# Component Controls
export TASK_BUN_ENABLED=true
export TASK_COMMITIZEN_ENABLED=true
export TASK_DOCKER_CE_ENABLED=true
export TASK_MEGALINTER_ENABLED=true
export TASK_LIZARD_ENABLED=true

# Pipeline Stage Controls
export TASK_DEVSECOPS_PLAN_ENABLED=true
export TASK_DEVSECOPS_CODE_ENABLED=true
export TASK_DEVSECOPS_BUILD_ENABLED=true
```

### Common Operations

1. **Setup Development Environment**:
  ```bash
  task dev:setup-environment
  ```

2. **Run Security Scans**:
  ```bash
  task devsecops:code:security
  ```

3. **Validate Code Quality**:
  ```bash
  task devsecops:code:quality
  ```

4. **Create Release**:
  ```bash
  task devsecops:release
  ```

### Project Customization

The plugin is designed to be easily customizable for specific project needs. Each project can define its own tasks in `src/Taskfile.yml` following the same lifecycle stages:

```yaml
# src/Taskfile.yml
tasks:
  plan:
    desc: Run project-specific plan tasks
    cmds:
      - custom-planning-command

  code:
    desc: Run project-specific code tasks
    cmds:
      - npm test
      - custom-linting

  build:
    desc: Run project-specific build tasks
    cmds:
      - docker build -t myproject .

  # ... other stages (test, release, deploy, operate, monitor, feedback)
```

These project-specific tasks will be automatically integrated into the main pipeline while keeping the core DevSecOps features intact. This allows you to:

- Add your own build processes
- Integrate custom testing frameworks
- Include project-specific deployment steps
- Add custom monitoring solutions
- Implement project-specific security checks

### Available Commands

```bash
# Run the complete DevSecOps pipeline
task

# Run individual stages
task plan       # Initial planning
task code       # Development and checks
task build      # Build and security
task test       # Run tests
task release    # Handle releases
task deploy     # Deployment
task operate    # Operations
task monitor    # Monitoring
task feedback   # Feedback loop

# Run specific tools
task megalinter     # Code quality & security
task commitizen     # Manage commits
task docker-ce:test    # Docker tests
```

## Environment Variables

### Task Control Variables
You can customize the behavior of the plugin by setting these environment variables:

```bash
# Core Features
TASK_BUN_ENABLED=true           # Enable/disable Bun runtime
TASK_COMMITIZEN_ENABLED=true    # Enable/disable Commitizen
TASK_COMMITLINT_ENABLED=true    # Enable/disable Commitlint
TASK_MEGALINTER_ENABLED=true    # Enable/disable MegaLinter
TASK_DOCKER_CE_ENABLED=true     # Enable/disable Docker CE features
TASK_LIZARD_ENABLED=true        # Enable/disable Lizard code analysis

# DevSecOps Pipeline Stages
TASK_DEVSECOPS_PLAN_ENABLED=true      # Enable/disable Plan stage
TASK_DEVSECOPS_CODE_ENABLED=true      # Enable/disable Code stage
TASK_DEVSECOPS_BUILD_ENABLED=true     # Enable/disable Build stage
TASK_DEVSECOPS_TEST_ENABLED=true      # Enable/disable Test stage
TASK_DEVSECOPS_RELEASE_ENABLED=true   # Enable/disable Release stage
TASK_DEVSECOPS_DEPLOY_ENABLED=true    # Enable/disable Deploy stage
TASK_DEVSECOPS_OPERATE_ENABLED=true   # Enable/disable Operate stage
TASK_DEVSECOPS_MONITOR_ENABLED=true   # Enable/disable Monitor stage
TASK_DEVSECOPS_FEEDBACK_ENABLED=true  # Enable/disable Feedback stage
```

### GitLab CI/CD Variables
The following variables need to be configured in your GitLab CI/CD settings:

- `CZ_DEPLOY_KEY`: Base64 encoded SSH private key for git operations (required for releases)
- `GITLAB_USER_LOGIN`: Your GitLab username (automatically provided)
- `GITLAB_USER_EMAIL`: Your GitLab email (automatically provided)

## Development Setup

1. Clone the repository:
```bash
git clone https://gitlab.mim-libre.fr/digital-commons/devsecops/tools/work-in-progress/proof-of-concept/the-devsecops-plugin.git
cd the-devsecops-plugin
```

2. Install Task:
```bash
sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d
```

3. Setup development environment:
```bash
task dev:setup-environment
```

4. Run the complete pipeline locally:
```bash
task devsecops
```

## Architecture

The plugin follows a modular architecture:

```bash
.
├── .config/                  # Tool configurations
│   ├── bun/                 # Bun runtime config
│   ├── commitizen/          # Commit message config
│   ├── devsecops/          # Pipeline stage definitions
│   │   ├── Taskfile.plan.yml
│   │   ├── Taskfile.code.yml
│   │   ├── Taskfile.build.yml
│   │   └── ...
│   ├── docker/             # Docker configuration
│   └── megalinter/         # Linting configuration
├── .devcontainer/          # Dev container setup
├── src/                    # Project-specific tasks
│   └── Taskfile.yml       # Custom task definitions
└── Taskfile.yml           # Main task orchestration

Each project can extend the base functionality by adding custom tasks in src/Taskfile.yml,
which are automatically integrated into the main pipeline while preserving the core DevSecOps features.
```

## Features

- ♾️ **Automation**: Automated workflows for common DevSecOps tasks
- 🔄 **Modular Pipeline**: Clearly separated stages with individual configurations
- 🎛️ **Flexible Control**: Enable/disable features via environment variables
- 🔒 **Security-First**: Integrated security scanning at every stage
- 📊 **Quality Assurance**: Comprehensive code quality checks
- 🐳 **Container-Ready**: Full Docker integration
- 📝 **Standardization**: Enforced commit message formatting
- 🔍 **Monitoring**: Built-in monitoring capabilities
- 🚀 **Project Customization**: Extensible framework allowing projects to define custom tasks for each lifecycle stage
  🔌 **Plugin Architecture**: Clear separation between core DevSecOps features and project-specific implementations

## Security

The plugin implements multiple security measures:

- Automated vulnerability scanning with Grype and Trivy
- Code quality checks with MegaLinter
- Dependency scanning
- Container security analysis
- Secure configuration validation

### Security Best Practices

- Keep all dependencies updated
- Follow the principle of least privilege
- Use environment variables for sensitive data
- Regular security scans
- Code review enforcement

## Contributing

Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to set up the development environment and contribute to the project.

## Contributors

- Thomas Sanson ([https://github.com/ThomasSanson](https://github.com/ThomasSanson))

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
