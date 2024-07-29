import { ErrorMessages, SignUpFormData } from "../pages/SignUpPage";
import { userIdRegex, emailRegex, passwordRegex } from "./regex";

interface formData extends SignUpFormData {}

export const validateSignUpForm = (formData: formData) => {
  let errors: ErrorMessages = {};
  let valid = true;

  if (!userIdRegex(formData.userId)) {
    errors.userId = "영문자로 시작하는 영문자 또는 숫자 6~20자 입력해주세요.";
    valid = false;
  }

  if (valid && !emailRegex(formData.email)) {
    errors.email = "이메일형식에 맞춰 입력해주세요.";
    valid = false;
  }

  if (valid && !passwordRegex(formData.password)) {
    errors.password =
      "8~16자 영문, 숫자, 특수문자를 최소 한가지씩 조합을 입력해주세요.";
    valid = false;
  }

  if (
    (valid && formData.password !== formData.confirmpassword) ||
    (valid && !formData.confirmpassword)
  ) {
    errors.confirmpassword = "비밀번호가 일치하지 않습니다.";
    valid = false;
  }

  if (valid && !formData.gender) {
    errors.gender = "성별을 선택해 주세요.";
    valid = false;
  }

  return { valid, errors };
};
