// ==========================================
// Modern AJAX, Fetch API & HTTP Networking
// ==========================================

// ------------------------------------------
// 1. Modern Standard: The Fetch API (Async/Await)
// ------------------------------------------
async function fetchUserData(userId) {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        // Crucial Check: fetch() only rejects on network failure, NOT on 404/500 errors!
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }

        const user = await response.json();
        console.log('[Fetch] Retrieved User:', user.name, `(${user.email})`);
        return user;
    } catch (error) {
        console.error('[Fetch Error]:', error.message);
    }
}

// ------------------------------------------
// 2. Fetch POST Request with JSON Payload
// ------------------------------------------
async function createNewPost(postData) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error(`Failed to create post. Status: ${response.status}`);
        }

        const createdItem = await response.json();
        console.log('[Fetch POST] Created Resource ID:', createdItem.id);
        return createdItem;
    } catch (err) {
        console.error('[Fetch POST Error]:', err.message);
    }
}

// ------------------------------------------
// 3. Request Cancellation with AbortController & Timeout
// ------------------------------------------
async function fetchWithTimeout(url, timeoutMs = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error(`Request timed out after ${timeoutMs}ms.`);
        }
        throw error;
    }
}

// ------------------------------------------
// 4. Legacy: XMLHttpRequest (For Historical Reference)
// ------------------------------------------
function legacyAjaxGet(url, callback) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                callback(null, JSON.parse(xhr.responseText));
            } else {
                callback(new Error(`XHR Failed with status: ${xhr.status}`));
            }
        }
    };

    xhr.onerror = function () {
        callback(new Error('Network error during XHR.'));
    };

    xhr.send();
}

// Executing test calls
fetchUserData(1);
createNewPost({
    title: 'Modern Asynchronous JavaScript',
    body: 'Replaced legacy XMLHttpRequest with Fetch and Async/Await.',
    userId: 1
});
