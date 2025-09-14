require("dotenv").config();
const jwt = require("jsonwebtoken");

// console.log("TOKEN_KEY:", process.env.TOKEN_KEY); // Debug log

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};