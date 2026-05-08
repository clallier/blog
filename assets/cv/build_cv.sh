#!/bin/bash

# Ensure Typst is installed
if ! command -v typst &> /dev/null; then
    echo "Typst not found. Please install it (brew install typst)."
    exit 1
fi

# Font management
FONT_DIR="./fonts"
if [ ! -d "$FONT_DIR" ] || [ -z "$(ls -A $FONT_DIR)" ]; then
    echo "Fonts not found. Downloading Roboto family..."
    mkdir -p "$FONT_DIR"
    # Using a direct download link for Roboto
    curl -L "https://github.com/googlefonts/roboto/releases/download/v2.138/roboto-unhinted.zip" -o "$FONT_DIR/roboto.zip"
    unzip -q "$FONT_DIR/roboto.zip" -d "$FONT_DIR"
    rm "$FONT_DIR/roboto.zip"
    echo "Fonts installed."
fi

OUTPUT_DIR="../pdf"
mkdir -p "$OUTPUT_DIR"

# Compile both versions
echo "Generating PDFs..."
# We use the local fonts folder to ensure portability
typst compile cv.typ --font-path "$FONT_DIR" --input language=fr "$OUTPUT_DIR/Corentin_Lallier_CV_FR.pdf"
typst compile cv.typ --font-path "$FONT_DIR" --input language=en "$OUTPUT_DIR/Corentin_Lallier_CV_EN.pdf"

echo "Done! Check your pdf directory ($OUTPUT_DIR)."
