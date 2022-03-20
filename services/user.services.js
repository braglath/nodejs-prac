const User = require("../models/user.model");

async function register(queries, callback) {
  const { name, email, phonenumber, password } = queries;
  //! do validation for the above and return it in callback error section
  const user = new User(queries);
  user
    .save()
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null));
}

module.exports = { register };
