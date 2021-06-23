const connection = require("../config/db");
const mysql = require("mysql2");

const controller = {
    getById: async (req, res) => {
        connection.query(
          mysql.format(
            "SELECT * FROM intrebari WHERE id = ?" ,
            [req.params.question_id]           
          ),
    
          (err, result) => {
            if (!err) {
              if (result) {
                res.status(200).send(result);
              } else {
                res.status(404).send("Not found");
              }
            } else {
              res.status(500).send("Server error" + err);
            }
          }
        );
      }, 
    getById: async (req, res) => {
        connection.query(
          mysql.format(
            "SELECT * FROM materii WHERE id = ?" ,
            [req.params.subject_id]           
          ),
    
          (err, result) => {
            if (!err) {
              if (result) {
                res.status(200).send(result);
              } else {
                res.status(404).send("Not found");
              }
            } else {
              res.status(500).send("Server error" + err);
            }
          }
        );
      },
     
};

module.exports = controller;
