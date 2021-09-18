const express = require("express");
const router = express.Router();
const ash = require("express-async-handler");
const crypto = require("crypto");
const User = require("./models/user");
const passport = require("passport");

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated() && req.user) {
    next();
  } else {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};

router.post(
  "/register",
  ash(async (req, res, next) => {
    const { name, email, password, birthYear } = req.body;
    const user = await User.findOne({
      email: { $regex: new RegExp("^" + email + "$", "i") },
    }).lean();
    if (user) {
      return res.status(409).json({ message: "email already in use" });
    } else {
      const salt = crypto.randomBytes(32).toString("hex");
      const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
      const newUser = new User({
        email: email,
        name: name,
        birthYear: birthYear,
        deathYear: null,
        salt: salt,
        hash: hash,
        learned: "",
        reference: "",
        referenceArtist: "",
        isAdmin: false,
      });
      await newUser.save();

      // Login user after they signup
      return passport.authenticate("local")(req, res, () => {
        return res.sendStatus(200);
      });
    }
  })
);
router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.redirect("/");
});

router.get(
  "/myinfo",
  checkAuth,
  ash(async (req, res) => {
    const { user } = req;
    return res.json({
      name: user.name,
      email: user.email,
      learned: user.learned,
      reference: "",
      referenceArtist: "",
      birthYear: user.birthYear,
      deathYear: user.deathYear,
    });
  })
);

router.get("/loggedIn", checkAuth, (req, res) => {
  return res.sendStatus(200);
});

router.patch(
  "/statement",
  checkAuth,
  ash(async (req, res, next) => {
    const { statement } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);
    user.learned = statement;
    await user.save();
    return res.sendStatus(200);
  })
);

module.exports = router;
