const { v4: uuidv4 } = require("uuid");

exports.assignid = (req, res, next) => {
  req.id = uuidv4();
  next();
};
