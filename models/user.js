const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: String,
    name: String,
    birthYear: Number,
    deathYear: Number,
    salt: String,
    hash: String,
    learned: String,
    hasArt: Boolean,
    isAdmin: Boolean,
    alive: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema); // creates/loads collection called users
