const match = require("../models/matchHistory")

const getAllMatches = async (req, res) => {
  try {
    const matches = await match.find()
    res.json(matches)
  }
  catch (err) {
    console.log(err)
    res.status(404)
  }
}

const getUserHistory = async (req, res) => {
  const { username } = req.params;

  try {
    const matches = await match.find({
      $or: [{ player1: username }, { player2: username }]
    });
    res.json(matches);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserWins = async (req, res) => {
  const { username } = req.params;
  ;
  try {
    const matches = await match.find({winner: username});
    res.json(matches);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

const recordMatchWinner = async (req, res) => {
  const { username, opponent, winner,game } = req.body;
  try {
    const newRecord = new match({
      player1: username,
      player2: opponent,
      winner: winner,
      game: game
    });
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = {
  getAllMatches,
  getUserHistory,
  getUserWins,
  recordMatchWinner,
};
