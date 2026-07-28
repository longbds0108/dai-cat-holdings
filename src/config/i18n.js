const fs = require('fs');
const path = require('path');

const SUPPORTED_LOCALES = ['vi', 'en'];
const DEFAULT_LOCALE = 'vi';

const dictionaries = SUPPORTED_LOCALES.reduce((acc, locale) => {
  const filePath = path.join(__dirname, '..', 'locales', `${locale}.json`);
  acc[locale] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return acc;
}, {});

function translate(locale, key) {
  const dict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
  const value = key.split('.').reduce((obj, part) => (obj && obj[part] !== undefined ? obj[part] : undefined), dict);
  return value !== undefined ? value : key;
}

module.exports = { SUPPORTED_LOCALES, DEFAULT_LOCALE, translate };
