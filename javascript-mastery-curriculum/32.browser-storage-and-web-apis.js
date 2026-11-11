/**
 * ============================================================================
 * Browser Storage & Modern Web APIs (ES6 - ES2024+)
 * ============================================================================
 * 
 * Modern web applications rely on robust client-side persistence and browser
 * platform APIs for networking, query manipulation, and background computation.
 * 
 * Key Concepts Covered:
 * 1. Storage Comparison: localStorage, sessionStorage, Cookies & IndexedDB
 * 2. Type-Safe Storage Wrapper with Expiration (TTL)
 * 3. Modern URL & URLSearchParams Architecture
 * 4. Request Cancellation with AbortController & AbortSignal.timeout()
 * 5. Blob, File, and Object URL Lifecycle
 * 6. FormData & Multipart Payloads
 * 7. Web Workers: Multithreading & Offloading CPU Heavy Tasks
 */

// ============================================================================
// 1. STORAGE LANDSCAPE COMPARISON
// ============================================================================

/**
 * +----------------+---------------+--------------------+------------------+---------------------+
 * | FEATURE        | LOCALSTORAGE  | SESSIONSTORAGE     | COOKIES          | INDEXEDDB           |
 * +----------------+---------------+--------------------+------------------+---------------------+
 * | Capacity       | ~5MB          | ~5MB               | ~4KB             | Hundreds of MB / GB |
 * | Lifecycle      | Permanent     | Current Tab Only   | Configurable Exp | Permanent           |
 * | Accessible By  | Client JS     | Client JS          | Client & Server  | Client JS           |
 * | Sent to Server | No            | No                 | Yes (Automatic)  | No                  |
 * | Data Types     | Strings Only  | Strings Only       | Strings Only     | Objects, Blobs, etc.|
 * | Performance    | Synchronous   | Synchronous        | Synchronous      | Asynchronous        |
 * +----------------+---------------+--------------------+------------------+---------------------+
 */


// ============================================================================
// 2. TYPE-SAFE STORAGE WRAPPER WITH TTL EXPIRATION
// ============================================================================

console.log('--- 2. Type-Safe Storage Wrapper with Expiration ---');

/**
 * Robust wrapper around localStorage / in-memory store providing:
 * - Automatic JSON serialization and deserialization
 * - Time-to-Live (TTL) automatic expiration
 * - Safe error handling (prevents crashes on QuotaExceededError or private browsing)
 */
class PersistentStore {
  constructor(storageBackend = null) {
    // Falls back to in-memory Map if window.localStorage is unavailable (e.g. Node.js or disabled cookies):
    this.storage = storageBackend || (typeof localStorage !== 'undefined' ? localStorage : new Map());
  }

  set(key, value, ttlMilliseconds = null) {
    const record = {
      data: value,
      expiresAt: ttlMilliseconds ? Date.now() + ttlMilliseconds : null
    };

    try {
      const serialized = JSON.stringify(record);
      if (typeof this.storage.setItem === 'function') {
        this.storage.setItem(key, serialized);
      } else {
        this.storage.set(key, serialized);
      }
      return true;
    } catch (err) {
      console.warn(`PersistentStore: Failed to persist key "${key}":`, err.message);
      return false;
    }
  }

  get(key) {
    try {
      const raw = typeof this.storage.getItem === 'function' ? this.storage.getItem(key) : this.storage.get(key);
      if (!raw) return null;

      const record = JSON.parse(raw);

      // Check TTL expiration:
      if (record.expiresAt && Date.now() > record.expiresAt) {
        this.remove(key);
        return null; // Expired!
      }

      return record.data;
    } catch {
      return null;
    }
  }

  remove(key) {
    if (typeof this.storage.removeItem === 'function') {
      this.storage.removeItem(key);
    } else {
      this.storage.delete(key);
    }
  }
}

// Verification:
const appStorage = new PersistentStore();
appStorage.set('auth_token', 'jwt_sample_token', 60_000); // 1-minute TTL
appStorage.set('user_settings', { theme: 'dark', fontSize: 16 });

console.log('Retrieved token:', appStorage.get('auth_token'));
console.log('Retrieved settings:', appStorage.get('user_settings'));


// ============================================================================
// 3. MODERN URL & URLSearchParams
// ============================================================================

console.log('\n--- 3. URL & URLSearchParams ---');

// Parse, inspect, and modify URLs cleanly:
const baseUrl = new URL('https://api.xivig.org:8080/v1/search?category=hardware&page=1#results');

console.log('Protocol:', baseUrl.protocol); // 'https:'
console.log('Hostname:', baseUrl.hostname); // 'api.xivig.org'
console.log('Pathname:', baseUrl.pathname); // '/v1/search'
console.log('Port:', baseUrl.port);         // '8080'

// Manipulate Query Parameters via URLSearchParams:
const params = baseUrl.searchParams;
params.set('page', '2');             // Overwrite page
params.append('tags', 'bluetooth');   // Append multiple params with same key
params.append('tags', 'wireless');

console.log('Has category:', params.has('category')); // true
console.log('All tags:', params.getAll('tags'));       // ['bluetooth', 'wireless']
console.log('Updated full URL:', baseUrl.toString());


// ============================================================================
// 4. REQUEST CANCELLATION & TIMEOUTS VIA AbortController
// ============================================================================

console.log('\n--- 4. AbortController & AbortSignal ---');

/**
 * AbortController provides a standard mechanism to cancel asynchronous tasks
 * (fetch requests, timers, stream reading, event listeners).
 */

// 4.1 Modern AbortSignal.timeout() (ES2022+):
async function fetchWithDeadline(url, timeoutMs = 2000) {
  // Automatically creates a signal that aborts after timeoutMs:
  const signal = AbortSignal.timeout(timeoutMs);

  try {
    console.log(`Initiating request to ${url} with ${timeoutMs}ms deadline...`);
    // Simulated fetch call:
    const mockRequest = new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve({ ok: true, data: 'Payload' }), 100);
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(signal.reason);
      });
    });

    return await mockRequest;
  } catch (err) {
    if (err.name === 'TimeoutError' || signal.aborted) {
      console.warn('Request was aborted due to timeout threshold!');
    }
    throw err;
  }
}

fetchWithDeadline('https://api.xivig.org/data', 500)
  .then(res => console.log('Fetch completed successfully:', res.data))
  .catch(() => {});

// 4.2 Removing Event Listeners via AbortSignal:
/*
const controller = new AbortController();
window.addEventListener('resize', handleResize, { signal: controller.signal });
window.addEventListener('scroll', handleScroll, { signal: controller.signal });

// Later, remove ALL listeners bound to this signal with a single call:
controller.abort();
*/


// ============================================================================
// 5. BLOB & FILE OBJECT URL LIFECYCLE
// ============================================================================

console.log('\n--- 5. Blob & Object URLs ---');

/**
 * In browser environments:
 * Blobs represent raw, immutable binary data.
 * `URL.createObjectURL(blob)` generates a DOMString referencing the file in memory.
 * ALWAYS call `URL.revokeObjectURL(url)` when done to prevent memory leaks!
 */

// Client-side text-file generation example:
const exportPayload = JSON.stringify({ exportedAt: new Date(), version: '2.0.0' }, null, 2);
const jsonBlob = new Blob([exportPayload], { type: 'application/json' });

console.log('Blob size in bytes:', jsonBlob.size);
console.log('Blob MIME type:', jsonBlob.type);


// ============================================================================
// 6. FORMDATA: MULTIPART PAYLOADS
// ============================================================================

console.log('\n--- 6. FormData Creation ---');

// FormData simplifies posting binary files and fields to backend REST/multipart endpoints:
const uploadForm = new FormData();
uploadForm.append('user_id', '4412');
uploadForm.append('document_title', 'Quarterly Report');
uploadForm.append('file', jsonBlob, 'report.json');

console.log('FormData user_id:', uploadForm.get('user_id'));
console.log('FormData has file:', uploadForm.has('file'));


// ============================================================================
// 7. WEB WORKERS ARCHITECTURE (OVERVIEW)
// ============================================================================

/**
 * Web Workers run scripts in background threads independent of the main UI thread.
 * This prevents intensive calculations (cryptography, video processing, large datasets)
 * from freezing user interactions.
 * 
 * --- Main Thread (main.js) ---
 * const worker = new Worker('worker.js');
 * worker.postMessage({ command: 'PROCESS_IMAGE', payload: imageBuffer });
 * worker.onmessage = function(event) {
 *   console.log('Result from worker:', event.data);
 * };
 * worker.onerror = function(err) {
 *   console.error('Worker error:', err.message);
 * };
 * 
 * --- Worker Thread (worker.js) ---
 * self.onmessage = function(event) {
 *   const result = heavyCalculation(event.data.payload);
 *   self.postMessage(result);
 * };
 */
console.log('\n--- Web Workers: Keeps 60 FPS UI responsiveness during heavy workloads ---');
