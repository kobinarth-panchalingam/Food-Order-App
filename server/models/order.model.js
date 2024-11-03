const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderList: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderNumber: {
    type: Number,
    default: 1,
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  orderPlace: {
    type: String,
    enum: ["Esaki", "University"],
    default: "Esaki",
  }
}, {
  collection: "Order",
  timestamps: true,
});

module.exports = mongoose.model("Order", orderSchema);;
