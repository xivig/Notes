# Chapter 04 — Collections, Slicing, Comprehensions & Shallow/Deep Copy

Mastering Python's core containers (`list`, `tuple`, `dict`, `set`) plus copying semantics prevents aliasing bugs and delivers $O(1)$ membership and lookup performance.

---

## 1. Choosing the Right Built-In Data Structure

| Container | Ordered | Mutable | Unique Elements | Typical Lookup | Best Used For |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `list` | Yes | Yes | No | $O(n)$ scan / $O(1)$ index | Variable-length homogeneous items |
| `tuple` | Yes | No | No | $O(n)$ scan / $O(1)$ index | Fixed-schema records, dictionary keys |
| `dict` | Insertion-ordered | Yes | Unique keys | $O(1)$ average | Key-value mappings, fast caches |
| `set` | Unordered | Yes | Yes (hashable) | $O(1)$ average | Deduplication, membership checks, unions/intersections |

---

## 2. Lists, Slicing & Shallow vs Deep Copy

```python
scores = [72, 91, 84, 96]
first, *middle, last = scores   # Starred unpacking!
reversed_scores = scores[::-1]  # New list copy reversed

# Aliasing vs Copy Trap:
import copy
nested = [[1, 2], [3, 4]]
shallow = nested.copy()         # Outer list is new; inner lists are STILL shared!
deep = copy.deepcopy(nested)    # Independent clone all the way down
```

---

## 3. Dictionary Merge (`|`) & Safe Access

Python 3.9+ adds clean dictionary union operators (`defaults | overrides`):

```python
defaults = {"theme": "dark", "timeout": 30}
overrides = {"timeout": 10, "retries": 2}
merged = defaults | overrides  # {'theme': 'dark', 'timeout': 10, 'retries': 2}
```

---

## 4. List, Dict, Set & Generator Comprehensions

```python
numbers = [1, 2, 3, 4, 5, 6]
even_squares = [n * n for n in numbers if n % 2 == 0]
square_map = {n: n * n for n in numbers}
unique_mods = {n % 3 for n in numbers}
lazy_total = sum(n * n for n in numbers)  # Generator expression: O(1) memory!
```

---

## Try It Locally
```bash
python chapters/04-collections-slicing-and-comprehensions/lab.py
```
