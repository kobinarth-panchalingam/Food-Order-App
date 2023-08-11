const Settings = require("../models/settings.model");

const updateOrderPermision = async (req, res) => {
  const { type, orderPlace } = req.body;
  try {
    // type === "start" ? await User.updateMany({}, { canOrder: true }) : await User.updateMany({}, { canOrder: false });
    if (orderPlace === "Esaki") {
      type === "start" ? await Settings.updateMany({}, { canOrderEsaki: true }) : await Settings.updateMany({}, { canOrderEsaki: false });
    }

    if (orderPlace === "University") {
      type === "start" ? await Settings.updateMany({}, { canOrderUniversity: true }) : await Settings.updateMany({}, { canOrderUniversity: false });
    }
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
