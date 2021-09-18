const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const crypto = require("crypto");

const verifyCallback = (username, password, done) => {
  User.findOne({ email: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      const isValid =
        user.hash ===
        crypto
          .pbkdf2Sync(password, user.salt, 10000, 64, "sha512")
          .toString("hex");
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  verifyCallback
);

passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
