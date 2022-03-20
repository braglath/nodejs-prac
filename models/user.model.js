const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  token: {
    type: String,
    required: false,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.set("toJSON", {
  transform: (document, data) => {
    delete data._v;
    delete data.password;
    delete data._id;
  },
});

userSchema.plugin(uniqueValidator, "message: email is required");

const User = mongoose.model("userDetails", userSchema);

module.exports = User;
