# Chapter 09 — Object-Oriented Python, `@dataclass`, Composition & `Protocol`

Model clear domain abstractions using `@dataclass(frozen=True, slots=True)`, composition over deep inheritance trees, `@property` validation, special (`__dunder__`) methods, and structural subtyping (`typing.Protocol`).

---

## 1. Properties & Invariants

```python
class BankAccount:
    def __init__(self, owner: str, opening_balance: float = 0.0) -> None:
        if opening_balance < 0:
            raise ValueError("Opening balance cannot be negative")
        self.owner = owner
        self._balance = opening_balance

    @property
    def balance(self) -> float:
        return self._balance
```

---

## 2. Dataclasses (`slots=True`, `frozen=True`, `field(default_factory=...)`)

Python 3.10+ supports `slots=True` directly on `@dataclass` (lower memory & faster attribute lookup) and `frozen=True` for hashable immutable value objects:

```python
from dataclasses import dataclass, field

@dataclass(frozen=True, slots=True)
class Product:
    sku: str
    price_cents: int

@dataclass(slots=True)
class Cart:
    items: list[Product] = field(default_factory=list)

    def total_cents(self) -> int:
        return sum(p.price_cents for p in self.items)
```

---

## 3. Structural Typing with `Protocol` (Duck Typing with Static Safety!)

Instead of forcing unrelated classes to inherit from a rigid base class, define a `Protocol` describing the required behavior:

```python
from typing import Protocol

class Printable(Protocol):
    def summary(self) -> str: ...
```
Any class implementing `summary(self) -> str` satisfies `Printable` automatically — no inheritance boilerplate required.

---

## Try It Locally
```bash
python chapters/09-oop-dataclasses-inheritance-and-protocols/lab.py
```
