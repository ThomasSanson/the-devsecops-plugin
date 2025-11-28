/**
 * Step definitions for Project mode optional feature testing
 *
 * This module provides Cucumber step definitions to test the conditional
 * inclusion/exclusion of project mode integration in generated projects.
 *
 * Test isolation: Uses dedicated directory tmp/tests/copier/project/
 * to avoid conflicts with other test suites.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Test configuration constants
const PROJECT_NAME = 'generated-project'
const BASE_TEST_PATH = path.join('tmp', 'tests', 'copier', 'project')

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

function assertFileExists (filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File does not exist: ${filePath}`)
  }
  return true
}

function assertFileNotExists (filePath) {
  if (fs.existsSync(filePath)) {
    throw new Error(`File should NOT exist: ${filePath}`)
  }
  return true
}

function assertFileContains (filePath, expectedContent) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File does not exist: ${filePath}`)
  }

  const actual = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n')
  const normalized = expectedContent.replace(/\r\n/g, '\n').trim()

  if (!actual.includes(normalized)) {
    throw new Error(`File should contain the following content: ${filePath}\n--- Expected content ---\n${normalized}`)
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

// Step definitions for Project mode optional feature
Given('a clean temporary directory for project mode tests', () => { // eslint-disable-line no-undef
  removeDirRecursive(BASE_TEST_PATH)
  fs.mkdirSync(BASE_TEST_PATH, { recursive: true })
})

When('the copier command is executed with project mode enabled', () => { // eslint-disable-line no-undef
  const projectRoot = getProjectRoot()
  executeCommand(`task copier -- copy . --vcs-ref=HEAD --defaults --data project_enabled=true ${projectRoot}`)
})

When('the copier command is executed with default settings for project mode', () => { // eslint-disable-line no-undef
  const projectRoot = getProjectRoot()
  executeCommand(`task copier -- copy . --vcs-ref=HEAD --defaults ${projectRoot}`)
})

When('the copier command is executed with project mode disabled', () => { // eslint-disable-line no-undef
  const projectRoot = getProjectRoot()
  executeCommand(`task copier -- copy . --vcs-ref=HEAD --defaults --data project_enabled=false ${projectRoot}`)
})

Given('a project was generated with project mode enabled', () => { // eslint-disable-line no-undef
  const projectRoot = getProjectRoot()
  executeCommand(`task copier -- copy . --vcs-ref=HEAD --defaults --data project_enabled=true ${projectRoot}`)
})

Given('a project was generated with project mode disabled', () => { // eslint-disable-line no-undef
  const projectRoot = getProjectRoot()
  executeCommand(`task copier -- copy . --vcs-ref=HEAD --defaults --data project_enabled=false ${projectRoot}`)
})

When('the project is updated with project mode disabled', () => { // eslint-disable-line no-undef
  const projectRoot = getProjectRoot()
  // Remove project Taskfile before regeneration (Copier doesn't auto-delete excluded files)
  const projectTaskfile = resolveProjectPath('project/Taskfile.yml')
  if (fs.existsSync(projectTaskfile)) {
    fs.unlinkSync(projectTaskfile)
  }
  executeCommand(`task copier -- copy . --vcs-ref=HEAD --defaults --data project_enabled=false --force ${projectRoot}`)
})

When('the project is updated with project mode enabled', () => { // eslint-disable-line no-undef
  const projectRoot = getProjectRoot()
  executeCommand(`task copier -- copy . --vcs-ref=HEAD --defaults --data project_enabled=true --force ${projectRoot}`)
})

Then('the project mode {string} directory should exist', (dirName) => { // eslint-disable-line no-undef
  assertDirExists(resolveProjectPath(dirName))
})

Then('the project mode {string} directory should NOT exist', (dirName) => { // eslint-disable-line no-undef
  assertDirNotExists(resolveProjectPath(dirName))
})

Then('the project mode {string} file should exist', (fileName) => { // eslint-disable-line no-undef
  assertFileExists(resolveProjectPath(fileName))
})

Then('the project mode {string} file should NOT exist', (fileName) => { // eslint-disable-line no-undef
  assertFileNotExists(resolveProjectPath(fileName))
})

Then('the root Taskfile should include the project taskfile reference', () => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('Taskfile.yml')
  const projectTaskfileReference = 'project:\n    taskfile: project/Taskfile.yml'

  assertFileContains(taskfilePath, projectTaskfileReference)
})

Then('the root Taskfile should NOT include the project taskfile reference', () => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('Taskfile.yml')
  const projectTaskfileReference = 'project:\n    taskfile: project/Taskfile.yml'

  assertFileNotContains(taskfilePath, projectTaskfileReference)
})

Then('the following DevSecOps Taskfiles should call the project tasks:', (table) => { // eslint-disable-line no-undef
  // table.rows is an array of row objects, skip header row
  // Each row has a cells array with cell objects containing value property
  const phases = table.rows.slice(1).map(row => row.cells[0].value)

  phases.forEach(phase => {
    const taskfilePath = resolveProjectPath(`.config/devsecops/Taskfile.${phase}.yml`)
    const projectTaskReference = ':project:' + phase

    assertFileContains(taskfilePath, projectTaskReference)
  })
})

Then('the following DevSecOps Taskfiles should NOT call any project tasks:', (table) => { // eslint-disable-line no-undef
  // table.rows is an array of row objects, skip header row
  // Each row has a cells array with cell objects containing value property
  const phases = table.rows.slice(1).map(row => row.cells[0].value)

  phases.forEach(phase => {
    const taskfilePath = resolveProjectPath(`.config/devsecops/Taskfile.${phase}.yml`)
    const projectTaskReference = ':project:'

    assertFileNotContains(taskfilePath, projectTaskReference)
  })
})

Then('the test taskfile should contain build coverage enabled', () => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('.config/devsecops/Taskfile.test.yml')
  assertFileContains(taskfilePath, 'TASK_DEVSECOPS_TEST_BUILD_COVERAGE_ENABLED: \'{{.TASK_DEVSECOPS_TEST_BUILD_COVERAGE_ENABLED | default "true"}}\'')
})

Then('the test taskfile should contain build coverage disabled', () => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('.config/devsecops/Taskfile.test.yml')
  assertFileContains(taskfilePath, 'TASK_DEVSECOPS_TEST_BUILD_COVERAGE_ENABLED: \'{{.TASK_DEVSECOPS_TEST_BUILD_COVERAGE_ENABLED | default "false"}}\'')
})

Then('the test taskfile should contain build coverage task prefix {string}', (prefix) => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('.config/devsecops/Taskfile.test.yml')
  assertFileContains(taskfilePath, `TASK_DEVSECOPS_TEST_BUILD_COVERAGE_TASK_PREFIX: '{{.TASK_DEVSECOPS_TEST_BUILD_COVERAGE_TASK_PREFIX | default "${prefix}"}}'`)
})

Then('the test taskfile should contain build coverage task prefix empty', () => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('.config/devsecops/Taskfile.test.yml')
  assertFileContains(taskfilePath, 'TASK_DEVSECOPS_TEST_BUILD_COVERAGE_TASK_PREFIX: \'{{.TASK_DEVSECOPS_TEST_BUILD_COVERAGE_TASK_PREFIX | default ""}}\'')
})

Then('the test taskfile should call project test task', () => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('.config/devsecops/Taskfile.test.yml')
  assertFileContains(taskfilePath, '- task: :project:test')
})

Then('the test taskfile should call project test tdd task', () => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('.config/devsecops/Taskfile.test.yml')
  assertFileContains(taskfilePath, '- task: :project:test:tdd')
})

Then('the test taskfile should NOT call project test task', () => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('.config/devsecops/Taskfile.test.yml')
  assertFileNotContains(taskfilePath, '- task: :project:test')
})

Then('the test taskfile should NOT call project test tdd task', () => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('.config/devsecops/Taskfile.test.yml')
  assertFileNotContains(taskfilePath, '- task: :project:test:tdd')
})

Then('the root Taskfile should include the project taskfile as flatten', () => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('Taskfile.yml')
  // Check that the project taskfile include has flatten: true
  const flattenInclude = 'project:\n    taskfile: project/Taskfile.yml\n    flatten: true'

  assertFileContains(taskfilePath, flattenInclude)
})

Then('the project Taskfile should have the following prefixed tasks:', (table) => { // eslint-disable-line no-undef
  const taskfilePath = resolveProjectPath('project/Taskfile.yml')
  const tasks = table.rows.slice(1).map(row => row.cells[0].value)

  tasks.forEach(taskName => {
    // Each task should be defined with the prefix, e.g., 'project:plan:'
    const taskDefinition = `${taskName}:`
    assertFileContains(taskfilePath, taskDefinition)
  })
})
