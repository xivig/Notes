# Chapter 06 — Modules, Packages & `src/` Layout with `pyproject.toml`

Clean packaging keeps imports predictable, prevents test files from accidentally importing uninstalled source paths, and keeps module filenames from shadowing standard-library modules (`json.py`, `email.py`, `typing.py`).

---

## 1. The Recommended `src/` Layout

```text
my_app/
├── pyproject.toml
├── README.md
├── .gitignore
├── src/
│   └── my_app/
│       ├── __init__.py
│       ├── models.py
│       ├── services.py
│       └── cli.py
└── tests/
    └── test_services.py
```

### Why `src/` Beats Flat Root Packages
With `src/`, running `pytest` or `python -m unittest` verifies the **installed** package (`python -m pip install -e .` or `uv run pytest`) instead of implicitly importing loose files from the working directory.

---

## 2. Imports: Absolute vs Explicit Relative

```python
# Preferred across packages: unambiguous absolute import
from my_app.services import calculate_tax

# Explicit relative import inside the same package:
from .models import Invoice
```
Never use wildcard imports (`from math import *`) in production modules — they hide where symbols came from and confuse static analyzers.

---

## 3. Package Discovery & Shadowing Prevention

Inspect `sys.path` or avoid naming files `json.py`, `random.py`, or `asyncio.py`. If a script needs a clean reproducible dependency manifest, define dependencies inside `[project]` in `pyproject.toml`:

```toml
[project]
name = "my-app"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = ["httpx>=0.27", "pydantic>=2.0"]
```

---

## Try It Locally
```bash
python chapters/06-modules-packages-and-pyproject/lab.py
```
