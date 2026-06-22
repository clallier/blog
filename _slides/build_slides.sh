#!/bin/bash
set -e

# Dynamically resolve script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Building Slidev presentations..."
for dir in "$SCRIPT_DIR"/*; do
  if [ -d "$dir" ] && [ -f "$dir/slides.md" ]; then
    name=$(basename "$dir")
    # Skip any non-presentation directories if needed
    if [ "$name" = "_slidev_addons" ] || [ "$name" = "__pycache__" ]; then
      continue
    fi
    echo ">>> Cleaning and building Slidev presentation: $name"
    rm -rf "$SCRIPT_DIR/../presentations/$name"
    npx @slidev/cli build "$dir/slides.md" --out "$SCRIPT_DIR/../presentations/$name" --base "./"
  fi
done

echo "All slide builds completed successfully!"
