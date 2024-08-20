const CustomError = require("./customError");

// 전역 에러 핸들러 미들웨어
const errorMiddleware = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({
      status: "fail",
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "fail",
      message: "server error",
    });
  }
};

module.exports = errorMiddleware;
