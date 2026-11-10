const http = require('http');

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('=== ' + url + ' ===');
        console.log('Status:', res.statusCode);
        const titleMatch = data.match(/<title>(.*?)<\/title>/);
        console.log('Title:', titleMatch ? titleMatch[1] : 'none');
        console.log('Has raw code block tag <pre>:', data.includes('<pre'));
        resolve();
      });
    });
    req.setTimeout(2000, () => {
      console.log('=== ' + url + ' === TIMEOUT');
      req.destroy();
      resolve();
    });
    req.on('error', err => {
      console.log('=== ' + url + ' === ERROR: ' + err.message);
      resolve();
    });
  });
}

async function run() {
  await checkUrl('http://127.0.0.1:8888/');
  await checkUrl('http://127.0.0.1:5173/');
}

run();
