"""Chapter 15 Modern Lab (Python 3.11+): Structured concurrency with asyncio.TaskGroup."""

from __future__ import annotations

import asyncio


async def fetch_item(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return f"fetched:{name}"


async def main() -> None:
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(fetch_item("profile", 0.01))
        t2 = tg.create_task(fetch_item("feed", 0.02))
    print("TaskGroup results:", t1.result(), t2.result())


if __name__ == "__main__":
    asyncio.run(main())
