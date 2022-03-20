const bcryptjs = require("bcryptjs");

const services = require("../services/user.services");

exports.register = (req, res, next) => {
  const { password } = req.query;
  //! validate password here and send the message to next for global error handler
  if (password.length < 4)
    return next({ message: "Password cannot be less than 4 characters" });
  const salt = bcryptjs.genSaltSync(10);
  req.query.password = bcryptjs.hashSync(password, salt);
  //! now add user in mongodb
  services.register(req.query, (error, result) => {
    if (error) return next(error);
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.login = (req, res, next) => {
  const { name, password } = req.query;
  //! validate both above values and pass it to next as error for global error handling
  services.login({ name, password }, (error, result) => {
    if (error) return next(error);
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};
