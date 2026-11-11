<?php

declare(strict_types=1);

/**
 * Chapter 13 Lab (PHP 8.2 / 8.3+): Nullsafe Operator, Custom Attributes, #[SensitiveParameter] & #[Override]
 */

final readonly class Address
{
    public function __construct(public ?string $city) {}
}

final readonly class Profile
{
    public function __construct(public ?Address $address) {}
}

final readonly class AccountHolder
{
    public function __construct(public ?Profile $profile) {}
}

#[Attribute(Attribute::TARGET_CLASS | Attribute::TARGET_METHOD)]
final readonly class Route
{
    public function __construct(
        public string $path,
        public string $method = 'GET',
    ) {}
}

abstract class BaseController
{
    public function health(): string
    {
        return 'ok';
    }
}

#[Route('/api/users')]
final class UserController extends BaseController
{
    #[\Override]
    public function health(): string
    {
        return 'users-service:ok';
    }

    #[Route('/create', 'POST')]
    public function createUser(
        string $email,
        #[\SensitiveParameter] string $password,
    ): string {
        return "User {$email} queued (secret length=" . strlen($password) . ")";
    }
}

echo "=== Chapter 13: Nullsafe, Attributes & Safety Attributes ===" . PHP_EOL;

// 1. Nullsafe operator (?->)
$withCity    = new AccountHolder(new Profile(new Address('Berlin')));
$withoutCity = new AccountHolder(new Profile(null));

echo "With city    : " . ($withCity->profile?->address?->city ?? 'Unknown') . PHP_EOL;
echo "Without city : " . ($withoutCity->profile?->address?->city ?? 'Unknown') . PHP_EOL;

// 2. Attributes + Reflection inspection
$refClass = new ReflectionClass(UserController::class);
foreach ($refClass->getAttributes(Route::class) as $attr) {
    $route = $attr->newInstance();
    echo "Class Route  : {$route->method} {$route->path}" . PHP_EOL;
}

$refMethod = $refClass->getMethod('createUser');
foreach ($refMethod->getAttributes(Route::class) as $attr) {
    $route = $attr->newInstance();
    echo "Method Route : {$route->method} {$route->path}" . PHP_EOL;
}

$controller = new UserController();
echo "Override health(): " . $controller->health() . PHP_EOL;
echo $controller->createUser('asha@example.test', 'super-secret-pass') . PHP_EOL;
