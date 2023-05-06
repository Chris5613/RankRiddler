const express = require('express')
const {
    submitForm
}
= require('../controllers/formControllers')

const router = express.Router()

router.post('/val', submitForm)

module.exports = router