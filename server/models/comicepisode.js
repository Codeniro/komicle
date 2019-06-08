module.exports = (sequelize, DataTypes) => {
  const ComicEpisode = sequelize.define('ComicEpisode', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  ComicEpisode.associate = (models) => {
    ComicEpisode.belongsTo(models.Comic, {
      foreignKey: 'comicId',
      onDelete: 'CASCADE'
    });

    ComicEpisode.hasMany(models.ComicImage, {
      foreignKey: 'episodeId'
    });

    ComicEpisode.hasMany(models.Comment, {
      foreignKey: 'episodeId'
    });

    ComicEpisode.hasMany(models.Like, {
      foreignKey: 'episodeId'
    });
  };

  return ComicEpisode;
};
