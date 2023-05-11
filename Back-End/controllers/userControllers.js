const User = require("../models/User");

const getUserbyUsername = async (req, res) => {
  const { userName } = req.params;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 }).limit(10).exec();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const createUser = async (req, res) => {
  const { username, points } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ error: "Username already exists" });
  }

  //instantiates filter and checks usernames for profanities
  let Filter = require("bad-words"), filter = new Filter()
  const isUnclean = filter.isProfane(username)
  //if username contains profanities then a response is sent declaring the username is not allowed
  if(isUnclean){
    return res.status(409).json({error: "Innapropriate username"})
  }

  const user = new User({ username, points });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updatePointByUsername = async (req, res) => {
  const { username, points } = req.body;
  console.log(username, points);
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.points = points;
    await user.save();
    console.log(user);
    res.status(200).json({ message: 'Points updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};




module.exports = {
  getUserbyUsername,
  getAllUsers,
  createUser,
  updatePointByUsername,
};
