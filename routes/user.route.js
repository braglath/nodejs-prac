const express = require("express");
const req = require("express/lib/request");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/", (req, res) => {
  res.render("loginorregister");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login/details", (req, res) => {
  const { username, password } = req.query;
  res.json({
    name: username,
    password: password,
  });
});

router.get("/register/details", userController.register);

module.exports = router;
