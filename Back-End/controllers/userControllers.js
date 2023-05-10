const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const userExists = await User.findOne({ username: req.body.username });
  if (userExists) {
    return res.status(400).send("User already exists");
  }
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const { username, password } = req.body;
    const user = await User.create({ username, password: hashedPassword });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const userLogin = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user == null) {
    return res.status(404).send("No user with that username or password");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token: token });
    } else {
      res.status(404).send("Incorrect password or username");
    }
  } catch (err) {
    res.status(500).send();
  }
};

const userSignout = async (req, res) => {
  const authHeader = req.headers["authorization"];
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ msg: "You have been logged Out" });
    } else {
      res.send({ msg: "Error" });
    }
  });
};

const token = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ msg: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    res.send(token);
  } catch (err) {
    res.status(400).json("Invalid token");
  }
};

const getUserbyUsername = async (req, res) => {
  const { userName } = req.params;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const addPointsbyUsername = async (req, res) => {
  const { username } = req.headers;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.points += 2;
    await user.save();
    return res.status(200).json({ message: 'Points added successfully', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const add1PointbyUsername = async (req, res) => {
  const { username } = req.headers;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.points += 1;
    await user.save();
    return res.status(200).json({ message: 'Points added successfully', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 }).limit(10).exec();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getPointsbyUsername = async (req, res) => {
  const { username } = req.headers;
  try {
    const user = await User.findOne({ username });
    const points = user.points;
    res.json({ points });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


const deductPointsbyUsername = async (req, res) => {
  const { username } = req.headers;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.points -= 1;
    await user.save();
    return res.status(200).json({ message: 'Points added successfully', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  register,
  userLogin,
  userSignout,
  token,
  getUserbyUsername,
  addPointsbyUsername,
  add1PointbyUsername,
  deductPointsbyUsername,
  getAllUsers,
  getPointsbyUsername,
  deductPointsbyUsername,
};
