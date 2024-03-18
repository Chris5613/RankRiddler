const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const csgoController = require('../controllers/csgoController');
const leagueController = require('../controllers/leagueController');
const overwatchController = require('../controllers/overwatchController');
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});

router.get('/',limiter,videoController.getValVideos);
router.post('/create',limiter, videoController.createVideoVote);
router.put('/vote',limiter,videoController.videoVote)
router.get('/votes/:valFormId', limiter,videoController.getVotesByValFormId);
const rateLimit = require("express-rate-limit");

router.get('/csgo',limiter,csgoController.getCsgoVideos);
router.post('/csgo/create',limiter,csgoController.csgoCreateVoteRecord);
router.put('/csgo/record',limiter,csgoController.csgoVideoVote);
router.get('/csgo/getvotes/:valFormId',limiter,csgoController.getCsgoVotesByValFormId);

router.get('/league',limiter,leagueController.getLeagueVideos);
router.post('/league/create',limiter,leagueController.leagueCreateVoteRecord);
router.put('/league/record',limiter,leagueController.leagueVideoVote);
router.get('/league/getvotes/:valFormId',leagueController.getLeagueVotesByValFormId);

router.get('/overwatch',limiter,overwatchController.getOverwatchVideos);
router.post('/overwatch/create',limiter,overwatchController.overwatchCreateVoteRecord);
router.put('/overwatch/record',limiter,overwatchController.overwatchVideoVote);
router.get('/overwatch/getvotes/:valFormId',limiter,overwatchController.getOverwatchVotesByValFormId);


module.exports = router;