const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'docs', '.vitepress', 'dist');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log('=== Total HTML files in dist:', htmlFiles.length, '===');

// 1. Robots & Sitemap
console.log('\n--- 1. Robots & Sitemap ---');
const robotsPath = path.join(distDir, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  console.log('[robots.txt content]:');
  console.log(robots.trim());
} else {
  console.log('[robots.txt]: MISSING');
}

const sitemapPath = path.join(distDir, 'sitemap.xml');
let sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  sitemapUrls = (sitemap.match(/<loc>(.*?)<\/loc>/g) || []).map(u => u.replace(/<\/?loc>/g, ''));
  console.log('[sitemap.xml]: Found', sitemapUrls.length, 'URLs');
}

// 2. Canonical Matrix
console.log('\n--- 2. Canonical Matrix ---');
let canonicalMissing = [];
let canonicalMismatch = [];
let canonicalCorrect = 0;

htmlFiles.forEach(f => {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf8');
  const hasCanonical = html.includes('rel="canonical"') || html.includes("rel='canonical'");
  if (!hasCanonical) {
    canonicalMissing.push(rel);
  } else {
    const m = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
              html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
    if (m) {
      const canonicalUrl = m[1];
      canonicalCorrect++;
      // check if domain is fastlinkblog.world
      if (!canonicalUrl.startsWith('https://fastlinkblog.world')) {
        canonicalMismatch.push({ file: rel, canonicalUrl });
      }
    } else {
      canonicalMissing.push(rel);
    }
  }
});
console.log('Canonical missing count:', canonicalMissing.length);
console.log('Canonical mismatch count:', canonicalMismatch.length);
if (canonicalMissing.length > 0) {
  console.log('Sample missing canonical:', canonicalMissing.slice(0, 5));
}
if (canonicalMismatch.length > 0) {
  console.log('Sample mismatch canonical:', canonicalMismatch.slice(0, 5));
}

// 3. External Links & Nofollow Check
console.log('\n--- 3. External Links & Nofollow Compliance ---');
let totalAffLinks = 0;
let missingNofollow = [];
let sampleAffLinks = [];

htmlFiles.forEach(f => {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf8');
  const linkMatches = html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi);
  for (const match of linkMatches) {
    const href = match[1];
    const tag = match[0];
    // Check commercial redirect /go/ or external affiliate
    if (href.startsWith('/go/') || href.includes('aff') || href.includes('ref=')) {
      totalAffLinks++;
      const hasNofollow = tag.includes('rel=') && (tag.includes('nofollow') && tag.includes('sponsored'));
      if (!hasNofollow) {
        missingNofollow.push({ file: rel, tag, href });
      } else {
        if (sampleAffLinks.length < 5) sampleAffLinks.push({ file: rel, tag });
      }
    }
  }
});
console.log('Total commercial/affiliate links found:', totalAffLinks);
console.log('Missing nofollow/sponsored count:', missingNofollow.length);
if (missingNofollow.length > 0) {
  console.log('Violating links sample:', missingNofollow.slice(0, 5));
} else {
  console.log('PASS: All', totalAffLinks, 'affiliate links have rel="nofollow sponsored"!');
}

// 4. Content Thinness (< 2000 words or chars)
console.log('\n--- 4. Content Thinness & Text Length ---');
let thinPages = [];
let wordCounts = [];

htmlFiles.forEach(f => {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  if (rel === '404.html') return;
  const html = fs.readFileSync(f, 'utf8');
  // strip scripts, styles, tags
  const bodyText = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                       .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                       .replace(/<[^>]+>/g, ' ')
                       .replace(/\s+/g, ' ')
                       .trim();
  const charLength = bodyText.length;
  wordCounts.push({ file: rel, length: charLength });
  if (charLength < 1500) {
    thinPages.push({ file: rel, length: charLength });
  }
});

console.log('Total pages analyzed:', wordCounts.length);
console.log('Pages < 1500 characters:', thinPages.length);
if (thinPages.length > 0) {
  console.log('Sample thin pages:', thinPages.slice(0, 8));
}

// 5. Schema JSON-LD Verification
console.log('\n--- 5. JSON-LD Schema Verification ---');
let jsonLdPages = 0;
let jsonLdErrors = [];
let schemaTypes = {};

htmlFiles.forEach(f => {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf8');
  const matches = html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
  for (const match of matches) {
    jsonLdPages++;
    try {
      const data = JSON.parse(match[1]);
      const type = data['@type'] || 'Unknown';
      schemaTypes[type] = (schemaTypes[type] || 0) + 1;
      // Check hidden data vs visible
      if (data.url && !data.url.startsWith('https://fastlinkblog.world')) {
        jsonLdErrors.push({ file: rel, error: 'URL mismatch: ' + data.url });
      }
    } catch (e) {
      jsonLdErrors.push({ file: rel, error: 'JSON Parse Error: ' + e.message });
    }
  }
});
console.log('Total JSON-LD blocks found:', jsonLdPages);
console.log('Schema Types found:', schemaTypes);
console.log('JSON-LD errors/mismatches:', jsonLdErrors.length);
if (jsonLdErrors.length > 0) {
  console.log('Sample errors:', jsonLdErrors.slice(0, 5));
}

// 6. Meta Title & Description Duplicate Check
console.log('\n--- 6. Meta Title & Description Duplicates ---');
let titles = {};
let descriptions = {};

htmlFiles.forEach(f => {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  if (rel === '404.html') return;
  const html = fs.readFileSync(f, 'utf8');
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'NO_TITLE';
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i);
  const desc = descMatch ? descMatch[1].trim() : 'NO_DESC';

  if (!titles[title]) titles[title] = [];
  titles[title].push(rel);

  if (!descriptions[desc]) descriptions[desc] = [];
  descriptions[desc].push(rel);
});

let duplicateTitles = Object.entries(titles).filter(([t, files]) => files.length > 1);
let duplicateDescriptions = Object.entries(descriptions).filter(([d, files]) => files.length > 1);

console.log('Unique titles count:', Object.keys(titles).length, '| Duplicated titles:', duplicateTitles.length);
if (duplicateTitles.length > 0) {
  console.log('Sample duplicate titles:');
  duplicateTitles.slice(0, 3).forEach(([t, files]) => {
    console.log(`- "${t}" in ${files.length} pages:`, files.slice(0, 3));
  });
}

console.log('Unique descriptions count:', Object.keys(descriptions).length, '| Duplicated descriptions:', duplicateDescriptions.length);
if (duplicateDescriptions.length > 0) {
  console.log('Sample duplicate descriptions:');
  duplicateDescriptions.slice(0, 3).forEach(([d, files]) => {
    console.log(`- "${d.slice(0, 50)}..." in ${files.length} pages:`, files.slice(0, 3));
  });
}

// 7. Dead Links & Internal Broken Links
console.log('\n--- 7. Internal Link Verification ---');
let internalLinks = [];
let brokenInternalLinks = [];

htmlFiles.forEach(f => {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf8');
  const matches = html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi);
  for (const match of matches) {
    const href = match[1];
    if (href.startsWith('/') && !href.startsWith('/go/') && !href.startsWith('/assets/') && !href.startsWith('/images/')) {
      const cleanHref = href.split('#')[0].split('?')[0];
      if (cleanHref === '') continue;
      // Resolve path in dist
      let targetPath = path.join(distDir, cleanHref);
      let exists = false;
      if (fs.existsSync(targetPath)) {
        if (fs.statSync(targetPath).isDirectory()) {
          exists = fs.existsSync(path.join(targetPath, 'index.html'));
        } else {
          exists = true;
        }
      } else if (fs.existsSync(targetPath + '.html')) {
        exists = true;
      }
      if (!exists) {
        brokenInternalLinks.push({ from: rel, to: href });
      }
    }
  }
});

console.log('Broken internal links count:', brokenInternalLinks.length);
if (brokenInternalLinks.length > 0) {
  console.log('Sample broken links:', brokenInternalLinks.slice(0, 10));
}

// 8. Security / Infrastructure Exposure
console.log('\n--- 8. Security / Infrastructure / Leakage ---');
let leakages = [];
htmlFiles.forEach(f => {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf8');
  if (html.includes('C:\\Users\\') || html.includes('Desktop/')) {
    leakages.push({ file: rel, type: 'Local filepath' });
  }
  if (html.includes('127.0.0.1') || html.includes('localhost:')) {
    leakages.push({ file: rel, type: 'Local host reference' });
  }
  if (html.includes('tagblog.world')) {
    leakages.push({ file: rel, type: 'Old domain tagblog.world' });
  }
});
console.log('Leakage findings count:', leakages.length);
if (leakages.length > 0) {
  console.log('Sample leakages:', leakages.slice(0, 10));
}

// 9. Image Alt Check
console.log('\n--- 9. Image Alt Check ---');
let missingAlt = [];
htmlFiles.forEach(f => {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf8');
  const matches = html.match(/<img\b[^>]*>/gi) || [];
  matches.forEach(img => {
    const hasAlt = /alt=["'][^"']+["']/i.test(img);
    if (!hasAlt) {
      missingAlt.push({ file: rel, img });
    }
  });
});
console.log('Images missing descriptive alt:', missingAlt.length);
if (missingAlt.length > 0) {
  console.log('Sample missing alt:', missingAlt.slice(0, 5));
}

