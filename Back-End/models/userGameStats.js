const mongoose = require('mongoose');

const { Schema } = mongoose;

const userGameStatsSchema = new Schema({
  game: {
    type: String,
    required: true,
    enum: ['valorant', 'csgo', 'overwatch', 'league'], 
  },
  username: {
    type: String,
    required: true,
  },
  roundsPlayed: {
    type: Number,
    required: true,
    default: 0,
  },
  correctGuesses: {
    type: Number,
    required: true,
    default: 0,
  },
});

const UserGameStats = mongoose.model('UserGameStats', userGameStatsSchema);

module.exports = UserGameStats;
