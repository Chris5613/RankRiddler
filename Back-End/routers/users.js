const express = require("express");
const {
  getAllUsers,
  createUser,
  AddPointByUsername,
  getOneUserByUuid,
} = require("../controllers/userControllers");
const userGameStatsController = require("../controllers/userGameStatsController")

const router = express.Router();
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
});

router.get("/allusers", limiter, getAllUsers);
router.post("/saveuser", limiter, createUser);
router.get("/user/:uuid", limiter, getOneUserByUuid);

router.post("/createStats", limiter, userGameStatsController.addGameRound);
router.get("/stats", limiter, userGameStatsController.getUserStats);

router.put("/updatepoints/:uuid", limiter, AddPointByUsername);
module.exports = router;
