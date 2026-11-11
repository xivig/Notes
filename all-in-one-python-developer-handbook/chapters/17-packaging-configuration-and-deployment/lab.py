"""Chapter 17 Lab: Twelve-Factor typed AppSettings loader with fail-fast validation."""

from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class AppSettings:
    app_env: str
    debug: bool
    database_url: str
    port: int = 8000

    @classmethod
    def from_mapping(cls, env: Mapping[str, str]) -> AppSettings:
        app_env = env.get("APP_ENV", "development").strip().lower()
        if app_env not in {"development", "staging", "production"}:
            raise ValueError(f"Unsupported APP_ENV={app_env!r}")

        database_url = env.get("DATABASE_URL", "").strip()
        if not database_url:
            raise RuntimeError("DATABASE_URL must be configured")

        raw_port = env.get("PORT", "8000")
        port = int(raw_port)
        return cls(
            app_env=app_env,
            debug=(app_env == "development"),
            database_url=database_url,
            port=port,
        )


def main() -> None:
    cfg = AppSettings.from_mapping({
        "APP_ENV": "production",
        "DATABASE_URL": "postgresql://app@db.internal:5432/prod",
        "PORT": "8080",
    })
    print("Validated settings:", cfg)

    try:
        AppSettings.from_mapping({"APP_ENV": "production"})
    except RuntimeError as exc:
        print("Fail-fast check verified:", exc)


if __name__ == "__main__":
    main()
