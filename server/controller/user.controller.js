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
    if (error.message.includes("중복")) {
      res.status(409).json({
        status: "create fail",
        error: error.message,
      });
    }

    res.status(500).json({
      status: "Server error",
      error: error.message,
    });
  }
};

module.exports = userController;
