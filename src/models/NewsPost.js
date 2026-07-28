const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class NewsPost extends Model {}

  NewsPost.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      titleVi: { type: DataTypes.STRING, allowNull: false },
      titleEn: { type: DataTypes.STRING, allowNull: false },
      excerptVi: { type: DataTypes.TEXT, allowNull: true },
      excerptEn: { type: DataTypes.TEXT, allowNull: true },
      contentVi: { type: DataTypes.TEXT('long'), allowNull: true },
      contentEn: { type: DataTypes.TEXT('long'), allowNull: true },
      coverImage: { type: DataTypes.STRING, allowNull: true },
      isPublished: { type: DataTypes.BOOLEAN, defaultValue: true },
      publishedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { sequelize, modelName: 'NewsPost', tableName: 'NewsPosts' }
  );

  return NewsPost;
};
