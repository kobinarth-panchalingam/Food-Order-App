const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    index: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    collection: "User", // Specify the desired collection name
  }
);

module.exports = mongoose.model("User", userSchema);
