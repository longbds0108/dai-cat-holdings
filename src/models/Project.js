const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class Project extends Model {}

  Project.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      titleVi: { type: DataTypes.STRING, allowNull: false },
      titleEn: { type: DataTypes.STRING, allowNull: false },
      summaryVi: { type: DataTypes.TEXT, allowNull: true },
      summaryEn: { type: DataTypes.TEXT, allowNull: true },
      descriptionVi: { type: DataTypes.TEXT('long'), allowNull: true },
      descriptionEn: { type: DataTypes.TEXT('long'), allowNull: true },
      type: { type: DataTypes.STRING, allowNull: false, defaultValue: 'apartment' },
      location: { type: DataTypes.STRING, allowNull: true },
      status: {
        type: DataTypes.ENUM('upcoming', 'selling', 'completed'),
        allowNull: false,
        defaultValue: 'upcoming',
      },
      areaText: { type: DataTypes.STRING, allowNull: true },
      priceFromText: { type: DataTypes.STRING, allowNull: true },
      coverImage: { type: DataTypes.STRING, allowNull: true },
      images: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '[]',
        get() {
          const raw = this.getDataValue('images');
          try {
            return JSON.parse(raw || '[]');
          } catch {
            return [];
          }
        },
        set(value) {
          this.setDataValue('images', JSON.stringify(value || []));
        },
      },
      isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
      isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    { sequelize, modelName: 'Project', tableName: 'Projects' }
  );

  Project.associate = (models) => {
    Project.hasMany(models.Inquiry, { foreignKey: 'projectId', as: 'inquiries' });
  };

  return Project;
};
