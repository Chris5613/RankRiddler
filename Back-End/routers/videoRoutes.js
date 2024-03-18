const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});

router.get('/',limiter,videoController.getAllVideos);
router.post('/create', limiter,videoController.createVideoVote);
router.put('/vote',limiter,videoController.videoVote)
router.get('/votes/:valFormId',limiter, videoController.getVotesByValFormId);

module.exports = router;