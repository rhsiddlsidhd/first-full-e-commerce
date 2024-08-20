const CustomError = require("../middlewears/customError");
const User = require("../models/User");

const userService = require("../service/userService");

const userController = {};

userController.createUser = async (req, res) => {
  const { userId, email, password, gender } = req.body;

  await userService.createUser({ userId, email, password, gender });

  res.status(200).json({
    status: "create user success",
  });
};

userController.getUser = async (req, res) => {
  // try {
  const { userId } = req;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new CustomError("user not found", 409);
  }

  return res.status(200).json({
    status: "success",
    user,
  });
  // } catch (error) {
  // return res.status(500).json({
  //   status: "server fail",
  //   error: error.message,
  // });
  // }
};

module.exports = userController;
