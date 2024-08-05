const express = require("express");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const router = express.Router();

//login 이 post 인 이유 ? body에 formData 를 받아오려고
router.post("/login", authController.loginWithUserIdAndEmail);

router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
