# Chapter 16 — Security, Profiling & Production Reliability

Design software defensively: keep secrets out of Git, validate every boundary input, prevent path traversal and timing side-channels, measure performance with `timeit`/`cProfile`, and plan for partial failures.

---

## 1. Secure Coding Essentials
- **Secrets & Tokens**: Generate cryptographic tokens with `secrets.token_urlsafe(32)`, never `random`. Compare HMAC signatures / API tokens with `hmac.compare_digest(a, b)` to avoid timing leaks.
- **Path Traversal Guard**: Never join user paths blindly (`base / user_path`). Resolve and check containment: `candidate.resolve().is_relative_to(base.resolve())`.
- **Safe Deserialization**: NEVER call `pickle.loads()` or `yaml.load()` (use `yaml.safe_load()` or JSON) on untrusted bytes.
- **Subprocess Safety**: Avoid `subprocess.run(..., shell=True)` with dynamic strings — pass an argument list `["git", "status"]` (`shell=False`).

---

## 2. Measure Before Optimizing (`timeit` & `cProfile`)
Profile hot paths before micro-optimizing syntax. Replacing an $O(n^2)$ list lookup (`x in big_list`) with an $O(1)$ `set` (`x in big_set`) almost always dwarfs micro-tweaks.

---

## Try It Locally
```bash
python chapters/16-security-profiling-and-reliability/lab.py
```
