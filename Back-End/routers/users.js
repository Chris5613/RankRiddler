const express = require("express");
const {
  getUserbyUsername,
  getAllUsers,
  createUser,
  AddPointByUsername,
  getOneUserByUuid,
} = require("../controllers/userControllers");

const router = express.Router();
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

router.get("/allusers", limiter, getAllUsers);
router.get("/user", limiter, getUserbyUsername);
router.post("/saveuser", limiter, createUser);
router.get("/user/:uuid", limiter, getOneUserByUuid);
router.get("/profile/:username", getUserbyUsername);

router.put("/updatepoints", limiter, AddPointByUsername);
module.exports = router;
