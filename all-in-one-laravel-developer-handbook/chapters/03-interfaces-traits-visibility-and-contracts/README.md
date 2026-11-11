# Chapter 03 — Interfaces, Traits, Visibility & Contracts

Because PHP enforces **single class inheritance**, a model or controller can only `extend` one parent class. Laravel and packages like Filament or Spatie solve this cleanly by pairing **abstract base classes**, **interfaces (contracts)**, and **traits (horizontal code reuse)**.

---

## 1. Single Inheritance + Traits (`extends` + `use Trait`)

In Eloquent, a model inherits ORM behavior from `Model`, then stacks reusable capabilities via Traits:

```php
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory;
    use SoftDeletes;
}
```

### How Laravel Automatically Boots Traits (`bootTraitName`)
Any trait defining `public static function bootTraitName()` is automatically discovered and invoked when Eloquent boots the model — zero boilerplate inside your class! For example, `SoftDeletes` registers a global scope via `bootSoftDeletes()` so queries automatically add `WHERE deleted_at IS NULL`.

---

## 2. `extends` + `implements` (The Integration Contract)

When integrating admin panels, authorization gates, or domain services, you often implement an interface contract alongside inheritance:

```php
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements FilamentUser
{
    public function canAccessPanel(Panel $panel): bool
    {
        return str_ends_with($this->email, '@yourdomain.com')
            && $this->hasVerifiedEmail();
    }
}
```

- **Interface (`implements`)**: Guarantees a strict method signature contract at compile time.
- **Class (`extends`)**: Inherits state and default behavior from one parent.

---

## 3. The "Contract + Trait" Architecture Pattern

Libraries like Spatie Media Library pair an **interface** with a **trait**:

```php
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;
}
```

1. **Why require the Interface?** Type-hinting `function processUpload(HasMedia $entity)` lets services verify the object supports media operations without coupling to a concrete model class.
2. **Why provide the Trait?** `InteractsWithMedia` satisfies the dozens of methods declared in `HasMedia` automatically, keeping `Product` concise.

---

## 4. Abstract Classes vs Interfaces + Trait Composition in Controllers

An `abstract class` defines shared state or base implementations for closely related subclasses, while traits mix cross-cutting helpers cleanly:

```php
trait ApiResponse
{
    protected function success(mixed $data, string $message = 'OK', int $status = 200): array
    {
        return ['status' => $status, 'message' => $message, 'data' => $data];
    }
}

abstract class Controller
{
    use ApiResponse;
}

final class OrderController extends Controller
{
    public function show(int $id): array
    {
        return $this->success(['order_id' => $id]);
    }
}
```

---

## 5. Visibility (`public`, `protected`, `private`) & Property Rules

| Keyword | Accessible From | Laravel Rule of Thumb |
| :--- | :--- | :--- |
| `public` | Anywhere (routes, views, tests, container) | Route action methods (`index`, `store`), Service interfaces, constants |
| `protected` | Defining class + child classes (`Model`) | `$fillable`, `$hidden`, `casts(): array`, controller helper methods |
| `private` | Defining class only (hidden from subclasses) | Internal service helpers that children must NOT rely on or override |

> [!IMPORTANT]
> **Critical Eloquent & Routing Gotchas**
> - Laravel's `Model` reads `$fillable`, `$guarded`, `$table`, and `casts()` from a parent/base context — declaring them **`private`** hides them from Eloquent! Always keep Eloquent configuration `protected`.
> - Controller route methods (`index`, `show`, `store`) MUST be **`public`** so Laravel's router can invoke them; mark internal helper methods inside controllers `protected` or `private` so they are never mistaken for routable endpoints.
> - **Visibility Widening**: A subclass may widen visibility (`protected` -> `public`), never narrow it (`public` -> `protected`).

---

## Key Takeaways
- Use **Traits** for horizontal reuse (`SoftDeletes`, `HasFactory`, `ApiResponse`) and **Interfaces** to enforce contracts.
- Combine `implements Contract` + `use HelperTrait` whenever building extensible packages or domain behaviors.
- Keep route controller actions `public` and Eloquent properties (`$fillable`, `casts()`) `protected`.

## Try It Locally
```bash
php chapters/03-interfaces-traits-visibility-and-contracts/lab.php
```
