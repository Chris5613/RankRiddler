const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const csgoController = require('../controllers/csgoController');


router.get('/',videoController.getValVideos);
router.post('/create', videoController.createVideoVote);
router.put('/vote',videoController.videoVote)
router.get('/votes/:valFormId', videoController.getVotesByValFormId);

router.get('/csgo',csgoController.getCsgoVideos);
router.post('/csgo/create',csgoController.csgoCreateVoteRecord);
router.put('/csgo/record',csgoController.csgoVideoVote);

router.get('/csgo/getvotes/:valFormId',csgoController.getCsgoVotesByValFormId);


module.exports = router;