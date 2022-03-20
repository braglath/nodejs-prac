const jwt = require("jsonwebtoken");

function generateToken(name) {
  return jwt.sign({ data: name }, process.env.SECRET_KEY, { expiresIn: "5m" });
}

function authenticateToken(req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token === null) return res.sendStatus(401);
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log("user authenticate token", user);
    req.user = user;
    res.send(user);
    next();
  });
}

module.exports = { generateToken, authenticateToken };
