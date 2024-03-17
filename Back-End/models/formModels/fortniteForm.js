const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fortniteSchema = new Schema({
  youtubeLink: { type: String, required: true },
  playerInfo: { type: String, required: true },
  rank: { type: String, required: true },
});

const Form = mongoose.model("fortniteForm", fortniteSchema);

module.exports = Form;
