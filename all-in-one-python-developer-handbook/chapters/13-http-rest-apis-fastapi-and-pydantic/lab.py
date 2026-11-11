"""Chapter 13 Lab: Offline REST API boundary validator & transport abstraction using stdlib."""

from __future__ import annotations

import json
from dataclasses import asdict, dataclass


class ValidationError(Exception):
    """Raised when incoming API payload fails schema checks."""


@dataclass(frozen=True, slots=True)
class CreateItemInput:
    name: str
    quantity: int

    @classmethod
    def from_json(cls, raw_body: str) -> CreateItemInput:
        try:
            data = json.loads(raw_body)
        except json.JSONDecodeError as exc:
            raise ValidationError("Invalid JSON body") from exc
        if not isinstance(data, dict):
            raise ValidationError("Payload must be a JSON object")

        name = data.get("name")
        qty = data.get("quantity")
        if not isinstance(name, str) or not name.strip():
            raise ValidationError("'name' must be a non-empty string")
        if not isinstance(qty, int) or isinstance(qty, bool) or qty < 1:
            raise ValidationError("'quantity' must be an integer >= 1")
        return cls(name=name.strip(), quantity=qty)


def handle_post_item(raw_body: str) -> tuple[int, dict[str, object]]:
    try:
        item = CreateItemInput.from_json(raw_body)
    except ValidationError as exc:
        return 422, {"error": "validation_error", "detail": str(exc)}
    return 201, {"status": "created", "item": asdict(item)}


def main() -> None:
    for body in [
        '{"name": " Mechanical Keyboard ", "quantity": 2}',
        '{"name": "", "quantity": -1}',
        "{bad json",
    ]:
        status, resp = handle_post_item(body)
        print(f"HTTP {status} -> {json.dumps(resp)}")


if __name__ == "__main__":
    main()
