const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CustomError = require("../middlewears/customError");
const JWT_PRIVATEKEY = process.env.JWT_PRIVATEKEY;

const userService = {};

userService.loginWithUserIdAndEmail = async ({ userId, email, password }) => {
  const user = await User.findOne({ $or: [{ userId }, { email }] });

  if (!user) {
    // const error = new Error("유저를 찾을수 없습니다.");
    // return res.status(400).json({
    //   status: "fail",
    //   error: "User not found",
    // });
    // error.code = "USER_NOT_FOUND";
    // throw error;
    throw new CustomError("유저를 찾을 수 없습니다.", 409);
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    // throw new Error("비밀번호가 일치하지 않습니다.");
    // return res.status(400).json({
    //   status: "fail",
    //   error: "Password do not match",
    // });
    throw new CustomError("비밀번호가 일치하지 않습니다.", 409);
  }

  const { accessToken, refreshToken } = await user.generateToken();

  return { accessToken, refreshToken };
};

userService.accessTokenExp = async ({ accessToken }) => {
  const decoded = jwt.verify(accessToken, JWT_PRIVATEKEY);

  if (!decoded) {
    // throw new Error("유효하지 않은 토큰입니다.");
    throw new CustomError("유효하지 않은 토큰입니다.", 401);
  }

  const { exp } = decoded;

  return { exp };
};

module.exports = userService;
