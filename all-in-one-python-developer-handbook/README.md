# Python Developer Handbook & Learning Platform

[![Python](https://img.shields.io/badge/Python-3.10%20--%203.14-3776AB?style=flat-square&logo=python&logoColor=white)](https://docs.python.org/3/)
[![Curriculum](https://img.shields.io/badge/Curriculum-18%20Modules%20(3%20Tracks)-6366f1?style=flat-square)](./chapters)
[![Projects](https://img.shields.io/badge/Portfolio-6%20Projects%20%2B%2030--Day%20Sprint-0EA5E9?style=flat-square)](./PROJECTS.md)
[![Verified Labs](https://img.shields.io/badge/Runnable%20Labs-Tested-10B981?style=flat-square)](./run_all_examples.py)
[![Interactive Portal](https://img.shields.io/badge/Portal-Interactive%20Academy-f59e0b?style=flat-square)](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/all-in-one-python-developer-handbook/index.html)

A unified, modern **Python Zero-to-Professional Developer Handbook, Interactive Learning Platform, and Tested Code Suite** — uniting all 18 progressive curriculum modules, an interactive Pyodide browser coding playground, coding exercises, 30-day implementation sprint, algorithm & interview gym, 6 portfolio project specifications, cheatsheet, glossary, and verified standalone labs.

> Open the interactive **Python Academy** anytime: 🌐 **[Launch Live ↗](https://htmlpreview.github.io/?https://github.com/xivig/xivig-all-in-one-notes/blob/master/all-in-one-python-developer-handbook/index.html)** · **[Local (`index.html`)](./index.html)** (Pyodide CPython WASM runner, live exercises, 12 quizzes with score tracking, 16-week milestone planner, 30-day sprint exporter, and light/dark themes).

---

## Repository Map

| Resource | Purpose |
| :--- | :--- |
| [`index.html`](./index.html) | Interactive single-file learning platform (Pyodide WASM playground, exercises, quizzes, planner, sprint) |
| [`CHEATSHEET.md`](./CHEATSHEET.md) | Condensed desk reference for modern Python 3.10–3.14 syntax, `uv`, `pytest`, FastAPI, SQLite & CI |
| [`GLOSSARY.md`](./GLOSSARY.md) | Authoritative A–Z glossary of Python runtime, typing, async, security & architecture concepts |
| [`PROJECTS.md`](./PROJECTS.md) | 6 progressive portfolio project blueprints, Milestone walkthrough, and 20-point Quality Rubric |
| [`run_all_examples.py`](./run_all_examples.py) | Automated syntax (`py_compile`), runtime, and `unittest` verifier across all chapter labs |
| [`chapters/`](./chapters) | 18 modular Markdown chapters with runnable Python scripts (`lab.py` & `test_lab.py`) |

---

## Curriculum Overview (18 Modules across 3 Tracks)

### Track 1 — Core Language & Program Design (`01`–`06`)
| # | Module | Core Concepts | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 01 | [Setup, Virtual Environments, `uv` & Workflow](./chapters/01-setup-venv-uv-and-workflow/README.md) | `venv`, `uv`, `python -m pip`, `.gitignore`, `__main__` guard | [`lab.py`](./chapters/01-setup-venv-uv-and-workflow/lab.py) |
| 02 | [Syntax, Variables, Strings & `Decimal`](./chapters/02-syntax-types-strings-and-decimal/README.md) | Dynamic/strong typing, exact currency `Decimal`, debug f-strings, `is None` | [`lab.py`](./chapters/02-syntax-types-strings-and-decimal/lab.py) |
| 03 | [Control Flow, Loops & `match` / `case`](./chapters/03-control-flow-loops-and-match-case/README.md) | `enumerate`, `zip(strict=True)`, loop `else`, structural pattern matching | [`lab.py`](./chapters/03-control-flow-loops-and-match-case/lab.py) |
| 04 | [Collections, Slicing & Comprehensions](./chapters/04-collections-slicing-and-comprehensions/README.md) | `list`, `tuple`, `dict`, `set`, starred unpacking, shallow vs `deepcopy`, `\|` merge | [`lab.py`](./chapters/04-collections-slicing-and-comprehensions/lab.py) |
| 05 | [Functions, Scopes, Closures & Typing](./chapters/05-functions-scopes-closures-and-typing/README.md) | Mutable default sentinel, `/` & `*` params, LEGB, `TypeVar` & PEP 695 `[T]` | [`lab.py`](./chapters/05-functions-scopes-closures-and-typing/lab.py) · [`py3.12+`](./chapters/05-functions-scopes-closures-and-typing/lab_py312.py) |
| 06 | [Modules, Packages & `pyproject.toml`](./chapters/06-modules-packages-and-pyproject/README.md) | `src/` layout, absolute imports, stdlib shadowing prevention, `importlib` | [`lab.py`](./chapters/06-modules-packages-and-pyproject/lab.py) |

### Track 2 — Intermediate Python, OOP, Stdlib & Testing (`07`–`12`)
| # | Module | Core Concepts | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 07 | [Files, `pathlib`, JSON, CSV & `tomllib`](./chapters/07-files-pathlib-json-csv-and-tomllib/README.md) | UTF-8 `Path`, context managers, `DictWriter`, `tomllib` (3.11+) | [`lab.py`](./chapters/07-files-pathlib-json-csv-and-tomllib/lab.py) |
| 08 | [Exceptions, Custom Errors & Logging](./chapters/08-exceptions-custom-errors-and-logging/README.md) | Narrow `except`, `raise ... from exc`, `ExceptionGroup`/`except*`, `logging` | [`lab.py`](./chapters/08-exceptions-custom-errors-and-logging/lab.py) |
| 09 | [OOP, Dataclasses & `Protocol`](./chapters/09-oop-dataclasses-inheritance-and-protocols/README.md) | `@property`, `super()`, `@dataclass(frozen=True, slots=True)`, `Protocol` | [`lab.py`](./chapters/09-oop-dataclasses-inheritance-and-protocols/lab.py) |
| 10 | [Iterators, Generators, Decorators & Contexts](./chapters/10-iterators-generators-decorators-and-context-managers/README.md) | Lazy `yield`, `@wraps`, `__enter__`/`__exit__`, `@contextmanager` | [`lab.py`](./chapters/10-iterators-generators-decorators-and-context-managers/lab.py) |
| 11 | [Standard Library Essentials](./chapters/11-stdlib-datetime-collections-itertools-and-functools/README.md) | `ZoneInfo` UTC timestamps, `Counter`, `defaultdict`, `deque`, `islice`, `lru_cache` | [`lab.py`](./chapters/11-stdlib-datetime-collections-itertools-and-functools/lab.py) |
| 12 | [Testing (`unittest` / `pytest`), Ruff & Git](./chapters/12-testing-unittest-pytest-ruff-and-git/README.md) | Parametrized tests, `subTest`, `compileall`, `ruff`, `mypy`, `.gitignore` | [`lab.py`](./chapters/12-testing-unittest-pytest-ruff-and-git/lab.py) · [`test_lab.py`](./chapters/12-testing-unittest-pytest-ruff-and-git/test_lab.py) |

### Track 3 — APIs, Data, Concurrency, Security & Production (`13`–`18`)
| # | Module | Core Concepts | Runnable Lab |
| :---: | :--- | :--- | :--- |
| 13 | [HTTP Clients, REST APIs, FastAPI & Pydantic](./chapters/13-http-rest-apis-fastapi-and-pydantic/README.md) | Explicit timeouts, boundary schema validation, REST status codes, FastAPI shapes | [`lab.py`](./chapters/13-http-rest-apis-fastapi-and-pydantic/lab.py) |
| 14 | [SQLite Transactions & Data Workflows](./chapters/14-sqlite-transactions-and-data-workflows/README.md) | Parameterized `?` queries, `PRAGMA foreign_keys`, atomic rollback, data pipelines | [`lab.py`](./chapters/14-sqlite-transactions-and-data-workflows/lab.py) |
| 15 | [Concurrency: `asyncio`, Threads & Processes](./chapters/15-concurrency-threads-processes-and-asyncio/README.md) | `gather`, `to_thread`, `TaskGroup` (3.11+), `ThreadPoolExecutor`, `ProcessPoolExecutor` | [`lab.py`](./chapters/15-concurrency-threads-processes-and-asyncio/lab.py) · [`py3.11+`](./chapters/15-concurrency-threads-processes-and-asyncio/lab_py311.py) |
| 16 | [Security, Profiling & Reliability](./chapters/16-security-profiling-and-reliability/README.md) | `secrets`, `hmac.compare_digest`, path traversal guard, `timeit`/`cProfile` | [`lab.py`](./chapters/16-security-profiling-and-reliability/lab.py) |
| 17 | [Packaging, Configuration & Deployment](./chapters/17-packaging-configuration-and-deployment/README.md) | `pyproject.toml`, Twelve-Factor settings validation, fail-fast startup, releases | [`lab.py`](./chapters/17-packaging-configuration-and-deployment/lab.py) |
| 18 | [Architecture, Code Review & Algorithms](./chapters/18-architecture-code-review-and-interviews/README.md) | Layered boundaries, PR reviews, Two-Sum, Balanced Brackets, Merge Intervals | [`lab.py`](./chapters/18-architecture-code-review-and-interviews/lab.py) |

---

## Quickstart: Run All Verified Examples

Ensure Python **3.10+** is installed, then run:

```bash
python run_all_examples.py
```

Version-gated examples (`lab_py311.py`, `lab_py312.py`) execute on matching interpreters and skip cleanly on older Python versions.
