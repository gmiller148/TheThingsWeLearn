const express = require("express");
const router = express.Router();
const ash = require("express-async-handler");
const crypto = require("crypto");
const User = require("./models/user");
const Image = require("./models/image");
const passport = require("passport");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

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
        hasArt: false,
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

router.post(
  "/create-bio",
  ash(async (req, res) => {
    console.log(req);
    const { name, birthYear, deathYear, learned } = req.body;
    const user = new User({
      name: name,
      birthYear: birthYear,
      deathYear: deathYear,
      learned: learned,
      alive: false,
      hasArt: false,
    });
    await user.save();
    return res.sendStatus(201);
  })
);

router.get(
  "/bios",
  ash(async (req, res) => {
    const bios = await User.find({ alive: false }).lean();
    console.log(bios);
    // https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
    for (let i = bios.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = bios[i];
      bios[i] = bios[j];
      bios[j] = temp;
    }
    return res.json({ bios });
  })
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200);
});

router.get("/logout", (req, res) => {
  req.logout();
  return res.json({ status: "success" });
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
      hasArt: user.hasArt,
      birthYear: user.birthYear,
      deathYear: user.deathYear,
      _id: user._id,
    });
  })
);

router.get(
  "/person/:personId",
  ash(async (req, res) => {
    const { personId } = req.params;
    const person = await User.findById(personId);
    return res.json({
      name: person.name,
      learned: person.learned,
      hasArt: person.hasArt,
      birthYear: person.birthYear,
      deathYear: person.deathYear,
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

router.get(
  "/image/:userId",
  ash(async (req, res) => {
    const { userId } = req.params;
    const image = await Image.findOne({ userId }).lean();
    return image ? res.send(image) : res.sendStatus(404);
  })
);

router.post(
  "/image",
  upload.single("image"),
  checkAuth,
  ash(async (req, res) => {
    const { _id: userId } = req.user;
    const { artist } = req.body;
    await Image.deleteMany({ userId: userId });
    const image = new Image({
      userId: userId,
      artist: artist,
      imageData: {
        data: fs.readFileSync(
          path.join(__dirname + "/uploads/" + req.file.filename)
        ),
        contentType: "image/png",
      },
    });
    await image.save();
    return res.sendStatus(201);
  })
);

module.exports = router;
