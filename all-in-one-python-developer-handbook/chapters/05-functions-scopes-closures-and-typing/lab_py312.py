"""Chapter 05 Modern Lab (Python 3.12+): PEP 695 type parameter & type statement syntax."""

from __future__ import annotations

from collections.abc import Sequence

type Pair[K, V] = tuple[K, V]


def first_item[T](items: Sequence[T]) -> T:
    if not items:
        raise ValueError("items cannot be empty")
    return items[0]


def main() -> None:
    sample: Pair[str, int] = ("Python", 312)
    print(f"PEP 695 generic first_item: {first_item(['3.12', '3.13'])} | pair={sample}")


if __name__ == "__main__":
    main()
