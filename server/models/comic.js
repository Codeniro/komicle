module.exports = (sequelize, DataTypes) => {
  const Comic = sequelize.define('Comic', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.Text,
      allowNull: false
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Comic.associate = (models) => {
    Comic.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Comic.hasMany(models.ComicEpisode, {
      foreignKey: 'comicId ',
    });
  };

  return Comic;
};
