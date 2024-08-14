import { createSlice } from "@reduxjs/toolkit";
import {
  fetchLoginWithUserIdAndEmail,
  fetchLogout,
  fetchNewAccessToken,
} from "../actions/authAction";

interface authState {
  loading: boolean;
  error: string;
  isRefresh: boolean;
  exp: number;
  isLogout: boolean;
}

const initialState: authState = {
  loading: false,
  error: "",
  isRefresh: false,
  exp: 0,
  isLogout: false,
};

const authSilce = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginWithUserIdAndEmail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchLoginWithUserIdAndEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";

        const authData = sessionStorage.getItem("accessToken");
        if (authData) {
          const { exp } = JSON.parse(authData);
          state.exp = exp;
        }
      })
      .addCase(fetchLoginWithUserIdAndEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "";
      })
      .addCase(fetchNewAccessToken.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchNewAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        const authData = sessionStorage.getItem("accessToken");
        if (authData) {
          const { exp } = JSON.parse(authData);
          state.exp = exp;
        }
      })
      .addCase(fetchNewAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "";
      })
      .addCase(fetchLogout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "";
      });
  },
});

export const {} = authSilce.actions;
export default authSilce.reducer;
