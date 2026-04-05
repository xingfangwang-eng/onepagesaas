import fs from 'fs';
import path from 'path';

// 读取 keywords.json 文件
const keywords = JSON.parse(fs.readFileSync(path.join('data', 'keywords.json'), 'utf8'));

// 域名
const domain = 'https://onepagesaas.wangdadi.xyz';

// 生成网站地图
const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // 首页
  sitemap += `  <url>
    <loc>${domain}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // 聚合页
  sitemap += `  <url>
    <loc>${domain}/solutions</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // 100个静态页面
  keywords.forEach(keyword => {
    sitemap += `  <url>
    <loc>${domain}/solutions/${keyword.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  // 写入到 public 目录
  fs.writeFileSync(path.join('public', 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully!');
  console.log(`Total URLs: ${keywords.length + 2}`);
};

generateSitemap();
