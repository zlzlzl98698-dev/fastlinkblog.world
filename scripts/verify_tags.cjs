const fs = require('fs');
const html = fs.readFileSync('docs/.vitepress/dist/reviews/guangsu.html', 'utf8');
console.log('Canonical:', html.match(/<link rel=["']canonical["'][^>]*>/i)?.[0]);
console.log('OG Title:', html.match(/<meta property=["']og:title["'][^>]*>/i)?.[0]);
console.log('OG URL:', html.match(/<meta property=["']og:url["'][^>]*>/i)?.[0]);
console.log('Twitter Card:', html.match(/<meta name=["']twitter:card["'][^>]*>/i)?.[0]);
