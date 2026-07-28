const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Inquiry extends Model {}

  Inquiry.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
      phone: { type: DataTypes.STRING, allowNull: true },
      message: { type: DataTypes.TEXT, allowNull: true },
      projectId: { type: DataTypes.INTEGER, allowNull: true },
      status: { type: DataTypes.ENUM('new', 'handled'), defaultValue: 'new' },
    },
    { sequelize, modelName: 'Inquiry', tableName: 'Inquiries' }
  );

  Inquiry.associate = (models) => {
    Inquiry.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
  };

  return Inquiry;
};
