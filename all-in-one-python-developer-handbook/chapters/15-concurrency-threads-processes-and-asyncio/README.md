# Chapter 15 — Concurrency: `asyncio`, Threads & Multiprocessing

Choose your concurrency model based on the bottleneck:

| Workload Type | Recommended Mechanism | Why |
| :--- | :--- | :--- |
| Many concurrent network / async I/O operations | **`asyncio`** (`async def` / `await`) | Cooperative single-thread event loop scales to thousands of sockets |
| Blocking I/O (`requests`, legacy DB drivers, file ops) | **`ThreadPoolExecutor`** | Offloads blocking syscalls across OS threads |
| Heavy CPU-bound math / image / parsing | **`ProcessPoolExecutor`** | Bypasses standard GIL across separate OS processes |

*(Note: Python 3.13+ introduced optional free-threaded builds without the GIL (`python3.13t`), while standard builds keep the process/thread distinction above.)*

---

## 1. AsyncIO Coroutines (`gather` vs 3.11+ `TaskGroup`)

```python
import asyncio

async def fetch(label: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return f"done: {label}"

# Structured concurrency (Python 3.11+):
async def main_tg() -> None:
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(fetch("A", 0.05))
        t2 = tg.create_task(fetch("B", 0.02))
    print(t1.result(), t2.result())
```

---

## 2. Never Block the Event Loop!
Calling synchronous `time.sleep(2)` or synchronous `requests.get()` inside an `async def` freezes **every** coroutine on that loop. Use async libraries (`httpx.AsyncClient`, `aiofiles`) or `await asyncio.to_thread(blocking_fn, arg)`.

---

## Try It Locally
```bash
python chapters/15-concurrency-threads-processes-and-asyncio/lab.py
# On Python >= 3.11:
python chapters/15-concurrency-threads-processes-and-asyncio/lab_py311.py
```
