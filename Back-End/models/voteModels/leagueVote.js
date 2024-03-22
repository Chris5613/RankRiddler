const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leagueVideoSchema = new Schema({
  valFormId: {
    type: String,
    unique: true, 
    required: [true, "valFormId is required"]
  },
  votes: {
    Iron: { type: Number, default: 0 },
    Bronze: { type: Number, default: 0 },
    Silver: { type: Number, default: 0 },
    Gold: { type: Number, default: 0 },
    Platinum: { type: Number, default: 0 },
    Diamond: { type: Number, default: 0 },
    Master: { type: Number, default: 0 },
    Grandmaster: { type: Number, default: 0 },
    Challenger: { type: Number, default: 0 },
  }
});

const leagueVote = mongoose.model("leagueVote", leagueVideoSchema);

module.exports = leagueVote;