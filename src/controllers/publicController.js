const { validationResult } = require('express-validator');
const { Project, NewsPost, Inquiry, SiteSetting } = require('../models');
const { sendContactNotification } = require('../services/mailer');

async function getSettings() {
  const rows = await SiteSetting.findAll();
  return rows.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
}

function localize(record, field, locale) {
  const key = `${field}${locale === 'en' ? 'En' : 'Vi'}`;
  return record[key];
}

exports.home = async (req, res, next) => {
  try {
    const { locale } = req;
    const [featuredProjects, latestNews, settings] = await Promise.all([
      Project.findAll({ where: { isFeatured: true, isPublished: true }, order: [['createdAt', 'DESC']], limit: 3 }),
      NewsPost.findAll({ where: { isPublished: true }, order: [['publishedAt', 'DESC']], limit: 3 }),
      getSettings(),
    ]);

    res.render('pages/home', {
      title: null,
      featuredProjects,
      latestNews,
      settings,
      localize: (record, field) => localize(record, field, locale),
    });
  } catch (err) {
    next(err);
  }
};

exports.about = (req, res) => {
  res.render('pages/about', { title: res.locals.t('nav.about') });
};

exports.projectsList = async (req, res, next) => {
  try {
    const { locale } = req;
    const { status, type } = req.query;
    const where = { isPublished: true };
    if (status) where.status = status;
    if (type) where.type = type;

    const projects = await Project.findAll({ where, order: [['createdAt', 'DESC']] });
    const allProjects = await Project.findAll({ where: { isPublished: true }, attributes: ['type'] });
    const types = [...new Set(allProjects.map((p) => p.type))];

    res.render('pages/projects-list', {
      title: res.locals.t('projects.title'),
      projects,
      types,
      currentStatus: status || '',
      currentType: type || '',
      localize: (record, field) => localize(record, field, locale),
    });
  } catch (err) {
    next(err);
  }
};

exports.projectDetail = async (req, res, next) => {
  try {
    const { locale } = req;
    const project = await Project.findOne({ where: { slug: req.params.slug, isPublished: true } });
    if (!project) return res.status(404).render('pages/404', { title: '404' });

    res.render('pages/project-detail', {
      title: localize(project, 'title', locale),
      metaDescription: localize(project, 'summary', locale),
      project,
      localize: (record, field) => localize(record, field, locale),
    });
  } catch (err) {
    next(err);
  }
};

exports.newsList = async (req, res, next) => {
  try {
    const { locale } = req;
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const pageSize = 9;
    const { rows: posts, count } = await NewsPost.findAndCountAll({
      where: { isPublished: true },
      order: [['publishedAt', 'DESC']],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    res.render('pages/news-list', {
      title: res.locals.t('news.title'),
      posts,
      currentPage: page,
      totalPages: Math.max(Math.ceil(count / pageSize), 1),
      localize: (record, field) => localize(record, field, locale),
    });
  } catch (err) {
    next(err);
  }
};

exports.newsDetail = async (req, res, next) => {
  try {
    const { locale } = req;
    const post = await NewsPost.findOne({ where: { slug: req.params.slug, isPublished: true } });
    if (!post) return res.status(404).render('pages/404', { title: '404' });

    res.render('pages/news-detail', {
      title: localize(post, 'title', locale),
      metaDescription: localize(post, 'excerpt', locale),
      post,
      localize: (record, field) => localize(record, field, locale),
    });
  } catch (err) {
    next(err);
  }
};

exports.contactPage = async (req, res, next) => {
  try {
    const settings = await getSettings();
    res.render('pages/contact', { title: res.locals.t('contact.title'), settings, errors: [], values: {} });
  } catch (err) {
    next(err);
  }
};

exports.contactSubmit = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const settings = await getSettings();

    if (!errors.isEmpty()) {
      return res.status(400).render('pages/contact', {
        title: res.locals.t('contact.title'),
        settings,
        errors: errors.array(),
        values: req.body,
      });
    }

    const { name, email, phone, message, projectId } = req.body;
    await Inquiry.create({ name, email, phone, message, projectId: projectId || null });

    sendContactNotification({ name, email, phone, message }).catch((err) => {
      console.error('Failed to send contact notification email:', err.message);
    });

    req.flash('success', res.locals.t('contact.success'));
    res.redirect(`${req.basePath}/contact`);
  } catch (err) {
    next(err);
  }
};
