const jwt = require("jsonwebtoken");

function generateToken(name) {
  return jwt.sign({ data: name }, process.env.SECRET_KEY, { expiresIn: "5m" });
}

module.exports = { generateToken };
