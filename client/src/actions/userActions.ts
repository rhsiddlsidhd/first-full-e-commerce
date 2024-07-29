import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import axios from "axios";
import { SignUpFormData } from "../pages/SignUpPage";
import { NavigateFunction } from "react-router-dom";

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
