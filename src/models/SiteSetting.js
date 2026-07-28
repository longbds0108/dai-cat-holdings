const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class SiteSetting extends Model {}

  SiteSetting.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      key: { type: DataTypes.STRING, allowNull: false, unique: true },
      value: { type: DataTypes.TEXT, allowNull: true },
    },
    { sequelize, modelName: 'SiteSetting', tableName: 'SiteSettings' }
  );

  return SiteSetting;
};
