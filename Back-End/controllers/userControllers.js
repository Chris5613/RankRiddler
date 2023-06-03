const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const createUser = async (req, res) => {
  const { username, points, uuid } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  }

  let Filter = require("bad-words"),
    filter = new Filter();
  const isUnclean = filter.isProfane(username);
  if (isUnclean) {
    return res.status(409).json({ error: "Innapropriate username" });
  }

  const user = new User({ username, points, uuid });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getOneUserByUuid = async (req, res) => {
  const { uuid } = req.params;
  try {
    const user = await User.findOne({ uuid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const AddPointByUsername = async (req, res) => {
  const { points } = req.body;
  const { uuid } = req.params;
  try {
    const user = await User.findOne({ uuid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (points === 2) {
      user.points += 2;
      user.totalCorrect += 1;
      user.totalRounds += 1;
    } else if (points === 1) {
      user.points += 1;
      user.totalRounds += 1;
    } else {
      user.points -= 1;
      user.totalRounds += 1;
    }
    await user.save();
    res.status(200).json({ message: "Points updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  AddPointByUsername,
  getOneUserByUuid,
};
