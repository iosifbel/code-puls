module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define("Groups", {
    numar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Groups.associate = (models) => {
    Groups.hasMany(models.Courses);
  };

  Groups.associate = (models) => {
    Groups.hasMany(models.Assignments, {
      onDelete: "cascade",
    });
  };

  Groups.associate = (models) => {
    Groups.hasMany(models.Students, {
      onDelete: "cascade",
    });
  };

  return Groups;
};
