const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  youtubeLink: { type: String, required: true },
  playerInfo: { type: String, required: true },
  reportedBy: { type: String, required: true },
  reportedAt: { type: Date, default: Date.now() },
});

const reportForm = mongoose.model("report", reportSchema);

module.exports = reportForm;
