<?php

declare(strict_types=1);

/**
 * Chapter 04 Lab (PHP 8.3+ compatible):
 * Constructor Promotion, Readonly DTOs, Backed Enums, match, json_validate, #[Override] & Attributes.
 */

#[Attribute(Attribute::TARGET_CLASS)]
final readonly class TableAttribute
{
    public function __construct(public string $name) {}
}

#[Attribute(Attribute::TARGET_CLASS)]
final readonly class TriesAttribute
{
    public function __construct(public int $count) {}
}

enum TaskStatus: string
{
    case Todo = 'todo';
    case Doing = 'doing';
    case Done = 'done';

    public function label(): string
    {
        return match ($this) {
            self::Todo => 'To Do',
            self::Doing => 'In Progress',
            self::Done => 'Completed',
        };
    }
}

final readonly class TaskDto
{
    public function __construct(
        public string $title,
        public TaskStatus $status = TaskStatus::Todo,
    ) {}
}

abstract class BaseJob
{
    public function queueName(): string
    {
        return 'default';
    }
}

#[TableAttribute(name: 'export_jobs')]
#[TriesAttribute(count: 5)]
final class ExportReportJob extends BaseJob
{
    #[\Override]
    public function queueName(): string
    {
        return 'reports';
    }
}

$dto = new TaskDto(title: 'Upgrade to Laravel 13', status: TaskStatus::Doing);
echo "Task: {$dto->title} [{$dto->status->value} => {$dto->status->label()}]" . PHP_EOL;

$json = '{"framework":"Laravel","version":13}';
echo 'json_validate valid? ' . (json_validate($json) ? 'yes' : 'no') . PHP_EOL;

// Inspect PHP Attributes at runtime via Reflection (just like Laravel does!)
$refl = new ReflectionClass(ExportReportJob::class);
foreach ($refl->getAttributes() as $attr) {
    $instance = $attr->newInstance();
    echo 'Attribute ' . $attr->getName() . ': ' . json_encode($instance, JSON_THROW_ON_ERROR) . PHP_EOL;
}

$job = new ExportReportJob();
echo 'Overridden queue: ' . $job->queueName() . PHP_EOL;
