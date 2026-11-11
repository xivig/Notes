"""Chapter 03 Lab: enumerate, zip(strict=True), loop-else & structural match/case."""

from __future__ import annotations


def handle_command(payload: dict[str, object]) -> str:
    match payload:
        case {"action": "move", "coords": [int(x), int(y)]}:
            return f"Moved to ({x}, {y})"
        case {"action": "scale", "factor": int(f) | float(f)} if f > 0:
            return f"Scaled by {f}x"
        case {"action": "quit" | "exit"}:
            return "Shutting down cleanly"
        case _:
            return f"Unsupported payload: {payload!r}"


def find_first_even(numbers: list[int]) -> str:
    for n in numbers:
        if n % 2 == 0:
            return f"Found even: {n}"
    else:
        return "No even numbers found (loop-else executed)"


def main() -> None:
    languages = ["Python", "Rust", "SQL"]
    tiers = ["Primary", "Systems", "Data"]
    for idx, (lang, tier) in enumerate(zip(languages, tiers, strict=True), start=1):
        print(f"{idx}. {lang} [{tier}]")

    print(find_first_even([1, 3, 5, 7]))
    print(find_first_even([1, 3, 4, 7]))

    for cmd in [
        {"action": "move", "coords": [12, 34]},
        {"action": "scale", "factor": 1.5},
        {"action": "exit"},
        {"action": "unknown"},
    ]:
        print("match ->", handle_command(cmd))


if __name__ == "__main__":
    main()
