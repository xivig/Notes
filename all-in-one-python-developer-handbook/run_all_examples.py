#!/usr/bin/env python3
"""Automated syntax check, runtime verification, and unittest runner for Python Tutorial Guide."""

from __future__ import annotations

import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CHAPTERS_DIR = ROOT / "chapters"


def required_python_version(filename: str) -> tuple[int, int] | None:
    match = re.search(r"py(\d)(\d+)", filename)
    if not match:
        return None
    return int(match.group(1)), int(match.group(2))


def main() -> int:
    if not CHAPTERS_DIR.is_dir():
        print(f"Chapters directory not found: {CHAPTERS_DIR}", file=sys.stderr)
        return 1

    py_files = sorted(CHAPTERS_DIR.rglob("*.py"))
    passed = 0
    skipped = 0
    failed = 0

    for file_path in py_files:
        rel = file_path.relative_to(ROOT).as_posix()
        min_ver = required_python_version(file_path.name)
        if min_ver is not None and sys.version_info[:2] < min_ver:
            req_str = f"{min_ver[0]}.{min_ver[1]}"
            cur_str = f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
            print(f"[SKIP] {rel} (requires Python >= {req_str}, running {cur_str})")
            skipped += 1
            continue

        try:
            source = file_path.read_text(encoding="utf-8")
            compile(source, str(file_path), "exec")
        except SyntaxError as exc:
            print(f"[FAIL][SYNTAX] {rel}\n{exc}")
            failed += 1
            continue

        cmd = (
            [sys.executable, "-B", "-m", "unittest", str(file_path)]
            if file_path.name.startswith("test_")
            else [sys.executable, "-B", str(file_path)]
        )
        env = os.environ.copy()
        env["PYTHONIOENCODING"] = "utf-8"
        env["PYTHONDONTWRITEBYTECODE"] = "1"

        try:
            proc = subprocess.run(
                cmd,
                cwd=str(file_path.parent),
                capture_output=True,
                text=True,
                encoding="utf-8",
                errors="replace",
                env=env,
                timeout=15,
            )
        except subprocess.TimeoutExpired:
            print(f"[FAIL][TIMEOUT] {rel} (>15s)")
            failed += 1
            continue

        if proc.returncode != 0:
            print(f"[FAIL][RUN] {rel} (exit {proc.returncode})")
            if proc.stdout:
                print(proc.stdout.strip())
            if proc.stderr:
                print(proc.stderr.strip())
            failed += 1
            continue

        print(f"[PASS] {rel}")
        passed += 1

    cur_ver = f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
    print(f"\nSummary: {passed} passed, {skipped} skipped, {failed} failed (Python {cur_ver})")
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
