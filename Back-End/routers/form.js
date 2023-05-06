const express = require('express')
const {
    submitForm,
}
= require('../../Back-End/controllers/formControllers')

const Form = require('../../Back-End/models/Form')
const router = express.Router()

router.get('/submit', Form)


module.exports = router