const connection = require("../config/db");
const mysql = require("mysql2");
const { verifyPassword, hashPassword, createToken } = require("../utils/Hash");
const jwtDecode = require("jwt-decode");

const controller = {
  login: async (req, res) => {
    try {
      const { email, password, type } = req.body;
      if (!type) {
        res
          .status(403)
          .json({ message: "Nu se poate identifica tipul contului" });
      }
      const table = type === "student" ? "studenti" : "profesori";
      const user = await checkifEmailExists(table, email);

      if (!user) {
        return res.status(403).json({
          message: "Parolă sau adresa de email este greșită",
        });
      }

      // const saltedPasssword = await hashPassword(password);
      // console.log(user.parola);
      // console.log(saltedPasssword);
      // console.log(password);
      const passwordValid = await verifyPassword(password, user.parola);

      if (passwordValid) {
        const { parola, ...rest } = user;
        const userInfo = Object.assign({}, { ...rest });

        const token = createToken(userInfo);

        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;

        res.json({
          message: "Utilizator autentificat cu succes",
          userInfo,
          token,
          expiresAt,
        });
      } else {
        res.status(403).json({
          message: "Parolă sau adresa de email este greșită",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  register: async (req, res) => {
    try {
      const { email, firstName, lastName, type } = req.body;

      const hashedPassword = await hashPassword(req.body.password);
      const table = type === "student" ? "studenti" : "profesori";

      const userData = {
        email: email.toLowerCase(),
        firstName,
        lastName,
        password: hashedPassword,
        year: getRandomInt(1, 4),
        group: getRandomInt(1050, 1054),
      };

      const user = await checkifEmailExists(table, userData.email);
      if (user) {
        return res
          .status(400)
          .json({ message: "Adresa de email este deja inregistrată" });
      }

      const savedUser = await saveUserToDb(table, userData);

      if (savedUser) {
        const token = createToken(savedUser);
        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;

        const userInfo = savedUser;

        return res
          .status(200)
          .json({ message: "Utilizator creat", token, expiresAt, userInfo });
      }
    } catch (error) {
      console.log("server error: " + error);
      return res.status(500).json({ message: "Eroare de server" });
    }
  },
};

async function saveUserToDb(table, user) {
  // console.log(user);
  let query = "";
  let queryParams = [user.lastName, user.firstName, user.email, user.password];
  if (table === "studenti") {
    query = `INSERT INTO ${table} (nume, prenume, email, parola, grupa, an) VALUES (?,?,?,?,?,?)`;
    queryParams.push(user.group);
    queryParams.push(user.year);
  } else {
    query = `INSERT INTO ${table} (nume, prenume, email, parola) VALUES (?,?,?,?)`;
  }
  // console.log(query);
  const [rows] = await connection.promise().query(query, queryParams);
  // console.log(rows.insertId);

  const savedUser = {
    id: rows.insertId,
    nume: user.lastName,
    prenume: user.firstName,
    parola: user.password,
  };

  if (table === "studenti") {
    savedUser.grupa = user.group;
    savedUser.an = user.year;
  }
  return savedUser;
}

async function checkifEmailExists(table, email) {
  const query = `SELECT * FROM ${table} WHERE email=?`;
  const promise = connection.promise();
  const [rows] = await promise.query(mysql.format(query, [email]));
  const user = rows[0];
  return user;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

module.exports = controller;
