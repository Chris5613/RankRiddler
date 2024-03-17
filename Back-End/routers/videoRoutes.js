const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');


router.get('/',videoController.getAllVideos);
router.post('/create', videoController.createVideoVote);
router.put('/vote',videoController.videoVote)
router.get('/votes/:valFormId', videoController.getVotesByValFormId);

module.exports = router;