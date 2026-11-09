// ==========================================
// JavaScript Promises & Async/Await Guide
// ==========================================

const posts = [
    { title: 'JavaScript Inheritance', body: 'Deep dive into prototype inheritance in JavaScript' },
    { title: 'JavaScript Prototype', body: 'Understanding __proto__ and Function.prototype' }
];

// Helper to simulate asynchronous post retrieval
function getPosts() {
    setTimeout(() => {
        console.log('--- Current Posts ---');
        posts.forEach((post, index) => {
            console.log(`${index + 1}. ${post.title}: ${post.body}`);
        });
    }, 500);
}

// ------------------------------------------
// 1. Creating and Returning a Promise
// ------------------------------------------
function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulated validation
            if (!post || !post.title) {
                reject(new Error('Validation Failed: Post must contain a title.'));
                return;
            }

            posts.push(post);
            console.log(`[Success] Post "${post.title}" created successfully.`);
            resolve(post);
        }, 1000);
    });
}

// ------------------------------------------
// 2. Consuming with .then() / .catch() / .finally()
// ------------------------------------------
createPost({
    title: 'Mastering Promises',
    body: 'Modern asynchronous programming without callback hell.'
})
.then((createdPost) => {
    console.log('Promise resolved with:', createdPost.title);
    getPosts();
})
.catch((err) => {
    console.error('Promise rejected with error:', err.message);
})
.finally(() => {
    console.log('Operation lifecycle completed.');
});

// ------------------------------------------
// 3. Modern Async / Await Pattern
// ------------------------------------------
async function initializeBlog() {
    try {
        console.log('\n--- Initializing Blog via Async/Await ---');
        await createPost({
            title: 'Modern Async/Await in ES2024+',
            body: 'Synchronous-looking syntax for non-blocking operations.'
        });
        getPosts();
    } catch (error) {
        console.error('Error creating post:', error.message);
    }
}

// ------------------------------------------
// 4. Promise Combinators: all, allSettled, race, any
// ------------------------------------------
const p1 = Promise.resolve('User Profile loaded');
const p2 = new Promise((resolve) => setTimeout(() => resolve('Notifications loaded'), 200));
const p3 = new Promise((resolve) => setTimeout(() => resolve('Analytics telemetry loaded'), 100));

// Promise.all: Waits for all to resolve; rejects immediately if ANY fail
Promise.all([p1, p2, p3]).then((results) => {
    console.log('\nPromise.all results:', results);
});

// Promise.allSettled: Waits for all to finish, never short-circuits on rejection
Promise.allSettled([
    Promise.resolve(200),
    Promise.reject(new Error('404 Not Found')),
    Promise.resolve(201)
]).then((outcomes) => {
    console.log('\nPromise.allSettled outcomes:', outcomes);
});

// Promise.race: Settles as soon as the FASTEST promise settles
Promise.race([p2, p3]).then((winner) => {
    console.log('\nPromise.race winner:', winner); // Analytics (100ms)
});
