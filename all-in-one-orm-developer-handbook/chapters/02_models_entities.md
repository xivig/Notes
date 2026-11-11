# Chapter 2 — Defining Models, Entities, Value Objects & Schema Mapping

How you map database columns to PHP types determines type safety, domain clarity, and defense against invalid states. This chapter compares **Laravel 12/13 Models + Casts + PHP Attributes** side by side with **Doctrine ORM 3 PHP 8 Attributes + Embeddable Value Objects**.

---

## 1. Laravel Eloquent Model (`App\Models\Product`)

In Laravel, database columns live in **migrations** (`database/migrations/`), while runtime coercion, mutability rules, and visibility live cleanly in the `Model`:

```php
<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

// Laravel 13 PHP Attributes work alongside classic $fillable / $hidden properties
#[Table(name: 'products')]
#[Fillable(['sku', 'name', 'price_cents', 'status', 'metadata', 'published_at'])]
#[Hidden(['internal_cost_cents'])]
final class Product extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    /** Tell HasUuids which secondary column uses UUID if id remains BIGINT: */
    public function uniqueIds(): array
    {
        return ['public_uuid'];
    }

    /** PHP 8 Backed Enum, JSON, immutable datetime & boolean casting: */
    protected function casts(): array
    {
        return [
            'price_cents' => 'integer',
            'status' => ProductStatus::class,
            'metadata' => 'array',
            'published_at' => 'immutable_datetime',
        ];
    }
}
```
```php
enum ProductStatus: string
{
    case Draft = 'draft';
    case Active = 'active';
    case Archived = 'archived';
}
```

---

## 2. Doctrine ORM 3 Entity + Value Objects (`#[ORM\Entity]`)

Doctrine makes the PHP Entity the **single source of truth** for schema structure (`doctrine:migrations:diff` generates SQL migrations by diffing your PHP attributes against the DB):

```php
<?php

declare(strict_types=1);

namespace App\Entity;

use App\Enum\ProductStatus;
use App\Repository\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Embeddable]
final readonly class Money
{
    public function __construct(
        #[ORM\Column(type: Types::INTEGER)]
        public int $amountCents,
        #[ORM\Column(length: 3)]
        public string $currency = 'USD',
    ) {
        if ($amountCents < 0) {
            throw new \InvalidArgumentException('Money amount cannot be negative.');
        }
    }
}

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\Table(name: 'products')]
#[ORM\Index(name: 'idx_products_status_created', columns: ['status', 'created_at'])]
#[ORM\UniqueConstraint(name: 'uniq_products_sku', columns: ['sku'])]
final class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: Types::BIGINT)]
    private ?int $id = null;

    #[ORM\Embedded(class: Money::class, columnPrefix: 'price_')]
    private Money $price; // Persists as price_amount_cents + price_currency!

    #[ORM\Column(length: 20, enumType: ProductStatus::class)]
    private ProductStatus $status = ProductStatus::Draft;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    private \DateTimeImmutable $createdAt;

    public function __construct(
        #[ORM\Column(length: 40)]
        private string $sku,
        #[ORM\Column(length: 180)]
        private string $name,
        Money $price,
    ) {
        $this->price = $price;
        $this->createdAt = new \DateTimeImmutable();
    }

    public function id(): ?int { return $this->id; }
    public function price(): Money { return $this->price; }
}
```

---

## 3. Primary Keys, Timestamps, Soft Deletes & Cast Comparison

| Mapping Concern | Laravel Eloquent | Symfony Doctrine ORM 3 |
| :--- | :--- | :--- |
| **Auto-Increment BigInt** | `$table->id();` (default `int`) | `#[ORM\Id] #[ORM\GeneratedValue] #[ORM\Column(type: Types::BIGINT)]` |
| **UUIDv7 / ULID** | `use HasUuids;` or `use HasUlids;` | `#[ORM\Id] #[ORM\Column(type: 'uuid')]` (`symfony/uid` `Uuid::v7()`) |
| **Enums** | `'status' => ProductStatus::class` in `casts()` | `#[ORM\Column(enumType: ProductStatus::class)]` |
| **Value Objects** | `AsArrayObject` / custom `CastsAttributes` class | `#[ORM\Embeddable]` + `#[ORM\Embedded]` (flattens into columns natively!) |
| **Decimals vs Money** | Store integer cents (`INTEGER`/`BIGINT`) or `'decimal:2'` cast | Store integer cents inside immutable `Money` Embeddable or `Types::DECIMAL` |
| **Soft Deletes** | Built-in `use SoftDeletes;` + `$table->softDeletes();` | `gedmo/doctrine-extensions` `@SoftDeleteable` SQL filter or explicit `archivedAt` |

---

## 4. Custom Value Object Cast in Eloquent (`CastsAttributes`)

Keep `Money` type safety in Eloquent too by binding custom casts:
```php
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

final class MoneyCast implements CastsAttributes
{
    public function get(Model $model, string $key, mixed $value, array $attributes): Money
    {
        return new Money((int) $value, (string) ($attributes['currency'] ?? 'USD'));
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): array
    {
        if (! $value instanceof Money) {
            throw new \InvalidArgumentException('Expected Money instance.');
        }

        return ['price_cents' => $value->amountCents, 'currency' => $value->currency];
    }
}
```

---

## Key Takeaways
- Avoid `FLOAT`/`DOUBLE` for financial amounts in both ORMs — store integer minor units (`amount_cents`) or `DECIMAL(12,2)` backed by a typed Value Object (`Money`).
- Prefer `immutable_datetime` / `\DateTimeImmutable` over mutable `Carbon`/`\DateTime` so passing timestamps around never mutates entity properties by accident.

> **Previous:** [Chapter 1 — ORM Architectures](./01_orm_setup.md) · **Next:** [Chapter 3 — Persisting, Upserts & Unit of Work](./03_saving_records.md)
