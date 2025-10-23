/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://votredomaine.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/server-sitemap.xml', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://votredomaine.com/sitemap.xml',
      'https://votredomaine.com/server-sitemap.xml',
    ],
  },
  // Additional configuration options:
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  autoLastmod: true,
  // Add any dynamic routes that need to be included in the sitemap
  // Example:
  // additionalPaths: async (config) => [
  //   await config.transform(config, '/dynamic-page-1'),
  //   await config.transform(config, '/dynamic-page-2'),
  // ],
  // Optional: Add alternate language versions
  // i18n: {
  //   locales: ['fr', 'en'],
  //   defaultLocale: 'fr',
  //   localeDetection: true,
  // }
};
