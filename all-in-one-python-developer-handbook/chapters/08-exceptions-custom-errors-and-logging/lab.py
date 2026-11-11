"""Chapter 08 Lab: Exception chaining (raise ... from exc), custom domain errors & logging."""

from __future__ import annotations

import logging


class InsufficientFundsError(Exception):
    """Raised when an account balance cannot cover a requested withdrawal."""


def parse_positive_int(raw: str) -> int:
    try:
        value = int(raw)
    except ValueError as exc:
        raise ValueError(f"Invalid whole number: {raw!r}") from exc
    if value <= 0:
        raise ValueError("Value must be positive")
    return value


def withdraw(balance: float, amount: float) -> float:
    if amount <= 0:
        raise ValueError("Withdrawal amount must be positive")
    if amount > balance:
        raise InsufficientFundsError(f"Requested {amount}, but only {balance} available")
    return balance - amount


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(levelname)s [%(name)s]: %(message)s",
    )
    logger = logging.getLogger("handbook.errors")

    try:
        parse_positive_int("twenty")
    except ValueError as err:
        print(f"Caught chained error: {err} (cause={type(err.__cause__).__name__})")

    try:
        print("New balance:", withdraw(100.0, 25.0))
        withdraw(75.0, 120.0)
    except InsufficientFundsError as err:
        logger.warning("Blocked overdraft attempt: %s", err)


if __name__ == "__main__":
    main()
