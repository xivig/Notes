# Chapter 08 — Exceptions, `ExceptionGroup`, Custom Errors & Structured Logging

Handle expected failures gracefully with narrow `except` blocks, chain root causes cleanly (`raise ... from exc`), validate domain invariants with custom exception subclasses, and replace `print()` debugging with `logging`.

---

## 1. Narrow Exception Catching & Chaining (`from exc`)

```python
def parse_age(raw: str) -> int:
    try:
        age = int(raw)
    except ValueError as exc:
        raise ValueError(f"Age must be a whole integer, got {raw!r}") from exc
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age
```
Never write bare `except:` — it catches `KeyboardInterrupt` and `SystemExit` as well as typos like `NameError`. Catch only specific exception classes you actually recover from.

---

## 2. Custom Domain Exceptions & `ExceptionGroup` (3.11+)

Subclasses of `Exception` let callers differentiate domain errors (`InsufficientFundsError`) from generic `ValueError` bugs. In concurrent tasks (Python 3.11+), multiple simultaneous exceptions group into `ExceptionGroup`, caught cleanly with `except*`:

```python
# Python 3.11+ syntax:
# try:
#     async with asyncio.TaskGroup() as tg: ...
# except* TimeoutError as eg:
#     log_timeouts(eg.exceptions)
```

---

## 3. Production Logging vs `print()`

Use Python's `logging` module with severity levels (`DEBUG`, `INFO`, `WARNING`, `ERROR`), structured formatters, and `logger.exception(...)` inside `except` blocks (which attaches tracebacks automatically). Never log passwords, API tokens, or PII!

---

## Try It Locally
```bash
python chapters/08-exceptions-custom-errors-and-logging/lab.py
```
