const mongoose = require("mongoose");

const matchHistory = new mongoose.Schema({
  player1: {
    type: String,
  },
  player2: {
    type: String,
  },
  winner: {
    type: String,
  },
  game: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("match", matchHistory);
