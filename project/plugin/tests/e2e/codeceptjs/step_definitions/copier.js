const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Constants
const PROJECT_NAME = 'generated-project'
const BASE_TEST_PATH = path.join('tmp', 'tests', 'copier')

// Global state
let tempDir = ''
let projectRoot = ''

// Utility functions
function removeDirRecursive (dirPath) {
  try {
    execSync(`rm -rf "${dirPath}"`)
  } catch (err) {
    throw new Error(`Failed to remove directory ${dirPath}: ${err.message}`)
  }
}

function getProjectRoot () {
  return path.join(tempDir, PROJECT_NAME)
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

function assertFileExists (filePath, errorMessage = null) {
  if (!fs.existsSync(filePath) || !fs.lstatSync(filePath).isFile()) {
    throw new Error(errorMessage || `File does not exist: ${filePath}`)
  }
  return true
}

function assertFileContains (filePath, expected) {
  const actual = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n')

  let normalizedExpected
  if (expected && typeof expected === 'object' && typeof expected.content === 'string') {
    normalizedExpected = expected.content.replace(/\r\n/g, '\n').trim()
  } else if (Array.isArray(expected)) {
    normalizedExpected = expected.map(l => l.trimEnd()).join('\n').replace(/\r\n/g, '\n').trim()
  } else {
    normalizedExpected = String(expected).replace(/\r\n/g, '\n').trim()
  }

  if (!actual.includes(normalizedExpected)) {
    console.log('---DEBUG FILE CONTAINS---')
    console.log('ACTUAL:[' + actual.split('\n').map(l => JSON.stringify(l)).join(',') + ']')
    console.log('EXPECTED SUBSTRING:[' + normalizedExpected.split('\n').map(l => JSON.stringify(l)).join(',') + ']')
    throw new Error(`File content does not contain expected snippet for ${filePath}\n--- Expected snippet ---\n${normalizedExpected}`)
  }
  return true
}

function assertFileNotExists (filePath) {
  if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
    throw new Error(`File should NOT exist: ${filePath}`)
  }
  return true
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

function getTableRows (table, columnName = null) {
  const rows = table.rows.map(row => {
    if (columnName && row[columnName]) {
      return row[columnName]
    }
    return row[0] || ''
  }).filter(Boolean)

  // Skip header row if it matches the column name
  return columnName && rows[0] === columnName ? rows.slice(1) : rows
}

function compareFileContent (filePath, expected) {
  const actual = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n').trim()

  // Normalize expected content based on its type
  let normalizedExpected
  if (expected && typeof expected === 'object' && typeof expected.content === 'string') {
    normalizedExpected = expected.content.replace(/\r\n/g, '\n').trim()
  } else if (Array.isArray(expected)) {
    normalizedExpected = expected.map(l => l.trimEnd()).join('\n').replace(/\r\n/g, '\n').trim()
  } else {
    normalizedExpected = String(expected).replace(/\r\n/g, '\n').trim()
  }

  if (actual !== normalizedExpected) {
    console.log('---DEBUG FILE CONTENT---')
    console.log('ACTUAL:[' + actual.split('\n').map(l => JSON.stringify(l)).join(',') + ']')
    console.log('EXPECTED:[' + normalizedExpected.split('\n').map(l => JSON.stringify(l)).join(',') + ']')
    throw new Error(`File content mismatch for ${filePath}\n--- Actual ---\n${actual}\n--- Expected ---\n${normalizedExpected}`)
  }

  return true
}

function ensureProjectExists () {
  projectRoot = getProjectRoot()
  // Always regenerate to ensure consistent state with all features enabled
  removeDirRecursive(BASE_TEST_PATH)
  fs.mkdirSync(BASE_TEST_PATH, { recursive: true })
  tempDir = BASE_TEST_PATH
  executeCommand(`task copier -- copy . --vcs-ref=HEAD --defaults --overwrite ${projectRoot}`)
  assertDirExists(projectRoot, `Project directory does not exist after generation: ${projectRoot}`)
}

// Step definitions
Given('a clean temporary directory for tests', () => { // eslint-disable-line no-undef
  removeDirRecursive(BASE_TEST_PATH)
  fs.mkdirSync(BASE_TEST_PATH, { recursive: true })
  tempDir = BASE_TEST_PATH
})

When('the copier command is executed to generate a project from the template', () => { // eslint-disable-line no-undef
  executeCommand(`task copier -- copy . --vcs-ref=HEAD --defaults --overwrite ${getProjectRoot()}`)
})

Then('the generated project directory should exist', () => { // eslint-disable-line no-undef
  assertDirExists(getProjectRoot())
})

Then('the {string} file should exist in the {string} directory', (fileName, dirPath) => { // eslint-disable-line no-undef
  assertFileExists(resolveProjectPath(dirPath, fileName))
})

Then('the following files should NOT exist:', (table) => { // eslint-disable-line no-undef
  const filePaths = getTableRows(table, 'File Path')
  filePaths.forEach(relPath => {
    assertFileNotExists(resolveProjectPath(relPath))
  })
})

Then('the following directories should NOT exist:', (table) => { // eslint-disable-line no-undef
  const dirPaths = getTableRows(table, 'Directory Path')
  dirPaths.forEach(relPath => {
    assertDirNotExists(resolveProjectPath(relPath))
  })
})

Then('the {string} directory should exist', (dirName) => { // eslint-disable-line no-undef
  assertDirExists(resolveProjectPath(dirName))
})

Then('the {string} directory should NOT exist', (dirName) => { // eslint-disable-line no-undef
  assertDirNotExists(resolveProjectPath(dirName))
})

Then('the commitizen configuration file {string} should exist', (filePath) => { // eslint-disable-line no-undef
  assertFileExists(resolveProjectPath(filePath), `Commitizen configuration file does not exist: ${resolveProjectPath(filePath)}`)
})

Then('the commitizen configuration should have the version {string}', (expectedVersion) => { // eslint-disable-line no-undef
  const czConfigPath = resolveProjectPath('.config', 'commitizen', 'cz.yaml')
  assertFileExists(czConfigPath)

  const content = fs.readFileSync(czConfigPath, 'utf8')
  const match = content.match(/version:[ \t]*([^\n]+)/)
  if (!match) {
    throw new Error(`No 'version' key found in commitizen config: ${czConfigPath}`)
  }

  const actualVersion = match[1].trim()
  if (actualVersion !== expectedVersion) {
    throw new Error(`Expected commitizen version '${expectedVersion}', got '${actualVersion}' in ${czConfigPath}`)
  }
})

Then('the commitizen "version_files" configuration should NOT contain {string}', (forbiddenFile) => { // eslint-disable-line no-undef
  const czConfigPath = resolveProjectPath('.config', 'commitizen', 'cz.yaml')
  assertFileExists(czConfigPath)

  const content = fs.readFileSync(czConfigPath, 'utf8')
  const match = content.match(/version_files:[ \t]*\n((?:[ \t]*-[ \t]*[^\n]+\n)*)/)
  if (!match) {
    throw new Error(`No 'version_files' key found in commitizen config: ${czConfigPath}`)
  }

  const versionFilesBlock = match[1]
  if (versionFilesBlock.includes(forbiddenFile)) {
    throw new Error(`'version_files' contains forbidden file: ${forbiddenFile}`)
  }
})

Then('the {string} file should NOT exist', (filePath) => { // eslint-disable-line no-undef
  assertFileNotExists(resolveProjectPath(filePath))
})

Then('the {string} file should exist', (filePath) => { // eslint-disable-line no-undef
  assertFileExists(resolveProjectPath(filePath))
})

Then('the content of the file {string} should be exactly:', function (filePath, contentBlock) { // eslint-disable-line no-undef
  const absPath = resolveProjectPath(filePath)
  assertFileExists(absPath)
  compareFileContent(absPath, contentBlock)
})

Then('the content of the file {string} should contain:', function (filePath, contentBlock) { // eslint-disable-line no-undef
  const absPath = resolveProjectPath(filePath)
  assertFileExists(absPath)
  assertFileContains(absPath, contentBlock)
})

Given('a project has been generated with the DevSecOps toolbox', function () { // eslint-disable-line no-undef
  ensureProjectExists()

  // Diagnostic logging to validate git configuration
  console.log('=== GIT CONFIGURATION DIAGNOSTICS ===')
  try {
    execSync('git config --global --list | grep user', { stdio: 'inherit' })
  } catch (err) {
    console.log('No global git user config found:', err.message)
  }

  executeCommand('git init --initial-branch=origin/main', getProjectRoot())

  // Check git config in the generated project directory
  console.log('=== GIT CONFIG IN GENERATED PROJECT ===')
  try {
    execSync('git config --list | grep user', { stdio: 'inherit', cwd: getProjectRoot() })
  } catch (err) {
    console.log('No git user config found in project directory:', err.message)
  }

  // Set git user identity locally in the generated project
  console.log('=== SETTING LOCAL GIT IDENTITY ===')
  executeCommand('git config user.name "CI Test User"', getProjectRoot())
  executeCommand('git config user.email "ci-test@example.com"', getProjectRoot())

  // Verify the configuration was set
  console.log('=== VERIFYING LOCAL GIT IDENTITY ===')
  executeCommand('git config --get user.name', getProjectRoot())
  executeCommand('git config --get user.email', getProjectRoot())

  executeCommand('git add .', getProjectRoot())
  executeCommand('git commit -m"feat: init"', getProjectRoot())
  executeCommand('git tag 0.1.0', getProjectRoot())
  const taskfile = resolveProjectPath('.config', 'devsecops', 'Taskfile.test.yml')
  assertFileExists(taskfile, `DevSecOps Taskfile.test.yml not found: ${taskfile}`)
})

When('I execute the DevSecOps task', function () { // eslint-disable-line no-undef
  executeCommand('task devsecops', getProjectRoot())
})

Then('the DevSecOps task should complete successfully', function () { // eslint-disable-line no-undef
  if (this.testError) {
    throw new Error(
      `DevSecOps task failed to execute in the generated project:\n${this.testError}\nOutput:\n${this.testResult}`
    )
  }
})
