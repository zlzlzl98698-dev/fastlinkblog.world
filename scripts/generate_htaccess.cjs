const fs = require('fs');
const path = require('path');
const brands = require('../docs/data/brands.json');

let htaccess = `# ========================================================
# 飞鸟博客 (fastlinkblog.world) Apache 生产环境基础架构配置
# 涵盖：HTTPS 301、WWW 301、Clean URLs、42 家商业跳转与安全头部
# ========================================================

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. 强制 HTTPS 301 重定向 (统一主域安全协议)
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://fastlinkblog.world/$1 [R=301,L]

  # 2. 强制非 WWW (裸域名) 301 重定向 (防止权重分散)
  RewriteCond %{HTTP_HOST} ^www\\.fastlinkblog\\.world$ [NC]
  RewriteRule ^(.*)$ https://fastlinkblog.world/$1 [R=301,L]

  # 3. 商业推广外链 302 优雅跳转 (/go/:slug)
`;

brands.forEach(b => {
  if (b.slug && b.affLink && b.affLink.startsWith('http')) {
    htaccess += `  RewriteRule ^go/${b.slug}/?$ ${b.affLink} [R=302,L]\n`;
  }
});

htaccess += `
  # 4. VitePress cleanUrls 友好重写 (支持直接访问无 .html 路径)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]

  # 5. 目录默认索引降级
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteCond %{REQUEST_FILENAME}/index.html -f
  RewriteRule ^(.*)$ $1/index.html [L]
</IfModule>

# 6. 严禁 Soft 404，真实返回 404 状态码
ErrorDocument 404 /404.html

# 7. Gzip / Brotli 静态压缩加速 (提升 TTFB 与爬虫抓取效率)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json image/svg+xml
</IfModule>

# 8. 静态资源长期缓存与安全加固头部
<IfModule mod_headers.c>
  <FilesMatch "\\.(jpg|jpeg|png|gif|svg|webp|ico|woff2|woff|ttf)$">
    Header set Cache-Control "max-age=31536000, public, immutable"
  </FilesMatch>
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  # 确保爬虫能够识别权威索引
  Header always set X-Robots-Tag "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
</IfModule>
`;

fs.writeFileSync(path.resolve(__dirname, '../docs/public/.htaccess'), htaccess.trim() + '\n', 'utf8');
console.log('Successfully generated docs/public/.htaccess with 42 redirects and security rules!');
