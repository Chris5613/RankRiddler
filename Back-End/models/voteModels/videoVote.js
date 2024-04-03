const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const valVideoSchema = new Schema({
  valFormId: {
    type: String,
    unique: true,
    required: [true, "valFormId is required"],
  },
  votes: {
    type: Map,
    of: Number,
    default: {},
  },
});

const videoVote = mongoose.model("VideoVote", valVideoSchema);

module.exports = videoVote;
