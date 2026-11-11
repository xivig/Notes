"""Chapter 12 Subject Module: Clean testable helper functions."""

from __future__ import annotations


def is_even(number: int) -> bool:
    return number % 2 == 0


def slugify(title: str) -> str:
    tokens: list[str] = []
    for char in title.strip().lower():
        if char.isalnum():
            tokens.append(char)
        elif tokens and tokens[-1] != "-":
            tokens.append("-")
    return "".join(tokens).strip("-")


if __name__ == "__main__":
    print("slugify('Python 3.13 & Testing!') ->", slugify("Python 3.13 & Testing!"))
