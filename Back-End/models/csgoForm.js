const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const csgoSchema = new Schema({
  youtubeLink: { type: String, required: true },
  username: { type: String, required: true },
  playerInfo: { type: String, required: true },
  rank: { type: String, required: true },
});

const Form = mongoose.model("csgoForm", csgoSchema);

module.exports = Form;
