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
  { rejectValue: { error: string } }
>(
  "auth/fetchLoginWithUserIdAndEmail",
  async ({ email, password, navigate }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { exp, accessToken } = res.data;

      sessionStorage.setItem(
        "accessToken",
        JSON.stringify({ exp, accessToken })
      );
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
  void,
  void,
  { rejectValue: { error: string } }
>("auth/fetchNewAccessToken", async (_, { rejectWithValue }) => {
  try {
    // accesstoken 및 exp 전달
    const res = await api.get("/auth/token");
    const { exp, accessToken } = res.data;
    console.log("갱신", res);

    sessionStorage.setItem("accessToken", JSON.stringify({ exp, accessToken }));
    return;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
  }
});

export interface NavigateProps {
  navigate: NavigateFunction;
}

export const fetchLogout = createAsyncThunk<
  void,
  NavigateProps,
  { rejectValue: { error: string } }
>("auth/fetchLogout", async ({ navigate }, { rejectWithValue }) => {
  try {
    //로그아웃 get이 아닌 post
    //Why?

    const res = await api.post("/auth/logout");
    if (res.status !== 200) {
      throw new Error("로그아웃 실패");
    } else {
      sessionStorage.removeItem("accessToken");
      navigate("/login");
      return;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data);
    }
  }
});
