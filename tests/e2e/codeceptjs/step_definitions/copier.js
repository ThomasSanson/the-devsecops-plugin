const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// Utility: Remove directory recursively
function removeDirRecursive(dirPath) {
  try {
    execSync(`rm -rf "${dirPath}"`);
  } catch (err) {
    throw new Error(`Failed to remove directory ${dirPath}: ${err.message}`);
  }
}

// Utility: Get project root path
function getProjectRoot() {
  return path.join(tempDir, PROJECT_NAME);
}

let tempDir = '';
const PROJECT_NAME = 'generated-project';
const BASE_TEST_PATH = path.join('tmp', 'tests', 'copier');

// Step: Always clean the temp directory
Given('a clean temporary directory for tests', () => {
  removeDirRecursive(BASE_TEST_PATH);
  fs.mkdirSync(BASE_TEST_PATH, { recursive: true });
  tempDir = BASE_TEST_PATH;
});

// Step: Always generate the project (no cleaning)
When('the copier command is executed to generate a project from the template', () => {
  const projectRoot = getProjectRoot();
  const cmd = `task copier -- copy . --vcs-ref=HEAD ${projectRoot}`;
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    throw new Error(`Failed to run 'task copier': ${err.message}`);
  }
});

// Step: Only check existence
Then('the generated project directory should exist', () => {
  const projectRoot = getProjectRoot();
  if (!fs.existsSync(projectRoot) || !fs.statSync(projectRoot).isDirectory()) {
    throw new Error(`Project directory does not exist: ${projectRoot}`);
  }
});

// Step: Ensure project exists, or run the other steps in order
Given('a generated project exist', () => {
  const projectRoot = getProjectRoot();
  if (!fs.existsSync(projectRoot) || !fs.statSync(projectRoot).isDirectory()) {
    // Simulate the sequence: clean, generate, check
    removeDirRecursive(BASE_TEST_PATH);
    fs.mkdirSync(BASE_TEST_PATH, { recursive: true });
    tempDir = BASE_TEST_PATH;
    const cmd = `task copier -- copy . --vcs-ref=HEAD ${projectRoot}`;
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (err) {
      throw new Error(`Failed to run 'task copier': ${err.message}`);
    }
    if (!fs.existsSync(projectRoot) || !fs.statSync(projectRoot).isDirectory()) {
      throw new Error(`Project directory does not exist after generation: ${projectRoot}`);
    }
  }
});

Then('the {string} file should exist in the {string} directory', (fileName, dirPath) => {
  const projectRoot = getProjectRoot();
  const filePath = path.join(projectRoot, dirPath, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File does not exist: ${filePath}`);
  }
});

Then('the following files should NOT exist:', (table) => {
  const projectRoot = getProjectRoot();
  // Get all paths, skip the first row if it is a header
  const rows = table.rows.map(row => row[0] || row['File Path'] || '').filter(Boolean);
  const filePaths = rows[0] === 'File Path' ? rows.slice(1) : rows;
  for (const relPath of filePaths) {
    const filePath = path.join(projectRoot, relPath);
    if (fs.existsSync(filePath)) {
      throw new Error(`File should NOT exist but was found: ${filePath}`);
    }
  }
});

Then('the following directories should NOT exist:', (table) => {
  const projectRoot = getProjectRoot();
  // Get all directory paths, skip the first row if it is a header
  const rows = table.rows.map(row => row[0] || row['Directory Path'] || '').filter(Boolean);
  const dirPaths = rows[0] === 'Directory Path' ? rows.slice(1) : rows;
  for (const relPath of dirPaths) {
    const dirFullPath = path.join(projectRoot, relPath);
    if (fs.existsSync(dirFullPath) && fs.statSync(dirFullPath).isDirectory()) {
      throw new Error(`Directory should NOT exist but was found: ${dirFullPath}`);
    }
  }
});

Then('the {string} directory should exist', (dirName) => {
  const projectRoot = getProjectRoot();
  const absPath = path.join(projectRoot, dirName);
  if (!fs.existsSync(absPath) || !fs.lstatSync(absPath).isDirectory()) {
    throw new Error(`Directory does not exist: ${absPath}`);
  }
});

Then('the {string} directory should NOT exist', (dirName) => {
  const projectRoot = getProjectRoot();
  const absPath = path.join(projectRoot, dirName);
  if (fs.existsSync(absPath) && fs.lstatSync(absPath).isDirectory()) {
    throw new Error(`Directory should NOT exist: ${absPath}`);
  }
});

Then('the commitizen configuration file {string} should exist', (filePath) => {
  const projectRoot = getProjectRoot();
  const absPath = path.join(projectRoot, filePath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`Commitizen configuration file does not exist: ${absPath}`);
  }
});

Then('the commitizen configuration should have the version {string}', (expectedVersion) => {
  const projectRoot = getProjectRoot();
  const czConfigPath = path.join(projectRoot, '.config', 'commitizen', 'cz.yaml');
  if (!fs.existsSync(czConfigPath)) {
    throw new Error(`Commitizen config file does not exist: ${czConfigPath}`);
  }
  const content = fs.readFileSync(czConfigPath, 'utf8');

  // Ultra KISS: parse YAML with regex for both root and nested keys
  let actualVersion = null;
  // Try nested under 'commitizen:'
  const nested = content.match(/^[ \t]*commitizen:[\s\S]*?^([ \t]+)version:[ \t]*(["']?)([^\n"']+)\2/m);
  if (nested) {
    actualVersion = nested[3].trim();
  } else {
    // Try root-level 'version:'
    const root = content.match(/^version:[ \t]*(["']?)([^\n"']+)\1/m);
    if (root) {
      actualVersion = root[2].trim();
    }
  }
  if (!actualVersion) {
    throw new Error(`No 'version' key found in commitizen config: ${czConfigPath}`);
  }
  if (actualVersion !== expectedVersion) {
    throw new Error(`Expected commitizen version '${expectedVersion}', got '${actualVersion}' in ${czConfigPath}`);
  }
});

Then('the commitizen "version_files" configuration should NOT contain {string}', (forbiddenFile) => {
  const projectRoot = getProjectRoot();
  const czConfigPath = path.join(projectRoot, '.config', 'commitizen', 'cz.yaml');
  if (!fs.existsSync(czConfigPath)) {
    throw new Error(`Commitizen config file does not exist: ${czConfigPath}`);
  }
  const content = fs.readFileSync(czConfigPath, 'utf8');
  // Ultra KISS: find version_files array under commitizen
  const match = content.match(/^[ \t]*commitizen:[\s\S]*?^([ \t]+)version_files:[ \t]*([\s\S]*?)(^\1\S|\n\S|\n$)/m);
  if (!match) {
    throw new Error(`No 'version_files' key found in commitizen config: ${czConfigPath}`);
  }
  const versionFilesBlock = match[2];
  if (versionFilesBlock.includes(forbiddenFile)) {
    throw new Error(`'version_files' contains forbidden file: ${forbiddenFile}`);
  }
});

Then('the Helm chart file {string} should exist', (chartPath) => {
  const projectRoot = getProjectRoot();
  const absPath = path.join(projectRoot, chartPath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`Helm chart file does not exist: ${absPath}`);
  }
});

Then('the Helm chart name should be {string}', (expectedName) => {
  const projectRoot = getProjectRoot();
  const chartPath = path.join(projectRoot, 'iac', 'helm', 'Chart.yaml');
  if (!fs.existsSync(chartPath)) {
    throw new Error(`Helm chart file does not exist: ${chartPath}`);
  }
  const content = fs.readFileSync(chartPath, 'utf8');
  // Ultra KISS: find 'name:' at root
  const match = content.match(/^name:[ \t]*([^\n]+)$/m);
  if (!match) {
    throw new Error(`No 'name' key found in Helm chart: ${chartPath}`);
  }
  const actualName = match[1].trim();
  if (actualName !== expectedName) {
    throw new Error(`Expected Helm chart name '${expectedName}', got '${actualName}' in ${chartPath}`);
  }
});

Then('the {string} file should NOT exist', (filePath) => {
  const projectRoot = getProjectRoot();
  const absPath = path.join(projectRoot, filePath);
  if (fs.existsSync(absPath) && fs.lstatSync(absPath).isFile()) {
    throw new Error(`File should NOT exist: ${absPath}`);
  }
});

Then('the {string} file should exist', (filePath) => {
  const projectRoot = getProjectRoot();
  const absPath = path.join(projectRoot, filePath);
  if (!fs.existsSync(absPath) || !fs.lstatSync(absPath).isFile()) {
    throw new Error(`File does not exist: ${absPath}`);
  }
});

Then('the content of the file {string} should be exactly:', function (filePath, contentBlock) {
  const projectRoot = getProjectRoot();
  const absPath = path.join(projectRoot, filePath);
  if (!fs.existsSync(absPath) || !fs.lstatSync(absPath).isFile()) {
    throw new Error(`File does not exist: ${absPath}`);
  }
  const actual = fs.readFileSync(absPath, 'utf8').replace(/\r\n/g, '\n').trim();

  let expected;
  if (contentBlock && typeof contentBlock === 'object' && typeof contentBlock.content === 'string') {
    expected = contentBlock.content.replace(/\r\n/g, '\n').trim();
  } else if (Array.isArray(contentBlock)) {
    expected = contentBlock.map(l => l.trimEnd()).join('\n').replace(/\r\n/g, '\n').trim();
  } else {
    expected = String(contentBlock).replace(/\r\n/g, '\n').trim();
  }

  if (actual !== expected) {
    console.log('---DEBUG FILE CONTENT---');
    console.log('ACTUAL:[' + actual.split('\n').map(l => JSON.stringify(l)).join(',') + ']');
    console.log('EXPECTED:[' + expected.split('\n').map(l => JSON.stringify(l)).join(',') + ']');
    throw new Error(`File content mismatch for ${absPath}\n--- Actual ---\n${actual}\n--- Expected ---\n${expected}`);
  }
});

Given('a project has been generated with the DevSecOps plugin', function () {
  projectRoot = getProjectRoot();
  const taskfile = path.join(projectRoot, '.config', 'devsecops', 'Taskfile.test.yml');
  if (!fs.existsSync(taskfile)) {
    throw new Error(`DevSecOps Taskfile.test.yml not found: ${taskfile}`);
  }
});

When('I execute the DevSecOps test task', function () {
  const projectRoot = getProjectRoot();
  try {
    execSync('task test', { cwd: projectRoot, stdio: 'inherit' });
  } catch (err) {
    throw new Error(`DevSecOps test task failed to execute in the generated project: ${err}`);
  }
});

Then('the DevSecOps test task should complete successfully', function () {
  if (this.testError) {
    throw new Error(
      `DevSecOps test task failed to execute in the generated project:\n${this.testError}\nOutput:\n${this.testResult}`
    );
  }
});
