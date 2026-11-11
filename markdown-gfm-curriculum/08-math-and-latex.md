# Module 08: Mathematical Expressions and LaTeX

> **Scope**: Mathematical typesetting in GitHub Flavored Markdown and static site engines using KaTeX and MathJax: inline expressions, display equation blocks, symbols, calculus, matrices, and piecewise systems.

---

## 1. Syntax Overview

GitHub natively renders mathematical equations written in LaTeX format using **KaTeX**:

| Format | Delimiter | Description |
| :----- | :-------- | :---------- |
| **Inline Math** | `$ ... $` | Typesets formulas inline directly within a sentence or paragraph. |
| **Block / Display Math** | `$$ ... $$` | Typesets formulas on their own dedicated, centered display block. |

---

## 2. Inline vs Display Equations

### Inline Mathematics
Use single dollar signs `$`:

```markdown
Euler's identity, $e^{i\pi} + 1 = 0$, connects five fundamental mathematical constants.
The speed of light relation is $E = mc^2$.
```

### Display / Block Mathematics
Use double dollar signs `$$` on separate lines:

```markdown
$$
f(x) = \int_{-\infty}^{\infty} \hat{f}(\xi) \, e^{2\pi i \xi x} \, d\xi
$$
```

> [!CAUTION] **Escaping Currency Dollar Signs**
> To write literal dollar signs in prose or tables without triggering KaTeX parsing, escape them with a backslash `\$` or wrap them in backticks `` `$50` ``:
> - Write: `This service costs \$25 per user per month.`

---

## 3. Essential Mathematical Operators & Notation

### Exponents, Subscripts, and Fractions

```markdown
$$
x_1, x_2, \dots, x_n \quad \text{and} \quad a^2 + b^2 = c^2
$$

$$
\frac{Numerator}{Denominator} \quad \implies \quad \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
```

### Greek Alphabet

| Lowercase | Syntax | Uppercase | Syntax |
| :-------- | :----- | :-------- | :----- |
| $\alpha$ | `\alpha` | $\Gamma$ | `\Gamma` |
| $\beta$ | `\beta` | $\Delta$ | `\Delta` |
| $\theta$ | `\theta` | $\Theta$ | `\Theta` |
| $\lambda$ | `\lambda` | $\Lambda$ | `\Lambda` |
| $\sigma$ | `\sigma` | $\Sigma$ | `\Sigma` |
| $\omega$ | `\omega` | $\Omega$ | `\Omega` |

### Sums, Integrals, and Limits

```markdown
$$
\sum_{k=1}^{n} k = \frac{n(n + 1)}{2}
$$

$$
\int_{0}^{1} x^2 \, dx = \left[ \frac{x^3}{3} \right]_0^1 = \frac{1}{3}
$$

$$
\lim_{x \to 0} \frac{\sin(x)}{x} = 1
$$
```

---

## 4. Matrices and Vectors

Matrices are enclosed within `\begin{matrix_type}` and `\end{matrix_type}` environments. Columns are separated by `&`, and rows are separated by `\\`:

### Matrix Delimiter Types

```markdown
$$
\text{Plain:} \quad
\begin{matrix}
1 & 2 \\
3 & 4
\end{matrix}
\qquad
\text{Parentheses (pmatrix):} \quad
\begin{pmatrix}
1 & 2 \\
3 & 4
\end{pmatrix}
\qquad
\text{Brackets (bmatrix):} \quad
\begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
$$
```

### Identity Matrix Example

```markdown
$$
I_3 = \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$
```

---

## 5. Multi-Line Aligned Equations

Use the `aligned` environment inside `$$` to align mathematical steps at equals signs using `&`:

```markdown
$$
\begin{aligned}
(x + y)^3 &= (x + y)(x + y)^2 \\
          &= (x + y)(x^2 + 2xy + y^2) \\
          &= x^3 + 2x^2y + xy^2 + x^2y + 2xy^2 + y^3 \\
          &= x^3 + 3x^2y + 3xy^2 + y^3
\end{aligned}
$$
```

---

## 6. Piecewise Functions and Cases

Use the `cases` environment to define conditions:

```markdown
$$
|x| = \begin{cases}
x, & \text{if } x \ge 0 \\
-x, & \text{if } x < 0
\end{cases}
$$

$$
\text{ReLU}(z) = \max(0, z) = \begin{cases}
z, & \text{for } z > 0 \\
0, & \text{otherwise}
\end{cases}
$$
```

---

## 7. Machine Learning & Engineering Formula Reference

### Mean Squared Error (MSE)
```markdown
$$
\text{MSE} = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2
$$
```

### Softmax Activation Function
```markdown
$$
\sigma(\mathbf{z})_i = \frac{e^{z_i}}{\sum_{j=1}^{K} e^{z_j}} \quad \text{for } i = 1, \dots, K
$$
```

### Gaussian Normal Distribution
```markdown
$$
f(x) = \frac{1}{\sigma \sqrt{2\pi}} \exp\left( -\frac{1}{2}\left( \frac{x - \mu}{\sigma} \right)^2 \right)
$$
```
