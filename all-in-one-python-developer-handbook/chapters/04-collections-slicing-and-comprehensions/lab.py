"""Chapter 04 Lab: Collections, starred unpacking, shallow vs deep copy, dict merge & comprehensions."""

from __future__ import annotations

import copy


def main() -> None:
    scores = [72, 91, 84, 96, 88]
    first, *middle, last = scores
    print(f"Unpacked -> first={first}, middle={middle}, last={last}")
    print(f"Slice [1:4]={scores[1:4]} | reversed={scores[::-1]}")

    # Shallow vs Deep copy demonstration
    original = [[10, 20], [30, 40]]
    shallow = original.copy()
    deep = copy.deepcopy(original)
    shallow[0].append(99)
    print(f"After mutating shallow[0]: original={original} | deep={deep}")

    # Dict union (Python 3.9+) and Set algebra
    defaults = {"theme": "dark", "timeout": 30}
    env_cfg = {"timeout": 10, "debug": True}
    merged = defaults | env_cfg
    print("Merged config:", merged)

    backend = {"python", "sql", "docker"}
    data = {"python", "sql", "pandas"}
    print("Shared skills:", sorted(backend & data))
    print("Data-only skills:", sorted(data - backend))

    # Comprehensions
    evens_sq = {n: n * n for n in range(1, 7) if n % 2 == 0}
    print("Even squares map:", evens_sq)


if __name__ == "__main__":
    main()
