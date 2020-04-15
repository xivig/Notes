// example 2
const posts = [{
        title: 'JavaScript Inheritance',
        body: 'This is about inheritance in javascript'
    },
    {
        title: 'JavaScript Prototype',
        body: 'This is about prototype in JavaScript'
    }
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
            // output += `<p>${post.body}</p>`;
            console.log(output);
        });
        // document.body.innerHTML = output;
    }, 2000);
}


function createPost(post) {
    setTimeout(() => {
        posts.push(post);
        console.log("Post created!")

        const error = false;
        if (!error) {
            resolve();
        } else {
            PromiseRejectionEvent
        }
        console.log(posts); // shows posts after 2  seconds of post created
    }, 1000);
}

createPost({
    title: 'JavaScript Callback Hell',
    body: 'This is about callback hell in javascript'
}, getPosts);

console.log(posts); //shows the post before creation of post