const express = require("express");
const userController = require("../controller/user.controller");
const router = express.Router();

/**
 * C R U D
 * post ,get, update , delete
 *
 */
router.post("/", userController.createUser);

module.exports = router;
