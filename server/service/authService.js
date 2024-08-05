const User = require("../models/User");
const bcrypt = require("bcrypt");

const userService = {};

userService.loginWithUserIdAndEmail = async ({ userId, email, password }) => {
  const user = await User.findOne({ $or: [{ userId }, { email }] });

  if (!user) {
    throw new Error("유저를 찾을수 없습니다.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("비밀번호가 일치하지 않습니다.");
  }

  const { accessToken, refreshToken } = await user.generateToken();

  return { accessToken, refreshToken, user };
};

module.exports = userService;
