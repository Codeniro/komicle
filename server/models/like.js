module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    like: {
      type: DataTypes.STRING,
      allowNull: false
    },
    episodeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Like.associate = (models) => {
    Like.belongsTo(models.ComicEpisode, {
      foreignKey: 'episodeId',
      onDelete: 'CASCADE'
    });
  };
  return Like;
};
