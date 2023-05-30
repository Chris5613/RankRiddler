const express = require("express");
const {
  valForm,
  leagueForm,
  csgoForm,
  getForm,
  getLeagueForm,
  getCsgoForm,
} = require("../controllers/formControllers");

const {reportForm } = require("../controllers/bugController");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const router = express.Router();

router.post("/val", limiter, valForm);
router.post("/league", limiter, leagueForm);
router.post("/csgo", limiter, csgoForm);

router.get("/valdata", limiter, getForm);
router.get("/leaguedata", limiter, getLeagueForm);
router.get("/csgodata", limiter, getCsgoForm);

router.post("/report", limiter, reportForm);

module.exports = router;
