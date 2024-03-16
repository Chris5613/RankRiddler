const express = require("express");
const {
  valForm,
  leagueForm,
  csgoForm,
  getForm,
  getLeagueForm,
  getCsgoForm,
  getApexForm,
  getFortniteForm,
  getOverwatchForm,
  getRainbowForm,
  getRocketForm,
  apexForm,
  fortniteForm,
  overwatchForm,
  rainbowForm,
  rocketForm,
} = require("../controllers/formControllers");

const { reportForm } = require("../controllers/bugController");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});

const router = express.Router();

router.post("/val", limiter, valForm);
router.post("/league", limiter, leagueForm);
router.post("/csgo", limiter, csgoForm);
router.post("/apex", limiter, apexForm);
router.post("/fortnite", limiter, fortniteForm);
router.post("/overwatch", limiter, overwatchForm);
router.post("/rainbow", limiter, rainbowForm);
router.post("/rocket", limiter, rocketForm);

router.get("/valdata", limiter, getForm);
router.get("/leaguedata", limiter, getLeagueForm);
router.get("/csgodata", limiter, getCsgoForm);
router.get("/apexdata", limiter, getApexForm);
router.get("/fortnitedata", limiter, getFortniteForm);
router.get("/overwatchdata", limiter, getOverwatchForm);
router.get("/rainbowdata", limiter, getRainbowForm);
router.get("/rocketdata", limiter, getRocketForm);

router.post("/report", limiter, reportForm);

module.exports = router;
