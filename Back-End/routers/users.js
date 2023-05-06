const express = require('express')
const {
    register,
    userLogin,
    userSignout,
    token,
}
= require('../controllers/userControllers')

const User = require('../models/User')
const router = express.Router()

router.get('/token', token)
router.post('/register', register)
router.post('/login', userLogin)
router.put('/signout', userSignout)

module.exports = router