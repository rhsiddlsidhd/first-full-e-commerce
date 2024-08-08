import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";

interface LoginApiProps {
  email: string;
  password: string;
  navigate: NavigateFunction;
}

interface dataType {
  exp: number;
}

export const fetchLoginWithUserIdAndEmail = createAsyncThunk<
  dataType,
  LoginApiProps,
  { rejectValue: { error: string } }
>(
  "auth/fetchLoginWithUserIdAndEmail",
  async ({ email, password, navigate }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(res.data);

      sessionStorage.setItem("accessToken", res.data.accessToken);
      if (res) {
        navigate("/");
      }
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const fetchNewAccessToken = createAsyncThunk<
  dataType,
  void,
  { rejectValue: { error: string } }
>("auth/fetchNewAccessToken", async (_, { rejectWithValue }) => {
  try {
    // accesstoken 및 exp 전달
    const res = await api.get("/auth/token");

    sessionStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
  }
});
