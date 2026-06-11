#!/usr/bin/env python3
"""Unit tests for convert_svg.py.

This test suite covers text conversion utilities, SVG cleaning features,
v-click attribute mapping, and XML template formatting.
"""

import unittest
from convert_svg import (
    to_snake_case,
    to_camel_case,
    add_v_click_attributes,
    clean_xml_headers,
    normalize_inkscape_labels,
    localize_ids,
    remove_metadata_and_inkscape_attributes,
    normalize_root_svg_dimensions,
)


class TestTextFormatting(unittest.TestCase):
    """Test case for case conversion utility functions."""

    def test_to_snake_case(self) -> None:
        """Verifies that strings are correctly formatted into snake_case.

        Args:
            None.

        Returns:
            None.
        """
        self.assertEqual(to_snake_case("Tokens Dictionary"), "tokens_dictionary")
        self.assertEqual(to_snake_case("my-label-123"), "my_label_123")

    def test_to_camel_case(self) -> None:
        """Verifies that strings are correctly formatted into PascalCase/CamelCase.

        Args:
            None.

        Returns:
            None.
        """
        self.assertEqual(to_camel_case("tokens_dictionary"), "TokensDictionary")
        self.assertEqual(to_camel_case("my-label-name"), "MyLabelName")
        self.assertEqual(to_camel_case("QKV"), "QKV")
        self.assertEqual(to_camel_case("QKV_semantic_search"), "QKVSemanticSearch")


class TestSVGTransformations(unittest.TestCase):
    """Test case for SVG attribute normalization and cleanup operations."""

    def test_add_v_click_attributes(self) -> None:
        """Verifies that inkscape:label ending in __step_{n} adds v-click="n".

        Args:
            None.

        Returns:
            None.
        """
        raw = '<g inkscape:label="group__step_3"><rect inkscape:label="rect__step_5"/></g>'
        expected = (
            '<g v-click="3" inkscape:label="group__step_3">'
            '<rect v-click="5" inkscape:label="rect__step_5"/></g>'
        )
        self.assertEqual(add_v_click_attributes(raw), expected)

    def test_clean_xml_headers(self) -> None:
        """Verifies that XML declaration tags and starting comments are removed.

        Args:
            None.

        Returns:
            None.
        """
        raw = '<?xml version="1.0"?><!-- comment --><svg></svg>'
        self.assertEqual(clean_xml_headers(raw), "<svg></svg>")

    def test_normalize_labels(self) -> None:
        """Verifies that inkscape:label elements map to IDs.

        Args:
            None.

        Returns:
            None.
        """
        raw = '<rect inkscape:label="My Rect"/>'
        expected = '<rect id="my_rect" inkscape:label="My Rect"/>'
        self.assertEqual(normalize_inkscape_labels(raw), expected)

    def test_localize_ids(self) -> None:
        """Verifies that prefix__ and IDs are localized based on filename hash.

        Args:
            None.

        Returns:
            None.
        """
        raw = '<g id="my-id"/>'
        # md5 hash of 'sample' begins with 5e8ff9
        expected = '<g id="svg_5e8ff9_my-id"/>'
        self.assertEqual(localize_ids(raw, "sample"), expected)

    def test_remove_metadata(self) -> None:
        """Verifies that inkscape/sodipodi metadata tags and attributes are removed.

        Args:
            None.

        Returns:
            None.
        """
        raw = '<rect inkscape:label="my-rect" sodipodi:role="line"/>'
        self.assertEqual(remove_metadata_and_inkscape_attributes(raw), "<rect/>")

    def test_normalize_root_svg_dimensions(self) -> None:
        """Verifies that width and height attributes are normalized to fit 1280x900 relative to viewBox.

        Args:
            None.

        Returns:
            None.
        """
        # Case 1: viewBox fits perfectly by scaling width to 1280
        # aspect ratio is 2:1 (100x50), scaled width=1280, height=640
        raw1 = '<svg version="1.1" width="100" height="50" viewBox="0 0 100 50"><rect width="50" height="50"/></svg>'
        expected1 = '<svg width="1280.0" height="640.0" version="1.1"   viewBox="0 0 100 50"><rect width="50" height="50"/></svg>'
        self.assertEqual(normalize_root_svg_dimensions(raw1), expected1)

        # Case 2: viewBox fits perfectly by scaling height to 900
        # aspect ratio is 1:2 (50x100), scaled width=450, height=900
        raw2 = '<svg version="1.1" viewBox="0 0 50 100"></svg>'
        expected2 = '<svg width="450.0" height="900.0" version="1.1" viewBox="0 0 50 100"></svg>'
        self.assertEqual(normalize_root_svg_dimensions(raw2), expected2)

        # Case 3: No viewBox fallback to 100%
        raw3 = '<svg version="1.1"></svg>'
        expected3 = '<svg width="100%" height="100%" version="1.1"></svg>'
        self.assertEqual(normalize_root_svg_dimensions(raw3), expected3)


if __name__ == "__main__":
    unittest.main()
