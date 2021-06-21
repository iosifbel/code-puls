const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const connection = require("./config/db");
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

// connection.query(
//   mysql.format("SELECT * FROM `studenti` WHERE id = ?", [1]),
//   function (err, results) {
//     if (err) console.log(err);
//     console.log(results);
//   }
// );
// console.log("test");

app.listen(process.env.PORT, () => {
  console.log("App is listening on port " + process.env.PORT + "...");
});
