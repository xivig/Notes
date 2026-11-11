# 📊 Project 02: Dynamic Data Table

An interactive administrative data table featuring alphanumeric multi-column sorting, real-time live filtering, and row selection.

---

### Features
- Multi-column alphanumeric sorting with visual directional arrows.
- Distinguishes between numeric (`salary`) and string (`name`) data types.
- Live debounced search filtering.
- Interactive multi-row highlighting and selection counter.
- Batched DOM re-insertion (`.append($rows)`) to eliminate browser layout thrashing.

### How to Run
Open [`index.html`](index.html) in your browser.
