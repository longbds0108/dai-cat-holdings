function requireAdmin(req, res, next) {
  if (!req.session.adminUser) {
    return res.redirect('/admin/login');
  }
  next();
}

module.exports = { requireAdmin };
