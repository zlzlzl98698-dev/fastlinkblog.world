const fs = require('fs');
const path = require('path');

function checkDir(d) {
  fs.readdirSync(d).forEach(f => {
    const full = path.join(d, f);
    if (fs.statSync(full).isDirectory()) {
      if (f !== '.vitepress' && f !== 'node_modules') checkDir(full);
    } else if (f.endsWith('.md')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('```html\n<script type="application/ld+json">') || c.includes('```\n<script type="application/ld+json">')) {
        console.log('Trapped JSON-LD found in:', full);
      }
    }
  });
}

checkDir(path.resolve('./docs'));
