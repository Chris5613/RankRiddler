const report = require("../models/formModels/reportForm");

const reportForm = async (req, res) => {
  try {
    const form = new report(req.body);
    await form.save();
    res.status(201).json({ form });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  reportForm,
};
