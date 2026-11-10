const fs = require('fs');

const files = [
  'docs/faq/index.md',
  'docs/free-nodes/index.md',
  'docs/free-trial/index.md',
  'docs/reviews/guangsu.md',
  'docs/risk-warning/index.md'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // Replace ```html\n<script type="application/ld+json"> ... </script>\n```
  const regex = /```html\s*\n(<script\s+type="application\/ld\+json">[\s\S]*?<\/script>)\s*\n```/g;
  if (regex.test(content)) {
    content = content.replace(regex, '$1');
    fs.writeFileSync(f, content, 'utf8');
    console.log('Unwrapped Schema in:', f);
  } else {
    console.log('Pattern not matched in:', f);
  }
});
