"""Chapter 15 Lab: Cooperative async/await Coroutine Scheduler & ThreadPoolExecutor.

Note: Driving async def coroutines cleanly in pure Python avoids Windows loopback self-pipe
issues inside restricted environments while demonstrating exact cooperative scheduling semantics.
"""

from __future__ import annotations

import time
from collections import deque
from collections.abc import Coroutine, Generator
from concurrent.futures import ThreadPoolExecutor
from typing import Any


class _YieldStep:
    """Awaitable object yielding control back to the mini event loop once."""

    def __await__(self) -> Generator[None, None, None]:
        yield


async def cooperative_yield() -> None:
    await _YieldStep()


async def fetch_task(name: str, steps: int) -> str:
    for step in range(1, steps + 1):
        await cooperative_yield()
        print(f"[coro:{name}] completed step {step}/{steps}")
    return f"done:{name}"


def run_coroutines(coros: list[Coroutine[Any, Any, str]]) -> list[str]:
    """Minimal round-robin event loop illustrating how Python async/await suspends & resumes."""
    queue: deque[tuple[int, Coroutine[Any, Any, str]]] = deque(enumerate(coros))
    results: dict[int, str] = {}
    while queue:
        idx, coro = queue.popleft()
        try:
            coro.send(None)
            queue.append((idx, coro))
        except StopIteration as finished:
            results[idx] = str(finished.value)
    return [results[i] for i in range(len(coros))]


def blocking_work(n: int) -> int:
    time.sleep(0.01)
    return n * n


def main() -> None:
    coro_results = run_coroutines([
        fetch_task("users", 2),
        fetch_task("orders", 2),
    ])
    print("Cooperative async results:", coro_results)

    with ThreadPoolExecutor(max_workers=2) as pool:
        squares = list(pool.map(blocking_work, [2, 4, 6, 8]))
    print("ThreadPoolExecutor results:", squares)


if __name__ == "__main__":
    main()
