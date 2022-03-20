const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const auth = require("../middlewares/auth");

async function register(queries, callback) {
  const { name, email, phonenumber, password } = queries;
  //! do validation for the above and return it in callback error section
  const user = new User(queries);
  user
    .save()
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null));
}

async function login({ name, password }, callback) {
  console.log(name, password);
  const user = await User.findOne({ name });
  console.log("user password - ", user.password);
  if (user === null)
    return callback({ message: "invalid username/password" }, null);
  if (password == null || password.length <= 0)
    return callback({ message: "Invalid password" }, null);
  if (!bcryptjs.compareSync(password, user.password))
    return callback({ message: "Invalid username/password" }, null);
  const token = auth.generateToken(name);
  user.token = token;
  console.log("user token login", user.token);
  return callback(null, { ...user.toJSON(), token });
}

module.exports = { register, login };
