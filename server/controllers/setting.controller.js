const Settings = require("../models/settings.model");

const updateOrderPermision = async (req, res) => {
  const { type, orderPlace } = req.body;
  try {
    const updateField = orderPlace === "Esaki" ? "canOrderEsaki" : "canOrderUniversity";
    const updateValue = type === "start";
    await Settings.updateMany({}, { [updateField]: updateValue });

    res.status(200).json({ message: "Order permission updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrderPermision = async (req, res) => {
  try {
    const settings = await Settings.find({}).limit(1);

    res.status(200).json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  updateOrderPermision,
  getOrderPermision,
};
