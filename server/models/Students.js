module.exports = (sequelize, DataTypes) => {
  const Students = sequelize.define("Students", {
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

  // Students.associate = (models) => {
  //   Students.hasMany(models.Assignments);
  // };

  return Students;
};
