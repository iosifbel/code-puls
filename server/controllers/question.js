const connection = require("../config/db");
const mysql = require("mysql2");
const axios = require("axios");
const dotenv = require("dotenv");
const { encode, decode } = require("../utils/Base64");

dotenv.config();
const rootURL = "http://localhost:5000/api/";
const judgeURL = "https://ce.judge0.com/submissions/";
const judgeHeaders = {
  "Content-Type": "application/json",
  "x-rapidapi-key": process.env.x_rapidapi_key,
  "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
  useQueryString: true,
};
const judgeURLDefaultParams = "?base64_encoded=true&wait=true";

const controller = {
  getById: async (req, res) => {
    connection.query(
      mysql.format("SELECT * FROM intrebari WHERE id = ?", [
        req.params.question_id,
      ]),

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
    console.log(req.body);
    let assignment = req.body;

    let questionId = req.params.question_id;
    let studentId = req.params.student_id;
    let testId = req.params.test_id;

    function getJudegeSubmissionByToken(token) {
      return axios({
        method: "get",
        headers: judgeHeaders,
        url: judgeURL + token + judgeURLDefaultParams,
      })
        .then(function (response) {
          console.log(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }
    function getAssessmentFromJudge(assignment) {
      return axios({
        method: "post",
        headers: judgeHeaders,
        url: judgeURL + judgeURLDefaultParams,
        data: JSON.stringify(assignment),
      })
        .then(function (response) {
          return getJudegeSubmissionByToken(response.data.token);
        })
        .catch(function (error) {
          console.log({
            status: error.response.status,
            ErrorText: error.response.statusText,
            Data: error.response.data,
          });
        });
    }
    function getExpectedOutput() {
      let route = `${rootURL}questions/${questionId}}`;
      return axios
        .get(route)
        .then((response) => {
          const raspunsuri = response.data[0].raspunsuri;
          assignment.expected_output = encode(raspunsuri);
          console.log("expected answer: " + raspunsuri);
          return getAssessmentFromJudge(assignment);
        })
        .catch((err) => console.log(err));
    }
    function saveToDb(assessment) {
      return axios
        .put(`${rootURL}students/${studentId}/uploadAssessed/${testId}`, {
          incercare: JSON.stringify(decode(assignment.source_code)),
          evaluareAutomata: JSON.stringify(assessment),
        })
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    }

    Promise.all([getExpectedOutput()]).then(function (results) {
      const judgeResponse = results[0];
      res.status(200).send(judgeResponse);
      saveToDb(judgeResponse);
    });
  },
  assessQuestion2: async (req, res) => {
    try {
      // console.log(req.params);
      const { question_id, student_id, test_id } = req.params;
      const question = req.body;

      const getExpectedAnswer = await axios.get(
        `${rootURL}questions/${question_id}}`
      );
      const expectedAnswer = getExpectedAnswer.data[0].raspunsuri;

      question.expected_output = encode(expectedAnswer);
      // console.log(question);

      const postSubmission = await axios({
        method: "post",
        headers: judgeHeaders,
        url: judgeURL + judgeURLDefaultParams,
        data: JSON.stringify(question),
      });
      const token = postSubmission.data.token;

      const getJudgeResponse = await axios({
        method: "get",
        headers: judgeHeaders,
        url: judgeURL + token + judgeURLDefaultParams,
      });
      const judgeResponse = getJudgeResponse.data;

      res.status(200).send(judgeResponse);
    } catch (error) {
      res.status(500).json({ message: "Eroare la server" });
      console.log(error);
    }
  },
};

module.exports = controller;
