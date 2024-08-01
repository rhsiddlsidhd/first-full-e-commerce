import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";
import axios from "axios";

interface LoginApiProps {
  email: string;
  password: string;
}

export const fetchLoginWithUserIdAndEmail = createAsyncThunk<
  void,
  LoginApiProps,
  { rejectValue: string }
>(
  "auth/fetchLoginWithUserIdAndEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      sessionStorage.setItem("accessToken", res.data.accessToken);
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue("");
    }
  }
);
