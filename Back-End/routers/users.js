const express = require("express");
const {
  register,
  userLogin,
  userSignout,
  token,
  getUserbyUsername,
  addPointsbyUsername,
  deductPointsbyUsername,
  getAllUsers,
  getWeeklyScores
} = require("../controllers/userControllers");

const User = require("../models/User");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const auth = require("../controllers/auth");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.get("/token", token);
router.post("/register", register);
router.post("/login", userLogin);
router.put("/signout", userSignout);
router.get("/allusers",limiter, getAllUsers);
router.get("/weeklyscores", getWeeklyScores);

router.get("/user", getUserbyUsername);
router.put("/addpoints", addPointsbyUsername);
router.put("/deductpoints", deductPointsbyUsername);

module.exports = router;
