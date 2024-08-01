const express = require("express");
const router = express.Router();
const signUpApi = require("./signup.api");
const authApi = require("./auth.api");

/**
 * router.get('/', function(req, res) {
  res.send('Birds home page');
});
 * router.use("/auth",authApi")
 * 
 * 
 */

/**
 * /api/signup/...
 */
router.use("/signup", signUpApi);
router.use("/auth", authApi);

module.exports = router;
