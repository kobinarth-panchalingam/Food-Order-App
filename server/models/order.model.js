const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
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

    // You can include additional fields like order date, total price, etc. based on your requirements
  },
  {
    collection: "Order", // Specify the desired collection name
    timestamps: true, // Add timestamps for createdAt and updatedAt fields
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
