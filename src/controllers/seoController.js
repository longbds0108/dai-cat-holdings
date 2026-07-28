const { Project, NewsPost } = require('../models');
const { SUPPORTED_LOCALES } = require('../middlewares/locale');

exports.sitemap = async (req, res, next) => {
  try {
    const base = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
    const [projects, posts] = await Promise.all([
      Project.findAll({ where: { isPublished: true }, attributes: ['slug', 'updatedAt'] }),
      NewsPost.findAll({ where: { isPublished: true }, attributes: ['slug', 'updatedAt'] }),
    ]);

    const staticPaths = ['', '/about', '/projects', '/news', '/contact'];
    const urls = [];

    SUPPORTED_LOCALES.forEach((locale) => {
      staticPaths.forEach((p) => urls.push(`${base}/${locale}${p}`));
      projects.forEach((p) => urls.push(`${base}/${locale}/projects/${p.slug}`));
      posts.forEach((p) => urls.push(`${base}/${locale}/news/${p.slug}`));
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((url) => `  <url><loc>${url}</loc></url>`)
      .join('\n')}\n</urlset>`;

    res.type('application/xml').send(xml);
  } catch (err) {
    next(err);
  }
};

exports.robots = (req, res) => {
  const base = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
  res.type('text/plain').send(`User-agent: *\nDisallow: /admin\nSitemap: ${base}/sitemap.xml\n`);
};
