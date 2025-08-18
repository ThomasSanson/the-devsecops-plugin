@copier @renovate @template
Feature: Renovate plugin-only configuration
  As a DevSecOps engineer
  I want the generated project to include a minimal Renovate configuration
  So that only the DevSecOps plugin version is updated via Copier answers

  Scenario: Generated project includes Renovate plugin-only config
    Given a clean temporary directory for tests
    When the copier command is executed to generate a project from the template
    Then the generated project directory should exist
    And the ".config/renovate/config.json" file should exist
    And the content of the file ".config/renovate/config.json" should contain:
      """
      "enabledManagers": ["copier"]
      """
    And the content of the file ".config/renovate/config.json" should contain:
      """
      "copier": {
      """
    And the content of the file ".config/renovate/config.json" should contain:
      """
      "managerFilePatterns": [
      """
    And the content of the file ".config/renovate/config.json" should contain:
      """
      "ignoreScripts": true
      """
