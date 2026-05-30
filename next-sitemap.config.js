/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://arjunnayak.dev',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  outDir: 'public',
  transform: async (config, path) => {
    // Blog posts change less frequently
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }
    }
    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }
  },
}
