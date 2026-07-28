const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const publicController = require('../controllers/publicController');
const { doubleCsrfProtection } = require('../config/csrf');

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/', publicController.home);
router.get('/about', publicController.about);
router.get('/projects', publicController.projectsList);
router.get('/projects/:slug', publicController.projectDetail);
router.get('/news', publicController.newsList);
router.get('/news/:slug', publicController.newsDetail);
router.get('/contact', publicController.contactPage);
router.post(
  '/contact',
  contactLimiter,
  doubleCsrfProtection,
  [
    body('name').trim().notEmpty().isLength({ max: 120 }),
    body('email').trim().isEmail().normalizeEmail(),
    body('phone').optional({ checkFalsy: true }).trim().isLength({ max: 30 }),
    body('message').optional({ checkFalsy: true }).trim().isLength({ max: 2000 }),
  ],
  publicController.contactSubmit
);

module.exports = router;
