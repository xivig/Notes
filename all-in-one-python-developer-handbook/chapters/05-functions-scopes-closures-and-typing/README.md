# Chapter 05 — Functions, Scopes, Closures, Mutable Defaults & Typing

Functions are the basic unit of abstraction in Python. Clean functions accept explicit inputs, avoid mutable default traps, document intent with type annotations, and return values instead of hard-coding side effects.

---

## 1. The Mutable Default Argument Trap

Python evaluates default parameter values **once at `def` execution time**, NOT per function call!

```python
# BAD: Every call shares the SAME list object!
def broken_add(item: str, bucket: list[str] = []) -> list[str]:
    bucket.append(item)
    return bucket

# GOOD: Use None sentinel and allocate inside the body
def add_item(item: str, bucket: list[str] | None = None) -> list[str]:
    target = [] if bucket is None else list(bucket)
    target.append(item)
    return target
```

---

## 2. Positional-Only (`/`), Keyword-Only (`*`), `*args` & `**kwargs`

```python
def create_user(name: str, /, *roles: str, active: bool = True, **metadata: object) -> dict[str, object]:
    return {"name": name, "roles": roles, "active": active, "metadata": metadata}
```
- Everything before `/` MUST be passed positionally (`name`).
- Everything after `*` MUST be passed by keyword (`active=True`).

---

## 3. LEGB Scope, Closures & `lambda`

Python resolves names from **Local -> Enclosing -> Global -> Built-in**. Use `nonlocal` when an inner closure mutates a rebound enclosing variable, and reserve `lambda` for short key functions (`sorted(users, key=lambda u: u.name.lower())`).

---

## 4. Type Annotations & Generics (Python 3.10–3.12+)

Static analyzers (`mypy`, `pyright`) check types without adding runtime overhead:

```python
# Portable Python 3.9–3.11 syntax using TypeVar:
from collections.abc import Sequence
from typing import TypeVar

T = TypeVar("T")

def first_item(items: Sequence[T]) -> T:
    if not items:
        raise ValueError("items cannot be empty")
    return items[0]

# Python 3.12+ PEP 695 generic parameter syntax:
# def first_item[T](items: Sequence[T]) -> T: ...
```

---

## Try It Locally
```bash
python chapters/05-functions-scopes-closures-and-typing/lab.py
# On Python 3.12+:
python chapters/05-functions-scopes-closures-and-typing/lab_py312.py
```
