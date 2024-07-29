const express = require("express");
const router = express.Router();
const signUpApi = require("./signUp.api");

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

module.exports = router;
