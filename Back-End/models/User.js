const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("User", userSchema);
