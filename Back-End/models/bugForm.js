const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bugSchema = new Schema({
  email: { type: String, required: true },
  description: { type: String, required: true },
});

const bugForm = mongoose.model("bug", bugSchema);

module.exports = bugForm;
