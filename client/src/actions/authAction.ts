import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

interface LoginApiProps {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

export const fetchLoginWithUserIdAndEmail = createAsyncThunk<
  void,
  LoginApiProps,
  { rejectValue: string }
>(
  "auth/fetchLoginWithUserIdAndEmail",
  async ({ email, password, navigate }, thunkApi) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      sessionStorage.setItem("accessToken", res.data.accessToken);
      if (res) {
        navigate("/");
      }
      return;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkApi.rejectWithValue(error.response.data.error);
      }
    }
  }
);
