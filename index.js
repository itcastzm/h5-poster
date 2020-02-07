const http = require('http');
const querystring = require('querystring');


const postData = querystring.stringify({
    grant_type: "password",
    username: "zhumin@itcast.cn",
    password: "zhumin123456"
});

const options = {
    // hostname: 'http://git.itcast.cn/api/v4/projects',
    hostname: 'git.itcast.cn',
    port: 80,
    path: '/oauth/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();