# Chapter 07 — Files, `pathlib`, JSON, CSV & `tomllib`

Always manipulate file paths using `pathlib.Path`, close handles reliably with `with`, pass `encoding="utf-8"` explicitly (avoiding Windows legacy locale traps), and use stdlib parsers (`json`, `csv`, `tomllib`) instead of manual string splitting.

---

## 1. Portable File I/O with `pathlib.Path`

```python
from pathlib import Path

workspace = Path("data")
workspace.mkdir(parents=True, exist_ok=True)
notes_file = workspace / "notes.txt"
notes_file.write_text("Learn Python\nBuild projects\n", encoding="utf-8")
content = notes_file.read_text(encoding="utf-8")
```

---

## 2. Safe JSON & Quoted CSV

- **JSON**: Wrap untrusted `json.loads()` in `try ... except json.JSONDecodeError`. Use `ensure_ascii=False` for readable UTF-8 text.
- **CSV**: Always pass `newline=""` when opening CSV files so Python's `csv` module controls CRLF/LF cleanly, especially on Windows!

```python
import csv

with open("scores.csv", "w", newline="", encoding="utf-8") as fh:
    writer = csv.DictWriter(fh, fieldnames=["name", "score"])
    writer.writeheader()
    writer.writerow({"name": "Ada, Countess", "score": 98})
```

---

## 3. Reading `pyproject.toml` with `tomllib` (Python 3.11+)

Since Python 3.11, TOML parsing is built directly into the standard library:

```python
import tomllib
from pathlib import Path

with Path("pyproject.toml").open("rb") as fh:  # Binary mode ("rb") is required!
    config = tomllib.load(fh)
```

---

## Try It Locally
```bash
python chapters/07-files-pathlib-json-csv-and-tomllib/lab.py
```
