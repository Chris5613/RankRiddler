const val = require("../models/valForm");
const league = require("../models/leagueForm");
const csgo = require("../models/csgoForm");

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
        const resCS = await csgo.findOne({ "youtubeLink": { $regex: youtubeCode, $options: 'i' } });
        if (resCS) {
          return true;
        }
        return false;
      case "val":
        const resVal = await val.findOne({ "youtubeLink": { $regex: youtubeCode, $options: 'i' } });
        if (resVal) {
          return true;
        }
        return false;
      case "league":
        const resLeague = await league.findOne({ "youtubeLink": { $regex: youtubeCode, $options: 'i' } });
        if (resLeague) {
          return true;
        }
        return false;
      default:
        return true;
    }
  } catch (error) {
    return true;
  }
}

/**
 * 
 * @param {{youtubeLink, playerInfo, rank}} game 
 * @returns true if passed all validations
 */
const validations = async (game) => {
  let ytRegex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
  ytRegex = new RegExp(ytRegex);
  let matches = game.youtubeLink.match(ytRegex);
  if (matches) {
    try {
      if (await findYoutubeCode('csgo', matches[1])) {
        return false;
      }
      if (await findYoutubeCode('val', matches[1])) {
        return false;
      }
      if (await findYoutubeCode('league', matches[1])) {
        return false;
      }

      // Access the game object and add new validations below

      return true;
    }
    catch (err) {
      return false;
    }
  }
  return false;
}

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
    if(await validations(req.body)){
      const form = new csgo(req.body);
      await form.save();
      res.status(201).json({ form });
    } else {
      res.status(400).json({ error: "Invalid submition" });
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
  getForm,
  getLeagueForm,
  getCsgoForm,
};
