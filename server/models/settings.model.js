const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  canOrderEsaki: {
    type: Boolean,
    default: false,
  },
  canOrderUniversity: {
    type: Boolean,
    default: false,
  },
}, {
  collection: "Setting"
});

module.exports = mongoose.model("Settings", settingsSchema);
