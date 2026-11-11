# Chapter 01 — Setup, Virtual Environments, `uv` & Developer Workflow

Use a modern supported Python 3 release (3.10–3.14+), isolate dependencies per project, and treat your editor, terminal, linter, and debugger as core workflow tools from day one.

---

## 1. Installing & Verifying Python

Check the active interpreter and standard module runner rather than bare `pip`:

```bash
python --version
# On some macOS / Linux setups:
python3 --version

# Always invoke pip through the chosen interpreter so packages never go to the wrong Python:
python -m pip --version
```

---

## 2. Virtual Environments (`venv`) vs Modern `uv`

Every Python project should have its own isolated environment so dependency upgrades in Project A never break Project B.

### Option A: Built-in `venv` (Standard Library)
```bash
mkdir hello-python && cd hello-python
python -m venv .venv

# Windows PowerShell:
.venv\Scripts\Activate.ps1

# macOS / Linux:
source .venv/bin/activate

python -m pip install --upgrade pip
```

### Option B: Modern `uv` Workflow (Fast All-in-One Toolchain)
[`uv`](https://docs.astral.sh/uv/) manages Python versions, virtual environments, `pyproject.toml`, and deterministic lockfiles (`uv.lock`) orders of magnitude faster than manual `venv` + `pip`:

```bash
uv init hello-python && cd hello-python
uv add httpx pytest
uv run python main.py
```

Add `.venv/` and `__pycache__/` to `.gitignore` — never commit virtual environments or cached bytecode.

---

## 3. Clean Script Entry Point (`__main__` Guard)

```python
from __future__ import annotations


def greet(name: str) -> str:
    clean = name.strip() or "Python developer"
    return f"Hello, {clean}! Welcome to Python."


def main() -> None:
    print(greet("Ada"))


if __name__ == "__main__":
    main()
```

---

## Try It Locally
```bash
python chapters/01-setup-venv-uv-and-workflow/lab.py
```
