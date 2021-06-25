const connection = require("../config/db");
const mysql = require("mysql2");
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config()

const judgeURL = "https://ce.judge0.com"
const  judgeHeaders = {  
    "Content-Type": "application/json",
    "x-rapidapi-key": "b23ccecf44msh3b556d90d58183bp18a3adjsnc26edf4c9876",
    "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    useQueryString: true, 
}
const judgeURLDefaultParams = "?base64_encoded=false&wait=true"

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
    assessQuestion: async (req, res) => {        
        let assignment = req.body;
        let questionId = req.params.question_id;
      function getJudegeSubmissionByToken(token) {
          return axios({
            method: 'get',
            headers: judgeHeaders,
            url: judgeURL + "/submissions/" + token,            
          })
          .then(function (response) {
            return response.data
          })
          .catch(function (error) {
            console.log(error.response)
          });
        }
            
        function getAssessmentFromJudge(assignment) {
            return axios({
              method: 'post',
              headers: judgeHeaders,
              url: judgeURL + "/submissions/" + judgeURLDefaultParams,
              data: JSON.stringify(assignment)
            })
            .then(function (response) {              
              
              return getJudegeSubmissionByToken(response.data.token)             
            })
            .catch(function (error) {
              console.log(error.response)
            });
          }
          
          function getExpectedOutput() {
            let route = `http://localhost:5000/api/questions/${questionId}}`
            return axios.get(route).then((response) => {
              console.log(response.data[0]);
              const raspunsuri = response.data[0].raspunsuri;
              assignment.expected_output = raspunsuri;
              console.log(assignment)
              return getAssessmentFromJudge(assignment)

            });
          }
          
          Promise.all([getExpectedOutput()])
            .then(function (results) {
              const judgeResponse = results[0];
              res.status(200).send(judgeResponse)
            });     
           
      } , 
     
};

module.exports = controller;
