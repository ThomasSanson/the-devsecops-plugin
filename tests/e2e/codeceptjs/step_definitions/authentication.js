/* global inject, Given, When, Then */
const { I } = inject()

Given('I am on the Superset login page', () => {
  I.amOnPage('/login')
})

When('I attempt to log in with admin credentials', () => {
  I.waitForElement('form', 10)
  I.fillField('username', 'admin')
  I.fillField('password', 'admin')
  I.click('input[type="submit"]')
})

Then('I should be successfully logged in', () => {
  I.waitForElement('.dashboard-grid, .dashboard-header, .navbar-brand', 10)
  I.see('Dashboards')
})

Then('I should see the dashboard page displayed correctly', () => {
  I.waitForElement('.dashboard-grid, .dashboard-header, .navbar-brand', 10)
  I.waitForElement('.ant-empty, .ant-empty-description, .ant-empty-footer, .ant-btn', 10)

  I.wait(7)
  I.saveScreenshot('dashboard_after_login.png')
  I.seeVisualDiff('dashboard_after_login.png', { tolerance: 0 })
  I.see('Dashboards')
})
