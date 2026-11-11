# 📖 Modern PHP Developer Glossary (A–Z)

Authoritative definitions for core PHP runtime, language, tooling, and security concepts.

---

- **Asymmetric Visibility (`public private(set)`)**: Introduced in PHP 8.4; lets a property have separate read and write visibility scopes (e.g., readable publicly, writable only within the class).
- **Attributes (`#[Attribute]`)**: Native structured metadata classes introduced in PHP 8.0, replacing unstructured docblock annotations and queryable at runtime via `Reflection`.
- **Backed Enum**: An enumeration backed by a unique `int` or `string` scalar value (`enum Status: string`), exposing `->value`, `::from()`, and `::tryFrom()`.
- **Closure**: An anonymous function (`function () {}`, `fn () => ...`, or `fn(...)`) implemented internally via the `\Closure` class.
- **Composer**: The standard dependency manager and PSR-4 autoloader generator for PHP projects.
- **Constructor Property Promotion**: PHP 8.0 shorthand declaring and initializing class properties directly inside `__construct()` parameter lists.
- **CSRF (Cross-Site Request Forgery)**: An attack tricking an authenticated browser into submitting unwanted state-changing requests; mitigated via `SameSite` cookies and CSPRNG tokens verified with `hash_equals()`.
- **`declare(strict_types=1);`**: File-level directive enforcing strict scalar type checking on function calls and returns within that file.
- **DNF Types**: Disjunctive Normal Form type declarations (PHP 8.2+), combining union and intersection types such as `(Countable & Iterator) | null`.
- **Fiber**: Cooperative, stackful concurrency primitive introduced in PHP 8.1 (`Fiber::suspend()`, `$fiber->resume()`) used by async PHP event loops.
- **First-Class Callable Syntax**: PHP 8.1 syntax (`strlen(...)`, `$obj->method(...)`) creating a `Closure` directly from any callable expression.
- **Generator (`yield`)**: Function returning a `Generator` iterator that computes values lazily on demand in $O(1)$ memory.
- **JIT (Just-In-Time Compiler)**: Zend Engine component added in PHP 8.0 compiling hot opcodes directly to native machine code for CPU-bound workloads.
- **Late Static Binding (`static::`)**: Resolves static method/property calls to the class invoked at runtime rather than the parent class where the code was written (`self::`).
- **`match` Expression**: PHP 8.0 strict (`===`), non-falling-through, exhaustive expression returning a value directly.
- **Nullsafe Operator (`?->`)**: PHP 8.0 operator short-circuiting chained property/method accesses to `null` if the receiver is `null`.
- **OPcache**: Built-in shared-memory opcode cache eliminating repeated PHP file parsing and compilation across requests.
- **PDO (PHP Data Objects)**: Standard, database-agnostic PHP extension supporting prepared statements, transactions, and driver portability (`mysql`, `pgsql`, `sqlite`).
- **PER Coding Style 2.0**: Evolving PHP-FIG coding standard succeeding PSR-12 for modern PHP 8+ syntax formatting.
- **Pipe Operator (`|>`)**: PHP 8.5 left-to-right function chaining operator passing the left expression's output as the single argument to the right callable.
- **Property Hooks**: PHP 8.4 syntax attaching `get` and `set` behaviors directly to class properties.
- **PSR-4**: PHP-FIG autoloading specification mapping namespace prefixes directly to filesystem directory structures.
- **`readonly`**: Modifier (properties in PHP 8.1, whole classes in PHP 8.2) preventing property reassignment after initialization.
- **SAPI (Server API)**: Interface between the PHP Zend Engine and the host environment (`cli`, `fpm-fcgi`, `cli-server`, `apache2handler`).
- **`Stringable`**: Interface introduced in PHP 8.0 automatically implemented by any class declaring `__toString(): string`.
- **Trait**: Horizontal code-reuse mechanism (`trait Loggable`) inserted into classes at compile time.
- **`WeakMap`**: PHP 8.0 key-value map keyed by objects without preventing garbage collection when object keys lose external references.
