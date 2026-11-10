const fs = require('fs');
let s = fs.readFileSync('docs/data/brands.ts', 'utf8');
s = s.replaceAll('"hasReview": false', '"hasReview": true');
fs.writeFileSync('docs/data/brands.ts', s, 'utf8');
console.log('Successfully updated hasReview in brands.ts');
