const express = require("express");
const authController = require("../controller/auth.controller");
const router = express.Router();

//login 이 post 인 이유 ? body에 formData 를 받아오려고
router.post("/login", authController.loginWithUserIdAndEmail);

module.exports = router;
