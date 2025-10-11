#!/usr/bin/env bash

# Clean exposed secrets from Git history
# This script removes a file from the entire Git history and forces push

set -euo pipefail

# Colors for display
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

FILE_TO_REMOVE="${1:-}"

if [ -z "$FILE_TO_REMOVE" ]; then
  echo -e "${RED}❌ Error: No file specified${NC}"
  echo "Usage: $0 <path/to/file>"
  echo "Example: $0 project/datawarehouse-db/sql/init_postgres_fdw.sql"
  exit 1
fi

echo -e "${YELLOW}⚠️  WARNING: Destructive operation!${NC}"
echo -e "${YELLOW}   This script will rewrite the entire Git history.${NC}"
echo ""
echo "File to remove: ${FILE_TO_REMOVE}"
echo ""
echo -e "${YELLOW}Prerequisites:${NC}"
echo "  1. All collaborators must have pushed their changes"
echo "  2. All collaborators will need to re-clone the repository after force push"
echo "  3. Exposed credentials must be revoked"
echo ""
read -p "Continue? (yes/no) " -r
echo ""

if [[ ! $REPLY =~ ^(yes|y)$ ]]; then
  echo -e "${YELLOW}⚠️  Operation cancelled${NC}"
  exit 0
fi

echo -e "${GREEN}🔄 Cleaning Git history...${NC}"

# Use git filter-repo if available (recommended)
if command -v git-filter-repo &>/dev/null; then
  echo "Using git-filter-repo (recommended method)"
  git filter-repo --path "$FILE_TO_REMOVE" --invert-paths --force
else
  echo -e "${YELLOW}⚠️  git-filter-repo not found, using filter-branch (legacy method)${NC}"
  git filter-branch --force --index-filter \
    "git rm --cached --ignore-unmatch $FILE_TO_REMOVE" \
    --prune-empty --tag-name-filter cat -- --all

  # Clean references
  rm -rf .git/refs/original/
  git reflog expire --expire=now --all
  git gc --prune=now --aggressive
fi

echo -e "${GREEN}✅ History cleaned locally${NC}"
echo ""
echo -e "${YELLOW}⚠️  Next steps:${NC}"
echo "  1. Verify the file is no longer in history:"
echo "     git log --all --oneline --follow -- $FILE_TO_REMOVE"
echo ""
echo "  2. Force push to all branches (⚠️ DESTRUCTIVE):"
echo "     git push origin --force --all"
echo "     git push origin --force --tags"
echo ""
echo "  3. Inform all collaborators to:"
echo "     - Save their work in progress"
echo "     - Delete their local clone"
echo "     - Re-clone the repository"
echo ""
echo "  4. IMPORTANT: Revoke the exposed credentials!"
echo ""
