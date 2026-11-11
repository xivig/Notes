"""Chapter 10 Lab: Lazy chunk generator, @wraps decorator & custom Context Manager."""

from __future__ import annotations

from collections.abc import Iterator, Sequence
from contextlib import contextmanager
from functools import wraps
from time import perf_counter
from typing import Callable, ParamSpec, TypeVar

P = ParamSpec("P")
R = TypeVar("R")
T = TypeVar("T")


def chunked(items: Sequence[T], size: int) -> Iterator[Sequence[T]]:
    if size < 1:
        raise ValueError("size must be at least 1")
    for start in range(0, len(items), size):
        yield items[start : start + size]


def timed(func: Callable[P, R]) -> Callable[P, R]:
    @wraps(func)
    def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        start = perf_counter()
        try:
            return func(*args, **kwargs)
        finally:
            elapsed_ms = (perf_counter() - start) * 1000
            print(f"[timed] {func.__name__} completed in {elapsed_ms:.3f} ms")

    return wrapper


class AuditScope:
    """Class-based context manager guaranteeing exit cleanup even on errors."""

    def __init__(self, label: str) -> None:
        self.label = label
        self.closed = False

    def __enter__(self) -> AuditScope:
        print(f"[enter] {self.label}")
        return self

    def __exit__(self, exc_type: object, exc: object, tb: object) -> bool:
        self.closed = True
        print(f"[exit] {self.label} (closed={self.closed}, had_error={exc is not None})")
        return False


@contextmanager
def managed_banner(title: str) -> Iterator[str]:
    print(f"--- begin {title} ---")
    try:
        yield title.upper()
    finally:
        print(f"--- end {title} ---")


@timed
def sum_batches(total: int) -> int:
    return sum(sum(batch) for batch in chunked(range(1, total + 1), 100))


def main() -> None:
    print("Chunks:", list(chunked([1, 2, 3, 4, 5], 2)))
    print("Preserved func name:", sum_batches.__name__)
    print("Batched sum(1..500):", sum_batches(500))

    with AuditScope("db-transaction"):
        with managed_banner("sync") as upper:
            print("Inside managed scope:", upper)


if __name__ == "__main__":
    main()
