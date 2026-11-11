# Chapter 10 — Iterators, Generators, Decorators & Context Managers

These four Python language protocols let you stream massive files in constant memory, wrap functions cleanly with timing/caching/auth cross-cutting logic, and guarantee deterministic cleanup of locks, files, and transactions.

---

## 1. Generators & Lazy Streaming (`yield`)

```python
from collections.abc import Iterator, Sequence

def chunks[T](items: Sequence[T], size: int) -> Iterator[Sequence[T]]:  # or TypeVar in <=3.11
    if size < 1:
        raise ValueError("size must be at least 1")
    for idx in range(0, len(items), size):
        yield items[idx : idx + size]
```
Because generators yield one slice at a time instead of building huge intermediate lists, pipelines stay $O(1)$ in memory.

---

## 2. Decorators with `functools.wraps`

Always apply `@wraps(func)` inside decorator wrappers so `__name__`, `__doc__`, and type metadata aren't clobbered:

```python
from functools import wraps
from time import perf_counter

def measure_time(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = perf_counter()
        try:
            return func(*args, **kwargs)
        finally:
            print(f"{func.__name__} took {perf_counter() - start:.5f}s")
    return wrapper
```

---

## 3. Context Managers (`__enter__` / `__exit__` & `@contextmanager`)

Both class-based context managers and generator `@contextmanager` guarantee cleanup runs even if an exception is raised inside the `with` block!

---

## Try It Locally
```bash
python chapters/10-iterators-generators-decorators-and-context-managers/lab.py
```
