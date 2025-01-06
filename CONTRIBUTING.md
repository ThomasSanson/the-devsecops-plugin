# Contributing to The DevSecOps Plugin

Thank you for considering contributing to The DevSecOps Plugin. This document provides comprehensive guidelines for making contributions.

## Table of Contents

- [Development Environment](#development-environment)
  - [DevContainer Environment (Recommended)](#devcontainer-environment-recommended)
  - [Manual Setup](#manual-setup)
- [GitLab Workflow](#gitlab-workflow)
  - [Issue Creation](#issue-creation)
- [Development Standards](#development-standards)
  - [Code Organisation](#code-organisation)
  - [Naming Conventions](#naming-conventions)
  - [Language Standards](#language-standards)
  - [Task Management](#task-management)
  - [Code Quality Standards](#code-quality-standards)
  - [Security Practices](#security-practices)
- [Testing Requirements](#testing-requirements)
- [Documentation Guidelines](#documentation-guidelines)
  - [Code Documentation](#code-documentation)
  - [User Documentation](#user-documentation)
  - [Documentation Requirements](#documentation-requirements)
- [Communication Standards](#communication-standards)
- [Version Control Practices](#version-control-practices)
- [Continuous Integration](#continuous-integration)
- [Review Process](#review-process)
- [Licensing](#licensing)

## Development Environment

### DevContainer Environment (Recommended)

The DevContainer configuration ensures a standardised development environment with all necessary tools and dependencies pre-configured.

#### System Requirements

- CPU: 4 cores minimum (8 cores recommended)
- RAM: 8GB minimum (16GB recommended)
- Storage: 20GB minimum free space
- Docker Desktop 4.x or newer
- Visual Studio Code with Remote Containers extension

#### Setup Process

1. Clone the repository:

```bash
git clone git@gitlab.mim-libre.fr:digital-commons/devsecops/tools/work-in-progress/proof-of-concept/the-devsecops-plugin.git
```

2. Open in Visual Studio Code:

```bash
code the-devsecops-plugin
```

3. When prompted, select 'Reopen in Container', or:

- Press F1
- Type 'Reopen in Container'
- Select 'Remote-Containers: Reopen in Container'

#### Troubleshooting DevContainer

Common issues and solutions:

1. Container fails to build:

```bash
docker system prune -af
docker volume prune -f
```

2. Port conflicts:

- Check `.devcontainer/devcontainer.json` for port mappings
- Modify if ports are already in use

3. Performance issues:

- Increase Docker Desktop resources
- Ensure antivirus excludes Docker directories

### Manual Setup

Whilst DevContainer is recommended, manual setup is possible:

1. Install dependencies:

```bash
python3 -m venv ~/workspace/venv
source ~/workspace/venv/bin/activate
pip install copier
```

2. Configure environment:

```bash
task dev:setup-environment
```

## GitLab Workflow

### Issue Creation

#### Issue Template

````markdown
# [type] Descriptive Title

## What?

[Precise problem statement in 2-3 sentences]

## Why?

[Clear justification in 1-2 sentences]

## How to reproduce?

```gherkin
Feature: [Feature Name]
  As a [specific role]
  I want [clear objective]
  So that [measurable benefit]

  Background:
    Given [precise context]
    And [additional context if needed]

  Scenario: [Specific scenario name]
    Given [initial state]
    When [action performed]
    Then [expected outcome]
    And [additional outcomes if any]
```

## Definition of Done

- [ ] Implementation complete
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] CI/CD pipeline passes
- [ ] Code review completed
- [ ] Security scan passed

---

**Breaking change?** ⚠️
[Yes/No - If yes, detail impact and migration path]

**Additional context:**

- Version: [x.y.z]
- Environment: [details]
- Dependencies: [list]
````

#### Issue Types

Choose the appropriate type:

- `fix`: Bug corrections (e.g., [fix] Resolve task timeout in CI pipeline)
- `feat`: New features (e.g., [feat] Add automatic dependency scanning)
- `docs`: Documentation changes (e.g., [docs] Update installation guide)
- `style`: Code style changes (e.g., [style] Format according to new rules)
- `refactor`: Code restructuring (e.g., [refactor] Optimise task execution logic)
- `perf`: Performance improvements (e.g., [perf] Reduce pipeline execution time)
- `test`: Test-related changes (e.g., [test] Add integration tests for API)
- `build`: Build system changes (e.g., [build] Update Docker configuration)
- `ci`: CI/CD modifications (e.g., [ci] Add new deployment stage)
- `chore`: Maintenance tasks (e.g., [chore] Update dependencies)

### Merge Request

#### Creation Process

1. Fork the project in GitLab
2. Create a feature branch
3. Implement changes
4. Submit Merge Request

#### Template

```markdown
# Description

[Detailed description of changes]

## Related Issues

- Closes #[issue-number]

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing Performed

- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing

## Checklist

- [ ] My code follows the project's style
- [ ] I have updated the documentation
- [ ] I have added tests
- [ ] All tests pass
- [ ] I have added necessary documentation
- [ ] My branch is up to date with main

## Additional Notes

[Any additional information]
```

### Review Requirements

1. Automated checks:

- Pipeline must pass
- Code quality gates met
- Security scans passed
- Test coverage maintained/improved

2. Manual review requirements:

- Two approvals minimum
- No unresolved discussions
- Up-to-date with base branch

## Development Standards

### Code Organisation

- Each technology or tool must have its dedicated directory within `.config/`
- All operations must be abstracted through Taskfile.yml
- Pipeline configurations should only call tasks with appropriate parameters
- Avoid direct code execution in CI pipelines

### Naming Conventions

- Use UPPERCASE for Taskfile variables
- Follow the pattern: `TASK_TOOLNAME_PARAMETER: '{{.OVERRIDE_TASK_TOOLNAME_PARAMETER | default "default_value"}}'`
- Keep variable names descriptive and consistent
- Use snake_case for task names and parameters

### Language Standards

- Use formal British English for all documentation and comments
- Maintain consistent spelling across the project (e.g., 'organisation' not 'organization')
- Write clear, concise commit messages following Conventional Commits specification

### Task Management

- Each tool or component should have its own Taskfile in its `.config` directory
- Tasks should be modular and follow the single responsibility principle
- Use meaningful default values for task parameters
- Document all task parameters and their purposes

### Code Quality Standards

- Follow language-specific style guides
- Maintain consistent code formatting
- Use meaningful variable and function names
- Keep functions focused and maintainable
- Document complex logic and important decisions

### Security Practices

- Never commit sensitive information (API keys, credentials)
- Use environment variables for sensitive configuration
- Follow the principle of least privilege
- Regularly update dependencies
- Run security scans before merging

## Testing Requirements

1. Unit tests:

- One test file per module
- Mock external dependencies
- > 85% coverage

2. Integration tests:

- Test major workflows
- Include edge cases
- Mock external services

3. Performance tests:

- Response time limits
- Resource usage bounds
- Scalability verification

## Documentation Guidelines

### Code Documentation

- Clear function signatures
- Purpose descriptions
- Usage examples
- Parameter explanations

### User Documentation

- Step-by-step guides
- Clear prerequisites
- Troubleshooting sections
- Version compatibility

### Documentation Requirements

- Maintain comprehensive README files for each component
- Document all configuration options
- Include usage examples
- Keep documentation up-to-date with code changes
- Provide clear error messages and troubleshooting guides

## Communication Standards

### Issue Discussions

- Be constructive and respectful
- Provide context and examples
- Reference relevant documentation
- Use proper formatting
- Stay on topic

### MR Reviews

- Review thoroughly
- Provide specific feedback
- Suggest improvements
- Acknowledge good practices
- Respond promptly

## Version Control Practices

- Follow GitFlow branching strategy
- Use meaningful branch names (feature/, bugfix/, etc.)
- Create atomic commits with clear messages
- Reference issues in commit messages and merge requests
- Keep changes focused and reviewable

## Continuous Integration

- All CI/CD operations must use task abstractions
- Configure appropriate timeouts for CI jobs
- Maintain consistent pipeline structure across projects
- Document CI/CD variables and their purposes

## Review Process

- Code reviews are mandatory for all changes
- Use merge request templates
- Address all review comments
- Ensure CI passes before merging
- Verify documentation updates

## Licensing

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
