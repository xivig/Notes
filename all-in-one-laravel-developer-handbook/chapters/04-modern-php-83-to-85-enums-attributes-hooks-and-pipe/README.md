# Chapter 04 — Modern PHP (8.0–8.5): Enums, Attributes, Property Hooks & Pipe

Laravel 12 requires PHP >= 8.2 (supporting 8.3–8.5) and **Laravel 13 (March 2026) requires PHP >= 8.3** and natively embraces PHP Attributes, Backed Enums, Constructor Promotion, `match`, and `readonly` DTOs.

---

## 1. Constructor Property Promotion & `readonly` Classes (PHP 8.0–8.2)

Instead of declaring properties, parameters, and `$this->x = $x` three times, promote constructor arguments directly:

```php
final readonly class CreateOrderData
{
    public function __construct(
        public int $userId,
        public int $totalCents,
        public string $currency = 'USD',
    ) {}
}
```

Marking the entire class `readonly` (PHP 8.2+) automatically makes every promoted property immutable — ideal for Data Transfer Objects (DTOs), Service responses, and Value Objects passed into Laravel Actions.

---

## 2. `match` Expression & Backed Enums (PHP 8.0–8.1)

Unlike `switch`, `match` compares with strict identity (`===`), needs no `break`, returns a value directly, and throws `UnhandledMatchError` if a case is missed:

```php
enum OrderStatus: string
{
    case Pending = 'pending';
    case Paid = 'paid';
    case Shipped = 'shipped';

    public function badgeColor(): string
    {
        return match ($this) {
            self::Pending => 'amber',
            self::Paid => 'emerald',
            self::Shipped => 'indigo',
        };
    }
}
```

### Eloquent Enum Casting
In Laravel models, define `casts(): array` so `$order->status` automatically hydrates into an `OrderStatus` instance:

```php
protected function casts(): array
{
    return [
        'status' => OrderStatus::class,
    ];
}
```

---

## 3. PHP Attributes (`#[...]`) — Core to Laravel 13

Attributes attach structured metadata to classes, methods, or properties — inspectable at runtime via `ReflectionClass::getAttributes()`.

While PHP 8.0 introduced attributes and Laravel has supported `#[ObservedBy]` / `#[ScopedBy]` on models, **Laravel 13** expanded first-class PHP Attributes across Models, Jobs, Commands, FormRequests, and Policies:

```php
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Table;

#[Table(name: 'posts')]
#[Fillable(['title', 'slug', 'body', 'published_at'])]
#[Hidden(['internal_notes'])]
final class Post extends Model
{
    // Replaces property boilerplate cleanly when preferred
}
```

On queued Jobs and Commands in Laravel 13:
```php
#[Tries(5)]
#[Timeout(120)]
#[Connection('redis')]
final class ProcessInvoiceJob implements ShouldQueue
{
    // ...
}
```

---

## 4. PHP 8.3 Highlights

- **Typed class constants**: `public const string ROLE_ADMIN = 'admin';`
- **`#[Override]` attribute**: Tells PHP to fail at compile/load time if a parent method signature changes and your subclass no longer overrides anything!
- **`json_validate(string $json)`**: Validates JSON syntax without allocating decoded arrays in memory.

---

## 5. PHP 8.4 Highlights (When Running PHP >= 8.4)

- **Property Hooks**: Native `get` and `set` interceptors on properties, replacing boilerplate getters/setters:
  ```php
  final class EmailAddress
  {
      public string $value {
          set => strtolower(trim($value));
      }
  }
  ```
- **Asymmetric Visibility**: `public private(set) string $slug;` — readable anywhere, writable only inside the class.
- **Chaining `new` without outer parentheses**: `(new Pipeline())->send($x)` can now be written `new Pipeline()->send($x)`.
- **New Array Finders**: `array_find()`, `array_find_key()`, `array_any()`, `array_all()`.

---

## 6. PHP 8.5 Highlights (When Running PHP >= 8.5)

- **Pipe Operator (`|>`)**: Passes left-hand value into a right-hand unary callable cleanly from top to bottom:
  ```php
  $slug = '  Hello Laravel 13!  '
      |> trim(...)
      |> strtolower(...)
      |> (fn (string $s): string => str_replace(' ', '-', $s));
  ```
- **`clone($object, ['status' => 'published'])`**: Concise immutable updates for `readonly` DTOs and models.
- **`#[NoDiscard]` attribute**, `array_first()`, and `array_last()`.

---

## Key Takeaways
- Use `readonly class` DTOs + Constructor Promotion to pass validated data safely from FormRequests into Actions/Services.
- Combine Backed Enums with `match` + Eloquent `casts(): array` to eliminate magic strings.
- Use `#[Override]` (PHP 8.3+) and Laravel 13 Attributes (`#[Fillable]`, `#[Tries]`) for cleaner, type-checked metadata.

## Try It Locally
```bash
php chapters/04-modern-php-83-to-85-enums-attributes-hooks-and-pipe/lab.php
# On PHP >= 8.4 / 8.5:
php chapters/04-modern-php-83-to-85-enums-attributes-hooks-and-pipe/lab-php84.php
php chapters/04-modern-php-83-to-85-enums-attributes-hooks-and-pipe/lab-php85.php
```
