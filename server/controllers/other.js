const connection = require("../models").connection;

const controller = {
  reset: (req, res) => {
    connection
      .sync({ force: true })
      .then(() => res.status(201).send({ message: "Database reset" }))
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Database Error" });
      });
  },
};

module.exports = controller;
