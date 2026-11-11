# Chapter 02 — Syntax, Variables, Strings, Numbers & `Decimal`

Python is **dynamically typed** (names bind to typed objects at runtime) and **strongly typed** (`"3" + 4` raises `TypeError` instead of silently coercing).

---

## 1. Naming & Assignment Rules
- `snake_case` for variables, functions, and module filenames (`order_total`).
- `UPPER_SNAKE_CASE` for module constants (`MAX_RETRIES = 3`).
- `PascalCase` for classes (`BankAccount`).

---

## 2. Numbers, Exact Currency (`Decimal`) & Conversions

Binary floating point (`0.1 + 0.2 == 0.30000000000000004`) introduces rounding drift in financial calculations. Use `decimal.Decimal` with string literals for money!

```python
from decimal import Decimal

price = Decimal("19.95")
quantity = 3
tax_rate = Decimal("0.18")
subtotal = price * quantity
total = (subtotal * (Decimal("1") + tax_rate)).quantize(Decimal("0.01"))
print(total)  # Decimal('70.62')
```

Also master floor division (`17 // 5 == 3`), modulo (`17 % 5 == 2`), exponentiation (`2 ** 5 == 32`), underscores in numeric literals (`1_000_000`), and safe conversions (`int("42")`).

---

## 3. Strings & Modern f-String Superpowers

Strings are immutable Unicode sequences. Modern f-strings (especially Python 3.8+ `=` debug format and 3.12+ quote reuse inside `{...}`) keep formatting expressive:

```python
first, last = "grace", "hopper"
full_name = f"{first.title()} {last.title()}"
score = 94.567

print(f"{full_name=}, {score=:.1f}")
```

---

## 4. Truthiness, Equality (`==`) & Identity (`is`)

- Use **`==`** to compare values (`user_role == "admin"`).
- Use **`is`** exclusively for singleton identity checks — almost always **`value is None`** or `value is not None`.
- Empty containers (`[]`, `{}`, `set()`, `""`), `0`, `0.0`, `False`, and `None` evaluate as falsy; avoid writing `if not x:` when `0` is a valid meaningful value!

---

## Try It Locally
```bash
python chapters/02-syntax-types-strings-and-decimal/lab.py
```
