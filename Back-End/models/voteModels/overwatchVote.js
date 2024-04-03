const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const overwatchSchema = new Schema({
  valFormId: {
    type: String,
    unique: true,
    required: [true, "valFormId is required"],
  },
  votes: {
    Bronze: { type: Number, default: 0 },
    Silver: { type: Number, default: 0 },
    Gold: { type: Number, default: 0 },
    Platinum: { type: Number, default: 0 },
    Diamond: { type: Number, default: 0 },
    Master: { type: Number, default: 0 },
    Grandmaster: { type: Number, default: 0 },
    Top500: { type: Number, default: 0 },
  },
});

const overwatchVote = mongoose.model("overwatchVote", overwatchSchema);

module.exports = overwatchVote;
