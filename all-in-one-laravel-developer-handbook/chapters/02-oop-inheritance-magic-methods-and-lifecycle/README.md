# Chapter 02 — OOP, Inheritance, Magic Methods & Lifecycle

Every Eloquent Model, Controller, FormRequest, Job, and Event in Laravel builds directly on PHP object-oriented fundamentals: class hierarchies, multi-level inheritance aliases, late static binding (`static::`), and magic methods (`__get`, `__set`, `__call`, `__toString`).

---

## 1. Aliasing & Multi-Level Inheritance in Laravel

When you open `app/Models/User.php` in a fresh Laravel project, you immediately see aliasing paired with multi-level inheritance:

```php
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    // ...
}
```

### Why `as Authenticatable` Exists
Because the framework base class is already named `User` (`Illuminate\Foundation\Auth\User`), importing both would cause a name collision in `App\Models\User`. Aliasing it with `as Authenticatable` resolves the conflict and clarifies its role.

### The Real Inheritance Chain Under the Hood
1. `App\Models\User` `extends` `Illuminate\Foundation\Auth\User`
2. `Illuminate\Foundation\Auth\User` `extends` `Illuminate\Database\Eloquent\Model`
3. Therefore `App\Models\User` inherits **both** authentication contracts (`Authorizable`, `Authenticatable`) **and** all Eloquent ORM methods (`save()`, `where()`, `relations`).

---

## 2. `parent::`, `self::`, `static::` & Late Static Binding

Eloquent relies heavily on `static::` (Late Static Binding) so helper methods defined in a parent class (`Model::query()`, `Model::create()`) return instances of the **called subclass** (`Post`, `User`), not the base `Model`:

```php
abstract class BaseModel
{
    public static function tableName(): string
    {
        return static::$table; // Resolves late to the calling child class
    }

    public static function make(): static
    {
        return new static();
    }
}

final class Post extends BaseModel
{
    protected static string $table = 'posts';
}

echo Post::tableName(); // "posts"
```

- `self::` binds at **compile time** to the class where the method is written.
- `static::` binds at **runtime** to whichever subclass is invoked.
- `parent::` explicitly calls the overridden implementation in the immediate superclass (for example `parent::__construct()`).

---

## 3. Magic Methods Behind Eloquent & Blade

Have you wondered how `$post->title` works when `Post` has no public `$title` property, or how `User::whereEmail(...)` works? Eloquent intercepts property and method access with PHP magic methods:

| Magic Method | Trigger | How Laravel Uses It |
| :--- | :--- | :--- |
| `__construct(...)` | `new ClassName(...)` | Dependency Injection via the Service Container |
| `__get(string $key)` | Reading inaccessible/missing property | Reads `$attributes[$key]` and resolves dynamic relationships |
| `__set(string $key, mixed $val)` | Writing inaccessible/missing property | Tracks dirty model attributes & triggers mutators/casts |
| `__isset(string $key)` | `isset($model->key)` / `empty(...)` | Required so Blade null checks (`$post->author ?? ...`) work |
| `__call(string $name, array $args)` | Calling missing instance method | Forwards calls to query scopes / relationship builders |
| `__callStatic(string $name, array $args)` | Calling missing static method | Powers `Model::where(...)`, Facades like `Route::get(...)` |
| `__toString()` | Casting object to string | Blade `{{ $model }}` or Stringable fluent objects (`Str::of()`) |
| `__serialize()` / `__unserialize()` | Serialization | Serializes models cleanly (`SerializesModels`) inside Queue Jobs |

---

## 4. Object Cloning, Identity (`===`) & Value Equality

In PHP, assigning `$b = $a` copies the **object handle**, meaning both variables mutate the **exact same instance**:
- Use `clone $a` to create a shallow duplicate (implement `__clone()` if nested objects must also be deep-cloned).
- In PHP 8.5+, `clone($obj, ['status' => 'published'])` simplifies immutable `with*()` updates on `readonly` classes.
- `$a === $b` checks whether both variables point to the **same instance**; `$a == $b` compares class + property values. Eloquent provides `$user->is($otherUser)` to compare primary key, table, and connection safely.

---

## Key Takeaways
- `class User extends Authenticatable` uses a `use ... as ...` import alias to build a clean multi-level hierarchy on top of `Eloquent\Model`.
- Prefer `static::` (and `: static` return type) when writing reusable factory or query methods on base classes.
- Understanding `__get`, `__set`, `__isset`, and `__callStatic` demystifies Eloquent attributes, dynamic scopes, and Facades.

## Try It Locally
```bash
php chapters/02-oop-inheritance-magic-methods-and-lifecycle/lab.php
```
