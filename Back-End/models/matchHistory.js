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
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("match", matchHistory);
