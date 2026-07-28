const { SUPPORTED_LOCALES, DEFAULT_LOCALE, translate } = require('../config/i18n');

function detectPreferredLocale(req) {
  return req.acceptsLanguages(SUPPORTED_LOCALES) || DEFAULT_LOCALE;
}

// Mounted under '/:locale(vi|en)', so req.params.locale is already validated by the route pattern.
function localeMiddleware(req, res, next) {
  const locale = req.params.locale;
  req.locale = locale;
  req.basePath = `/${locale}`;
  res.locals.locale = locale;
  res.locals.basePath = req.basePath;
  res.locals.otherLocale = SUPPORTED_LOCALES.find((l) => l !== locale);
  res.locals.t = (key) => translate(locale, key);
  res.locals.currentPath = req.path || '/';
  next();
}

module.exports = { localeMiddleware, detectPreferredLocale, SUPPORTED_LOCALES, DEFAULT_LOCALE };
