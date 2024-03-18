const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const csgoController = require('../controllers/csgoController');
const leagueController = require('../controllers/leagueController');
const overwatchController = require('../controllers/overwatchController');

router.get('/',videoController.getValVideos);
router.post('/create', videoController.createVideoVote);
router.put('/vote',videoController.videoVote)
router.get('/votes/:valFormId', videoController.getVotesByValFormId);

router.get('/csgo',csgoController.getCsgoVideos);
router.post('/csgo/create',csgoController.csgoCreateVoteRecord);
router.put('/csgo/record',csgoController.csgoVideoVote);
router.get('/csgo/getvotes/:valFormId',csgoController.getCsgoVotesByValFormId);

router.get('/league',leagueController.getLeagueVideos);
router.post('/league/create',leagueController.leagueCreateVoteRecord);
router.put('/league/record',leagueController.leagueVideoVote);
router.get('/league/getvotes/:valFormId',leagueController.getLeagueVotesByValFormId);

router.get('/overwatch',overwatchController.getOverwatchVideos);
router.post('/overwatch/create',overwatchController.overwatchCreateVoteRecord);
router.put('/overwatch/record',overwatchController.overwatchVideoVote);
router.get('/overwatch/getvotes/:valFormId',overwatchController.getOverwatchVotesByValFormId);


module.exports = router;