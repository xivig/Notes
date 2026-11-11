"""Chapter 06 Lab: Inspecting module metadata, standard-library shadowing guard & dynamic importlib."""

from __future__ import annotations

import importlib
import sys
from pathlib import Path


def is_stdlib_shadowed(module_name: str, search_dir: Path) -> bool:
    candidate_file = search_dir / f"{module_name}.py"
    candidate_pkg = search_dir / module_name / "__init__.py"
    return candidate_file.exists() or candidate_pkg.exists()


def main() -> None:
    here = Path(__file__).resolve().parent
    for std_name in ("json", "math", "sqlite3", "logging"):
        shadowed = is_stdlib_shadowed(std_name, here)
        print(f"Stdlib '{std_name}' shadowed locally? {shadowed}")

    stats_mod = importlib.import_module("statistics")
    print("Dynamically loaded statistics.mean([10, 20, 30]) =", stats_mod.mean([10, 20, 30]))
    print(f"sys.path entries count: {len(sys.path)}")


if __name__ == "__main__":
    main()
