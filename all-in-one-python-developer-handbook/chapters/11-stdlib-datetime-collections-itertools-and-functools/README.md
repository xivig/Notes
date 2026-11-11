# Chapter 11 — Standard Library Essentials (`datetime`, `zoneinfo`, `collections`, `itertools`, `functools`)

Always reach for Python's batteries-included standard library before adding third-party packages: timezone-aware datetimes (`zoneinfo`), specialized containers (`Counter`, `defaultdict`, `deque`), lazy combinators (`itertools`), and function helpers (`lru_cache`, `partial`).

---

## 1. Timezone-Aware Dates (`datetime` + `zoneinfo`)

Never store ambiguous naive timestamps (`datetime.now()`). Always capture `datetime.now(timezone.utc)` and convert to display timezones via `zoneinfo.ZoneInfo`:

```python
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

now_utc = datetime.now(timezone.utc)
try:
    tz = ZoneInfo("Asia/Kolkata")
except ZoneInfoNotFoundError:
    # On Windows, install `tzdata` (`python -m pip install tzdata`) for system IANA rules:
    tz = timezone(timedelta(hours=5, minutes=30), name="IST")

print(now_utc.astimezone(tz).isoformat())
```

---

## 2. `collections`, `itertools` & `functools`

- `Counter(words).most_common(3)`: Instant frequency tables.
- `defaultdict(list)`: Group elements cleanly without `.setdefault()` noise.
- `deque(maxlen=100)`: $O(1)$ append/pop at both ends for queues & sliding logs.
- `itertools.groupby`, `chain`, `islice`, `batched` (3.12+): Memory-efficient stream composition.
- `@functools.lru_cache` / `@functools.cache`: Memoize deterministic pure functions; `functools.partial` binds fixed arguments.

---

## Try It Locally
```bash
python chapters/11-stdlib-datetime-collections-itertools-and-functools/lab.py
```
