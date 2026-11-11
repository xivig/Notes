# Python Developer Glossary

Concise definitions of essential Python language, standard library, and software engineering terms.

---

### **Argument vs Parameter**
A **parameter** is a named variable in a function definition (`def greet(name):`); an **argument** is the value passed at the call site (`greet("Ada")`).

### **`asyncio` / Coroutine**
An asynchronous computation defined with `async def` that yields control at `await` points so one OS thread can multiplex thousands of concurrent I/O operations.

### **Context Manager**
An object supporting `with ... as ...:` via `__enter__` / `__exit__` (or `@contextlib.contextmanager`), guaranteeing deterministic resource cleanup (files, locks, DB transactions) even when exceptions occur.

### **`@dataclass`**
Class decorator generating `__init__`, `__repr__`, and `__eq__` automatically; combine `frozen=True` and `slots=True` (3.10+) for fast immutable Value Objects.

### **Decorator**
A callable wrapping another function or class (`@functools.wraps`) to layer reusable cross-cutting behavior such as timing, logging, caching, or authorization.

### **Exception Chaining (`raise ... from exc`)**
Attaches an underlying low-level exception as `__cause__` when raising a clearer domain exception, preserving full traceback diagnostics.

### **Generator**
A lazy function containing `yield` (or generator expression `(x for x in src)`) producing one value on demand instead of buffering full lists in RAM.

### **GIL (Global Interpreter Lock)**
Mutex in standard CPython builds serializing Python bytecode execution per process. I/O waits release the GIL (`ThreadPoolExecutor` / `asyncio`); heavy CPU tasks bypass it with `ProcessPoolExecutor` (or experimental free-threaded 3.13t+ builds).

### **Identity (`is`) vs Equality (`==`)**
`==` checks whether two objects hold equal values; `is` checks whether two names point to the exact same object in memory (standard idiom for `is None`).

### **Iterable vs Iterator**
An **iterable** implements `__iter__` and produces an **iterator**; an iterator implements `__next__` and tracks stateful traversal one item at a time.

### **LEGB Scope Rule**
Python's lexical name-resolution order: **L**ocal -> **E**nclosing functions -> module **G**lobal -> **B**uilt-ins.

### **Mutable Default Argument Trap**
Default values are evaluated once when `def` executes, not per call — never write `def f(x=[])`; always use `x: list[T] | None = None`.

### **`pathlib.Path`**
Object-oriented filesystem path abstraction replacing fragile `os.path.join` string concatenation across Windows, macOS, and Linux.

### **`Protocol` (`typing.Protocol`)**
Static duck-typing interface specifying expected methods/attributes without requiring runtime inheritance.

### **Shallow Copy vs Deep Copy**
`list.copy()` / `dict.copy()` duplicates only the top-level container, still sharing nested mutable objects; `copy.deepcopy()` recursively clones nested structures.

### **Virtual Environment (`.venv`)**
Isolated Python runtime directory keeping each project's third-party packages and interpreter version independent from global OS packages.
