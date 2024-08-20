const express = require("express");
const router = express.Router();
const signUpApi = require("./signup.api");
const authApi = require("./auth.api");

router.use("/signup", signUpApi);
router.use("/auth", authApi);

module.exports = router;
