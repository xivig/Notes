# Chapter 07: OOP Foundations, Multiple Instances & Inheritance

> **Scope:** PHP 8.0–8.5 · Classes, Objects, `$this`, Multiple Independent Instances, `extends` Inheritance, `parent::` Calls, and Method Overriding.

*(Consolidates and modernizes the legacy `oop.php`, `oop2formulipleInstances.php`, `oop_classInheritance.php`, and constructor override lessons.)*

---

## 1. Learning Objectives

- Define classes with strongly typed properties and return-typed methods.
- Instantiate multiple independent object instances from a single blueprint.
- Extend parent classes using `extends` and delegate to parent constructors/methods with `parent::`.
- Override inherited methods cleanly without breaking parent invariants (Liskov Substitution Principle).

---

## 2. Classes, Instances & `$this`

```php
class SampleItem
{
    public string $label = 'Default label';

    public function setLabel(string $newValue): void
    {
        $this->label = $newValue;
    }

    public function getLabel(): string
    {
        return $this->label;
    }
}

$first  = new SampleItem();
$second = new SampleItem();
$second->setLabel('Updated label');
// $first->getLabel() remains 'Default label' (distinct object state)
```

> **Note:** In PHP, object variables store **object identifiers (handles)**, not raw copies. Assigning `$b = $a` points both variables to the **same instance**; use `$b = clone $a` when you want a separate object.

---

## 3. Single Inheritance, `parent::` & Method Overriding

PHP supports **single class inheritance**: one child class can extend one parent class via `extends`.

- A child inherits all `public` and `protected` properties/methods.
- When overriding `__construct()` or any method in a child class, call `parent::__construct(...)` explicitly if parent initialization is needed (PHP does **not** invoke parent constructors automatically when overridden!).
- Keep overridden method parameter/return types compatible with the parent signature (contravariant parameters, covariant return types).

---

## 4. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/07-oop-foundations-and-inheritance/lab.php
```

---

## 5. Common Mistakes & Best Practices

- **Mistake:** Overriding `__construct()` in a subclass and forgetting `parent::__construct(...)`, leaving inherited `protected` properties uninitialized (`Error: Typed property must not be accessed before initialization`).
- **Mistake:** Deep inheritance hierarchies (4–5 levels deep). Prefer **composition** (injecting dependencies via constructor) and **interfaces** (Chapter 09) over deep `extends` chains.
- **Best Practice:** Always type-declare every property (`private string $name;`) so PHP enforces type invariants at assignment time.

---

## 6. Exercises & Interview Q&A

1. **Exercise:** Create a `Vehicle` base class with a constructor taking `$brand`, then extend it with `ElectricCar` adding `$batteryKwh` and invoking `parent::__construct($brand)`.
2. **Q: If you pass an object `$user` into a function and modify `$user->name = 'Bob'`, does the caller see the change?**  
   **A:** Yes. Object variables hold handles referencing the same underlying object instance in memory, so property mutations affect that shared instance (unless cloned).

---

⬅️ [Chapter 06](../06-strings-regex-and-datetime/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 08: Magic Methods & Object Lifecycle](../08-magic-methods-and-object-lifecycle/README.md)
