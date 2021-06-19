module.exports = (sequelize, DataTypes) => {
  const Teachers = sequelize.define("Teachers", {
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parola: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Teachers.associate = (models) => {
    Teachers.hasMany(models.Courses, {
      onDelete: "cascade",
    });
  };

  return Teachers;
};
