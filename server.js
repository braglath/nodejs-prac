const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");

const mainRoute = require("./routes/main.route");
const userRoute = require("./routes/user.route");
const generateid = require("./middlewares/generateid");
const mongoDBConfig = require("./config/mongodb.config");

const port = process.env.PORT || 5000;

morgan.token("uuid", function getid(req) {
  return req.id;
});

app.use(generateid.assignid);

let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(
  morgan(":uuid :method :url :status :response-time ms", {
    stream: accessLogStream,
  })
);

app.set("view engine", "ejs");
app.use(express.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoDBConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => console.log("database connected"),
    (error) => console.log("error connected to database", error)
  );

app.use("/", mainRoute);
app.use("/api/user", userRoute);

app.listen(port, () =>
  console.log(`server listening on http://localhost:${port}`)
);
