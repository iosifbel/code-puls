const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const dbServices = require("./config/dbService");
const router = require("./routes");
const db = require("./models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => console.log("merge aplicatia"));
});
