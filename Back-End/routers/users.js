const express = require("express");
const {
  getUserbyUsername,
  getAllUsers,
  createUser,
} = require("../controllers/userControllers");

const router = express.Router();
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});

router.get("/allusers", limiter, getAllUsers);
router.get("/user", limiter, getUserbyUsername);
router.post("/saveuser", limiter, createUser);
module.exports = router;
