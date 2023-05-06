const express = require('express')
const {
    valForm,
    leagueForm,
    csgoForm
}
= require('../controllers/formControllers')

const router = express.Router()

router.post('/val', valForm)
router.post('/league', leagueForm)
router.post('/csgo', csgoForm)

module.exports = router