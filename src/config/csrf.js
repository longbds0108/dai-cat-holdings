const { doubleCsrf } = require('csrf-csrf');

const isProd = process.env.NODE_ENV === 'production';

const { doubleCsrfProtection, generateToken } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET || 'dev-csrf-secret-change-me',
  getSessionIdentifier: (req) => req.session.id,
  cookieName: 'x-csrf-token',
  cookieOptions: { sameSite: 'lax', secure: isProd, httpOnly: true },
  // Plain HTML forms can't send custom headers, so read the token from a hidden input instead.
  getTokenFromRequest: (req) => req.body && req.body._csrf,
});

module.exports = { doubleCsrfProtection, generateToken };
