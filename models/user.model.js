const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
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
    data.id = data.__id;
    delete data._v;
    // delete data.password;
    // delete data.__id;
  },
});

userSchema.plugin(uniqueValidator, "message: email is required");

const User = mongoose.model("userDetails", userSchema);

module.exports = User;
