const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  splitwiseEmail: {
    type: String,
    unique: true,
  },
  splitwiseId: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  canOrder: {
    type: Boolean,
    default: false,
  },
}, {
  collection: "User",
});

module.exports = mongoose.model("User", userSchema);
