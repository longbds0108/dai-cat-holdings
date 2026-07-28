const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const DOMPurify = require('isomorphic-dompurify');
const { AdminUser, Project, NewsPost, Inquiry, SiteSetting } = require('../models');

function clean(html) {
  return DOMPurify.sanitize(html || '', { USE_PROFILES: { html: true } });
}

async function uniqueSlug(Model, base) {
  const baseSlug = slugify(base, { lower: true, strict: true, locale: 'vi' });
  let slug = baseSlug;
  let i = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await Model.findOne({ where: { slug } })) {
    slug = `${baseSlug}-${i}`;
    i += 1;
  }
  return slug;
}

// ---------- Auth ----------

exports.loginPage = (req, res) => {
  if (req.session.adminUser) return res.redirect('/admin');
  res.render('admin/login', { layout: 'admin/layout-blank', error: null });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminUser.findOne({ where: { email } });
    const valid = admin && (await bcrypt.compare(password, admin.passwordHash));

    if (!valid) {
      return res.status(401).render('admin/login', {
        layout: 'admin/layout-blank',
        error: 'Email hoặc mật khẩu không đúng.',
      });
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    req.session.adminUser = { id: admin.id, name: admin.name, email: admin.email };
    res.redirect('/admin');
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
};

// ---------- Dashboard ----------

exports.dashboard = async (req, res, next) => {
  try {
    const [projectCount, newsCount, newInquiries, recentInquiries] = await Promise.all([
      Project.count(),
      NewsPost.count(),
      Inquiry.count({ where: { status: 'new' } }),
      Inquiry.findAll({ order: [['createdAt', 'DESC']], limit: 5 }),
    ]);

    res.render('admin/dashboard', {
      layout: 'admin/layout',
      title: 'Dashboard',
      projectCount,
      newsCount,
      newInquiries,
      recentInquiries,
    });
  } catch (err) {
    next(err);
  }
};

// ---------- Projects ----------

exports.projectsList = async (req, res, next) => {
  try {
    const projects = await Project.findAll({ order: [['createdAt', 'DESC']] });
    res.render('admin/projects/list', { layout: 'admin/layout', title: 'Dự án', projects });
  } catch (err) {
    next(err);
  }
};

exports.projectNewForm = (req, res) => {
  res.render('admin/projects/form', { layout: 'admin/layout', title: 'Thêm dự án', project: null, errors: [] });
};

exports.projectEditForm = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).send('Không tìm thấy dự án');
    res.render('admin/projects/form', { layout: 'admin/layout', title: 'Sửa dự án', project, errors: [] });
  } catch (err) {
    next(err);
  }
};

exports.projectCreate = async (req, res, next) => {
  try {
    const body = req.body;
    const slug = await uniqueSlug(Project, body.titleEn || body.titleVi);
    const images = req.uploadedImagePaths || [];

    await Project.create({
      slug,
      titleVi: body.titleVi,
      titleEn: body.titleEn,
      summaryVi: body.summaryVi,
      summaryEn: body.summaryEn,
      descriptionVi: clean(body.descriptionVi),
      descriptionEn: clean(body.descriptionEn),
      type: body.type,
      location: body.location,
      status: body.status,
      areaText: body.areaText,
      priceFromText: body.priceFromText,
      coverImage: images[0] || null,
      images,
      isFeatured: body.isFeatured === 'on',
      isPublished: body.isPublished === 'on',
    });

    req.flash('success', 'Đã tạo dự án thành công.');
    res.redirect('/admin/projects');
  } catch (err) {
    next(err);
  }
};

exports.projectUpdate = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).send('Không tìm thấy dự án');

    const body = req.body;
    const newImages = req.uploadedImagePaths;

    await project.update({
      titleVi: body.titleVi,
      titleEn: body.titleEn,
      summaryVi: body.summaryVi,
      summaryEn: body.summaryEn,
      descriptionVi: clean(body.descriptionVi),
      descriptionEn: clean(body.descriptionEn),
      type: body.type,
      location: body.location,
      status: body.status,
      areaText: body.areaText,
      priceFromText: body.priceFromText,
      ...(newImages && newImages.length ? { coverImage: newImages[0], images: newImages } : {}),
      isFeatured: body.isFeatured === 'on',
      isPublished: body.isPublished === 'on',
    });

    req.flash('success', 'Đã cập nhật dự án.');
    res.redirect('/admin/projects');
  } catch (err) {
    next(err);
  }
};

exports.projectDelete = async (req, res, next) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });
    req.flash('success', 'Đã xoá dự án.');
    res.redirect('/admin/projects');
  } catch (err) {
    next(err);
  }
};

// ---------- News ----------

exports.newsList = async (req, res, next) => {
  try {
    const posts = await NewsPost.findAll({ order: [['createdAt', 'DESC']] });
    res.render('admin/news/list', { layout: 'admin/layout', title: 'Tin tức', posts });
  } catch (err) {
    next(err);
  }
};

exports.newsNewForm = (req, res) => {
  res.render('admin/news/form', { layout: 'admin/layout', title: 'Thêm tin tức', post: null, errors: [] });
};

exports.newsEditForm = async (req, res, next) => {
  try {
    const post = await NewsPost.findByPk(req.params.id);
    if (!post) return res.status(404).send('Không tìm thấy bài viết');
    res.render('admin/news/form', { layout: 'admin/layout', title: 'Sửa tin tức', post, errors: [] });
  } catch (err) {
    next(err);
  }
};

exports.newsCreate = async (req, res, next) => {
  try {
    const body = req.body;
    const slug = await uniqueSlug(NewsPost, body.titleEn || body.titleVi);

    await NewsPost.create({
      slug,
      titleVi: body.titleVi,
      titleEn: body.titleEn,
      excerptVi: body.excerptVi,
      excerptEn: body.excerptEn,
      contentVi: clean(body.contentVi),
      contentEn: clean(body.contentEn),
      coverImage: req.uploadedImagePath || null,
      isPublished: body.isPublished === 'on',
      publishedAt: new Date(),
    });

    req.flash('success', 'Đã tạo bài viết.');
    res.redirect('/admin/news');
  } catch (err) {
    next(err);
  }
};

exports.newsUpdate = async (req, res, next) => {
  try {
    const post = await NewsPost.findByPk(req.params.id);
    if (!post) return res.status(404).send('Không tìm thấy bài viết');

    const body = req.body;
    await post.update({
      titleVi: body.titleVi,
      titleEn: body.titleEn,
      excerptVi: body.excerptVi,
      excerptEn: body.excerptEn,
      contentVi: clean(body.contentVi),
      contentEn: clean(body.contentEn),
      ...(req.uploadedImagePath ? { coverImage: req.uploadedImagePath } : {}),
      isPublished: body.isPublished === 'on',
    });

    req.flash('success', 'Đã cập nhật bài viết.');
    res.redirect('/admin/news');
  } catch (err) {
    next(err);
  }
};

exports.newsDelete = async (req, res, next) => {
  try {
    await NewsPost.destroy({ where: { id: req.params.id } });
    req.flash('success', 'Đã xoá bài viết.');
    res.redirect('/admin/news');
  } catch (err) {
    next(err);
  }
};

// ---------- Inquiries ----------

exports.inquiriesList = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.findAll({ order: [['createdAt', 'DESC']], include: ['project'] });
    res.render('admin/inquiries/list', { layout: 'admin/layout', title: 'Liên hệ', inquiries });
  } catch (err) {
    next(err);
  }
};

exports.inquiryMarkHandled = async (req, res, next) => {
  try {
    await Inquiry.update({ status: 'handled' }, { where: { id: req.params.id } });
    res.redirect('/admin/inquiries');
  } catch (err) {
    next(err);
  }
};

// ---------- Settings ----------

exports.settingsPage = async (req, res, next) => {
  try {
    const rows = await SiteSetting.findAll();
    const settings = rows.reduce((acc, r) => ({ ...acc, [r.key]: r.value }), {});
    res.render('admin/settings', { layout: 'admin/layout', title: 'Cài đặt chung', settings });
  } catch (err) {
    next(err);
  }
};

exports.settingsUpdate = async (req, res, next) => {
  try {
    const entries = Object.entries(req.body);
    await Promise.all(
      entries.map(([key, value]) => SiteSetting.upsert({ key, value: String(value) }))
    );
    req.flash('success', 'Đã lưu cài đặt.');
    res.redirect('/admin/settings');
  } catch (err) {
    next(err);
  }
};
