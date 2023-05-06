const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    youtubeLink: { type: String, required: true },
    username: { type: String, required: true },
    playerInfo: { type: String, required: true },
    rank: { type: String, required: true },
    trackerLink: { type: String, required: true }
}, {
});

const User = mongoose.model('User', userSchema);

module.exports = Youtube;
