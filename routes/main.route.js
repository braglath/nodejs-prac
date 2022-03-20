const express = require("express");
const router = express.Router();

const mainRoute = require("../controllers/main.controller");

router.get("/", mainRoute.redirect);

module.exports = router;
