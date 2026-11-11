# Chapter 17 — Packaging, Twelve-Factor Configuration & Deployment

Turn scripts into installable, fail-fast software using `pyproject.toml` (`setuptools`, `hatchling`, `uv_build`), typed startup configuration validation, containerization best practices, and release checklists.

---

## 1. Fail-Fast Startup Configuration

Keep environment configuration outside code (`APP_ENV`, `DATABASE_URL`, `LOG_LEVEL`) and validate required keys at startup inside a frozen dataclass rather than scattering `os.getenv()` across modules:

```python
from dataclasses import dataclass
import os

@dataclass(frozen=True, slots=True)
class AppSettings:
    app_env: str
    debug: bool
    database_url: str

    @classmethod
    def from_env(cls, environ: dict[str, str] | None = None) -> "AppSettings":
        env = os.environ if environ is None else environ
        app_env = env.get("APP_ENV", "development").strip().lower()
        db_url = env.get("DATABASE_URL", "").strip()
        if not db_url:
            raise RuntimeError("Missing required configuration: DATABASE_URL")
        return cls(app_env=app_env, debug=(app_env == "development"), database_url=db_url)
```

---

## 2. Production Release Checklist
1. Run `ruff`, `mypy`/`pyright`, and full test suite in CI.
2. Lock dependencies (`uv.lock` / hashed `requirements.txt`).
3. Keep `debug=False` and secrets injected at runtime via environment/secret manager.
4. Apply database migrations cleanly before routing traffic.
5. Configure structured logging, health checks (`/health`), and rollback steps.

---

## Try It Locally
```bash
python chapters/17-packaging-configuration-and-deployment/lab.py
```
