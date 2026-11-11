"""Chapter 12 Unit Tests: Demonstrates unittest.TestCase with subTest parametrization & error assertions."""

from __future__ import annotations

import unittest
from lab import is_even, slugify


class TestHelpers(unittest.TestCase):
    def test_is_even_cases(self) -> None:
        cases = [(0, True), (8, True), (7, False), (-4, True), (-3, False)]
        for value, expected in cases:
            with self.subTest(value=value):
                self.assertEqual(is_even(value), expected)

    def test_slugify_normalizes_punctuation(self) -> None:
        self.assertEqual(slugify("  Hello, Python 3!  "), "hello-python-3")
        self.assertEqual(slugify("   "), "")


if __name__ == "__main__":
    unittest.main()
