const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'docs', '.vitepress', 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8'
};

function handleRequest(req, res) {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);

  // Clean URL resolution
  let filePath = path.join(DIST_DIR, reqPath);

  // Check directory
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  // Fallback 404
  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, '404.html');
    res.statusCode = 404;
  } else {
    res.statusCode = 200;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Force no-cache for local preview
  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const stream = fs.createReadStream(filePath);
  stream.on('error', (err) => {
    res.statusCode = 500;
    res.end('Server Error: ' + err.message);
  });
  stream.pipe(res);
}

// Listen on both 5173 and 9000 for maximum user convenience
[5173, 9000].forEach((port) => {
  const server = http.createServer(handleRequest);
  server.on('error', (err) => {
    console.warn(`[Port ${port} Warning]: ${err.message}`);
  });
  server.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/ and http://127.0.0.1:${port}/`);
  });
});
