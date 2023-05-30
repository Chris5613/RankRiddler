const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const apexSchema = new Schema({
    youtubeLink: { type: String, required: true },
    playerInfo: { type: String, required: true },
    rank: { type: String, required: true },
});

const Form = mongoose.model("apexForm", apexSchema);

module.exports = Form;
