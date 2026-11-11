# Chapter 13 — HTTP Clients, REST API Design, FastAPI & Pydantic v2

Modern Python web services separate transport, schema validation (**Pydantic v2**), business logic, and persistence cleanly — always enforcing explicit network timeouts and structured error schemas.

---

## 1. Calling External HTTP APIs Safely

Whether using synchronous `httpx` / `requests` or stdlib `urllib.request`:
- ALWAYS pass an explicit `timeout=` (`timeout=10.0`) so hung upstream servers never exhaust worker threads.
- Check status codes (`response.raise_for_status()`) and validate JSON shape before reading nested keys.
- Only retry idempotent operations (`GET`, or `POST` with an idempotency key) using capped exponential backoff.

---

## 2. Typed REST API with FastAPI + Pydantic v2

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Items API", version="1.0.0")

class CreateItemRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    quantity: int = Field(ge=1, le=1000)

class ItemResponse(BaseModel):
    id: int
    name: str
    quantity: int

@app.post("/items", response_model=ItemResponse, status_code=201)
def create_item(payload: CreateItemRequest) -> ItemResponse:
    return ItemResponse(id=1, name=payload.name, quantity=payload.quantity)
```

---

## 3. REST API Engineering Checklist
- Resource-oriented URLs & explicit HTTP status codes (`200`, `201`, `400`/`422`, `401`, `403`, `404`).
- Request/response schema validation at the boundary.
- Pagination (`limit` / `cursor`) on list endpoints so payloads remain bounded.
- Inject HTTP transport clients in tests (`httpx.MockTransport` or fakes) so unit suites never hit the live internet.

---

## Try It Locally
Run our offline stdlib HTTP routing / request validation simulation:
```bash
python chapters/13-http-rest-apis-fastapi-and-pydantic/lab.py
```
