export const userIdRegex = (userId: string) => {
  // 영문자로 시작하는 영문자 또는 숫자 6~20자
  var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
  return regExp.test(userId);
};

export const emailRegex = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * password
 * 8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합
 */

export const passwordRegex = (password: string) => {
  var regExp =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  return regExp.test(password);
};
