# Jasmine Unit Testing Framework — Modern Setup & Guide

> **Jasmine** is a behavior-driven development (BDD) testing framework for JavaScript. It does not depend on any other JavaScript frameworks and has clean, readable syntax.

---

## Table of Contents

1. [Modern Project Setup](#1-modern-project-setup)
2. [Configuring `package.json`](#2-configuring-packagejson)
3. [Writing Specs (BDD Syntax)](#3-writing-specs-bdd-syntax)
4. [Asynchronous Testing (Async/Await)](#4-asynchronous-testing-asyncawait)
5. [Jasmine Matchers Reference](#5-jasmine-matchers-reference)
6. [Spies & Mocks](#6-spies--mocks)
7. [Running the Test Suite](#7-running-the-test-suite)

---

## 1. Modern Project Setup

Always install Jasmine as a local development dependency rather than globally, ensuring reproducible test runs across machines and CI/CD pipelines:

```bash
# 1. Initialize project directory
mkdir my-jasmine-project && cd my-jasmine-project
npm init -y

# 2. Install Jasmine locally
npm install --save-dev jasmine

# 3. Initialize Jasmine configuration directory (creates spec/support/jasmine.json)
npx jasmine init
```

---

## 2. Configuring `package.json`

Add the `test` script in `package.json`:

```json
{
  "name": "my-jasmine-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "test": "jasmine"
  },
  "devDependencies": {
    "jasmine": "^5.1.0"
  }
}
```

---

## 3. Writing Specs (BDD Syntax)

Create a sample utility file `src/math.js`:

```javascript
// src/math.js
export function add(a, b) {
  return a + b;
}

export function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}
```

Create test spec `spec/math.spec.js`:

```javascript
// spec/math.spec.js
import { add, divide } from '../src/math.js';

describe('Math Operations', () => {
  describe('add()', () => {
    it('should add two positive integers correctly', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(add(-4, 6)).toBe(2);
    });
  });

  describe('divide()', () => {
    it('should divide numbers correctly', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrowError('Division by zero');
    });
  });
});
```

---

## 4. Asynchronous Testing (Async/Await)

Modern Jasmine natively handles `async` / `await` and Promises without requiring manual `done()` callbacks:

```javascript
// spec/async.spec.js
async function fetchUser(id) {
  return Promise.resolve({ id, name: 'Alice', active: true });
}

describe('Async Operations', () => {
  it('should fetch user data asynchronously', async () => {
    const user = await fetchUser(1);
    expect(user.name).toBe('Alice');
    expect(user.active).toBeTrue();
  });
});
```

---

## 5. Jasmine Matchers Reference

| Matcher | Description | Example |
|---|---|---|
| `toBe(val)` | Strict equality (`===`) | `expect(result).toBe(42)` |
| `toEqual(obj)` | Deep object/array equality | `expect(arr).toEqual([1, 2, 3])` |
| `toBeTrue()` / `toBeFalse()` | Boolean comparison | `expect(isValid).toBeTrue()` |
| `toBeNull()` | Null check | `expect(val).toBeNull()` |
| `toBeDefined()` / `toBeUndefined()` | Defined state check | `expect(user.email).toBeDefined()` |
| `toContain(item)` | Array or string substring inclusion | `expect(roles).toContain('admin')` |
| `toMatch(regex)` | Regular expression pattern match | `expect(email).toMatch(/@/)` |
| `toThrowError(msg)` | Throws expected Exception error | `expect(fn).toThrowError(/not found/)` |

---

## 6. Spies & Mocks

Jasmine provides built-in spies to track function calls, arguments, and return values:

```javascript
describe('Spy Demonstration', () => {
  it('should spy on object methods', () => {
    const service = {
      sendEmail: (to, msg) => true
    };

    spyOn(service, 'sendEmail').and.returnValue(true);

    service.sendEmail('admin@example.com', 'Welcome');

    expect(service.sendEmail).toHaveBeenCalled();
    expect(service.sendEmail).toHaveBeenCalledWith('admin@example.com', 'Welcome');
    expect(service.sendEmail).toHaveBeenCalledTimes(1);
  });
});
```

---

## 7. Running the Test Suite

```bash
npm test
```

Output:
```text
Started
....
4 specs, 0 failures
Finished in 0.012 seconds
```
