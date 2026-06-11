#!/usr/bin/env python3
"""
SVG Converter & Optimizer for Vue Components / Slidev

This script cleans SVG strings or files:
1. Removes all sodipodi/inkscape metadata, attributes, and tags.
2. Replaces all instances of prefix__ with a unique hash/prefix based on the file's content or name.
3. Automatically appends 'px' to font-size values that lack units (e.g. font-size="12" -> font-size="12px" or in style blocks).
4. Replaces black/near-black colors with 'currentColor' for adaptive light/dark browser theme.
"""

import re
import sys
import os
import hashlib

# Mapping of SVG filenames to project folders
PROJECT_MAPPING = {
    # vector-search-101
    "qkv": "vector-search-101",
    "qkv_inverted_idx": "vector-search-101",
    "qkv_semantic_search": ["vector-search-101", "rag-advanced"],
    # llm-fundamentals
    "generation": "llm-fundamentals",
    "perplexity_bigram_model": "llm-fundamentals",
    "perplexity_neural_net": "llm-fundamentals",
    "perplexity_trigram_model": "llm-fundamentals",
    # augmented-llms-agents
    "agent_react": "augmented-llms-agents",
    "memory_diagram": "augmented-llms-agents",
    "toolcalls_diagram": "augmented-llms-agents",
}



def to_snake_case(s: str) -> str:
    """Converts a string to snake_case format.

    Strips whitespace, replaces non-alphanumeric chars with spaces,
    and joins words with underscores in lowercase.

    Args:
        s (str): The input string to convert.

    Returns:
        str: The snake_case formatted string.

    Errors:
        None.

    Examples:
        >>> to_snake_case("Tokens Dictionary")
        'tokens_dictionary'
    """
    s = s.strip()
    s = re.sub(r"[^a-zA-Z0-9]+", " ", s)
    words = s.split()
    if not words:
        return ""
    return "_".join(word.lower() for word in words)


def to_camel_case(s: str) -> str:
    """Converts a string to CamelCase (PascalCase) format.

    Strips whitespace, replaces non-alphanumeric chars with spaces,
    and concatenates them to form a CamelCase string. Fully uppercase
    acronyms (e.g. QKV) are preserved as uppercase.

    Args:
        s (str): The input string to convert.

    Returns:
        str: The CamelCase formatted string.

    Errors:
        None.

    Examples:
        >>> to_camel_case("tokens_dictionary")
        'TokensDictionary'
        >>> to_camel_case("QKV_semantic_search")
        'QKVSemanticSearch'
    """
    s = s.strip()
    s = re.sub(r"[^a-zA-Z0-9]+", " ", s)
    words = s.split()
    if not words:
        return ""
    return "".join(word if word.isupper() else word.capitalize() for word in words)




def normalize_inkscape_labels(svg_content: str) -> str:
    """Uses inkscape:label attributes as element IDs and updates references.

    Extracts labels, converts them to snake_case, maps them to IDs, and updates
    internal SVG references pointing to the old IDs.

    Args:
        svg_content (str): The raw SVG content.

    Returns:
        str: The updated SVG content.

    Errors:
        None.

    Examples:
        >>> normalize_inkscape_labels('<rect inkscape:label="My Rect"/>')
        '<rect id="my_rect" inkscape:label="My Rect"/>'
    """
    id_remaps = {}

    def process_labels(match):
        tag_content = match.group(0)
        label_match = re.search(r'\binkscape:label\s*=\s*(["\'])(.*?)\1', tag_content)
        if not label_match:
            return tag_content
        new_id = to_snake_case(label_match.group(2))
        if not new_id:
            return tag_content
        id_match = re.search(r'\bid\s*=\s*(["\'])(.*?)\1', tag_content)
        if id_match:
            old_id = id_match.group(2)
            if old_id != new_id:
                id_remaps[old_id] = new_id
                tag_content = tag_content.replace(id_match.group(0), f'id="{new_id}"')
        else:
            tag_name_match = re.match(r'^<([a-zA-Z0-9:-]+)', tag_content)
            if tag_name_match:
                tag_content = tag_content.replace(
                    tag_name_match.group(0),
                    f'{tag_name_match.group(0)} id="{new_id}"',
                    1,
                )
        return tag_content

    cleaned = re.sub(r'<[a-zA-Z0-9:-]+(?:\s+[^>]*?)?>', process_labels, svg_content)
    for old_id, new_id in id_remaps.items():
        cleaned = re.sub(rf'url\(\s*#{re.escape(old_id)}\s*\)', f'url(#{new_id})', cleaned)
        cleaned = re.sub(
            rf'\b(xlink:)?href\s*=\s*(["\'])#{re.escape(old_id)}\2',
            rf"\1href=\2#{new_id}\2",
            cleaned,
        )
    return cleaned


def localize_ids(svg_content: str, filename_hint: str) -> str:
    """Localizes SVG ID definitions and references using a short unique prefix.

    Replaces 'prefix__' with a unique hash prefix based on the filename hint,
    and prepends this prefix to other non-namespaced IDs.

    Args:
        svg_content (str): The SVG string content.
        filename_hint (str): Hint string to generate the unique prefix.

    Returns:
        str: The SVG content with localized IDs and references.

    Errors:
        None.

    Examples:
        >>> localize_ids('<g id="my-id"/>', 'sample')
        '<g id="svg_5e8ff9_my-id"/>'
    """
    hash_digest = hashlib.md5(filename_hint.encode("utf-8")).hexdigest()[:6]
    unique_prefix = f"svg_{hash_digest}_"
    cleaned = svg_content.replace("prefix__", unique_prefix)
    all_ids = set(re.findall(r'\bid\s*=\s*["\']([^"\']+)["\']', cleaned))
    for original_id in all_ids:
        if original_id.startswith(unique_prefix):
            continue
        new_id = f"{unique_prefix}{original_id}"
        cleaned = re.sub(
            rf'\bid\s*=\s*(["\']){re.escape(original_id)}\1',
            rf"id=\1{new_id}\1",
            cleaned,
        )
        cleaned = re.sub(
            rf"url\(\s*#{re.escape(original_id)}\s*\)", rf"url(#{new_id})", cleaned
        )
        cleaned = re.sub(
            rf'\b(xlink:)?href\s*=\s*(["\'])#{re.escape(original_id)}\2',
            rf"\1href=\2#{new_id}\2",
            cleaned,
        )
    return cleaned


def remove_metadata_and_inkscape_attributes(svg_content: str) -> str:
    """Removes sodipodi/inkscape metadata, attributes, and tags.

    Args:
        svg_content (str): The raw SVG string.

    Returns:
        str: SVG string without editor-specific metadata.

    Errors:
        None.

    Examples:
        >>> remove_metadata_and_inkscape_attributes('<rect inkscape:label="my-rect"/>')
        '<rect/>'
    """
    cleaned = re.sub(r'\s+(inkscape|sodipodi):[a-zA-Z0-9-]+="[^"]*"', "", svg_content)
    cleaned = re.sub(r'\s+xmlns:(inkscape|sodipodi)="[^"]*"', "", cleaned)
    cleaned = re.sub(r"<metadata>.*?</metadata>", "", cleaned, flags=re.DOTALL)
    cleaned = re.sub(
        r"<sodipodi:namedview.*?>.*?</sodipodi:namedview>",
        "",
        cleaned,
        flags=re.DOTALL,
    )
    cleaned = re.sub(r"<sodipodi:namedview[^>]*/>", "", cleaned, flags=re.DOTALL)
    cleaned = re.sub(
        r"<sodipodi:namedview[^>]*>.*?</sodipodi:namedview>",
        "",
        cleaned,
        flags=re.DOTALL,
    )
    cleaned = re.sub(r'-inkscape-font-specification:[^;"]*;?', "", cleaned)
    return cleaned


def normalize_font_sizes(svg_content: str) -> str:
    """Appends 'px' units to font-size attributes/styles lacking units.

    Args:
        svg_content (str): The SVG string.

    Returns:
        str: SVG string with normalized font size units.

    Errors:
        None.

    Examples:
        >>> normalize_font_sizes('font-size="12"')
        'font-size="12px"'
    """
    cleaned = re.sub(r'font-size="([0-9.]+)"', r'font-size="\1px"', svg_content)
    cleaned = re.sub(
        r"font-size:\s*([0-9.]+)(?![0-9.a-zA-Z%])", r"font-size:\1px", cleaned
    )
    return cleaned


def adapt_colors_for_dark_mode(svg_content: str) -> str:
    """Replaces black and near-black colors with 'currentColor'.

    Allows SVG colors to adapt dynamically to browser/app light/dark mode themes.

    Args:
        svg_content (str): The SVG string.

    Returns:
        str: SVG string with adaptive colors.

    Errors:
        None.

    Examples:
        >>> adapt_colors_for_dark_mode('fill="#000000"')
        'fill="currentColor"'
    """
    cleaned = re.sub(
        r'fill:\s*(?:#000000|#000|black)(?=[;"\s])', "fill:currentColor", svg_content
    )
    cleaned = re.sub(
        r'stroke:\s*(?:#000000|#000|black)(?=[;"\s])',
        "stroke:currentColor",
        cleaned,
    )
    cleaned = re.sub(r'fill="(?:#000000|#000|black)"', 'fill="currentColor"', cleaned)
    cleaned = re.sub(
        r'stroke="(?:#000000|#000|black)"', 'stroke="currentColor"', cleaned
    )
    cleaned = re.sub(r"#000000", "currentColor", cleaned)
    cleaned = re.sub(r"#000;([^\w])", r"currentColor;\1", cleaned)
    cleaned = re.sub(r'=\s*["\']black["\']', '="currentColor"', cleaned)
    return cleaned


def add_v_click_attributes(svg_content: str) -> str:
    """Adds v-click attributes to tags based on inkscape:label __step_{n} suffix.

    Parses SVG tag contents looking for inkscape:label attributes that end with
    __step_{n} (where n is a number). If found, it injects v-click="n" into the tag.

    Args:
        svg_content (str): The raw SVG content string.

    Returns:
        str: The SVG content string with v-click attributes injected.

    Errors:
        None.

    Examples:
        >>> add_v_click_attributes('<rect inkscape:label="my_rect__step_3"/>')
        '<rect v-click="3" inkscape:label="my_rect__step_3"/>'
    """
    def inject_v_click(match):
        tag = match.group(0)
        lbl = re.search(r'\binkscape:label\s*=\s*(["\'])(.*?)\1', tag)
        if not lbl:
            return tag
        step = re.search(r'__step_(\d+)$', lbl.group(2))
        if not step:
            return tag
        tag_name = re.match(r'^<([a-zA-Z0-9:-]+)', tag)
        if tag_name:
            prefix = tag_name.group(0)
            return tag.replace(prefix, f'{prefix} v-click="{step.group(1)}"', 1)
        return tag

    return re.sub(r'<[a-zA-Z0-9:-]+(?:\s+[^>]*?)?>', inject_v_click, svg_content)


def clean_xml_headers(content: str) -> str:
    """Removes leading XML declarations and HTML/XML comments from the content.

    Strips out lines or blocks matching XML declarations (<?xml ... ?>) and comments
    (<!-- ... -->) at the start of the string.

    Args:
        content (str): The SVG content string.

    Returns:
        str: The content with initial XML declarations and comments removed.

    Errors:
        None.

    Examples:
        >>> clean_xml_headers('<?xml version="1.0"?><!-- comment --><svg></svg>')
        '<svg></svg>'
    """
    content = re.sub(r'^\s*<\?xml\s+[^>]*\?>', '', content, flags=re.IGNORECASE)
    while True:
        stripped = content.strip()
        if stripped.startswith('<!--'):
            end_idx = stripped.find('-->')
            if end_idx != -1:
                content = stripped[end_idx + 3:]
                continue
        break
    return content.strip()


def export_to_vue(content: str, file_path: str) -> None:
    """Exports cleaned SVG content as a Vue template component.

    Strips XML headers/comments, wraps the remaining SVG in <template> tags,
    and writes it to a CamelCase Vue file in the project's components directory.

    Args:
        content (str): The cleaned SVG content.
        file_path (str): The path to the original SVG file.

    Returns:
        None.

    Errors:
        OSError: If writing to the Vue file fails.

    Examples:
        # export_to_vue('<svg></svg>', 'path/to/my-file.svg')
    """
    base = os.path.splitext(os.path.basename(file_path))[0]
    camel_name = to_camel_case(base)
    projects = PROJECT_MAPPING.get(base.lower())
    
    if not projects:
        projects = [os.path.dirname(file_path)]
    elif isinstance(projects, str):
        projects = [projects]
        
    script_dir = os.path.dirname(os.path.abspath(__file__))
    body = clean_xml_headers(content)
    vue_content = f"<template>\n{body}\n</template>\n"

    for proj in projects:
        if proj == os.path.dirname(file_path) or os.path.isabs(proj):
            vue_dir = proj
        else:
            vue_dir = os.path.join(script_dir, proj, "components")
        
        vue_path = os.path.join(vue_dir, f"{camel_name}.vue")
        os.makedirs(vue_dir, exist_ok=True)
        with open(vue_path, "w", encoding="utf-8") as f:
            f.write(vue_content)
        print(f"Successfully exported Vue component to {vue_path}")




def normalize_root_svg_dimensions(svg_content: str) -> str:
    """Normalizes the width and height attributes of the root <svg> tag.

    Role: Scales the root <svg> tag's width and height attributes to fit
    within a standard 1280x900px canvas while preserving the aspect ratio
    derived from the viewBox. This ensures consistent layout scaling when
    CSS constraints (like max-h-2/5) are applied in Slidev.
    How it works: It parses the viewBox, calculates the scale factor to fit
    within 1280x900, computes the new width/height, removes existing attributes,
    and injects the normalized width and height.

    Args:
        svg_content (str): The raw SVG XML content to process.

    Returns:
        str: The modified SVG content with normalized width and height.

    Errors:
        None.

    Examples:
        >>> normalize_root_svg_dimensions('<svg viewBox="0 0 100 100"></svg>')
        '<svg width="900" height="900" viewBox="0 0 100 100"></svg>'
    """
    match = re.search(r'(<svg\b[^>]*>)', svg_content, re.IGNORECASE | re.DOTALL)
    if not match:
        return svg_content
    svg_tag = match.group(1)
    viewbox_match = re.search(
        r'\bviewBox\s*=\s*(["\'])\s*(-?[\d.]+)\s+(-?[\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\1',
        svg_tag,
        re.IGNORECASE
    )
    if not viewbox_match:
        width, height = "100%", "100%"
    else:
        vb_w = float(viewbox_match.group(4))
        vb_h = float(viewbox_match.group(5))
        if vb_w > 0 and vb_h > 0:
            scale = min(1280.0 / vb_w, 900.0 / vb_h)
            width = f"{round(vb_w * scale, 3)}"
            height = f"{round(vb_h * scale, 3)}"
        else:
            width, height = "100%", "100%"
    cleaned_tag = re.sub(r'\bwidth\s*=\s*(["\']).*?\1', '', svg_tag, flags=re.IGNORECASE)
    cleaned_tag = re.sub(r'\bheight\s*=\s*(["\']).*?\1', '', cleaned_tag, flags=re.IGNORECASE)
    new_svg_tag = re.sub(r'^<svg', f'<svg width="{width}" height="{height}"', cleaned_tag, flags=re.IGNORECASE)
    return svg_content.replace(svg_tag, new_svg_tag, 1)





def clean_svg_content(svg_content: str, filename_hint: str = "svg") -> str:
    """Cleans, optimizes, and adapts an SVG string for dark mode and Slidev/Vue usage.

    This function coordinates the conversion steps by calling specialized,
    under-20-line, deterministic functions for ID normalization, localization,
    metadata/attribute removal, font size normalization, and color mapping.

    Args:
        svg_content (str): The raw SVG/Vue component file content.
        filename_hint (str, optional): A string used to generate the unique ID prefix. Defaults to "svg".

    Returns:
        str: The optimized SVG/Vue component file content.

    Errors:
        None.

    Examples:
        >>> clean_svg_content("<svg></svg>", "sample")
        '<svg></svg>'
    """
    cleaned = add_v_click_attributes(svg_content)
    cleaned = normalize_inkscape_labels(cleaned)
    cleaned = localize_ids(cleaned, filename_hint)
    cleaned = remove_metadata_and_inkscape_attributes(cleaned)
    cleaned = normalize_font_sizes(cleaned)
    cleaned = adapt_colors_for_dark_mode(cleaned)
    cleaned = normalize_root_svg_dimensions(cleaned)
    return cleaned




def process_file(file_path: str, debug: bool = False) -> None:
    """Processes a single SVG or Vue file, cleaning and potentially exporting it.

    Reads the file path, runs SVG cleaning, and writes the output. If it is
    a standard SVG, also triggers Vue component export. Writes .min.svg file
    only if debug mode is active.

    Args:
        file_path (str): Path to the input file.
        debug (bool): Active debug flag. Defaults to False.

    Returns:
        None.

    Errors:
        OSError: If reading or writing files fails.

    Examples:
        # process_file('path/to/my-file.svg', debug=True)
    """
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}", file=sys.stderr)
        return

    print(f"Processing: {file_path}")
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    base_name = os.path.splitext(os.path.basename(file_path))[0]
    cleaned = clean_svg_content(content, filename_hint=base_name)

    is_standard_svg = file_path.endswith(".svg") and not file_path.endswith(".min.svg")

    if is_standard_svg:
        export_to_vue(cleaned, file_path)

    if debug:
        output_path = file_path.replace(".svg", ".min.svg") if is_standard_svg else file_path
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(cleaned)
        print(f"Successfully optimized to {output_path}")



def main() -> None:
    """Main CLI entry point to clean file(s) in-place.

    Parses command line arguments and triggers processing for each file.
    Supports a --debug flag to export .min.svg files.

    Args:
        None.

    Returns:
        None.

    Errors:
        SystemExit: If no arguments are provided.

    Examples:
        >>> # Called via command line: python convert_svg.py --debug my-file.svg
    """
    if len(sys.argv) < 2:
        print("Usage: python3 convert_svg.py [--debug] <file1> [<file2>...]")
        sys.exit(1)

    args = sys.argv[1:]
    debug = False
    if "--debug" in args:
        debug = True
        args.remove("--debug")

    for file_path in args:
        process_file(file_path, debug=debug)



if __name__ == "__main__":
    main()

