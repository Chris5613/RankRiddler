const Form = require('../models/submitForm');

const submitForm = async (req, res) => {
    try {
        const form = new Form(req.body);
        await form.save();
        res.status(201).json({ form });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    submitForm,
}