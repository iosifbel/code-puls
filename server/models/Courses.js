module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define("Courses", {
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Courses.associate = (models) => {
    Courses.hasMany(models.Groups);
  };

  return Courses;
};
