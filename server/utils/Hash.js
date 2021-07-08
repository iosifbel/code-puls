const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    {
      sub: user._id,
      email: user.email,
      iss: "api.codpuls",
      aud: "api.codpuls",
    },
    process.env.JWT_SECRET,
    { algorithm: "HS256", expiresIn: "1h" }
  );
};

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    //salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
}

function verifyPassword(passwordAttempt, hashedPassword) {
  return bcrypt.compare(passwordAttempt, hashedPassword);
}

module.exports = {
  createToken,
  hashPassword,
  verifyPassword,
};
