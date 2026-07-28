const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class AdminUser extends Model {}

  AdminUser.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, defaultValue: 'admin' },
      lastLoginAt: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, modelName: 'AdminUser', tableName: 'AdminUsers' }
  );

  return AdminUser;
};
