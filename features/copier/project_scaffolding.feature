@copier @scaffolding @project-setup @template
Feature: Project Scaffolding
  As a DevSecOps engineer
  I want to generate a project from a Copier template
  So that I can quickly start with the correct structure and configuration

  Scenario: Generating a new project from template
    Given a clean temporary directory for tests
    When the copier command is executed to generate a project from the template
    Then the generated project directory should exist

  Scenario: Verify core Copier artifact presence
    Then the ".copier-answers.yml" file should exist in the ".config/devsecops" directory

  Scenario: Verify excluded files are absent
    Then the following files should NOT exist:
      | File Path                                                     |
      | iac/environment/testing/superset-values.yaml                  |
      | iac/helm/Chart.lock                                           |
      | tests/infra/kube/ansible/verify/superset_is_ready.yml         |
      | tests/infra/kube/ansible/verify/superset_login_page_check.yml |

  Scenario: Verify excluded directories are absent
    Then the following directories should NOT exist:
      | Directory Path         |
      | .cache                 |
      | .config/**/roles       |
      | .vscode                |
      | megalinter-reports     |
      | node_modules           |
      | tests/copier           |
      | tests/devcontainer     |
      | tests/e2e/codeceptjs/screenshots/diff |
      | tmp                    |
      | venv                   |

  Scenario: Verify Commitizen configuration
    Then the commitizen configuration file ".config/commitizen/cz.yaml" should exist
    And the commitizen configuration should have the version "0.1.0"
    And the commitizen "version_files" configuration should NOT contain ".gitlab-ci.yml"

  Scenario: Verify Helm Chart configuration
    Then the Helm chart file "iac/helm/Chart.yaml" should exist
    And the Helm chart name should be "generated-project"

  Scenario: Verify features directory structure
    Then the "features" directory should exist
    And the "features/authentication" directory should NOT exist
    And the "features/authentication/admin_authentication.feature" file should NOT exist

  Scenario: Verify base screenshots directory structure
    Then the "tests/e2e/codeceptjs/screenshots/base" directory should exist
    And the "tests/e2e/codeceptjs/screenshots/base/dashboard_after_login.png" file should NOT exist

  Scenario: Verify step definitions structure and content
    Then the "tests/e2e/codeceptjs/step_definitions/entrypoint.js" file should exist
    And the "tests/e2e/codeceptjs/step_definitions/authentication.js" file should NOT exist
    And the "tests/e2e/codeceptjs/step_definitions/copier.js" file should NOT exist
    And the content of the file "tests/e2e/codeceptjs/step_definitions/entrypoint.js" should be exactly:
      """
      // Load step definitions from specific files
      // require('./domain_name.js')
      """

  Scenario: Running a DevSecOps test task in the generated project
    Given a project has been generated with the DevSecOps plugin
    When I execute the DevSecOps test task
    Then the DevSecOps test task should complete successfully
