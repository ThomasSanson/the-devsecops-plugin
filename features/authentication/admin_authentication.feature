@authentication @admin @login @dashboard
Feature: Admin Authentication
  As an admin user
  I want to log in successfully
  So that I can access the application dashboard

  Scenario: Successful login and dashboard verification
    Given I am on the Superset login page
    When I attempt to log in with admin credentials
    Then I should be successfully logged in
    And I should see the dashboard page displayed correctly
