"""Chapter 18 Lab: Verified reference solutions for classic engineering interview algorithms."""

from __future__ import annotations


def two_sum(nums: list[int], target: int) -> tuple[int, int] | None:
    """O(n) time, O(n) space hash-map lookup."""
    seen: dict[int, int] = {}
    for idx, value in enumerate(nums):
        complement = target - value
        if complement in seen:
            return seen[complement], idx
        seen[value] = idx
    return None


def is_balanced_brackets(text: str) -> bool:
    """O(n) time, O(n) space stack matcher."""
    pairs = {")": "(", "]": "[", "}": "{"}
    openers = set(pairs.values())
    stack: list[str] = []
    for ch in text:
        if ch in openers:
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack


def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    """O(n log n) sort + single linear merge pass."""
    if not intervals:
        return []
    ordered = sorted(intervals, key=lambda pair: (pair[0], pair[1]))
    merged: list[list[int]] = [list(ordered[0])]
    for start, end in ordered[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged


def main() -> None:
    assert two_sum([2, 7, 11, 15], 9) == (0, 1)
    assert two_sum([1, 2, 3], 99) is None

    assert is_balanced_brackets("([]{})") is True
    assert is_balanced_brackets("([)]") is False
    assert is_balanced_brackets("") is True

    assert merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]]) == [[1, 6], [8, 10], [15, 18]]
    print("All interview algorithm checks passed cleanly!")


if __name__ == "__main__":
    main()
