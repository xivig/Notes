/**
 * ============================================================================
 * JavaScript Iterators & Generators: The Complete Guide
 * ============================================================================
 * 
 * Generators (introduced in ES6) are functions that can pause execution
 * (`yield`) and resume at a later time, maintaining their execution context
 * and internal state across pauses.
 * 
 * Key Concepts Covered:
 * 1. The Iteration Protocols (Iterable & Iterator)
 * 2. Generator Functions (`function*`) & `yield`
 * 3. Bi-Directional Communication (Passing data into `next(val)`)
 * 4. Yield Delegation (`yield*`)
 * 5. Generator Control (`return()` and `throw()`)
 * 6. Real-World Applications: Infinite Streams, Lazy Evaluation & State Machines
 * 7. Asynchronous Generators (`async function*`) & `for await...of`
 */

// ============================================================================
// 1. THE ITERATION PROTOCOLS (FOUNDATION)
// ============================================================================

/**
 * An object is an ITERABLE if it implements the [Symbol.iterator]() method.
 * An ITERATOR is an object with a next() method returning { value: any, done: boolean }.
 */
const customRangeIterable = {
  from: 1,
  to: 4,
  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

console.log('--- Custom Iterable with Symbol.iterator ---');
for (const num of customRangeIterable) {
  console.log('Custom range value:', num); // 1, 2, 3, 4
}


// ============================================================================
// 2. BASIC GENERATOR FUNCTIONS (function* and yield)
// ============================================================================

/**
 * When invoked, a generator function does NOT execute immediately.
 * Instead, it returns a Generator Object (which is both an Iterator and an Iterable).
 */
function* simpleSequence() {
  console.log('Generator started');
  yield 'First checkpoint';
  console.log('Resumed after first yield');
  yield 'Second checkpoint';
  console.log('Generator finishing');
  return 'Final completion value';
}

console.log('\n--- Basic Generator Stepping ---');
const gen = simpleSequence();

console.log(gen.next()); // { value: 'First checkpoint', done: false }
console.log(gen.next()); // { value: 'Second checkpoint', done: false }
console.log(gen.next()); // { value: 'Final completion value', done: true }
console.log(gen.next()); // { value: undefined, done: true }


// ============================================================================
// 3. BI-DIRECTIONAL COMMUNICATION (SENDING DATA INTO NEXT)
// ============================================================================

/**
 * `yield` is not only an output expression; it can also evaluate to an input value
 * sent by the caller via `gen.next(value)`.
 */
function* conversationBot() {
  const name = yield 'Hello! What is your name?';
  const mood = yield `Nice to meet you, ${name}! How are you feeling today?`;
  return `Understood. You are feeling ${mood}. Let's get to work!`;
}

console.log('\n--- Bi-Directional Generator Communication ---');
const bot = conversationBot();

// Step 1: Start the generator to reach the first yield (cannot pass values to the first next())
const q1 = bot.next();
console.log('Bot:', q1.value); // 'Hello! What is your name?'

// Step 2: Pass 'Alice' as the result of the first yield
const q2 = bot.next('Alice');
console.log('Bot:', q2.value); // 'Nice to meet you, Alice! How are you feeling today?'

// Step 3: Pass 'Energetic' as the result of the second yield
const summary = bot.next('Energetic');
console.log('Bot:', summary.value); // 'Understood. You are feeling Energetic. Let's get to work!'


// ============================================================================
// 4. DELEGATING GENERATORS (yield*)
// ============================================================================

/**
 * `yield*` delegates iteration to another iterable or generator function.
 */
function* letterSequence() {
  yield 'A';
  yield 'B';
}

function* combinedSequence() {
  yield 'Start';
  yield* letterSequence(); // Delegates to letterSequence
  yield* [1, 2];           // Delegates to an Array iterable
  yield 'End';
}

console.log('\n--- Generator Delegation with yield* ---');
console.log([...combinedSequence()]); // ['Start', 'A', 'B', 1, 2, 'End']


// ============================================================================
// 5. ERROR INJECTION & EARLY TERMINATION (throw and return)
// ============================================================================

function* monitoredTask() {
  try {
    yield 'Phase 1: Initializing';
    yield 'Phase 2: Processing';
    yield 'Phase 3: Finalizing';
  } catch (err) {
    yield `Error handled internally: ${err.message}`;
  } finally {
    console.log('Cleanup logic executed inside generator finally block');
  }
}

console.log('\n--- Generator throw() Error Handling ---');
const taskGen = monitoredTask();
console.log(taskGen.next()); // Phase 1
// Inject an exception into the generator at the paused yield point:
console.log(taskGen.throw(new Error('Network connection severed!')));
console.log(taskGen.next()); // { value: undefined, done: true }


// ============================================================================
// 6. REAL-WORLD USE CASES
// ============================================================================

// 6.1 Infinite Unique ID Generator (Zero memory overhead):
function* idGenerator(prefix = 'ID') {
  let counter = 1;
  while (true) {
    yield `${prefix}_${counter++}`;
  }
}

console.log('\n--- Infinite Sequence Generator ---');
const generateOrderId = idGenerator('ORD');
console.log(generateOrderId.next().value); // 'ORD_1'
console.log(generateOrderId.next().value); // 'ORD_2'
console.log(generateOrderId.next().value); // 'ORD_3'

// 6.2 Infinite Fibonacci Series:
function* fibonacci() {
  let prev = 0, curr = 1;
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

const fib = fibonacci();
const firstEightFib = Array.from({ length: 8 }, () => fib.next().value);
console.log('First 8 Fibonacci numbers:', firstEightFib); // [1, 1, 2, 3, 5, 8, 13, 21]

// 6.3 State Machine via Generator:
function* trafficLight() {
  while (true) {
    yield 'RED (Stop)';
    yield 'YELLOW (Caution)';
    yield 'GREEN (Go)';
  }
}

console.log('\n--- State Machine via Generator ---');
const light = trafficLight();
console.log('Light 1:', light.next().value);
console.log('Light 2:', light.next().value);
console.log('Light 3:', light.next().value);
console.log('Light 4 (Cycles back):', light.next().value);


// ============================================================================
// 7. ASYNCHRONOUS GENERATORS (async function*) & for await...of (ES2018+)
// ============================================================================

/**
 * Async Generators combine promises and generators, yielding promises and
 * consumed sequentially using `for await (const val of asyncGen)`.
 */
async function* fetchPaginatedRecords(totalPages = 3) {
  for (let page = 1; page <= totalPages; page++) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 50));
    yield { page, records: [`record_${page}_a`, `record_${page}_b`] };
  }
}

console.log('\n--- Asynchronous Generator (for await...of) ---');
(async () => {
  for await (const pageData of fetchPaginatedRecords(3)) {
    console.log(`Received Page ${pageData.page}:`, pageData.records);
  }
  console.log('All async pages successfully processed!');
})();
