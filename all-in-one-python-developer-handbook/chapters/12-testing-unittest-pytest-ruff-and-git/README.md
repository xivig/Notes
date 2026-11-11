# Chapter 12 — Automated Testing (`unittest` & `pytest`), Ruff Quality & Git Workflow

Tests protect behavior when code evolves. Pair `unittest` (built into Python) or `pytest` (industry standard) with fast linting/formatting (**Ruff**), static typing (**mypy / pyright**), and disciplined Git hygiene.

---

## 1. Built-In `unittest` vs Modern `pytest`

### Standard Library (`unittest`)
```python
import unittest

def is_even(n: int) -> bool:
    return n % 2 == 0

class TestMath(unittest.TestCase):
    def test_cases(self) -> None:
        self.assertTrue(is_even(8))
        self.assertFalse(is_even(7))
```

### Industry-Standard `pytest` (`@pytest.mark.parametrize` + `tmp_path`)
```python
import pytest

@pytest.mark.parametrize(("value", "expected"), [(8, True), (7, False), (0, True), (-4, True)])
def test_is_even(value: int, expected: bool) -> None:
    assert is_even(value) is expected
```

---

## 2. Quality Gate Commands Before Every Commit

```bash
python -m compileall src
python -m unittest discover -s tests
# With dev tools installed (via uv / pip):
ruff check .
ruff format --check .
mypy src
```

---

## 3. Essential `.gitignore` for Python Repositories
Never commit `.venv/`, `__pycache__/`, `.pytest_cache/`, `.mypy_cache/`, `.ruff_cache/`, `.env`, or local SQLite database files.

---

## Try It Locally
```bash
python chapters/12-testing-unittest-pytest-ruff-and-git/lab.py
python -m unittest chapters/12-testing-unittest-pytest-ruff-and-git/test_lab.py
```
