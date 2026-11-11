# Chapter 19 — Full-Stack Reactivity (Livewire 4, Inertia 2, Echo), Localization & Official Packages

Round out modern Laravel 12/13 engineering with interactive full-stack UI stacks (**Livewire 4** and **Inertia 2**), real-time private WebSocket channels (**Reverb + Laravel Echo**), **Localization (`i18n`)**, and official packages (**Socialite**, **Cashier**, **Scout**).

---

## 1. Reactive PHP UI with Livewire 4 (`wire:model.live` + `#[Url]`)

```bash
php artisan make:livewire PostSearch
```

```php
// app/Livewire/PostSearch.php
<?php

declare(strict_types=1);

namespace App\Livewire;

use App\Models\Post;
use Illuminate\Contracts\View\View;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

final class PostSearch extends Component
{
    use WithPagination;

    #[Url(except: '')]
    public string $search = '';

    public function updatedSearch(): void
    {
        $this->resetPage();
    }

    public function render(): View
    {
        return view('livewire.post-search', [
            'posts' => Post::published()
                ->when($this->search !== '', fn ($q) => $q->where('title', 'like', "%{$this->search}%"))
                ->latest('published_at')
                ->paginate(10),
        ]);
    }
}
```
```blade
{{-- resources/views/livewire/post-search.blade.php --}}
<div>
    <input type="search" wire:model.live.debounce.300ms="search" placeholder="Search articles...">
    @foreach ($posts as $post)
        <article wire:key="post-{{ $post->id }}">{{ $post->title }}</article>
    @endforeach
    {{ $posts->links() }}
</div>
```
*(In Pest tests: `Livewire::test(PostSearch::class)->set('search', 'Laravel')->assertSee('Laravel Guide');`)*

---

## 2. Server-Routed React / Vue SPAs with Inertia 2

Keep server sessions, CSRF protection, and Eloquent models without maintaining a separate REST client:
```php
// app/Http/Controllers/PostController.php
use Inertia\Inertia;
use Inertia\Response;

public function index(Request $request): Response
{
    return Inertia::render('Posts/Index', [
        'posts' => PostResource::collection(Post::with('author:id,name')->latest()->paginate(15)),
        'filters' => $request->only(['search']),
    ]);
}
```
```tsx
// resources/js/pages/Posts/Index.tsx (React + TypeScript)
import { Link, useForm } from '@inertiajs/react';

export function QuickCreateForm() {
    const { data, setData, post, processing, errors } = useForm({ title: '' });
    return (
        <form onSubmit={(e) => { e.preventDefault(); post('/posts'); }}>
            <input value={data.title} onChange={(e) => setData('title', e.target.value)} />
            {errors.title && <p>{errors.title}</p>}
            <button disabled={processing}>Save Post</button>
        </form>
    );
}
```

---

## 3. Real-Time Broadcasting (`ShouldBroadcast` + `channels.php` + Laravel Echo)

1. Broadcast an event after database changes (`implements ShouldBroadcast`):
   ```php
   final class OrderUpdated implements ShouldBroadcast
   {
       use Dispatchable, InteractsWithSockets, SerializesModels;

       public function __construct(public readonly Order $order) {}

       public function broadcastOn(): array
       {
           return [new PrivateChannel('orders.' . $this->order->id)];
       }
   }
   ```
2. Authorize private channel listeners inside `routes/channels.php`:
   ```php
   Broadcast::channel('orders.{orderId}', fn (User $user, int $orderId): bool =>
       $user->orders()->whereKey($orderId)->exists()
   );
   ```
3. Listen on the frontend via **Laravel Echo** connected to **Laravel Reverb**:
   ```javascript
   window.Echo.private(`orders.${orderId}`)
       .listen('OrderUpdated', (event) => {
           console.log('Live status:', event.order.status);
       });
   ```

---

## 4. Localization & Multi-Language (`i18n`)

Store JSON translations cleanly in `lang/en.json` and `lang/es.json` (publish `lang/` via `php artisan lang:publish`):
```php
// Middleware switching active locale per user preference or URL segment
app()->setLocale(session('locale', config('app.locale')));

// Blade / Controllers / Notifications
__('Welcome back, :name', ['name' => $user->name]);
trans_choice('{0} No posts|{1} :count post|[2,*] :count posts', $count);
```

---

## 5. Official Ecosystem Packages (`Socialite`, `Cashier`, `Scout`)

| Package | Purpose | Core Entry Pattern |
| :--- | :--- | :--- |
| **Laravel Socialite** | OAuth login (GitHub, Google, LinkedIn) | `Socialite::driver('github')->redirect()` -> `Socialite::driver('github')->user()` -> `User::updateOrCreate(...)` |
| **Laravel Cashier** | Stripe / Paddle recurring billing & Checkout | `$user->newSubscription('pro', $priceId)->checkout(['success_url' => ..., 'cancel_url' => ...])` + Stripe webhooks |
| **Laravel Scout** | Full-text driver search (Meilisearch, Typesense, PostgreSQL/MySQL `database`) | `use Searchable;` on Model + `#[SearchUsingFullText(['title', 'body'])]` + `Post::search($q)->paginate(15)` |

```php
// Example: Scout searchable attributes + database engine query
final class Post extends Model
{
    use HasFactory, Searchable;

    #[SearchUsingFullText(['title', 'body'])]
    public function toSearchableArray(): array
    {
        return ['title' => $this->title, 'body' => $this->body];
    }
}
```
