const express = require("express");
const req = require("express/lib/request");
const router = express.Router();

const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.render("loginorregister");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login/details", userController.login);

router.get("/register/details", userController.register);

router.get("/checktoken", auth.authenticateToken);

module.exports = router;
