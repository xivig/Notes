"""Chapter 05 Lab: Mutable default fix, parameter boundaries, closures & TypeVar generics."""

from __future__ import annotations

from collections.abc import Callable, Sequence
from typing import TypeVar

T = TypeVar("T")


def append_tag(tag: str, existing: list[str] | None = None) -> list[str]:
    result = [] if existing is None else list(existing)
    clean = tag.strip().lower()
    if clean and clean not in result:
        result.append(clean)
    return result


def create_user(name: str, /, *roles: str, active: bool = True, **meta: object) -> dict[str, object]:
    return {"name": name, "roles": roles, "active": active, "meta": meta}


def make_counter(start: int = 0) -> Callable[[int], int]:
    count = start

    def step(by: int = 1) -> int:
        nonlocal count
        count += by
        return count

    return step


def first_item(items: Sequence[T]) -> T:
    if not items:
        raise ValueError("items cannot be empty")
    return items[0]


def main() -> None:
    print("Safe default #1:", append_tag("Python"))
    print("Safe default #2:", append_tag("Async", existing=["python"]))

    print("User:", create_user("Ravi", "author", "reviewer", active=True, city="Kolkata"))

    counter = make_counter(10)
    print("Closure steps:", counter(1), counter(5))
    print("Generic first_item:", first_item(["Ada", "Grace"]))


if __name__ == "__main__":
    main()
