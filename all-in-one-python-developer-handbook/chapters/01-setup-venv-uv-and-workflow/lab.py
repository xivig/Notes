"""Chapter 01 Lab: Runtime inspection, virtual environment detection & entry-point pattern."""

from __future__ import annotations

import platform
import sys


def environment_report() -> dict[str, object]:
    return {
        "python_version": platform.python_version(),
        "implementation": platform.python_implementation(),
        "in_venv": sys.prefix != sys.base_prefix,
        "executable": sys.executable,
    }


def greet(name: str) -> str:
    clean = name.strip() or "Python developer"
    return f"Hello, {clean}! Welcome to modern Python."


def main() -> None:
    report = environment_report()
    print(f"Runtime: Python {report['python_version']} ({report['implementation']})")
    print(f"Isolated venv active: {report['in_venv']}")
    print(greet("  Ada Lovelace  "))
    print(greet("   "))


if __name__ == "__main__":
    main()
