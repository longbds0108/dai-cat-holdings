'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NewsPosts', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      titleVi: { type: Sequelize.STRING, allowNull: false },
      titleEn: { type: Sequelize.STRING, allowNull: false },
      excerptVi: { type: Sequelize.TEXT, allowNull: true },
      excerptEn: { type: Sequelize.TEXT, allowNull: true },
      contentVi: { type: Sequelize.TEXT('long'), allowNull: true },
      contentEn: { type: Sequelize.TEXT('long'), allowNull: true },
      coverImage: { type: Sequelize.STRING, allowNull: true },
      isPublished: { type: Sequelize.BOOLEAN, defaultValue: true },
      publishedAt: { type: Sequelize.DATE, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('NewsPosts');
  },
};
