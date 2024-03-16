const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});



router.get('/', limiter,videoController.getAllVideos);
router.post('/create', videoController.createVideoVote);
router.put('/vote',limiter,videoController.videoVote)

module.exports = router;