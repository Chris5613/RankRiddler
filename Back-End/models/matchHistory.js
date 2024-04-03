const mongoose = require("mongoose");

const matchHistory = new mongoose.Schema({
  player1: {
    type: String,
    unique: true,
  },
  player2: {
    type: Number,
    unique: true
  },
  winner: {
    type: Number,
    unique: true
  },
});

module.exports = mongoose.model("match", matchHistory);
