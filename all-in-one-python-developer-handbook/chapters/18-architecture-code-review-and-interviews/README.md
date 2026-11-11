# Chapter 18 — Maintainable Architecture, Code Review & Interview Algorithms

Bridge from "writing working Python" to "engineering maintainable systems" through layered module boundaries, disciplined pull-request reviews, and complexity-aware algorithmic problem solving.

---

## 1. Layered Design (Dependency Rule)

```text
presentation (CLI / FastAPI routes)
        ↓
application services (use cases)
        ↓
domain models & pure rules
        ↓
infrastructure (SQLite/Postgres, HTTP clients, filesystem)
```
Keep pure business logic independent of I/O so unit tests run instantaneously without spinning up web servers or live APIs.

---

## 2. Algorithmic Problem-Solving Method
1. Restate inputs, constraints, and edge cases (empty list, duplicates, negatives).
2. Work through a tiny concrete example manually.
3. Choose the right structure (`dict` -> $O(1)$ lookup, `deque` -> $O(1)$ queue, stack -> nesting, heap -> top-k).
4. State **Time** and **Space** complexity explicitly.
5. Verify with boundary test assertions.

---

## Try It Locally
Run verified implementations of **Two-Sum**, **Balanced Brackets**, and **Merge Intervals** plus complexity checks:
```bash
python chapters/18-architecture-code-review-and-interviews/lab.py
```
