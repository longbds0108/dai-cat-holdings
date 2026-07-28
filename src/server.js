require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');

const sequelize = require('./config/database');
const { localeMiddleware, detectPreferredLocale, DEFAULT_LOCALE } = require('./middlewares/locale');
const { translate } = require('./config/i18n');
const { generateToken } = require('./config/csrf');
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');
const seoController = require('./controllers/seoController');

const app = express();
const isProd = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        frameSrc: ["'self'", 'https://www.google.com'],
      },
    },
  })
);
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

const sessionStore = new SequelizeStore({ db: sequelize, tableName: 'Sessions' });
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    store: sessionStore,
    resave: false,
    // true so every visitor gets a stable session id from their first request — the
    // CSRF double-submit token is bound to this id, so it must not change between
    // the GET that renders a form and the POST that submits it.
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 8,
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
    },
  })
);
sessionStore.sync();
app.use(flash());

app.use((req, res, next) => {
  res.locals.currentAdmin = req.session.adminUser || null;
  res.locals.messages = {
    success: req.flash('success'),
    error: req.flash('error'),
  };
  // validateOnReuse=false: if the browser sends a stale/invalid csrf cookie (e.g. left
  // over from a previous session), silently issue a fresh token instead of throwing —
  // only the actual doubleCsrfProtection check on form submission should ever reject.
  res.locals.csrfToken = generateToken(req, res, false, false);
  next();
});

app.get('/sitemap.xml', seoController.sitemap);
app.get('/robots.txt', seoController.robots);

app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);
app.use('/:locale(vi|en)', localeMiddleware, publicRoutes);

// Any request without a valid /vi or /en prefix: redirect once to the preferred locale.
app.get('*', (req, res, next) => {
  if (/^\/(admin|api)(\/|$)/.test(req.path) || /^\/(vi|en)(\/|$)/.test(req.path)) return next();
  const preferred = detectPreferredLocale(req);
  return res.redirect(`/${preferred}${req.path === '/' ? '' : req.path}`);
});

app.use((req, res) => {
  const locale = res.locals.locale || DEFAULT_LOCALE;
  res.locals.locale = locale;
  res.locals.basePath = res.locals.basePath || `/${locale}`;
  res.locals.t = res.locals.t || ((key) => translate(locale, key));
  res.locals.currentPath = res.locals.currentPath || req.path;
  res.locals.otherLocale = res.locals.otherLocale || (locale === 'vi' ? 'en' : 'vi');
  res.locals.settings = res.locals.settings || {};
  res.status(404).render('pages/404', { title: '404' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).send(isProd ? 'Đã có lỗi xảy ra. Vui lòng thử lại sau.' : err.stack);
});

module.exports = app;
