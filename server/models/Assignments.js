module.exports = (sequelize, DataTypes) => {
  const Assignments = sequelize.define("Assignments", {
    nume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Assignments;
};
