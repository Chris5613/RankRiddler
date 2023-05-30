const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rocketSchema = new Schema({
    youtubeLink: { type: String, required: true },
    playerInfo: { type: String, required: true },
    rank: { type: String, required: true },
});

const Form = mongoose.model("rocketForm", rocketSchema);

module.exports = Form;
