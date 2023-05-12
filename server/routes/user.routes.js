const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserByIndex } = require("../controllers/user.controller");

// User routes
router.post("/", createUser);
router.get("/", getUserByIndex);

module.exports = router;
