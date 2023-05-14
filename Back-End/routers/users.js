const express = require("express");
const {
  getUserbyUsername,
  getAllUsers,
  createUser,
  Add1PointByUsername,
  getOneUserByUuid,
  Add2PointByUsername,
  deduct1PointByUsername,
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

router.put("/updatepoints1", limiter, Add1PointByUsername);
router.put("/updatepoints2", limiter, Add2PointByUsername);
router.put("/deductpoints", limiter, deduct1PointByUsername);

router.get("/user/:uuid", limiter, getOneUserByUuid);

module.exports = router;
