# 🛒 Project 04: Shopping Cart

An interactive e-commerce shopping cart with real-time quantity calculations, item removal animations, dynamic sales tax, and promo code validation.

---

### Features
- Instant mathematical price recalculation on quantity changes (`price * qty`).
- Dynamic promo code discount engine (e.g. `SAVE20`).
- Sliding row removal animations with proper DOM teardown (`.slideUp(200, function() { $(this).remove(); })`).
- Recalculates totals strictly after node deletion to avoid pricing race conditions.

### How to Run
Open [`index.html`](index.html) in your browser.
