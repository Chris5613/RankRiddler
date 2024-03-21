const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const limit = parseInt(req.query.limit) || 100; 
  const page = parseInt(req.query.page) || 1;

  try {
    const skip = (page - 1) * limit;
    const users = await User.find()
                            .sort({ points: -1 })
                            .limit(limit)
                            .skip(skip);

    const totalUsers = await User.countDocuments();

    res.json({
      users: users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page
    });
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
    }
    await user.save();
    res.status(200).json({ message: "Points updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const multiplayerWon = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.wins += 1;
    await user.save();
    res.status(200).json({ message: "Score updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const multiplayerLost = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.losses += 1;
    await user.save();
    res.status(200).json({ message: "Score updated successfully" });
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
  multiplayerWon,
  multiplayerLost,
};
