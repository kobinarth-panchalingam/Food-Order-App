const User = require("../models/user.model");

// Controller to create a new user
const createUser = async (req, res) => {
  const { name } = req.body;
  if (!/^\d{6}$/.test(name)) {
    return res.status(400).json({ message: "Name must be a 6-digit number" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ name });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    }

    // User does not exist, proceed to create and save the new user
    const newUser = new User({ name });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error.message });
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
};
