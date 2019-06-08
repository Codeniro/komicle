module.exports = (sequelize, DataTypes) => {
  const ComicImage = sequelize.define('ComicImage', {
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    episodeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  ComicImage.associate = (models) => {
    ComicImage.belongsTo(models.ComicEpisode, {
      foreignKey: 'episodeId',
      onDelete: 'CASCADE'
    });
  };
  return ComicImage;
};
