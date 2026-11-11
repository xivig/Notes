# Chapter 03 — Control Flow, Loops & Structural Pattern Matching (`match`/`case`)

Readable decision trees, Pythonic iteration (`enumerate`, `zip`), loop-`else` semantics, and Python 3.10+ structural `match`/`case`.

---

## 1. Pythonic Iteration (`enumerate`, `zip`) vs Index Loops

Instead of `for i in range(len(items)):`, iterate directly over items or pair them with `enumerate()` / `zip(..., strict=True)`:

```python
names = ["Ada", "Grace", "Linus"]
scores = [98, 95, 92]

for rank, (name, score) in enumerate(zip(names, scores, strict=True), start=1):
    print(f"#{rank}: {name} ({score})")
```

> `zip(..., strict=True)` (Python 3.10+) raises `ValueError` immediately if two sequences have mismatched lengths — catching silent truncation bugs early.

---

## 2. `while`, `break`, `continue` & Loop `else`

A loop's `else:` branch runs **only when the loop finishes normally without executing `break`** — ideal for search loops ("check all candidates, handle not-found cleanly"):

```python
for attempt in range(1, 4):
    if attempt == 2:
        break
else:
    print("Ran all attempts without breaking")
```

---

## 3. Structural Pattern Matching (`match` / `case`, Python 3.10+)

`match` goes far beyond `switch`: it destructures dictionaries, tuples, lists, sequences, and objects with guard conditions (`if ...`):

```python
def handle_event(event: dict[str, object]) -> str:
    match event:
        case {"type": "click", "x": int(x), "y": int(y)} if x >= 0 and y >= 0:
            return f"Click at ({x}, {y})"
        case {"type": "keypress", "key": "Escape" | "q"}:
            return "Closing modal"
        case {"type": str(other)}:
            return f"Ignored event: {other}"
        case _:
            return "Malformed event payload"
```

---

## Try It Locally
```bash
python chapters/03-control-flow-loops-and-match-case/lab.py
```
