import { SignUpFormData } from "../../pages/SignUpPage";
import api from "../../utils/api";

interface createUserApiProps extends Omit<SignUpFormData, "confirmpassword"> {}

export const fetchCreateUserApi = async ({
  userId,
  password,
  gender,
  email,
}: createUserApiProps) => {
  try {
    const res = await api.post("/signup", { userId, password, gender, email });
    /**
     * 회원가입 이후 Login page 이동
     */

    console.log("success", res);
  } catch (error) {
    console.log("error", error);
  }
};
