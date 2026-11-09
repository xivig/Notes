/**
 * ============================================================================
 * JavaScript Error Handling & Defensive Programming (ES6 - ES2024+)
 * ============================================================================
 * 
 * Robust applications anticipate failure states. This module covers proper
 * synchronous and asynchronous error architectures, custom error hierarchies,
 * ES2022 error chaining (`cause`), and modern safe-result handling patterns.
 * 
 * Key Concepts Covered:
 * 1. `try / catch / finally` Execution Guarantees
 * 2. Optional Catch Binding (ES2019)
 * 3. Standard Built-in Error Types
 * 4. Custom Error Class Hierarchies (Domain-Driven Errors)
 * 5. Error Causes & Chaining (`{ cause }` - ES2022)
 * 6. Asynchronous Error Handling (Promises, Async/Await)
 * 7. Safe Result Tuple Pattern (`[err, data]` without nested try/catch)
 * 8. Global Unhandled Rejection & Exception Handlers
 */

// ============================================================================
// 1. `try / catch / finally` MECHANICS
// ============================================================================

console.log('--- 1. try / catch / finally ---');

function executeWithGuaranteedCleanup() {
  try {
    console.log('1. Inside try block');
    throw new Error('Simulated failure during processing');
    console.log('This will not execute');
  } catch (err) {
    console.log(`2. Caught error: ${err.message}`);
    return 'Returned from catch block';
  } finally {
    // FINALLY ALWAYS EXECUTES, even if try or catch returns!
    console.log('3. Finally block executed: Resources safely closed.');
  }
}

const outcome = executeWithGuaranteedCleanup();
console.log('Function returned:', outcome);


// ============================================================================
// 2. OPTIONAL CATCH BINDING (ES2019)
// ============================================================================

console.log('\n--- 2. Optional Catch Binding ---');

// When the error object itself is irrelevant, omit the parameter entirely:
function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    // No `(err)` parameter needed!
    return false;
  }
}

console.log('Valid JSON check:', isValidJSON('{"status": "ok"}')); // true
console.log('Invalid JSON check:', isValidJSON('{invalid_syntax}'));   // false


// ============================================================================
// 3. STANDARD BUILT-IN ERROR TYPES
// ============================================================================

/**
 * Common Built-in Error Subclasses:
 * - TypeError: Operation on an incompatible type (e.g., null.foo(), 10())
 * - RangeError: Number outside permissible range (e.g., [].length = -1)
 * - ReferenceError: Dereferencing undeclared variable or TDZ violation
 * - SyntaxError: Invalid JavaScript code evaluated via eval() or JSON.parse()
 * - URIError: Malformed URI encoding (e.g., decodeURIComponent('%'))
 */

console.log('\n--- 3. Type Checking Errors ---');

try {
  decodeURIComponent('%');
} catch (e) {
  console.log('Caught URIError:', e instanceof URIError); // true
  console.log('Caught generic Error:', e instanceof Error); // true
}


// ============================================================================
// 4. CUSTOM ERROR HIERARCHY (DOMAIN-SPECIFIC ERRORS)
// ============================================================================

console.log('\n--- 4. Custom Error Hierarchy ---');

/**
 * Base Application Error
 */
class ApplicationError extends Error {
  constructor(message, statusCode = 500, details = null, options = {}) {
    super(message, options);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    this.timestamp = new Date().toISOString();

    // Captures stack trace omitting constructor call (Node.js / V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * 400 Bad Request / Validation Failure
 */
class ValidationError extends ApplicationError {
  constructor(message, invalidFields = []) {
    super(message, 400, { fields: invalidFields });
  }
}

/**
 * 404 Not Found
 */
class NotFoundError extends ApplicationError {
  constructor(resourceName, identifier) {
    super(`${resourceName} with identifier '${identifier}' was not found.`, 404);
    this.resource = resourceName;
    this.identifier = identifier;
  }
}

// Concrete Simulation:
function registerUser(userData) {
  const missing = [];
  if (!userData.username) missing.push('username');
  if (!userData.email) missing.push('email');

  if (missing.length > 0) {
    throw new ValidationError('User registration payload is incomplete', missing);
  }

  return { id: 101, ...userData };
}

try {
  registerUser({ age: 28 });
} catch (err) {
  if (err instanceof ValidationError) {
    console.log(`[ValidationError 400]: ${err.message}`);
    console.log('Missing fields:', err.details.fields);
  } else {
    console.error('Unexpected server error:', err);
  }
}


// ============================================================================
// 5. ERROR CAUSES & CAUSE CHAINING (ES2022)
// ============================================================================

console.log('\n--- 5. Error Causes ({ cause }) ---');

/**
 * When catching low-level errors (network timeout, database connection fail),
 * wrapping them in higher-level business errors without losing original context
 * was cumbersome. ES2022 standardized the `{ cause: originalError }` option.
 */

async function queryDatabase() {
  throw new Error('Socket closed unexpectedly (EPIPE)');
}

async function fetchUserProfile(userId) {
  try {
    await queryDatabase();
  } catch (dbError) {
    // Wrap low-level driver error in higher-level domain error:
    throw new ApplicationError(`Failed to fetch user profile for ID ${userId}`, 503, {
      userId
    }, { cause: dbError });
  }
}

(async () => {
  try {
    await fetchUserProfile(992);
  } catch (err) {
    console.log('High-Level Error:', err.message);
    // In ES2022, `err.cause` points directly to the underlying root cause:
    const cause = err.cause;
    if (cause) {
      console.log('Root Cause:', cause.message);
    }
  }
})();


// ============================================================================
// 6. SAFE RESULT TUPLE PATTERN (Go-style / Lua-style)
// ============================================================================

console.log('\n--- 6. Safe Result Tuple Pattern ---');

/**
 * Avoids deep try/catch nesting in asynchronous control flows.
 * Transforms a Promise into a [error, result] tuple.
 * 
 * @template T
 * @param {Promise<T>} promise
 * @returns {Promise<[Error, null] | [null, T]>}
 */
async function to(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err instanceof Error ? err : new Error(String(err)), null];
  }
}

// Example usage:
const mockSuccessApi = () => Promise.resolve({ user: 'John Doe', verified: true });
const mockFailingApi = () => Promise.reject(new Error('Rate limit exceeded (429)'));

(async () => {
  // Clean, linear handling without try/catch indentation:
  const [err1, data1] = await to(mockSuccessApi());
  if (err1) {
    console.error('Error 1:', err1.message);
  } else {
    console.log('Data 1 retrieved successfully:', data1.user);
  }

  const [err2, data2] = await to(mockFailingApi());
  if (err2) {
    console.log('Error 2 handled gracefully:', err2.message);
  } else {
    console.log('Data 2:', data2);
  }
})();


// ============================================================================
// 7. GLOBAL UNHANDLED ERROR HOOKS
// ============================================================================

/**
 * Node.js Global Hooks:
 * 
 * process.on('unhandledRejection', (reason, promise) => {
 *   console.error('Unhandled Promise Rejection:', reason);
 *   // Optional: Send alert to telemetry/Sentry, gracefully shutdown
 * });
 * 
 * process.on('uncaughtException', (error) => {
 *   console.error('Uncaught Exception occurred:', error);
 *   process.exit(1); // Standard practice: restart process via PM2 / Docker
 * });
 * 
 * Browser Global Hooks:
 * 
 * window.addEventListener('unhandledrejection', (event) => {
 *   console.error('Unhandled browser rejection:', event.reason);
 * });
 * 
 * window.onerror = function(message, source, lineno, colno, error) {
 *   console.error(`Browser script error at ${source}:${lineno}:${colno}`);
 * };
 */
