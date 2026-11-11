"""Chapter 11 Lab: Timezone-aware timestamps, Counter, defaultdict, deque, itertools & lru_cache."""

from __future__ import annotations

from collections import Counter, defaultdict, deque
from datetime import datetime, timedelta, timezone
from functools import lru_cache, partial
from itertools import islice
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError


@lru_cache(maxsize=256)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)


def power(base: int, exp: int) -> int:
    return base**exp


def main() -> None:
    utc_now = datetime(2026, 11, 11, 12, 0, tzinfo=timezone.utc)
    try:
        ist = ZoneInfo("Asia/Kolkata")
    except ZoneInfoNotFoundError:
        ist = timezone(timedelta(hours=5, minutes=30), name="IST")
    kolkata = utc_now.astimezone(ist)
    print("UTC:", utc_now.isoformat(), "-> IST:", kolkata.isoformat())

    words = ["python", "api", "python", "sqlite", "python", "api"]
    print("Top 2 words:", Counter(words).most_common(2))

    grouped: defaultdict[str, list[str]] = defaultdict(list)
    for role, tool in [("backend", "FastAPI"), ("data", "pandas"), ("backend", "pytest")]:
        grouped[role].append(tool)
    print("Grouped:", dict(grouped))

    recent = deque([10, 20, 30], maxlen=3)
    recent.append(40)
    print("Bounded deque(maxlen=3):", list(recent))

    first_five = list(islice((x * x for x in range(1, 100)), 5))
    print("First 5 lazy squares:", first_five)

    square = partial(power, exp=2)
    print("partial square(9):", square(9), "| fib(30):", fib(30))


if __name__ == "__main__":
    main()
