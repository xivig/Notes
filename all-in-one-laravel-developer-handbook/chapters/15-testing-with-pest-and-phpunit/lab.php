<?php

declare(strict_types=1);

/**
 * Chapter 15 Lab: Lightweight Arrange-Act-Assert Test Runner (Policy + Validation + Fake Queue).
 */

final readonly class TaskEntity
{
    public function __construct(public int $id, public int $userId, public string $title) {}
}

final class TaskPolicyGuard
{
    public function canDelete(int $actorId, TaskEntity $task): bool
    {
        return $actorId === $task->userId;
    }
}

final class FakeQueueDispatcher
{
    /** @var list<string> */
    public array $pushed = [];

    public function push(string $jobClass): void
    {
        $this->pushed[] = $jobClass;
    }
}

final class MiniTestRunner
{
    private int $passed = 0;

    public function it(string $description, callable $case): void
    {
        $case();
        $this->passed++;
        echo "[PASS] {$description}" . PHP_EOL;
    }

    public function assertSame(mixed $expected, mixed $actual, string $label = ''): void
    {
        if ($expected !== $actual) {
            throw new AssertionError("Expected " . var_export($expected, true) . ', got ' . var_export($actual, true) . " ({$label})");
        }
    }

    public function totalPassed(): int
    {
        return $this->passed;
    }
}

$test = new MiniTestRunner();

$test->it('allows task owner to delete their own task', function () use ($test): void {
    $policy = new TaskPolicyGuard();
    $task = new TaskEntity(id: 1, userId: 42, title: 'Write Pest tests');

    $test->assertSame(true, $policy->canDelete(actorId: 42, task: $task), 'owner allowed');
});

$test->it('forbids stranger from deleting another user task', function () use ($test): void {
    $policy = new TaskPolicyGuard();
    $task = new TaskEntity(id: 1, userId: 42, title: 'Write Pest tests');

    $test->assertSame(false, $policy->canDelete(actorId: 99, task: $task), 'stranger forbidden');
});

$test->it('records pushed background job in fake queue', function () use ($test): void {
    $queue = new FakeQueueDispatcher();
    $queue->push('App\\Jobs\\SendWelcomePackJob');

    $test->assertSame(1, count($queue->pushed), 'job count');
    $test->assertSame('App\\Jobs\\SendWelcomePackJob', $queue->pushed[0], 'job class');
});

echo 'Total unit assertions passed: ' . $test->totalPassed() . PHP_EOL;
