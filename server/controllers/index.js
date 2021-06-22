const student = require("./student");
const teacher = require("./teacher");
const subject = require("./subject");
const assignment = require("./assignment");
const question = require("./question");
const grade = require("./grade");

const controllers = {
  student,
  teacher,
  subject,
  assignment,
  question,
  grade,
};

module.exports = controllers;
