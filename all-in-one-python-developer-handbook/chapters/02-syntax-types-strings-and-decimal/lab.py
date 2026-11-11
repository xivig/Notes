"""Chapter 02 Lab: Strong typing, exact Decimal arithmetic, f-strings & None identity checks."""

from __future__ import annotations

from decimal import Decimal, ROUND_HALF_UP


def calculate_invoice(unit_price: Decimal, quantity: int, tax_rate: Decimal) -> Decimal:
    subtotal = unit_price * quantity
    gross = subtotal * (Decimal("1") + tax_rate)
    return gross.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def display_discount(discount: int | None) -> str:
    # Always distinguish None ("unset") from 0 ("explicit zero percent")
    if discount is None:
        return "no discount configured"
    return f"{discount}% discount"


def main() -> None:
    float_trap = 0.1 + 0.2
    exact_sum = Decimal("0.1") + Decimal("0.2")
    print(f"Float 0.1 + 0.2 = {float_trap!r} | Decimal = {exact_sum!r}")

    total = calculate_invoice(Decimal("19.95"), quantity=3, tax_rate=Decimal("0.18"))
    print(f"Invoice total: ${total}")

    first, last = "grace", "hopper"
    full_name = f"{first.title()} {last.title()}"
    print(f"Debug f-string: {full_name=}, chars={len(full_name)}")

    print("discount=None ->", display_discount(None))
    print("discount=0    ->", display_discount(0))


if __name__ == "__main__":
    main()
