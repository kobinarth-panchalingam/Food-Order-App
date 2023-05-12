const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // You can include additional fields like an image URL, category, etc. based on your requirements
  },
  {
    collection: "Food", // Specify the desired collection name
  }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
