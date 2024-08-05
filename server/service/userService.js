const Profile = require("../models/profile");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const userService = {};

userService.createUser = async ({ userId, email, password, gender }) => {
  const ExistingUserID = await User.findOne({ userId: userId });

  if (ExistingUserID) {
    throw new Error(`아이디가 중복입니다.`);
  }

  const ExistingUserEmail = await User.findOne({ email: email });

  if (ExistingUserEmail) {
    throw new Error(`이메일이 중복입니다.`);
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new User({
    userId,
    password: hash,
    email,
    gender,
  });

  await newUser.save();

  /**
   * user 가 만들어지고 userProfile도 자동생성
   */

  const newProfile = new Profile({
    userId: newUser._id,
  });

  await newProfile.save();

  return newUser;
};

module.exports = userService;
