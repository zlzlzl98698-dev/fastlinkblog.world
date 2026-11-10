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
  // Match the raw script block at the end
  const regex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/;
  const match = content.match(regex);
  if (match) {
    try {
      const jsonStr = match[1].trim();
      const jsonObj = JSON.parse(jsonStr);
      // Remove raw script from markdown body
      content = content.replace(regex, '').trim() + '\n';
      
      // Inject into frontmatter head
      // Find frontmatter
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (fmMatch) {
        let fm = fmMatch[1];
        // Clean JSON for yaml multiline or one-line string
        const serialized = JSON.stringify(jsonObj);
        const headEntry = `head:\n  - - script\n    - type: application/ld+json\n    - '${serialized.replace(/'/g, "''")}'\n`;
        if (fm.includes('head:')) {
          // append to existing head
          fm = fm.replace(/head:\n/, `head:\n  - - script\n    - type: application/ld+json\n    - '${serialized.replace(/'/g, "''")}'\n`);
        } else {
          fm = fm + '\n' + headEntry;
        }
        content = `---\n${fm.trim()}\n---\n` + content.slice(fmMatch[0].length);
        fs.writeFileSync(f, content, 'utf8');
        console.log('Successfully injected into frontmatter head:', f);
      }
    } catch (e) {
      console.error('Error parsing JSON in', f, e.message);
    }
  }
});
