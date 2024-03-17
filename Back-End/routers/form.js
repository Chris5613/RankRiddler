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

router.post("/val", valForm);
router.post("/league", leagueForm);
router.post("/csgo", csgoForm);
router.post("/apex", apexForm);
router.post("/fortnite", fortniteForm);
router.post("/overwatch", overwatchForm);
router.post("/rainbow", rainbowForm);
router.post("/rocket", rocketForm);

router.get("/valdata", getForm);
router.get("/leaguedata", getLeagueForm);
router.get("/csgodata", getCsgoForm);
router.get("/apexdata", getApexForm);
router.get("/fortnitedata", getFortniteForm);
router.get("/overwatchdata", getOverwatchForm);
router.get("/rainbowdata", getRainbowForm);
router.get("/rocketdata", getRocketForm);

router.post("/report", reportForm);

module.exports = router;
