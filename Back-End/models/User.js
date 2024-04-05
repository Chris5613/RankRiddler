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
  totalRounds: {
    type: Number,
    default: 0,
  },
  totalCorrect: {
    type: Number,
    default: 0,
  },
  Wins: {
    type: Number,
    default: 0,
  },
  Losses: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
