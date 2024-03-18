const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoSchema = new Schema({
  valFormId: {
    type: String,
    unique: true, 
    required: [true, "valFormId is required"], 
  },
  votes: {
    Iron: { type: Number, default: 0 },
    Bronze: { type: Number, default: 0 },
    Silver: { type: Number, default: 0 },
    Gold: { type: Number, default: 0 },
    Platinum: { type: Number, default: 0 },
    Diamond: { type: Number, default: 0 },
    Ascendant: { type: Number, default: 0 },
    Immortal: { type: Number, default: 0 },
    Radiant: { type: Number, default: 0 },
  }
});

const videoVote = mongoose.model("VideoVote", videoSchema);

module.exports = videoVote;