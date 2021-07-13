const connection = require("../config/db");
const { promisify } = require("util");
const setTimeoutAsync = promisify(setTimeout);
const mysql = require("mysql2");
const axios = require("axios");
const { encode, decode } = require("../utils/Base64");
const rootURL = "http://localhost:5000/api/";
const judgeURL = "https://ce.judge0.com/submissions/";
const judgeHeaders = {
  "Content-Type": "application/json",
  "x-rapidapi-key": process.env.x_rapidapi_key,
  "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
  useQueryString: true,
};
const judgeURLDefaultParams = "base64_encoded=true&wait=true";

const controller = {
  getById: async (req, res) => {
    connection.query(
      mysql.format("SELECT * FROM teste WHERE id = ?", [req.params.test_id]),

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
        "SELECT t.titlu, t.id_materie, s.nume, s.prenume, s.grupa, n.incercare, n.evaluareAutomata, n.intarziat FROM studenti s JOIN note n ON n.id_student = s.id JOIN teste t ON n.id_test = t.id WHERE t.id = ? AND n.incercare IS NOT NULL",
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
  addTest: async (req, res) => {
    connection.query(
      mysql.format(
        "INSERT INTO `teste` (`id`, `titlu`, `deadline`, `id_materie`, `id_limbaj_programare`) VALUES (NULL, ?, ?, ?, ?);",
        [
          req.body.title,
          req.body.deadline,
          req.body.subjectId,
          req.body.languageId,
        ]
      ),

      (err, result) => {
        if (!err) {
          connection.query(
            mysql.format("SELECT LAST_INSERT_ID();"),
            (err, result) => {
              if (!err) {
                const id_test = result[0]["LAST_INSERT_ID()"];

                const questions = req.body.questions;

                for (let i = 0; i < questions.length; i++) {
                  connection.query(
                    mysql.format(
                      "INSERT INTO `intrebari` (`id`, `descriere`, `raspunsuri`) VALUES (NULL, ?, ?);",
                      [questions[i].questionBody, questions[i].expectedAnswer]
                    ),
                    (err, result) => {
                      if (!err) {
                        connection.query(
                          mysql.format("SELECT LAST_INSERT_ID()"),
                          (err, result) => {
                            if (!err) {
                              const id_question = result[0]["LAST_INSERT_ID()"];
                              connection.query(
                                mysql.format(
                                  "INSERT INTO `teste_intrebari` (id_test, id_intrebare) VALUES (?, ?);",
                                  [id_test, id_question]
                                ),
                                (err, result) => {
                                  if (!err) {
                                  } else {
                                    res.status(500).send("Server error" + err);
                                  }
                                }
                              );
                            } else {
                              res.status(500).send("Server error" + err);
                            }
                          }
                        );
                      } else {
                        res.status(500).send("Server error" + err);
                      }
                    }
                  );
                }

                connection.query(
                  mysql.format(
                    "INSERT INTO note (id_student, id_test) SELECT s.ID, t.ID FROM studenti s, teste t WHERE t.id=? AND s.grupa=?",
                    [id_test, req.body.group]
                  ),
                  (err, result) => {
                    if (!err) {
                      res.status(200).send("Assignment was created");
                    } else {
                      res.status(500).send("Server error" + err);
                    }
                  }
                );
              } else {
                res.status(500).send("Server error" + err);
              }
            }
          );
        } else {
          res.status(500).send("Server error" + err);
        }
      }
    );
  },
  addTest2: async (req, res) => {
    const { title, deadline, subjectId, languageId, questions, group } =
      req.body;
    console.log(deadline);
    try {
      const insertTestsQuery =
        "INSERT INTO `teste` (`id`, `titlu`, `deadline`, `id_materie`, `id_limbaj_programare`) VALUES (NULL, ?, ?, ?, ?);";
      let [rows] = await connection
        .promise()
        .query(insertTestsQuery, [title, deadline, subjectId, languageId]);
      const testId = rows.insertId;
      console.log(rows);

      for (let i = 0; i < questions.length; i++) {
        const { questionBody, expectedAnswer } = questions[i];
        const insertQuestionsQuery =
          "INSERT INTO `intrebari` (`id`, `descriere`, `raspunsuri`) VALUES (NULL, ?, ?)";
        [rows] = await connection
          .promise()
          .query(insertQuestionsQuery, [questionBody, expectedAnswer]);
        const questionId = rows.insertId;

        const insertTestQuestionQuery =
          "INSERT INTO `teste_intrebari` (id_test, id_intrebare) VALUES (?, ?);";
        [rows] = await connection
          .promise()
          .query(insertTestQuestionQuery, [testId, questionId]);
      }

      const insertTestToStudentQuery =
        "INSERT INTO note (id_student, id_test) SELECT s.ID, t.ID FROM studenti s, teste t WHERE t.id=? AND s.grupa=?";
      [rows] = await connection
        .promise()
        .query(insertTestToStudentQuery, [testId, group]);

      res.status(200).json({ message: "Testul a fost adaugat cu succes" });
    } catch (error) {
      res.status(500).json({ message: "Eroare la server" });
      console.log(error.message);
    }
  },
  updateTest: async (req, res) => {
    connection.query(
      mysql.format(
        "UPDATE `teste` SET titlu = ?, deadline = ?, id_materie = ? WHERE id = ?",
        [
          req.body.titlu,
          req.body.deadline,
          req.body.id_materie,
          req.params.test_id,
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
  assignTestToGroup: async (req, res) => {
    connection.query(
      mysql.format(
        "INSERT INTO note (id_student, id_test) SELECT s.ID, t.ID FROM studenti s, teste t WHERE t.id=? AND s.grupa=?",
        [req.params.test_id, req.params.group_id]
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
        "DELETE note FROM note INNER JOIN teste ON teste.id = note.id_test WHERE teste.id = ?",
        [req.params.test_id]
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
      mysql.format("DELETE FROM teste WHERE teste.id = ?", [
        req.params.test_id,
      ]),

      (err, result) => {
        if (!err) {
          res.status(200).send("Assignment updated");
        } else {
          res.status(500).send("Server error" + err);
        }
      }
    );
  },
  getQuestionsByTest: async (req, res) => {
    connection.query(
      mysql.format(
        "SELECT t.titlu, i.id, i.descriere FROM intrebari i JOIN teste_intrebari ti ON ti.id_intrebare = i.id JOIN teste t ON t.id = ti.id_test WHERE t.id = ?",
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
  getQuestionsByTestWithAnswers: async (req, res) => {
    connection.query(
      mysql.format(
        "SELECT t.titlu, i.* FROM intrebari i JOIN teste_intrebari ti ON ti.id_intrebare = i.id JOIN teste t ON t.id = ti.id_test WHERE t.id = ?",
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
  sendTest: async (req, res) => {
    try {
      const { test_id, student_id } = req.params;
      const test = req.body;
      const questions = test.questions;
      const getExpectedAnswers = await axios.get(
        `${rootURL}assignments/${test_id}/questions/privileged`
      );
      // console.log(test_id);
      if (getExpectedAnswers) {
        const answers = getExpectedAnswers.data;
        // console.log(answers);
        answers.forEach((item, index) => {
          questions[index].language_id = test.language_id;
          questions[index].stdin = test.stdin;
          questions[index].expected_output = encode(item.raspunsuri);
        });
      }
      // console.log(questions);
      const postURL = judgeURL + "batch?" + judgeURLDefaultParams;
      console.log(postURL);
      const postSubmissions = await axios({
        method: "post",
        headers: judgeHeaders,
        url: postURL,
        data: JSON.stringify({ submissions: questions }),
      });

      const tokens = [];
      if (postSubmissions) {
        postSubmissions.data.forEach((item) => {
          tokens.push(item.token);
        });
      }
      console.log(tokens);
      const stringifiedTokens = tokens.toString();

      const getURL =
        judgeURL +
        "batch?tokens=" +
        stringifiedTokens +
        "&" +
        judgeURLDefaultParams;
      console.log(getURL);

      async function getJudgeResponses() {
        return axios({
          method: "get",
          headers: judgeHeaders,
          url: getURL,
        }).then((response) => {
          if (response.data) {
            if (response.data.submissions[0].status.id == 1) {
              console.log("set timeout for another 200ms");
              setTimeout(getJudgeResponses, 200);
            } else {
              console.log(response.data);
              //save to DB;
            }
          }
        });
      }

      setTimeout(getJudgeResponses, 900);

      // const getJudgeResponses = await
      //   axios({
      //     method: "get",
      //     headers: judgeHeaders,
      //     url: getURL,
      //   })
      // ;

      if (getJudgeResponses) {
        // const results = getJudgeResponses.data.submissions;

        res.status(200).json({ message: "Test trimis cu succes!" });
      } else {
        res.status(400).json({ message: "Testul nu a putut fi trimis!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Eroare la server" });
      console.log(error.message);
    }
  },
};

module.exports = controller;
