const jwt = require("jsonwebtoken");
const userService = require("../service/authService");
const JWT_PRIVATEKEY = process.env.JWT_PRIVATEKEY;

const authController = {};
/**
 * 로그인 API
 * userID email password 를 req.body로 가져옴
 * password 는 hash 된 값을 해석해서 맞는지 비교 (bcrypt)
 * 로그인 이후 token 발행
 * token은 jonsWebToken
 * refresh 토큰 access 토큰 두가지로 발행
 * access 토큰은 클라이언트에서 보관
 * access 토큰 만료 1h
 * refresh 토큰 만료 3day
 * access 45분마다 갱신
 *
 * 로그인 => 로그아웃
 * 로그인 => 토큰기한 만료 => refresh token 확인 => O => accessToken 자동발급
 * 로그인 => 토큰기한 만료 => refresh token 확인 => X => 로그아웃
 * JWT vs 세션
 * JWT를 선택한다면
 * refresh 를 http/only 쿠키로 저장
 * access 토큰을 세션스토리지로 저장
 */

authController.loginWithUserIdAndEmail = async (req, res) => {
  try {
    const { userId, email, password } = req.body;

    const { accessToken, refreshToken } =
      await userService.loginWithUserIdAndEmail({
        userId,
        email,
        password,
      });

    const { exp } = await userService.accessTokenExp({ accessToken });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      status: "Login Success",
      exp,
      accessToken,
    });
  } catch (error) {
    return res.status(400).json({
      status: "server fail",
      error: error.message,
    });
  }
};

/** header 에 토큰을 가져와서 토큰의 유효성 검사 */
authController.authenticate = async (req, res, next) => {
  try {
    const accessTokenString = req.headers.authorization;
    const accessToken = accessTokenString.replace("Bearer ", "");
    if (!accessToken) {
      return res.status(401).json({
        status: "fail",
        error: "accessToken is empty",
      });
    }

    jwt.verify(accessToken, JWT_PRIVATEKEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          status: "fail",
          error: err.message,
        });
      }

      req.userId = decoded._id;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      status: "server fail",
      error: error.message,
    });
  }
};

authController.refreshTokenVerify = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new Error("refreshToken not found");
    }

    jwt.verify(refreshToken, JWT_PRIVATEKEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          status: "fail",
          error: err.message,
        });
      }

      req.userId = decoded._id;
      next();
    });
  } catch (error) {
    res.status(500).json({
      status: "server fail",
      error: error.message,
    });
  }
};

authController.generateNewToken = async (req, res) => {
  try {
    const { userId } = req;

    if (!userId) {
      throw new Error("userId not found");
    }

    const accessToken = jwt.sign(
      {
        _id: userId,
      },
      JWT_PRIVATEKEY,
      // { expiresIn: "1h" }
      { expiresIn: "1m" }
    );

    const { exp } = await userService.accessTokenExp({ accessToken });

    res.status(200).json({
      status: "success",
      accessToken,
      exp,
    });
  } catch (error) {
    res.status(500).json({
      status: "server fail",
      error: error.message,
    });
  }
};

authController.logout = async (req, res) => {
  try {
    // refresh 토큰 삭제
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      maxAge: 0,
      path: "/",
    });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      status: "server fail",
      error: error.message,
    });
  }
};

module.exports = authController;
