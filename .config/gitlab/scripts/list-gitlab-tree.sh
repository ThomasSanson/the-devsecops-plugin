#!/bin/bash
set -euo pipefail

# Script: list-gitlab-tree.sh
# Description: Lists all projects recursively for a given GitLab group in a tree-like format.
#              Includes dynamic progress using a spinner and page counter (x/y).
#              Can save output to a file (interactive or automated).
# Usage: ./list-gitlab-tree.sh [group_name] [--output <file>] [--yes]

# Function to display usage information
usage() {
  echo "Usage: $0 [group-name] [--output <file>] [--yes]"
  echo "Lists subgroups and projects for a GitLab group in a tree view."
  echo ""
  echo "Arguments:"
  echo "  group-name      The GitLab group to inspect (default: digital-commons)"
  echo "  --output, -o    Specify the output file path manually."
  echo "  --yes, -y       Non-interactive mode: accept default output file without prompting."
  echo "  --help, -h      Show this help message."
  echo ""
  echo "Examples:"
  echo "  $0 digital-commons --yes"
  echo "  $0 digital-commons --output my-tree.txt"
  exit 1
}

# Default values
ROOT_GROUP="digital-commons"
OUTPUT_FILE=""
CONFIRM_YES=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
  -h | --help)
    usage
    ;;
  -o | --output)
    OUTPUT_FILE="$2"
    shift # past argument
    shift # past value
    ;;
  -y | --yes)
    CONFIRM_YES=true
    shift # past argument
    ;;
  *)
    # invalid flag or positional argument
    if [[ "$key" == -* ]]; then
      echo "❌ Error: Unknown option $key"
      usage
    else
      ROOT_GROUP="$key"
      shift
    fi
    ;;
  esac
done

# Check dependencies
if ! command -v glab &>/dev/null; then
  echo "❌ Error: 'glab' CLI is not installed."
  echo "Please install it from https://gitlab.com/gitlab-org/cli"
  exit 1
fi
if ! command -v python3 &>/dev/null; then
  echo "❌ Error: 'python3' is not installed."
  exit 1
fi

# Determine Output File
DEFAULT_OUTPUT_DIR=".log"
DEFAULT_FILENAME="${DEFAULT_OUTPUT_DIR}/gitlab_tree_${ROOT_GROUP}.log"

if [[ -n "$OUTPUT_FILE" ]]; then
  # User specified an output file explicitly
  FINAL_OUTPUT="$OUTPUT_FILE"
else
  if [[ "$CONFIRM_YES" == "true" ]]; then
    # Automated mode, use default
    FINAL_OUTPUT="$DEFAULT_FILENAME"
  else
    # Interactive mode
    echo ""
    echo "📝 Output configuration:"
    # Prompt user
    read -r -p "   Enter output file path [default: ${DEFAULT_FILENAME}]: " USER_INPUT
    FINAL_OUTPUT="${USER_INPUT:-$DEFAULT_FILENAME}"
    echo ""
  fi
fi

# Ensure output directory exists
mkdir -p "$(dirname "$FINAL_OUTPUT")"

# Pass the group to the python script
export ROOT_GROUP

# Embedded Python script for fetching and rendering
PYTHON_SCRIPT='
import sys
import subprocess
import json
import os
import collections
import time
import re
import itertools

# Configuration
group = os.environ.get("ROOT_GROUP", "digital-commons")
per_page = 100
page = 1
all_paths = []
total_pages = "?"
spinner = itertools.cycle(["|", "/", "-", "\\"])

print(f"📂 GitLab Tree for: {group}", file=sys.stderr)
print(f"📡  Connecting to GitLab API...", file=sys.stderr)

try:
    while True:
        # Pause to avoid rate limits (DX request)
        if page > 1:
            time.sleep(1)

        # Spinner animation
        spin_char = next(spinner)

        # Prepare command
        get_headers = (page == 1)
        cmd = [
            "glab", "api",
            f"groups/{group}/projects?include_subgroups=true&per_page={per_page}&page={page}"
        ]
        if get_headers:
            cmd.append("--include")

        # Execute
        result = subprocess.run(cmd, capture_output=True, text=True)

        if result.returncode != 0:
            if page == 1:
                print(f"\n❌ Error: Could not fetch group \"{group}\".", file=sys.stderr)
                print(f"   Details: {result.stderr.strip()}", file=sys.stderr)
                sys.exit(1)
            else:
                print(f"\n⚠️  Warning: Error fetching page {page}. Incomplete results.", file=sys.stderr)
                break

        raw_output = result.stdout
        json_str = raw_output

        # If we requested headers, we need to separate them from the body
        if get_headers:
            parts = raw_output.split("\n\n", 1)
            if len(parts) == 1:
                parts = raw_output.split("\r\n\r\n", 1)

            if len(parts) >= 2:
                headers = parts[0]
                json_str = parts[1]
                match = re.search(r"(?i)^x-total-pages:\s*(\d+)", headers, re.MULTILINE)
                if match:
                    total_pages = match.group(1)
            else:
                json_str = raw_output

        # Parse JSON
        try:
            data = json.loads(json_str)
        except json.JSONDecodeError:
            start_idx = json_str.find("[")
            if start_idx == -1: start_idx = json_str.find("{")

            if start_idx != -1:
                try:
                    data = json.loads(json_str[start_idx:])
                except:
                    print(f"\n❌ Error: Invalid JSON response on page {page}.", file=sys.stderr)
                    sys.exit(1)
            else:
                if page == 1 and "404" in result.stderr:
                    print(f"\n❌ Error: Group not found.", file=sys.stderr)
                    sys.exit(1)
                print(f"\n❌ Error: Invalid JSON response on page {page}.", file=sys.stderr)
                sys.exit(1)

        # Check for API error object
        if isinstance(data, dict) and "message" in data:
            print(f"\n❌ GitLab API Error: {data['\''message'\'']}", file=sys.stderr)
            sys.exit(1)

        if not data:
            break

        # Collect paths
        batch_paths = [p["path_with_namespace"] for p in data if "path_with_namespace" in p]
        all_paths.extend(batch_paths)

        # Update Progress
        sys.stderr.write(f"\r{spin_char} ⏳ Fetching projects... Found: {len(all_paths)} | Page: {page}/{total_pages} ")
        sys.stderr.flush()

        if len(data) < per_page:
            break

        page += 1

except KeyboardInterrupt:
    print("\n\n🛑 Operation cancelled by user.", file=sys.stderr)
    sys.exit(130)

print(f"\n✅ Data fetched. Building tree view for {len(all_paths)} projects...\n", file=sys.stderr)

if not all_paths:
    print("   (No projects found)", file=sys.stderr)
    sys.exit(0)

# Tree Construction
def recursive_tree():
    return {"children": collections.defaultdict(recursive_tree), "type": "group"}

root = recursive_tree()

for path in all_paths:
    parts = path.split("/")
    current = root
    for i, part in enumerate(parts):
        current = current["children"][part]
        if i == len(parts) - 1:
            current["type"] = "project"

def print_tree(node, prefix=""):
    children_names = sorted(node["children"].keys())
    count = len(children_names)

    for i, name in enumerate(children_names):
        child_node = node["children"][name]
        is_last = (i == count - 1)

        icon = "📦 " if child_node["type"] == "project" else "📂 "
        connector = "└── " if is_last else "├── "

        print(f"{prefix}{connector}{icon}{name}")

        new_prefix = prefix + ("    " if is_last else "│   ")
        print_tree(child_node, new_prefix)

print(f"📂 GitLab Tree for: {group}")
print_tree(root)
'

echo "📄 Saving output to: $FINAL_OUTPUT"
if python3 -c "$PYTHON_SCRIPT" | tee "$FINAL_OUTPUT"; then
  echo ""
  echo "✨ Done! Output saved to: $FINAL_OUTPUT"
else
  exit 1
fi
