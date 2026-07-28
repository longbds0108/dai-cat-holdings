require('dotenv').config();

const sqlite = {
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './database/dev.sqlite',
  logging: false,
};

const mysql = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
};

module.exports = {
  development: process.env.DB_DIALECT === 'mysql' ? mysql : sqlite,
  test: sqlite,
  production: mysql,
};
