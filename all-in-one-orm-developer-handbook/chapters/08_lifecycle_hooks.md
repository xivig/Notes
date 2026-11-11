# Chapter 8 — Mutators, Accessors, Observers & Lifecycle Hooks

Transforming attributes transparently, auto-generating slugs, busting caches on writes, and enforcing invariants across persistence events work very differently across **Active Record (Eloquent)** and **Data Mapper (Doctrine ORM 3)**.

---

## 1. Accessors, Mutators & Casts (`Eloquent`) vs Property Normalization (`Doctrine`)

### Laravel Eloquent (`Attribute::make` — Modern PHP 8 Syntax)
```php
use Illuminate\Database\Eloquent\Casts\Attribute;

final class User extends Model
{
    protected function email(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => strtolower($value),
            set: fn (string $value) => ['email' => trim(strtolower($value))],
        );
    }

    // Computed virtual attribute (never stored in SQL table):
    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn () => "{$this->first_name} {$this->last_name}",
        )->shouldCache();
    }
}
```

### Symfony Doctrine ORM 3 (Domain Constructor + Private Setters)
In Data Mapper architecture, **normalization belongs inside domain constructors and methods**, NOT hidden magic mutators:
```php
#[ORM\Entity]
final class User
{
    #[ORM\Column(length: 180, unique: true)]
    private string $email;

    public function __construct(string $email)
    {
        $this->changeEmail($email);
    }

    public function changeEmail(string $email): void
    {
        $clean = mb_strtolower(trim($email));
        if (! filter_var($clean, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException('Invalid email address.');
        }
        $this->email = $clean;
    }
}
```

---

## 2. Observers, Entity Listeners & Lifecycle Callbacks

| Lifecycle Phase | Eloquent Event / Observer | Doctrine Callback / Listener |
| :--- | :--- | :--- |
| **Before First Insert** | `creating` (`booted()` closure or `PostObserver::creating()`) | `#[ORM\PrePersist]` (on entity) or `prePersist` listener |
| **After Insert** | `created` (implement `ShouldHandleEventsAfterCommit`!) | `#[ORM\PostPersist]` / `postPersist` |
| **Before Update** | `updating` | `#[ORM\PreUpdate]` (receives `PreUpdateEventArgs` to inspect old/new changeset!) |
| **Flush Batch Hook** | *(No UnitOfWork flush)* | `onFlush` / `postFlush` (`EntityManager` batch inspection) |
| **Deletion / Soft Delete** | `deleting`, `deleted`, `restoring` | `preRemove`, `postRemove` |

### Eloquent Observer With Commit Safety
```php
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;

#[ObservedBy([PostObserver::class])]
final class Post extends Model {}

final class PostObserver implements ShouldHandleEventsAfterCommit
{
    public function creating(Post $post): void
    {
        $post->slug ??= str($post->title)->slug()->toString();
    }

    public function saved(Post $post): void
    {
        Cache::forget("posts.{$post->id}");
    }
}
```

### Doctrine Entity Listener (`#[AsEntityListener]`) — Preferred Over Self-Callbacks for Service DI!
Never inject repositories, loggers, or cache services directly into a Doctrine Entity — bind a dedicated **Entity Listener** cleanly in Symfony/Doctrine:
```php
#[AsEntityListener(event: Events::prePersist, entity: Post::class)]
#[AsEntityListener(event: Events::postUpdate, entity: Post::class)]
final readonly class PostLifecycleListener
{
    public function __construct(private SluggerInterface $slugger, private CacheInterface $cache) {}

    public function prePersist(Post $post): void
    {
        $post->ensureSlug($this->slugger->slug($post->title())->lower()->toString());
    }

    public function postUpdate(Post $post): void
    {
        $this->cache->delete("posts.{$post->id()}");
    }
}
```

---

## 3. Critical Lifecycle Gotchas (Both ORMs!)
1. **Mass Updates Bypass Hooks!**
   - Laravel `Post::where('status', 'draft')->update(['status' => 'archived'])` and Doctrine DQL `UPDATE App\Entity\Post p SET p.status = 'archived'` execute direct SQL and **DO NOT trigger `updating`, `saved`, `PreUpdate`, or `postUpdate` hooks**!
2. **Never Call `$em->flush()` Inside a Doctrine `prePersist` / `preUpdate` / `onFlush` Listener!**
   - Doing so causes infinite recursion or corrupts the active `UnitOfWork` commit sequence.
3. **Modifying Properties Inside `preUpdate` Requires Care / Recompute ChangeSet**:
   - In `onFlush`, changing any entity property requires calling `$uow->recomputeSingleEntityChangeSet($classMetadata, $entity)` so Doctrine emits SQL for the mutated field.

---

## Key Takeaways
- Keep external dependencies (`Cache`, `Mailer`, `Slugger`) out of Entities/Models — place side effects in **Observers** (`ShouldHandleEventsAfterCommit`) or **Doctrine EntityListeners**.
- Remember bulk `update()` and DQL `UPDATE` skip every ORM lifecycle callback.

> **Previous:** [Chapter 7 — ACID & Locks](./07_orm_transactions.md) · **Next:** [Chapter 9 — Sorting, Offset Traps & Cursor Pagination](./09_sorting_pagination.md)
