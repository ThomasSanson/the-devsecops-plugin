/**
 * Step definitions for Ansible optional feature testing
 *
 * This module provides Cucumber step definitions to test the conditional
 * inclusion/exclusion of Ansible integration in generated projects.
 *
 * Test isolation: Uses dedicated directory tmp/tests/copier/ansible/
 * to avoid conflicts with other test suites.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Test configuration constants
const PROJECT_NAME = 'generated-project'
const BASE_TEST_PATH = path.join('tmp', 'tests', 'copier', 'ansible')

// Utility functions for test operations
function getProjectRoot () {
  return path.join(BASE_TEST_PATH, PROJECT_NAME)
}

function resolveProjectPath (...parts) {
  return path.join(getProjectRoot(), ...parts)
}

function executeCommand (cmd, cwd = null) {
  try {
    execSync(cmd, { stdio: 'inherit', ...(cwd ? { cwd } : {}) })
  } catch (err) {
    throw new Error(`Failed to run command '${cmd}': ${err.message}`)
  }
}

function assertDirExists (dirPath, errorMessage = null) {
  if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
    throw new Error(errorMessage || `Directory does not exist: ${dirPath}`)
  }
  return true
}

function assertDirNotExists (dirPath) {
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    throw new Error(`Directory should NOT exist: ${dirPath}`)
  }
  return true
}

function assertFileNotContains (filePath, unexpectedContent) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File does not exist: ${filePath}`)
  }

  const actual = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n')
  const normalized = unexpectedContent.replace(/\r\n/g, '\n').trim()

  if (actual.includes(normalized)) {
    throw new Error(`File should NOT contain the following content: ${filePath}\n--- Unexpected content ---\n${normalized}`)
  }
  return true
}

function removeDirRecursive (dirPath) {
  try {
    execSync(`rm -rf "${dirPath}"`)
  } catch (err) {
    throw new Error(`Failed to remove directory ${dirPath}: ${err.message}`)
  }
}

// Step definitions for Ansible optional feature
Given('a clean temporary directory for Ansible tests', () => { // eslint-disable-line no-undef
  removeDirRecursive(BASE_TEST_PATH)
  fs.mkdirSync(BASE_TEST_PATH, { recursive: true })
})

When('the copier command is executed with Ansible disabled', () => { // eslint-disable-line no-undef
  const projectRoot = getProjectRoot()
  executeCommand(`task copier -- copy . --vcs-ref=HEAD --data ansible=false ${projectRoot}`)
})

Then('the Ansible project directory should exist', () => { // eslint-disable-line no-undef
  assertDirExists(getProjectRoot())
})

Then('the Ansible {string} directory should NOT exist', (dirName) => { // eslint-disable-line no-undef
  assertDirNotExists(resolveProjectPath(dirName))
})

Then('the Taskfile should NOT include the Ansible taskfile reference', () => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('Taskfile.yml')
  const ansibleTaskfileReference = `  ansible:
    taskfile: .config/ansible/Taskfile.yml
    optional: true`

  assertFileNotContains(taskfilePath, ansibleTaskfileReference)
})
