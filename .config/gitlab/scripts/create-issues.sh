#!/bin/bash
# Idempotent GitLab issue creation/update script
# Prerequisites: glab CLI installed and authenticated
# Usage: ./create-issues.sh [--dry-run] [file.md]
# Examples:
#   ./create-issues.sh --dry-run                    # Dry-run on all files
#   ./create-issues.sh --dry-run 054-erreurs-apm.md # Dry-run on a single file
#   ./create-issues.sh 054-erreurs-apm.md           # Execute on a single file
#   ./create-issues.sh                              # Execute on all files

set -e

DRY_RUN=false
TARGET_FILE=""

# Parse arguments
for arg in "$@"; do
  if [[ "$arg" == "--dry-run" ]]; then
    DRY_RUN=true
  elif [[ "$arg" == *.md ]]; then
    TARGET_FILE="$arg"
  fi
done

[ "$DRY_RUN" = true ] && echo "Mode dry-run activé - aucune issue ne sera créée/modifiée"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Determine files to process
if [ -n "$TARGET_FILE" ]; then
  # Specific file
  if [[ "$TARGET_FILE" != /* ]]; then
    TARGET_FILE="$SCRIPT_DIR/$TARGET_FILE"
  fi
  if [ ! -f "$TARGET_FILE" ]; then
    echo "❌ Fichier non trouvé : $TARGET_FILE"
    exit 1
  fi
  FILES=("$TARGET_FILE")
  echo "📄 Traitement d'un seul fichier : $(basename "$TARGET_FILE")"
  echo ""
else
  # All .md files
  FILES=("$SCRIPT_DIR"/*.md)
  echo "📁 Traitement de tous les fichiers .md"
  echo ""
fi
# Function to insert issue_id in front matter
insert_issue_id() {
  local file="$1"
  local issue_id="$2"
  # Insert issue_id after the labels: line
  sed -i "/^labels:/a issue_id: $issue_id" "$file"
}

# Process selected files
for file in "${FILES[@]}"; do
  [ -e "$file" ] || continue

  filename=$(basename "$file")
  echo "=== Traitement de $filename ==="

  # Extract title from YAML front matter
  title=$(grep -A1 "^---$" "$file" | grep "^title:" | sed 's/title: *"\(.*\)"/\1/' | sed "s/title: *'\(.*\)'/\1/")

  if [ -z "$title" ]; then
    echo "⚠️  Pas de titre trouvé, skip"
    continue
  fi

  # Extract existing issue_id (if present)
  existing_id=$(grep "^issue_id:" "$file" 2>/dev/null | sed 's/issue_id: *//' || echo "")

  # Extract labels
  labels=$(grep "^labels:" "$file" | sed 's/labels: *\[//' | sed 's/\]//' | tr -d '"' | tr -d "'" | tr ',' '\n' | sed 's/^ *//' | paste -sd',' -)

  # Extract description (everything after the second ---)
  # Find the second --- line and take everything after
  second_delimiter=$(grep -n "^---$" "$file" | sed -n '2p' | cut -d: -f1)
  if [ -n "$second_delimiter" ]; then
    description=$(tail -n +$((second_delimiter + 1)) "$file")
  else
    description=""
  fi

  echo "Titre: $title"
  echo "Labels: $labels"
  [ -n "$existing_id" ] && echo "Issue ID existant: #$existing_id"
  echo "---"

  if [ "$DRY_RUN" = true ]; then
    # Description preview (first 5 non-empty lines)
    desc_preview=$(echo "$description" | grep -v '^$' | head -5)
    echo "Description (aperçu) :"
    echo "$desc_preview"
    echo "[...]"
    echo ""
    if [ -n "$existing_id" ]; then
      echo "[DRY-RUN] glab issue update $existing_id --title \"$title\" --label \"$labels\" --description \"...\""
    else
      echo "[DRY-RUN] glab issue create --title \"$title\" --label \"$labels\" --description \"...\""
    fi
  else
    if [ -n "$existing_id" ]; then
      # Update existing issue
      glab issue update "$existing_id" \
        --title "$title" \
        --label "$labels" \
        --description "$description"

      echo "🔄 Issue #$existing_id mise à jour"
    else
      # Create issue and retrieve ID
      output=$(glab issue create \
        --title "$title" \
        --label "$labels" \
        --description "$description" 2>&1)

      # Extract created issue ID (format: https://gitlab.com/.../issues/123)
      new_id=$(echo "$output" | grep -oE '/issues/[0-9]+' | grep -oE '[0-9]+' | head -1)

      if [ -n "$new_id" ]; then
        insert_issue_id "$file" "$new_id"
        echo "✅ Issue #$new_id créée et ID ajouté au fichier"
      else
        echo "✅ Issue créée (ID non récupéré)"
        echo "   Output: $output"
      fi
    fi
  fi

  echo ""
done

echo "=== Terminé ==="
