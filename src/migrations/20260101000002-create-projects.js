'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Projects', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      titleVi: { type: Sequelize.STRING, allowNull: false },
      titleEn: { type: Sequelize.STRING, allowNull: false },
      summaryVi: { type: Sequelize.TEXT, allowNull: true },
      summaryEn: { type: Sequelize.TEXT, allowNull: true },
      descriptionVi: { type: Sequelize.TEXT('long'), allowNull: true },
      descriptionEn: { type: Sequelize.TEXT('long'), allowNull: true },
      type: { type: Sequelize.STRING, allowNull: false, defaultValue: 'apartment' },
      location: { type: Sequelize.STRING, allowNull: true },
      status: { type: Sequelize.ENUM('upcoming', 'selling', 'completed'), allowNull: false, defaultValue: 'upcoming' },
      areaText: { type: Sequelize.STRING, allowNull: true },
      priceFromText: { type: Sequelize.STRING, allowNull: true },
      coverImage: { type: Sequelize.STRING, allowNull: true },
      images: { type: Sequelize.TEXT, allowNull: false, defaultValue: '[]' },
      isFeatured: { type: Sequelize.BOOLEAN, defaultValue: false },
      isPublished: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Projects');
  },
};
