const express = require("express");
const authController = require("../controller/auth.controller");
const userController = require("../controller/user.controller");
const wrapAsyncController = require("../middlewears/wrapAsyncController");
const router = express.Router();

//login 이 post 인 이유 ? body에 formData 를 받아오려고
router.post(
  "/login",
  wrapAsyncController(authController.loginWithUserIdAndEmail)
);

router.post("/logout", wrapAsyncController(authController.logout));

//토큰 여부 확인 => 토큰 확인 후 userId 전달 => userId로 user Search
router.get(
  "/me",
  wrapAsyncController(authController.authenticate),
  wrapAsyncController(userController.getUser)
);

// router.get("/me", authController.authenticate, userController.getUser);

router.get(
  "/token",
  wrapAsyncController(authController.refreshTokenVerify),
  wrapAsyncController(authController.generateNewToken)
);

module.exports = router;
