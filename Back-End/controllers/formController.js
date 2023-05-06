const Form = require('../models/Form') 

const submitForm = async (req,res) => {
    const {youtubeLink, username, playerInfo, rank, trackerLink} = req.body
    const form = await Form.create({youtubeLink, username, playerInfo, rank, trackerLink})
    res.status(200).json(form)
}

module.exports = { 
    submitForm
}; 