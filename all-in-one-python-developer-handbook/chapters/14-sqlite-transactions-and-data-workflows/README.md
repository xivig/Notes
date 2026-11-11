# Chapter 14 — SQL, SQLite Transactions & Data Engineering Workflows

Store structured state reliably using relational schemas, foreign keys, indexes, atomic transactions, and **parameterized queries** (never string interpolation!).

---

## 1. Safe SQLite with Parameterized Queries & Row Mapping

Python includes `sqlite3` out of the box:

```python
import sqlite3

with sqlite3.connect("app.db") as conn:
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    conn.execute(
        "INSERT INTO tasks (title, done) VALUES (?, ?)",
        ("Write parameterized queries", 0),
    )
    rows = conn.execute("SELECT id, title FROM tasks WHERE done = ?", (0,)).fetchall()
```

### Key Rules
- **NEVER** format user input with f-strings (`f"... WHERE title = '{title}'"`): always pass `?` placeholders (`(value,)`).
- Wrap multi-step account/order writes in `with conn:` transactions so partial failures roll back atomically.
- Enable `PRAGMA foreign_keys = ON` per connection in SQLite (off by default for legacy backwards compatibility!).

---

## 2. Analytical Data Workflows (`load -> inspect -> clean -> validate -> summarize`)

For CSV/JSON/Parquet analytics (`pandas`, `polars`, `duckdb`):
1. Enforce explicit schemas/dtypes on load instead of guessing.
2. Separate cleaning rules from plotting/reporting functions so transforms are unit-testable.
3. Verify row counts and invariants before exporting results.

---

## Try It Locally
```bash
python chapters/14-sqlite-transactions-and-data-workflows/lab.py
```
