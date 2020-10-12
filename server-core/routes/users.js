const express = require("express");
const router = express.Router();
const tokenControl = require("../middlewares/tokenControl");
const usersController = require("./../controllers/users");

// GET list all users
router.get("/", tokenControl, usersController.listAllUsers);

// POST register OR login user
router.post("/", usersController.registerORlogin);

module.exports = router;
