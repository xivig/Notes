<?php

declare(strict_types=1);

/**
 * Chapter 06 Lab: Mini Reflection Auto-Wiring Service Container + Facade Proxy.
 * Demonstrates exactly how Laravel resolves constructors and forwards Facade::method() calls.
 */

final class MiniContainer
{
    /** @var array<string, string|callable> */
    private array $bindings = [];

    /** @var array<string, object> */
    private array $instances = [];

    public function bind(string $abstract, string|callable $concrete): void
    {
        $this->bindings[$abstract] = $concrete;
    }

    public function singleton(string $abstract, string|callable $concrete): void
    {
        $this->bind($abstract, function (self $c) use ($abstract, $concrete): object {
            if (!isset($this->instances[$abstract])) {
                $this->instances[$abstract] = is_callable($concrete)
                    ? $concrete($c)
                    : $c->build($concrete);
            }
            return $this->instances[$abstract];
        });
    }

    public function swap(string $abstract, object $fake): void
    {
        $this->instances[$abstract] = $fake;
        $this->bindings[$abstract] = static fn (): object => $fake;
    }

    public function make(string $abstract): object
    {
        if (isset($this->instances[$abstract])) {
            return $this->instances[$abstract];
        }
        $concrete = $this->bindings[$abstract] ?? $abstract;
        if (is_callable($concrete)) {
            return $concrete($this);
        }
        return $this->build($concrete);
    }

    private function build(string $className): object
    {
        $reflector = new ReflectionClass($className);
        if (!$reflector->isInstantiable()) {
            throw new RuntimeException("Class {$className} is not instantiable (bind an interface to a concrete class).");
        }

        $constructor = $reflector->getConstructor();
        if ($constructor === null) {
            return new $className();
        }

        $dependencies = [];
        foreach ($constructor->getParameters() as $param) {
            $type = $param->getType();
            if ($type instanceof ReflectionNamedType && !$type->isBuiltin()) {
                $dependencies[] = $this->make($type->getName());
                continue;
            }
            if ($param->isDefaultValueAvailable()) {
                $dependencies[] = $param->getDefaultValue();
                continue;
            }
            throw new RuntimeException("Cannot resolve parameter \${$param->getName()} of {$className}.");
        }

        return $reflector->newInstanceArgs($dependencies);
    }
}

interface MailerContract
{
    public function send(string $to, string $subject): string;
}

final class SmtpMailer implements MailerContract
{
    public function send(string $to, string $subject): string
    {
        return "SMTP sent [{$subject}] -> {$to}";
    }
}

final readonly class WelcomeService
{
    public function __construct(private MailerContract $mailer) {}

    public function welcome(string $email): string
    {
        return $this->mailer->send($email, 'Welcome to Laravel!');
    }
}

abstract class MiniFacade
{
    protected static ?MiniContainer $container = null;

    public static function setContainer(MiniContainer $container): void
    {
        static::$container = $container;
    }

    abstract protected static function getFacadeAccessor(): string;

    public static function __callStatic(string $method, array $args): mixed
    {
        $instance = static::$container->make(static::getFacadeAccessor());
        return $instance->$method(...$args);
    }
}

final class MailFacade extends MiniFacade
{
    protected static function getFacadeAccessor(): string
    {
        return MailerContract::class;
    }
}

$container = new MiniContainer();
$container->singleton(MailerContract::class, SmtpMailer::class);
MiniFacade::setContainer($container);

// Auto-wired WelcomeService receives SmtpMailer automatically!
/** @var WelcomeService $service */
$service = $container->make(WelcomeService::class);
echo 'Auto-wired DI: ' . $service->welcome('dev@example.com') . PHP_EOL;

// Facade proxies static call to the same Container binding!
echo 'Via MailFacade: ' . MailFacade::send('ada@example.com', 'Deploy Succeeded') . PHP_EOL;

// Just like Mail::fake(), swapping the binding changes Facade behavior cleanly:
$container->swap(MailerContract::class, new class implements MailerContract {
    public function send(string $to, string $subject): string
    {
        return "FAKE captured [{$subject}] -> {$to}";
    }
});
echo 'After fake swap: ' . MailFacade::send('ada@example.com', 'Test Run') . PHP_EOL;
