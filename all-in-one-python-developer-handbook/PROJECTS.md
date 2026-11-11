# Python Portfolio Projects & 20-Point Quality Gate

Build software in increasing architectural depth. Every flagship portfolio repository should include a clean `src/` layout, automated tests, linting/typing checks, `.gitignore`, and a complete `README.md`.

---

## 1. Six Progressive Portfolio Projects

| # | Level | Project | Core Stack & Skills |
| :---: | :--- | :--- | :--- |
| 1 | Beginner | **Command-Line Task Manager** | Functions, `dataclasses`, JSON + `pathlib`, `argparse`, validation, `unittest`/`pytest` |
| 2 | Beginner+ | **Expense Tracker & Monthly CSV Exporter** | `Decimal` exact currency math, `datetime`, `csv.DictWriter`, `sqlite3`, reporting |
| 3 | Intermediate | **File Organizer & Duplicate Backup Tool** | Recursive `Path.rglob`, SHA-256 `hashlib`, `shutil`, `--dry-run` safety flag, `logging` |
| 4 | Intermediate | **Versioned REST API with Database** | FastAPI + Pydantic v2, PostgreSQL/SQLite migrations, HTTP status codes, test client |
| 5 | Intermediate+ | **Reproducible Data Analysis Pipeline** | Ingestion schema checks, cleaning, `pandas`/`duckdb` aggregation, reproducible notebook/report |
| 6 | Capstone | **Production-Style Web/Service Platform** | Auth/roles, audit logs, background tasks, Docker, GitHub Actions CI, rollback notes |

---

## 2. Guided Milestone Blueprint — CLI Task Manager

1. **Domain Model (`models.py`)**: Frozen/slotted `Task` dataclass validating non-empty titles and UTC ISO timestamps via `datetime.now(timezone.utc)`.
2. **Persistence Repository (`storage.py`)**: Load/save JSON safely with `pathlib.Path`, separating `FileNotFoundError` (empty start) from `json.JSONDecodeError` (explicit error instead of silently deleting user tasks!).
3. **Application Use Cases (`services.py`)**: Pure functions (`add_task`, `complete_task`, `delete_task`, `list_tasks`) free of `input()` or `print()` calls.
4. **CLI Presentation (`cli.py`)**: `argparse` subcommands (`add`, `list`, `done`, `delete`) setting proper exit codes (`0` success, non-zero errors).
5. **Verification (`tests/`)**: Cover empty titles, missing IDs, corrupted JSON files, duplicate IDs, and normal workflows.

---

## 3. Portfolio Quality Gate (20-Point Rubric)

Score every category `0` (Missing), `1` (Partial), or `2` (Complete) before showcasing a project (aim for **`>= 16 / 20`**):

1. **Problem & scope** — Explicit problem statement, target users, non-goals.
2. **Architecture** — Cohesive `src/` modules with clean separation between domain and I/O.
3. **Correctness** — Normal, boundary, empty, and invalid inputs handled intentionally.
4. **Testing** — Repeatable `pytest` / `unittest` suite testing success and failure paths.
5. **Code quality** — Clean naming, `ruff` formatting/linting, helpful type hints.
6. **Data & security** — Input validation, parameterized SQL, zero committed secrets.
7. **Reliability** — Structured `logging`, narrow exception handling, recovery behavior.
8. **Documentation** — `README.md` with setup, commands, architecture overview, limitations.
9. **Delivery** — Reproducible lockfile/`pyproject.toml` and CI workflow.
10. **Demonstration** — Clear walkthrough, screenshots, or API sample responses.
