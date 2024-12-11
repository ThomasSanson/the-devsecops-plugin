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
  - [Built With](#built-with)
  - [Pipeline Stages](#pipeline-stages)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Project Customization](#project-customization)
  - [Task Control](#task-control)
  - [Available Commands](#available-commands)
- [Architecture](#architecture)
- [Features](#features)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

</details>

---

## About

The DevSecOps Plugin is a comprehensive toolset designed to streamline and enforce DevSecOps practices in your development workflow. It integrates various tools and best practices for continuous integration, security scanning, code quality analysis, and deployment automation.

### Built With

- [Task](https://taskfile.dev) - Task runner & build tool
- [Docker](https://www.docker.com/) - Containerization
- [MegaLinter](https://megalinter.io/) - Code quality & security scanning
- [Commitizen](https://commitizen.github.io/cz-cli/) - Commit message standardization
- [Lizard](https://github.com/terryyin/lizard) - Code complexity analysis
- [Grype](https://github.com/anchore/grype) - Vulnerability scanning
- [Trivy](https://github.com/aquasecurity/trivy) - Security scanner
- [Copier](https://copier.readthedocs.io) - Project templating and scaffolding

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

### Task Control

All tasks can be enabled/disabled via environment variables:

```bash
# Enable/disable specific features
export TASK_COMMITIZEN_ENABLED=true
export TASK_MEGALINTER_ENABLED=true
export TASK_DOCKER_CE_ENABLED=true
export TASK_LIZARD_ENABLED=true
```

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

The DevSecOps Plugin integrates multiple security tools and practices:

- Container security scanning with Trivy
- Vulnerability scanning with Grype
- Code security analysis with DevSkim
- Secure configuration validation
- Automated security checks in CI/CD pipeline

## Contributing

Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to set up the development environment and contribute to the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
