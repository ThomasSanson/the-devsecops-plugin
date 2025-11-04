@copier @scaffolding @ansible @optional-features
Feature: Ansible Optional Integration
  As a DevSecOps engineer
  I want to generate a project without Ansible integration
  So that I can use the DevSecOps plugin in projects that don't require Ansible

  Scenario: Generate project with Ansible integration (default behaviour)
    Given a clean temporary directory for Ansible tests
    When the copier command is executed with default settings
    Then the Ansible project directory should exist
    And the Ansible ".config/ansible" directory should exist
    And the Ansible ".config/ansible-lint" directory should exist
    And the Taskfile should include the Ansible taskfile reference

  Scenario: Generate project without Ansible integration
    Given a clean temporary directory for Ansible tests
    When the copier command is executed with Ansible disabled
    Then the Ansible project directory should exist
    And the Ansible ".config/ansible" directory should NOT exist
    And the Ansible ".config/ansible-lint" directory should NOT exist
    And the Taskfile should NOT include the Ansible taskfile reference

  Scenario: Update project from Ansible enabled to disabled
    Given a clean temporary directory for Ansible tests
    And a project was generated with Ansible enabled
    When the project is updated with Ansible disabled
    Then the Ansible project directory should exist
    And the Ansible ".config/ansible" directory should NOT exist
    And the Ansible ".config/ansible-lint" directory should NOT exist
    And the Taskfile should NOT include the Ansible taskfile reference

  Scenario: Update project from Ansible disabled to enabled
    Given a clean temporary directory for Ansible tests
    And a project was generated with Ansible disabled
    When the project is updated with Ansible enabled
    Then the Ansible project directory should exist
    And the Ansible ".config/ansible" directory should exist
    And the Ansible ".config/ansible-lint" directory should exist
    And the Taskfile should include the Ansible taskfile reference
