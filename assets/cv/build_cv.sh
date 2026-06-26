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

# Copy Font Awesome from system to local fonts directory if present
for font_file in "Font Awesome 7 Free-Regular-400.otf" "Font Awesome 7 Free-Solid-900.otf" "Font Awesome 7 Brands-Regular-400.otf"; do
    if [ -f "$HOME/Library/Fonts/$font_file" ] && [ ! -f "$FONT_DIR/$font_file" ]; then
        echo "Copying $font_file from system..."
        cp "$HOME/Library/Fonts/$font_file" "$FONT_DIR/"
    fi
done


OUTPUT_DIR="../pdf"
mkdir -p "$OUTPUT_DIR"

# Compile both versions
echo "Generating PDFs..."
# We use the local fonts folder to ensure portability

# --- Private Versions (Full details) ---
typst compile cv.typ --font-path "$FONT_DIR" --input language=fr "$OUTPUT_DIR/Corentin_Lallier_CV_FR.pdf"
typst compile cv.typ --font-path "$FONT_DIR" --input language=en "$OUTPUT_DIR/Corentin_Lallier_CV_EN.pdf"
# typst compile letter.typ --font-path "$FONT_DIR" "$OUTPUT_DIR/Corentin_Lallier_Letter_PhantomBuster.pdf"
# typst compile letter_mirakl.typ --font-path "$FONT_DIR" "$OUTPUT_DIR/Corentin_Lallier_Letter_Mirakl.pdf"
# typst compile letter_tiine.typ --font-path "$FONT_DIR" "$OUTPUT_DIR/Corentin_Lallier_Letter_Tiine.pdf"
# typst compile letter_dd.typ --font-path "$FONT_DIR" "$OUTPUT_DIR/Corentin_Lallier_Letter_DataDog.pdf"

# --- Public Versions (Privacy Masked) ---
typst compile cv.typ --font-path "$FONT_DIR" --input language=fr --input privacy=true "$OUTPUT_DIR/Corentin_Lallier_CV_FR_Public.pdf"
typst compile cv.typ --font-path "$FONT_DIR" --input language=en --input privacy=true "$OUTPUT_DIR/Corentin_Lallier_CV_EN_Public.pdf"

echo "Done! Check your pdf directory ($OUTPUT_DIR)."
