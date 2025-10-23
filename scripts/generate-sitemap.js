const fs = require('fs');
const { glob } = require('glob');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// Pages to exclude from sitemap
const EXCLUDED_PAGES = ['/404', '/_app', '/_document', '/_error', '/api'];
const SITE_URL = 'https://votredomaine.com';

async function generateSitemap() {
  // Get all pages in the pages directory
  const pages = await glob('pages/**/*.{js,jsx,ts,tsx,mdx}');
  
  // Filter out excluded pages and format URLs
  const pagePaths = pages
    .map(page => {
      const path = page
        .replace('pages', '')
        .replace('.js', '')
        .replace('.jsx', '')
        .replace('.ts', '')
        .replace('.tsx', '')
        .replace('.mdx', '')
        .replace('/index', '');
      
      return path === '/index' ? '/' : path;
    })
    .filter(page => !EXCLUDED_PAGES.includes(page));

  // Create sitemap
  const stream = new SitemapStream({ hostname: SITE_URL });
  
  const links = pagePaths.map(path => ({
    url: path,
    changefreq: 'daily',
    priority: path === '/' ? 1.0 : 0.8,
  }));

  // Add static pages
  const staticPages = [
    { url: '/a-propos', changefreq: 'monthly', priority: 0.7 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  ];

  const allLinks = [...links, ...staticPages];
  
  // Write sitemap to file
  const sitemap = await streamToPromise(
    Readable.from(allLinks).pipe(stream)
  ).then(data => data.toString());

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('Sitemap generated at public/sitemap.xml');
}

generateSitemap().catch(console.error);
