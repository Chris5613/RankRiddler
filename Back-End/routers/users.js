const express = require("express");
const {
  getAllUsers,
  createUser,
  AddPointByUsername,
  getOneUserByUuid,
} = require("../controllers/userControllers");

const router = express.Router();
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 400,
});

router.get("/allusers", getAllUsers);
router.post("/saveuser", createUser);
router.get("/user/:uuid", getOneUserByUuid);

router.put("/updatepoints/:uuid", AddPointByUsername);
module.exports = router;
