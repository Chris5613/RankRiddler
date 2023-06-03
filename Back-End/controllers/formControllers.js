const val = require("../models/valForm");
const league = require("../models/leagueForm");
const csgo = require("../models/csgoForm");
const apex = require("../models/apexForm");
const fortnite = require("../models/fortniteForm");
const overwatch = require("../models/overwatchForm");
const rainbow = require("../models/rainbowForm");
const rocket = require("../models/rocketForm");

/**
 *
 * @param {String} game
 * @param {String} youtubeCode
 * @returns false if youtubeCode is not found in the database for the game
 */
const findYoutubeCode = async (game, youtubeCode) => {
  try {
    switch (game) {
      case "csgo":
        const resCS = await csgo.findOne({
          youtubeLink: { $regex: youtubeCode, $options: "i" },
        });
        if (resCS) {
          return true;
        }
        return false;
      case "val":
        const resVal = await val.findOne({
          youtubeLink: { $regex: youtubeCode, $options: "i" },
        });
        if (resVal) {
          return true;
        }
        return false;
      case "league":
        const resLeague = await league.findOne({
          youtubeLink: { $regex: youtubeCode, $options: "i" },
        });
        if (resLeague) {
          return true;
        }
        return false;
      case "apex":
        const resApex = await apex.findOne({
          youtubeLink: { $regex: youtubeCode, $options: "i" },
        });
        if (resApex) {
          return true;
        }
        return false;
      case "fortnite":
        const resFortnite = await fortnite.findOne({
          youtubeLink: { $regex: youtubeCode, $options: "i" },
        });
        if (resFortnite) {
          return true;
        }
        return false;
      case "overwatch":
        const resOverwatch = await overwatch.findOne({
          youtubeLink: { $regex: youtubeCode, $options: "i" },
        });
        if (resOverwatch) {
          return true;
        }
        return false;
      case "rainbow":
        const resRainbow = await rainbow.findOne({
          youtubeLink: { $regex: youtubeCode, $options: "i" },
        });
        if (resRainbow) {
          return true;
        }
        return false;
      case "rocket":
        const resRocket = await rocket.findOne({
          youtubeLink: { $regex: youtubeCode, $options: "i" },
        });
        if (resRocket) {
          return true;
        }
        return false;
      default:
        return true;
    }
  } catch (error) {
    return true;
  }
};

/**
 *
 * @param {{youtubeLink, playerInfo, rank}} game
 * @returns true if passed all validations
 */
const validations = async (game) => {
  let ytRegex =
    /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
  ytRegex = new RegExp(ytRegex);
  let matches = game.youtubeLink.match(ytRegex);
  if (matches) {
    try {
      if (await findYoutubeCode("csgo", matches[1])) {
        return false;
      }
      if (await findYoutubeCode("val", matches[1])) {
        return false;
      }
      if (await findYoutubeCode("league", matches[1])) {
        return false;
      }
      if (await findYoutubeCode("apex", matches[1])) {
        return false;
      }
      if (await findYoutubeCode("fortnite", matches[1])) {
        return false;
      }
      if (await findYoutubeCode("overwatch", matches[1])) {
        return false;
      }
      if (await findYoutubeCode("rainbow", matches[1])) {
        return false;
      }
      if (await findYoutubeCode("rocket", matches[1])) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
};

const valForm = async (req, res) => {
  try {
    if (await validations(req.body)) {
      const form = new val(req.body);
      await form.save();
      res.status(201).json({ form });
    } else {
      res.status(400).json({ error: "Invalid submition" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const leagueForm = async (req, res) => {
  try {
    if (await validations(req.body)) {
      const form = new league(req.body);
      await form.save();
      res.status(201).json({ form });
    } else {
      res.status(400).json({ error: "Invalid submition" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const csgoForm = async (req, res) => {
  try {
    if (await validations(req.body)) {
      const form = new csgo(req.body);
      await form.save();
      res.status(201).json({ form });
    } else {
      res.status(400).json({ error: "Invalid submission" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const apexForm = async (req, res) => {
  try {
    if (await validations(req.body)) {
      const form = new apex(req.body);
      await form.save();
      res.status(201).json({ form });
    } else {
      res.status(400).json({ error: "Invalid submission" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fortniteForm = async (req, res) => {
  try {
    if (await validations(req.body)) {
      const form = new fortnite(req.body);
      await form.save();
      res.status(201).json({ form });
    } else {
      res.status(400).json({ error: "Invalid submission" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const overwatchForm = async (req, res) => {
  try {
    if (await validations(req.body)) {
      const form = new overwatch(req.body);
      await form.save();
      res.status(201).json({ form });
    } else {
      res.status(400).json({ error: "Invalid submission" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const rainbowForm = async (req, res) => {
  try {
    if (await validations(req.body)) {
      const form = new rainbow(req.body);
      await form.save();
      res.status(201).json({ form });
    } else {
      res.status(400).json({ error: "Invalid submission" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const rocketForm = async (req, res) => {
  try {
    if (await validations(req.body)) {
      const form = new rocket(req.body);
      await form.save();
      res.status(201).json({ form });
    } else {
      res.status(400).json({ error: "Invalid submission" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getForm = async (req, res) => {
  try {
    const form = await val.find();
    res.status(200).json({ form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getLeagueForm = async (req, res) => {
  try {
    const form = await league.find();
    res.status(200).json({ form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getApexForm = async (req, res) => {
  try {
    const form = await apex.find();
    res.status(200).json({ form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFortniteForm = async (req, res) => {
  try {
    const form = await fortnite.find();
    res.status(200).json({ form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOverwatchForm = async (req, res) => {
  try {
    const form = await overwatch.find();
    res.status(200).json({ form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRainbowForm = async (req, res) => {
  try {
    const form = await rainbow.find();
    res.status(200).json({ form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRocketForm = async (req, res) => {
  try {
    const form = await rocket.find();
    res.status(200).json({ form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCsgoForm = async (req, res) => {
  try {
    const form = await csgo.find();
    res.status(200).json({ form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  valForm,
  leagueForm,
  csgoForm,
  apexForm,
  fortniteForm,
  overwatchForm,
  rainbowForm,
  rocketForm,
  getApexForm,
  getFortniteForm,
  getOverwatchForm,
  getRainbowForm,
  getRocketForm,
  getForm,
  getLeagueForm,
  getCsgoForm,
};
