'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Inquiries', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING, allowNull: true },
      message: { type: Sequelize.TEXT, allowNull: true },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Projects', key: 'id' },
        onDelete: 'SET NULL',
      },
      status: { type: Sequelize.ENUM('new', 'handled'), defaultValue: 'new' },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Inquiries');
  },
};
