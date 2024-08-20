const express = require("express");
const userController = require("../controller/user.controller");
const wrapAsyncController = require("../middlewears/wrapAsyncController");
const router = express.Router();

/**
 * C R U D
 * post ,get, update , delete
 *
 */
router.post("/", wrapAsyncController(userController.createUser));

module.exports = router;
