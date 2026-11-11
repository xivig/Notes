"""Chapter 07 Lab: Temporary workspace I/O with pathlib, UTF-8 JSON & CSV DictWriter/DictReader."""

from __future__ import annotations

import csv
import json
import tempfile
from pathlib import Path


def main() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)

        # 1. Text read/write via pathlib
        notes = root / "notes.txt"
        notes.write_text("Step 1: Learn Pathlib\nStep 2: Parse JSON\n", encoding="utf-8")
        print("Read lines:", notes.read_text(encoding="utf-8").splitlines())

        # 2. JSON round-trip with Unicode
        profile_path = root / "profile.json"
        profile = {"name": "Asha", "role": "Engineer", "skills": ["Python", "SQL"]}
        profile_path.write_text(json.dumps(profile, indent=2, ensure_ascii=False), encoding="utf-8")
        loaded = json.loads(profile_path.read_text(encoding="utf-8"))
        print("Loaded JSON skills:", loaded["skills"])

        # 3. Quoted CSV with embedded commas
        csv_path = root / "scores.csv"
        rows = [
            {"name": "Lovelace, Ada", "score": "99"},
            {"name": "Dev", "score": "88"},
        ]
        with csv_path.open("w", newline="", encoding="utf-8") as fh:
            writer = csv.DictWriter(fh, fieldnames=["name", "score"])
            writer.writeheader()
            writer.writerows(rows)

        with csv_path.open("r", newline="", encoding="utf-8") as fh:
            parsed = list(csv.DictReader(fh))
        print("CSV parsed cleanly:", parsed)


if __name__ == "__main__":
    main()
