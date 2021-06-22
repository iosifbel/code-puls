const connection = require("../config/db");
const mysql = require("mysql2");

const controller = {
    getById: async (req, res) => {
        connection.query(
          mysql.format(
            "SELECT * FROM teste WHERE id = ?" ,
            [req.params.test_id]           
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
    getTestSubmissions: async (req, res) => {
        connection.query(
          mysql.format(
            "SELECT t.titlu, t.id_materie, s.nume, s.prenume, s.grupa, n.incercare, n.evaluareAutomata, n.intarziat FROM studenti s JOIN note n ON n.id_student = s.id JOIN teste t ON n.id_test = t.id WHERE t.id = ? AND n.incercare IS NOT NULL" ,
            [req.params.test_id]           
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

    getTestsByCourse: async (req, res) => {
        connection.query(
          mysql.format(
            "SELECT t.* FROM teste t INNER JOIN materii m ON m.id = t.id_materie WHERE m.id = ?" ,
            [req.params.course_id]           
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
    addTest: async (req, res) => {
        connection.query(
          mysql.format(
            "INSERT INTO `teste` (`id`, `titlu`, `deadline`, `id_materie`) VALUES (NULL, ?, ?, ?);" ,
            [
                req.body.titlu, 
                req.body.deadline,
                req.body.id_materie
            ]           
          ),
    
          (err, result) => {
            if (!err) {              
                res.status(200).send("Assignment created");              
            
            } else {
              res.status(500).send("Server error" + err);
            }
          }
        );
      },
    updateTest: async (req, res) => {
        connection.query(
          mysql.format(
            "UPDATE `teste` SET titlu = ?, deadline = ?, id_materie = ? WHERE id = ?" ,
            [
                req.body.titlu, 
                req.body.deadline,
                req.body.id_materie,
                req.params.test_id
            ]           
          ),
    
          (err, result) => {
            if (!err) {              
                res.status(200).send("Assignment updated");              
            
            } else {
              res.status(500).send("Server error" + err);
            }
          }
        );
      },
    unassignTest: async (req, res) => {
        connection.query(
          mysql.format(
            "DELETE note FROM note INNER JOIN teste ON teste.id = note.id_test WHERE teste.id = ?" ,
            [               
                req.params.test_id
            ]           
          ),
    
          (err, result) => {
            if (!err) {              
                res.status(200).send("Assignment updated");           
            } else {
              res.status(500).send("Server error" + err);
            }
          }
        );
      },
    deleteTest: async (req, res) => {
        connection.query(
          mysql.format(
            "DELETE FROM teste WHERE teste.id = ?" ,
            [               
                req.params.test_id
            ]           
          ),
    
          (err, result) => {
            if (!err) {              
                res.status(200).send("Assignment updated");           
            } else {
              res.status(500).send("Server error" + err);
            }
          }
        );
      },
     

};

module.exports = controller;
