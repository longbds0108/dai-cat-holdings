const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { requireAdmin } = require('../middlewares/auth');
const { upload, processUploadedImages } = require('../middlewares/upload');
const { doubleCsrfProtection } = require('../config/csrf');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/login', adminController.loginPage);
router.post('/login', loginLimiter, doubleCsrfProtection, adminController.login);
router.post('/logout', doubleCsrfProtection, adminController.logout);

router.use(requireAdmin);

router.get('/', adminController.dashboard);

router.get('/projects', adminController.projectsList);
router.get('/projects/new', adminController.projectNewForm);
router.post(
  '/projects',
  upload.array('images', 12),
  doubleCsrfProtection,
  processUploadedImages,
  adminController.projectCreate
);
router.get('/projects/:id/edit', adminController.projectEditForm);
router.post(
  '/projects/:id',
  upload.array('images', 12),
  doubleCsrfProtection,
  processUploadedImages,
  adminController.projectUpdate
);
router.post('/projects/:id/delete', doubleCsrfProtection, adminController.projectDelete);

router.get('/news', adminController.newsList);
router.get('/news/new', adminController.newsNewForm);
router.post(
  '/news',
  upload.single('coverImage'),
  doubleCsrfProtection,
  processUploadedImages,
  adminController.newsCreate
);
router.get('/news/:id/edit', adminController.newsEditForm);
router.post(
  '/news/:id',
  upload.single('coverImage'),
  doubleCsrfProtection,
  processUploadedImages,
  adminController.newsUpdate
);
router.post('/news/:id/delete', doubleCsrfProtection, adminController.newsDelete);

router.get('/inquiries', adminController.inquiriesList);
router.post('/inquiries/:id/handled', doubleCsrfProtection, adminController.inquiryMarkHandled);

router.get('/settings', adminController.settingsPage);
router.post('/settings', doubleCsrfProtection, adminController.settingsUpdate);

module.exports = router;
