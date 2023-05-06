const val = require('../models/valForm');
const league = require('../models/leagueForm');
const csgo = require('../models/csgoForm');

const valForm = async (req, res) => {
    try {
        const form = new val(req.body);
        await form.save();
        res.status(201).json({ form });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const leagueForm = async (req, res) => {
    try {
        const form = new league(req.body);
        await form.save();
        res.status(201).json({ form });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const csgoForm = async (req, res) => {
    try {
        const form = new csgo(req.body);
        await form.save();
        res.status(201).json({ form });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getForm  = async (req, res) => {
    try {
        const form = await val.find();
        res.status(200).json({ form });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getLeagueForm = async (req, res) => {
    try {
        const form = await league.find();
        res.status(200).json({ form });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getCsgoForm = async (req, res) => {
    try {
        const form = await csgo.find();
        res.status(200).json({ form });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    valForm,
    leagueForm,
    csgoForm,
    getForm,
    getLeagueForm,
    getCsgoForm

}