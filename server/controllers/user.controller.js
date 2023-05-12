const User = require("../models/user.model");

// Controller to create a new user
const createUser = async (req, res) => {
  const { name, index } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ index });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists", userId: existingUser._id });
    }

    // User does not exist, proceed to create and save the new user
    const newUser = new User({ name, index });
    const savedUser = await newUser.save();

    res.status(201).json({ message: "User created successfully", userId: savedUser._id });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};

// Get user by index number
const getUserByIndex = async (req, res) => {
  const { index } = req.query;

  try {
    const user = await User.findOne({ index });

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};

// Controller to get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserByIndex,
};
