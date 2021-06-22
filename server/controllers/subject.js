const connection = require("../config/db");
const mysql = require("mysql2");

const controller = {
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
    getTests: async (req, res) => {
        connection.query(
          mysql.format(
            "SELECT t.* FROM teste t INNER JOIN materii m ON m.id = t.id_materie WHERE m.id = ?" ,
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
    getStudents: async (req, res) => {
        connection.query(
          mysql.format(
            "SELECT s.* FROM studenti s INNER JOIN inrolare_materie im ON im.id_student = s.id WHERE im.id_materie = ?" ,
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
    getGroups: async (req, res) => {
      connection.query(
        mysql.format(
          "SELECT DISTINCT s.grupa FROM studenti s INNER JOIN inrolare_materie im ON im.id_student = s.id WHERE im.id_materie = ?" ,
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
