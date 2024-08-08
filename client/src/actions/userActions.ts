import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import axios from "axios";
import { SignUpFormData } from "../pages/SignUpPage";
import { NavigateFunction } from "react-router-dom";
import { userData } from "../layout/AppLayout";

interface createUserApiProps extends Omit<SignUpFormData, "confirmpassword"> {
  navigate: NavigateFunction;
}

export const fetchCreateUser = createAsyncThunk<
  void,
  createUserApiProps,
  { rejectValue: string }
>(
  "user/fetchCreateUser",
  async (
    { userId, password, gender, email, navigate }: createUserApiProps,
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/signup", {
        userId,
        password,
        gender,
        email,
      });
      if (res) {
        /**
         * 회원가입완료됐다고 팝업띄워주기
         */
        navigate("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.error);
      }
    }
  }
);

/**
 * 토큰에 있는 값과 유저데이터 안의 id를 비교
 */
const fetchGetUser = createAsyncThunk<
  userData,
  void,
  { rejectValue: { error: string } }
>("user/fetchGetUser", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/auth/me");

    return res.data.user;
  } catch (error) {
    console.log("getUser", error);
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data.error);
    }
  }
});

export const userActions = {
  fetchGetUser,
};
