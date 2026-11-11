"""Chapter 16 Lab: Cryptographic tokens, timing-safe comparison, path-traversal guard & timeit."""

from __future__ import annotations

import hmac
import secrets
from pathlib import Path
from timeit import timeit


def safe_resolve_child(base_dir: Path, relative_name: str) -> Path:
    base_resolved = base_dir.resolve()
    target = (base_resolved / relative_name).resolve()
    if not target.is_relative_to(base_resolved):
        raise ValueError(f"Blocked path traversal attempt: {relative_name!r}")
    return target


def main() -> None:
    token = secrets.token_urlsafe(24)
    print("Generated CSPRNG token prefix:", token[:8] + "...")
    print("Constant-time match:", hmac.compare_digest(token, token))

    sandbox = Path(".").resolve()
    print("Safe child path:", safe_resolve_child(sandbox, "README.md").name)
    try:
        safe_resolve_child(sandbox, "../../etc/passwd")
    except ValueError as exc:
        print("Security guard verified:", exc)

    items_list = list(range(10_000))
    items_set = set(items_list)
    t_list = timeit(lambda: 9999 in items_list, number=2000)
    t_set = timeit(lambda: 9999 in items_set, number=2000)
    print(f"Membership 2000x benchmark -> list={t_list:.5f}s | set={t_set:.5f}s")


if __name__ == "__main__":
    main()
