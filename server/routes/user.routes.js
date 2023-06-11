const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserByIndex, updateOrderPermision } = require("../controllers/user.controller");

// User routes
router.post("/", createUser);
router.get("/", getUserByIndex);
router.get("/all", getUsers);
router.patch("/", updateOrderPermision);

module.exports = router;
