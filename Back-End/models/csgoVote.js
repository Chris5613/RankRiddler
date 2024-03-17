const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const csgoVideoSchema = new Schema({
  valFormId: {
    type: String,
    unique: true, 
    required: [true, "valFormId is required"]
  },
  votes: {
    Silver: { type: Number, default: 0 },
    SE: { type: Number, default: 0 },
    Nova: { type: Number, default: 0 },
    MG: { type: Number, default: 0 },
    MGE: { type: Number, default: 0 },
    DMG: { type: Number, default: 0 },
    LE: { type: Number, default: 0 },
    Supreme: { type: Number, default: 0 },
    Global: { type: Number, default: 0 },
  }
});

const csgoVote = mongoose.model("csgoVote", csgoVideoSchema);

module.exports = csgoVote;