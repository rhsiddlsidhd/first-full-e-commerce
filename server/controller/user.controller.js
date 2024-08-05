const User = require("../models/User");

const userService = require("../service/userService");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { userId, email, password, gender } = req.body;

    await userService.createUser({ userId, email, password, gender });

    res.status(200).json({
      status: "create user success",
    });
  } catch (error) {
    if (error.message.includes("중복입니다.")) {
      return res.status(409).json({
        status: "create fail",
        error: error.message,
      });
    }

    return res.status(500).json({
      status: "Server fail",
      error: error.message,
    });
  }
};

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new Error("user not found");
    }

    return res.status(200).json({
      status: "success",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "server fail",
      error: error.message,
    });
  }
};

module.exports = userController;
