const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
  youtubeLink: { type: String, required: true },
  playerInfo: { type: String, required: true },
  rank: { type: String, required: true },
});

const leagueForm = mongoose.model("leagueForm", leagueSchema);

module.exports = leagueForm;
