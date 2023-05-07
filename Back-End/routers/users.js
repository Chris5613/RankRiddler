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

const auth = require("../controllers/auth");

router.get("/token",token);
router.post("/register", register);
router.post("/login", userLogin);
router.put("/signout", userSignout);
router.get("/allusers", getAllUsers);
router.get("/weeklyscores", getWeeklyScores);

router.get("/user",auth, getUserbyUsername);
router.put("/addpoints", addPointsbyUsername);
router.put("/deductpoints", deductPointsbyUsername);

module.exports = router;
