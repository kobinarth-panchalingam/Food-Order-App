const User = require("../models/user.model");
const { fetchMemberEmails } = require("../utils/splitwise");

const createUser = async (req, res) => {
  try {
    const { name, index, gender, splitwiseEmail } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ index });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    // Check if the splitwiseEmail is in the memberEmails array
    const memberEmails = await fetchMemberEmails();
    const foundMember = memberEmails.find((member) => member.email === splitwiseEmail);
    if (!foundMember) {
      return res.status(404).json({ message: "You are not a member of the group" });
    }

    // User does not exist, proceed to create and save the new user
    const splitwiseId = foundMember.id;
    const newUser = new User({ name, index, gender, splitwiseEmail, splitwiseId });
    const savedUser = await newUser.save();

    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to create user", error: error.message });
  }
};


const getUserByIndex = async (req, res) => {
  const index = req.params.index;

  try {
    const user = await User.findOne({ index: index });

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrderPermision = async (req, res) => {
  const { type } = req.body;

  try {
    type === "start" ? await User.updateMany({}, { canOrder: true }) : await User.updateMany({}, { canOrder: false });

    res.status(200).json({ message: "Order permission updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserByIndex,
  updateOrderPermision,
};
