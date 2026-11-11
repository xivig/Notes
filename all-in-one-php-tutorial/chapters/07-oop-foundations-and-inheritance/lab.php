<?php

declare(strict_types=1);

/**
 * Chapter 07 Lab: Classes, Multiple Instances, Inheritance & Method Overriding
 */

class BaseComponent
{
    public string $title;

    public function __construct(string $title = 'Base Component')
    {
        $this->title = $title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function describe(): string
    {
        return "[" . static::class . "] Title: {$this->title}";
    }
}

class Widget extends BaseComponent
{
    private string $category;

    public function __construct(string $title, string $category)
    {
        // Explicitly invoke parent constructor
        parent::__construct($title);
        $this->category = $category;
    }

    public function describe(): string
    {
        // Delegate to parent method and extend output
        return parent::describe() . " (Category: {$this->category})";
    }
}

echo "=== Chapter 07: OOP Foundations & Inheritance ===" . PHP_EOL;

// 1. Multiple independent instances
$itemA = new BaseComponent('Header');
$itemB = new BaseComponent('Footer');
$itemB->setTitle('Updated Footer');

echo $itemA->describe() . PHP_EOL;
echo $itemB->describe() . PHP_EOL;

// 2. Inheritance & method overriding
$widget = new Widget('Analytics Chart', 'Dashboard');
echo $widget->describe() . PHP_EOL;
