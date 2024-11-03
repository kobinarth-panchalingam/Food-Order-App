const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserByIndex, updateOrderPermision } = require("../controllers/user.controller");

// TODO: Have to change path names
router.get("/", getUserByIndex);
router.get("/all", getUsers);
router.post("/", createUser);
router.patch("/", updateOrderPermision);

module.exports = router;
