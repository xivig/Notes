<?php

declare(strict_types=1);

/**
 * Chapter 03 Lab: Interfaces, Traits, Contract+Trait Pairing, Auto-Boot & Visibility.
 */

interface HasMediaContract
{
    public function addMedia(string $path): void;

    /** @return list<string> */
    public function getMedia(): array;
}

trait InteractsWithMediaTrait
{
    /** @var list<string> */
    private array $mediaItems = [];

    public static function bootInteractsWithMediaTrait(): string
    {
        return 'Booted media hooks cleanly';
    }

    public function addMedia(string $path): void
    {
        $this->mediaItems[] = $path;
    }

    /** @return list<string> */
    public function getMedia(): array
    {
        return $this->mediaItems;
    }
}

trait ApiResponseTrait
{
    /** @param array<string, mixed> $data */
    protected function successResponse(array $data, string $message = 'OK'): array
    {
        return ['ok' => true, 'message' => $message, 'data' => $data];
    }
}

abstract class BaseModel
{
    /** @var list<string> */
    protected array $fillable = [];

    /** @return list<string> */
    public function getFillable(): array
    {
        return $this->fillable;
    }

    public static function bootTraits(): array
    {
        $messages = [];
        foreach (class_uses_recursive(static::class) as $trait) {
            $short = basename(str_replace('\\', '/', $trait));
            $method = 'boot' . $short;
            if (method_exists(static::class, $method)) {
                $messages[] = static::$method();
            }
        }
        return $messages;
    }
}

function class_uses_recursive(string|object $class): array
{
    $results = [];
    foreach (array_reverse(class_parents($class) ?: []) + [$class => $class] as $parent) {
        $results += class_uses($parent) ?: [];
    }
    return array_values(array_unique($results));
}

final class ProductModel extends BaseModel implements HasMediaContract
{
    use InteractsWithMediaTrait;

    /** @var list<string> */
    protected array $fillable = ['name', 'price_cents'];
}

final class ProductController
{
    use ApiResponseTrait;

    public function uploadDemo(HasMediaContract $entity, string $file): array
    {
        $entity->addMedia($file);

        return $this->successResponse([
            'fillable' => $entity instanceof BaseModel ? $entity->getFillable() : [],
            'media' => $entity->getMedia(),
        ], 'Uploaded');
    }
}

$bootLog = ProductModel::bootTraits();
$product = new ProductModel();
$controller = new ProductController();
$result = $controller->uploadDemo($product, 'uploads/hero.webp');

echo 'Trait boot log: ' . implode(', ', $bootLog) . PHP_EOL;
echo json_encode($result, JSON_THROW_ON_ERROR) . PHP_EOL;
