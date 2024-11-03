const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  collection: "Food"
});

module.exports = mongoose.model("Food", foodSchema);;
