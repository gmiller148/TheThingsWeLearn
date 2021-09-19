const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./passportLocal");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((error, req, res, next) => {
  // Come back to this someday? https://zellwk.com/blog/express-errors/
  console.log(error.message);
  console.log(error.stack);
  res.sendStatus(500);
});

app.get("/test", (req, res) => res.json({ hello: "feasdf" }));
app.use("/api", require("./routes"));
app.use(express.static("client/build"));

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.resolve("client", "build", "index.html"));
});
module.exports = app;
