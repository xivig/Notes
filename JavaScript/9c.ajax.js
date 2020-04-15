//1. Create an XMLHttpRequest object:
var xmlHttpRequest = new XMLHttpRequest();
// Here the xmlHttpRequest variable name can be anything you want(may be ajax)

// 2. Create a callback function
xmlHttpRequest.onreadystatechange = function() {
    if (xmlHttpRequest.readyState === 4) {
        document.getElementById('ajax').innerHTML = xmlHttpRequest.responseText;
    }
};

// 3. Open a Request :
xmlHttpRequest.open('GET', 'sidebar.html');

// 4. Send a request:
xmlHttpRequest.send();