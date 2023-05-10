const express = require("express");
const {
  register,
  userLogin,
  userSignout,
  token,
  getUserbyUsername,
  addPointsbyUsername,
  add1PointbyUsername,
  getAllUsers,
  getPointsbyUsername,
  deductPointsbyUsername,
} = require("../controllers/userControllers");

const User = require("../models/User");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const auth = require("../controllers/auth");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.get("/token",limiter, token);
router.post("/register",limiter, register);
router.post("/login", limiter,userLogin);
router.put("/signout",limiter, userSignout);
router.get("/allusers",limiter, getAllUsers);

router.get("/user",limiter, getUserbyUsername);
router.put("/addpoints",limiter, addPointsbyUsername);
router.put("/add1points",limiter, add1PointbyUsername);
router.put("/deductpoints",limiter, deductPointsbyUsername);
router.get("/getpoints",limiter, getPointsbyUsername);

module.exports = router;
