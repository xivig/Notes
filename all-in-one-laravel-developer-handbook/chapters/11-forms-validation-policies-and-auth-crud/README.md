# Chapter 11 — Forms, Validation, Policies & Demo Project 3 (Auth Task Manager)

Real applications require authentication, ownership checks, server-side validation (`FormRequest`), CSRF protection, and flash feedback. In this chapter we build a complete **Authenticated Task Manager CRUD App** cleanly on modern Laravel 12/13 patterns.

---

## 1. Choosing Authentication in Laravel 12 / 13

Modern `laravel new` gives you maintained, batteries-included **Starter Kits** right out of the box (superseding standalone legacy `laravel/breeze` for new projects, though Breeze/Fortify remain common in existing Laravel 11/12 apps):

- **Livewire Starter Kit**: Livewire 4 + Flux UI + Volt (reactive server-rendered PHP — zero separate SPA needed).
- **React / Vue Starter Kit**: Inertia 2 + TypeScript + Tailwind CSS v4 + shadcn/ui components.
- **WorkOS AuthKit Option**: Enterprise SSO, passkeys, and social OAuth via `laravel new --workos`.
- **Classic Blade + Breeze**: `composer require laravel/breeze --dev && php artisan breeze:install blade` if you specifically prefer plain Blade controllers on Laravel 11/12.

Whichever kit you pick, every authenticated user accesses routes protected by `middleware('auth')` via `$request->user()` or `Auth::user()`.

---

## 2. Demo Project 3 — Authenticated Task Manager (Full CRUD + Policy)

### Step 1: Migration & `Task` Model
```bash
php artisan make:model Task -mc
php artisan make:policy TaskPolicy --model=Task
php artisan make:request StoreTaskRequest
php artisan make:request UpdateTaskRequest
```

Migration `create_tasks_table`:
```php
Schema::create('tasks', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('title');
    $table->text('notes')->nullable();
    $table->boolean('is_completed')->default(false);
    $table->timestamps();
});
```

Model `app/Models/Task.php`:
```php
class Task extends Model
{
    protected $fillable = ['user_id', 'title', 'notes', 'is_completed'];

    protected function casts(): array
    {
        return ['is_completed' => 'boolean'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

### Step 2: Ownership Authorization (`app/Policies/TaskPolicy.php`)
Never rely on hidden form IDs for security — enforce row ownership on the server with a **Policy**:

```php
final class TaskPolicy
{
    public function view(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }

    public function update(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }

    public function delete(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }
}
```

### Step 3: Dedicated Validation (`app/Http/Requests/StoreTaskRequest.php`)
Moving validation rules out of controllers into `FormRequest` keeps controllers tiny and reusable:

```php
final class StoreTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
```

### Step 4: Controller (`app/Http/Controllers/TaskController.php`)
Notice `$request->validated()` + `Gate::authorize('update', $task)`:

```php
final class TaskController extends Controller
{
    public function index(Request $request): View
    {
        $tasks = $request->user()
            ->tasks()
            ->latest()
            ->paginate(15);

        return view('tasks.index', compact('tasks'));
    }

    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $request->user()->tasks()->create($request->validated());

        return to_route('tasks.index')->with('success', 'Task created!');
    }

    public function edit(Task $task): View
    {
        Gate::authorize('update', $task);
        return view('tasks.edit', compact('task'));
    }

    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        Gate::authorize('update', $task);

        $task->update([
            'title' => $request->validated('title'),
            'notes' => $request->validated('notes'),
            'is_completed' => $request->boolean('is_completed'),
        ]);

        return to_route('tasks.index')->with('success', 'Task updated!');
    }

    public function destroy(Task $task): RedirectResponse
    {
        Gate::authorize('delete', $task);
        $task->delete();

        return to_route('tasks.index')->with('success', 'Task deleted!');
    }
}
```

### Step 5: Routes (`routes/web.php`)
```php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('tasks', TaskController::class)->except(['show']);
});
```

### Step 6: Blade View (`resources/views/tasks/index.blade.php`)
> Note: Ensure `@forelse` always closes cleanly with `@endforelse`!

```blade
<x-app-layout>
    <div class="max-w-3xl mx-auto py-8 px-4 space-y-6">
        @if (session('success'))
            <div class="rounded-lg bg-emerald-950 border border-emerald-700 px-4 py-3 text-emerald-200">
                {{ session('success') }}
            </div>
        @endif

        <form action="{{ route('tasks.store') }}" method="POST" class="flex gap-3">
            @csrf
            <input type="text" name="title" value="{{ old('title') }}"
                   placeholder="Add a new task..." class="flex-1 rounded border px-3 py-2 text-slate-900">
            <button type="submit" class="rounded bg-indigo-600 px-4 py-2 text-white font-medium">
                Add Task
            </button>
        </form>
        @error('title')
            <p class="text-sm text-rose-400">{{ $message }}</p>
        @enderror

        <ul class="divide-y divide-slate-800 rounded-xl border border-slate-800">
            @forelse ($tasks as $task)
                <li class="flex items-center justify-between p-4">
                    <span class="{{ $task->is_completed ? 'line-through text-slate-500' : '' }}">
                        {{ $task->title }}
                    </span>
                    <div class="flex items-center gap-3 text-sm">
                        @can('update', $task)
                            <a href="{{ route('tasks.edit', $task) }}" class="text-indigo-400">Edit</a>
                        @endcan
                        @can('delete', $task)
                            <form action="{{ route('tasks.destroy', $task) }}" method="POST" class="inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-rose-400">Delete</button>
                            </form>
                        @endcan
                    </div>
                </li>
            @empty
                <li class="p-6 text-center text-slate-400">No tasks found. Add one above!</li>
            @endforelse
        </ul>

        {{ $tasks->links() }}
    </div>
</x-app-layout>
```

---

## Key Takeaways
- Keep validation rules in **FormRequest** subclasses and pass `$request->validated()` — never raw `$request->all()`.
- Always enforce row-level security with **Policies** (`Gate::authorize(...)`) AND mirror UI affordances with `@can(...)`.
- Double-check `@forelse` ... `@empty` ... `@endforelse` pairing and `@csrf` / `@method(...)` on mutation forms.
