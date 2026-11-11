"""Chapter 09 Lab: Properties, Inheritance + super(), Dataclasses (slots/frozen) & Protocol."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Protocol


class Renderable(Protocol):
    def render(self) -> str: ...


@dataclass(frozen=True, slots=True)
class LineItem:
    title: str
    unit_cents: int
    qty: int = 1

    def subtotal_cents(self) -> int:
        return self.unit_cents * self.qty

    def render(self) -> str:
        return f"{self.title} x{self.qty} = ${self.subtotal_cents() / 100:.2f}"


@dataclass(slots=True)
class ShoppingCart:
    items: list[LineItem] = field(default_factory=list)

    def add(self, item: LineItem) -> None:
        self.items.append(item)

    def total_cents(self) -> int:
        return sum(item.subtotal_cents() for item in self.items)

    def __len__(self) -> int:
        return len(self.items)


class Account:
    def __init__(self, owner: str, balance_cents: int = 0) -> None:
        self.owner = owner
        self._balance_cents = balance_cents

    @property
    def balance_cents(self) -> int:
        return self._balance_cents

    def deposit(self, cents: int) -> None:
        if cents <= 0:
            raise ValueError("Deposit must be positive")
        self._balance_cents += cents


class RewardsAccount(Account):
    def __init__(self, owner: str, balance_cents: int = 0, bonus_rate: float = 0.05) -> None:
        super().__init__(owner, balance_cents)
        self.bonus_rate = bonus_rate

    def deposit(self, cents: int) -> None:
        bonus = int(round(cents * self.bonus_rate))
        super().deposit(cents + bonus)


def print_preview(obj: Renderable) -> None:
    print("Protocol render ->", obj.render())


def main() -> None:
    cart = ShoppingCart()
    cart.add(LineItem("Python Handbook", 2900, qty=1))
    cart.add(LineItem("Keyboard Stickers", 450, qty=2))
    for item in cart.items:
        print_preview(item)
    print(f"Cart items={len(cart)} total=${cart.total_cents() / 100:.2f}")

    acct = RewardsAccount("Mina", 1000, bonus_rate=0.10)
    acct.deposit(1000)
    print(f"Rewards balance after $10 deposit: ${acct.balance_cents / 100:.2f}")


if __name__ == "__main__":
    main()
