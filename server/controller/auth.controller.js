const bcrypt = require("bcrypt");
const User = require("../models/User");

const authController = {};

authController.loginWithUserIdAndEmail = async (req, res) => {
  try {
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

    const { userId, email, password } = req.body;

    const user = await User.findOne({ $or: [{ userId }, { email }] });

    if (!user) {
      throw new Error("userId 또는 email을 찾을 수 없습니다.");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("비밀번호가 일치하지 않습니다.");
    }

    const { accessToken, refreshToken } = await user.generateToken();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      status: "Login Success",
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Server error",
      error: error.message,
    });
  }
};

module.exports = authController;
