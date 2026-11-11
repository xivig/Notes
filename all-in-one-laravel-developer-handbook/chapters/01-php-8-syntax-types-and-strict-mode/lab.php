<?php

declare(strict_types=1);

/**
 * Chapter 01 Lab: Strict Types, Null Coalescing, Nullsafe Chains & Named Arguments.
 */

final readonly class UserProfile
{
    public function __construct(
        public ?string $avatarUrl,
        public string $bio = '',
    ) {}
}

final readonly class AuthenticatedUser
{
    public const string DEFAULT_ROLE = 'member';

    public function __construct(
        public int|string $id,
        public string $name,
        public ?UserProfile $profile = null,
    ) {}
}

function resolveAvatar(?AuthenticatedUser $user): string
{
    return $user?->profile?->avatarUrl ?? '/images/default-avatar.png';
}

function calculateTotalCents(int $priceCents, int $qty = 1, float $discount = 0.0): int
{
    return (int) round(($priceCents * $qty) * (1 - $discount));
}

// 1. Nullsafe + ?? vs Elvis ?:
$guest = null;
$memberNoProfile = new AuthenticatedUser(id: 101, name: 'Ada');
$memberZeroBio = new AuthenticatedUser(
    id: 'uuid-99',
    name: 'Grace',
    profile: new UserProfile(avatarUrl: '/avatars/grace.png', bio: '0'),
);

echo 'Guest avatar: ' . resolveAvatar($guest) . PHP_EOL;
echo 'No profile avatar: ' . resolveAvatar($memberNoProfile) . PHP_EOL;
echo 'With profile avatar: ' . resolveAvatar($memberZeroBio) . PHP_EOL;

// Difference between ?? (keeps "0") and ?: (treats "0" as falsy)
$rawInput = '0';
echo 'Null coalescing on "0": ' . ($rawInput ?? 'fallback') . PHP_EOL;
echo 'Elvis operator on "0": ' . ($rawInput ?: 'fallback') . PHP_EOL;

// 2. Strict typing & named arguments
$total = calculateTotalCents(priceCents: 2500, discount: 0.15);
echo 'Discounted single-item total (cents): ' . $total . PHP_EOL;

// 3. Demonstrate TypeError prevention in strict mode
try {
    /** @phpstan-ignore-next-line */
    calculateTotalCents('2500');
} catch (TypeError $e) {
    echo 'Caught strict TypeError as expected: ' . $e->getMessage() . PHP_EOL;
}
