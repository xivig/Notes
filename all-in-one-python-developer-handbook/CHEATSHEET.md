# Python Developer Cheatsheet (Python 3.10 – 3.14)

Fast daily desk reference covering virtual environments (`venv` & `uv`), core syntax, structural matching, dataclasses, typing, files, testing, SQLite, concurrency, and security.

---

## 1. Environments, Dependencies & Quality Checks

```bash
# Built-in venv + pip
python -m venv .venv
.venv\Scripts\Activate.ps1       # Windows PowerShell
source .venv/bin/activate        # macOS / Linux
python -m pip install --upgrade pip

# Modern uv all-in-one toolchain
uv init my-project && cd my-project
uv add httpx pytest pydantic
uv run python -m unittest discover -s tests

# Static checks & testing
python -m compileall src
python -m unittest discover -s tests
pytest -q
ruff check . && ruff format --check .
mypy src
```

---

## 2. Core Language Patterns

```python
# Exact decimal arithmetic & debug f-strings
from decimal import Decimal
total = (Decimal("19.95") * Decimal("1.18")).quantize(Decimal("0.01"))
print(f"{total=}")

# Identity check for None (never use `== None` or rely solely on `if not x` when 0 is valid)
if limit is None:
    limit = 25

# Starred unpacking & dict union merge (3.9+)
first, *middle, last = [10, 20, 30, 40]
cfg = {"timeout": 30, "retries": 1} | {"retries": 3}

# Safe mutable defaults
def add_item(item: str, items: list[str] | None = None) -> list[str]:
    out = [] if items is None else list(items)
    out.append(item)
    return out
```

---

## 3. Structural Pattern Matching (`match` / `case`) & Comprehensions

```python
match event:
    case {"type": "click", "coords": [int(x), int(y)]}:
        handle_click(x, y)
    case {"type": "quit" | "exit"}:
        shutdown()
    case _:
        log_unknown(event)

# List, dict, set comprehensions & O(1)-memory generator expression
even_sq = [n * n for n in range(10) if n % 2 == 0]
sq_map = {n: n * n for n in range(5)}
total_sq = sum(n * n for n in range(1_000_000))
```

---

## 4. OOP, Dataclasses, Typing & Stdlib

```python
from dataclasses import dataclass, field
from datetime import datetime, timezone
from zoneinfo import ZoneInfo

@dataclass(frozen=True, slots=True)
class Money:
    cents: int
    currency: str = "USD"

# Timezone-aware timestamps
now_utc = datetime.now(timezone.utc)
local_time = now_utc.astimezone(ZoneInfo("Asia/Kolkata"))
```

```python
# PEP 695 generic syntax (Python 3.12+):
def first[T](items: Sequence[T]) -> T:
    return items[0]
```

---

## 5. Files, TOML (`3.11+`), SQLite & Concurrency

```python
from pathlib import Path
import json, sqlite3

text = Path("notes.txt").read_text(encoding="utf-8")
data = json.loads(Path("config.json").read_text(encoding="utf-8"))

# SQLite parameterized query (NEVER format user strings into SQL)
with sqlite3.connect("app.db") as conn:
    conn.execute("PRAGMA foreign_keys = ON")
    rows = conn.execute("SELECT id, title FROM tasks WHERE done = ?", (0,)).fetchall()

# tomllib (Python 3.11+)
import tomllib
with Path("pyproject.toml").open("rb") as fh:
    pyproject = tomllib.load(fh)
```

---

## 6. Security & Reliability Guardrails

```python
import hmac, secrets
from pathlib import Path

token = secrets.token_urlsafe(32)                    # CSPRNG tokens (never use random)
is_valid = hmac.compare_digest(supplied, expected)   # Constant-time secret compare
safe_path = (base_dir / user_name).resolve()
assert safe_path.is_relative_to(base_dir.resolve())  # Block ../ path traversal
```
