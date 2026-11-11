# Chapter 11 — Validation, Uploads, Policies, RBAC & Hardened Multi-Guard Auth

Complete, security-audited implementation of **FormRequests (`Store` + `Update` unique ignores)**, public/private file uploads, **Policies**, **RBAC pivot tables**, **Demo Project 3 (Task Manager)**, and **Hardened Multi-Guard Authentication (`web` vs `admin` + Blade Login View)**.

---

## 1. Dedicated FormRequests & Safe File Uploads

```bash
php artisan make:request StoreTaskRequest
php artisan make:request UpdateTaskRequest
```

```php
// app/Http/Requests/UpdatePostRequest.php
final class UpdatePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('update', $this->route('post')) ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:180'],
            // Ignore current row ID during unique slug check:
            'slug' => ['required', 'alpha_dash', Rule::unique('posts', 'slug')->ignore($this->route('post'))],
            'body' => ['required', 'string'],
            'cover' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }
}
```
Pass ONLY `$request->validated()` into `create()` / `update()`.
- **Public assets**: `$path = $request->file('cover')->store('post-covers', 'public');` (delete replaced image with `Storage::disk('public')->delete($oldPath)`).
- **Private documents**: `$path = $request->file('doc')->store('private-docs', 'local');`, streamed strictly after `Gate::authorize('download', $doc)`.

---

## 2. Policies (`TaskPolicy` / `PostPolicy`) & RBAC Pivot Architecture

```bash
php artisan make:policy TaskPolicy --model=Task
```

```php
final class TaskPolicy
{
    public function update(User $user, Task $task): bool
    {
        return $user->id === $task->user_id || $user->hasPermission('tasks.edit_any');
    }

    public function delete(User $user, Task $task): bool
    {
        return $this->update($user, $task);
    }
}
```

### RBAC Tables Schema (`roles`, `permissions`, `role_user`, `permission_role`)
When admins & editors share one `users` table, prefer single-guard RBAC over duplicating auth tables:
```php
Schema::create('roles', fn (Blueprint $t) => $t->id() && $t->string('name')->unique());
Schema::create('permissions', fn (Blueprint $t) => $t->id() && $t->string('name')->unique());
Schema::create('role_user', function (Blueprint $t) {
    $t->foreignId('role_id')->constrained()->cascadeOnDelete();
    $t->foreignId('user_id')->constrained()->cascadeOnDelete();
    $t->primary(['role_id', 'user_id']);
});
Schema::create('permission_role', function (Blueprint $t) {
    $t->foreignId('permission_id')->constrained()->cascadeOnDelete();
    $t->foreignId('role_id')->constrained()->cascadeOnDelete();
    $t->primary(['permission_id', 'role_id']);
});
```

---

## 3. Demo Project 3 — Policy-Guarded Task Manager CRUD

```php
final class TaskController extends Controller
{
    public function index(Request $request): View
    {
        $tasks = $request->user()->tasks()->latest()->paginate(15);
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

    public function destroy(Task $task): RedirectResponse
    {
        Gate::authorize('delete', $task);
        $task->delete();
        return to_route('tasks.index')->with('success', 'Task deleted!');
    }
}
```

Blade snippet (`resources/views/tasks/index.blade.php`):
```blade
<ul class="divide-y divide-slate-800 rounded-xl border border-slate-800">
    @forelse ($tasks as $task)
        <li class="flex items-center justify-between p-4">
            <span>{{ $task->title }}</span>
            <div class="flex items-center gap-3 text-sm">
                @can('update', $task)
                    <a href="{{ route('tasks.edit', $task) }}" class="text-indigo-400">Edit</a>
                @endcan
                @can('delete', $task)
                    <form action="{{ route('tasks.destroy', $task) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-rose-400">Delete</button>
                    </form>
                @endcan
            </div>
        </li>
    @empty
        <li class="p-6 text-center text-slate-400">No tasks found.</li>
    @endforelse
</ul>
```

---

## 4. Hardened Multi-Guard Authentication (`web` vs `admin`)

Use separate `web` and `admin` guards ONLY when threat models require separate DB tables and completely isolated login sessions.

```bash
php artisan make:model Admin -mfs
php artisan make:controller AdminController
php artisan make:middleware AdminMiddleware
```

### Step 1: `Admin` Model & `config/auth.php`
- Extend `Illuminate\Foundation\Auth\User as Authenticatable` with `casts(): ['email_verified_at' => 'datetime', 'password' => 'hashed']`.
- In `config/auth.php`, bind **`'model' => App\Models\Admin::class` directly** on the `admins` provider (NEVER `env('AUTH_MODEL', ...)`, preventing `.env` overrides from querying `users`!).

### Step 2: Middleware (`bootstrap/app.php`) & `AdminSeeder`
```php
// app/Http/Middleware/AdminMiddleware.php
if (! Auth::guard('admin')->check()) {
    return redirect()->route('admin.login')->with('error', 'Administrator login required.');
}

// bootstrap/app.php
->withMiddleware(function (Middleware $middleware): void {
    $middleware->alias(['admin' => \App\Http\Middleware\AdminMiddleware::class]);
})
```
```php
// database/seeders/AdminSeeder.php
Admin::firstOrCreate(
    ['email' => 'admin@example.com'],
    ['name' => 'Super Admin', 'password' => Hash::make('change-this-password'), 'email_verified_at' => now()]
);
```

### Step 3: `AdminController` (Session Regeneration + CSRF `POST` Logout) & Login View
```php
final class AdminController extends Controller
{
    public function index(): View { return view('admin.dashboard'); }
    public function showLoginForm(): View { return view('admin.login'); }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (Auth::guard('admin')->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate(); // Stops session fixation!
            return redirect()->intended(route('admin.dashboard'))->with('success', 'Welcome to Admin Dashboard!');
        }

        return back()->onlyInput('email')->with('error', 'Invalid credentials.');
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return to_route('admin.login')->with('success', 'Signed out cleanly.');
    }
}
```
```php
// routes/web.php
Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest:admin')->group(function () {
        Route::get('/login', [AdminController::class, 'showLoginForm'])->name('login');
        Route::post('/login', [AdminController::class, 'store'])->middleware('throttle:5,1')->name('login.submit');
    });
    Route::middleware('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');
        Route::post('/logout', [AdminController::class, 'destroy'])->name('logout');
    });
});
```
```blade
{{-- resources/views/admin/login.blade.php --}}
<form action="{{ route('admin.login.submit') }}" method="POST" class="w-full max-w-md mx-auto p-8 space-y-5">
    @csrf
    <h1 class="text-xl font-bold">Administrator Login</h1>
    <x-forms.input name="email" type="email" required autofocus />
    <x-forms.input name="password" type="password" required />
    <label class="flex items-center gap-2 text-sm"><input type="checkbox" name="remember" value="1"> Keep me signed in</label>
    <button type="submit" class="w-full rounded-lg bg-rose-600 py-2.5 text-white font-semibold">Sign In</button>
</form>
```
