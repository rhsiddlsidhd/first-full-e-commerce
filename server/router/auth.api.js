const express = require("express");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const router = express.Router();

//login 이 post 인 이유 ? body에 formData 를 받아오려고
router.post("/login", authController.loginWithUserIdAndEmail);

router.post("/logout", authController.logout);

//토큰 여부 확인 => 토큰 확인 후 userId 전달 => userId로 user Search
router.get("/me", authController.authenticate, userController.getUser);

router.get(
  "/token",
  authController.refreshTokenVerify,
  authController.generateNewToken
);

module.exports = router;
