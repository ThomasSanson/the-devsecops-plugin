#!/usr/bin/env bash
#
# ============================================================================
# Docker Compose Build Coverage Checker
# ============================================================================
#
# DESCRIPTION:
#   Validates that every docker-compose.yml file in your project has a
#   corresponding build task defined in your Taskfiles.
#
# USAGE:
#   bash check-build-coverage.sh
#   task devsecops:test:check:build-coverage
#
# ENVIRONMENT VARIABLES:
#   TASK_PREFIX              Task name prefix (default: "project")
#   TASK_BUILD_KEYWORD       Build action keyword (default: "build")
#   SCAN_DIR                 Directory to scan (default: "project/")
#   GITIGNORE_FILE           Path to .gitignore for exclusions (default: ".gitignore")
#   PROJECT_ROOT             Project root path (default: current directory)
#   TASK_PATTERN_1           Custom pattern format (advanced)
#   TASK_PATTERN_2           Custom pattern format (advanced)
#
# HOW IT WORKS:
#   1. Scans for all docker-compose*.yml files in SCAN_DIR
#   2. Excludes paths listed in .gitignore automatically
#   3. Parses Taskfile namespaces from includes
#   4. Extracts all matching build tasks from Taskfiles
#   5. Verifies that each compose file has a corresponding task
#   6. Reports coverage percentage and missing tasks
#
# EXIT CODES:
#   0  All Docker Compose files have an associated build task (or no Docker Compose files found)
#   1  At least one Docker Compose file is missing a build task
#
# EXAMPLES:
#   # Default configuration (expects project:build:component)
#   bash check-build-coverage.sh
#
#   # Custom convention
#   TASK_PREFIX="app" TASK_BUILD_KEYWORD="compile" bash check-build-coverage.sh
#
#   # Disable validation
#   TASK_DEVSECOPS_TEST_BUILD_COVERAGE_ENABLED=false task devsecops:test:check:build-coverage
#
# EXPECTED TASK NAMING:
#   With namespace "project:" defined in main Taskfile.yml:
#
#   project/docker-compose.yml           → expects: project:build
#                                           create in project/Taskfile.yml: "build:"
#
#   project/backend/docker-compose.yml   → expects: project:build:backend
#                                           create in project/Taskfile.yml: "build:backend:" or "backend:build:"
#
#   project/frontend/docker-compose.yml  → expects: project:build:frontend
#                                           create in project/Taskfile.yml: "build:frontend:" or "frontend:build:"
#
#   Note: The "project:" prefix comes from the namespace in the main Taskfile,
#         not from the task name itself!
#
# ============================================================================

set -euo pipefail

# Environment variables with defaults
PROJECT_ROOT="${PROJECT_ROOT:-$(pwd)}"
SCAN_DIR="${SCAN_DIR:-$PROJECT_ROOT/project}"
GITIGNORE_FILE="${GITIGNORE_FILE:-$PROJECT_ROOT/.gitignore}"

# Task naming convention (customizable)
TASK_PREFIX="${TASK_PREFIX:-project}"
TASK_BUILD_KEYWORD="${TASK_BUILD_KEYWORD:-build}"
# Pattern formats: {prefix}:{build}:{component} or {prefix}:{component}:{build}
TASK_PATTERN_1="${TASK_PATTERN_1:-\$TASK_PREFIX:\$TASK_BUILD_KEYWORD:\$component}"
TASK_PATTERN_2="${TASK_PATTERN_2:-\$TASK_PREFIX:\$component:\$TASK_BUILD_KEYWORD}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counters
total_compose_files=0
missing_build_tasks=0

# Build find exclusions from .gitignore
find_excludes=()
if [ -f "$GITIGNORE_FILE" ]; then
  while IFS= read -r line; do
    # Skip empty lines and comments
    [[ -z "$line" || "$line" =~ ^# ]] && continue
    # Remove trailing slash and add to exclusions
    pattern="${line%/}"
    find_excludes+=(! -path "*/${pattern}/*")
  done <"$GITIGNORE_FILE"
fi

echo -e "${BLUE}🔍 Scanning for Docker Compose files in ${SCAN_DIR#"$PROJECT_ROOT"/}...${NC}"

if [ ! -d "$SCAN_DIR" ]; then
  echo -e "${RED}❌ Directory $SCAN_DIR does not exist${NC}"
  exit 1
fi

# Find all docker-compose*.yml files
mapfile -t compose_files < <(find "$SCAN_DIR" -type f \
  \( -name "docker-compose.yml" -o -name "docker-compose.*.yml" \) \
  "${find_excludes[@]}" |
  sort)

if [ ${#compose_files[@]} -eq 0 ]; then
  echo -e "${GREEN}✅ No Docker Compose files found (project does not use Docker Compose)${NC}"
  exit 0
fi

echo -e "${GREEN}✓ ${#compose_files[@]} Docker Compose file(s) found${NC}\n"

# Extract all build tasks matching the configured patterns
echo -e "${BLUE}🔍 Extracting build tasks from Taskfiles...${NC}"

# First, extract includes/namespaces from main Taskfile
declare -A namespace_map
if [ -f "$PROJECT_ROOT/Taskfile.yml" ]; then
  current_namespace=""
  while IFS= read -r line; do
    # Match lines like "  project:" or "  namespace:"
    if [[ "$line" =~ ^[[:space:]]+([a-zA-Z0-9_-]+):[[:space:]]*$ ]]; then
      current_namespace="${BASH_REMATCH[1]}"
    fi
    # Match lines like "    taskfile: path/to/Taskfile.yml"
    if [[ "$line" =~ ^[[:space:]]+taskfile:[[:space:]]+(.+)$ ]]; then
      taskfile_path="${BASH_REMATCH[1]}"
      if [ -n "$current_namespace" ]; then
        namespace_map["$PROJECT_ROOT/$taskfile_path"]="$current_namespace"
        current_namespace="" # Reset after mapping
      fi
    fi
  done <"$PROJECT_ROOT/Taskfile.yml"
fi

# Extract tasks and prefix them with their namespace
declare -a build_tasks

for taskfile in $(find "$PROJECT_ROOT" -type f \( -name "Taskfile.yml" -o -name "Taskfile.*.yml" \) "${find_excludes[@]}" | sort); do
  namespace="${namespace_map[$taskfile]:-}"

  # Extract exact "build:" task
  if grep -qE "^[[:space:]]+${TASK_BUILD_KEYWORD}:[[:space:]]*$" "$taskfile" 2>/dev/null; then
    if [ -n "$namespace" ]; then
      build_tasks+=("${namespace}:${TASK_BUILD_KEYWORD}")
    else
      build_tasks+=("${TASK_BUILD_KEYWORD}")
    fi
  fi

  # Extract "build:component:" tasks (e.g., build:backend:, build:redis:)
  while IFS= read -r component; do
    if [ -n "$namespace" ]; then
      build_tasks+=("${namespace}:${TASK_BUILD_KEYWORD}:${component}")
    else
      build_tasks+=("${TASK_BUILD_KEYWORD}:${component}")
    fi
  done < <(grep -hE "^[[:space:]]+${TASK_BUILD_KEYWORD}:[^:]+:" "$taskfile" 2>/dev/null | sed "s/^[[:space:]]*${TASK_BUILD_KEYWORD}://;s/:.*$//")

  # Extract "component:build:" tasks (e.g., backend:build:, redis:build:)
  while IFS= read -r component; do
    if [ -n "$namespace" ]; then
      build_tasks+=("${namespace}:${TASK_BUILD_KEYWORD}:${component}")
    else
      build_tasks+=("${TASK_BUILD_KEYWORD}:${component}")
    fi
  done < <(grep -hE "^[[:space:]]+[^:]+:${TASK_BUILD_KEYWORD}:[[:space:]]*$" "$taskfile" 2>/dev/null | sed "s/^[[:space:]]*//;s/:${TASK_BUILD_KEYWORD}:.*$//")
done

# Remove duplicates and sort
mapfile -t build_tasks < <(printf "%s\n" "${build_tasks[@]}" | sort -u)

echo -e "${GREEN}✓ ${#build_tasks[@]} build task(s) found${NC}"
if [ ${#build_tasks[@]} -gt 0 ]; then
  for task in "${build_tasks[@]}"; do
    echo "  - $task"
  done
fi
echo ""

# Extract expected task names for a compose file
# Returns both valid patterns based on TASK_PATTERN_1 and TASK_PATTERN_2
extract_expected_tasks() {
  local filepath="$1"
  local relative_path="${filepath#"$SCAN_DIR"/}"
  local component=""

  # Root docker-compose.yml
  if [[ "$relative_path" == "docker-compose.yml" ]]; then
    echo "${TASK_PREFIX}:${TASK_BUILD_KEYWORD}"
    return
  fi

  local dir
  local filename
  dir=$(dirname "$relative_path")
  filename=$(basename "$relative_path")
  component=$(echo "$dir" | cut -d'/' -f1)

  if [[ "$filename" == "docker-compose.yml" ]]; then
    # Generate both patterns
    eval echo "${TASK_PATTERN_1}"
    eval echo "${TASK_PATTERN_2}"
  fi
}

# Verify each Docker Compose file
echo -e "${BLUE}🔍 Verifying build coverage...${NC}\n"

for compose_file in "${compose_files[@]}"; do
  ((total_compose_files++)) || true

  relative_path="${compose_file#"$PROJECT_ROOT"/}"
  mapfile -t expected_tasks < <(extract_expected_tasks "$compose_file")

  # Search for matching task
  task_found=false
  matched_task=""
  for expected in "${expected_tasks[@]}"; do
    for build_task in "${build_tasks[@]}"; do
      if [[ "$build_task" == "$expected" ]]; then
        task_found=true
        matched_task="$expected"
        break 2
      fi
    done
  done

  if $task_found; then
    echo -e "${GREEN}✓${NC} $relative_path"
    echo -e "  ${GREEN}→ Task found: $matched_task${NC}\n"
  else
    echo -e "${RED}✗${NC} $relative_path"
    echo -e "  ${RED}→ Missing task: ${expected_tasks[0]}${NC}\n"
    ((missing_build_tasks++)) || true
  fi
done

# Summary
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}📊 Summary${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "Total Docker Compose files: $total_compose_files"
echo -e "Missing build tasks: ${RED}$missing_build_tasks${NC}"
echo -e "Coverage: $(((total_compose_files - missing_build_tasks) * 100 / total_compose_files))%"

if [ $missing_build_tasks -eq 0 ]; then
  echo -e "\n${GREEN}✅ All Docker Compose files have an associated build task!${NC}"
  exit 0
else
  echo -e "\n${RED}❌ Missing build tasks detected${NC}\n"

  # Find the taskfile for the current namespace to give helpful hint
  scan_dir_name=$(basename "$SCAN_DIR")
  taskfile_path="${SCAN_DIR}/Taskfile.yml"

  if [ -f "$taskfile_path" ]; then
    echo -e "${YELLOW}📝 Quick Fix:${NC} Add tasks to ${BLUE}${scan_dir_name}/Taskfile.yml${NC}"
    echo ""
    echo -e "${YELLOW}Example for backend:${NC}"
    echo -e "${GREEN}  ${TASK_BUILD_KEYWORD}:backend:${NC}"
    echo -e "${GREEN}    cmds:${NC}"
    echo -e "${GREEN}      - docker compose -f backend/docker-compose.yml build${NC}"
  else
    echo -e "${YELLOW}💡 Tip: Create tasks in your Taskfiles${NC}"
    echo -e "${YELLOW}    Expected: ${TASK_PREFIX}:${TASK_BUILD_KEYWORD}:component or ${TASK_PREFIX}:component:${TASK_BUILD_KEYWORD}${NC}"
  fi

  echo ""
  exit 1
fi
