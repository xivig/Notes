# Chapter 15: File I/O, JSON (`JSON_THROW_ON_ERROR`), HTTP/cURL & CLI Tools

> **Scope:** PHP 8.0–8.5 · `SplFileObject`, Path Traversal Defense, `json_encode`/`json_decode`/`json_validate()` (8.3), HTTP via cURL, `Dom\HTMLDocument` (8.4), `Uri` (8.5), and CLI Scripting.

---

## 1. Learning Objectives

- Read and write files safely using `SplFileObject`, `file_put_contents(..., LOCK_EX)`, and strict `realpath()` path-traversal checks.
- Parse and serialize JSON safely with **`JSON_THROW_ON_ERROR`** and **`json_validate()`** (PHP 8.3+).
- Build defensive outbound HTTP requests with cURL (strict timeouts, TLS verification, status-code checking).
- Handle CLI arguments (`$argv`, `getopt()`), exit codes, and `STDERR` vs `STDOUT`.

---

## 2. Safe JSON Processing (PHP 7.3+ / 8.3+)

Never inspect `json_last_error()` manually. Always pass `JSON_THROW_ON_ERROR` so malformed JSON throws a `\JsonException`:

```php
$payload = json_decode($rawJson, associative: true, flags: JSON_THROW_ON_ERROR);
$encoded = json_encode($data, JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

// PHP 8.3+: Validate JSON string in O(N) memory without allocating PHP arrays/objects
if (json_validate($rawJson)) {
    // Valid JSON!
}
```

---

## 3. Path Traversal Prevention

Never pass raw user filenames directly into `file_get_contents()` or `include`:

```php
$baseDir = realpath(__DIR__ . '/uploads');
$requested = realpath($baseDir . DIRECTORY_SEPARATOR . basename($userFilename));

if ($requested === false || !str_starts_with($requested, $baseDir . DIRECTORY_SEPARATOR)) {
    throw new RuntimeException('Invalid file path');
}
```

---

## 4. Production cURL Pattern (vs `file_get_contents($url)`)

For HTTP APIs (or use **Guzzle** / **Symfony HttpClient** in Composer projects), always configure explicit timeouts and TLS verification:

```php
$ch = curl_init('https://api.example.com/v1/items');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_FOLLOWLOCATION => false, // Avoid unexpected SSRF redirects
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_HTTPHEADER     => ['Accept: application/json'],
]);
```

---

## 5. Runnable Lab

Run [lab.php](lab.php):

```bash
php chapters/15-files-json-http-and-cli/lab.php
```

---

## 6. Common Mistakes & Best Practices

- **Mistake:** Disabling `CURLOPT_SSL_VERIFYPEER => false` in production to "fix" local certificate errors — exposes traffic to MITM attacks. Configure `curl.cainfo` properly instead.
- **Mistake:** Decoding JSON (`json_decode($body, true)`) without `JSON_THROW_ON_ERROR` and passing `null` silently downstream.
- **Best Practice:** Use `SplFileObject` or streams (`fopen`/`fgetcsv`) when processing multi-hundred-MB CSV/log files instead of `file()` or `file_get_contents()`.

---

## 7. Exercises & Interview Q&A

1. **Exercise:** Write a CLI script using `getopt('f:v', ['file:', 'verbose'])` that reads a JSON lines file via `SplFileObject` and validates each line using `json_validate()`.
2. **Q: Why is `json_validate()` (PHP 8.3) faster and leaner than `json_decode()` when checking validity?**  
   **A:** `json_validate()` parses the JSON syntax without allocating intermediate zvals, arrays, or objects in memory, saving significant RAM on large payloads.

---

⬅️ [Chapter 14](../14-error-handling-exceptions-and-fibers/README.md) · [Handbook Index](../../README.md) · ➡️ [Chapter 16: Web Security, Sessions & Input Validation](../16-web-security-sessions-and-validation/README.md)
