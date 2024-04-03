const UserGameStats = require("../models/userGameStats");

exports.addGameRound = async (req, res) => {
  const { game, username, correctGuess } = req.body;
  try {
    let stats = await UserGameStats.findOne({ game, username });

    if (stats) {
      stats.roundsPlayed += 1;
      if (correctGuess) {
        stats.correctGuesses += 1;
      }
    } else {
      stats = new UserGameStats({
        game,
        username,
        roundsPlayed: 1,
        correctGuesses: correctGuess ? 1 : 0,
      });
    }

    await stats.save();

    res.status(201).json({
      message: "User game stats updated successfully",
      stats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getUserStats = async (req, res) => {
  const { game, username } = req.query;

  try {
    const stats = await UserGameStats.findOne({ game, username });

    if (!stats) {
      return res.status(404).json({ message: "Stats not found" });
    }

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
